# BEEVIL KNIEVEL — FRONTEND VISUAL ASSET MANIFEST & REGISTRY

**Standard:** IEEE HARDWAIre Phase 2 Visual Evidence Protocol  
**Classification Rule:** REAL_PHOTO > GENERATED_PHOTO | REAL_CAD > AI_RENDER | REAL_ANSYS > DECORATIVE | DETERMINISTIC_DIAGRAM > AI-GENERATED  
**Authority:** Master Visual Registry for Frontend Reconstruction  

---

## 1. Visual Classification Taxonomy

Every visual asset utilized across Surface A (Public Website), Surface B (Field App), and Surface C (Operations Console) is cataloged with strict provenance metadata:

| TYPE CODE | DEFINITION | VERIFICATION STANDARD |
|---|---|---|
| `REAL_PHOTO` | Authentic physical photograph of hardware, apiary context, or biological subject. | Camera EXIF, USDA-ARS public domain source, or bench inspection photo. |
| `REAL_SCREENSHOT`| Direct screen capture from software test runner, Linux terminal, or hardware benchmark. | Unaltered capture of active process. |
| `CAD` | Dimensioned mechanical engineering CAD model or vector line drawing. | Generated from mechanical engineering CAD file or Gerber drawing. |
| `ANSYS` | Finite element analysis (FEA), computational fluid dynamics (CFD), or electromagnetic simulation. | Validated screenshot from ANSYS HFSS, Icepak, Mechanical, or Fluent. |
| `MATLAB` | Deterministic mathematical or architectural figure generated via MATLAB scripts. | Rendered via MATLAB script in `docs/figures/matlab/` (`.svg`, `.png`, `.pdf`). |
| `SVG_DIAGRAM` | Deterministic Scalable Vector Graphic illustrating schematics, pinouts, or dataflows. | Clean vector code with exact component designations. |
| `GENERATED_CONCEPT`| Conceptual illustrative render created purely to illustrate abstract biological context. | Explicitly watermarked `[CONCEPTUAL ILLUSTRATION]`; never masquerades as hardware evidence. |
| `CHART` | Interactive or deterministic mathematical data plot. | Programmatic SVG/Canvas rendering of actual formulas or benchmark datasets. |
| `UI_CAPTURE` | Screenshot of operational browser dashboard or mobile field interface. | Capture of running Next.js application. |

---

## 2. Visual Asset Registry

| ID | TYPE | ASSET PATH | PURPOSE / CONTENT | STATUS | LICENSE | ROUTE | ALT TEXT |
|---|---|---|---|---|---|---|---|
| `VIS-MAT-01` | `MATLAB` | `/figures/canonical/01_system_architecture.svg` | 3-Tier Cyber-Physical Architecture Overview | VALIDATED | MIT (Team) | `/`, `/console` | Canonical IEEE Phase 2 System Architecture diagram showing 3-tier hierarchy |
| `VIS-MAT-02` | `MATLAB` | `/figures/canonical/02_hive_sensor_layer.svg` | In-Hive Sensor Layer & Transducer Bus Routing | VALIDATED | MIT (Team) | `/`, `/field` | Physical transducer matrix and bus routing inside 10-frame Langstroth hive |
| `VIS-MAT-03` | `MATLAB` | `/figures/canonical/03_sensor_node.svg` | Sensor Node Hardware Architecture (RAK4631) | VALIDATED | MIT (Team) | `/` | Nordic nRF52840 MCU, SX1262 LoRa, and power gating topology |
| `VIS-MAT-04` | `MATLAB` | `/figures/canonical/04_embedded_processing.svg` | Embedded Processing State Machine (300s cycle) | VALIDATED | MIT (Team) | `/`, `/console` | 300-second duty cycle state machine, CMSIS-DSP FFT, and power states |
| `VIS-MAT-05` | `MATLAB` | `/figures/canonical/05_acoustic_dsp.svg` | Acoustic DSP Pipeline & Spectral Band Integration| VALIDATED | MIT (Team) | `/`, `/field` | 16 kHz I2S sampling, 256-point CMSIS-DSP Real FFT, and biological sub-bands |
| `VIS-MAT-06` | `MATLAB` | `/figures/canonical/06_lora_communication.svg` | Dual-Radio Architecture (LoRa + BLE Mesh) | VALIDATED | MIT (Team) | `/` | 2.4 GHz BLE Mesh clustering and Semtech SX1262 LoRa star backhaul |
| `VIS-MAT-07` | `MATLAB` | `/figures/canonical/07_receiver_gateway.svg` | Receiver Gateway Architecture (RPi 3B+) | VALIDATED | MIT (Team) | `/`, `/console` | Raspberry Pi 3B+ edge server, SQLite WAL, and read-only OverlayFS |
| `VIS-MAT-08` | `MATLAB` | `/figures/canonical/08_ai_ml.svg` | Edge AI & Machine Learning Pipeline | VALIDATED | MIT (Team) | `/`, `/console` | TinyML acoustic feature classifier and CUSUM thermal change-point filter |
| `VIS-MAT-09` | `MATLAB` | `/figures/canonical/09_multi_hive_network.svg` | Multi-Hive Network Topology (100 Hives) | VALIDATED | MIT (Team) | `/`, `/console` | 100-hive scalable apiary star topology with mast-mounted gateway |
| `VIS-MAT-10` | `MATLAB` | `/figures/canonical/10_end_to_end_dataflow.svg` | End-to-End System Telemetry Dataflow | VALIDATED | MIT (Team) | `/` | Sensor DMA capture to SQLite WAL transaction commit dataflow |
| `VIS-MAT-11` | `MATLAB` | `/figures/canonical/11_ansys_simulation.svg` | ANSYS Multi-Physics Simulation Suite (11 Domains)| VALIDATED | MIT (Team) | `/` | 11 FEA/CFD/Electromagnetic simulation modules validated in ANSYS |
| `VIS-MAT-12` | `MATLAB` | `/figures/canonical/12_validation.svg` | Engineering Validation Matrix & Evidence Ledger | VALIDATED | MIT (Team) | `/` | Claims versus empirical and mathematical validation matrix |
| `VIS-MAT-13` | `MATLAB` | `/figures/canonical/13_video_master_architecture.svg`| Master Video Presentation Architecture | VALIDATED | MIT (Team) | `/` | Complete cyber-physical platform master architecture |
| `VIS-PHO-01` | `REAL_PHOTO` | `/images/evidence/real_commercial_apiary.jpg` | Commercial Apiary Problem Context | VALIDATED | Public Domain (USDA NRCS) | `/` | Commercial migratory apiary operation in Montana rangeland |
| `VIS-PHO-02` | `REAL_PHOTO` | `/images/evidence/usda_beekeeper_inspection.jpg`| Manual Frame Inspection Bottleneck | VALIDATED | Public Domain (USDA ARS) | `/` | Commercial beekeeper performing manual frame inspection |
| `VIS-PHO-03` | `REAL_PHOTO` | `/images/evidence/real_brood_nest_slice.jpg` | Honeybee Brood Nest Cross-Section | VALIDATED | Public Domain (USDA ARS) | `/` | Honeycomb brood nest cross-section showing worker brood and honey rim |
| `VIS-ANS-01` | `ANSYS` | `/images/evidence/Sim_1_RF_Hive_Penetration_S11_Plot.png` | HFSS RF Hive Penetration Return Loss | VALIDATED | Academic (ANSYS HFSS) | `/` | S11 return loss plot showing -28.65 dB resonance at 865 MHz |
| `VIS-ANS-02` | `ANSYS` | `/images/evidence/Sim_2_Gateway_Thermal_CFD_Map.png` | Icepak Gateway Thermal CFD Dissipation | VALIDATED | Academic (ANSYS Icepak) | `/` | Thermal CFD map showing 58.4°C junction temp at 45°C ambient |
| `VIS-ANS-03` | `ANSYS` | `/images/evidence/Sim_3_Drop_Shock_Von_Mises_Stress.png`| Mechanical Transient Drop Shock (2.0m) | VALIDATED | Academic (ANSYS Mech) | `/` | Von Mises stress distribution of 18.4 MPa during 48.5g drop shock |
| `VIS-ANS-04` | `ANSYS` | `/images/evidence/Sim_6_In_Hive_Aerodynamics_Velocity_Streamlines.png`| Fluent In-Hive Aerodynamics Streamlines | VALIDATED | Academic (ANSYS Fluent) | `/` | Convective airflow velocity streamlines purging CO2 from brood nest |
| `VIS-CAD-01` | `CAD` | `/figures/canonical/02_langstroth_sensor_cutaway.svg`| Mechanical Cutaway of 10-Frame Langstroth | VALIDATED | MIT (Team) | `/`, `/field` | Technical cutaway showing sensor placement, PG-7 glands, and external node |
| `VIS-REP-01` | `UI_CAPTURE` | `/images/evidence/page_1.png` | IEEE Phase 2 Report (Page 1) | VALIDATED | IEEE HART Phase 2 Submission | `/` | Official IEEE HART Phase 2 Report Page 1: System Overview & Architecture |
| `VIS-REP-02` | `UI_CAPTURE` | `/images/evidence/page_2.png` | IEEE Phase 2 Report (Page 2) | VALIDATED | IEEE HART Phase 2 Submission | `/` | Official IEEE HART Phase 2 Report Page 2: Mathematical Proofs & BOM |

---

## 3. Policy on Generated Conceptual Imagery

1. Any illustrative render generated to depict the external field enclosure mounted on a hive must carry the label `[CONCEPTUAL FIELD VISUALIZATION]`.
2. Generated imagery must NEVER be presented as proof of hardware bring-up. Physical register audits and photograph evidence (`VIS-PHO-*`, `VIS-ANS-*`) serve as empirical truth.
3. No decorative AI-slop graphics (neon circuits, floating holographic screens, artificial brains) are permitted.
