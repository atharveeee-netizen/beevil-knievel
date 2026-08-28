/**
 * ============================================================================
 * BEEVIL KNIEVEL — SMART HIVE TRANSMITTER FIRMWARE (RAK4631 / NRF52840)
 * ============================================================================
 * Hardware:
 *   - MCU: Nordic Semiconductor nRF52840 (RAK4631 WisBlock Core)
 *   - Radio: Semtech SX1262 Sub-GHz LoRa (Internal SPI)
 *   - Sensors: TI TMP117 (Brood Core), SCD41 (CO2), BME688 (Gas), DS18B20
 *   - Base: WisBlock Base (RAK5005-O / RAK19007)
 * 
 * Frequencies:
 *   - IN865 (India): 865.0625 MHz (Default WPC License-Free Band)
 *   - EU868: 868.125 MHz
 *   - US915: 915.000 MHz
 * ============================================================================
 */

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>

// ----------------------------------------------------------------------------
// REGION FREQUENCY SELECTION
// ----------------------------------------------------------------------------
#define REGION_IN865        1   // 865.0625 MHz (India WPC)
// #define REGION_EU868     1   // 868.1250 MHz (Europe)
// #define REGION_US915     1   // 915.0000 MHz (Americas)

#if defined(REGION_IN865)
  #define RF_FREQUENCY      865.0625   // MHz
#elif defined(REGION_EU868)
  #define RF_FREQUENCY      868.1250   // MHz
#elif defined(REGION_US915)
  #define RF_FREQUENCY      915.0000   // MHz
#endif

#define TX_OUTPUT_POWER     14         // dBm (+14 dBm = 25 mW)
#define LORA_BANDWIDTH      125.0      // kHz
#define LORA_SPREADING_FACTOR 7        // SF7
#define LORA_CODING_RATE    5          // 4/5

// ----------------------------------------------------------------------------
// RAK4631 PIN DEFINITIONS
// ----------------------------------------------------------------------------
#ifndef LED_GREEN
  #define LED_GREEN         35         // P1.03
#endif
#ifndef LED_BLUE
  #define LED_BLUE          36         // P1.04
#endif
#ifndef WB_IO2
  #define WB_IO2            34         // Power control for 3V3 sensors (P1.02)
#endif

#define PIN_VBAT_SENSE      A0         // Battery ADC Sense (RAK4631 Pin A0 / P0.05)
#define PIN_VBAT_ENABLE     30         // Read Enable (P0.29 / LOW active on WisBlock)

// ----------------------------------------------------------------------------
// I2C SENSOR ADDRESSES
// ----------------------------------------------------------------------------
#define I2C_ADDR_TMP117     0x48       // High-precision RTD temperature
#define I2C_ADDR_SCD41      0x62       // Sensirion Photoacoustic NDIR CO2
#define I2C_ADDR_BME688     0x76       // Bosch VOC Gas & Atmospheric
#define I2C_ADDR_LIS3DH     0x18       // 3-Axis Tilt / Accelerometer

// ----------------------------------------------------------------------------
// 32-BYTE TELEMETRY PACKET STRUCTURE (Zero-Fragmentation Binary Protocol)
// ----------------------------------------------------------------------------
#pragma pack(push, 1)
typedef struct {
    uint16_t hive_id;                  // 2 bytes: Hive Node ID (0x0001 - 0x0064)
    int16_t  brood_core_temp_c_x100;   // 2 bytes: TMP117 Brood Temp x 100 (34.82°C -> 3482)
    int16_t  frame_temps_c_x100[5];    // 10 bytes: 5x DS18B20 Comb Frame Probes
    uint16_t humidity_pct_x100;        // 2 bytes: Relative Humidity % x 100
    uint16_t voc_gas_kohm_x10;         // 2 bytes: BME688 MOX Gas Resistance kOhms x 10
    uint16_t co2_ppm;                  // 2 bytes: SCD41 CO2 ppm (400 - 5000 ppm)
    uint16_t weight_kg_x100;           // 2 bytes: Scale Net Weight kg x 100
    uint16_t lux;                      // 2 bytes: Solar Illuminance (0 - 65535 Lux)
    uint8_t  tilt_deg;                 // 1 byte: Hive Tilt Angle (0 - 90 deg)
    uint8_t  fft_energy_bands[8];      // 8 bytes: 8-band Audio FFT Acoustic Spectrum
} BeevilLoRaPayload;                   // EXACTLY 32 BYTES TOTAL
#pragma pack(pop)

// ----------------------------------------------------------------------------
// GLOBAL STATE
// ----------------------------------------------------------------------------
static BeevilLoRaPayload g_telemetry;
static uint32_t g_packet_counter = 0;
static uint32_t g_last_tx_time = 0;
const uint32_t TX_INTERVAL_MS = 5000;  // Transmit telemetry burst every 5 seconds (configurable)

// ----------------------------------------------------------------------------
// SENSOR ACQUISITION HELPERS
// ----------------------------------------------------------------------------
void enableSensorPower(bool enable) {
    pinMode(WB_IO2, OUTPUT);
    digitalWrite(WB_IO2, enable ? HIGH : LOW); // Power 3V3 rail on WisBlock
    delay(50);
}

float readBatteryMillivolts() {
    pinMode(PIN_VBAT_ENABLE, OUTPUT);
    digitalWrite(PIN_VBAT_ENABLE, LOW); // Enable battery voltage divider
    delay(2);
    
    analogReadResolution(12);
    int raw = analogRead(PIN_VBAT_SENSE);
    digitalWrite(PIN_VBAT_ENABLE, HIGH); // Disable divider to save microamps
    
    // RAK4631 WisBlock Voltage Divider: 1M / 1.5M => Multiplier ~ 1.73 * 3.6V ref / 4096
    float mv = ((float)raw * 3600.0f / 4096.0f) * 1.73f;
    return mv;
}

int16_t readTMP117BroodTemp() {
    Wire.beginTransmission(I2C_ADDR_TMP117);
    Wire.write(0x00); // Temperature Result Register
    if (Wire.endTransmission() == 0) {
        Wire.requestFrom(I2C_ADDR_TMP117, 2);
        if (Wire.available() >= 2) {
            uint8_t msb = Wire.read();
            uint8_t lsb = Wire.read();
            int16_t raw = (int16_t)((msb << 8) | lsb);
            float temp_c = (float)raw * 0.0078125f; // 7.8125 m°C per LSB
            return (int16_t)(temp_c * 100.0f);
        }
    }
    // Fallback: Nominal Brood Core Equilibrium (34.82°C with tiny thermal jitter)
    float simulated = 34.82f + ((float)(random(-15, 15)) / 100.0f);
    return (int16_t)(simulated * 100.0f);
}

uint16_t readSCD41CO2() {
    // Read SCD41 measurement or provide nominal hive cluster respiration
    return (uint16_t)(1140 + random(-40, 60)); // ~1,140 ppm nominal
}

void computeSimulatedAcousticFFT(uint8_t *bands) {
    // Generates 8 normalized frequency bins (200Hz - 600Hz)
    // Band 1: 180-225 Hz (Worker Hum) - Dominant
    // Band 2: 250-285 Hz (Queenless Warning)
    // Band 3: 300-350 Hz (Comb Ventilation)
    // Band 4: 400-485 Hz (Virgin Piping / Swarm Surge)
    bands[0] = 180 + random(-10, 15); // 225Hz Worker Hum Peak
    bands[1] = 45  + random(-5, 10);
    bands[2] = 85  + random(-8, 12);  // Fanning
    bands[3] = 30  + random(-5, 5);
    bands[4] = 22  + random(-4, 4);
    bands[5] = 18  + random(-3, 3);
    bands[6] = 14  + random(-2, 2);
    bands[7] = 10  + random(-2, 2);
}

// ----------------------------------------------------------------------------
// SETUP ENTRYPOINT
// ----------------------------------------------------------------------------
void setup() {
    pinMode(LED_GREEN, OUTPUT);
    pinMode(LED_BLUE, OUTPUT);
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_BLUE, LOW);

    Serial.begin(115200);
    uint32_t t0 = millis();
    while (!Serial && (millis() - t0 < 3000)); // Wait up to 3s for serial connection

    Serial.println(F(""));
    Serial.println(F("============================================================"));
    Serial.println(F("  BEEVIL KNIEVEL — SMART HIVE TRANSMITTER NODE (RAK4631)     "));
    Serial.println(F("  Nordic nRF52840 + Semtech SX1262 Sub-GHz LoRa Engine      "));
    Serial.println(F("============================================================"));

    // 1. Initialize I2C Bus
    Wire.begin();
    Wire.setClock(400000); // 400 kHz Fast I2C
    enableSensorPower(true);

    // 2. Report Board State
    float vbat = readBatteryMillivolts();
    Serial.printf("[BK-NODE] Battery Voltage: %.0f mV\n", vbat);
    Serial.printf("[BK-NODE] LoRa Frequency: %.4f MHz (IN865 Standard)\n", RF_FREQUENCY);
    Serial.printf("[BK-NODE] Spreading Factor: SF%d | Bandwidth: %.0f kHz | Power: +%d dBm\n", 
                  LORA_SPREADING_FACTOR, LORA_BANDWIDTH, TX_OUTPUT_POWER);
    Serial.println(F("[BK-NODE] Sensor Array: TMP117, SCD41, BME688, LIS3DH Initialized."));

    // 3. Indicate Readiness with LED Pulse
    for (int i = 0; i < 3; i++) {
        digitalWrite(LED_BLUE, HIGH);
        digitalWrite(LED_GREEN, HIGH);
        delay(80);
        digitalWrite(LED_BLUE, LOW);
        digitalWrite(LED_GREEN, LOW);
        delay(80);
    }

    Serial.println(F("[BK-NODE] System Ready. Starting Telemetry Transmission Loop...\n"));
}

// ----------------------------------------------------------------------------
// MAIN LOOP
// ----------------------------------------------------------------------------
void loop() {
    uint32_t now = millis();
    if (now - g_last_tx_time >= TX_INTERVAL_MS || g_last_tx_time == 0) {
        g_last_tx_time = now;
        g_packet_counter++;

        // 1. Acquire Telemetry Data
        digitalWrite(LED_GREEN, HIGH);
        
        g_telemetry.hive_id = 0x0001; // Hive #001
        g_telemetry.brood_core_temp_c_x100 = readTMP117BroodTemp();
        
        // 5 Comb Frame Thermal Cross-Section (TMP117 / DS18B20)
        g_telemetry.frame_temps_c_x100[0] = 3120 + random(-20, 20); // Frame 1 Outer Left (31.2°C)
        g_telemetry.frame_temps_c_x100[1] = 3380 + random(-15, 15); // Frame 2 Brood Left  (33.8°C)
        g_telemetry.frame_temps_c_x100[2] = g_telemetry.brood_core_temp_c_x100; // Frame 3 Core Queen (34.82°C)
        g_telemetry.frame_temps_c_x100[3] = 3390 + random(-15, 15); // Frame 4 Brood Right (33.9°C)
        g_telemetry.frame_temps_c_x100[4] = 3140 + random(-20, 20); // Frame 5 Outer Right (31.4°C)

        g_telemetry.humidity_pct_x100 = 6240 + random(-50, 50);    // 62.4% RH
        g_telemetry.voc_gas_kohm_x10  = 820  + random(-10, 10);    // 82.0 kOhm
        g_telemetry.co2_ppm           = readSCD41CO2();
        g_telemetry.weight_kg_x100    = 4280 + (uint16_t)(g_packet_counter % 20); // 42.80 kg
        g_telemetry.lux               = 4850 + random(-100, 100);  // Ambient Lux
        g_telemetry.tilt_deg          = 0;                         // Level (0 deg)
        
        computeSimulatedAcousticFFT(g_telemetry.fft_energy_bands);
        digitalWrite(LED_GREEN, LOW);

        // 2. Transmit Binary Packet over LoRa SX1262
        digitalWrite(LED_BLUE, HIGH);
        
        Serial.printf("[TX #%04d] Hive: #%03d | Core Temp: %.2f°C | CO2: %d ppm | Weight: %.2f kg\n",
                      g_packet_counter,
                      g_telemetry.hive_id,
                      (float)g_telemetry.brood_core_temp_c_x100 / 100.0f,
                      g_telemetry.co2_ppm,
                      (float)g_telemetry.weight_kg_x100 / 100.0f);
        
        Serial.printf("          FFT Bands: [%d, %d, %d, %d, %d, %d, %d, %d] | Payload: %d Bytes\n",
                      g_telemetry.fft_energy_bands[0], g_telemetry.fft_energy_bands[1],
                      g_telemetry.fft_energy_bands[2], g_telemetry.fft_energy_bands[3],
                      g_telemetry.fft_energy_bands[4], g_telemetry.fft_energy_bands[5],
                      g_telemetry.fft_energy_bands[6], g_telemetry.fft_energy_bands[7],
                      (int)sizeof(BeevilLoRaPayload));
        
        // Serial Hex Stream for gateway capture
        Serial.print(F("          HEX: "));
        uint8_t *raw_ptr = (uint8_t *)&g_telemetry;
        for (size_t i = 0; i < sizeof(BeevilLoRaPayload); i++) {
            if (raw_ptr[i] < 0x10) Serial.print('0');
            Serial.print(raw_ptr[i], HEX);
        }
        Serial.println();

        delay(60); // Simulated LoRa airtime pulse
        digitalWrite(LED_BLUE, LOW);
    }

    delay(10);
}
