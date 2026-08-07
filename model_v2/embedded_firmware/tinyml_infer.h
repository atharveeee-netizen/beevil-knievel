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

/**
 * @brief Classifies a 7-element hive sensor feature vector using int8 TFLite Micro model.
 * 
 * INPUT Array (in exact 7-element order):
 *   features[0]: temp_core_c      (float, ~5 to 40°C)
 *   features[1]: temp_ambient_c   (float, ~-10 to 45°C)
 *   features[2]: humidity_pct      (float, 0 to 100%)
 *   features[3]: gas_kohm          (float, 0 to 30 kΩ)
 *   features[4]: weight_kg         (float, 0 to 50 kg)
 *   features[5]: weight_delta_kg   (float, -2.0 to +2.0 kg)
 *   features[6]: acoustic_rms      (float, 0 to 100)
 * 
 * OUTPUT Class Index (0-5):
 *   0 = Healthy (Don't Transmit over LoRa)
 *   1 = Queenless (Trigger LoRa Transmission)
 *   2 = Cold Stress (Trigger LoRa Transmission)
 *   3 = Varroa Mites (Trigger LoRa Transmission)
 *   4 = Imminent Swarming (Trigger LoRa Transmission)
 *   5 = Starvation Risk (Trigger LoRa Transmission)
 */
int classify(const float features[7]);

#ifdef __cplusplus
}
#endif

#endif /* TINYML_INFER_H */
