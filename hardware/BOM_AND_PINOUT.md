# 🐝 BEEVIL KNIEVEL — OFFICIAL PROCUREMENT BILL OF MATERIALS (BOM) & HARDWARE SPECIFICATION

**Project:** Beevil Knievel: Precision Edge AI & Multi-Hop LoRa Smart Apiculture Platform  
**Target Hardware:** Nordic nRF52840 (RAK4631) + Raspberry Pi Compute Module 4 (CM4)  
**Procurement Status:** 100% Sourced, Invoiced & Verified (Robu.in, Amazon India, PCBPower)  

---

## 📦 1. Verified Procurement Bill of Materials (BOM)

### 🛒 A. Robu.in Master Hardware Invoice (Invoice #INV2627/203030)
| # | Part Code | Component Description | Manufacturer / Model | HSN Code | Qty | Unit Price (INR) | IGST (18%) | Total (INR) | Engineering Role |
|---|:---:|---|---|:---:|:---:|:---:|:---:|:---:|---|
| **1** | R160022 | **RAKwireless WisBlock LPWAN Module** | RAK4631 (nRF52840 + SX1262, IN865) | 84733010 | 1 | ₹ 2,541.53 | ₹ 457.47 | **₹ 2,999.00** | Core Edge MCU, CMSIS-DSP FFT, LoRa Transmitter |
| **2** | R223908 | **RAKwireless WisBlock Baseboard** | RAK5005-O / RAK19007 Base | 84734090 | 1 | ₹ 1,388.98 | ₹ 250.02 | **₹ 1,639.00** | Mainboard interconnect, battery & solar interface |
| **3** | 968493 | **Waveshare SX1262 LoRa Gateway HAT** | Waveshare SX1262 for Raspberry Pi | 85176290 | 1 | ₹ 2,380.51 | ₹ 428.49 | **₹ 2,809.00** | Gateway SPI receiver module on CM4/Pi |
| **4** | 1848642 | **SmartElex Precision Temp Sensor** | TI TMP117 High Precision Digital | 90275090 | 1 | ₹ 137.29 | ₹ 24.71 | **₹ 162.00** | Brood nest core reference temperature (±0.1°C) |
| **5** | 43950 | **DS18B20 Waterproof Temp Probes** | Maxim DS18B20 (Original Chip, 1m) | 85439000 | 5 | ₹ 385.59 | ₹ 69.41 | **₹ 455.00** | 5-point frame thermal gradient array |
| **6** | 1848637 | **SmartElex Environmental Multi-Gas** | Bosch BME688 (VOC/eCO2/Temp/Hum) | 90275090 | 1 | ₹ 863.56 | ₹ 155.44 | **₹ 1,019.00** | Foulbrood VOC & alarm pheromone detection |
| **7** | 1551174 | **DFRobot Gravity I2C SCD41 CO2** | Sensirion SCD41 True NDIR (400-5000ppm)| 90318000 | 1 | ₹ 5,541.53 | ₹ 997.47 | **₹ 6,539.00** | Respiration & pre-swarming ventilation spikes |
| **8** | 975775 | **INMP441 I2S MEMS Microphone** | InvenSense INMP441 Omnidirectional | 85439000 | 1 | ₹ 126.27 | ₹ 22.73 | **₹ 149.00** | Bio-acoustic 128-pt FFT (Queen piping & swarming) |
| **9** | 1383200 | **Adafruit LIS3DH 3-Axis Accelerometer** | ST LIS3DH (±2/4/8/16g) | 84734090 | 1 | ₹ 677.12 | ₹ 121.88 | **₹ 799.00** | Hive theft, knock-down & predator attack detection |
| **10** | R135362 | **M5Stack Weight I2C Unit (HX711)** | M5Stack HX711 24-Bit ADC Unit | 85439000 | 1 | ₹ 516.10 | ₹ 92.90 | **₹ 609.00** | High-resolution scale ADC for honey yield flux |
| **11** | 1150736 | **CM4 Dedicated Aluminum Heatsink** | Waveshare CM4-HEATSINK | 84799090 | 1 | ₹ 253.39 | ₹ 45.61 | **₹ 299.00** | Thermal dissipation for CM4 Quad-Core Cortex-A72 |
| **12** | 1675007 | **IPEX 1 to RP-SMA Female Cable** | 20cm RG178 Low-Loss Coaxial | 85444299 | 1 | ₹ 90.68 | ₹ 16.32 | **₹ 107.00** | RF antenna pigtail for IP65 bulkhead mount |
| **13** | 1444596 | **865-868MHz 1.8 dBi Antenna** | Tuned Rubber Duck Monopole | 85291029 | 1 | ₹ 105.93 | ₹ 19.07 | **₹ 125.00** | Sub-GHz LoRa transceiver antenna |
| **14** | 1765030 | **Polyamide PG 7 Cable Glands** | PG-7 IP68 Weatherproof Glands | 39269099 | 4 | ₹ 33.90 | ₹ 6.10 | **₹ 40.00** | Hermetic sensor pass-through for hive box |
| **15** | 1031164 | **PCT-SPL-42 Lever Terminal Block** | 4:2 Pole Spring Lock Connectors | 85365090 | 2 | ₹ 69.49 | ₹ 12.51 | **₹ 82.00** | 100% Solderless 5x probe junction block |
| **16** | 7449 | **20CM DuPont Wire Jumper Cable** | 2.54mm Female-to-Female (40 pcs) | 85444299 | 1 | ₹ 34.75 | ₹ 6.25 | **₹ 41.00** | Solderless breadboard/sensor interconnects |
| **17** | 52255 | **CAT6 Gigabit Ethernet Patch Cable** | High-Speed Molded LAN Cable | 85444299 | 1 | ₹ 133.90 | ₹ 24.10 | **₹ 158.00** | CM4 Gateway LAN/PoE backbone uplink |
| **18** | 1486397 | **Waveshare Industrial USB HUB** | Switchable Dual Hosts, Isolated | 85369090 | 1 | ₹ 1,812.71 | ₹ 326.29 | **₹ 2,139.00** | Industrial USB power & peripheral hub |
| **19** | R264662 | **Raspberry Pi Compute Module 4** | CM4102032 (2GB RAM, 32GB eMMC, Wi-Fi) | 84733010 | 1 | ₹ 9,555.08 | ₹ 1,719.92 | **₹ 11,275.00** | Linux Edge Gateway & INT8 AI Neural Engine |
| **20** | Logistics| **BlueDart Express Air Shipping** | BlueDart Air Express Delivery | 996819 | 1 | ₹ 683.22 | ₹ 122.98 | **₹ 806.20** | Insured air logistics |
| **—** | **SUBTOTAL** | **Robu.in Invoice Total** | | | **28** | | | **₹ 32,251.20** | |

---

### ☀️ B. Amazon India Power & Wiring Orders
| # | Order ID | Component Description | Manufacturer / Model | Qty | Unit Price (INR) | Total (INR) | Purpose |
|---|:---:|---|---|:---:|:---:|:---:|---|
| **21** | 405-2654128 | **6V 100mAh Mini Solar Panel Kit** | Universal Hub + 134N3P 5V Step-Up Charger | 1 | ₹ 99.00 + Shipping | **₹ 164.50** | Solar energy harvesting & Li-ion charge management |
| **22** | 405-7622835 | **JST-PH 2.0mm 4-Pin Silicone Wires** | Villcron JST-PH 2.0mm Connector Sets (10-pack)| 10 | ₹ 89.00/pk | **₹ 960.50** | Polarized, vibration-proof sensor wiring |
| **—** | **SUBTOTAL** | **Amazon India Orders Total** | | **11** | | **₹ 1,125.00** | |

---

### 🏭 C. Custom PCB Manufacturing Vouchers (PCBPower / Circuit Systems India)
| # | Order Reference | Service Description | Fab House | Order Date | Scheduled Dispatch | Total Value (INR) |
|---|:---:|---|---|:---:|:---:|:---:|
| **23** | Order #792296 | **Custom Baseboard PCB Fabrication** | PCBPower (Circuit Systems India Ltd) | 20/08/2026 | 29/08/2026 | **₹ 19,599.00** |
| **24** | Order #792296-A | **Custom Baseboard PCB Assembly & Stencil**| PCBPower (Circuit Systems India Ltd) | 20/08/2026 | 13/10/2026 | **₹ 9,318.00** |
| **—** | **SUBTOTAL** | **PCBPower Total Investment** | | | | **₹ 28,917.00** |

---

## 💰 2. Grand Total Financial Investment

`
┌─────────────────────────────────────────────────────────────────────────────┐
│                     TOTAL HARDWARE PROCUREMENT SUMMARY                      │
│                                                                             │
│  1. 🛒 Robu.in Electronics, CM4 & Sensor Suite:                 ₹ 32,251.20 │
│  2. ☀️ Amazon India Solar Harvesting & JST-PH Cables:           ₹  1,125.00 │
│  3. 🏭 PCBPower Custom PCB Fabrication & SMT Assembly:          ₹ 28,917.00 │
│  ─────────────────────────────────────────────────────────────────────────  │
│  GRAND TOTAL INVESTMENT IN HARDWARE ECOSYSTEM:                  ₹ 62,293.20 │
└─────────────────────────────────────────────────────────────────────────────┘
`

---

## 📌 3. Pinout & Interconnect Specification (RAK4631 WisBlock Base)

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

## 📶 4. LoRa Radio RF Calibration

* **Carrier Frequency:** 865.0625 MHz (IN865 Sub-Band Channel 1)
* **Bandwidth:** 125 kHz
* **Spreading Factor:** SF7 (Fast 18ms on-air packet duration)
* **Coding Rate:** 4/5
* **Preamble Length:** 8 symbols
* **Transmit Power:** +14 dBm
* **Antenna Impedance:** 50 Ohm (Matched via IPEX to RP-SMA RG178 cable)
