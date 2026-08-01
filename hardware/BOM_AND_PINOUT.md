# Beevil Knievel — Complete Hardware Bill of Materials (BOM) & Pinout Specification

---

## 🛠️ Hardware Bill of Materials (BOM)

### 1. Smart Hive Edge Node & Receiver Unit Components
| # | Component | Manufacturer / Part # | Qty | Price (USD) | Price (INR) | Purpose |
|---|---|---|---|---|---|---|
| 1 | **Main MCU & LoRa Radio** | Seeed Studio Wio-E5 Mini (STM32WLE5JC + SX126x) | 1 | $15.90 | ₹1,524.33 | Core MCU, 200-400Hz FFT engine, 868MHz LoRa radio |
| 2 | **LoRa Antenna** | 868MHz 86mm Solid-Core Wire Antenna | 1 | $4.90 | ₹469.76 | Quarter-wave tuned 868MHz monopole antenna |
| 3 | **Thermal Sensors** | Adafruit DS18B20 1-Wire Digital Temp Sensor | 3 | $29.85 | ₹2,861.72 | 2 Brood-nest + 1 Ambient sensor for $\Delta T$ monitoring |
| 4 | **MEMS Audio Sensor** | Adafruit ICS-43434 I2S Digital Microphone | 1 | $6.95 | ₹666.30 | 24-bit I2S audio capture for 200-400Hz swarming hum |
| 5 | **LiPo Charger** | SparkFun LiPo Charger Basic (PRT-10217) | 1 | $10.50 | ₹1,006.64 | Micro-B LiPo battery charging controller |
| 6 | **Voltage Regulator** | Mouser TPS73033 / TPS7A02 3.3V LDO | 1 | $0.40 | ₹38.35 | Ultra-low quiescent current (~25nA) 3.3V LDO |
| 7 | **LiPo Battery** | Adafruit 1000mAh 3.7V LiPo Cell (803040) | 1 | $9.95 | ₹953.91 | Main energy storage (>18 months runtime with solar) |
| 8 | **Solar Panel** | Seeed Studio 1W 6V Mini Solar Panel | 1 | $1.90 | ₹182.15 | Solar trickle-charging panel |
| 9 | **Scale/Weight ADC** | HX711 24-Bit Load Cell Amplifier | 1 | $0.80 | ₹67.00 | Digital scale ADC for honey yield tracking & starvation |
| 10 | **Humidity Sensor** | Bosch BME280 I2C Temp/Humidity/Pressure | 1 | $2.50 | ₹209.00 | Crucial for tracking internal moisture (Chalkbrood risk) |
| 11 | **Cabling Protection** | Mouser Nylon Expandable Sleeving + Coating | 1 | $1.20 | ₹115.04 | Propolis-resistant cable sleeving & conformal coat |
| 12 | **Custom PCB** | JLCPCB 2-Layer FR4 (60x50mm, 50$\Omega$ RF trace) | 1 | $2.00 | ₹191.74 | Low-noise 2-layer PCB with RF ground plane |
| 13 | **Custom Receiver Unit** | Seeed Studio Wio-E5 Mini Receiver Board | 1 | $15.90 | ₹1,524.33 | Apiary yard gateway receiver unit |
| 14 | **Cloud Wi-Fi Bridge** | ESP32-WROOM-32 NodeMCU Dev Board | 1 | $4.50 | ₹375.00 | Bridges Wio-E5 UART data to Cloud API via Wi-Fi |
| 15 | **Passives & Connectors**| Adafruit 4.7K Resistors, Caps, JST Connectors | 1 | $7.50 | ₹719.03 | Decoupling, pull-ups, and 4-wire scale headers |
| **Total Node & Receiver** | | | | **$107.75** | **₹10,233.20** | |

---

### 2. Validation & Development Toolkit
| Tool | Model | Price (USD) | Price (INR) | Purpose |
|---|---|---|---|---|
| **Vector Network Analyzer** | NanoVNA H4 | $67.79 | ₹6,499.00 | S11 impedance matching & antenna pruning at 868MHz |
| **Spectrum Analyzer** | tinySA Basic | $50.00 | ₹4,793.00 | RF channel noise monitoring & transmit power check |
| **USB Oscilloscope & Logic**| ADALM2000 | $99.00 | ₹9,491.13 | I2S clock line verification & 1-Wire signal integrity |
| **Total Toolkit** | | **$216.79** | **₹20,783.13** | |

---

## 📌 Pinout Mapping (Wio-E5 Mini to Peripherals)

```
       +---------------------------------------------+
       |           Wio-E5 Mini (STM32WLE5JC)         |
       +---------------------------------------------+
       |  PB4  ------> DS18B20 1-Wire Data (x3)      |
       |               (Requires 4.7K Pull-up to 3.3V) |
       |  PA2  ------> ICS-43434 I2S SCK (Clock)     |
       |  PA3  ------> ICS-43434 I2S WS (Word Sel)   |
       |  PA4  ------> ICS-43434 I2S SD (Data Out)   |
       |  PB6  ------> BME280 I2C SCL (Clock)        |
       |  PB7  ------> BME280 I2C SDA (Data)         |
       |  PA5  ------> HX711 Load Cell DT (Data)     |
       |  PA0  ------> HX711 Load Cell SCK (Clock)   |
       |  PA1  ------> Battery Voltage Sense (100K/100K)|
       |  3V3  ------> Clean 3.3V Rail (TPS73033)    |
       |  GND  ------> Common Ground Plane           |
       +---------------------------------------------+
```

---

## 📶 RF Antenna Calibration Guide (NanoVNA H4 & tinySA)

1. **Antenna Pruning (NanoVNA H4)**:
   * Connect 868MHz wire antenna to Port 1.
   * Set Frequency Sweep: Start `800 MHz`, Stop `920 MHz`, Center `868 MHz`.
   * Measure `S11 LOGMAG` and `VSWR`.
   * Target: $\text{VSWR} \le 1.4$ at 868 MHz (Minimum Return Loss $\le -15\text{ dB}$). Trim 86mm wire by 0.5mm increments if resonance frequency is offset.

2. **Transmission Monitoring (tinySA Basic)**:
   * Set Start `860 MHz`, Stop `876 MHz`, RBW `10 kHz`.
   * Trigger Wio-E5 transmit packet.
   * Verify clean 125kHz LoRa chirp spectrum without spurious harmonics at 1736MHz (2nd harmonic).
