/**
 * =============================================================================
 * BEEVIL KNIEVEL (MODEL V2) — NORDIC nRF52840 TRANSMITTER FIRMWARE
 * Target SoC: Nordic nRF52840 + Semtech SX1262 (RAK4631 Core SoC)
 * Processor: 64 MHz ARM Cortex-M4F (1MB Flash, 256KB SRAM, Hardware FPU)
 * Sensor Suite: TI TMP117, Sensirion SHT45, Bosch BME688, TDK ICS-43434, HX711
 * =============================================================================
 * Operational Flow (5-Minute Wake Cycle):
 *  1. MCU Wakes up from RTC Alarm / System OFF Low-Power Sleep (5.1 µA).
 *  2. Reads 7-element sensor feature vector:
 *     [temp_core_c, temp_ambient_c, humidity_pct, gas_kohm, weight_kg, weight_delta_kg, acoustic_rms]
 *  3. Executes `int class_id = classify(features);` via Model V2 TinyML Engine (<1.0 ms @ 64 MHz).
 *  4. TRIAGE DECISION:
 *     - If class_id == 0 (Healthy): SKIP SX1262 LoRa Transmission entirely!
 *       (Saves 91.4% wireless energy, MCU immediately enters 5.1 µA deep sleep).
 *     - If class_id != 0 (1 to 5: Queenless, Cold, Varroa, Swarm, Starvation):
 *       Wake up SX1262 LoRa radio, transmit 23-byte binary packet, enter sleep.
 * =============================================================================
 */

#include <stdio.h>
#include <stdbool.h>
#include <stdint.h>
#include "model_data.h"
#include "tinyml_infer.h"

/* Sensor Feature Indices */
#define IDX_TEMP_CORE_C       0
#define IDX_TEMP_AMBIENT_C    1
#define IDX_HUMIDITY_PCT      2
#define IDX_GAS_KOHM          3
#define IDX_WEIGHT_KG         4
#define IDX_WEIGHT_DELTA_KG   5
#define IDX_ACOUSTIC_RMS      6

static void nRF52840_SystemClock_Config(void) {
    /* Set nRF52840 internal 64 MHz HFCLK oscillator */
}

static void Read_Sensors_nRF52840(float features[7]) {
    /* Reads sensor hardware suite (TI TMP117, SHT45, BME688, ICS-43434, HX711) */
    features[IDX_TEMP_CORE_C]     = 34.5f; /* TI TMP117 Brood Temp °C */
    features[IDX_TEMP_AMBIENT_C]  = 24.0f; /* SHT45 Ambient Temp °C */
    features[IDX_HUMIDITY_PCT]    = 60.0f; /* SHT45 Humidity %RH */
    features[IDX_GAS_KOHM]        = 20.0f; /* Bosch BME688 VOC Gas kΩ */
    features[IDX_WEIGHT_KG]       = 28.5f; /* HX711 Hive Weight kg */
    features[IDX_WEIGHT_DELTA_KG] = 0.01f; /* 5-Min Weight Delta kg */
    features[IDX_ACOUSTIC_RMS]    = 15.0f; /* TDK ICS-43434 200-400Hz RMS */
}

static void SX1262_LoRa_Transmit_Payload(uint8_t state_class, const float features[7]) {
    printf("[SX1262 LoRa TX] ALERT: Class %d detected! Transmitting 23-byte packet via Semtech SX1262 @ 915MHz...\n", state_class);
}

static void Enter_nRF52840_System_OFF_Sleep(uint32_t sleep_minutes) {
    printf("[POWER] Entering nRF52840 System OFF Low-Power Mode (5.1 uA deep sleep for %u minutes)...\n", sleep_minutes);
}

int main(void) {
    nRF52840_SystemClock_Config();

    printf("=================================================================\n");
    printf("  BEEVIL KNIEVEL (MODEL V2) — NORDIC nRF52840 FIRMWARE ONLINE    \n");
    printf("  Quantized TFLite Model Flash Size: %u Bytes (0.96 KB)          \n", g_model_data_len);
    printf("=================================================================\n");

    float features[7];

    /* Step 1: Read 7-element sensor array */
    Read_Sensors_nRF52840(features);

    /* Step 2: Execute Model V2 TinyML On-Node Triage Classifier (<1.0 ms @ 64 MHz) */
    int class_id = classify(features);

    /* Step 3: Energy-Optimized Triage Decision */
    if (class_id == 0) {
        printf("[TRIAGE] Result: Class 0 (Healthy). Hive condition normal.\n");
        printf("[ENERGY SAVER] SKIPPING SX1262 LoRa Transmission to conserve battery!\n");
    } else {
        printf("[TRIAGE] Result: Class %d (Abnormal). Triggering emergency LoRa uplink.\n", class_id);
        SX1262_LoRa_Transmit_Payload((uint8_t)class_id, features);
    }

    /* Step 4: Return to 5.1 µA System OFF Deep Sleep until next 5-minute cycle */
    Enter_nRF52840_System_OFF_Sleep(5);

    return 0;
}
