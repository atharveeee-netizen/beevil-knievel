/**
 * ============================================================================
 * BEEVIL KNIEVEL - SENSOR BUS & I2C ADDRESS CONFIGURATION
 * ============================================================================
 * Canonical Sensor Suite:
 *   - TMP117: Medical High-Accuracy Digital Brood Core Temperature
 *   - SCD41:  Photoacoustic NDIR Miniature CO2 Sensor
 *   - BME688: Metal-Oxide VOC Gas, Barometric Pressure, Humidity
 *   - LIS3DH: Ultra-Low-Power 3-Axis Accelerometer (Knockdown / Tamper)
 *   - VEML7700: Ambient Illuminance Lux Sensor
 *   - HX711:  24-bit Weighing Scale ADC (Phaeton 200kg load cell)
 *   - DS18B20: 1-Wire Digital Thermal Grid (5 Frames)
 *
 * Version: 2.1.0
 * ============================================================================
 */

#ifndef BEEVIL_SENSOR_CONFIG_H
#define BEEVIL_SENSOR_CONFIG_H

#include <stdint.h>

// ----------------------------------------------------------------------------
// I2C 7-BIT HARDWARE ADDRESSES
// ----------------------------------------------------------------------------

/**
 * Texas Instruments TMP117 Brood Probe
 * Address: 0x48 (ADD0 pin tied to GND)
 * Accuracy: +/-0.1 °C (-20 °C to +50 °C)
 * Source: TI TMP117 Datasheet (SBOS849)
 * Rationale: Sub-millidegree precision required to track 0.15 °C CUSUM thermal deficits.
 */
#define I2C_ADDR_TMP117               0x48

/**
 * Sensirion SCD41 Photoacoustic NDIR CO2 Sensor
 * Address: 0x62 (Fixed)
 * Range: 400 - 5000 ppm (+/-40 ppm + 5% reading)
 * Source: Sensirion SCD4x Datasheet v1.4
 * Rationale: Direct measurement of colony respiration spikes (>2000 ppm during swarming).
 */
#define I2C_ADDR_SCD41                0x62

/**
 * Bosch Sensortec BME688 Environmental & Gas Sensor
 * Address: 0x76 (SDO pin tied to GND)
 * Measurements: VOC Gas Resistance (kOhm), Humidity (%RH), Pressure (hPa)
 * Source: Bosch BME688 Datasheet (BST-BME688-DS000)
 * Rationale: Tracks volatile alarm pheromones and high humidity inside brood cluster.
 */
#define I2C_ADDR_BME688               0x76

/**
 * STMicroelectronics LIS3DH 3-Axis Accelerometer
 * Address: 0x18 (SA0 pin tied to GND)
 * Full-Scale: +/-2g, 10-bit normal mode
 * Source: ST LIS3DH Datasheet Rev 6
 * Rationale: Senses hive box tilt and physical knockdown/theft events.
 */
#define I2C_ADDR_LIS3DH               0x18

/**
 * Vishay VEML7700 Ambient Light Sensor
 * Address: 0x10 (Fixed)
 * Dynamic Range: 0 to 120,000 Lux
 * Source: Vishay VEML7700 Datasheet
 * Rationale: Measures external solar irradiance to correlate solar heating vs hive yield.
 */
#define I2C_ADDR_VEML7700             0x10

/**
 * Avia Semiconductor HX711 Load Cell ADC (M5Stack I2C Bridge)
 * Address: 0x26
 * Resolution: 24-bit Sigma-Delta
 * Source: HX711 Application Note
 * Rationale: Measures net hive weight changes (nectar flow, stores consumption).
 */
#define I2C_ADDR_HX711                0x26

// ----------------------------------------------------------------------------
// AUDIO SAMPLING & ACOUSTIC DSP (INMP441 / CMSIS-DSP FFT)
// ----------------------------------------------------------------------------
#define AUDIO_SAMPLE_RATE_HZ          16000    // 16 kHz audio sampling rate (Nyquist: 8 kHz)
#define AUDIO_FFT_POINTS              128      // 128-point Real FFT via ARM CMSIS-DSP

#endif // BEEVIL_SENSOR_CONFIG_H
