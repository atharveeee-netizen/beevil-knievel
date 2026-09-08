/**
 * ============================================================================
 * BEEVIL KNIEVEL — SENSOR NODE CONFIGURATION
 * Edit this file to provision the node for your specific apiary.
 * ============================================================================
 */

#ifndef BEEVIL_CONFIG_H
#define BEEVIL_CONFIG_H

// ----------------------------------------------------------------------------
// NODE IDENTIFICATION
// ----------------------------------------------------------------------------
// Unique identifier for this specific hive node (Range: 1-65535)
#define CONFIG_HIVE_NODE_ID            1

// ----------------------------------------------------------------------------
// LORA RADIO SETTINGS
// ----------------------------------------------------------------------------
// Frequency: 865.0625 MHz (IN865 Standard / India WPC)
#define CONFIG_LORA_FREQUENCY_HZ       865062500

// Transmit Power: +14 dBm (25 mW) - Adjust based on local regulations
#define CONFIG_LORA_TX_POWER_DBM       14

// Spreading Factor: SF7 (Fastest airtime, ~60ms payload)
#define CONFIG_LORA_SPREADING_FACTOR   7

// Bandwidth: 125 kHz
#define CONFIG_LORA_BANDWIDTH_KHZ      125

// Coding Rate: 4/5
#define CONFIG_LORA_CODING_RATE        1

// ----------------------------------------------------------------------------
// TELEMETRY SETTINGS
// ----------------------------------------------------------------------------
// Duty Cycle: Time between transmissions in milliseconds (Default: 5 Minutes)
#define CONFIG_TELEMETRY_INTERVAL_MS   300000

// ----------------------------------------------------------------------------
// DSP SETTINGS
// ----------------------------------------------------------------------------
// I2S Acoustic Sampling Rate
#define CONFIG_AUDIO_SAMPLE_RATE_HZ    16000

// FFT Size (Must be power of 2, Max 256 for CMSIS-DSP memory limit)
#define CONFIG_AUDIO_FFT_POINTS        128

// ----------------------------------------------------------------------------
// HARDWARE I2C ADDRESSES
// ----------------------------------------------------------------------------
#define I2C_ADDR_TMP117          0x48       // Medical Brood Probe
#define I2C_ADDR_BME688          0x76       // Bosch VOC Gas & Pressure
#define I2C_ADDR_SCD41           0x62       // Sensirion NDIR CO2
#define I2C_ADDR_VEML7700        0x10       // Solar Lux
#define I2C_ADDR_LIS3DH          0x18       // 3-Axis Tilt & Accelerometer
#define I2C_ADDR_HX711           0x26       // M5Stack Scale ADC

#endif // BEEVIL_CONFIG_H
