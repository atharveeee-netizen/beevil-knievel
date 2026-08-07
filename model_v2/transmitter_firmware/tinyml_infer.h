/**
 * =============================================================================
 * BEEVIL KNIEVEL (MODEL V2) — TINYML INFERENCE C WRAPPER HEADER
 * Target: STM32WLE5CCU6 (ARM Cortex-M4F)
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
