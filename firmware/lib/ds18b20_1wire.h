/**
 * ============================================================================
 * BEEVIL KNIEVEL — Embedded DS18B20 1-Wire Thermal Sensor Driver Header
 * Optimized for STM32WLE5JC / ARM Cortex-M4 Microcontrollers
 * ============================================================================
 */

#ifndef DS18B20_1WIRE_H
#define DS18B20_1WIRE_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

// DS18B20 1-Wire Commands
#define DS18B20_CMD_CONVERT_T        0x44
#define DS18B20_CMD_MATCH_ROM        0x55
#define DS18B20_CMD_SKIP_ROM         0xCC
#define DS18B20_CMD_READ_SCRATCHPAD  0xBE

typedef struct {
    uint8_t rom_code[8];
    float last_temperature_c;
    uint8_t is_connected;
} DS18B20_Sensor;

/**
 * Reads temperature from single or multi-drop DS18B20 sensor bus
 */
float DS18B20_ReadTempCelsius(uint8_t gpio_pin, uint8_t sensor_index);

/**
 * Calculates brood vs ambient Delta-T differential
 */
float DS18B20_CalculateDeltaT(float brood_1, float brood_2, float ambient);

#ifdef __cplusplus
}
#endif

#endif // DS18B20_1WIRE_H
