# 📑 Master Media Index & Visual Evidence Directory

This index catalogs every visual asset, architectural vector diagram, real photographic reference, simulation export, and application screenshot within `docs/media/`, cross-referencing its location in `README.md`.

---

## 🗃️ Visual Assets Master Directory

| Asset File Path | Media Type | Source Provenance | Technical Purpose in BEEVIL KNIEVEL | Section in `README.md` | Verification Status |
| :--- | :---: | :--- | :--- | :---: | :---: |
| **`diagrams/00_system_hero_architecture.svg`** | Vector (SVG) | Deterministic Python Generator | Master system overview across physical transduction, edge DSP, Sub-GHz mesh, and edge gateway. | Header Hero | 🟢 **PUBLICATION FIGURE** |
| **`02-apiary-problem/real_commercial_apiary.jpg`** | Photo (JPG) | USDA NRCS (Public Domain) | Real-world problem context: Multi-hive commercial apiary arrangement in Montana out-yard. | `01 \| THE PROBLEM` | 🟢 **VALIDATED REAL CONTEXT** |
| **`diagrams/01_problem_and_observation.svg`** | Vector (SVG) | Deterministic Python Generator | Explains the friction of manual inspection vs continuous non-invasive telemetry. | `01 \| THE PROBLEM` | 🟢 **PUBLICATION FIGURE** |
| **`diagrams/02_langstroth_sensor_cutaway.svg`** | Vector (SVG) | Deterministic Python Generator | Dimensioned 10-frame Langstroth mechanical cutaway, frame geometry, and sensor pass-throughs. | `02 \| WHAT BEEVIL OBSERVES` | 🟢 **PUBLICATION FIGURE** |
| **`diagrams/02_sensor_placement.svg`** | Vector (SVG) | Deterministic Python Generator | Spatial placement of 5-point NIST thermal probes, I2S bio-acoustics, NDIR CO2, multi-gas VOC, and 24-bit scale. | `02 \| WHAT BEEVIL OBSERVES` | 🟢 **PUBLICATION FIGURE** |
| **`diagrams/03_acoustic_transduction_schematic.svg`** | Vector (SVG) | Deterministic Python Generator | Bio-acoustic transduction physics, inter-frame acoustic cavity resonator, and biological spectral mapping. | `03 \| WHY ACOUSTIC TELEMETRY` | 🟢 **PUBLICATION FIGURE** |
| **`results/acoustic_raw_signal.png`** | Image (PNG) | MATLAB Model (`acoustic_dsp_pipeline.m`) | 10s raw microphone waveform (`fs = 2000 Hz`). | `03 \| WHY ACOUSTIC TELEMETRY` | 🟡 **NUMERICAL SIMULATION** |
| **`results/acoustic_fft.png`** | Image (PNG) | MATLAB Model (`acoustic_dsp_pipeline.m`) | 256-point real FFT spectrum (`Δf = 7.8125 Hz`). | `03 \| WHY ACOUSTIC TELEMETRY` | 🟡 **NUMERICAL SIMULATION** |
| **`results/acoustic_spectrogram.png`** | Image (PNG) | MATLAB Model (`acoustic_dsp_pipeline.m`) | STFT spectrogram showing pre-swarm energy transition. | `03 \| WHY ACOUSTIC TELEMETRY` | 🟡 **NUMERICAL SIMULATION** |
| **`results/acoustic_features.png`** | Image (PNG) | MATLAB Model (`acoustic_dsp_pipeline.m`) | Extracted sub-band energy trajectories over time. | `03 \| WHY ACOUSTIC TELEMETRY` | 🟡 **NUMERICAL SIMULATION** |
| **`diagrams/08_full_cyber_physical_architecture.svg`** | Vector (SVG) | Deterministic Python Generator | Complete 3-tier cyber-physical architecture from physical transducers through gateway to field operators. | `04 \| CYBER-PHYSICAL ARCHITECTURE` | 🟢 **PUBLICATION FIGURE** |
| **`diagrams/04_field_node_enclosure_schematic.svg`** | Vector (SVG) | Deterministic Python Generator | Mechanical dimensioned CAD layout, continuous silicone gasket, RP-SMA bulkhead, and PG-7 glands. | `05 \| FIELD NODE` | 🟢 **PUBLICATION FIGURE** |
| **`diagrams/04_field_node_architecture.svg`** | Vector (SVG) | Deterministic Python Generator | Field node electronic block diagram, nRF52840 + SX1262 bus topology, and power gating MOSFETs. | `05 \| FIELD NODE` | 🟢 **PUBLICATION FIGURE** |
| **`diagrams/03_acoustic_pipeline.svg`** | Vector (SVG) | Deterministic Python Generator | CMSIS-DSP 256-point real FFT pipeline ($\Delta f = 7.8125\text{ Hz/bin}$) on ARM Cortex-M4F FPU. | `06 \| ACOUSTIC DSP` | 🟢 **PUBLICATION FIGURE** |
| **`results/fft_resolution_validation.png`** | Image (PNG) | MATLAB Model (`fft_resolution_validation.m`) | Spectral resolution validation (Δf = 7.8125 Hz) & window leakage. | `06 \| ACOUSTIC DSP` | 🟡 **NUMERICAL SIMULATION** |
| **`diagrams/07_edge_analytics.svg`** | Vector (SVG) | Deterministic Python Generator | CUSUM sequential test statistic drift filter, 1D-CNN, and HoneyChain ledger. | `07 \| COLONY-STATE DETECTION` | 🟢 **PUBLICATION FIGURE** |
| **`results/acoustic_event_simulation.png`** | Image (PNG) | MATLAB Model (`acoustic_event_simulation.m`) | Synthetic 4-phase colony state transition and threshold response. | `07 \| COLONY-STATE DETECTION` | 🟡 **NUMERICAL SIMULATION** |
| **`results/cusum_detection.png`** | Image (PNG) | MATLAB Model (`cusum_anomaly_detection.m`) | Page (1954) CUSUM sequential test statistic vs. chill drift. | `07 \| COLONY-STATE DETECTION` | 🟡 **NUMERICAL SIMULATION** |
| **`results/hive_thermal_model.png`** | Image (PNG) | MATLAB Model (`hive_thermal_model.m`) | 2-node lumped parameter hive ODE thermal regulation model. | `08 \| THERMAL MODEL` | 🟡 **NUMERICAL SIMULATION** |
| **`results/energy_budget.png`** | Image (PNG) | MATLAB Model (`node_energy_budget_model.m`) | State power dissipation & per-cycle energy breakdown. | `09 \| ENERGY MODEL` | 🟡 **NUMERICAL SIMULATION** |
| **`results/duty_cycle_simulation.png`** | Image (PNG) | MATLAB Model (`node_energy_budget_model.m`) | 5-minute periodic duty-cycle active current pulse waveform. | `09 \| ENERGY MODEL` | 🟡 **NUMERICAL SIMULATION** |
| **`results/battery_soc_simulation.png`** | Image (PNG) | MATLAB Model (`node_energy_budget_model.m`) | 18-month LiFePO4 battery SOC trajectory with solar MPPT. | `09 \| ENERGY MODEL` | 🟡 **NUMERICAL SIMULATION** |
| **`diagrams/05_lora_mesh.svg`** | Vector (SVG) | Deterministic Python Generator | Sub-GHz LoRa modulation and multi-hop forest mesh across commercial apiary. | `10 \| RADIO` | 🟢 **PUBLICATION FIGURE** |
| **`results/rf_link_budget.png`** | Image (PNG) | MATLAB Model (`rf_link_budget_and_range.m`) | Waterfall RF link budget (+14 dBm Tx to -132 dBm Rx). | `10 \| RADIO` | 🟡 **NUMERICAL SIMULATION** |
| **`results/rf_range_sweep.png`** | Image (PNG) | MATLAB Model (`rf_link_budget_and_range.m`) | Distance vs. received power and link margin (LOS & Canopy). | `10 \| RADIO` | 🟡 **NUMERICAL SIMULATION** |
| **`results/telemetry_scaling.png`** | Image (PNG) | MATLAB Model (`telemetry_network_scaling.m`) | 1-100 hive airtime duty cycle and packet scaling curves. | `10 \| RADIO` | 🟡 **NUMERICAL SIMULATION** |
| **`diagrams/06_gateway_architecture.svg`** | Vector (SVG) | Deterministic Python Generator | Hardened edge gateway (OverlayFS, SQLite WAL, HoneyChain, FastAPI). | `11 \| EDGE PROCESSING` | 🟢 **PUBLICATION FIGURE** |
| **`10-dashboard/dashboard_overview.png`** | Screenshot | Live Production Portal | Operations dashboard showing system specifications and active telemetry map. | `14 \| SOFTWARE IMPLEMENTATION` | 🔵 **ACTUAL IMPLEMENTATION** |
| **`10-dashboard/mobile_field_console.png`** | Screenshot | Live Production Portal | HiveOS mobile field technician PWA interface. | `14 \| SOFTWARE IMPLEMENTATION` | 🔵 **ACTUAL IMPLEMENTATION** |
| **`10-dashboard/playdate_console.png`** | Screenshot | Live Production Portal | Panic Playdate 1-bit high-contrast outdoor hardware screen. | `14 \| SOFTWARE IMPLEMENTATION` | 🔵 **ACTUAL IMPLEMENTATION** |
| **`10-dashboard/dashboard_hive_detail.png`** | Screenshot | Live Production Portal | Deep hive telemetry & 5-point thermal panel. | `14 \| SOFTWARE IMPLEMENTATION` | 🔵 **ACTUAL IMPLEMENTATION** |
