# BEEVIL KNIEVEL — FIGURE SOURCE OF TRUTH (SOT) MAP

**Standard:** IEEE Reproducibility Traceability Matrix  
**Requirement:** Section 30 of Master Production Loop  

This matrix directly maps every single figure in the repository to its exact underlying line of code, firmware header, CAD source, or peer-reviewed dataset.

---

## Traceability Matrix

| Figure File | Primary Engineering Source | Code / Config Location | Line / Register / Parameter |
|---|---|---|---|
| `docs/media/diagrams/00_system_hero_architecture.svg` | Architecture Spec & Master Hardware BOM | `.spec/Architecture.md`, `hardware/BOM_AND_PINOUT.md` | Full system tier definition |
| `docs/media/diagrams/01_problem_and_observation.svg` | Product Requirements Document | `.spec/PRD.md`, USDA ARS Apiculture Studies | Manual vs continuous telemetry latency |
| `docs/media/diagrams/02_langstroth_sensor_cutaway.svg` | Physical BOM & Mechanical Standard | `hardware/BOM_AND_PINOUT.md`, Langstroth Standards | Frame 1-5 spacing, PG-7 pass-through |
| `docs/media/diagrams/02_sensor_placement.svg` | Sensor Configuration Header | `firmware/config/sensor_config.h` | 5x DS18B20 1-Wire addresses, I2C bus |
| `docs/media/diagrams/03_acoustic_pipeline.svg` | CMSIS-DSP Algorithm Configuration | `firmware/config/algorithm_config.h` | `FFT_SIZE=256`, `SAMPLE_RATE_HZ=2000`, 8 bands |
| `docs/media/diagrams/03_acoustic_transduction_schematic.svg`| Zenodo Acoustic Dataset & Microphone Spec | `simulation/models/acoustic_simulator.py` | Zenodo DOI:10.5281/zenodo.1321278, INMP441 I2S |
| `docs/media/diagrams/04_field_node_architecture.svg` | Hardware Pinout & Microcontroller Spec | `hardware/BOM_AND_PINOUT.md`, `firmware/config/hardware_config.h` | I2C P0.14/P0.13, I2S P0.03/P0.04/P0.28 |
| `docs/media/diagrams/04_field_node_enclosure_schematic.svg` | OpenSCAD CAD Design & Power Model | `hardware/enclosure/hive_node_enclosure.scad`, `simulation/models/power_budget.py` | IP67 ASA dimensions, 18650 Li-Ion cradle |
| `docs/media/diagrams/05_lora_mesh.svg` | Radio Config & RF Propagation Simulation | `firmware/config/radio_config.h`, `simulation/models/rf_propagation.py` | 865.0625 MHz, SF7, BW 125kHz, CR 4/5, +14 dBm |
| `docs/media/diagrams/06_gateway_architecture.svg` | Gateway Provisioning & Receiver Code | `gateway/setup_gateway.sh`, `gateway/lora_receiver.py` | SPI `/dev/spidev0.0`, SQLite WAL, FastAPI |
| `docs/media/diagrams/07_edge_analytics.svg` | CUSUM Detector & Analytics Code | `gateway/cusum_analytics.py`, `gateway/phenotypic_forecaster.py` | Page's CUSUM ($k=0.5\sigma$, $h=4.5\sigma$) |
| `docs/media/diagrams/08_full_cyber_physical_architecture.svg`| Master Technical Specification | `.spec/TechSpec.md`, `gateway/server.py` | Cyber-physical telemetry loop |
