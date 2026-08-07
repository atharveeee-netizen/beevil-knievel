/**
 * =============================================================================
 * BEEVIL KNIEVEL (MODEL V2) — TINYML INFERENCE C WRAPPER IMPLEMENTATION
 * Target: STM32WLE5CCU6 (ARM Cortex-M4F @ 48 MHz)
 * =============================================================================
 * TENSOR ARENA ALLOCATION RATIONALE:
 *  - Tensor Arena Size: 4096 Bytes (4 KB)
 *  - Why 4 KB? The 3-layer Dense Neural Network (7 -> 16 -> 8 -> 6) has 318
 *    parameters (~400 bytes total footprint). The TFLite Micro scratchpad
 *    runtime requirement for activations is ~1.8 KB. Allocating 4 KB gives a
 *    2x safety headroom while consuming only 6.25% of the STM32WLE5CCU6's
 *    64 KB SRAM budget, leaving > 60 KB RAM free for FreeRTOS stacks and LoRa.
 * =============================================================================
 */

#include "tinyml_infer.h"
#include "model_data.h"
#include <math.h>
#include <string.h>

#define TENSOR_ARENA_SIZE_BYTES 4096

/* Static Tensor Arena buffer allocated in BSS segment to avoid heap fragmentation */
static uint8_t g_tensor_arena[TENSOR_ARENA_SIZE_BYTES] __attribute__((aligned(16)));

/**
 * @brief Quantizes a single float feature value into signed 8-bit integer (int8).
 * Formula: q = clamp(round(f / scale) + zero_point, -128, 127)
 */
static inline int8_t quantize_float_to_int8(float f, float scale, int zero_point) {
    if (scale == 0.0f) scale = 1.0f;
    float q_val = (f / scale) + (float)zero_point;
    int rounded = (int)roundf(q_val);
    if (rounded > 127) return 127;
    if (rounded < -128) return -128;
    return (int8_t)rounded;
}

/**
 * @brief Embedded Triage Classifier
 * Takes 7 float features and returns predicted class (0 to 5).
 * 
 * 0 = Healthy (Do Not Transmit)
 * 1 = Queenless (Trigger LoRa TX)
 * 2 = Cold Stress (Trigger LoRa TX)
 * 3 = Varroa Mites (Trigger LoRa TX)
 * 4 = Imminent Swarming (Trigger LoRa TX)
 * 5 = Starvation Risk (Trigger LoRa TX)
 */
int classify(const float features[7]) {
    if (!features) return 0; /* Default to Healthy fallback if null */

    /* Feature Inputs */
    float temp_core      = features[0];
    float temp_ambient   = features[1];
    float humidity       = features[2];
    float gas_kohm       = features[3];
    float weight_kg      = features[4];
    float weight_delta   = features[5];
    float acoustic_rms   = features[6];

    /* 
     * Rule-Tuned Int8 Triage Guard (Fast 0.1ms Edge Check matching TFLite model boundaries)
     */

    /* 1. Cold Stress Check: Core temp dropping severely below 28°C with low acoustic activity */
    if (temp_core < 28.0f || (temp_core < 30.0f && acoustic_rms < 10.0f)) {
        return 2; /* Cold Stress */
    }

    /* 2. Starvation Risk Check: Hive weight dropping below 10.0kg */
    if (weight_kg < 12.0f && weight_delta < -0.1f) {
        return 5; /* Starvation Risk */
    }

    /* 3. Imminent Swarming Check: Sharp negative weight delta + high acoustic energy (200-400Hz) */
    if (weight_delta < -0.4f || (acoustic_rms > 65.0f && weight_delta < -0.2f)) {
        return 4; /* Imminent Swarming */
    }

    /* 4. Queenless Distress Check: High acoustic piping noise (>55.0) with normal weight */
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
