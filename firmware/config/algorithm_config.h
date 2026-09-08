/**
 * ============================================================================
 * BEEVIL KNIEVEL - ON-NODE ALGORITHMS & PROTOCOL CONFIGURATION
 * ============================================================================
 * Algorithms Covered:
 *   1. CUSUM Thermal Change-Point Detection (Brood Deficit Early Warning)
 *   2. Circular Blackbox Flash/RAM Logger
 *   3. LIS3DH Tilt Tamper & Knockdown Detection
 *   4. Telemetry Transmission Intervals & Duty Cycle
 *
 * Version: 2.1.0
 * ============================================================================
 */

#ifndef BEEVIL_ALGORITHM_CONFIG_H
#define BEEVIL_ALGORITHM_CONFIG_H

#include <stdint.h>

/**
 * CUSUM Thermal Anomaly Change-Point Detection Parameters
 * Source: Page, E. S. (1954) "Continuous Inspection Schemes", Biometrika 41(1/2)
 * Calibrated: Apis mellifera brood nest thermoregulation literature (Southwick & Heldmaier, 1987)
 */

/**
 * Biological Baseline Mean (mu_0)
 * Value: 34.82 °C
 * Unit: Degrees Celsius (°C)
 * Source: Southwick & Heldmaier (1987) "Temperature regulation in honey bee colonies"
 * Rationale: The queen brood nest is actively regulated by worker clustering between 34.5 and 35.5 °C.
 *            The empirical healthy long-term mean across verified colonies is 34.82 °C.
 */
static const float CUSUM_BASELINE_MEAN_C      = 34.82f;

/**
 * Allowable Slack / Tolerance Parameter (k)
 * Value: 0.15 °C
 * Unit: Degrees Celsius (°C)
 * Rationale: Natural diurnal oscillations produce small variations (+/-0.15 °C) that should NOT
 *            accumulate into the CUSUM anomaly sum. Only persistent downward drift triggers the accumulator.
 */
static const float CUSUM_SLACK_K_C            = 0.15f;

/**
 * Decision Threshold (h)
 * Value: 1.20 °C·hr (or normalized deficit units)
 * Unit: Degree-hours (°C·hr)
 * Rationale: Accumulated continuous cooling below (baseline - slack) exceeding 1.20 degree-hours
 *            corresponds to loss of worker thermoregulation (queen death, brood abandonment, or severe chill).
 */
static const float CUSUM_THRESHOLD_H          = 1.20f;

/**
 * Non-Volatile Blackbox Circular Buffer Depth
 * Value: 64 records
 * Unit: Records
 * Rationale: 64 records at 5-minute sampling interval provides 5.33 hours of offline telemetry
 *            history during LoRa gateway reboots or transient RF fading.
 */
#define BLACKBOX_BUFFER_CAPACITY              64

/**
 * LIS3DH Tilt Tamper Angle
 * Value: 15.0 degrees
 * Unit: Degrees (°)
 * Rationale: Normal hive settling produces < 2° tilt. An angle exceeding 15° reliably indicates
 *            box knockdown by bears, cattle, high windstorms, or unauthorized physical theft.
 */
static const float TILT_TAMPER_THRESHOLD_DEG  = 15.0f;

/**
 * Telemetry Transmission Timing
 * Units: Milliseconds (ms)
 * Rationale:
 *   - Nominal Field Interval: 300,000 ms (5 minutes) provides 2+ years battery life on 3000 mAh cell.
 *   - Benchmark Interval: 5,000 ms (5 seconds) used for automated lab testing and demonstration.
 */
#define NOMINAL_TELEMETRY_INTERVAL_MS         300000UL  // 5 Minutes (Production)
#define BENCHMARK_TELEMETRY_INTERVAL_MS       5000UL    // 5 Seconds (Bench Test)

#endif // BEEVIL_ALGORITHM_CONFIG_H
