# 🐝 BEEVIL KNIEVEL — OFFICIAL BILL OF MATERIALS (BOM) & HARDWARE SPECIFICATION

**Project:** Beevil Knievel: Precision Edge AI & Multi-Hop LoRa Smart Apiculture Platform  
**Target Hardware:** RAKwireless WisBlock RAK4631 + Raspberry Pi 3B+  

---

## 📦 1. Technical Bill of Materials (BOM)

| # | Component Description | Manufacturer / Model | Engineering Role |
|---|---|---|---|
| **1** | **RAKwireless WisBlock LPWAN Module** | RAK4631 (nRF52840 + SX1262, IN865) | Core Edge MCU, CMSIS-DSP FFT, LoRa Transmitter |
| **2** | **RAKwireless WisBlock Baseboard** | RAK5005-O / RAK19007 Base | Mainboard interconnect, battery & solar interface |
| **3** | **Waveshare SX1262 LoRa Gateway HAT** | Waveshare SX1262 for Raspberry Pi | Gateway SPI receiver module on Raspberry Pi 3B+ |
| **4** | **Precision Temp Sensor** | TI TMP117 High Precision Digital | Brood nest core reference temperature (±0.1°C) |
| **5** | **Waterproof Temp Probes** | Maxim DS18B20 (Original Chip, 1m) | 5-point frame thermal gradient array |
| **6** | **Environmental Multi-Gas Sensor** | Bosch BME688 (VOC/eCO2/Temp/Hum) | Foulbrood VOC & alarm pheromone detection |
| **7** | **NDIR CO2 Sensor** | Sensirion SCD41 True NDIR (400-5000ppm)| Respiration & pre-swarming ventilation spikes |
| **8** | **I2S MEMS Microphone** | InvenSense INMP441 Omnidirectional | Bio-acoustic 128-pt FFT (Queen piping & swarming) |
| **9** | **3-Axis Accelerometer** | ST LIS3DH (±2/4/8/16g) | Hive theft, knock-down & predator attack detection |
| **10** | **Weight I2C Unit (HX711)** | M5Stack HX711 24-Bit ADC Unit | High-resolution scale ADC for honey yield flux |
| **11** | **Raspberry Pi 3B+ Dedicated Heatsink** | Raspberry Pi 3B+-HEATSINK | Thermal dissipation for Gateway |
| **12** | **IPEX 1 to RP-SMA Female Cable** | 20cm RG178 Low-Loss Coaxial | RF antenna pigtail for IP65 bulkhead mount |
| **13** | **865-868MHz 1.8 dBi Antenna** | Tuned Rubber Duck Monopole | Sub-GHz LoRa transceiver antenna |
| **14** | **Polyamide PG 7 Cable Glands** | PG-7 IP68 Weatherproof Glands | Hermetic sensor pass-through for hive box |
| **15** | **Lever Terminal Block** | 4:2 Pole Spring Lock Connectors | 100% Solderless 5x probe junction block |
| **16** | **DuPont Wire Jumper Cable** | 2.54mm Female-to-Female | Solderless breadboard/sensor interconnects |
| **17** | **Raspberry Pi 3B+** | Broadcom BCM2837B0, Cortex-A53 | Linux Edge Gateway |
| **18** | **6V 100mAh Mini Solar Panel Kit** | Universal Hub + 134N3P 5V Step-Up Charger | Solar energy harvesting & Li-ion charge management |
| **19** | **JST-PH 2.0mm 4-Pin Silicone Wires** | JST-PH 2.0mm Connector Sets | Polarized, vibration-proof sensor wiring |

---

## 📌 2. Pinout & Interconnect Specification (RAK4631 WisBlock Base)

`
                       +-----------------------------------+
                       |    RAK4631 (Nordic nRF52840 MCU)  |
                       |      + SX1262 LoRa (IN865 Band)   |
                       +-----------------+-----------------+
                                         |
               +-------------------------+-------------------------+
               |                         |                         |
         [ I2C Bus ]                [ I2S Bus ]              [ 1-Wire Bus ]
      (SCL: P0.14, SDA: P0.13)   (SCK: P0.03, WS: P0.04)    (Data: P0.17 + 4.7K Pullup)
               |                  (SD_IN: P0.28)                   |
       +-------+-------+                 |                 +-------+-------+
       |       |       |                 |                 |       |       |
    BME688   SCD41   TMP117           INMP441           DS18B20 DS18B20 DS18B20
    (0x76)  (0x62)   (0x48)          (MEMS Mic)         (Frame1)(Frame2)(Frame3)
       |       |
    LIS3DH   HX711
    (0x18)  (Weight)
`

### Complete Pin Connections:
1. **I2C Shared Bus (3.3V, GND, SCL, SDA):**
   * **BME688 (0x76):** Multi-gas VOC, temperature, humidity, pressure.
   * **SCD41 (0x62):** True Photoacoustic NDIR CO2.
   * **TMP117 (0x48):** ±0.1°C Brood nest core reference.
   * **LIS3DH (0x18):** 3-Axis accelerometer (Theft/Knockdown).
   * **M5Stack HX711 (0x26):** 24-bit weight ADC.

2. **I2S Audio Bus (INMP441 Microphone):**
   * SCK / BCLK ➔ RAK4631 P0.03 (I2S Bit Clock)
   * WS / LRCLK ➔ RAK4631 P0.04 (Word Select / Frame Clock)
   * SD / DATA  ➔ RAK4631 P0.28 (Serial Data Out)
   * L/R        ➔ GND (Left Channel Mode)
   * VDD        ➔ 3.3V Rail

3. **1-Wire Temperature Bus (5x DS18B20 Probes):**
   * DATA ➔ RAK4631 P0.17 (with 4.7 kΩ pull-up resistor to 3.3V)
   * VCC  ➔ 3.3V Rail
   * GND  ➔ Common Ground

4. **Power & Solar Harvesting:**
   * Solar Panel (6V 100mA) ➔ 134N3P Solar Boost Charger Input
   * 18650 Li-ion Battery (3.7V) ➔ 134N3P Battery Port (BAT+ / BAT-)
   * Regulated 3.3V Output ➔ RAK WisBlock JST-PH Battery Input

---

## 📶 3. LoRa Radio RF Calibration

* **Carrier Frequency:** 865.0625 MHz (IN865 Sub-Band Channel 1)
* **Bandwidth:** 125 kHz
* **Spreading Factor:** SF7 (Fast 18ms on-air packet duration)
* **Coding Rate:** 4/5
* **Preamble Length:** 8 symbols
* **Transmit Power:** +14 dBm
* **Antenna Impedance:** 50 Ohm (Matched via IPEX to RP-SMA RG178 cable)
