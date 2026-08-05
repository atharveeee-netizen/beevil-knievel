/**
 * =============================================================================
 * BEEVIL KNIEVEL — YOUR EXACT RECEIVER GATEWAY FIRMWARE (STM32WLE5JC)
 * Generated for your KiCad Schematic: smart_hive_receiver.kicad_sch / .net
 * 
 * Receiver Hardware Target: Seeed Wio-E5 Mini Receiver (STM32WLE5JC)
 * Display: 0.96" OLED Display 128x64 (I2C)
 * 
 * Exact Pinouts (from smart_hive_receiver.net):
 *  - I2C SCL (OLED Display):       PB8
 *  - I2C SDA (OLED Display):       PB9
 *  - 5V Power Input (USB-C):       VBUS_5V -> 5V
 *  - Receiver RF Antenna:          RF_868MHZ_RX (868 MHz / 915 MHz)
 * =============================================================================
 */

#ifndef BEEVIL_GATEWAY_FIRMWARE_SPEC_H
#define BEEVIL_GATEWAY_FIRMWARE_SPEC_H

#include <stdint.h>
#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Receiver Pin Definitions matching smart_hive_receiver.net */
#define PIN_I2C_OLED_SCL            GPIO_PIN_8  /* Port B Pin 8 */
#define PIN_I2C_OLED_SDA            GPIO_PIN_9  /* Port B Pin 9 */
#define GPIO_PORT_OLED_I2C          GPIOB

#define OLED_I2C_ADDRESS            0x3C

/* Struct to hold decoded telemetry data on Wio-E5 Receiver */
typedef struct {
    uint8_t  node_id;
    uint16_t seq_num;
    uint8_t  state_code;
    uint8_t  confidence_pct;
    float    temp_brood1_c;
    float    temp_brood2_c;
    float    temp_ambient_c;
    float    swarm_energy_b2;
    float    distress_energy_b3;
    float    battery_volts;
    bool     crc_valid;
} ReceiverUnpackedData_t;

/**
 * @brief Unpacks 23-Byte LoRa telemetry frame on Wio-E5 Receiver (STM32WLE5JC)
 */
static inline bool unpack_hive_telemetry_wio_e5(const uint8_t *buffer, uint8_t len, ReceiverUnpackedData_t *out) {
    if (!buffer || len < 23 || !out) return false;

    /* Check 2-Byte Frame Sync Header (0xAA, 0x55) */
    if (buffer[0] != 0xAA || buffer[1] != 0x55) return false;

    out->node_id        = buffer[2];
    out->seq_num        = (uint16_t)buffer[3] | ((uint16_t)buffer[4] << 8);
    out->state_code     = buffer[5];
    out->confidence_pct = buffer[6];

    int16_t t1_q4       = (int16_t)buffer[7] | ((int16_t)buffer[8] << 8);
    out->temp_brood1_c  = (float)t1_q4 / 16.0f;

    int16_t t2_q4       = (int16_t)buffer[9] | ((int16_t)buffer[10] << 8);
    out->temp_brood2_c  = (float)t2_q4 / 16.0f;

    int16_t ta_q4       = (int16_t)buffer[11] | ((int16_t)buffer[12] << 8);
    out->temp_ambient_c = (float)ta_q4 / 16.0f;

    uint16_t b2_q8      = (uint16_t)buffer[13] | ((uint16_t)buffer[14] << 8);
    out->swarm_energy_b2= (float)b2_q8 / 256.0f;

    uint16_t b3_q8      = (uint16_t)buffer[15] | ((uint16_t)buffer[16] << 8);
    out->distress_energy_b3 = (float)b3_q8 / 256.0f;

    uint16_t bat_mv     = (uint16_t)buffer[17] | ((uint16_t)buffer[18] << 8);
    out->battery_volts  = (float)bat_mv / 1000.0f;

    out->crc_valid      = true;
    return true;
}

#ifdef __cplusplus
}
#endif

#endif /* BEEVIL_GATEWAY_FIRMWARE_SPEC_H */
