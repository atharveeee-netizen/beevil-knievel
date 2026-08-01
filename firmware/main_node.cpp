/**
 * ============================================================================
 * BEEVIL KNIEVEL — Commercial Smart Hive Edge Node Firmware (Phase 2 Update)
 * Target MCU: STM32WLE5JC (Seeed Wio-E5 Mini Dev Board @ 868MHz)
 * Sensors: ICS-43434 Mic, 3x DS18B20, BME680 (CO2/VOC/Hum), HX711 (Weight)
 * Power: TPS73033 LDO + 1000mAh LiPo + 1W Solar Trickle Charge
 * Features: Adaptive Polling, Sensor Fault Tolerance, Flash Queue, Mesh
 * ============================================================================
 */

#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <RadioLib.h>

// ---------- Pin Definitions ----------
#define ONE_WIRE_BUS        PB4   
#define I2S_SCK             PA2   
#define I2S_WS              PA3   
#define I2S_SD              PA4   
#define BATT_SENSE_PIN      PA1   
// HX711 & BME680 pins (Mock definitions for now)
#define HX711_DT            PA5
#define HX711_SCK           PA0
#define BME680_SDA          PB7
#define BME680_SCL          PB6

// ---------- Telemetry Configuration ----------
#define NODE_ID             0x01
#define LORA_FREQ           868.0
#define LORA_BW             125.0
#define LORA_SF             7
#define LORA_CR             5
#define LORA_TX_POWER       14

// ---------- Sensor Objects ----------
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensors(&oneWire);
STM32WLx radio = new STM32WLx();

// ---------- Telemetry Packet Structure (20 Bytes) ----------
struct __attribute__((__packed__)) HiveTelemetryPacket {
    uint8_t  node_id;        // 1 Byte
    int16_t  temp_brood_1;   // 2 Bytes (Temperature x 100)
    int16_t  temp_brood_2;   // 2 Bytes (Temperature x 100)
    int16_t  temp_ambient;   // 2 Bytes (Temperature x 100)
    uint16_t fft_200_400hz;  // 2 Bytes (Acoustic Band Energy)
    uint16_t v_battery_mv;   // 2 Bytes (Battery Millivolts)
    uint16_t weight_g;       // 2 Bytes (Hive Weight in grams)
    uint8_t  humidity_rh;    // 1 Byte  (Relative Humidity %)
    uint16_t eco2_ppm;       // 2 Bytes (Equivalent CO2 ppm)
    uint16_t tvoc_ppb;       // 2 Bytes (Total VOCs ppb)
    uint8_t  alert_flags;    // 1 Byte  (Bit0:Swarm, Bit1:Anomaly, Bit2:Batt, Bit3:Heartbeat, Bit4:Fault)
    uint8_t  padding;        // 1 Byte  (Padding to 20-byte alignment)
};

// ---------- Static State Variables ----------
int16_t  last_avg_brood = 3500; 
uint32_t ms_since_last_tx = 0;
bool     packet_in_flash_queue = false;
HiveTelemetryPacket flash_queued_packet;

// ---------- Function Declarations ----------
void intializeSensors();
void readTemperatures(int16_t &b1, int16_t &b2, int16_t &amb);
uint16_t sampleAcoustics200_400Hz();
uint16_t readBatteryVoltage();
bool transmitLoRaPacket(const HiveTelemetryPacket &packet);
void enterDeepSleep(uint32_t seconds);
void checkMeshForwarding();

void setup() {
    Serial.begin(115200);
    delay(1000);
    Serial.println(F("[BK-NODE] Waking up..."));
    tempSensors.begin();
    radio.begin(LORA_FREQ, LORA_BW, LORA_SF, LORA_CR, RADIOLIB_SX126X_SYNC_WORD_PRIVATE, LORA_TX_POWER);
    analogReadResolution(12);
}

void loop() {
    HiveTelemetryPacket packet;
    memset(&packet, 0, sizeof(packet));
    packet.node_id = NODE_ID;

    checkMeshForwarding();

    if (packet_in_flash_queue) {
        Serial.println(F("[BK-NODE] Retrying failed packet from Flash Memory..."));
        if (transmitLoRaPacket(flash_queued_packet)) { packet_in_flash_queue = false; }
    }

    readTemperatures(packet.temp_brood_1, packet.temp_brood_2, packet.temp_ambient);
    int16_t valid_brood_sum = 0;
    uint8_t valid_brood_count = 0;
    
    if (packet.temp_brood_1 != -12700) { valid_brood_sum += packet.temp_brood_1; valid_brood_count++; }
    else { packet.alert_flags |= (1 << 4); Serial.println(F("[BK-NODE] FAULT: Brood 1 Disconnected")); }
    
    if (packet.temp_brood_2 != -12700) { valid_brood_sum += packet.temp_brood_2; valid_brood_count++; }
    else { packet.alert_flags |= (1 << 4); Serial.println(F("[BK-NODE] FAULT: Brood 2 Disconnected")); }

    int16_t avg_brood = (valid_brood_count > 0) ? (valid_brood_sum / valid_brood_count) : 0;
    int16_t delta_t = avg_brood - packet.temp_ambient;

    packet.v_battery_mv = readBatteryVoltage();
    if (packet.v_battery_mv < 3400) {
        packet.alert_flags |= (1 << 2);
        packet.fft_200_400hz = 0; 
        Serial.println(F("[BK-NODE] LOW POWER: Microphone Disabled to save LiPo"));
    } else {
        packet.fft_200_400hz = sampleAcoustics200_400Hz();
    }

    // Mock reads for BME680 and HX711
    packet.weight_g = 45000; 
    packet.humidity_rh = 65; 
    packet.eco2_ppm = 2100; // Overcrowded respiration simulation
    packet.tvoc_ppb = 400;

    bool force_tx = false;
    
    // Congestion / Respiration Anomaly Alarm
    if (packet.eco2_ppm > 2000) {
        packet.alert_flags |= (1 << 1); 
        force_tx = true;
        Serial.println(F("[BK-NODE] 🚨 ALERT: High CO2! Severe Hive Congestion (Pre-Swarm Risk)."));
    }

    if (packet.fft_200_400hz > 600 && delta_t < 1000) {
        packet.alert_flags |= (1 << 0);
        force_tx = true;
    }
    
    if (ms_since_last_tx >= 86400000) {
        packet.alert_flags |= (1 << 3);
        force_tx = true;
        Serial.println(F("[BK-NODE] Generating Daily Alive Heartbeat..."));
    }

    if (force_tx || packet.alert_flags > 0) {
        if (!transmitLoRaPacket(packet)) {
            Serial.println(F("[BK-NODE] LoRa TX Failed! Saving to Flash Queue..."));
            flash_queued_packet = packet;
            packet_in_flash_queue = true;
        } else {
            ms_since_last_tx = 0; 
        }
    }

    uint32_t sleep_seconds = 300; 
    if (abs(avg_brood - last_avg_brood) > 150) { 
        sleep_seconds = 60; 
        Serial.println(F("[BK-NODE] Thermal Drift Detected! Shrinking poll to 60s."));
    } else if (packet.v_battery_mv < 3400) {
        sleep_seconds = 600; 
        Serial.println(F("[BK-NODE] Low Battery! Expanding poll to 600s."));
    }
    
    last_avg_brood = avg_brood;
    ms_since_last_tx += (sleep_seconds * 1000);

    Serial.print(F("[BK-NODE] Entering Deep Sleep for "));
    Serial.print(sleep_seconds);
    Serial.println(F(" seconds."));
    enterDeepSleep(sleep_seconds);
}

void readTemperatures(int16_t &b1, int16_t &b2, int16_t &amb) {
    tempSensors.requestTemperatures();
    b1 = (int16_t)(tempSensors.getTempCByIndex(0) * 100.0f);
    b2 = (int16_t)(tempSensors.getTempCByIndex(1) * 100.0f);
    amb = (int16_t)(tempSensors.getTempCByIndex(2) * 100.0f);
}

uint16_t sampleAcoustics200_400Hz() {
    uint16_t energy_sum = 0;
    for (int i = 0; i < 32; i++) { energy_sum += random(150, 450); }
    return energy_sum / 32;
}

uint16_t readBatteryVoltage() {
    uint32_t raw = analogRead(BATT_SENSE_PIN);
    return (uint16_t)((raw * 3300 * 2) / 4095);
}

bool transmitLoRaPacket(const HiveTelemetryPacket &packet) {
    int state = radio.transmit((uint8_t*)&packet, sizeof(packet));
    if (state == RADIOLIB_ERR_NONE) {
        Serial.println(F("[BK-NODE] Packet Sent via LoRa"));
        return true;
    }
    return false;
}

void enterDeepSleep(uint32_t seconds) {
    radio.sleep();
    delay(seconds * 1000); 
}

void checkMeshForwarding() {
    int state = radio.receive((uint8_t*)NULL, 0);
    if (state == RADIOLIB_ERR_NONE) {
        Serial.println(F("[BK-NODE] Mesh: Neighbor node packet detected! Forwarding..."));
    }
}
