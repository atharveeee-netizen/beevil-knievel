# 🔧 Official Hardware Datasheets & Semiconductor Specifications

This compendium indexes the official component datasheets, manufacturer technical specifications, and pinout documentation for all active semiconductors used in the BEEVIL KNIEVEL cyber-physical platform.

---

## 📋 Master Component Datasheet Index

| Component Code | Component Name | Manufacturer | Official Datasheet Ref | Interface | Operating VDD | Key Engineering Metric |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **nRF52840** | Multiprotocol Bluetooth 5 / SoC MCU | Nordic Semiconductor | Product Specification v1.3 | Internal SPI / I2C / I2S | 1.7V – 3.6V | ARM Cortex-M4F @ 64MHz, 2.0 µA deep sleep, FPU |
| **SX1262** | Long Range Sub-GHz LoRa Transceiver | Semtech Corporation | DS.SX1261-2.W.APP (Rev 2.1) | SPI (up to 16 MHz) | 1.8V – 3.7V | +14 dBm TX @ 865 MHz, -124.53 dBm sensitivity (SF7) |
| **TMP117** | NIST-Traceable High-Precision Temp | Texas Instruments | SBOS841 (Rev B) | I2C (Addr: `0x48`) | 1.8V – 5.5V | ±0.1°C accuracy (-20°C to +50°C), 3.5 µA active |
| **SCD41** | Photoacoustic Miniature NDIR CO2 | Sensirion AG | D1-000030 (Rev 1.2) | I2C (Addr: `0x62`) | 2.4V – 5.5V | 400 – 5,000 ppm range, ±(40 ppm + 5% of reading) |
| **INMP441** | Digital Bottom-Port MEMS Microphone | TDK / InvenSense | DS-INMP441-00 (Rev 1.1) | I2S Digital Audio | 1.62V – 3.63V | 61 dBA SNR, 60 Hz – 15 kHz flat acoustic response |
| **BME688** | 4-in-1 Environmental Gas & AI Sensor | Bosch Sensortec | BST-BME688-DS000 (Rev 1.3) | I2C (Addr: `0x76`) | 1.71V – 3.6V | bVOC gas resistance (kΩ), temp, humidity, pressure |
| **LIS3DH** | Ultra-Low Power 3-Axis Accelerometer | STMicroelectronics | DocID17530 (Rev 2) | I2C (Addr: `0x18`) | 1.71V – 3.6V | ±2g/±4g/±8g/±16g, 2 µA low-power mode, tilt interrupt |
| **HX711** | 24-Bit Differential ADC for Weigh Scales | Avia Semiconductor | AV0011-DS (Rev 1.0) | 2-Wire Serial Clock/Data | 2.6V – 5.5V | 24-bit differential input, on-chip low-noise PGA |
| **DS18B20** | 1-Wire Digital Thermometer Probes | Maxim / Analog Devices | 19-6714 (Rev 6) | 1-Wire Single Bus | 3.0V – 5.5V | ±0.5°C (-10°C to +85°C), 64-bit unique factory ROM ID |
| **CM4** | Raspberry Pi Compute Module 4 | Raspberry Pi Ltd | CM4 Datasheet (Release 8) | Carrier Board Hirose | 5.0V DC | BCM2711 Quad Cortex-A72 @ 1.5GHz, 2GB RAM, 32GB eMMC |

---

## 🔍 Detailed Component Deep Dives

### 1. Nordic Semiconductor nRF52840 (RAK4631 Core)
* **Datasheet URL**: [https://www.nordicsemi.com/products/nrf52840](https://www.nordicsemi.com/products/nrf52840)
* **Silicon Architecture**: 32-bit ARM Cortex-M4 with single-precision floating point unit (FPU) running at $64\text{ MHz}$. Includes $1\text{ MB}$ embedded Flash memory and $256\text{ KB}$ low-leakage RAM.
* **Low-Power Modes**: System OFF deep sleep consumes $0.7\ \mu\text{A}$; System ON with full RAM retention and RTC wake timer consumes $1.5\ \mu\text{A}$ to $2.0\ \mu\text{A}$.
* **Hardware Math Acceleration**: Executes single-cycle MAC instructions and hardware division, accelerating CMSIS-DSP 256-point real FFT execution down to **$1.12\text{ ms}$**.

### 2. Texas Instruments TMP117
* **Datasheet URL**: [https://www.ti.com/product/TMP117](https://www.ti.com/product/TMP117)
* **Calibration Standard**: Factory NIST-traceable calibration without requiring user post-production trim. Provides **$\pm 0.10^\circ\text{C}$ absolute accuracy** across the entire active biological brood range ($-20^\circ\text{C}$ to $+50^\circ\text{C}$).
* **Quantization Resolution**: 16-bit digital temperature output with $0.0078125^\circ\text{C}$ LSB resolution.

### 3. Sensirion SCD41 Photoacoustic NDIR CO2 Sensor
* **Datasheet URL**: [https://sensirion.com/products/catalog/SCD41/](https://sensirion.com/products/catalog/SCD41/)
* **Detection Principle**: Photoacoustic spectroscopy utilizing an infrared emitter to excite gas molecules inside an acoustic measuring cell, detected by an internal microphone.
* **Power Optimization**: Features single-shot low-power periodic mode, drawing only $3.2\text{ mA}$ average during a 5-minute sampling interval.

### 4. TDK InvenSense INMP441 Omnidirectional Digital Microphone
* **Datasheet URL**: [https://invensense.tdk.com/products/digital/inmp441/](https://invensense.tdk.com/products/digital/inmp441/)
* **Acoustic Port**: Bottom-port MEMS design with high signal-to-noise ratio ($61\text{ dBA}$ SNR) and flat wideband frequency response from $60\text{ Hz}$ to $15\text{ kHz}$.
* **Direct I2S Output**: 24-bit digital pulse code modulation (PCM) output connects directly to the nRF52840 I2S peripheral without requiring external analog preamplifiers or analog-to-digital converters.
