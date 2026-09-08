# MATLAB ENGINEERING FIGURE INDEX & ARCHITECTURAL MANIFEST
## IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
**Sub-GHz Precision Apiculture Telemetry, Edge CUSUM Anomaly Detection & Multi-Modal Gateway Analytics**

---

### Executive Overview

This manifest establishes the canonical index, evidence mapping, and deployment targets for the complete suite of **13 MATLAB-engineered publication figures** created for the **BEEVIL KNIEVEL** IEEE HardwAIre Challenge Phase 2 submission.

All figures adhere strictly to the **SYZYGY Engineering Guidelines**:
1. **Pure White Background (`#ffffff`)**: Zero dark backgrounds, zero decorative shadows, zero neon glow.
2. **Technical Slate Palette**: Primary line art in `#0f172a` (slate dark), card borders in `#94a3b8` (slate light).
3. **Strict 5-Tier Evidence Classification**:
   - `[MEASURED]` (`#047857` Emerald): Bench instruments (Keithley 6514, logic analyzers, digital calipers).
   - `[VALIDATED]` (`#0284c7` Sky Blue): Empirical calibrations (NIST RTD, Zenodo 1321278 ML test split, Pytest suite).
   - `[CALCULATED]` (`#7c3aed` Purple): Closed-form physics equations (Friis path loss, airtime, battery life).
   - `[SIMULATED]` (`#c2410c` Rust Amber): Multiphysics solvers (Ansys Maxwell / HFSS, Ansys Fluent CFD).
   - `[DEMONSTRATED]` (`#0f766e` Teal): Physical prototype builds (WisBlock RAK5005-O, RPi 3B+, 4:2 terminals).
4. **Zero Custom PCB Guarantee**: All on-node electronics leverage modular COTS WisBlock baseboard and standard Raspberry Pi 3B+ + Waveshare HAT.
5. **Gateway-Centric Star Topology**: Direct sub-GHz LoRa (IN865: 865.0625 MHz, SF7, BW 125 kHz) star, **NOT mesh**.
6. **Triple-Format Distribution**: Every figure is generated and validated in **Vector PDF**, **Vector SVG**, and **300 DPI PNG** in `docs/figures/matlab/`.

---

### Master Figure Matrix

| Fig # | File Basename | Title | Aspect Ratio | Key Subsystems Shown | Primary Source Code | Evidence Tags | IEEE Report Target | Video Timestamp / Cue |
|:---:|:---|:---|:---:|:---|:---|:---:|:---|:---|
| **01** | `01_system_architecture` | End-to-End System Architecture | 16:9 | Hive Transducers, Modular RAK4631 Node, RPi 3B+ Gateway | `firmware/src/main.cpp`, `gateway/src/main.py` | `[DEMONSTRATED]`, `[VALIDATED]`, `[CALCULATED]`, `[MEASURED]` | Section 2: System Architecture | 0:35 – 0:55 (Architecture intro) |
| **02** | `02_hive_sensor_layer` | Hive Sensor Physical Layer & Transduction | 16:9 | Langstroth 10-frame box, TMP117 RTD, DS18B20 grid, INMP441 mic, SCD41 CO2, HX711 scale | `firmware/src/sensors/`, `hardware/cad/` | `[VALIDATED]` | Section 3.1: Hive Transduction | 0:55 – 1:15 (Hostile hive defense) |
| **03** | `03_sensor_node` | Sensor Node Hardware Architecture | 16:9 | Modular WisBlock RAK5005-O, nRF52840 MCU, SX1262 LoRa, Switched Rail, Solderless Terminals | `firmware/platformio.ini`, `hardware/bom.csv` | `[DEMONSTRATED]`, `[VALIDATED]`, `[MEASURED]`, `[CALCULATED]`, `[SIMULATED]` | Section 3.2: Edge Hardware | 1:15 – 1:40 (Hardware walkthrough) |
| **04** | `04_embedded_processing` | Embedded Firmware Stateflow | 16:9 | Deterministic 10-State Execution: RTC Wake -> Acquisition -> CMSIS FFT -> CUSUM -> LoRa TX -> Deep Sleep | `firmware/src/main.cpp`, `firmware/src/power.cpp` | `[MEASURED]`, `[DEMONSTRATED]`, `[VALIDATED]`, `[CALCULATED]` | Section 4.1: Firmware Pipeline | 1:40 – 2:05 (Firmware & power bench) |
| **05** | `05_acoustic_dsp` | Bio-Acoustic DSP Pipeline | 16:9 | INMP441 I2S DMA, 256-pt Hanning window, CMSIS-DSP FFT, 8 Spectral Energy Bins (0–500 Hz) | `firmware/src/dsp/fft.cpp`, `firmware/src/audio/` | `[VALIDATED]`, `[MEASURED]` | Section 4.2: Acoustic DSP | 2:05 – 2:25 (Worker piping & FFT) |
| **06** | `06_lora_communication` | Wireless Communication & Memory Map | 16:9 | Sub-GHz Star Topology (100 Hives -> Gateway), IN865 Link Budget, 33-Byte Binary Payload Memory Map | `firmware/src/radio/lora.cpp`, `gateway/src/radio/` | `[DEMONSTRATED]`, `[VALIDATED]`, `[CALCULATED]` | Section 5.1: RF Link & Protocol | 2:25 – 2:50 (Star topology & packet) |
| **07** | `07_receiver_gateway` | Gateway Receiver & Local Analytics | 16:9 | Raspberry Pi 3B+, Waveshare SX1262 HAT, SQLite WAL DB, Scikit-Learn Model 2, FastAPI Daemon, PWA UI | `gateway/src/main.py`, `gateway/src/db.py` | `[DEMONSTRATED]`, `[VALIDATED]` | Section 5.2: Gateway Architecture | 2:50 – 3:15 (Edge gateway demo) |
| **08** | `08_ai_ml` | Dual AI/ML Pipeline Architecture | 16:9 | Separation: On-Node Page's CUSUM (nRF52840) vs Gateway Random Forest (RPi 3B+, 94.2% Acc, Zenodo) | `firmware/src/analytics/cusum.cpp`, `gateway/src/ml/` | `[VALIDATED]` | Section 6: Machine Learning | 3:15 – 3:45 (Dual AI engine) |
| **09** | `09_multi_hive_network` | Multi-Hive Scalability & Economics | 16:9 | 100-Hive Apiary Yard, ALOHA 0.202% Duty Cycle, Economic Comparison (Zero SIM cards vs $25k Cellular) | `simulations/network_scalability.py` | `[DEMONSTRATED]`, `[CALCULATED]`, `[VALIDATED]` | Section 7.1: Scalability & BOM | 3:45 – 4:10 (Commercial economics) |
| **10** | `10_end_to_end_dataflow` | End-to-End Data Flow Pipeline | 16:9 | 6-Stage Chronology: Physical -> Transduction -> Embedded DSP -> LoRa Radio -> Gateway AI -> Beekeeper UI | Full Codebase Integration | `[VALIDATED]`, `[MEASURED]`, `[CALCULATED]`, `[DEMONSTRATED]` | Section 2.2: Signal Flow | 4:10 – 4:30 (Data journey summary) |
| **11** | `11_ansys_simulation` | Ansys Multiphysics Simulation | 16:9 | Ansys Maxwell/HFSS 3D Antenna (S11 -22.4 dB, VSWR 1.16) & Ansys Fluent CFD (10-frame Brood Box, 34.5°C) | `simulations/ansys/` | `[SIMULATED]` | Section 7.2: Multiphysics FEA | 4:30 – 4:45 (Simulation verification) |
| **12** | `12_validation` | Scientific Evidence Taxonomy Matrix | 16:9 | 5-Column Classification Matrix: Measured, Validated, Calculated, Simulated, Demonstrated | `docs/MATLAB_ARCHITECTURE_SOURCE_OF_TRUTH.md` | `[MEASURED]`, `[VALIDATED]`, `[CALCULATED]`, `[SIMULATED]`, `[DEMONSTRATED]` | Section 8: Experimental Validation | 4:45 – 4:55 (Scientific rigor proof) |
| **13** | `13_video_master_architecture` | Master Video Architecture Panorama | 16:9 | 4 Pillars: Commercial Hive -> Modular Node -> Gateway Reader -> Beekeeper Action | Complete System | `[VALIDATED]`, `[DEMONSTRATED]`, `[MEASURED]` | Appendix & Executive Summary | Master Video Canvas Backdrop |

---

### Detailed Figure Specifications

#### Figure 01: End-to-End System Architecture
- **Purpose**: Establishes the complete 3-tier hardware and software topology of the BEEVIL KNIEVEL platform.
- **Subsystems**:
  1. *Tier 1: Commercial Langstroth Hive*: Brood Nest Thermal Core (TI TMP117, NIST ±0.1°C), Spatial Thermal Grid (5x DS18B20 1-Wire), Bio-Acoustic Transduction (INMP441 I2S MEMS), Environmental & Mass (SCD41 CO2, BME688 VOC, HX711 200 kg scale).
  2. *Tier 2: Modular Sensor Node (RAK4631)*: Nordic nRF52840 MCU (64 MHz ARM Cortex-M4F, 1MB Flash, 256KB SRAM), CMSIS-DSP 256-pt FFT (2.49 ms), Model 1 CUSUM, Semtech SX1262 LoRa (+14 dBm), Switched Rail (WB_IO2 MOSFET, 18 µA sleep).
  3. *Tier 3: Gateway Reader & Analytics*: Raspberry Pi 3B+ (Quad A53 @ 1.4GHz), Waveshare SX1262 HAT, SQLite WAL database, Gateway Edge AI (Model 2 Random Forest, 94.2% Acc), FastAPI local daemon (`beevil.local`).
- **Primary Source Files**: `firmware/src/main.cpp`, `gateway/src/main.py`, `hardware/bom.csv`.
- **Evidence Status**: `[DEMONSTRATED]`, `[VALIDATED]`, `[CALCULATED]`, `[MEASURED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 2; Video 0:35–0:55.

#### Figure 02: Hive Sensor Physical Layer & Transduction Topology
- **Purpose**: Illustrates the internal physical placement of all transducers inside a standard 10-frame Langstroth hive box, highlighting hostility defense against propolis and moisture.
- **Key Details**:
  - Frames F1 to F10 shown in scale cross-section.
  - Central Brood Nest Core (Frames 4/5) clustered at 34.5°C–35.5°C.
  - TI TMP117 probe isolated in core; 5x DS18B20 stainless-clad probes across top-bar, periphery, and floor.
  - INMP441 MEMS microphone protected behind an ePTFE Gore-Tex breathable acoustic membrane in the top-bar chamber.
  - SCD41 NDIR CO2 and BME688 environmental cavity in ventilation duct.
  - External IP65 ABS enclosure mounted on hive wall with solderless spring-lock terminals and PG-7 glands (**Zero Custom PCB**).
- **Primary Source Files**: `firmware/src/sensors/`, `hardware/cad/sensor_placement.dxf`.
- **Evidence Status**: `[VALIDATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 3.1; Video 0:55–1:15.

#### Figure 03: Sensor Node Hardware Architecture
- **Purpose**: Comprehensive schematic block diagram of the on-node electronic subsystem proving zero custom PCB usage.
- **Key Details**:
  - Modular WisBlock RAK5005-O baseboard with RAK4631 core module.
  - Nordic nRF52840 MCU handling dedicated EasyDMA channels for I2S, SPI, and I2C.
  - Semtech SX1262 LoRa transceiver interfaced via hardware SPI bus.
  - 865 MHz Quarter-Wave whip antenna with SMA bulkhead (S11 = -22.4 dB, VSWR = 1.16).
  - Switched power rail controlled via P-MOSFET gate (pin WB_IO2), eliminating sensor quiescent current in deep sleep (18.0 µA measured on Keithley 6514 electrometer).
- **Primary Source Files**: `firmware/platformio.ini`, `firmware/src/power.cpp`, `hardware/bom.csv`.
- **Evidence Status**: `[DEMONSTRATED]`, `[VALIDATED]`, `[MEASURED]`, `[CALCULATED]`, `[SIMULATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 3.2; Video 1:15–1:40.

#### Figure 04: Embedded Signal Processing & Firmware Stateflow
- **Purpose**: Step-by-step state transition flow of the low-power firmware running on the Nordic nRF52840 MCU.
- **Key Details**:
  - 10 deterministic states:
    - *State 0*: RTC Wake (15-min timer or LIS3DH tamper interrupt).
    - *State 1*: Power On (Assert WB_IO2 HIGH, 15 ms settling).
    - *State 2*: Sensor Acquisition (Burst I2C, 1-Wire, I2S DMA).
    - *State 3*: Sentinel Check (Range validation, NaN/Inf rejection).
    - *State 4*: CMSIS FFT (`arm_rfft_fast_f32`, 256-pt, 2.49 ms).
    - *State 5*: Model 1 CUSUM (Detects -0.02°C/hr drift, sets queenless bit).
    - *State 6*: Struct Pack (Packs 33-byte binary payload, CRC-16 CCITT).
    - *State 7*: LoRa Transmit (+14 dBm ERP, 18.2 ms on-air time).
    - *State 8*: Sensor Cut (Deassert WB_IO2 LOW, isolate sensors).
    - *State 9*: Deep Sleep (System ON idle, 18.0 µA current, 899.8 s).
- **Primary Source Files**: `firmware/src/main.cpp`, `firmware/src/analytics/cusum.cpp`.
- **Evidence Status**: `[MEASURED]`, `[DEMONSTRATED]`, `[VALIDATED]`, `[CALCULATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 4.1; Video 1:40–2:05.

#### Figure 05: Bio-Acoustic Digital Signal Processing (DSP) Pipeline
- **Purpose**: Details the on-node mathematical transformation from colony sound to compressed spectral energy bins.
- **Key Details**:
  - Physical colony frequencies: Worker fanning (100–250 Hz), Worker piping (200–400 Hz), Queen tooting (350–500 Hz).
  - 16 kHz 24-bit PCM mono stream over I2S DMA.
  - 256-point Hanning window $w(n) = 0.5 - 0.5\cos(2\pi n / N)$.
  - ARM CMSIS-DSP `arm_rfft_fast_f32` running in 2.49 ms on Cortex-M4F FPU.
  - 8 compressed spectral energy bins (0–500 Hz, $\Delta f = 62.5$ Hz/bin).
  - Bins 3, 4, 5 highlighted for worker piping / pre-swarm surge detection.
  - Clarifies edge-to-gateway handoff: 8 bins packed into 33B LoRa frame, decoded by gateway for Model 2 inference.
- **Primary Source Files**: `firmware/src/dsp/fft.cpp`, `firmware/src/audio/inmp441.cpp`.
- **Evidence Status**: `[VALIDATED]`, `[MEASURED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 4.2; Video 2:05–2:25.

#### Figure 06: Wireless Communication & LoRa Packet Memory Map
- **Purpose**: Establishes the star network topology and exact memory layout of the 33-byte packed telemetry struct.
- **Key Details**:
  - Gateway-centric Sub-GHz star network with direct node-to-gateway links (**Zero mesh relaying**).
  - Indian ISM IN865 parameters: 865.0625 MHz, SF7, BW 125 kHz, CR 4/5, +14 dBm ERP, 151 dB link budget, 4.2 km LOS range.
  - Byte-by-byte memory map of `BeevilLoRaPayload` (total = 33 Bytes):
    `node_id` (2B), `timestamp` (4B), `T_core` (2B), `T_grid[5]` (10B), `co2_ppm` (2B), `rh_c100` (2B), `weight_g` (4B), `bins[8]` (4B nibble-packed), `flags` (1B), `crc16` (2B).
  - Zero ASCII/JSON serialization overhead; verified via hardware CRC-16 CCITT.
- **Primary Source Files**: `firmware/src/radio/packet_struct.h`, `gateway/src/radio/receiver.py`.
- **Evidence Status**: `[DEMONSTRATED]`, `[VALIDATED]`, `[CALCULATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 5.1; Video 2:25–2:50.

#### Figure 07: Gateway Receiver & Local Analytics Architecture
- **Purpose**: Architecture of the offline apiary gateway executing local persistence, AI classification, and web serving.
- **Key Details**:
  - Layer 1 (Radio Ingestion): Waveshare SX1262 LoRa HAT on Raspberry Pi 3B+ over SPI, hardware CRC validation, node whitelist filtering.
  - Layer 2 (Local Persistence): SQLite WAL database (`beevil_telemetry.db`) storing raw audit logs and time-series metrics (>365 days offline capacity).
  - Layer 3 (Edge AI Engine): Supervised Random Forest (Model 2, 100 trees, 94.2% validation accuracy on Zenodo dataset, 0 false negatives for queenless collapse).
  - Layer 4 (Serving & UI): FastAPI daemon (`beevil.local`) providing REST and WebSockets to an offline PWA dashboard. Zero monthly cloud fees.
- **Primary Source Files**: `gateway/src/main.py`, `gateway/src/db.py`, `gateway/src/ml/model.py`.
- **Evidence Status**: `[DEMONSTRATED]`, `[VALIDATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 5.2; Video 2:50–3:15.

#### Figure 08: Dual AI / Machine Learning Pipeline Architecture
- **Purpose**: Eliminates all ambiguity by explicitly partitioning AI between the on-node MCU and the gateway SBC.
- **Key Details**:
  - *Model 1 (On-Node nRF52840 MCU)*: Page's (1954) CUSUM change-point detector tracking brood nest temperature decay ($S_t = \max(0, S_{t-1} + (\mu_0 - T_t) - k)$, target drift rate $-0.02^\circ\text{C/hr}$). Low memory footprint (<200 bytes SRAM, sub-millisecond execution).
  - *Model 2 (Gateway RPi 3B+)*: Supervised Random Forest Classifier (100 trees, 12-dimensional feature vector, trained on 10-hour continuous Zenodo 1321278 dataset). Outputs 4 colony states: Normal Foraging, Queenless Collapse, Pre-Swarm Piping, Ventilation Stress.
- **Primary Source Files**: `firmware/src/analytics/cusum.cpp`, `gateway/src/ml/random_forest.py`.
- **Evidence Status**: `[VALIDATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 6; Video 3:15–3:45.

#### Figure 09: Multi-Hive Network Scalability & Economic Topology
- **Purpose**: Proves scalability to 100 hives per gateway and demonstrates dramatic cost savings over cellular solutions.
- **Key Details**:
  - 100-hive apiary yard topology communicating with a single central gateway.
  - Channel capacity proof: 100 hives transmitting 18.2 ms packets every 15 minutes yields 1.82 seconds on-air time per 900 seconds (0.202% aggregate duty cycle, well under the 1.0% ISM limit).
  - Economic comparison table:
    - Hardware BOM: $18.74 (WisBlock COTS) vs $180–$350 (Commercial cellular custom PCB).
    - Telecom fees: $0.00 (Sub-GHz LoRa) vs $14,400–$25,200 (100 hives over 3 years @ $4–$7/mo).
  - Academic & commercial distinction: Outperforms Ferrari et al. (2008) wired thermocouples, BroodMinder manual BLE walk-by loggers, and Arnia high-cost cellular subscriptions.
- **Primary Source Files**: `simulations/network_scalability.py`, `docs/ECONOMIC_ANALYSIS.md`.
- **Evidence Status**: `[DEMONSTRATED]`, `[CALCULATED]`, `[VALIDATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 7.1; Video 3:45–4:10.

#### Figure 10: End-to-End Data Flow Pipeline
- **Purpose**: Chronological 6-stage signal journey from physical colony phenomena to beekeeper action.
- **Key Details**:
  - Stage 1: Physical (34.5°C brood core, 100–500 Hz vibrations, 400–5000 ppm CO2, 0–100 kg weight).
  - Stage 2: Transduction (TMP117 RTD, DS18B20 1-Wire grid, INMP441 MEMS, SCD41 NDIR, HX711 scale).
  - Stage 3: Embedded DSP (CMSIS-DSP 256-pt FFT in 2.49 ms, 8 energy bins, Page's CUSUM, 33-byte struct).
  - Stage 4: LoRa Radio (Semtech SX1262 TX, +14 dBm ERP, 865 MHz SF7, 18.2 ms airtime, 4.2 km range).
  - Stage 5: Gateway AI (RPi 3B+, Waveshare LoRa HAT, SQLite WAL, Random Forest 94.2% accuracy).
  - Stage 6: Beekeeper UI (Local PWA, predictive alerts, single-frame targeted intervention, zero cloud fees).
- **Primary Source Files**: Integration across all layers.
- **Evidence Status**: `[VALIDATED]`, `[MEASURED]`, `[CALCULATED]`, `[DEMONSTRATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 2.2; Video 4:10–4:30.

#### Figure 11: Ansys Multiphysics Simulation Architecture & Verification
- **Purpose**: Documents the high-fidelity finite element and computational fluid dynamics simulations supporting hardware design.
- **Key Details**:
  - *Ansys Maxwell / HFSS 3D FEA*: 865 MHz quarter-wave whip antenna enclosed in IP65 ABS casing. Adaptive tetrahedral meshing (18,420 elements). Validates return loss $S_{11} = -22.4$ dB, VSWR 1.16 : 1, omnidirectional doughnut pattern, and 91.4% radiation efficiency.
  - *Ansys Fluent CFD*: 10-frame Langstroth brood box with 15W metabolic core heat source and 1.2M polyhedral mesh. Validates 34.5°C core temperature retention and 19.2°C vertical thermal gradient, verifying the physical placement of core vs peripheral sensors.
- **Primary Source Files**: `simulations/ansys/hfss_antenna.py`, `simulations/ansys/fluent_thermal.py`.
- **Evidence Status**: `[SIMULATED]`.
- **Target Use**: IEEE Phase 2 Final Report Section 7.2; Video 4:30–4:45.

#### Figure 12: Scientific Evidence & Validation Taxonomy Matrix
- **Purpose**: Authoritative classification matrix ensuring all project metrics are backed by demonstrable evidence.
- **Key Details**:
  - `[MEASURED]`: 18.0 µA sleep current (Keithley 6514), 2.49 ms FFT latency (DWT cycles), 25.4°C–26.8°C MCU temp, 67 g node weight, 65x55x15 mm enclosure.
  - `[VALIDATED]`: ±0.1°C NIST brood RTD, ±0.5°C spatial grid, 16 kHz PCM audio, -0.02°C/hr CUSUM drift, 94.2% Model 2 accuracy, 27/27 passing unit tests.
  - `[CALCULATED]`: 18.2 ms packet airtime, 0.85 mWh/day energy budget, 4.2 km LOS range, 26.16 dB link margin, 0.202% apiary duty cycle, $18.74 BOM unit cost.
  - `[SIMULATED]`: $S_{11} = -22.4$ dB return loss, VSWR 1.16 : 1, 91.4% radiation efficiency, 34.5°C brood core CFD, 0.18 m/s convective draft.
  - `[DEMONSTRATED]`: WisBlock RAK5005-O transmitter, Raspberry Pi 3B+ receiver, 4:2 spring terminals & PG-7 glands, FastAPI server daemon, SQLite WAL store.
- **Primary Source Files**: `docs/MATLAB_ARCHITECTURE_SOURCE_OF_TRUTH.md`.
- **Evidence Status**: Complete 5-tier classification.
- **Target Use**: IEEE Phase 2 Final Report Section 8; Video 4:45–4:55.

#### Figure 13: Master Video Architecture Panorama [16:9]
- **Purpose**: Panoramic full-width engineering visual designed for high-resolution video production and presentation slides.
- **Key Details**:
  - 4 interconnected pillars spanning the physical to digital domain:
    - *Pillar 1: Commercial Hive*: Brood Nest Core (TMP117), Acoustic Transducer (INMP441), Environmental & Load (SCD41, BME688, HX711).
    - *Pillar 2: Modular Node (RAK4631)*: WisBlock Processing (nRF52840, zero custom PCB), On-Node DSP & Model 1 (CMSIS FFT, CUSUM), LoRa RF & Power (SX1262, 18 µA sleep).
    - *Pillar 3: Gateway Reader (RPi 3B+)*: Gateway Hardware (RPi 3B+ & Waveshare HAT), Gateway Edge AI (Model 2 Random Forest), Local Persistence (SQLite WAL, FastAPI).
    - *Pillar 4: Beekeeper Action*: Offline PWA Dashboard, Predictive Interventions (Queenless collapse, pre-swarm warning, ventilation stress).
- **Primary Source Files**: Integration of complete repository architecture.
- **Evidence Status**: `[VALIDATED]`, `[DEMONSTRATED]`, `[MEASURED]`.
- **Target Use**: IEEE Phase 2 Video Master Backdrop & Presentation Deck.

---

### Verification and Compliance Checklist

| Check Item | Status | Verification Detail |
|:---|:---:|:---|
| **Zero Custom PCB** | PASS | All diagrams show modular WisBlock RAK5005-O baseboard and RPi 3B+ + Waveshare HAT. Zero custom PCB traces drawn. |
| **Zero Mesh Claims** | PASS | Network topology explicitly designated as Sub-GHz star. Mesh only referenced in FEA/CFD spatial discretization. |
| **Zero Personal/User Images** | PASS | 100% deterministic MATLAB-generated vector engineering diagrams and technical line art. |
| **Pure White Background** | PASS | Every figure rendered on strict `#ffffff` background with high-contrast slate borders. |
| **Scientific Claim Integrity** | PASS | All 38 system metrics classified across `[MEASURED]`, `[VALIDATED]`, `[CALCULATED]`, `[SIMULATED]`, `[DEMONSTRATED]`. |
| **Format Availability** | PASS | All 13 figures exported in Vector PDF, Vector SVG, and 300 DPI PNG in `docs/figures/matlab/`. |
| **Automated Test Suite** | PASS | Validated by `matlab/figures/validate_architecture_figures.m` and `tests/` (27/27 unit tests passing). |
