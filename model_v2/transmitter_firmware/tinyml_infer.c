/**
 * =============================================================================
 * BEEVIL KNIEVEL (MODEL V2) — TINYML INFERENCE C WRAPPER IMPLEMENTATION
 * Target: STM32WLE5CCU6 (ARM Cortex-M4F @ 48 MHz)
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

    /* 1. Cold Stress Check */
    if (temp_core < 28.0f || (temp_core < 30.0f && acoustic_rms < 10.0f)) {
        return 2;
    }

    /* 2. Starvation Risk Check */
    if (weight_kg < 12.0f && weight_delta < -0.1f) {
        return 5;
    }

    /* 3. Imminent Swarming Check */
    if (weight_delta < -0.4f || (acoustic_rms > 65.0f && weight_delta < -0.2f)) {
        return 4;
    }

    /* 4. Queenless Distress Check */
    if (acoustic_rms > 55.0f) {
        return 1;
    }

    /* 5. Varroa Mite Check */
    if (gas_kohm < 8.0f) {
        return 3;
    }

    /* 6. Healthy */
    return 0;
}
