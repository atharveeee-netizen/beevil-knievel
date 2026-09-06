# 🧭 BEEVIL KNIEVEL — Master Repository & Evaluation Guide

This guide directs judges, engineering evaluators, and peer reviewers to the exact file locations, firmware source code, hardware schematics, mathematical proofs, and live web deployments within the repository.

---

## 🗂️ Architectural Directory Map

```
beevil-knievel/
├── README.md                                 # Master unified engineering project overview & evidence
├── docs/
│   ├── MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md # 13 first-principles physics & RF derivations
│   ├── VALIDATION_STATUS.md                  # Comprehensive claim audit & evidence classification matrix
│   ├── MODEL_REGISTRY.md                     # Production AI models, TinyML, and CUSUM specifications
│   ├── REPOSITORY_GUIDE.md                   # This evaluation and navigation guide
│   ├── references/                           # Authoritative literature, datasheets & traceability map
│   │   ├── APICULTURE_SOURCES.md             # USDA, FAO, BIP colony loss & economic surveys
│   │   ├── ACOUSTIC_RESEARCH.md              # Bio-acoustic literature & frequency mapping tables
│   │   ├── BEE_HEALTH_RESEARCH.md            # Brood nest biophysical thermoregulation literature
│   │   ├── RF_AND_LORA_SOURCES.md            # Sub-GHz RF, ITU-R foliage propagation & WPC standards
│   │   ├── HARDWARE_DATASHEETS.md            # Official manufacturer datasheets & pin specifications
│   │   ├── EDGE_AI_SOURCES.md                # CMSIS-DSP, CUSUM change-point math & model compression
│   │   └── RESEARCH_TO_SYSTEM_MAP.md         # Traceability matrix mapping research to system components
│   ├── research/                             # Deep-dive context documents explaining sensing choices
│   │   ├── APICULTURE_CONTEXT.md             # Commercial apiculture operational challenges
│   │   ├── ACOUSTIC_MONITORING.md            # Honey bee sound generation & DSP binning
│   │   ├── BROOD_THERMOREGULATION.md         # Superorganism homeostasis & 5-frame thermal envelope
│   │   └── REMOTE_APIARY_MONITORING.md       # Rural telecommunications & Sub-GHz LoRa mesh
│   └── media/                                # 25+ visual evidence assets, SVGs, real photos & screenshots
│       ├── SOURCES.md                        # Image source, copyright license, and attribution registry
│       ├── MEDIA_INDEX.md                    # Master catalog of visual assets and README locations
│       ├── 01-hero/                          # Hero product visualization (beevil_knievel_hero.png)
│       ├── 02-apiary-problem/                # Real USDA apiary context & problem flow diagram
│       ├── 03-acoustic-problem/              # Bio-acoustic spectrum diagrams & research benchmarks
│       ├── 04-system/                        # Cyber-physical architecture & telemetry packet maps
│       ├── 05-hardware/                      # Field node electrical schematics & power architecture
│       ├── 06-dsp/                           # CMSIS-DSP 256-point real FFT pipeline flowchart
│       ├── 07-radio/                         # Calculated RF link budget & multi-hop mesh topology
│       ├── 08-edge-ai/                       # Two-tier hierarchical edge intelligence pipeline
│       ├── 10-dashboard/                     # Real application screenshots (Dashboard, Mobile, Playdate)
│       ├── 11-evidence/                      # Cryptographic HoneyChain Merkle tree & CUSUM curves
│       ├── application/                      # Real screenshots of live deployed web applications
│       └── research/                         # Public domain & CC-BY real apiary and brood frame photos
├── firmware/
│   ├── beevil_rak4631_transmitter/           # Primary Nordic nRF52840 + SX1262 Arduino/FreeRTOS sketch
│   ├── main_node.cpp                         # STM32WLE5JC / Wio-E5 secondary node firmware
│   └── receiver_gateway.cpp                  # Direct serial LoRa receiver sketch
├── hardware/
│   ├── BOM_AND_PINOUT.md                     # Invoiced procurement Bill of Materials & pin connections
│   ├── antmicro_schematic_board.jpg          # Hardware schematic slide for Antmicro CM4 baseboard
│   └── antmicro_cm4_baseboard/               # Carrier board documentation & open-source design files
├── gateway/
│   ├── server.py                             # High-throughput FastAPI edge server with SQLite WAL ingest
│   ├── cusum_analytics.py                    # Gateway statistical change-point detection daemon
│   ├── lora_receiver.py                      # Sub-GHz LoRa radio daemon for Raspberry Pi CM4
│   ├── mesh_router.py                        # Multi-hop packet routing and deduplication engine
│   └── setup_overlayfs.sh                    # Linux script configuring power-loss immune read-only root
├── TinyML Model/
│   ├── bee_acoustic_classifier.py            # 75.4 KB 1D-CNN 4-band spectral audio classifier
│   ├── run_stress_test_benchmark.py          # 30-sample extreme bio-acoustic stress test runner
│   └── datasets/                             # WAV sample dataset directory
├── Cloud Model/
│   ├── cloud_server.py                       # Cloud pathology REST service
│   └── run_cloud_model_benchmark.py          # Diagnostic pathology benchmark runner
├── frontend/                                 # Next.js 16 + React 19 + Tailwind v4 + Motion web codebase
│   └── src/app/
│       ├── page.tsx                          # Live product portal homepage
│       ├── app/page.tsx                      # HiveOS Mobile Field Console (100-hive matrix & heatmap)
│       └── playdate/page.tsx                 # Interactive 1-bit retro Playdate console emulator
├── dashboard/
│   └── index.html                            # Standalone, offline, single-file HTML/JS field dashboard
└── tests/
    ├── test_full_gateway_pipeline.py         # End-to-end gateway ingestion & AI inference verification
    └── simulate_100_hives.py                 # Multi-hive diurnal telemetry and anomaly simulator
```

---

## 🔍 Where to Evaluate Specific Subsystems

| Subsystem to Evaluate | Primary File(s) to Inspect | What to Look For |
| :--- | :--- | :--- |
| **Firmware & LoRa Transmitter** | `firmware/beevil_rak4631_transmitter/beevil_rak4631_transmitter.ino` | Real register calls for `NRF_TEMP`, SAADC battery division, I2C scanner, 32-byte packed binary struct, FreeRTOS state machine. |
| **Hardware Procurement & BOM** | `hardware/BOM_AND_PINOUT.md` | Actual invoices (Robu.in Invoice #INV2627/203030, Amazon India, PCBPower PCB manufacturing vouchers) totaling ₹62,293.20. |
| **Acoustic Signal Processing** | `firmware/beevil_rak4631_transmitter/` & `TinyML Model/` | CMSIS-DSP 256-point real FFT, $f_s=2000\text{ Hz}$, $\Delta f=7.8125\text{ Hz}$, 4-band spectral feature binning. |
| **Mathematical Derivations** | `docs/MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md` | 13 first-principles mathematical and engineering models with step-by-step numerical examples. |
| **Edge Gateway Ingestion** | `gateway/server.py` & `tests/test_full_gateway_pipeline.py` | Asynchronous FastAPI architecture, SQLite WAL mode, 148.1 pkts/s throughput benchmark, sub-7ms latency. |
| **Live Interactive UI** | `frontend/src/app/playdate/page.tsx` & `/app/page.tsx` | Retro 1-bit memory LCD emulator with mechanical crank, live Web Audio synthesizer, 5-frame thermal heatmap, and HoneyChain explorer. |
| **External Evidence & Literature**| `docs/references/` & `docs/research/` | Authoritative citations from USDA, FAO, Science, PLOS ONE, DCASE, and Zenodo Record 1321278. |
