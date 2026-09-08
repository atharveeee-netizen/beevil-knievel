# 📐 BEEVIL KNIEVEL - FIGURE MANIFEST & VISUAL DIRECTORY

**Standard:** Zero-Slop Publication-Grade Engineering Figures  
**Format:** Deterministic SVG (Vector) & Calibrated Numerical Exports  
**Design Contract:** `.spec/FigureStyle.md`  

---

## 📋 Manifest Overview

Every README-facing figure is defined below. All architectural, schematic, and topology diagrams are generated deterministically via python script (`scripts/generate_publication_diagrams.py`) to guarantee 100% reproducibility, zero text overlap, and zero hallucinated geometry.

---

### FIGURE 00: SYSTEM HERO ARCHITECTURE (Publication Headline)
- **Path**: `docs/media/diagrams/00_system_hero_architecture.svg`
- **Format**: Deterministic SVG (1080 x 540)
- **Purpose**: Serve as the authoritative, publication-quality technical hero graphic replacing all decorative AI illustrations.
- **Audience**: Systems engineers, research peer reviewers, competition evaluators.
- **Required Components**: 
  - Tier 1: Instrumented 10-frame Langstroth hive node with RAK4631 (nRF52840 + SX1262), 5x TMP117/DS18B20 thermal probes, INMP441 I2S MEMS, SCD41 NDIR CO2.
  - Tier 2: IN865 Sub-GHz foliage-penetrating LoRa mesh link (+14 dBm, 865-867 MHz).
  - Tier 3: Edge Harbor Gateway (Raspberry Pi 3B+ BCM2837B0 + Waveshare SX1262 HAT, SQLite WAL, Page CUSUM, HoneyChain SHA-256).
  - Tier 4: Zero-latency local field consoles (Playdate 1-bit, PWA mobile, Web dashboard).
- **Excluded**: Any marketing artwork, floating holograms, glowing brains, or ungrounded decorative circuit traces.
- **Source of Truth**: `.spec/Architecture.md`, `hardware/BOM_AND_PINOUT.md`.

---

### FIGURE 01: OBSERVABILITY GAP & MANUAL INSPECTION PARADIGM
- **Path**: `docs/media/diagrams/01_problem_and_observation.svg`
- **Format**: Deterministic SVG (1080 x 550)
- **Purpose**: Contrast destructive bi-weekly manual inspection against continuous, non-invasive edge telemetry.
- **Audience**: Beekeepers, entomologists, agricultural evaluators.
- **Required Components**:
  - Manual Inspection Breakdown: Hive opening, propolis envelope destruction, $34.5^\circ\text{C}$ brood chill, queen stress, 14-day diagnostic latency.
  - Non-Invasive Continuous Telemetry: Hermetic pass-through, continuous $f_s = 2000\text{ Hz}$ acoustic streaming, real-time thermal gradient, 5-minute telemetry cadence.
- **Source of Truth**: `.spec/PRD.md`, `docs/references/APICULTURE_SOURCES.md`.

---

### FIGURE 02A: INSTRUMENTED LANGSTROTH SENSOR CUTAWAY
- **Path**: `docs/media/diagrams/02_langstroth_sensor_cutaway.svg`
- **Format**: Deterministic SVG (1080 x 560)
- **Purpose**: Technical, dimensioned architectural cutaway of the 10-frame Langstroth hive body illustrating exact sensor transducer placement.
- **Audience**: Mechanical engineers, field technicians, hardware designers.
- **Required Components**:
  - Deep Brood Chamber (Brood Nest Frames 1-5).
  - Honey Super & Inner/Outer Cover with IP68 PG-7 cable glands.
  - TI TMP117 NIST-traceable sensor at Brood Center (Frame 3, $\pm 0.1^\circ\text{C}$).
  - 5x Maxim DS18B20 digital probes across lateral frames 1 to 5.
  - InvenSense INMP441 I2S MEMS microphone suspended centrally in comb acoustic cavity.
  - Sensirion SCD41 photoacoustic NDIR CO2 and Bosch BME688 MOX gas sensors at upper ventilation zone.
  - Screened bottom board with dual-shear beam load cell platform.
  - External RAK4631 telemetry enclosure with 6V monocrystalline solar panel.
- **Excluded**: Hallucinated English phrases ("conlomon", "lin the hive"), fictional electret mics.
- **Source of Truth**: `hardware/BOM_AND_PINOUT.md`, `.spec/TechSpec.md`.

---

### FIGURE 02B: MULTI-MODAL SENSOR PLACEMENT & PHYSICAL TOPOLOGY
- **Path**: `docs/media/diagrams/02_sensor_placement.svg`
- **Format**: Deterministic SVG (1080 x 560)
- **Purpose**: Schematic routing and coordinate layout of physical sensors within the hive coordinate space.
- **Audience**: Firmware engineers, sensor integration specialists.
- **Required Components**: Frame-by-frame thermal gradient coordinates, acoustic pickup zone, gas dispersion dynamics, bus routing (I2C, I2S, 1-Wire).
- **Source of Truth**: `hardware/BOM_AND_PINOUT.md`.

---

### FIGURE 03A: BIO-ACOUSTIC TRANSDUCTION & CAVITY IMPEDANCE SCHEMATIC
- **Path**: `docs/media/diagrams/03_acoustic_transduction_schematic.svg`
- **Format**: Deterministic SVG (1080 x 540)
- **Purpose**: Document physical transduction of bee airborne acoustic pressure and comb vibrations into 24-bit digital PCM audio.
- **Audience**: Audio DSP engineers, bio-acoustic researchers.
- **Required Components**:
  - Acoustic Cavity: Propolis-free acoustic chamber between brood frames ($d = 9.5\text{ mm}$ bee space).
  - Transducer: InvenSense INMP441 silicon diaphragm with acoustic mesh filter.
  - I2S Digital Audio Bus: SCK (Bit Clock), WS (Word Select), SD (Serial Data).
  - Sampling Parameters: $f_s = 2000\text{ Hz}$, 24-bit resolution, Nyquist bandwidth $1000\text{ Hz}$.
  - CMSIS-DSP Transform: 256-point complex FFT ($\Delta f = 7.8125\text{ Hz}$) and biological sub-band extraction.
- **Excluded**: Duplicated identical plots, generic microphone illustrations, unreadable labels.
- **Source of Truth**: `.spec/TechSpec.md`, `simulation/matlab/acoustic_dsp_pipeline.m`.

---

### FIGURE 03B: ACOUSTIC DSP ON-DEVICE FFT PIPELINE
- **Path**: `docs/media/diagrams/03_acoustic_pipeline.svg`
- **Format**: Deterministic SVG (1080 x 540)
- **Purpose**: Step-by-step CMSIS-DSP transformation from raw PCM audio to 4-band spectral energy vectors.
- **Audience**: Embedded DSP engineers, firmware developers.
- **Required Components**: Double buffer ping-pong DMA, Hanning windowing, `arm_cfft_f32`, sub-band energy accumulation, 8-byte feature vector.
- **Source of Truth**: `firmware/src/dsp/`, `docs/references/ACOUSTIC_RESEARCH.md`.

---

### FIGURE 04A: FIELD NODE RUGGED ENCLOSURE & MECHANICAL LAYOUT
- **Path**: `docs/media/diagrams/04_field_node_enclosure_schematic.svg`
- **Format**: Deterministic SVG (1080 x 540)
- **Purpose**: Dimensioned mechanical CAD layout and ingress protection specification of the field node enclosure.
- **Audience**: Mechanical engineers, manufacturing technicians.
- **Required Components**:
  - Polycarbonate IP67 weather-sealed enclosure ($120 \times 80 \times 40\text{ mm}$) with silicone continuous gasket.
  - Internal mounting tray: RAK5005-O baseboard with RAK4631 LPWAN module.
  - Power: 3.7V 2000 mAh LiFePO4 cell with JST-PH connector + 134N3P / MPPT solar charge controller.
  - Cable Glands: 2x PG-7 nylon IP68 cable glands for frame sensor harnesses.
  - RF Interface: IPEX to RP-SMA bulkhead connector with tuned 865-868 MHz 1.8 dBi antenna.
  - Hive Mounting: Stainless steel 304 mounting bracket with vibration isolation pads.
- **Excluded**: Hallucinated logos ("HONEYCOMB LOGO"), fake part numbers ("nRPS2BA0").
- **Source of Truth**: `hardware/BOM_AND_PINOUT.md`, `hardware/enclosure/`.

---

### FIGURE 04B: FIELD NODE EMBEDDED HARDWARE ARCHITECTURE
- **Path**: `docs/media/diagrams/04_field_node_architecture.svg`
- **Format**: Deterministic SVG (1080 x 560)
- **Purpose**: Complete electronic block diagram and bus topology of the nRF52840 + SX1262 field node.
- **Audience**: Hardware engineers, embedded firmware developers.
- **Required Components**: nRF52840 MCU, SX1262 LoRa transceiver, I2C bus (TMP117, SCD41, BME688, LIS3DH, HX711), I2S bus (INMP441), 1-Wire bus (5x DS18B20), power management MOSFET rail gate.
- **Source of Truth**: `hardware/BOM_AND_PINOUT.md`.

---

### FIGURE 05: SUB-GHz LoRa MESH & FOREST CANOPY TOPOLOGY
- **Path**: `docs/media/diagrams/05_lora_mesh.svg`
- **Format**: Deterministic SVG (1080 x 540)
- **Purpose**: RF propagation and multi-hop mesh network topology across dense commercial apiary terrain.
- **Audience**: RF engineers, network architects.
- **Required Components**: IN865 band (865-867 MHz), SF7-SF12 adaptive data rate, 1.5 km canopy penetration, relay node routing, packet collision avoidance.
- **Source of Truth**: `.spec/TechSpec.md`, `simulation/matlab/rf_link_budget_and_range.m`.

---

### FIGURE 06: EDGE HARBOR GATEWAY ARCHITECTURE
- **Path**: `docs/media/diagrams/06_gateway_architecture.svg`
- **Format**: Deterministic SVG (1080 x 540)
- **Purpose**: Linux software architecture of the Raspberry Pi 3B+ edge receiver gateway.
- **Audience**: Systems software engineers, backend developers.
- **Required Components**: Waveshare SX1262 LoRa HAT (SPI), OverlayFS read-only root, Ingest daemon, Page CUSUM detector, HoneyChain SHA-256 ledger, SQLite (WAL mode), FastAPI / WebSocket server.
- **Source of Truth**: `gateway/`, `.spec/Architecture.md`.

---

### FIGURE 07: EDGE ANALYTICS & CUSUM DETECTION PIPELINE
- **Path**: `docs/media/diagrams/07_edge_analytics.svg`
- **Format**: Deterministic SVG (1080 x 540)
- **Purpose**: Algorithmic pipeline executing Page (1954) CUSUM sequential test and 1D-CNN micro-model.
- **Audience**: ML engineers, data scientists.
- **Required Components**: Ingested telemetry stream, running mean and standard deviation estimator, cumulative upper/lower score accumulators, alert generation thresholds, HoneyChain cryptographically secured event logging.
- **Source of Truth**: `simulation/matlab/cusum_anomaly_detection.m`, `gateway/src/analysis/`.

---

### FIGURE 08: 3-TIER CYBER-PHYSICAL SYSTEM ARCHITECTURE
- **Path**: `docs/media/diagrams/08_full_cyber_physical_architecture.svg`
- **Format**: Deterministic SVG (1080 x 540)
- **Purpose**: Comprehensive end-to-end cyber-physical architecture from physical hive transducers to field console user interfaces.
- **Audience**: General engineering evaluators, lead architects.
- **Required Components**: Tier 1 Physical Transduction, Tier 2 Sub-GHz LoRa Mesh, Tier 3 Linux Harbor Gateway, Tier 4 Operations & Field Consoles.
- **Source of Truth**: `.spec/Architecture.md`.
