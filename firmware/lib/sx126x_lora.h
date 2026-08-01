/**
 * ============================================================================
 * BEEVIL KNIEVEL — SX126x Sub-GHz LoRaWAN Radio Driver Header
 * Optimized for STM32WLE5JC (Seeed Wio-E5 @ 868MHz)
 * ============================================================================
 */

#ifndef SX126X_LORA_H
#define SX126X_LORA_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
    float frequency_mhz;   // 868.0 MHz
    float bandwidth_khz;   // 125.0 kHz
    uint8_t spreading_factor; // SF7
    uint8_t coding_rate;   // 4/5
    int8_t tx_power_dbm;   // 14 dBm
} LoRa_Config;

/**
 * Initializes SX126x internal transceiver inside STM32WLE5JC
 */
int SX126x_Init(const LoRa_Config* config);

/**
 * Transmits raw 12-byte telemetry packet via 868MHz LoRa radio
 */
int SX126x_Transmit(const uint8_t* payload, uint8_t length);

/**
 * Puts radio into ultra-low-power sleep mode (<100 nA)
 */
void SX126x_EnterSleep(void);

#ifdef __cplusplus
}
#endif

#endif // SX126X_LORA_H
