/**
 * ============================================================================
 * BEEVIL KNIEVEL - HARDWARE PIN & PLATFORM CONFIGURATION
 * ============================================================================
 * Canonical Target Platform:
 *   MCU:       Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz)
 *   Module:    RAKwireless RAK4631 WisBlock Core
 *   Baseboard: RAK5005-O WisBlock Base
 *   Radio:     Semtech SX1262 LoRa Transceiver
 *
 * Version: 2.1.0
 * ============================================================================
 */

#ifndef BEEVIL_HARDWARE_CONFIG_H
#define BEEVIL_HARDWARE_CONFIG_H

#include <stdint.h>

// ----------------------------------------------------------------------------
// GPIO PIN ALLOCATION (RAK4631 on RAK5005-O Baseboard)
// ----------------------------------------------------------------------------

/**
 * Status LEDs
 * Unit: Arduino Pin Number / Nordic GPIO Port.Pin
 * Source: RAK4631 WisBlock Core Schematic (v2.0)
 * Rationale: Dual user indicators for RF TX heartbeat and error status.
 */
#ifndef LED_GREEN
  #define LED_GREEN                 35   // P1.03 - Heartbeat / LoRa TX Indicator
#endif
#ifndef LED_BLUE
  #define LED_BLUE                  36   // P1.04 - Packet Ack / Anomaly Alert Indicator
#endif

/**
 * Switched Sensor Power Rail (WB_IO2)
 * Unit: Arduino Pin Number
 * Source: RAK5005-O Base Board Hardware Manual
 * Rationale: Drives high-side P-channel MOSFET to completely isolate sensor 3V3 rail
 *            during System-ON sleep, cutting quiescent draw to < 18 uA.
 */
#ifndef WB_IO2
  #define WB_IO2                    34   // P1.02 - 3V3 Sensor Power Rail Gate (LOW=OFF, HIGH=ON)
#endif

/**
 * Battery & Bus Voltage ADC Divider
 * Unit: Arduino Analog Pin & Digital Control Pin
 * Source: RAK4631 Core Reference Manual
 * Rationale: High-impedance divider (1.5M / 1.0M) controlled by P0.29 gate prevents
 *            constant parasitic battery discharge through the ADC input.
 */
#define PIN_VBAT_SENSE              A0   // P0.05 - AIN3 (Analog Input)
#define PIN_VBAT_ENABLE             30   // P0.29 - Divider Enable Gate (Active LOW)

/**
 * ADC Electrical Calibration Parameters
 * Source: Nordic nRF52840 Product Specification v1.3 (Section 6.22 SAADC)
 * Rationale: Internal 0.6V reference with 1/6 pre-scaling yields 3.6V full-scale range;
 *            12-bit oversampling delivers 0.88 mV/LSB precision.
 */
static const float ADC_INTERNAL_REF_V      = 3.60f;    // Unit: Volts (0.6V * 6 gain)
static const float ADC_RESOLUTION_COUNTS   = 4096.0f;  // Unit: LSBs (12-bit SAADC)
static const float VBAT_DIVIDER_RATIO      = 1.7333f;  // Unit: Dimensionless ((1.5M + 1.0M) / 1.5M or 1.73)

/**
 * 1-Wire Thermal Grid Bus
 * Unit: Arduino Pin Number
 * Source: Sensor sub-board pin map
 * Rationale: Dedicated hardware pin with 4.7k pullup for 5x DS18B20 brood frames.
 */
#define PIN_ONEWIRE_BROOD_GRID      4    // P0.04 - 1-Wire Data Line

#endif // BEEVIL_HARDWARE_CONFIG_H
