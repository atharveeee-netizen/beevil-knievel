# 📑 Master Media Index & Visual Evidence Directory

This index catalogs every visual asset, architectural vector diagram, real photographic reference, and application screenshot within `docs/media/`, cross-referencing its location in `README.md`.

---

## 🗃️ Visual Assets Master Directory

| Asset File Path | Media Type | Source Provenance | Technical Purpose in BEEVIL KNIEVEL | Section in `README.md` | Verification Status |
| :--- | :---: | :--- | :--- | :---: | :---: |
| **`01-hero/beevil_knievel_hero.png`** | Image (PNG) | Project Generated (`generate_image`) | Visual identity: Industrial design visualization of the sensorized hive node, solar trickle mount, and Raspberry Pi 3B+ base station. | Header Hero | **GENERATED CONCEPT VISUAL** |
| **`02-apiary-problem/real_commercial_apiary.jpg`** | Photo (JPG) | USDA NRCS (Public Domain) | Real-world problem context: Multi-hive commercial apiary arrangement in Montana out-yard. | `01 \| THE PROBLEM` | 🟢 **VALIDATED REAL CONTEXT** |
| **`02-apiary-problem/hive_monitoring_problem.svg`** | Vector (SVG) | Original Engineering Diagram | Explains the friction of manual inspection vs continuous non-invasive telemetry. | `01 \| THE PROBLEM` | 🟢 **ORIGINAL DIAGRAM** |
| **`03-acoustic-problem/bee_acoustic_signals.svg`** | Vector (SVG) | Original Engineering Diagram | Visualizes biological frequency bands (180-240Hz worker hum, 285-350Hz queenless roar, 380-500Hz piping). | `06 \| ACOUSTIC DSP` | 🟢 **ORIGINAL DIAGRAM** |
| **`03-acoustic-problem/acoustic_research_context.svg`** | Vector (SVG) | Original Engineering Diagram | Explains the 4-stage bio-acoustic classification pipeline grounded in the Zenodo 1321278 benchmark. | `03 \| WHY THESE SIGNALS` | 🟢 **ORIGINAL DIAGRAM** |
| **`04-system/system_architecture.svg`** | Vector (SVG) | Original Engineering Diagram | Complete cyber-physical architecture: Field nodes → LoRa mesh → Raspberry Pi 3B+ gateway → daemons → frontend. | `04 \| THE BEEVIL SYSTEM` | 🟢 **ORIGINAL DIAGRAM** |
| **`04-system/hive_to_dashboard_flow.svg`** | Vector (SVG) | Original Engineering Diagram | "From Hive to Dashboard": 6-stage telemetry journey from hive transducers to mobile alerts. | `04 \| THE BEEVIL SYSTEM` | 🟢 **ORIGINAL DIAGRAM** |
| **`04-system/telemetry_packet_flow.svg`** | Vector (SVG) | Original Engineering Diagram | Strict 32-byte packed binary struct wire protocol bitfield and byte offset layout. | `04 \| THE BEEVIL SYSTEM` | 🟢 **ORIGINAL DIAGRAM** |
| **`05-hardware/field_node_architecture.svg`** | Vector (SVG) | Original Engineering Diagram | RAK4631 / Nordic nRF52840 MCU pin mapping and multi-drop sensor interconnect buses. | `05 \| FIELD NODE` | 🟢 **ORIGINAL DIAGRAM** |
| **`05-hardware/power_architecture.svg`** | Vector (SVG) | Original Engineering Diagram | 3-phase deterministic duty cycle timeline and modeled solar harvesting equilibrium ($19.54\text{ min/day}$). | `05 \| FIELD NODE` | 🟢 **ORIGINAL DIAGRAM** |
| **`06-dsp/acoustic_dsp_pipeline.svg`** | Vector (SVG) | Original Engineering Diagram | CMSIS-DSP 256-point real FFT pipeline ($\Delta f = 7.8125\text{ Hz/bin}$) on ARM Cortex-M4F FPU. | `06 \| ACOUSTIC DSP` | 🟢 **ORIGINAL DIAGRAM** |
| **`07-radio/rf_link_budget.svg`** | Vector (SVG) | Original Engineering Diagram | Calculated Sub-GHz link budget waterfall showing Friis path loss and $+31.28\text{ dB}$ fade margin. | `07 \| RADIO / MESH` | 🟢 **ORIGINAL DIAGRAM** |
| **`07-radio/mesh_topology.svg`** | Vector (SVG) | Original Engineering Diagram | BeevilMesh multi-hop dynamic TTL routing and deduplication across target 100-hive scale. | `07 \| RADIO / MESH` | 🟢 **ORIGINAL DIAGRAM** |
| **`08-edge-ai/edge_ai_pipeline.svg`** | Vector (SVG) | Original Engineering Diagram | Two-tier hierarchical intelligence: On-node deterministic triage → Raspberry Pi 3B+ multi-modal neural fusion. | `08 \| EDGE INTELLIGENCE` | 🟢 **ORIGINAL DIAGRAM** |
| **`10-dashboard/dashboard_overview.png`** | Screenshot | Live GitHub Pages Portal | Actual capture of the live web portal showing system specifications and telemetry. | `13 \| WEB + MOBILE` | 🔵 **ACTUAL IMPLEMENTATION** |
| **`10-dashboard/mobile_field_console.png`** | Screenshot | Live GitHub Pages `/app` | Actual capture of the HiveOS mobile field console with 100-hive matrix and 5-frame thermal array. | `13 \| WEB + MOBILE` | 🔵 **ACTUAL IMPLEMENTATION** |
| **`10-dashboard/playdate_console.png`** | Screenshot | Live GitHub Pages `/playdate` | Actual capture of the interactive Playdate console emulator with crank and Web Audio synthesis. | `13 \| WEB + MOBILE` | 🔵 **ACTUAL IMPLEMENTATION** |
| **`10-dashboard/dashboard_hive_detail.png`** | Screenshot | Live GitHub Pages `/app` | Actual capture of deep telemetry metrics, acoustic frequency presets, and CUSUM status. | `13 \| WEB + MOBILE` | 🔵 **ACTUAL IMPLEMENTATION** |
| **`11-evidence/provenance_chain.svg`** | Vector (SVG) | Original Engineering Diagram | SHA-256 Merkle tree verification proving honey harvest authenticity against sugar syrup adulteration. | `10 \| PROVENANCE` | 🟢 **ORIGINAL DIAGRAM** |
| **`11-evidence/cusum_detection.svg`** | Vector (SVG) | Original Engineering Diagram | Cumulative sum change-point curve demonstrating 72-hour early warning before brood death. | `12 \| RESULTS` | 🟢 **ORIGINAL DIAGRAM** |
| **`research/brood/real_brood_nest_slice.jpg`** | Photo (JPG) | Wikimedia (CC BY 4.0) | Cross-section of honey bee brood nest illustrating core pupal cells and thermal insulation boundary. | `02 \| WHAT WE MONITOR` | 🟢 **VALIDATED REAL CONTEXT** |
| **`research/brood/real_capped_worker_brood.jpg`** | Photo (JPG) | Wikimedia (CC BY 4.0) | Close-up of capped worker brood cells requiring strict $34.8^\circ\text{C}$ homeostatic incubation. | `03 \| WHY THESE SIGNALS` | 🟢 **VALIDATED REAL CONTEXT** |
| **`research/apiary/usda_beekeeper_inspection.jpg`** | Photo (JPG) | USDA (Public Domain) | USDA beekeeper conducting manual frame-by-frame colony inspection in full protective gear. | `01 \| THE PROBLEM` | 🟢 **VALIDATED REAL CONTEXT** |
| **`research/screenshots/zenodo_dataset_reference.png`** | Screenshot | Zenodo Open Repository | Official landing page of Zenodo Record 1321278 (NU-Hive acoustic benchmark). | `06 \| ACOUSTIC DSP` | 🟣 **EXTERNAL REFERENCE** |
| **`research/screenshots/nordic_nrf52840_datasheet_reference.png`** | Screenshot | Nordic Semiconductor | Official product page for the Nordic nRF52840 multiprotocol system-on-chip. | `05 \| FIELD NODE` | 🟠 **EXTERNAL REFERENCE** |
