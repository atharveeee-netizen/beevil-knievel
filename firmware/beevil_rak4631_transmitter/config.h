#ifndef CONFIG_H
#define CONFIG_H

// ----------------------------------------------------------------------------
// RADIO FREQUENCY CONFIGURATION (IN865 WPC LICENSE-FREE BAND)
// ----------------------------------------------------------------------------
#define RF_FREQUENCY          865.0625   // MHz (India WPC Standard)
#define DEFAULT_TX_POWER      14         // dBm (+14 dBm = 25 mW)
#define MIN_TX_POWER          2          // dBm (+2 dBm for nearby gateway)
#define MAX_TX_POWER          14         // dBm
#define LORA_BANDWIDTH        125.0      // kHz
#define LORA_SPREADING_FACTOR 7          // SF7 (1.024 ms/symbol)
#define LORA_CODING_RATE      5          // 4/5

// ----------------------------------------------------------------------------
// PIN DEFINITIONS (RAK4631 / RAK5005-O WisBlock Base)
// ----------------------------------------------------------------------------
#ifndef LED_GREEN
  #define LED_GREEN           35         // P1.03
#endif
#ifndef LED_BLUE
  #define LED_BLUE            36         // P1.04
#endif
#ifndef WB_IO2
  #define WB_IO2              34         // 3V3 Sensor Power Rail Switch (P1.02)
#endif

#define PIN_VBAT_SENSE        A0         // Battery / USB Voltage ADC (P0.05)
#define PIN_VBAT_ENABLE       30         // Voltage Divider Gate (P0.29, LOW=Enabled)

// ----------------------------------------------------------------------------
// I2C SENSOR ADDRESSES
// ----------------------------------------------------------------------------
#define I2C_ADDR_TMP117       0x48       // Brood Probe
#define I2C_ADDR_SCD41        0x62       // Sensirion CO2
#define I2C_ADDR_BME688       0x76       // Bosch VOC Gas
#define I2C_ADDR_LIS3DH       0x18       // 3-Axis Accelerometer

#endif // CONFIG_H
