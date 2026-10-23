#ifndef CONFIG_H
#define CONFIG_H

// ----------------------------------------------------------------------------
// BEEVIL KNIEVEL - TRANSMITTER CONFIGURATION ENTRYPOINT
// Centralized modular configuration headers
// ----------------------------------------------------------------------------
#include "../config/hardware_config.h"
#include "../config/radio_config.h"
#include "../config/sensor_config.h"
#include "../config/battery_config.h"
#include "../config/algorithm_config.h"

// Backward-compatibility aliases
#define RF_FREQUENCY          RF_FREQUENCY_MHZ
#define DEFAULT_TX_POWER      DEFAULT_TX_POWER_DBM
#define MIN_TX_POWER          MIN_TX_POWER_DBM
#define MAX_TX_POWER          MAX_TX_POWER_DBM
#define LORA_BANDWIDTH        LORA_BANDWIDTH_KHZ

#endif // CONFIG_H
