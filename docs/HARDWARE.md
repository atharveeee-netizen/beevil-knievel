# 🛠️ BEEVIL KNIEVEL — Canonical Hardware Specification & BOM

This document establishes the verified hardware specification, pinout assignments, sensor bus topology, and power architecture for the Beevil Knievel smart apiculture monitoring platform.

---

## 🎯 Core Hardware Specification Table

| Subsystem Component | Exact Part Number | Architecture / Silicon | Primary Role | Hardware Interface | Evidence State |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Edge Compute Core** | Nordic nRF52840 | ARM Cortex-M4F @ 64 MHz, FPU | In-hive sensor acquisition, CMSIS-DSP FFT, CUSUM filtering | WisBlock Slot A (RAK4631) | 🟢 **VALIDATED** |
| **Sub-GHz LoRa Core** | Semtech SX1262 | High-efficiency Sub-GHz Transceiver | 865.0625 MHz RF telemetry transmission (+14 dBm) | Internal SPI on RAK4631 | 🟢 **VALIDATED** |
| **Brood Core Temp** | Texas Instruments TMP117 | 16-bit NIST-traceable digital sensor | Precision central brood nest thermoregulation ($\pm 0.1^\circ\text{C}$) | I2C (Address `0x48`) | 🟢 **VALIDATED** |
| **Spatial Comb Temp**| 5x Maxim DS18B20 | Waterproof 1-Wire digital probes | 5-frame thermal gradient across comb cross-section | 1-Wire (Pin `P0.17`) | 🟢 **VALIDATED** |
| **Carbon Dioxide** | Sensirion SCD41 | Photoacoustic NDIR sensor | Respiration & ventilation monitoring (400–5000 ppm) | I2C (Address `0x62`) | 🟢 **VALIDATED** |
| **Air Quality & VOC** | Bosch Sensortec BME688 | 4-in-1 gas, pressure, humidity, temp | Gas resistance (kΩ), relative humidity (0–100%) | I2C (Address `0x76`) | 🟢 **VALIDATED** |
| **Colony Bio-Acoustics**| TDK InvenSense INMP441 | Omnidirectional 24-bit MEMS microphone| Wingbeat vibration, piping, and swarming acoustics | I2S Digital Bus (DMA) | 🟢 **VALIDATED** |
| **Hive Net Weight** | Phaeton 200kg + HX711 | Shear-beam load cell + 24-bit ADC | Honey yield, nectar flow, and winter food stores | 2-Wire Bit-Bang ADC | 🟢 **VALIDATED** |
| **Anti-Theft / Tilt** | STMicroelectronics LIS3DH | 3-axis low-power accelerometer | Knockdown detection, high wind tilt, tamper alert | I2C (Address `0x18`) | 🟢 **VALIDATED** |
| **Solar Illuminance** | Vishay VEML7700 | High-accuracy ambient light sensor | Solar flight window, foraging activity, lid removal | I2C (Address `0x10`) | 🟢 **VALIDATED** |
| **Power Management** | Consonance CN3065 + TP4056 | Linear solar LiPo charger & regulator | MPPT solar energy harvesting from 1W solar panel | Analog Batt Voltage (`A0`) | 🟢 **VALIDATED** |
| **Battery Cell** | 1S 1000 mAh LiPo | Lithium-ion Polymer (3.7V nominal) | Uninterrupted node operation during overcast/night | JST 2.0 mm Connector | 🟢 **VALIDATED** |
| **Gateway Computer** | Raspberry Pi 3B+ | Broadcom BCM2837B0 quad Cortex-A53 @ 1.4 GHz | Edge base station, SQLite WAL database, FastAPI server | MicroSD + 5V/2.5A Micro-USB | 🟢 **VALIDATED** |
| **Gateway LoRa HAT** | Waveshare SX1262 LoRa HAT | Semtech SX1262 on Raspberry Pi 40-pin GPIO | Base station packet ingestion daemon | SPI (`/dev/spidev0.0`) | 🟢 **VALIDATED** |

---

## ⚡ Resolution of Historical Documentation Contradictions

During earlier development phases, multiple competing microcontroller and processor references appeared in draft notes. The table below resolves all historical ambiguities:

| Mentioned Component | Initial Conflicting Claim | Canonical Architecture Ground Truth | Resolution & Verification |
| :--- | :--- | :--- | :--- |
| **RAK4631 vs. nRF52840** | Stated as separate devices in some draft notes. | **Identical Core**: RAK4631 is the WisBlock module packaging a Nordic nRF52840 MCU and Semtech SX1262 transceiver. | Invoiced RAK4631; verified in PlatformIO target `nordicnrf52`. |
| **Raspberry Pi 3B+ vs. CM4 / Pi 4** | Stated as BCM2711 in legacy validation matrix. | **BCM2837B0**: The physical bench gateway is a Raspberry Pi 3B+ (BCM2837B0 quad-core Cortex-A53 @ 1.4 GHz, 1 GB RAM). | Verified against physical bench board and invoices. |
| **Mesh Routing vs. Star Uplink** | Labeled as "BLE Mesh routing". | **Single-Hop LoRa Star**: The physical node communicates directly via LoRa Sub-GHz RF to the gateway SX1262 HAT. | Verified in `beevil_rak4631_transmitter.ino` and `lora_receiver.py`. |

---

## 🔌 Hardware Pinout & Bus Mapping (nRF52840 on RAK4631)

```
================================================================================
BUS TYPE     SIGNAL NAME     nRF52840 PIN    CONNECTED DEVICE
================================================================================
I2C          SDA             P0.26           TMP117, SCD41, BME688, LIS3DH, VEML7700
I2C          SCL             P0.27           TMP117, SCD41, BME688, LIS3DH, VEML7700
1-Wire       DATA            P0.17           5x Maxim DS18B20 Array (4.7kΩ Pullup)
I2S          SCK (Bit Clock) P0.28           INMP441 Microphone
I2S          WS (Word Select)P0.29           INMP441 Microphone
I2S          SD (Serial Data)P0.30           INMP441 Microphone
GPIO/ADC     HX711 DOUT      P0.04           Phaeton 200kg Load Cell ADC
GPIO/ADC     HX711 SCK       P0.05           Phaeton 200kg Load Cell ADC
Analog In    VBAT_SENSE      AIN0 (P0.02)    Battery Voltage Divider (1MΩ / 1MΩ)
LED          LED_GREEN       P1.03           Heartbeat & Sampling Status
LED          LED_BLUE        P1.04           LoRa RF Transmission Burst
================================================================================
```

---

## 🔋 Power Budget & Energy Autonomy Breakdown

Formally calculated across the **300-second nominal duty cycle** ($T = 300.0\text{ s}$):

| Operating Phase | Duration ($t_i$) | Current Draw ($I_i$) | Energy Incurred ($Q_i = I_i \times t_i$) |
| :--- | :---: | :---: | :---: |
| **Phase 1: Deep Sleep (System ON)** | 298.73 s | 0.008 mA | $2.39\text{ mA}\cdot\text{s}$ |
| **Phase 2: Active Sensor Polling & DSP**| 1.20 s | 55.000 mA | $66.00\text{ mA}\cdot\text{s}$ |
| **Phase 3: LoRa RF Transmission (+14 dBm)**| 0.072 s | 118.000 mA | $1.74\text{ mA}\cdot\text{s}$ |
| **Total Cycle Metrics** | **300.00 s** | **0.2338 mA (Average)**| **$70.13\text{ mA}\cdot\text{s}$** |

* **Battery Autonomy without Solar:** $\frac{1000\text{ mAh}}{0.2338\text{ mA} \times 24\text{ h/day}} \approx \mathbf{178.2\text{ days}}$ (~5.9 months).
* **Solar Equilibrium Requirement:** At 50 mA typical generation under overcast daylight, a 1W solar panel replenishes one full 24-hour energy deficit ($5.61\text{ mAh}$) in only **$19.54\text{ minutes}$ of ambient daylight per day**.
