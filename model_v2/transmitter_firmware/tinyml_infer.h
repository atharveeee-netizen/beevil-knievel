/**
 * =============================================================================
 * BEEVIL KNIEVEL (MODEL V2) — TINYML INFERENCE C WRAPPER HEADER
 * Target SoC: Nordic nRF52840 + Semtech SX1262 (RAK4631 Core SoC)
 * Processor: 64 MHz ARM Cortex-M4F (1MB Flash, 256KB SRAM, Hardware FPU)
 * =============================================================================
 */

#ifndef TINYML_INFER_H
#define TINYML_INFER_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

int classify(const float features[7]);

#ifdef __cplusplus
}
#endif

#endif /* TINYML_INFER_H */
