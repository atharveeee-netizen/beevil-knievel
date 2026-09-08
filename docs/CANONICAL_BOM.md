# BEEVIL KNIEVEL — CANONICAL BILL OF MATERIALS (BOM)

**Standard:** IEEE HARDWAIre Phase 2 Prototype Bring-Up  
**Hardware Revision:** Rev 2.1 Bench Prototype & Gateway Reference Design  
**Date:** September 2026  
**Document Status:** CANONICAL TRUTH MATRIX — OBSOLETE CLAIMS REMOVED  

---

## 1. Component Audit & Specification Matrix

The following table specifies every physical component of the **Beevil Knievel** smart apiculture platform. Every entry details the exact manufacturer, part number, engineering purpose, electrical interface, and current actual vs expected verification status.

| # | COMPONENT | MANUFACTURER | PART NUMBER | QTY | PURPOSE | ELECTRICAL INTERFACE | ACTUAL / EXPECTED STATUS |
|---|---|---|---|:---:|---|---|---|
| **1** | **Core MCU & LoRa Transceiver** | RAKwireless / Nordic Semi / Semtech | `RAK4631` (nRF52840 + SX1262) | 1 | Edge inference, CMSIS-DSP FFT, CUSUM filtering, LoRa TX | Internal SPI, SWD, USB CDC 115200 baud | `VALIDATED_CANONICAL` (Firmware compiles & links cleanly with `nordicnrf52@11.0.0`) |
| **2** | **WisBlock Baseboard** | RAKwireless | `RAK5005-O` (or `RAK19007`) | 1 | Interconnect carrier, sensor slots, battery & solar power gating | High-density mezzanine connectors, JST-PH 2.0mm | `EXPECTED_BENCH_BASE` (Carries 3.3V rail & SAADC divider gate on P0.29) |
| **3** | **Brood Nest Core Temp Sensor** | Texas Instruments | `TMP117AIDRVR` | 1 | Core cluster thermodynamic monitoring ($\pm 0.1^\circ\text{C}$ NIST-traceable) | I2C (Address: `0x48`, Fast Mode 400 kHz) | `DRIVER_VERIFIED` (Reports `NOT_CONNECTED` when unpopulated on bench) |
| **4** | **Brood Thermal Grid Probes** | Maxim Integrated / Analog Devices | `DS18B20` (IP68 Stainless Probe) | 5 | 5-point cross-frame thermal gradient mapping | 1-Wire Bus (RAK4631 Pin `P0.04`, 4.7 k$\Omega$ pullup) | `DRIVER_VERIFIED` (Reports 0 to 5 detected probes dynamically) |
| **5** | **NDIR CO2 Environmental Sensor** | Sensirion | `SCD41-B-AAD-R2` | 1 | Respiration metabolism & pre-swarming ventilation monitoring (400–5000 ppm) | I2C (Address: `0x62`, Fast Mode 400 kHz) | `DRIVER_VERIFIED` (Reports `NOT_CONNECTED` when unpopulated on bench) |
| **6** | **Environmental Multi-Gas / VOC** | Bosch Sensortec | `BME688` | 1 | Foulbrood VOC biomarkers, relative humidity, barometric pressure | I2C (Address: `0x76`, Fast Mode 400 kHz) | `DRIVER_VERIFIED` (Reports `NOT_CONNECTED` when unpopulated on bench) |
| **7** | **Hive Theft & Tamper Accelerometer**| STMicroelectronics | `LIS3DH` | 1 | Knockdown, vandalism, predator attack, hive tilt detection ($\pm 2g$) | I2C (Address: `0x18`, Interrupts on `P0.15`) | `DRIVER_VERIFIED` (Reports `NOT_CONNECTED` when unpopulated on bench) |
| **8** | **Solar Ambient Lux Sensor** | Vishay Semiconductors | `VEML7700-TT` | 1 | Ambient solar lux measurement for foraging departure correlation (0–120k Lux) | I2C (Address: `0x10`, Fast Mode 400 kHz) | `DRIVER_VERIFIED` (Reports `NOT_CONNECTED` when unpopulated on bench) |
| **9** | **Hive Scale 24-Bit ADC** | Avia Semiconductor / M5Stack | `HX711` Unit | 1 | High-resolution wheatstone bridge ADC for hive weight & honey yield | I2C Bridge (`0x26`) or Direct GPIO Bit-bang (`P0.17` / `P0.28`) | `DRIVER_VERIFIED` (Reports `UNCALIBRATED` / `NOT_CONNECTED` until tared) |
| **10** | **Digital Bio-Acoustic MEMS Mic** | InvenSense / TDK (or Knowles) | `INMP441` (or `ICS-43434`) | 1 | Bio-acoustic wingbeat FFT (queen piping, pre-swarm acoustic surge) | Digital I2S (`SCK: P0.03`, `WS: P0.04`, `SD: P0.28`) | `CODE_STANDARDIZED` (256-pt Real FFT @ 16 kHz; zero synthetic sine waves) |
| **11** | **Sub-GHz LoRa Antenna** | Taoglas / Linx Technologies | `ANT-868-CW-HWR-SMA` | 1 | 865–868 MHz tuned monopole antenna for IN865 band (+14 dBm) | 50 $\Omega$ IPEX/U.FL to RP-SMA bulkhead cable | `VALIDATED` (Calculated link budget: 142 dB, 4.2 km range) |
| **12** | **Rechargeable Battery Cell** | Panasonic / Samsung / LG | `NCR18650B` 3.7V 3000mAh | 1 | Main electrochemical energy reservoir | JST-PH 2-pin connector to TP4054 on RAK5005-O | `VALIDATED_CANONICAL` (1S 3.7V LiPo/Li-ion NMC; 4.20V termination, 3.27V cutoff) |
| **13** | **Energy Harvesting Solar Panel** | Waveshare / Voltaic | `6V 100mA` Monocrystalline | 1 | Photovoltaic harvesting to replenish 18650 cell | 2-pin screw terminal to RAK5005-O solar input | `SPECIFIED` (Average 80–100 mA peak solar irradiance yield) |
| **14** | **Enclosure & Glands** | Bud Industries / Fibox | `IP65 Polycarbonate Enclosure` + 4x `PG-7 Glands` | 1 | Hermetic, UV-stabilized, bee-safe outdoor field enclosure | Mechanical / Solderless pass-throughs | `VALIDATED` (CAD models & 3D render assets verified in repo) |
| **15** | **Edge Gateway Single Board Computer**| Raspberry Pi Foundation | `Raspberry Pi 3 Model B+` | 1 | Local aggregation, SQLite store, MQTT bridge, FastAPI backend | 40-pin GPIO header, Ethernet / Wi-Fi | `DRIVER_VERIFIED` (`gateway/gateway_receiver.py` validated) |
| **16** | **Edge Gateway LoRa HAT** | Waveshare | `SX1262 LoRa HAT for RPi` (868M) | 1 | Sub-GHz base station transceiver for multi-node ingestion | SPI Bus (`spidev0.0`), CE0, GPIO Reset/Busy | `DRIVER_VERIFIED` (Receives 32-byte binary payload, passes to SQLite/MQTT) |

---

## 2. Removal of Obsolete & Contradictory Claims

1. **LiFePO4 Battery Chemistry Eradicated:**
   - *Legacy Claim:* Certain early architectural drafts mentioned "LiFePO4 3.2V battery".
   - *Correction:* The onboard battery management IC on the RAK5005-O baseboard is a **TP4054**, which has an unalterable hardware charge profile hardwired for **4.20V $\pm 1\%$ CC/CV termination**. Connecting a 3.2V nominal LiFePO4 cell to a 4.20V charger is hazardous. The canonical chemistry is strictly **1S 3.7V Li-ion (NMC) / LiPo** with an operating range of **3.27V (0%) to 4.20V (100%)**.

2. **Synthetic Sine Wave Audio Math Eradicated:**
   - *Legacy Claim:* Audio task in `beevil_nrf52_freertos.c` executed `0.5*sinf(180t) + 0.7*sinf(250t)` as a placeholder for microphone input.
   - *Correction:* Eradicated completely. When the INMP441 I2S microphone is physically populated, genuine DMA PCM frames are acquired and processed via ARM CMSIS-DSP. When absent on the bench, status is strictly reported as `NOT_CONNECTED / UNAVAILABLE` with zeroed energy bands.

3. **FFT Resolution Discrepancy Resolved:**
   - *Legacy Claim:* Some files cited 128-point FFT, while Phase 2 video script cited 256-point FFT.
   - *Correction:* Standardized canonical pipeline to **256-point Real FFT @ 16 kHz** ($F_s / N = 62.5\text{ Hz}$ per bin). This accurately maps the critical 200–400 Hz swarming acoustic band into bins 3, 4, 5, and 6.

4. **Bench Prototype Status:**
   - *Truth Rule:* The current physical assembly is an engineering **BENCH PROTOTYPE**. Field deployment claims in legacy marketing texts have been reclassified as **TARGET / PROPOSED** until live apicultural validation takes place.
