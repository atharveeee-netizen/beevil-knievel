/**
 * ============================================================================
 * BEEVIL KNIEVEL - SENSOR NODE CONFIGURATION
 * Proxies to centralized firmware configuration headers.
 * ============================================================================
 */

#ifndef BEEVIL_CONFIG_H
#define BEEVIL_CONFIG_H

#include "../../config/hardware_config.h"
#include "../../config/radio_config.h"
#include "../../config/sensor_config.h"
#include "../../config/battery_config.h"
#include "../../config/algorithm_config.h"

// ----------------------------------------------------------------------------
// NODE IDENTIFICATION
// ----------------------------------------------------------------------------
#define CONFIG_HIVE_NODE_ID            1

// ----------------------------------------------------------------------------
// LEGACY COMPATIBILITY MACROS
// ----------------------------------------------------------------------------
#define CONFIG_LORA_FREQUENCY_HZ       RF_FREQUENCY_HZ
#define CONFIG_LORA_TX_POWER_DBM       DEFAULT_TX_POWER_DBM
#define CONFIG_LORA_SPREADING_FACTOR   LORA_SPREADING_FACTOR
#define CONFIG_LORA_BANDWIDTH_KHZ      ((uint32_t)LORA_BANDWIDTH_KHZ)
#define CONFIG_LORA_CODING_RATE        1
#define CONFIG_TELEMETRY_INTERVAL_MS   NOMINAL_TELEMETRY_INTERVAL_MS
#define CONFIG_AUDIO_SAMPLE_RATE_HZ    AUDIO_SAMPLE_RATE_HZ
#define CONFIG_AUDIO_FFT_POINTS        AUDIO_FFT_POINTS

#endif // BEEVIL_CONFIG_H
