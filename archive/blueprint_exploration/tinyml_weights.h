/**
 * ============================================================================
 * BEEVIL KNIEVEL - ON-NODE QUANTIZED INT8 TINYML ACOUSTIC MODEL WEIGHTS
 * ============================================================================
 * Platform: Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz)
 * Library: ARM CMSIS-NN (arm_fully_connected_q7)
 * Architecture: 8 Inputs -> 16 Units -> 8 Units -> 2 Classes (Healthy / Distress)
 * Total Flash: 298 Bytes | RAM: <128 Bytes | Latency: 0.18 ms | Energy: 2.5 uJ
 * ============================================================================
 */

#ifndef BEEVIL_TINYML_WEIGHTS_H
#define BEEVIL_TINYML_WEIGHTS_H

#include <stdint.h>

// Layer 1: 8 Inputs -> 16 Hidden Units (Scale factor: 40.6328)
static const int8_t TINYML_L1_WEIGHTS[16 * 8] = {
    7, 43, -70, 78, 24, -10, -12, -53, 16, -43, 77, -63, -16, 17, 15, 64, 21, -40, 51, -73, -43, 5, -4, 73, -13, -9, -6, -11, -1, -16, 11, -14, 11, 2, -5, 9, 2, 12, 2, -5, 0, -41, 58, -59, -28, -5, 2, 45, 24, -30, -127, 70, 33, 17, 60, 4, 5, 0, 11, -10, 1, -10, 4, -5, 4, -3, 12, -8, -9, -9, 13, 5, 14, -12, -14, -11, -10, 6, 5, 12, -10, -13, 4, -9, 5, -7, 5, -15, -7, 4, 3, -4, 9, 10, -10, -8, 17, 35, -61, 59, 27, -2, -4, -70, 0, -10, -12, -8, -13, -9, 14, 3, -22, 25, -62, 64, 44, -7, 5, -87, 0, -5, -1, -10, -10, -8, -5, -11
};

static const int8_t TINYML_L1_BIAS[16] = {
    6, 3, 9, 2, -12, 6, 0, -5, -12, -14, 1, -3, 10, -12, 7, -11
};

// Layer 2: 16 Hidden -> 8 Hidden Units (Scale factor: 29.3887)
static const int8_t TINYML_L2_WEIGHTS[8 * 16] = {
    29, -1, -7, 7, 7, 0, 127, -3, -1, -5, 4, -5, 42, 3, 58, -4, 2, -3, -4, -5, 3, -6, -7, 6, 2, -4, -6, 0, 1, -2, -10, -3, -30, 36, 36, -8, 2, 16, -109, -3, 4, 4, 5, -1, -32, 1, -41, -2, 5, 4, -3, -2, 0, -3, 2, 2, -7, -3, 6, 3, 0, -4, -7, -7, -2, 2, 5, 3, -6, -4, -1, 7, 1, -2, 3, -3, -5, 5, -3, -1, -25, 27, 34, 3, -5, 1, -100, 5, 4, 6, 4, 2, -10, -6, -44, -7, -5, 0, -16, -3, -1, -10, 41, 2, -2, 5, -5, -5, 10, -4, 92, -7, 1, -5, 1, 3, 5, -6, 2, -3, 3, 7, -1, 0, -5, -6, 0, -7
};

static const int8_t TINYML_L2_BIAS[8] = {
    15, 0, 13, -4, -6, 7, 2, -10
};

// Layer 3: 8 Hidden -> 2 Output Classes (Scale factor: 44.5283)
static const int8_t TINYML_L3_WEIGHTS[2 * 8] = {
    -69, -5, 98, -4, -6, 107, -26, 8, 79, -7, -101, -10, -14, -127, 17, -4
};

static const int8_t TINYML_L3_BIAS[2] = {
    -25, 14
};

#endif // BEEVIL_TINYML_WEIGHTS_H
