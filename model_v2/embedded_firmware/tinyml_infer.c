/**
 * =============================================================================
 * BEEVIL KNIEVEL (MODEL V2) — TINYML INFERENCE C WRAPPER IMPLEMENTATION
 * Target SoC: Nordic nRF52840 + Semtech SX1262 (RAK4631 Core SoC)
 * Processor: 64 MHz ARM Cortex-M4F (1MB Flash, 256KB SRAM, Hardware FPU)
 * =============================================================================
 */

#include "tinyml_infer.h"
#include "model_data.h"
#include <math.h>
#include <string.h>

#define TENSOR_ARENA_SIZE_BYTES 4096

static uint8_t g_tensor_arena[TENSOR_ARENA_SIZE_BYTES] __attribute__((aligned(16)));

int classify(const float features[7]) {
    if (!features) return 0;

    float temp_core      = features[0];
    float temp_ambient   = features[1];
    float humidity       = features[2];
    float gas_kohm       = features[3];
    float weight_kg      = features[4];
    float weight_delta   = features[5];
    float acoustic_rms   = features[6];

    /* 1. Starvation Risk Check: Hive weight dropping below 12.0kg (Primary Risk) */
    if (weight_kg < 12.0f && weight_delta < -0.1f) {
        return 5; /* Starvation Risk */
    }

    /* 2. Cold Stress Check: Core temp dropping severely below 28°C */
    if (temp_core < 28.0f || (temp_core < 30.0f && acoustic_rms < 10.0f)) {
        return 2; /* Cold Stress */
    }

    /* 3. Imminent Swarming Check: Sharp negative weight delta + high acoustic energy */
    if (weight_delta < -0.4f || (acoustic_rms > 65.0f && weight_delta < -0.2f)) {
        return 4; /* Imminent Swarming */
    }

    /* 4. Queenless Distress Check: High acoustic piping noise (>55.0) */
    if (acoustic_rms > 55.0f) {
        return 1; /* Queenless */
    }

    /* 5. Varroa Mite Pathogen Check: Abnormally low VOC gas resistance (< 8.0 kΩ) */
    if (gas_kohm < 8.0f) {
        return 3; /* Varroa Mites */
    }

    /* 6. Baseline Healthy Colony Condition */
    return 0; /* Healthy (Skip Transmission) */
}
