/**
 * =============================================================================
 * BEEVIL KNIEVEL (MODEL V2) — STM32WLE5CCU6 TRANSMITTER FIRMWARE
 * Target: STM32WLE5CCU6 (ARM Cortex-M4F, 256KB Flash, 64KB RAM)
 * =============================================================================
 * Operational Flow (5-Minute Wake Cycle):
 *  1. MCU Wakes up from RTC Alarm / Deep Sleep.
 *  2. Reads 7-element sensor feature vector:
 *     [temp_core_c, temp_ambient_c, humidity_pct, gas_kohm, weight_kg, weight_delta_kg, acoustic_rms]
 *  3. Executes `int class_id = classify(features);` via Model V2 TinyML Engine.
 *  4. TRIAGE DECISION:
 *     - If class_id == 0 (Healthy): SKIP LoRa Transmission entirely!
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

/* Hardware Subsystem Stubs for STM32WLE5CCU6 */
static void SystemClock_Config(void) {
    /* Set STM32WLE5CCU6 system clock to 48 MHz */
}

static void Read_Sensors(float features[7]) {
    /* Simulated 7-element sensor readings from I2C/ADC/1-Wire */
    features[IDX_TEMP_CORE_C]     = 34.5f; /* Brood Temp °C */
    features[IDX_TEMP_AMBIENT_C]  = 24.0f; /* Ambient Temp °C */
    features[IDX_HUMIDITY_PCT]    = 60.0f; /* Humidity %RH */
    features[IDX_GAS_KOHM]        = 20.0f; /* VOC Gas kΩ */
    features[IDX_WEIGHT_KG]       = 28.5f; /* Weight kg */
    features[IDX_WEIGHT_DELTA_KG] = 0.01f; /* Weight Delta kg */
    features[IDX_ACOUSTIC_RMS]    = 15.0f; /* 200-400Hz Acoustic RMS */
}

static void LoRa_SX1262_Transmit_Payload(uint8_t state_class, const float features[7]) {
    printf("[LoRa TX] ALERT: Class %d detected! Transmitting 23-byte packet via SX1262 radio @ 915MHz...\n", state_class);
}

static void Enter_STM32_Deep_Sleep(uint32_t sleep_minutes) {
    printf("[POWER] Entering STM32WLE5 Stop/Standby Mode (5.1 uA deep sleep for %u minutes)...\n", sleep_minutes);
}

int main(void) {
    SystemClock_Config();

    printf("=================================================================\n");
    printf("  BEEVIL KNIEVEL (MODEL V2) — STM32WLE5CCU6 FIRMWARE INITIALIZED \n");
    printf("  Quantized TFLite Model Flash Size: %u Bytes                    \n", g_model_data_len);
    printf("=================================================================\n");

    float features[7];

    /* Step 1: Read 7-element sensor array */
    Read_Sensors(features);

    /* Step 2: Execute Model V2 TinyML On-Node Triage Classifier */
    int class_id = classify(features);

    /* Step 3: Energy-Optimized Triage Decision */
    if (class_id == 0) {
        printf("[TRIAGE] Result: Class 0 (Healthy). Hive condition normal.\n");
        printf("[ENERGY SAVER] SKIPPING LoRa Transmission to conserve battery!\n");
    } else {
        printf("[TRIAGE] Result: Class %d (Abnormal). Triggering emergency LoRa uplink.\n", class_id);
        LoRa_SX1262_Transmit_Payload((uint8_t)class_id, features);
    }

    /* Step 4: Return to Deep Sleep until next 5-minute cycle */
    Enter_STM32_Deep_Sleep(5);

    return 0;
}
