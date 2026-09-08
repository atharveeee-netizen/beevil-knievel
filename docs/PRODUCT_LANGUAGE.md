# BEEVIL KNIEVEL — PRODUCT TERMINOLOGY & SYSTEM IDENTITY SOURCE OF TRUTH

**Revision:** 2.1  
**Scope:** Universal Terminology across Public Website, Field App, Operations Console, README, Submission Reports, and CAD/MATLAB Schematics  
**Rule:** ABSOLUTE CROSS-SURFACE CONSISTENCY  

---

## 1. System Identity

- **Canonical Product Name:** `BEEVIL KNIEVEL` (All caps in titles/headers, Title Case `Beevil Knievel` in running text).
- **Canonical System Subtitle:** `Sub-GHz Acoustic & Brood Telemetry for Commercial Apiaries`
- **Canonical Secondary Statement:** `Continuous hive-state monitoring through temperature, acoustic, environmental, weight and motion signals.`
- **Target Competition / Evaluation Standard:** `IEEE HardwAIre Challenge Phase 2`
- **Physical Evaluation Classification:** `Bench Prototype (Evaluation Node)` (Never claim full deployed commercial apiary fleet as already achieved; field scale is `Target / Proposed`).

---

## 2. Three Connected Surfaces

1. **Surface A — Public Engineering Website (`/`):**
   - *Audience:* IEEE judges, hardware engineers, researchers, apiary operators.
   - *Purpose:* Explains the 3-tier cyber-physical architecture and presents physical evidence.
   - *Narrative Loop:* Problem $\to$ Measurement $\to$ Signal $\to$ Processing $\to$ Transmission $\to$ Receiver $\to$ Analytics $\to$ Decision.

2. **Surface B — Field App (`/field`):**
   - *Audience:* On-site apiary technicians and migratory beekeepers.
   - *Purpose:* Rapid outdoor hive triage (`NORMAL`, `ATTENTION`, `INVESTIGATE`, `CRITICAL`), glove-friendly ($\ge 48\text{px}$ targets), and sunlight-readable.

3. **Surface C — Operations / Telemetry Console (`/console` and `/app`):**
   - *Audience:* Base station operators, research directors, fleet telemetry analysts.
   - *Purpose:* Edge gateway mast monitoring, high-density 100-hive network telemetry, SQLite WAL audit trail, and CUSUM change-point traces.

---

## 3. Hardware Component Terminology

| Component Function | Canonical Hardware Term | Manufacturer & Model | Bus / Interface | Verified Status |
|---|---|---|---|---|
| **Core Field MCU** | Field Telemetry Node | RAKwireless WisBlock RAK4631 (Nordic nRF52840 SoC) | Internal SPI / I2C / I2S | VALIDATED |
| **Node Carrier Baseboard** | WisBlock Baseboard | RAKwireless RAK5005-O | High-density mezzanine | VALIDATED |
| **RF Transceiver** | Sub-GHz LoRa Engine | Semtech SX1262 (integrated on RAK4631) | SPI / RF Switch | VALIDATED |
| **Antenna** | Tuned Monopole Antenna | Taoglas ANT-868-CW-HWR-SMA | 50 $\Omega$ RP-SMA | VALIDATED |
| **Brood Core Temperature** | Brood-Nest Thermal Transducer | Texas Instruments TMP117AIDRVR | I2C (`0x48`, 400 kHz) | DRIVER_VERIFIED |
| **Frame Gradient Probes** | 5-Point Frame Thermal Array | Maxim / ADI DS18B20 (5 Stainless Probes) | 1-Wire (`P0.04`) | DRIVER_VERIFIED |
| **Acoustic Transducer** | Bio-Acoustic MEMS Microphone | TDK InvenSense INMP441 | Digital I2S DMA (`16 kHz`) | CODE_STANDARDIZED |
| **Respiration Gas Sensor** | Photoacoustic NDIR CO2 Sensor | Sensirion SCD41 | I2C (`0x62`, 400 kHz) | DRIVER_VERIFIED |
| **Environmental Gas / VOC**| Multi-Gas & Volatile Profiler | Bosch Sensortec BME688 | I2C (`0x76`, 400 kHz) | DRIVER_VERIFIED |
| **Gross Colony Mass** | Dual-Bar Hive Scale ADC | Avia Semiconductor HX711 (24-bit) | I2C Bridge (`0x26`) | DRIVER_VERIFIED |
| **Theft & Knockdown Sensor**| 3-Axis Seismic Accelerometer | STMicroelectronics LIS3DH | I2C (`0x18`, Int on `P0.15`) | DRIVER_VERIFIED |
| **Ambient Solar Sensor** | Ambient Lux Transducer | Vishay Semiconductors VEML7700 | I2C (`0x10`, 400 kHz) | DRIVER_VERIFIED |
| **Rechargeable Battery** | 1S 3.7V Li-ion NMC Cell | Panasonic / LG NCR18650B (3000 mAh) | JST-PH 2.0mm to TP4054 | VALIDATED |
| **Solar Harvester** | Outdoor Photovoltaic Panel | 0.5W / 6V 100mA Monocrystalline Panel | Screw terminal | SPECIFIED |
| **Field Enclosure** | IP65 Polycarbonate Enclosure | Custom Polycarbonate + 4x PG-7 Glands | Hermetic pass-through | VALIDATED |
| **Edge Gateway SBC** | Hardened Edge Gateway | Raspberry Pi Foundation Raspberry Pi 3B+ | Broadcom BCM2837B0 @ 1.4GHz | VALIDATED |
| **Gateway Radio Concentrator**| LoRa Gateway HAT | Waveshare SX1262 LoRa Gateway HAT | 40-pin GPIO / `spidev0.0` | DRIVER_VERIFIED |

---

## 4. Radio Architecture & Protocol Terminology

- **Primary Radio Architecture:** `Dual-Radio Hybrid Architecture`
  1. `2.4 GHz Bluetooth Low Energy (BLE) Mesh`: Intra-yard inter-hive clustering and local cross-correlation.
  2. `Sub-GHz LoRa Star Backhaul`: Long-range uplink to mast-mounted edge gateway (IN865 Band: 865.0625 MHz, SF7, BW 125 kHz, CR 4/5, +14 dBm).
- **Telemetry Frame:** `BeevilLoRaPayload` (32/33-byte packed binary struct `<Hh5hHHHHH B8B`).
- **Gateway Database:** `SQLite 3 Write-Ahead Logging (WAL)` on OverlayFS read-only rootfs.

---

## 5. DSP & Model Terminology

1. **Acoustic Signal Processing:**
   - Architecture: `ARM CMSIS-DSP 256-point Real FFT` at $f_s = 16\text{ kHz}$ (or $2\text{ kHz}$ decimated).
   - Frequency Resolution: $\Delta f = 62.5\text{ Hz}$ per bin ($16\text{ kHz} / 256$) or $7.8125\text{ Hz}$ ($2\text{ kHz} / 256$).
   - Window Function: `Hanning Window` ($-32\text{ dB}$ sidelobe suppression).
2. **Biological Frequency Bands:**
   - Band 1 (`100 - 180 Hz`): Fanning, thermal regulation, and hive ventilation.
   - Band 2 (`200 - 400 Hz`): Worker flight baseline, queen piping, and waggle communication.
   - Band 3 (`450 - 750 Hz`): Pre-swarm acoustic surge and queenless distress roaring.
   - Band 4 (`800 - 1200 Hz`): Environmental noise floor (wind, heavy rain, foliage rustle).
3. **Change-Point Detection:**
   - Algorithm: `CUSUM (Cumulative Sum) Brood Filter` (Page, 1954).
   - Baseline Mean: $\mu_0 = 34.5^\circ\text{C}$ (or $34.82^\circ\text{C}$ empirical brood cluster setpoint).
   - Slack Allowance: $K = 0.15^\circ\text{C}$.
   - Decision Threshold: $h = 1.20^\circ\text{C}\cdot\text{hr}$.
4. **Gateway Diagnostics Engine:**
   - Name: `EdgeDiagnosticEngine` (16 input channels $\to$ 8 diagnostic states).
   - States: `HEALTHY_NORMAL`, `QUEEN_PRESENT`, `QUEENLESS_DISTRESS`, `PRE_SWARM_WARNING`, `ACTIVE_SWARM`, `VARROA_HIGH`, `THERMAL_STRESS`, `TAMPER_THEFT`.

---

## 6. Prohibited AI Slop Terms

| Prohibited Term / Tropes | Why Prohibited | Mandatory Replacement |
|---|---|---|
| "AI-powered revolutionary smart beekeeping platform" | Empty hype; lacks engineering specificity. | "Cyber-Physical Telemetry Platform for Commercial Apiaries" |
| "Seamless", "Game-changing", "Cutting-edge" | Unmeasured marketing filler. | Delete; state specific quantitative metrics (e.g., $\pm 0.1^\circ\text{C}$, $2.0\,\mu\text{A}$, $4.2\text{ km}$). |
| "6 TOPS NPU / Neural Processing Unit" | Fictitious hardware claim; not present in BOM. | "Quad-Core Broadcom BCM2837B0 @ 1.4 GHz (1.2 ms CPU inference)" |
| "Pre-Order for $189" / "15% Education Discount" | Commercial retail simulation; not an e-commerce shop. | "IEEE Phase 2 Research Prototype (BoM: $64.54 USD / ₹5,380)" |
| "Beevil Solo / Apiary Pro / Pollination Grid" | Fictitious commercial product SKUs. | "Single Hive Benchmark vs 100-Hive Scalable Apiary Network" |
| "LiFePO4 3.2V battery" | Dangerous contradiction; charger is 4.20V CC/CV. | "1S 3.7V Li-ion (NMC) 18650 (3.27V to 4.20V operating range)" |
