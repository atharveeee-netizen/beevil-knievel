/**
 * ============================================================================
 * BEEVIL KNIEVEL - BATTERY MANAGEMENT & SOC ESTIMATION CONFIGURATION
 * ============================================================================
 * Chemistry: Single-cell Lithium Polymer (LiPo) / Lithium-Ion (NMC)
 * Nominal Capacity: 3000 mAh (1S 3.7V)
 * Charge Voltage: 4.20V | Cutoff Voltage: 3.27V
 *
 * Version: 2.1.0
 * ============================================================================
 */

#ifndef BEEVIL_BATTERY_CONFIG_H
#define BEEVIL_BATTERY_CONFIG_H

/**
 * Battery Voltage Operating Limits
 * Unit: Millivolts (mV)
 * Source: Panasonic / Samsung 18650 Specification Sheets
 * Rationale: 4200 mV is standard CC/CV termination; 3270 mV leaves 5% margin
 *            above the 3.0V LDO dropout voltage to ensure clean brownout shutdown.
 */
static const float VBAT_MAX_FULL_MV           = 4200.0f;  // 100% SoC termination
static const float VBAT_MIN_EMPTY_MV          = 3270.0f;  // 0% SoC cutoff threshold

/**
 * Arrhenius Temperature Derating Coefficient
 * Value: +0.80 mV/°C below 25 °C reference
 * Unit: Millivolts per degree Celsius (mV/°C)
 * Source: Battery University BU-502 (Low-Temperature Performance)
 * Rationale: Electrolyte conductivity decreases in winter apiaries, causing internal
 *            IR drop that depresses terminal voltage by ~0.8 mV/°C below 25 °C.
 */
static const float VBAT_TEMP_COEFF_MV_PER_C   = 0.80f;
static const float VBAT_TEMP_BASELINE_C       = 25.0f;

/**
 * 7-Point Piecewise Open-Circuit Voltage (OCV) Table
 * Units: Millivolts (mV) and Percentage (%)
 * Source: Empirical discharge curve of 3.7V 3000mAh 18650 cell at C/20 discharge rate.
 * Rationale: Piecewise linear segments allow exact on-node SoC estimation without floating-point exp().
 */
static const float OCV_PT_90_MV               = 4050.0f;  // 90% SoC
static const float OCV_PT_70_MV               = 3920.0f;  // 70% SoC
static const float OCV_PT_40_MV               = 3810.0f;  // 40% SoC
static const float OCV_PT_20_MV               = 3730.0f;  // 20% SoC
static const float OCV_PT_10_MV               = 3650.0f;  // 10% SoC

/**
 * Low Battery Warning Threshold
 * Value: 15.0%
 * Unit: Percentage (%)
 * Rationale: Flags bit 5 in telemetry packet to alert beekeeper before deep solar hibernation.
 */
static const float LOW_BATTERY_ALERT_SOC_PCT  = 15.0f;

#endif // BEEVIL_BATTERY_CONFIG_H
