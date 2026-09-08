# BEEVIL KNIEVEL — COMPREHENSIVE SUBMISSION ASSET AUDIT & DEPENDENCY GRAPH

**Standard:** IEEE Industrial & Research Publication Asset Audit
**Compliance:** Section 1, 2, 3 of Master Engineering Loop
**Generated Date:** 2026-09-08 (Audited & Calibrated)

---

## 1. Executive Summary & Inventory Scope

A full recursive reconnaissance was conducted across the BEEVIL KNIEVEL repository. Total cataloged target files: **280 files**.

### Directory File Distribution

| Root Directory | Total Files | Scope & Role |
|---|---|---|
| `docs/` | **79** | Documentation, Specifications & Publication Figures |
| `frontend/` | **59** | Next.js 16 Web Dashboard & Telemetry Consoles |
| `simulations/` | **33** | Ansys Workbench & Certified Simulation Evidence |
| `simulation/` | **28** | Python Numerical Simulators & Simulink (.slx) Models |
| `firmware/` | **12** | RAK4631 Arduino C++ Transmitter & FreeRTOS Node Code |
| `hardware/` | **12** | Hardware BOM, Schematics, OpenSCAD Enclosure & Ansys Scripts |
| `gateway/` | **11** | Linux Edge Gateway, FastAPI, SQLite WAL & Systemd Daemons |
| `TinyML Model/` | **9** | TFLite Micro & Edge Impulse Neural Model Checkpoints |
| `.spec/` | **8** | Spec-Driven Development Contracts (PRD, TechSpec, etc.) |
| `scripts/` | **7** | Deterministic Diagram Generators & Compliance Verification Scripts |
| `Cloud Model/` | **6** | Cloud model Subsystem |
| `tests/` | **4** | Pytest Automated Validation Suite |
| `.github/` | **2** | .github Subsystem |
| `.pytest_cache/` | **2** | .pytest_cache Subsystem |
| `report/` | **2** | IEEE Phase 2 LaTeX Report Archive |
| `.gitignore/` | **1** | .gitignore Subsystem |
| `DEPLOYMENT_GUIDE.md/` | **1** | System Root Config |
| `LIMITATIONS.md/` | **1** | System Root Config |
| `README.md/` | **1** | System Root Config |
| `REPRODUCIBILITY.md/` | **1** | System Root Config |
| `walkthrough.md/` | **1** | System Root Config |


### Extension Distribution

| Extension | File Count | Primary Function |
|---|---|---|
| `.png` | **66** | Calibrated Simulation Output Plots, Ansys Visual Evidence, Dashboard Captures |
| `.md` | **49** | Engineering Specifications, Architectural Documentation, Audit Ledgers |
| `.py` | **36** | Python Simulators, Gateway Daemons, Verification & Audit Test Scripts |
| `.tsx` | **33** | React 19 / Next.js 16 Production Telemetry Components |
| `.svg` | **26** | Deterministic Publication Vector Figures (100% Zero-Slop) |
| `.jpg` | **22** | Calibrated Field Context Photographs & Hardware Board Schematics |
| `.h` | **10** | C/C++ Firmware Header Contracts (Radio, Sensors, Battery, Algorithms) |
| `.m` | **8** | MATLAB Verification Scripts |
| `.json` | **5** | Configuration, Package Manifests & Ingestion Schemas |
| `[none]` | **4** | General Asset |
| `.ts` | **4** | TypeScript Utility Libraries |
| `.slx` | **4** | Simulink Cyber-Physical & Energy Models |
| `.sh` | **3** | Debian Gateway Automated Setup & OverlayFS Shell Scripts |
| `.yml` | **2** | GitHub Actions CI / CD Automation Workflows |
| `.csv` | **2** | Benchmark Audio Telemetry Data |
| `.ino` | **1** | RAK4631 Arduino Edge Transmitter Production Sketch |
| `.c` | **1** | FreeRTOS Sensor Node Source |
| `.pdf` | **1** | Procurement BOM Engineering Report |
| `.xlsx` | **1** | Detailed Component Procurement Spreadsheet with INR Pricing |
| `.scad` | **1** | OpenSCAD 3D Printable IP67 Enclosure Parametric Model |
| `.tex` | **1** | IEEE-HART LaTeX Academic Report |

---

## 2. Asset Dependency Graph & Classification

In accordance with Section 3, all repository assets are classified under the 14-class taxonomy:

### A. Canonical Vector Figures (CANONICAL, README_USED, SUBMISSION_REQUIRED)

| Asset Path | Size | Referenced By | Classification |
|---|---|---|---|
| `docs/media/diagrams/00_system_hero_architecture.svg` | 15,091 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/01_problem_and_observation.svg` | 13,472 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/02_langstroth_sensor_cutaway.svg` | 17,537 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/02_sensor_placement.svg` | 15,753 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/03_acoustic_pipeline.svg` | 15,620 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/03_acoustic_transduction_schematic.svg` | 14,660 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/04_field_node_architecture.svg` | 14,826 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/04_field_node_enclosure_schematic.svg` | 14,966 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/05_lora_mesh.svg` | 16,907 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/06_gateway_architecture.svg` | 14,417 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/07_edge_analytics.svg` | 14,697 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/diagrams/08_full_cyber_physical_architecture.svg` | 13,329 B | `README.md`, `docs/FIGURE_MANIFEST.md` | `CANONICAL`, `README_USED`, `SUBMISSION_REQUIRED` |


### B. Calibrated Simulation & Evidence Plots (DERIVED, SUBMISSION_REQUIRED)

| Asset Path | Size | Generator / Origin | Classification |
|---|---|---|---|
| `docs/media/results/acoustic_event_simulation.png` | 607,571 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/acoustic_features.png` | 389,929 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/acoustic_fft.png` | 216,690 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/acoustic_raw_signal.png` | 550,287 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/acoustic_spectrogram.png` | 297,899 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/battery_soc_simulation.png` | 152,593 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/cusum_detection.png` | 318,070 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/duty_cycle_simulation.png` | 132,940 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/energy_budget.png` | 238,975 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/fft_resolution_validation.png` | 337,843 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/hive_thermal_model.png` | 276,773 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/rf_link_budget.png` | 202,379 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/rf_range_sweep.png` | 273,104 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `docs/media/results/telemetry_scaling.png` | 256,259 B | `simulation/models/*.py` | `DERIVED`, `README_USED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_10_Audio_Trace_Parasitics_RLC_Matrix.png` | 111,223 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_11_Solar_Optical_Irradiance_Heatmap.png` | 223,915 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_1_RF_Hive_Penetration_S11_Plot.png` | 172,621 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_2_Gateway_Thermal_CFD_Map.png` | 227,113 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_3_Drop_Shock_Von_Mises_Stress.png` | 152,595 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_4_Acoustic_Decoupling_Response.png` | 181,574 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_5_Solar_MPPT_EMI_B_Field_Contour.png` | 182,930 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_6_In_Hive_Aerodynamics_Velocity_Streamlines.png` | 467,310 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_7_Battery_Diurnal_Thermal_24hr_Curve.png` | 172,479 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_8_High_Wind_Storm_Load_Deflection_Field.png` | 157,861 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |
| `simulations/screenshots_for_judges/Sim_9_Bus_Signal_Integrity_Eye_Diagram.png` | 303,944 B | Ansys PyAEDT Solvers (HFSS, Icepak, Maxwell) | `DERIVED`, `SUBMISSION_REQUIRED` |


### C. Physical Hardware & CAD Source of Truth (SOURCE, CANONICAL, SUBMISSION_REQUIRED)

| Asset Path | Size | Function | Classification |
|---|---|---|---|
| `hardware/BOM_AND_PINOUT.md` | 5.2 KB | Authoritative Pinout & Bus Connections | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `hardware/Smart_Hive_Monitor_BOM_with_INR.xlsx` | 1,092.7 KB | Complete Component Sourcing Ledger | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `hardware/Smart_Hive_Monitor_BOM_Report.pdf` | 8.5 KB | Official BOM Summary Report | `DERIVED`, `SUBMISSION_REQUIRED` |
| `hardware/enclosure/hive_node_enclosure.scad` | 1.7 KB | OpenSCAD 3D CAD Parametric Source | `SOURCE`, `SUBMISSION_REQUIRED` |
| `hardware/enclosure/3D_PRINTING_GUIDE.md` | 3.1 KB | ASA/PETG Slicer & Assembly Guide | `SOURCE`, `SUBMISSION_REQUIRED` |
| `docs/media/05-hardware/receiver_gateway_baseboard_schematic.jpg` | 837.9 KB | Phase 2 Gateway Baseboard CAD Render | `DERIVED`, `SUBMISSION_REQUIRED` |


### D. Simulation Source Models (SOURCE, SUBMISSION_REQUIRED)

| Asset Path | Size | Solver / Tool | Classification |
|---|---|---|---|
| `hardware/simulations/ansys_hfss_lora_antenna.py` | 2,758 B | Ansys PyAEDT Automated Scripts | `SOURCE`, `SUBMISSION_REQUIRED` |
| `hardware/simulations/ansys_icepak_thermal_cfd.py` | 2,385 B | Ansys PyAEDT Automated Scripts | `SOURCE`, `SUBMISSION_REQUIRED` |
| `hardware/simulations/ansys_maxwell_emc_shielding.py` | 2,324 B | Ansys PyAEDT Automated Scripts | `SOURCE`, `SUBMISSION_REQUIRED` |
| `hardware/simulations/ansys_mechanical_drop_and_modal.py` | 2,663 B | Ansys PyAEDT Automated Scripts | `SOURCE`, `SUBMISSION_REQUIRED` |
| `hardware/simulations/run_ansys_simulation_suite.py` | 3,980 B | Ansys PyAEDT Automated Scripts | `SOURCE`, `SUBMISSION_REQUIRED` |
| `simulation/simulink/beevil_battery_solar_mppt.slx` | 1,900 B | MATLAB / Simulink | `SOURCE`, `SUBMISSION_REQUIRED` |
| `simulation/simulink/beevil_cyber_physical_system.slx` | 2,060 B | MATLAB / Simulink | `SOURCE`, `SUBMISSION_REQUIRED` |
| `simulation/simulink/beevil_hive_thermal_simscape.slx` | 1,918 B | MATLAB / Simulink | `SOURCE`, `SUBMISSION_REQUIRED` |
| `simulation/simulink/beevil_node_duty_cycle.slx` | 1,918 B | MATLAB / Simulink | `SOURCE`, `SUBMISSION_REQUIRED` |


### E. Firmware & Gateway Code (SOURCE, CANONICAL, SUBMISSION_REQUIRED)

| Asset Path | Size | Language / Role | Classification |
|---|---|---|---|
| `firmware/beevil_rak4631_transmitter/beevil_rak4631_transmitter.ino` | 19,296 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/beevil_rak4631_transmitter/config.h` | 783 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/config/algorithm_config.h` | 3,231 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/config/battery_config.h` | 2,428 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/config/hardware_config.h` | 2,993 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/config/radio_config.h` | 2,538 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/config/sensor_config.h` | 3,329 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/lib/ds18b20_1wire.h` | 1,105 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/lib/sx126x_lora.h` | 1,048 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/sensor_node/src/beevil_mesh_protocol.h` | 5,491 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/sensor_node/src/beevil_nrf52_freertos.c` | 9,109 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `firmware/sensor_node/src/config.h` | 1,443 B | Embedded C/C++ Firmware | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/cusum_analytics.py` | 3,172 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/local_llm_advisor.py` | 6,966 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/lora_receiver.py` | 4,600 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/mesh_router.py` | 4,962 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/noise_filter.py` | 5,382 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/phenotypic_forecaster.py` | 4,628 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/server.py` | 23,641 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/setup_gateway.sh` | 3,026 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/setup_overlayfs.sh` | 1,820 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/setup_wireguard_mesh.sh` | 1,844 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |
| `gateway/telegram_notifier.py` | 4,245 B | Python / Linux Gateway Service | `SOURCE`, `CANONICAL`, `SUBMISSION_REQUIRED` |


### F. Unreferenced / Obsolete Assets Designated for Deprecation

The following assets have zero active code or documentation references and are designated for safe removal:

| Asset Path | Size | Reason for Deletion | Action |
|---|---|---|---|
| `frontend/docs/assets/star-history.png` | 167.6 KB | Cloned web template starter banner; unreferenced | DELETE |
| `frontend/docs/assets/sponsors/rapidproxy-banner.png` | 63.8 KB | Cloned web template starter banner; unreferenced | DELETE |
| `frontend/public/images/hardware/custom_algorithm_pipeline_flowchart.jpg` | 592.7 KB | Obsolete early raster flowchart; superseded by `03_acoustic_pipeline.svg` | DELETE |
| `frontend/public/images/hardware/custom_hardware_architecture_diagram.jpg` | 516.6 KB | Obsolete early raster diagram; superseded by `04_field_node_architecture.svg` | DELETE |
| `frontend/public/images/hardware/final_receiver_pcb_architecture.jpg` | 792.8 KB | Obsolete raster block diagram; superseded by `06_gateway_architecture.svg` | DELETE |
| `frontend/public/images/hardware/final_transmitter_pcb_architecture.jpg` | 805.4 KB | Obsolete raster block diagram; superseded by `04_field_node_architecture.svg` | DELETE |
| `frontend/public/images/hardware/receiver_gateway_schematic_board.jpg` | 837.9 KB | Unreferenced copy of gateway baseboard schematic; canonical copy in `docs/media/05-hardware/` | DELETE |
| `frontend/public/images/hardware/transmitter_schematic_board.jpg` | 607.3 KB | Obsolete raster board diagram; superseded by vector figures | DELETE |
| `docs/media/gateway/receiver_gateway_baseboard_schematic.jpg` | 837.9 KB | Exact duplicate of `docs/media/05-hardware/receiver_gateway_baseboard_schematic.jpg` | DELETE |

---

## 3. Asset Integrity Verification Standards

1. **Automated Continuous Audit:** Maintained via `scripts/audit_readme_assets.py` (checks physical on-disk existence of all Markdown links).

2. **Repository Integrity Gate:** Maintained via `scripts/verify_repo_integrity.py` (validates all relative and URL cross-references across specifications).

3. **Reproducibility Guarantee:** All 12 canonical publication figures are 100% regenerable by executing `python scripts/generate_publication_diagrams.py`.

