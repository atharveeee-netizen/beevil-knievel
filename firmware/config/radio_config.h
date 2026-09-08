/**
 * ============================================================================
 * BEEVIL KNIEVEL - LORA RADIO FREQUENCY CONFIGURATION
 * ============================================================================
 * Canonical RF Standard:
 *   Band:     IN865-867 MHz (Wireless Planning & Coordination Wing, India)
 *   Standard: WPC GSR 564(E) License-Free Low Power Equipment Regulations
 *   Hardware: Semtech SX1262 LoRa Sub-GHz Transceiver
 *
 * Version: 2.1.0
 * ============================================================================
 */

#ifndef BEEVIL_RADIO_CONFIG_H
#define BEEVIL_RADIO_CONFIG_H

#include <stdint.h>

/**
 * Center Carrier Frequency
 * Value: 865.0625 MHz
 * Unit: Megahertz (MHz)
 * Source: LoRa Alliance Regional Parameters v1.0.3 (IN865 Channel 0)
 * Rationale: Standard primary uplink channel for license-free apiculture telemetry.
 */
#define RF_FREQUENCY_MHZ              865.0625f
#define RF_FREQUENCY_HZ               865062500UL

/**
 * Transmit Power Limits
 * Unit: dBm (Decibel-milliwatts)
 * Source: India WPC Regulatory Limit: +14 dBm (25 mW ERP max)
 * Rationale: Default to +14 dBm for maximum link margin in dense apiary orchards;
 *            ADR can scale down to +2 dBm when line-of-sight gateway RSSI > -70 dBm.
 */
#define DEFAULT_TX_POWER_DBM          14
#define MIN_TX_POWER_DBM              2
#define MAX_TX_POWER_DBM              14

/**
 * LoRa Modulation Parameters
 * Source: Semtech SX1261/2 Datasheet Rev 2.1 (Section 6)
 * Rationale: SF7 / BW125 / CR 4/5 gives 61.7 ms time-on-air for 32-byte payload,
 *            minimizing RF collision probability across 100 synchronized nodes.
 */
#define LORA_BANDWIDTH_KHZ            125.0f
#define LORA_SPREADING_FACTOR         7
#define LORA_CODING_RATE              5        // 4/5 Error Correction Coding
#define LORA_PREAMBLE_LENGTH          8        // 8 symbols standard preamble
#define LORA_CRC_ENABLED              true     // Enable hardware 16-bit CRC check

/**
 * Adaptive Data Rate (ADR) Thresholds
 * Unit: dBm
 * Source: Apiary Path Loss Measurements & 3D FDTD Simulation
 * Rationale: Ensure > 10 dB SNR margin above SX1262 sensitivity floor (-124 dBm at SF7).
 */
static const int16_t ADR_TARGET_RSSI_HIGH_DBM  = -70;  // Reduce TX power if RSSI stronger than this
static const int16_t ADR_TARGET_RSSI_LOW_DBM   = -105; // Increase TX power / SF if RSSI weaker than this
static const uint8_t ADR_BACKOFF_PACKET_COUNT  = 3;    // Number of lost ACKs before stepping up power

#endif // BEEVIL_RADIO_CONFIG_H
