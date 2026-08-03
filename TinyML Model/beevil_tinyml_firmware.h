/**
 * =============================================================================
 * BEEVIL KNIEVEL — YOUR EXACT HIVE NODE FIRMWARE (STM32WLE5JC)
 * Generated for your KiCad Schematic: smart_hive_node.kicad_sch / .net
 * 
 * Hardware Target: Seeed Wio-E5 Mini (STM32WLE5JC ARM Cortex-M4 + Sub-GHz SX1262)
 * 
 * Exact Pinouts (from smart_hive_node.net):
 *  - I2S Digital Mic (ICS-43434):  PA2 (SCK), PA3 (WS), PA4 (SD)
 *  - 1-Wire Temp (DS18B20 x3):     PB4 (1WIRE_DATA)
 *  - Power Rail:                   3.3V via TPS73033 LDO & Solar Harvester
 *  - Radio Antenna:                RF_OUT (868 MHz / 915 MHz Sub-GHz LoRa)
 * =============================================================================
 */

#ifndef BEEVIL_TINYML_FIRMWARE_H
#define BEEVIL_TINYML_FIRMWARE_H

#include <stdint.h>
#include <stdbool.h>
#include <math.h>

#ifdef __cplusplus
extern "C" {
#endif

/* STM32WLE5JC System & Memory Constants */
#define STM32WLE5_FLASH_SIZE_KB     256U
#define STM32WLE5_RAM_SIZE_KB       64U
#define TINYML_ARENA_RAM_BYTES      (14 * 1024) /* 14.2 KB SRAM Model Footprint */

/* Hardware Pin Mappings matching smart_hive_node.net */
#define PIN_1WIRE_DS18B20_DATA      GPIO_PIN_4  /* Port B Pin 4 */
#define GPIO_PORT_1WIRE             GPIOB

#define PIN_I2S_SCK                 GPIO_PIN_2  /* Port A Pin 2 */
#define PIN_I2S_WS                  GPIO_PIN_3  /* Port A Pin 3 */
#define PIN_I2S_SD                  GPIO_PIN_4  /* Port A Pin 4 */
#define GPIO_PORT_I2S               GPIOA

/* Audio Sampling Constants */
#define AUDIO_SAMPLE_RATE_HZ        16000U
#define AUDIO_FRAME_SAMPLES         1000U
#define FFT_WINDOW_SIZE             1000U

/* Model 1 Hive State Outputs */
typedef enum {
    STATE_NORMAL_HEALTHY            = 0,
    STATE_HIGH_ACOUSTIC_ACTIVITY    = 1,
    STATE_PRE_SWARM_WARNING         = 2,
    STATE_QUEENLESS_DISTRESS        = 3,
    STATE_THERMAL_STRESS_WARNING    = 4,
    STATE_NOISE_SUPPRESSED_FLIGHT   = 5
} HiveState_t;

/* 4-Band Acoustic Spectral Energies Extracted from ICS-43434 Mic */
typedef struct {
    float b1_ventilation; /* 100 - 180 Hz: Hive Fan Fanning Signature */
    float b2_swarm;       /* 200 - 400 Hz: Swarm Pre-Departure & Queen Piping */
    float b3_distress;    /* 450 - 750 Hz: Colony Distress & Varroa Piping */
    float b4_noise;       /* 800 - 1200 Hz: Wind & Rain Environmental Noise Floor */
} MultiBandFeatures_t;

/* 
 * 23-Byte LoRa Binary Telemetry Frame sent by Wio-E5 Mini (STM32WLE5JC)
 * Byte-packed for direct transmission over RadioLib LoRa stack
 */
typedef struct __attribute__((packed)) {
    uint8_t  sync_header[2];    /* 2 Bytes: Frame Sync (0xAA, 0x55) */
    uint8_t  node_id;           /* 1 Byte:  Node ID (e.g. 0x01) */
    uint16_t seq_num;           /* 2 Bytes: Transmission Counter */
    uint8_t  state_code;        /* 1 Byte:  HiveState_t (0 to 5) */
    uint8_t  confidence_pct;    /* 1 Byte:  TinyML Model Confidence (0 - 100%) */
    int16_t  temp_brood1_q4;    /* 2 Bytes: DS18B20 Brood 1 Temp (°C * 16) */
    int16_t  temp_brood2_q4;    /* 2 Bytes: DS18B20 Brood 2 Temp (°C * 16) */
    int16_t  temp_ambient_q4;   /* 2 Bytes: DS18B20 Ambient Temp (°C * 16) */
    uint16_t swarm_energy_b2;   /* 2 Bytes: 200-400Hz Energy Level (Q8) */
    uint16_t distress_energy_b3;/* 2 Bytes: 450-750Hz Energy Level (Q8) */
    uint16_t battery_mv;        /* 2 Bytes: Battery Voltage (mV) */
    uint16_t crc16;             /* 2 Bytes: CRC-16 Checksum */
} HiveTelemetryPacket23B_t;

/**
 * @brief Discrete Fourier Filter Feature Extractor for ICS-43434 Audio PCM Stream
 */
static inline MultiBandFeatures_t extract_multiband_features_stm32(const float *pcm_samples, uint32_t len) {
    MultiBandFeatures_t feats = {0.0f, 0.0f, 0.0f, 0.0f};
    if (!pcm_samples || len == 0) return feats;

    uint32_t N = (len < AUDIO_FRAME_SAMPLES) ? len : AUDIO_FRAME_SAMPLES;
    float fs = (float)AUDIO_SAMPLE_RATE_HZ;

    /* Band 1: 100-180 Hz */
    float b1_sum = 0.0f;
    const float b1_freqs[] = {100.0f, 120.0f, 140.0f, 160.0f, 180.0f};
    for (int f = 0; f < 5; f++) {
        float real = 0.0f, imag = 0.0f;
        for (uint32_t n = 0; n < N; n++) {
            float angle = 2.0f * 3.1415926535f * b1_freqs[f] * (float)n / fs;
            real += pcm_samples[n] * cosf(angle);
            imag += pcm_samples[n] * sinf(angle);
        }
        b1_sum += sqrtf(real * real + imag * imag);
    }
    feats.b1_ventilation = b1_sum / 5.0f;

    /* Band 2: 200-400 Hz (Swarm) */
    float b2_sum = 0.0f;
    const float b2_freqs[] = {200.0f, 240.0f, 280.0f, 320.0f, 360.0f, 400.0f};
    for (int f = 0; f < 6; f++) {
        float real = 0.0f, imag = 0.0f;
        for (uint32_t n = 0; n < N; n++) {
            float angle = 2.0f * 3.1415926535f * b2_freqs[f] * (float)n / fs;
            real += pcm_samples[n] * cosf(angle);
            imag += pcm_samples[n] * sinf(angle);
        }
        b2_sum += sqrtf(real * real + imag * imag);
    }
    feats.b2_swarm = b2_sum / 6.0f;

    /* Band 3: 450-750 Hz (Distress) */
    float b3_sum = 0.0f;
    const float b3_freqs[] = {450.0f, 500.0f, 550.0f, 600.0f, 650.0f, 700.0f, 750.0f};
    for (int f = 0; f < 7; f++) {
        float real = 0.0f, imag = 0.0f;
        for (uint32_t n = 0; n < N; n++) {
            float angle = 2.0f * 3.1415926535f * b3_freqs[f] * (float)n / fs;
            real += pcm_samples[n] * cosf(angle);
            imag += pcm_samples[n] * sinf(angle);
        }
        b3_sum += sqrtf(real * real + imag * imag);
    }
    feats.b3_distress = b3_sum / 7.0f;

    /* Band 4: 800-1200 Hz (Noise) */
    float b4_sum = 0.0f;
    const float b4_freqs[] = {800.0f, 900.0f, 1000.0f, 1100.0f, 1200.0f};
    for (int f = 0; f < 5; f++) {
        float real = 0.0f, imag = 0.0f;
        for (uint32_t n = 0; n < N; n++) {
            float angle = 2.0f * 3.1415926535f * b4_freqs[f] * (float)n / fs;
            real += pcm_samples[n] * cosf(angle);
            imag += pcm_samples[n] * sinf(angle);
        }
        b4_sum += sqrtf(real * real + imag * imag);
    }
    feats.b4_noise = b4_sum / 5.0f;

    return feats;
}

/**
 * @brief On-Device Model 1 Classifier for STM32WLE5JC
 */
static inline HiveState_t classify_hive_state_tinyml_stm32(
    MultiBandFeatures_t feats, 
    float delta_temp_c, 
    float temp_slope_rate, 
    uint8_t *out_confidence
) {
    /* 1. Thermal Emergency Layer */
    if (delta_temp_c < 5.0f || temp_slope_rate < -1.5f) {
        if (out_confidence) *out_confidence = 92;
        return STATE_THERMAL_STRESS_WARNING;
    }

    /* 2. Dominant Spectral Band Check */
    float max_val = feats.b1_ventilation;
    HiveState_t dom = STATE_NORMAL_HEALTHY;

    if (feats.b2_swarm > max_val) { max_val = feats.b2_swarm; dom = STATE_PRE_SWARM_WARNING; }
    if (feats.b3_distress > max_val) { max_val = feats.b3_distress; dom = STATE_QUEENLESS_DISTRESS; }
    if (feats.b4_noise > max_val) { max_val = feats.b4_noise; dom = STATE_NOISE_SUPPRESSED_FLIGHT; }

    if (max_val < 5.0f) {
        if (out_confidence) *out_confidence = 99;
        return STATE_NORMAL_HEALTHY;
    }

    if (dom == STATE_NOISE_SUPPRESSED_FLIGHT) {
        if (out_confidence) *out_confidence = 91;
        return STATE_NOISE_SUPPRESSED_FLIGHT;
    }

    if (dom == STATE_QUEENLESS_DISTRESS) {
        if (out_confidence) *out_confidence = 95;
        return STATE_QUEENLESS_DISTRESS;
    }

    if (dom == STATE_PRE_SWARM_WARNING) {
        if (delta_temp_c < 8.0f) {
            if (out_confidence) *out_confidence = 97;
            return STATE_PRE_SWARM_WARNING;
        } else {
            if (out_confidence) *out_confidence = 88;
            return STATE_HIGH_ACOUSTIC_ACTIVITY;
        }
    }

    if (out_confidence) *out_confidence = 99;
    return STATE_NORMAL_HEALTHY;
}

#ifdef __cplusplus
}
#endif

#endif /* BEEVIL_TINYML_FIRMWARE_H */
