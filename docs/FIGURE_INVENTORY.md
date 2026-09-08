# BEEVIL KNIEVEL — MASTER FIGURE INVENTORY

**Standard:** IEEE Peer-Reviewed Publication & Design Review Quality  
**Requirement:** Section 17 and Section 30 of Master Production Loop  

Every engineering figure in the repository must answer a clear, distinct engineering question, be backed by an immutable source of truth, utilize a deterministic renderer, and possess a validated claim status.

---

## Figure Catalog

### Figure 00: Full-System Hero Architecture
- **Figure ID:** `FIG-00`
- **Path:** `docs/media/diagrams/00_system_hero_architecture.svg`
- **Title:** Comprehensive Cyber-Physical Architecture & Telemetry Pipeline
- **Primary Question:** "How do the hive transducers, edge MCU, Sub-GHz radio link, edge gateway, and field consoles interconnect end-to-end?"
- **Engineering Content:** Complete 4-tier flow from Langstroth frame transducers, through RAK4631 edge MCU, across IN865 LoRa link, into Raspberry Pi 3B+ gateway, out to zero-latency field displays.
- **Source of Truth:** `hardware/BOM_AND_PINOUT.md`, `.spec/Architecture.md`
- **Renderer:** Deterministic Python Vector SVG (`scripts/generate_publication_diagrams.py`)
- **Status:** `VALIDATED` (Hardware built, pinouts bench-tested, gateway software live)

---

### Figure 01: Problem Context & Observability Gap
- **Figure ID:** `FIG-01`
- **Path:** `docs/media/diagrams/01_problem_and_observation.svg`
- **Title:** Observability Gap: Destructive Manual Inspection vs Continuous In-Hive Telemetry
- **Primary Question:** "Why is traditional manual hive inspection inadequate, and how does non-invasive continuous telemetry prevent colony collapse?"
- **Engineering Content:** Side-by-side comparison of manual inspection (thermal shock to $34.5^\circ\text{C}$ brood nest, propolis seal destruction, 14-day delay) versus continuous edge telemetry (5-min cadence, $f_s = 2000\text{ Hz}$ acoustics, zero disruption).
- **Source of Truth:** `.spec/PRD.md`, USDA-ARS Apiculture Field Reports
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Calibrated against biological heat-loss literature)

---

### Figure 02A: Instrumented Langstroth Hive Transducer Cutaway
- **Figure ID:** `FIG-02A`
- **Path:** `docs/media/diagrams/02_langstroth_sensor_cutaway.svg`
- **Title:** Technical Transducer Cutaway of 10-Frame Langstroth Hive Body
- **Primary Question:** "Where are each of the environmental, thermal, acoustic, and mass sensors physically installed within the hive body?"
- **Engineering Content:** Dimensioned cross-section of deep brood chamber, honey super, inner cover, and bottom board showing TMP117 (Frame 3 center), 5x DS18B20 (Frames 1-5), INMP441 (comb center), SCD41/BME688 (inner cover), HX711 (bottom board), and IP68 PG-7 pass-throughs.
- **Source of Truth:** `hardware/BOM_AND_PINOUT.md`, Langstroth standard mechanical dimensions
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Built in physical Langstroth hive prototype)

---

### Figure 02B: Multi-Point Spatial Sensor Placement Topology
- **Figure ID:** `FIG-02B`
- **Path:** `docs/media/diagrams/02_sensor_placement.svg`
- **Title:** 5-Point Brood Thermal Gradient & Multi-Bus Sensor Layout
- **Primary Question:** "How do the 1-Wire, I2C, and I2S sensor buses distribute across the lateral comb frames?"
- **Engineering Content:** Top-down comb layout showing lateral thermal dissipation profiles across frames 1 through 5, differential temperature sensing, and bus routing to the external node.
- **Source of Truth:** `firmware/config/sensor_config.h`, `hardware/BOM_AND_PINOUT.md`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Bench-verified I2C/1-Wire multi-drop addresses)

---

### Figure 03A: Bio-Acoustic Transduction & Spectral Mapping
- **Figure ID:** `FIG-03A`
- **Path:** `docs/media/diagrams/03_acoustic_transduction_schematic.svg`
- **Title:** Comb Acoustic Transduction Mechanics & Biological Frequency Signatures
- **Primary Question:** "How does comb acoustic vibration translate into electrical signals, and where do key bee behaviors lie in the frequency spectrum?"
- **Engineering Content:** Wax comb acoustic resonance model, INMP441 MEMS diaphragm capacitive sensing, 24-bit I2S digital output, and frequency band mapping (Queen Piping: 350-450 Hz, Swarm Warble: 220-280 Hz, Foraging Hum: 180-250 Hz, Normal Colony: 100-180 Hz).
- **Source of Truth:** Zenodo Acoustic Dataset #1321278, `simulation/models/acoustic_simulator.py`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Acoustic dataset verified, FFT resolution bench-tested)

---

### Figure 03B: Bio-Acoustic Edge DSP Processing Pipeline
- **Figure ID:** `FIG-03B`
- **Path:** `docs/media/diagrams/03_acoustic_pipeline.svg`
- **Title:** CMSIS-DSP 256-Point Real FFT On-Node Processing Pipeline
- **Primary Question:** "How does the edge MCU process raw audio into a compact 8-band acoustic feature vector within the 32-byte LoRa payload?"
- **Engineering Content:** 2000 Hz I2S acquisition -> Double Buffering -> Hann Windowing -> CMSIS-DSP 256-pt Real FFT ($\Delta f = 7.81\text{ Hz}$) -> Sub-Band Energy Integrals -> 8-Byte Normalized Feature Vector.
- **Source of Truth:** `firmware/config/algorithm_config.h`, `simulation/models/fft_validation.py`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Runs on nRF52840 MCU in 1.84 ms per window)

---

### Figure 04A: Field Node IP67 Enclosure Mechanical Schematic
- **Figure ID:** `FIG-04A`
- **Path:** `docs/media/diagrams/04_field_node_enclosure_schematic.svg`
- **Title:** Weatherproof IP67 Field Enclosure & Solar Power Subsystem
- **Primary Question:** "How is the electronics enclosure engineered to withstand apiary weather conditions and sustain year-round autonomous power?"
- **Engineering Content:** ASA 3D-printed enclosure with silicone gasket seal, PG-7 cable glands, internal RAK19007 baseboard mounting, 18650 Li-Ion cradle, 134N3P solar step-up charger, and 6V monocrystalline panel.
- **Source of Truth:** `hardware/enclosure/hive_node_enclosure.scad`, `hardware/enclosure/3D_PRINTING_GUIDE.md`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (OpenSCAD 3D design source verified, printed and fit-tested)

---

### Figure 04B: Field Node Electrical Architecture & Pinout
- **Figure ID:** `FIG-04B`
- **Path:** `docs/media/diagrams/04_field_node_architecture.svg`
- **Title:** Transmitter Field Node Electrical Schematic & Bus Interconnects
- **Primary Question:** "What are the exact electrical pin connections, bus assignments, and power rails on the RAK4631 WisBlock node?"
- **Engineering Content:** RAK4631 nRF52840 MCU pinout, I2C bus (SCL: P0.14, SDA: P0.13), I2S bus (SCK: P0.03, WS: P0.04, SD: P0.28), 1-Wire bus (Data: P0.17 + 4.7k pullup), LIS3DH, SX1262 LoRa RF, and 3.3V/VBAT rails.
- **Source of Truth:** `hardware/BOM_AND_PINOUT.md`, `firmware/config/hardware_config.h`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Exact pin mapping matches compiled firmware)

---

### Figure 05: Sub-GHz LoRa Mesh & RF Propagation
- **Figure ID:** `FIG-05`
- **Path:** `docs/media/diagrams/05_lora_mesh.svg`
- **Title:** IN865 Sub-GHz LoRa Propagation & Star/Mesh Network Topology
- **Primary Question:** "How do 100 field nodes reliably communicate with the gateway over extended orchard canopy distances?"
- **Engineering Content:** Star baseline topology (+14 dBm, SF7, 865.0625 MHz), multi-hop relay protocol fallback, Fresnel zone clearance, foliage absorption modeling (0.08 dB/m), and link budget margin (+21.4 dB).
- **Source of Truth:** `firmware/config/radio_config.h`, `simulation/models/rf_propagation.py`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Simulation verified, SX1262 registers bench-programmed)

---

### Figure 06: Linux Edge Gateway Architecture
- **Figure ID:** `FIG-06`
- **Path:** `docs/media/diagrams/06_gateway_architecture.svg`
- **Title:** Edge Harbor Gateway Hardware & Software Ingestion Architecture
- **Primary Question:** "How does the Raspberry Pi edge gateway receive, unpack, store, and serve hive telemetry locally?"
- **Engineering Content:** Waveshare SX1262 LoRa HAT SPI interface, 32-byte payload binary unpacker, SQLite WAL database, Page's CUSUM anomaly engine, Nginx reverse proxy, and FastAPI REST endpoints.
- **Source of Truth:** `gateway/server.py`, `gateway/lora_receiver.py`, `gateway/setup_gateway.sh`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Full pytest suite passing 100%)

---

### Figure 07: Edge Analytics & Anomaly Detection Pipeline
- **Figure ID:** `FIG-07`
- **Path:** `docs/media/diagrams/07_edge_analytics.svg`
- **Title:** Multi-Modal Edge Analytics, CUSUM & Phenotypic Forecasting
- **Primary Question:** "How does the platform detect hive collapse events in real-time and predict colony health trajectories?"
- **Engineering Content:** Multi-sensor input streams, Savitzky-Golay noise filtering, Page's CUSUM statistic ($S_n = \max(0, S_{n-1} + (x_n - \mu_0) - k)$), HoneyChain cryptographic audit ledger, and automated beekeeper Telegram alerts.
- **Source of Truth:** `gateway/cusum_analytics.py`, `gateway/phenotypic_forecaster.py`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED` (Validated against 100-hive simulated and benchmark datasets)

---

### Figure 08: Full Cyber-Physical System Flow
- **Figure ID:** `FIG-08`
- **Path:** `docs/media/diagrams/08_full_cyber_physical_architecture.svg`
- **Title:** End-to-End Cyber-Physical Interaction & Field Decision Loop
- **Primary Question:** "What is the complete loop from physical honeybee biological phenomenon to actionable beekeeper management decision?"
- **Engineering Content:** Biological hive state -> Sensor physical transduction -> Edge MCU DSP -> Sub-GHz LoRa transmission -> Gateway ingestion & CUSUM detection -> Local/Cloud dashboards -> Beekeeper non-invasive intervention.
- **Source of Truth:** `.spec/Architecture.md`, `README.md`
- **Renderer:** Deterministic Python Vector SVG
- **Status:** `VALIDATED`
