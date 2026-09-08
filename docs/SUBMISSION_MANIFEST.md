# BEEVIL KNIEVEL — SUBMISSION MANIFEST & CANONICAL ARTIFACT BOUNDARY

**Submission Standard:** IEEE Industrial / Academic Competition Submission Package  
**Requirement:** Section 4 of Master Production Loop  
**Repository Source of Truth:** `https://github.com/atharveeee-netizen/beevil-knievel`  

---

## 1. Canonical Submission Boundary

Only artifacts verified as strictly necessary, reproducible, and defensible belong inside the canonical submission set. All scratch files, duplicate raster previews, build intermediate caches, and personal IDE files are strictly excluded.

```text
SUBMISSION/
├── source/
│   ├── firmware/
│   │   ├── beevil_rak4631_transmitter/        # Production Arduino C++ edge transmitter sketch
│   │   ├── sensor_node/src/                   # FreeRTOS multi-tasking node & mesh protocol
│   │   ├── config/                            # Radio, sensor, battery, algorithm headers
│   │   └── lib/                               # SX1262 LoRa and DS18B20 1-Wire drivers
│   ├── gateway/
│   │   ├── server.py                          # FastAPI edge REST server with SQLite WAL DB
│   │   ├── lora_receiver.py                   # 32-byte binary SPI packet receiver daemon
│   │   ├── cusum_analytics.py                 # Real-time Page's CUSUM anomaly detector
│   │   ├── noise_filter.py                    # Savitzky-Golay & exponential moving average filter
│   │   ├── phenotypic_forecaster.py           # Colony health decay & swarm trajectory predictor
│   │   ├── setup_gateway.sh                   # Automated Debian Linux provisioning script
│   │   ├── setup_overlayfs.sh                 # Read-only rootfs corruption protection
│   │   └── nginx/beevil.conf                  # Production reverse proxy configuration
│   └── frontend/
│       ├── src/app/                           # Next.js 16 App Router UI pages
│       ├── src/components/                    # Zero-slop industrial telemetry components
│       └── package.json                       # Next.js 16 + React 19 + Tailwind CSS v4 stack
│
├── figures/
│   ├── 00_system_hero_architecture.svg        # Canonical full-system overview (1080x540)
│   ├── 01_problem_and_observation.svg         # Apiary inspection gap & non-invasive telemetry
│   ├── 02_langstroth_sensor_cutaway.svg       # Dimensioned 10-frame Langstroth transducer cutaway
│   ├── 02_sensor_placement.svg                # Thermal & bio-acoustic spatial placement
│   ├── 03_acoustic_pipeline.svg               # INMP441 -> 256-pt FFT -> 8 sub-bands DSP flow
│   ├── 03_acoustic_transduction_schematic.svg # MEMS acoustic transduction & comb resonance
│   ├── 04_field_node_architecture.svg         # RAK4631 + power + sensor bus schematic
│   ├── 04_field_node_enclosure_schematic.svg  # IP67 enclosure & solar weatherproofing
│   ├── 05_lora_mesh.svg                       # IN865 Sub-GHz propagation & star/mesh topology
│   ├── 06_gateway_architecture.svg            # Raspberry Pi 3B+ + SX1262 HAT edge pipeline
│   ├── 07_edge_analytics.svg                  # CUSUM, Kalman & phenotypic forecasting
│   └── 08_full_cyber_physical_architecture.svg# Complete physical hive to cloud telemetry
│
├── documentation/
│   ├── README.md                              # Authoritative repository master documentation
│   ├── .spec/                                 # Spec-Driven Development contracts (PRD, TechSpec, etc.)
│   ├── docs/BOM_VISUAL_MANIFEST.md            # Hardware BOM with part numbers & pinouts
│   ├── docs/IMAGE_PROVENANCE.md               # Complete ethical copyright & image provenance
│   ├── docs/ARCHITECTURE_CONTRADICTIONS.md    # Gateway & protocol resolution record
│   ├── docs/FIGURE_INVENTORY.md               # Comprehensive catalog of all figures
│   ├── docs/FIGURE_SOURCE_OF_TRUTH.md         # Exact code/hardware source mapping for each figure
│   ├── docs/FIGURE_RENDERERS.md               # Deterministic renderer selection rationale
│   └── docs/SUBMISSION_ASSET_AUDIT.md         # Full repository asset audit & dependency graph
│
├── hardware/
│   ├── BOM_AND_PINOUT.md                      # Official pin connections & electrical limits
│   ├── Smart_Hive_Monitor_BOM_with_INR.xlsx   # Sourced procurement spreadsheet with pricing
│   ├── Smart_Hive_Monitor_BOM_Report.pdf      # Archival procurement report
│   ├── enclosure/hive_node_enclosure.scad     # OpenSCAD 3D printable IP67 enclosure CAD
│   └── enclosure/3D_PRINTING_GUIDE.md         # ASA / PETG print parameters & sealing instructions
│
├── models/
│   ├── TinyML Model/                          # Edge Impulse / TFLite Micro CNN models
│   └── firmware/config/algorithm_config.h     # CMSIS-DSP 256-point FFT coefficient tables
│
├── simulations/
│   ├── simulation/models/                     # Python numerical verification scripts (14 models)
│   ├── simulation/simulink/                   # 4 Simulink (.slx) physics & energy models
│   ├── hardware/simulations/                  # Ansys PyAEDT execution scripts (HFSS, Icepak, Maxwell)
│   └── simulations/screenshots_for_judges/    # Calibrated Ansys simulation output plots
│
└── evidence/
    ├── tests/                                 # Pytest test suite (gateway, SQLite, validation)
    ├── scripts/verify_repo_integrity.py       # Automated deterministic integrity auditor
    └── scripts/audit_readme_assets.py         # Automated README asset resolver & link auditor
```

---

## 2. Explicit Non-Submission Boundary (Blacklist)

The following files and directories are strictly excluded from the canonical submission package:
- `__pycache__/`, `*.pyc`, `*.pyo` (compiled Python bytecode)
- `.pytest_cache/`, `.next/`, `frontend/out/` (ephemeral build caches)
- `node_modules/` (third-party web dependencies, installed via package-lock.json)
- Temporary scratch scripts (`scratch/`)
- Obsolete raster diagrams superseded by vector SVGs in `docs/media/diagrams/`
- Unreferenced starter template graphics (`star-history.png`, `rapidproxy-banner.png`)
- Local IDE configs (`.vscode/`, `.idea/`)
- Machine-local log files (`server.log`, `*.tmp`)
