# BEEVIL KNIEVEL — BILL OF MATERIALS (BOM) VISUAL & ENGINEERING MANIFEST

**Standard:** Hardware Source of Truth & Provenance Registry  
**Reference Code:** `hardware/BOM_AND_PINOUT.md`, `hardware/Smart_Hive_Monitor_BOM_with_INR.xlsx`  
**Compliance:** IEEE HART / Zero-Slop Hardware Documentation  

---

## 1. Overview & Methodological Standard

In strict adherence to Section 6 and Section 8 of the Master Engineering Figure & Submission Loop:
1. **The physical BOM is the immutable source of truth** for all hardware topology, schematics, and cutaway figures.
2. **Zero Hallucinated Components:** No component, IC, bus connection, or pin is permitted in any figure unless cataloged in this manifest.
3. **Hierarchy of Visual Evidence:** Schematics explain connectivity; physical component photographs and dimensioned vector drawings establish form factor and mounting orientation.

---

## 2. Canonical BOM Visual Matrix

| # | Component | Part Number | Manufacturer | System Role | Physical Location | Bus / Interface | Supply & Power | Figures Used | Visual Asset / Provenance | License Basis |
|---|---|---|---|---|---|---|---|---|---|---|
| **1** | **WisBlock Core MCU** | RAK4631 | RAKwireless / Nordic | Core Processing & LoRa TX | External Enclosure Slot 1 | SPI / I2C / I2S / GPIO | 3.3V (7.2 mA TX, 2.0 uA sleep) | Fig 00, 04, 04A, 08 | Vector SVG (`04_field_node_architecture.svg`) | Manufacturer Datasheet Open Access |
| **2** | **WisBlock Baseboard** | RAK5005-O / RAK19007 | RAKwireless | Module Interconnect & Power | External Enclosure Base | Mezzanine 40-pin | 3.7V - 4.2V VBAT Rail | Fig 00, 04, 04A | Vector SVG (`04_field_node_enclosure_schematic.svg`) | Manufacturer Reference Guide |
| **3** | **Precision Core Temp** | TMP117AIDRVR | Texas Instruments | Brood Nest Core Temp (NIST +/-0.1C) | Frame 3 Comb Center | I2C (Address 0x48, 400 kHz) | 3.3V, 3.5 uA (1 Hz sample) | Fig 00, 02A, 02, 04 | Vector Schematic + TI Footprint | TI Technical Documentation Open Access |
| **4** | **Thermal Gradient Probes** | DS18B20 (Waterproof) | Maxim Integrated (Analog Devices)| 5-Point Frame Lateral Profile | Frames 1, 2, 3, 4, 5 | 1-Wire (RAK4631 P0.17 + 4.7k pullup) | 3.3V, 1.0 mA active | Fig 00, 02A, 02, 04 | Vector Schematic (`02_langstroth_sensor_cutaway.svg`) | ADI Datasheet Specification |
| **5** | **Multi-Gas / VOC Sensor** | BME688 | Bosch Sensortec | Brood Disease VOCs & Air Quality | Upper Hive Ventilation Zone | I2C (Address 0x76, 400 kHz) | 3.3V, 12 mA heater pulse | Fig 00, 02A, 02, 04 | Vector SVG (`04_field_node_architecture.svg`) | Bosch Sensortec Open Documentation |
| **6** | **Photoacoustic NDIR CO2** | SCD41 | Sensirion | Respiration & Swarming Spikes | Upper Inner Cover Chamber | I2C (Address 0x62, 400 kHz) | 3.3V, 18 mA active average | Fig 00, 02A, 02, 04 | Vector SVG (`02_langstroth_sensor_cutaway.svg`) | Sensirion Technical Specification |
| **7** | **MEMS I2S Microphone** | INMP441 | InvenSense (TDK) | Acoustic Queen / Swarm Monitoring | Central Comb Cavity (Acoustic Hole)| I2S (SCK P0.03, WS P0.04, SD P0.28)| 3.3V, 1.4 mA active streaming | Fig 00, 02A, 02, 03, 03A, 04 | Vector Schematic (`03_acoustic_transduction_schematic.svg`)| TDK InvenSense Open Datasheet |
| **8** | **3-Axis Accelerometer** | LIS3DH | STMicroelectronics | Knock-Down, Theft, Predator Detection | Node PCB Enclosure | I2C (Address 0x18, 400 kHz) | 3.3V, 11 uA (50 Hz ODR) | Fig 00, 04, 08 | Vector SVG (`04_field_node_architecture.svg`) | ST Microelectronics Open Spec |
| **9** | **24-Bit Weight Scale ADC** | HX711 Unit | AVIA Semiconductor / M5Stack | Colony Mass & Foraging Yield | Bottom Board Load Cell Junction | I2C Bridge / 2-Wire Clock-Data | 3.3V, 1.5 mA active | Fig 00, 02A, 04, 08 | Vector Schematic (`02_langstroth_sensor_cutaway.svg`) | Open Hardware Spec |
| **10**| **Gateway LoRa HAT** | SX1262 LoRa HAT | Waveshare / Semtech | Gateway RF Concentrator | Gateway Enclosure (40-Pin GPIO) | SPI (`/dev/spidev0.0`, CS0) | 5V / 3.3V via 40-pin header | Fig 00, 05, 06, 08 | Vector SVG (`06_gateway_architecture.svg`) | Waveshare Open Hardware Wiki |
| **11**| **Linux Edge Gateway SBC**| Raspberry Pi 3B+ | Raspberry Pi Foundation | Local Ingestion, CUSUM, Telemetry DB| Apiary Perimeter Mast / Enclosure | 40-Pin GPIO + GbE + 802.11ac | 5V DC, 2.5A (3.5W - 5.0W) | Fig 00, 05, 06, 08 | Vector SVG (`06_gateway_architecture.svg`) | Raspberry Pi Open Hardware Documentation |
| **12**| **Solar Harvesting Panel** | 6V 100mA Mini Panel | Generic Monocrystalline | Ambient Daylight Energy Scavenging | Node Outer Weather Lid | 2-Pin Bare Wire / JST | 6.0V Voc, 100mA Isc (0.6W peak) | Fig 00, 02A, 04, 04A | Vector Schematic (`04_field_node_enclosure_schematic.svg`)| Open Specifications |
| **13**| **Solar Boost / Li-Ion IC**| 134N3P / TP4056 | Injoinic | MPPT Voltage Step-Up & Battery Mgmt | Node Power Sub-PCB | JST-PH 2.0mm Battery Terminal | 3.7V - 4.2V CC/CV Charging | Fig 04, 04A, 08 | Vector Schematic (`04_field_node_architecture.svg`) | Manufacturer Open Datasheet |
| **14**| **Rechargeable Battery** | 18650 Li-Ion Cell | Panasonic / LG | Sustained Night / Winter Power | Node Internal Battery Cradle | JST-PH 2.0mm Polarized Lead | 3.7V Nominal, 2600 mAh (9.62 Wh)| Fig 00, 04, 04A | Vector Schematic (`04_field_node_enclosure_schematic.svg`)| Standard Battery Specification |
| **15**| **Cable Glands (IP68)** | PG-7 Polyamide | Weatherproof Nylon | Hive Wall Hermetic Cable Feed | Hive Deep Brood Box Flank | M12 x 1.5 thread, 3-6.5mm cable | Mechanical / Passive | Fig 02A, 04A | Vector Schematic (`02_langstroth_sensor_cutaway.svg`) | Industrial Mechanical Standard |
| **16**| **LoRa Antenna (Sub-GHz)** | 865-868MHz 1.8dBi | Tuned Rubber Duck Monopole | IN865 RF Radiation & Reception | Bulkhead RP-SMA Connector | 50-Ohm Coaxial Pigtail (RG178) | Passive RF (+14 dBm rated) | Fig 00, 02A, 04A, 05 | Vector Schematic (`04_field_node_enclosure_schematic.svg`)| Open RF Specifications |

---

## 3. Physical Placement & Interconnect Map

`
                    [ 10-FRAME LANGSTROTH HIVE ]
  +-------------------------------------------------------------+
  | OUTER TELESCOPING COVER                                     |
  | [ 6V 100mA Monocrystalline Solar Panel ]                   |
  +-------------------------------------------------------------+
  | INNER VENTILATION COVER                                     |
  |  * Sensirion SCD41 (NDIR CO2) - 0x62                       |
  |  * Bosch BME688 (VOC / Temperature / Humidity) - 0x76       |
  +-------------------------------------------------------------+
  | HONEY SUPER (Frames 1-10)                                   |
  |                                                             |
  +-------------------------------------------------------------+
  | QUEEN EXCLUDER (Wire Grid)                                  |
  +-------------------------------------------------------------+
  | DEEP BROOD CHAMBER                                          |
  |  * Frame 1 (Outer Left):    DS18B20 #1 (1-Wire)             |
  |  * Frame 2 (Left Brood):    DS18B20 #2 (1-Wire)             |
  |  * Frame 3 (Brood Center):  TMP117 NIST (I2C 0x48) +        |
  |                             INMP441 MEMS Mic (I2S)          |
  |  * Frame 4 (Right Brood):   DS18B20 #3 (1-Wire)             |
  |  * Frame 5 (Outer Right):   DS18B20 #4 (1-Wire)             |
  |  * Comb Sump Air:           DS18B20 #5 (1-Wire)             |
  |                                                             |
  |  [ IP68 PG-7 Hermetic Glands Pass-Through on Hive Flank ]   |
  +-------------------------------------------------------------+
  | SCREENED BOTTOM BOARD                                       |
  |  * Dual-Shear Beam Load Cells + HX711 24-bit ADC           |
  +-------------------------------------------------------------+
               │ (Silicone Wire Harness via PG-7)
               ▼
  +-------------------------------------------------------------+
  | EXTERNAL IP67 FIELD NODE ENCLOSURE                          |
  |  * RAKwireless WisBlock RAK4631 (nRF52840 + SX1262 LoRa)   |
  |  * RAK19007 Interconnect Baseboard                          |
  |  * STMicroelectronics LIS3DH 3-Axis Accelerometer (0x18)    |
  |  * 18650 Li-Ion Cell (3.7V, 2600 mAh)                       |
  |  * 134N3P / TP4056 Solar Step-Up Charge Controller          |
  |  * 865 MHz RP-SMA Monopole Antenna                          |
  +-------------------------------------------------------------+
`
