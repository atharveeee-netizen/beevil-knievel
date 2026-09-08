# 🏛️ BEEVIL KNIEVEL - Canonical Hardware Architecture Specification
**Official System Reference Platform & Hardware Bill of Materials (BOM)**  
*IEEE HardwAIre Challenge (Hardware / Agriculture / Robotics / Telemetry)*  
*Standard Version: 2.1.0 (IEEE-HART Release)*

---

## 📌 1. HARDWARE CANONICALIZATION MANDATE

To eliminate architectural ambiguities across documentation and firmware, this document establishes the **ONE Canonical Hardware Architecture** for the BEEVIL KNIEVEL ecosystem. All project documents, schematics, source code, simulations, and validation suites derive component designations strictly from this specification.

```text
+-----------------------------------------------------------------------------+
|                      CANONICAL SYSTEM ARCHITECTURE                          |
+-----------------------------------------------------------------------------+
|                                                                             |
|   FIELD SENSOR NODE (1 Per Hive, Up to 100 Nodes per Apiary)                |
|   • Processing:  Nordic nRF52840 (ARM Cortex-M4F @ 64 MHz, FPU)             |
|   • Core Board:  RAKwireless RAK4631 WisBlock Core                          |
|   • Baseboard:   RAKwireless RAK5005-O WisBlock Base                        |
|   • Radio:       Semtech SX1262 LoRa Sub-GHz Transceiver (IN865 Band)       |
|   • Power:       3.7V 3000 mAh 1S LiPo + 5V Solar MPPT Harvester            |
|   • Sensor Bus:  Medical Brood Probe (TMP117), 5x Frame Grid (DS18B20),     |
|                  CO2 (SCD41), VOC/P/RH (BME688), Lux (VEML7700),           |
|                  Weight (HX711 200kg), Tilt (LIS3DH), Audio (INMP441 I2S)   |
|                                                                             |
|                                    │ LoRa 865.0625 MHz (SF7/BW125/CR 4/5)   |
|                                    ▼                                        |
|                                                                             |
|   PRIMARY REFERENCE EDGE GATEWAY (1 Per Apiary)                             |
|   • Single Board Computer: Raspberry Pi 3B+ (Broadcom BCM2837B0, 1GB RAM)  |
|   • LoRa Gateway HAT:      Waveshare SX1262 LoRa HAT (SPI Interface)       |
|   • Operating System:      Raspberry Pi OS Lite (64-bit, Debian Bookworm)   |
|   • Local Edge Database:   SQLite WAL (Write-Ahead Logging) 100-Hive Store  |
|   • Edge AI Runtime:       Edge Multi-Modal Sensor Fusion & Expert Engine   |
|   • Enclosure:             IP67 Weatherproof Sealed Enclosure               |
|                                                                             |
|                                    │ Optional 4G / Wi-Fi Backhaul           |
|                                    ▼                                        |
|                                                                             |
|   CLOUD ADVISORY TIER (Optional Centralized Apiculture Analytics)           |
|   • Runtime:               Python FastAPI + Scikit-Learn Model 2            |
|   • Model Serialized:      cloud_advisor_model.joblib (RandomForest)        |
+-----------------------------------------------------------------------------+
```

---

## 🐝 2. CANONICAL FIELD SENSOR NODE SPECIFICATION

### 2.1 Compute Core & Baseboard
| Subsystem | Canonical Hardware Component | Key Specifications | Manufacturer |
|---|---|---|---|
| **System-on-Chip (SoC)** | **Nordic Semiconductor nRF52840** | 32-bit ARM Cortex-M4F @ 64 MHz, Hardware FPU, 1 MB Flash, 256 KB SRAM | Nordic Semi |
| **WisBlock Core Module** | **RAKwireless RAK4631** | Combines nRF52840 + SX1262 LoRa with TCXO in IPEX/U.FL form factor | RAKwireless |
| **WisBlock Baseboard** | **RAKwireless RAK5005-O** | WisConnector expansion slots, onboard 3.3V LDO, solar charger, P0.29 ADC gate | RAKwireless |
| **Operating Voltage** | 3.3V DC (Switched via WB_IO2 / P1.02 during sleep) | Quiescent deep-sleep current: $< 18\ \mu\text{A}$ | Hardware Rail |

### 2.2 Sub-GHz LoRa RF Transceiver
| Parameter | Canonical Value | Regulatory Source / Standard |
|---|---|---|
| **RF Transceiver IC** | **Semtech SX1262** | High-efficiency Sub-GHz LoRa Transceiver (+22 dBm capable) |
| **Frequency Band** | **865.0625 MHz (Channel 0)** | India WPC GSR 564(E) License-Free Band (IN865-867 MHz) |
| **Transmit Power (Default)** | **+14 dBm (25 mW ERP)** | Maximum permissible limit under India WPC regulations |
| **Transmit Power Range** | +2 dBm to +14 dBm | Dynamic Adaptive Data Rate (ADR) scaling |
| **Modulation / Coding** | **SF7 / BW 125 kHz / CR 4/5** | Semtech LoRa modulation; 61.7 ms time-on-air for 32-byte packet |
| **Preamble Length** | 8 Symbols | Standard synchronized LoRa preamble |
| **RF Connector & Antenna** | IPEX/U.FL to AWG 20 Monopole | Tuned $82.5\text{ mm}$ physical height ($\lambda/4$ at 865 MHz) |

### 2.3 Sensor Array & Electrical Pinout
| Sensor Subsystem | Sensor IC | Interface | Pin / Address | Measurement Range & Precision |
|---|---|---|---|---|
| **Central Brood Core Temp** | **TI TMP117** | I2C | `0x48` | $-20^\circ\text{C}$ to $+50^\circ\text{C}$ ($\pm 0.1^\circ\text{C}$ accuracy) |
| **5-Frame Thermal Grid** | **5x Maxim DS18B20** | 1-Wire | `PIN 4` (P0.04) | $-55^\circ\text{C}$ to $+125^\circ\text{C}$ ($\pm 0.5^\circ\text{C}$, 12-bit) |
| **NDIR Respiration $\text{CO}_2$** | **Sensirion SCD41** | I2C | `0x62` | $400 - 5000\text{ ppm}$ ($\pm 40\text{ ppm} + 5\%$) |
| **Environmental Gas/VOC/P/RH**| **Bosch BME688** | I2C | `0x76` | VOC Gas ($k\Omega$), $0-100\%\text{ RH}$, $300-1100\text{ hPa}$ |
| **Ambient Solar Illuminance**| **Vishay VEML7700** | I2C | `0x10` | $0 - 120,000\text{ Lux}$ ($16\text{-bit resolution}$) |
| **3-Axis Hive Tilt / Tamper** | **ST LIS3DH** | I2C | `0x18` | $\pm 2g$, 10-bit normal mode, threshold: $15^\circ$ |
| **Scale Load Cell ADC** | **Avia HX711** | I2C Bridge | `0x26` | 24-bit Sigma-Delta ADC connected to 200 kg load cell |
| **Acoustic Microphone** | **InvenSense INMP441**| I2S | SCK=28, WS=29, SD=30 | Omnidirectional Digital MEMS, 16 kHz sampling |
| **Battery Voltage Sense** | **Internal SAADC** | Analog | `A0` (P0.05), Gate=`P0.29` | $0 - 4.2\text{V}$ via $1.5\text{M}\Omega / 1.0\text{M}\Omega$ high-Z divider |

---

## 🖥️ 3. CANONICAL EDGE GATEWAY REFERENCE PLATFORM

### 3.1 Primary Reference Gateway (Standard Deployment)
* **Single Board Computer**: **Raspberry Pi 3B+**
  - **Processor**: Broadcom **BCM2837B0**, Quad-Core ARM Cortex-A53 (ARMv8 64-bit) @ 1.4 GHz.
  - **Memory**: 1 GB LPDDR2 SDRAM.
  - **Thermal Envelope**: 4.5 W typical power consumption under load.
* **LoRa Concentrator Interface**: **Waveshare SX1262 LoRa Gateway HAT**
  - Dedicated SPI bus connection (SPI0: MOSI, MISO, SCLK, CE0).
  - Control lines: RST (GPIO 22), BUSY (GPIO 27), DIO1 (GPIO 18).
* **Storage Media**: 32 GB SanDisk Industrial MicroSD Card (Class 10 / A1).
* **Software Stack**:
  - Operating System: Raspberry Pi OS Lite (64-bit, Debian 12 Bookworm).
  - Python Environment: Python 3.10+ virtualenv.
  - Telemetry Server: FastAPI + SQLite WAL Mode (`gateway/server.py`).

### 3.2 Optional Enterprise High-Density Gateway Tier (Documented Alternative)
* **Target Environment**: Commercial mega-apiaries ($> 500$ colonies across multi-kilometer orchards).
* **Single Board Computer**: **Raspberry Pi Compute Module 4 (CM4)** (Broadcom BCM2711 Quad-Core Cortex-A72 @ 1.5 GHz).
* **Concentrator**: **RAKwireless RAK2287 (SX1302 Concentrator)** supporting 8 concurrent LoRa channels.
* **Thermal Validation**: Evaluated in ANSYS Icepak at 8.5 W continuous dissipation in a sealed NEMA 4X enclosure.

---

## 🔋 4. POWER SYSTEM ARCHITECTURE

```text
[5V 5W Monocrystalline Solar Panel]
                 │
                 ▼
[CN3065 / TP4056 Solar MPPT Battery Management IC]
                 │
                 ├──► [1S 3.7V 3000 mAh LiPo Cell (18650/Flat Pack)]
                 │
                 ▼
[TPS62740 Ultra-Low-Iq 3.3V Step-Down Buck Converter (95% Efficiency)]
                 │
                 ├──► VDD_ALWAYS_ON (1.8V - 3.3V): nRF52840 Core in Sleep (< 3 uA)
                 │
                 ▼
[P-Channel MOSFET Power Switch (WB_IO2 / P1.02)]
                 │
                 └──► VDD_SENSORS (3.3V): Energized only during 450 ms measurement cycle
```

---

## 📋 5. HARDWARE TAXONOMY ENFORCEMENT MATRIX

| Component | Canonical Reference Name | Deprecated / Disallowed Synonyms |
|---|---|---|
| Node MCU | **Nordic nRF52840** | ESP32, STM32, Arduino Uno |
| Node Module | **RAKwireless RAK4631** | RAK4630 (without bootloader) |
| Node Radio | **Semtech SX1262** | SX1276, SX1278, RFM95 |
| Primary Gateway SBC | **Raspberry Pi 3B+ (BCM2837B0)** | Unqualified "Raspberry Pi", Raspberry Pi 4 (primary) |
| Primary Gateway Radio | **Waveshare SX1262 HAT** | SX1301 |
| Secondary Gateway Tier | **Raspberry Pi CM4 + SX1302** | Must be explicitly labeled as optional enterprise tier |
| Brood Probe | **Texas Instruments TMP117** | DS18B20 for central core probe, DHT11, DHT22 |
| Frame Thermal Grid | **Maxim DS18B20 (5-probe bus)** | Analog thermistors |
| Respiration Sensor | **Sensirion SCD41** | MQ-135, CCS811, SGP30 |
