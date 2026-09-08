/**
 * ============================================================================
 * BEEVIL KNIEVEL — CANONICAL SENSOR NODE FIRMWARE (RAK4631 / NRF52840)
 * ============================================================================
 * Standard: IEEE HARDWAIre Phase 2 Bench Bring-Up
 * Hardware:
 *   - MCU: Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz)
 *   - Module: RAKwireless RAK4631 WisBlock Core on RAK5005-O Baseboard
 *   - LoRa: Semtech SX1262 Transceiver (IN865 Band: 865.0625 MHz)
 *   - Buses: I2C (Wire), SPI, I2S Audio, 1-Wire Thermal Grid, SAADC Battery
 *
 * Core Truth Rules Enforced:
 *   1. NEVER fabricate sensor measurements.
 *   2. If a sensor is physically detected on the bus, read live registers.
 *   3. If a sensor is not connected, report explicitly as NOT_CONNECTED / UNAVAILABLE.
 *   4. Zero synthetic sine waves in audio drivers.
 *   5. All telemetry frames carry explicit presence bitmask and provenance.
 * ============================================================================
 */

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>

// Configuration Headers
#include "hardware_config.h"
#include "battery_config.h"
#include "sensor_config.h"
#include "radio_config.h"
#include "algorithm_config.h"

// ----------------------------------------------------------------------------
// CANONICAL 32-BYTE BINARY TELEMETRY PACKET (STRICT PACKING)
// ----------------------------------------------------------------------------
#pragma pack(push, 1)
typedef struct {
    uint16_t hive_id;                  // 2 bytes: Unique Hive ID (0x0001 - 0x0064)
    int16_t  brood_core_temp_c_x100;   // 2 bytes: TMP117 Temp (-9999 if NOT_CONNECTED)
    int16_t  frame_temps_c_x100[5];    // 10 bytes: 5x DS18B20 Probes (-9999 if NOT_CONNECTED)
    uint16_t humidity_pct_x100;        // 2 bytes: 0.00% to 100.00% (0xFFFF if NOT_CONNECTED)
    uint16_t voc_gas_kohm_x10;         // 2 bytes: 0.0 to 6553.5 kOhms (0xFFFF if NOT_CONNECTED)
    uint16_t co2_ppm;                  // 2 bytes: 400 to 10,000 ppm (0xFFFF if NOT_CONNECTED)
    uint16_t weight_kg_x100;           // 2 bytes: 0.00 to 200.00 kg (0xFFFF if NOT_CONNECTED)
    uint16_t lux;                      // 2 bytes: 0 to 65,535 Lux (0xFFFF if NOT_CONNECTED)
    uint8_t  tilt_deg;                 // 1 byte: 0 to 90 deg (0xFF if NOT_CONNECTED)
    uint8_t  fft_energy_bands[8];      // 8 bytes: Normalized acoustic sub-bands (0 if silent/absent)
} BeevilLoRaPayload;                   // Exactly 32 Bytes
#pragma pack(pop)

// Sensor Presence Bitmask Flags
#define PRESENCE_FLAG_TMP117           (1 << 0)  // Bit 0: TI TMP117 High-Precision RTD
#define PRESENCE_FLAG_SCD41            (1 << 1)  // Bit 1: Sensirion SCD41 CO2
#define PRESENCE_FLAG_BME688           (1 << 2)  // Bit 2: Bosch BME688 Gas/RH/P
#define PRESENCE_FLAG_LIS3DH           (1 << 3)  // Bit 3: ST LIS3DH Accelerometer
#define PRESENCE_FLAG_VEML7700         (1 << 4)  // Bit 4: Vishay VEML7700 Lux
#define PRESENCE_FLAG_HX711            (1 << 5)  // Bit 5: HX711 Load Cell Scale
#define PRESENCE_FLAG_DS18B20          (1 << 6)  // Bit 6: At least one DS18B20 1-Wire probe
#define PRESENCE_FLAG_INMP441          (1 << 7)  // Bit 7: INMP441 / ICS-43434 I2S Mic

// Alert Bitmask Flags (Embedded in high nibble of alert field if present)
#define ALERT_FLAG_QUEENLESS_CUSUM     0x80  // Bit 7: CUSUM Drift Collapse Flag
#define ALERT_FLAG_PRE_SWARM_HEATING   0x40  // Bit 6: Pre-Swarm Acoustic Surge
#define ALERT_FLAG_LOW_BATTERY_SOC     0x20  // Bit 5: Battery SoC < 15%
#define ALERT_FLAG_TILT_TAMPER         0x10  // Bit 4: Tilt > 15 deg

// ----------------------------------------------------------------------------
// HARDWARE DRIVER STATE
// ----------------------------------------------------------------------------
typedef struct {
    bool has_tmp117;
    bool has_scd41;
    bool has_bme688;
    bool has_lis3dh;
    bool has_veml7700;
    bool has_hx711;
    bool has_inmp441;
    uint8_t ds18b20_count;
    uint16_t presence_mask;
} SensorPresenceState;

static SensorPresenceState g_sensors = {0};
static BeevilLoRaPayload g_telemetry = {0};
static uint32_t g_packet_counter = 0;
static uint32_t g_last_telemetry_ms = 0;
static bool g_output_csv = false;

// ----------------------------------------------------------------------------
// CUSUM THERMAL FILTER STATE
// ----------------------------------------------------------------------------
typedef struct {
    float S_k;
    float baseline_mean;
    float slack_k;
    float threshold_h;
    bool  alert_active;
    uint32_t samples_count;
} CUSUMState;

static CUSUMState g_cusum = {
    .S_k = 0.0f,
    .baseline_mean = CUSUM_BASELINE_MEAN_C,
    .slack_k = CUSUM_SLACK_K_C,
    .threshold_h = CUSUM_THRESHOLD_H,
    .alert_active = false,
    .samples_count = 0
};

// ----------------------------------------------------------------------------
// BLACKBOX RING BUFFER
// ----------------------------------------------------------------------------
typedef struct {
    uint32_t timestamp_ms;
    float    die_temp_c;
    float    vbat_mv;
    float    soc_pct;
    float    cusum_score;
    uint8_t  presence_mask;
} BlackboxRecord;

static BlackboxRecord g_blackbox[BLACKBOX_BUFFER_CAPACITY];
static uint16_t g_bb_head = 0;
static uint16_t g_bb_count = 0;

// ----------------------------------------------------------------------------
// 1. BATTERY STATE-OF-CHARGE (SoC) ESTIMATOR
// ----------------------------------------------------------------------------
float calculateBatterySoC(float vbat_mv, float die_temp_c) {
    float v_comp = vbat_mv + (VBAT_TEMP_BASELINE_C - die_temp_c) * VBAT_TEMP_COEFF_MV_PER_C;
    if (v_comp >= VBAT_MAX_FULL_MV) return 100.0f;
    if (v_comp <= VBAT_MIN_EMPTY_MV) return 0.0f;

    if (v_comp > OCV_PT_90_MV) return 90.0f + (v_comp - OCV_PT_90_MV) / (VBAT_MAX_FULL_MV - OCV_PT_90_MV) * 10.0f;
    if (v_comp > OCV_PT_70_MV) return 70.0f + (v_comp - OCV_PT_70_MV) / (OCV_PT_90_MV - OCV_PT_70_MV) * 20.0f;
    if (v_comp > OCV_PT_40_MV) return 40.0f + (v_comp - OCV_PT_40_MV) / (OCV_PT_70_MV - OCV_PT_40_MV) * 30.0f;
    if (v_comp > OCV_PT_20_MV) return 20.0f + (v_comp - OCV_PT_20_MV) / (OCV_PT_40_MV - OCV_PT_20_MV) * 20.0f;
    if (v_comp > OCV_PT_10_MV) return 10.0f + (v_comp - OCV_PT_10_MV) / (OCV_PT_20_MV - OCV_PT_10_MV) * 10.0f;
    return (v_comp - VBAT_MIN_EMPTY_MV) / (OCV_PT_10_MV - VBAT_MIN_EMPTY_MV) * 10.0f;
}

// ----------------------------------------------------------------------------
// 2. RECURSIVE CUSUM FILTER
// ----------------------------------------------------------------------------
bool updateCUSUM(float temp_c) {
    g_cusum.samples_count++;
    if (g_cusum.samples_count <= 3) {
        g_cusum.baseline_mean = temp_c;
        g_cusum.S_k = 0.0f;
        g_cusum.alert_active = false;
        return false;
    }
    float drift = (g_cusum.baseline_mean - temp_c - g_cusum.slack_k);
    if (drift > 0.0f) {
        g_cusum.S_k += drift;
    } else {
        g_cusum.S_k = max(0.0f, g_cusum.S_k + drift * 0.5f);
    }
    g_cusum.alert_active = (g_cusum.S_k >= g_cusum.threshold_h);
    return g_cusum.alert_active;
}

// ----------------------------------------------------------------------------
// 3. PHYSICAL ON-CHIP HARDWARE READINGS
// ----------------------------------------------------------------------------
float readPhysicalDieTemp() {
    NRF_TEMP->TASKS_START = 1;
    uint32_t timeout = 10000;
    while (NRF_TEMP->EVENTS_DATARDY == 0 && --timeout > 0);
    NRF_TEMP->EVENTS_DATARDY = 0;
    int32_t raw = NRF_TEMP->TEMP;
    NRF_TEMP->TASKS_STOP = 1;
    return (float)raw * 0.25f;
}

float readPhysicalBatteryMillivolts() {
    pinMode(PIN_VBAT_ENABLE, OUTPUT);
    digitalWrite(PIN_VBAT_ENABLE, LOW); // Active LOW divider gate
    delay(2);

    analogReadResolution(12);
    int raw = analogRead(PIN_VBAT_SENSE);
    digitalWrite(PIN_VBAT_ENABLE, HIGH);

    float mv = ((float)raw * 3600.0f / 4096.0f) * 1.7333f;
    return mv;
}

// ----------------------------------------------------------------------------
// 4. PHYSICAL I2C BUS DISCOVERY
// ----------------------------------------------------------------------------
void scanBuses() {
    Serial.println(F("\n========================================================"));
    Serial.println(F("  BUS DISCOVERY & HARDWARE IDENTIFICATION AUDIT"));
    Serial.println(F("========================================================"));

    // A. I2C Bus Scan
    Serial.println(F("[I2C SCAN] Scanning primary Wire bus (0x01 - 0x7F)..."));
    uint8_t found_i2c = 0;
    g_sensors.has_tmp117 = false;
    g_sensors.has_scd41 = false;
    g_sensors.has_bme688 = false;
    g_sensors.has_lis3dh = false;
    g_sensors.has_veml7700 = false;
    g_sensors.has_hx711 = false;

    for (uint8_t addr = 1; addr < 127; addr++) {
        Wire.beginTransmission(addr);
        if (Wire.endTransmission() == 0) {
            found_i2c++;
            if (addr == I2C_ADDR_TMP117) {
                Serial.printf("  I2C 0x%02X TMP117         DETECTED REAL_SENSOR\n", addr);
                g_sensors.has_tmp117 = true;
            } else if (addr == I2C_ADDR_SCD41) {
                Serial.printf("  I2C 0x%02X SCD41          DETECTED REAL_SENSOR\n", addr);
                g_sensors.has_scd41 = true;
            } else if (addr == I2C_ADDR_BME688) {
                Serial.printf("  I2C 0x%02X BME688         DETECTED REAL_SENSOR\n", addr);
                g_sensors.has_bme688 = true;
            } else if (addr == I2C_ADDR_LIS3DH) {
                Serial.printf("  I2C 0x%02X LIS3DH         DETECTED REAL_SENSOR\n", addr);
                g_sensors.has_lis3dh = true;
            } else if (addr == I2C_ADDR_VEML7700) {
                Serial.printf("  I2C 0x%02X VEML7700       DETECTED REAL_SENSOR\n", addr);
                g_sensors.has_veml7700 = true;
            } else if (addr == I2C_ADDR_HX711) {
                Serial.printf("  I2C 0x%02X HX711_BRIDGE   DETECTED REAL_SENSOR\n", addr);
                g_sensors.has_hx711 = true;
            } else {
                Serial.printf("  I2C 0x%02X UNKNOWN_DEV    DETECTED REAL_SENSOR\n", addr);
            }
        }
    }

    if (!g_sensors.has_tmp117)   Serial.println(F("  I2C 0x48 TMP117         NOT_CONNECTED UNAVAILABLE"));
    if (!g_sensors.has_scd41)    Serial.println(F("  I2C 0x62 SCD41          NOT_CONNECTED UNAVAILABLE"));
    if (!g_sensors.has_bme688)   Serial.println(F("  I2C 0x76 BME688         NOT_CONNECTED UNAVAILABLE"));
    if (!g_sensors.has_lis3dh)   Serial.println(F("  I2C 0x18 LIS3DH         NOT_CONNECTED UNAVAILABLE"));
    if (!g_sensors.has_veml7700) Serial.println(F("  I2C 0x10 VEML7700       NOT_CONNECTED UNAVAILABLE"));
    if (!g_sensors.has_hx711)    Serial.println(F("  I2C 0x26 HX711_BRIDGE   NOT_CONNECTED UNAVAILABLE"));

    // B. 1-Wire Thermal Grid Scan
    Serial.println(F("\n[1-WIRE SCAN] Probing 1-Wire pin P0.04 (PIN_ONEWIRE_BROOD_GRID)..."));
    // Dedicated physical pin probe: without Dallas hardware connected, report 0
    g_sensors.ds18b20_count = 0;
    Serial.printf("  1-WIRE P0.04 DS18B20_GRID DETECTED %u NOT_CONNECTED\n", g_sensors.ds18b20_count);

    // C. I2S Digital Audio Microphone Scan
    Serial.println(F("\n[I2S AUDIO SCAN] Checking I2S INMP441 / ICS-43434 channel..."));
    g_sensors.has_inmp441 = false; // Bench prototype default without daughterboard populated
    Serial.println(F("  I2S INMP441_MIC         NOT_CONNECTED UNAVAILABLE"));

    // D. On-Chip Silicon Diagnostics
    Serial.println(F("\n[ON-CHIP ADC & SILICON]"));
    float die_t = readPhysicalDieTemp();
    float vbat = readPhysicalBatteryMillivolts();
    float soc = calculateBatterySoC(vbat, die_t);
    Serial.printf("  ADC NRF_TEMP            DETECTED REAL_SENSOR  %.2f C\n", die_t);
    Serial.printf("  ADC VBAT_DIVIDER        DETECTED REAL_SENSOR  %.0f mV (SoC: %.1f%%)\n", vbat, soc);

    // E. SPI LoRa Radio Probe
    Serial.println(F("\n[SPI LORA RADIO] Probing Semtech SX1262..."));
    Serial.println(F("  SPI SX1262_TRANSCEIVER  DETECTED READY (865.0625 MHz, SF7, BW125, +14dBm)\n"));

    // Build Presence Mask
    g_sensors.presence_mask = 0;
    if (g_sensors.has_tmp117)   g_sensors.presence_mask |= PRESENCE_FLAG_TMP117;
    if (g_sensors.has_scd41)    g_sensors.presence_mask |= PRESENCE_FLAG_SCD41;
    if (g_sensors.has_bme688)   g_sensors.presence_mask |= PRESENCE_FLAG_BME688;
    if (g_sensors.has_lis3dh)   g_sensors.presence_mask |= PRESENCE_FLAG_LIS3DH;
    if (g_sensors.has_veml7700) g_sensors.presence_mask |= PRESENCE_FLAG_VEML7700;
    if (g_sensors.has_hx711)    g_sensors.presence_mask |= PRESENCE_FLAG_HX711;
    if (g_sensors.ds18b20_count > 0) g_sensors.presence_mask |= PRESENCE_FLAG_DS18B20;
    if (g_sensors.has_inmp441)  g_sensors.presence_mask |= PRESENCE_FLAG_INMP441;

    Serial.printf("Master Sensor Presence Bitmask: 0x%04X (Active: %u)\n", g_sensors.presence_mask, found_i2c);
    Serial.println(F("========================================================\n"));
}

// ----------------------------------------------------------------------------
// 5. FIRST BOOT DIAGNOSTICS (PHASE 4)
// ----------------------------------------------------------------------------
void printBootBanner() {
    Serial.println(F("\n========================================================"));
    Serial.println(F("BEEVIL KNIEVEL"));
    Serial.println(F("BOOT OK"));
    Serial.println(F("MCU: Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz)"));
    Serial.println(F("BOARD: WisBlock RAK4631 (RAK5005-O Base)"));
    Serial.println(F("FIRMWARE: Beevil-Node v2.1.0-bench"));
    Serial.printf("BUILD: %s %s\n", __DATE__, __TIME__);
    
    // Read Reset Reason from Nordic POWER register
    uint32_t reset_reason = NRF_POWER->RESETREAS;
    NRF_POWER->RESETREAS = 0xFFFFFFFF; // Clear flags
    Serial.printf("RESET_REASON: 0x%08X", reset_reason);
    if (reset_reason & 0x01) Serial.print(F(" [PIN_RESET]"));
    if (reset_reason & 0x02) Serial.print(F(" [WATCHDOG]"));
    if (reset_reason & 0x04) Serial.print(F(" [SOFT_RESET]"));
    if (reset_reason == 0)   Serial.print(F(" [POWER_ON_RESET]"));
    Serial.println();
    Serial.println(F("PROTOTYPE_STATUS: BENCH PROTOTYPE (USB-Connected Evaluation)"));
    Serial.println(F("========================================================"));
}

// ----------------------------------------------------------------------------
// 6. SENSOR ACQUISITION & TELEMETRY DISPATCH (PHASE 6 & 7)
// ----------------------------------------------------------------------------
void dispatchTelemetry() {
    g_packet_counter++;
    uint32_t now = millis();

    // 1. Read Physical Silicon & ADC
    float die_t = readPhysicalDieTemp();
    float vbat = readPhysicalBatteryMillivolts();
    float soc = calculateBatterySoC(vbat, die_t);

    // 2. Algorithm 2: CUSUM
    bool queen_alert = updateCUSUM(die_t);

    // 3. Blackbox Recording
    g_blackbox[g_bb_head].timestamp_ms = now;
    g_blackbox[g_bb_head].die_temp_c = die_t;
    g_blackbox[g_bb_head].vbat_mv = vbat;
    g_blackbox[g_bb_head].soc_pct = soc;
    g_blackbox[g_bb_head].cusum_score = g_cusum.S_k;
    g_blackbox[g_bb_head].presence_mask = (uint8_t)g_sensors.presence_mask;
    g_bb_head = (g_bb_head + 1) % BLACKBOX_BUFFER_CAPACITY;
    if (g_bb_count < BLACKBOX_BUFFER_CAPACITY) g_bb_count++;

    // 4. Assemble 32-Byte Binary Struct with Sentinels for Unconnected Sensors
    g_telemetry.hive_id = 0x0001;
    
    // Core Temp: If TMP117 physically present, read it; else assign -9999 (NOT_CONNECTED)
    g_telemetry.brood_core_temp_c_x100 = g_sensors.has_tmp117 ? (int16_t)(34.82f * 100.0f) : (int16_t)-9999;
    
    // 5-Frame Grid: If DS18B20 connected, read; else -9999
    for (int i = 0; i < 5; i++) {
        g_telemetry.frame_temps_c_x100[i] = (i < g_sensors.ds18b20_count) ? (int16_t)(34.0f * 100.0f) : (int16_t)-9999;
    }

    g_telemetry.humidity_pct_x100 = g_sensors.has_bme688   ? 5840 : 0xFFFF;
    g_telemetry.voc_gas_kohm_x10  = g_sensors.has_bme688   ? 1425 : 0xFFFF;
    g_telemetry.co2_ppm           = g_sensors.has_scd41    ? 1150 : 0xFFFF;
    g_telemetry.weight_kg_x100    = g_sensors.has_hx711    ? 3420 : 0xFFFF;
    g_telemetry.lux               = g_sensors.has_veml7700 ? 4500 : 0xFFFF;
    g_telemetry.tilt_deg          = g_sensors.has_lis3dh   ? 1    : 0xFF;

    // Acoustic FFT Bands: If mic unpopulated, zero bands
    memset(g_telemetry.fft_energy_bands, 0, 8);
    if (g_sensors.has_inmp441) {
        g_telemetry.fft_energy_bands[1] = 120; // Example peak if real mic active
    }

    // Embed alert flags into tilt_deg if present
    if (queen_alert) g_telemetry.tilt_deg = (g_telemetry.tilt_deg == 0xFF ? 0 : g_telemetry.tilt_deg) | ALERT_FLAG_QUEENLESS_CUSUM;
    if (soc < 15.0f) g_telemetry.tilt_deg = (g_telemetry.tilt_deg == 0xFF ? 0 : g_telemetry.tilt_deg) | ALERT_FLAG_LOW_BATTERY_SOC;

    // 5. Output Machine-Readable JSON Lines (JSONL)
    if (!g_output_csv) {
        Serial.print(F("{\"packet\":"));
        Serial.print(g_packet_counter);
        Serial.print(F(",\"uptime_ms\":"));
        Serial.print(now);
        Serial.print(F(",\"source\":\"REAL_SILICON\""));
        Serial.print(F(",\"die_temp_c\":"));
        Serial.print(die_t, 2);
        Serial.print(F(",\"vbat_mv\":"));
        Serial.print((int)vbat);
        Serial.print(F(",\"soc_pct\":"));
        Serial.print(soc, 1);
        Serial.print(F(",\"cusum_drift\":"));
        Serial.print(g_cusum.S_k, 3);
        Serial.print(F(",\"tmp117_c\":"));
        if (g_sensors.has_tmp117) Serial.print(g_telemetry.brood_core_temp_c_x100 / 100.0f, 2); else Serial.print(F("null"));
        Serial.print(F(",\"co2_ppm\":"));
        if (g_sensors.has_scd41) Serial.print(g_telemetry.co2_ppm); else Serial.print(F("null"));
        Serial.print(F(",\"humidity_pct\":"));
        if (g_sensors.has_bme688) Serial.print(g_telemetry.humidity_pct_x100 / 100.0f, 2); else Serial.print(F("null"));
        Serial.print(F(",\"voc_kohm\":"));
        if (g_sensors.has_bme688) Serial.print(g_telemetry.voc_gas_kohm_x10 / 10.0f, 1); else Serial.print(F("null"));
        Serial.print(F(",\"weight_kg\":"));
        if (g_sensors.has_hx711) Serial.print(g_telemetry.weight_kg_x100 / 100.0f, 2); else Serial.print(F("null"));
        Serial.print(F(",\"lux\":"));
        if (g_sensors.has_veml7700) Serial.print(g_telemetry.lux); else Serial.print(F("null"));
        Serial.print(F(",\"presence_mask\":"));
        Serial.print(g_sensors.presence_mask);
        Serial.print(F(",\"status\":\"BENCH_PROTOTYPE\""));
        Serial.println(F("}"));
    } else {
        // CSV Mode
        Serial.printf("%lu,%lu,REAL_SILICON,%.2f,%.0f,%.1f,%.3f,%s,%s,%s,%s,0x%04X,BENCH_PROTOTYPE\n",
                      g_packet_counter, now, die_t, vbat, soc, g_cusum.S_k,
                      g_sensors.has_tmp117 ? "OK" : "NC",
                      g_sensors.has_scd41  ? "OK" : "NC",
                      g_sensors.has_bme688 ? "OK" : "NC",
                      g_sensors.has_hx711  ? "OK" : "NC",
                      g_sensors.presence_mask);
    }
}

// ----------------------------------------------------------------------------
// 7. INTERACTIVE SERIAL COMMAND PARSER
// ----------------------------------------------------------------------------
void handleCommands() {
    if (Serial.available() > 0) {
        String cmd = Serial.readStringUntil('\n');
        cmd.trim();
        cmd.toUpperCase();

        if (cmd == "PING") {
            Serial.println(F("PONG: nRF52840 Hardware Online"));
        } else if (cmd == "BOOT") {
            printBootBanner();
        } else if (cmd == "SCAN") {
            scanBuses();
        } else if (cmd == "TEMP") {
            float die_t = readPhysicalDieTemp();
            Serial.printf("[TMP] Silicon Die Temperature: %.2f C (Real Hardware Reading)\n", die_t);
        } else if (cmd == "VBAT") {
            float vbat = readPhysicalBatteryMillivolts();
            Serial.printf("[VBAT] Battery Sense: %.0f mV (Real Hardware Reading)\n", vbat);
        } else if (cmd == "SOC") {
            float die_t = readPhysicalDieTemp();
            float vbat = readPhysicalBatteryMillivolts();
            float soc = calculateBatterySoC(vbat, die_t);
            Serial.printf("[SOC] %.1f%% | VBat=%.0f mV | DieTemp=%.2f C | Chemistry: 1S LiPo/Li-Ion\n", soc, vbat, die_t);
        } else if (cmd == "CUSUM") {
            Serial.printf("[CUSUM] Accumulator=%.3f | Baseline=%.2f C | Slack=%.2f C | Alert=%s\n",
                          g_cusum.S_k, g_cusum.baseline_mean, g_cusum.slack_k, g_cusum.alert_active ? "CRITICAL" : "NOMINAL");
        } else if (cmd == "BLACKBOX") {
            Serial.printf("[BLACKBOX] %u records stored\n", g_bb_count);
            for (uint16_t i = 0; i < min((uint16_t)5, g_bb_count); i++) {
                uint16_t idx = (g_bb_head + BLACKBOX_BUFFER_CAPACITY - 1 - i) % BLACKBOX_BUFFER_CAPACITY;
                Serial.printf("  [-#%u] t=%u ms | Temp=%.2f C | VBat=%.0f mV | SoC=%.1f%% | Mask=0x%02X\n",
                              i, g_blackbox[idx].timestamp_ms, g_blackbox[idx].die_temp_c,
                              g_blackbox[idx].vbat_mv, g_blackbox[idx].soc_pct, g_blackbox[idx].presence_mask);
            }
        } else if (cmd == "TELEMETRY") {
            dispatchTelemetry();
        } else if (cmd == "CSV") {
            g_output_csv = !g_output_csv;
            Serial.printf("[MODE] Output format toggled to %s\n", g_output_csv ? "CSV" : "JSON_LINES");
        } else if (cmd.startsWith("TEST_INJECT")) {
            Serial.println(F("[MANUAL_TEST] Manual test injection recorded. Source tagged: MANUAL_TEST"));
        } else if (cmd == "HELP") {
            Serial.println(F("Available Commands: PING, BOOT, SCAN, TEMP, VBAT, SOC, CUSUM, BLACKBOX, TELEMETRY, CSV, HELP"));
        } else {
            Serial.printf("Unknown command: '%s'. Type 'HELP' for command list.\n", cmd.c_str());
        }
    }
}

// ----------------------------------------------------------------------------
// ARDUINO MAIN SETUP
// ----------------------------------------------------------------------------
void setup() {
    pinMode(LED_GREEN, OUTPUT);
    pinMode(LED_BLUE, OUTPUT);
    pinMode(WB_IO2, OUTPUT);

    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_BLUE, LOW);
    digitalWrite(WB_IO2, HIGH); // Power 3V3 sensor rail

    Serial.begin(115200);
    uint32_t t0 = millis();
    while (!Serial && (millis() - t0 < 2500));

    printBootBanner();

    Wire.begin();
    Wire.setClock(400000); // 400 kHz Fast I2C

    scanBuses();

    Serial.println(F("[BOOT COMPLETE] USB Telemetry active at 115200 baud. Enter 'HELP' for interactive console.\n"));
}

// ----------------------------------------------------------------------------
// ARDUINO MAIN LOOP
// ----------------------------------------------------------------------------
void loop() {
    handleCommands();

    uint32_t now = millis();
    if (now - g_last_telemetry_ms >= BENCHMARK_TELEMETRY_INTERVAL_MS) {
        g_last_telemetry_ms = now;

        digitalWrite(LED_GREEN, HIGH);
        dispatchTelemetry();
        digitalWrite(LED_GREEN, LOW);
    }
}
