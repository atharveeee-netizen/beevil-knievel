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

/**
 * @brief Classifies a 7-element hive sensor feature vector using int8 TFLite Micro model.
 * 
 * Target Hardware: RAK Wireless RAK4631 (nRF52840 + SX1262)
 * Sensor Input Suite: TI TMP117, Sensirion SHT45, Bosch BME688, TDK ICS-43434, HX711
 * 
 * INPUT Array (in exact 7-element order):
 *   features[0]: temp_core_c      (float, TI TMP117 Brood Temp, ~5 to 40°C)
 *   features[1]: temp_ambient_c   (float, SHT45 Ambient Temp, ~-10 to 45°C)
 *   features[2]: humidity_pct      (float, SHT45 Humidity, 0 to 100%)
 *   features[3]: gas_kohm          (float, BME688 VOC Gas Resistance, 0 to 30 kΩ)
 *   features[4]: weight_kg         (float, HX711 Hive Scale Weight, 0 to 50 kg)
 *   features[5]: weight_delta_kg   (float, 5-Min Weight Delta, -2.0 to +2.0 kg)
 *   features[6]: acoustic_rms      (float, ICS-43434 200-400Hz Band RMS, 0 to 100)
 * 
 * OUTPUT Class Index (0-5):
 *   0 = Healthy (Do Not Transmit over LoRa)
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
