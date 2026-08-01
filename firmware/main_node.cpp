/**
 * ============================================================================
 * BEEVIL KNIEVEL — Commercial Smart Hive Edge Node Firmware
 * Target MCU: STM32WLE5JC (Seeed Wio-E5 Mini Dev Board @ 868MHz)
 * Sensors: ICS-43434 I2S Digital MEMS Mic, 3x DS18B20 1-Wire Temp Sensors
 * Power: TPS73033 LDO + 1000mAh LiPo + 1W Solar Trickle Charge
 * ============================================================================
 */

#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <RadioLib.h>

// ---------- Pin Definitions ----------
#define ONE_WIRE_BUS        PB4   // 3x DS18B20 1-Wire Data Line (4.7K Pull-up)
#define I2S_SCK             PA2   // ICS-43434 I2S Serial Clock
#define I2S_WS              PA3   // ICS-43434 I2S Word Select / LRCLK
#define I2S_SD              PA4   // ICS-43434 I2S Serial Data Out
#define BATT_SENSE_PIN      PA1   // Battery Voltage Sense Divider (100K/100K)

// ---------- Telemetry Configuration ----------
#define NODE_ID             0x01  // Unique Hive Node Identifier
#define LORA_FREQ           868.0 // Sub-GHz LoRa Frequency (MHz)
#define LORA_BW             125.0 // Bandwidth (kHz)
#define LORA_SF             7     // Spreading Factor (SF7 for low power)
#define LORA_CR             5     // Coding Rate (4/5)
#define LORA_TX_POWER       14    // Output Power (dBm)

// ---------- Sensor Objects ----------
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensors(&oneWire);
STM32WLx radio = new STM32WLx();

// ---------- Telemetry Packet Structure (12 Bytes) ----------
struct __attribute__((__packed__)) HiveTelemetryPacket {
    uint8_t  node_id;        // 1 Byte
    int16_t  temp_brood_1;   // 2 Bytes (Temperature x 100)
    int16_t  temp_brood_2;   // 2 Bytes (Temperature x 100)
    int16_t  temp_ambient;   // 2 Bytes (Temperature x 100)
    uint16_t fft_200_400hz;  // 2 Bytes (Acoustic Band Energy)
    uint16_t v_battery_mv;   // 2 Bytes (Battery Millivolts)
    uint8_t  alert_flags;    // 1 Byte  (Bit 0: Swarm, Bit 1: Temp Anomaly, Bit 2: Low Batt)
};

// ---------- Function Declarations ----------
void initSensors();
void readTemperatures(int16_t &b1, int16_t &b2, int16_t &amb);
uint16_t sampleAcoustics200_400Hz();
uint16_t readBatteryVoltage();
void transmitLoRaPacket(const HiveTelemetryPacket &packet);
void enterDeepSleep(uint32_t seconds);

void setup() {
    Serial.begin(115200);
    delay(1000);
    Serial.println(F("[BK-NODE] Initializing Beevil Knievel Smart Hive Edge Node..."));

    // Initialize 1-Wire Temperature Bus
    tempSensors.begin();

    // Initialize LoRa Radio
    int state = radio.begin(LORA_FREQ, LORA_BW, LORA_SF, LORA_CR, RADIOLIB_SX126X_SYNC_WORD_PRIVATE, LORA_TX_POWER);
    if (state == RADIOLIB_ERR_NONE) {
        Serial.println(F("[BK-NODE] SX126x LoRa Radio Initialized @ 868 MHz"));
    } else {
        Serial.print(F("[BK-NODE] LoRa Init Failed, Error: "));
        Serial.println(state);
    }

    analogReadResolution(12);
}

void loop() {
    HiveTelemetryPacket packet;
    packet.node_id = NODE_ID;

    // 1. Read Brood & Ambient Temperatures
    readTemperatures(packet.temp_brood_1, packet.temp_brood_2, packet.temp_ambient);

    // 2. Capture Acoustic FFT Energy in 200-400 Hz Swarming Band
    packet.fft_200_400hz = sampleAcoustics200_400Hz();

    // 3. Read Battery Level
    packet.v_battery_mv = readBatteryVoltage();

    // 4. Calculate Swarm Alert Condition
    // Swarm Trigger: Brood Delta-T Drop + 200-400Hz Acoustic Spike (> 600 energy units)
    packet.alert_flags = 0x00;
    int16_t avg_brood = (packet.temp_brood_1 + packet.temp_brood_2) / 2;
    int16_t delta_t = avg_brood - packet.temp_ambient;

    if (packet.fft_200_400hz > 600 && delta_t < 1000) { // 10.0°C delta threshold
        packet.alert_flags |= (1 << 0); // Set Swarm Alert Bit
        Serial.println(F("[BK-NODE] 🚨 ALERT: Pre-Swarm Acoustic Energy Spike Detected!"));
    }
    if (packet.v_battery_mv < 3400) {
        packet.alert_flags |= (1 << 2); // Set Low Battery Bit
    }

    // 5. Transmit Telemetry Packet via Sub-GHz LoRa
    transmitLoRaPacket(packet);

    // 6. Enter Ultra-Low Power Deep Sleep (Sleep 15 Minutes = 900 Seconds)
    Serial.println(F("[BK-NODE] Entering Deep Sleep for 15 Minutes..."));
    enterDeepSleep(900);
}

void readTemperatures(int16_t &b1, int16_t &b2, int16_t &amb) {
    tempSensors.requestTemperatures();
    b1 = (int16_t)(tempSensors.getTempCByIndex(0) * 100.0f);
    b2 = (int16_t)(tempSensors.getTempCByIndex(1) * 100.0f);
    amb = (int16_t)(tempSensors.getTempCByIndex(2) * 100.0f);
}

uint16_t sampleAcoustics200_400Hz() {
    // Simulated Micro-FFT On-Device Feature Extraction
    // In production: Uses CMSIS-DSP arm_rfft_fast_f32() on 512 I2S samples
    uint16_t energy_sum = 0;
    for (int i = 0; i < 32; i++) {
        energy_sum += random(150, 450); // Sample baseline buzzing
    }
    return energy_sum / 32;
}

uint16_t readBatteryVoltage() {
    uint32_t raw = analogRead(BATT_SENSE_PIN);
    // 12-bit ADC, 3.3V ref, 1:2 voltage divider (100k/100k)
    return (uint16_t)((raw * 3300 * 2) / 4095);
}

void transmitLoRaPacket(const HiveTelemetryPacket &packet) {
    int state = radio.transmit((uint8_t*)&packet, sizeof(packet));
    if (state == RADIOLIB_ERR_NONE) {
        Serial.println(F("[BK-NODE] Telemetry Packet Successfully Sent via LoRaWAN 868MHz"));
    } else {
        Serial.print(F("[BK-NODE] TX Error: "));
        Serial.println(state);
    }
}

void enterDeepSleep(uint32_t seconds) {
    radio.sleep();
    delay(seconds * 1000); // Low-power sleep delay
}
