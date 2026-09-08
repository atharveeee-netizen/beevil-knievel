# BEEVIL KNIEVEL — VIDEO SOURCE EXTRACTION MANIFEST

**Document Status:** CANONICAL EXTRACTION & PROVENANCE MANIFEST  
**Standard:** IEEE HART / Peer-Reviewed Reproducibility & Ethical Footage Sourcing  
**Target Video Duration:** 4 Minutes 30 Seconds (IEEE Phase 2 Presentation)  
**Footage Scope:** Scene 01 External Real-World Problem Context (Strict Exclusion for Scenes 02–10)  

---

## 1. Executive Summary & Core Extraction Law

This manifest governs the legal identification, frame-accurate extraction, normalization, and provenance tracking of external video footage used in the **BEEVIL KNIEVEL** IEEE HART Phase 2 presentation video.

### The Non-Negotiable Extraction Law:
1. **Zero Copyright Infringement:** No copyrighted external video may be downloaded, redistributed, or incorporated into final video cuts without explicit, verifiable Creative Commons (CC BY, CC0) or Public Domain status. All ambiguous commercial sources are permanently blocked under `LICENSE_REQUIRED`.
2. **Boundary of External Footage:** External footage is permitted **exclusively** for Scene 01 (Real-World Problem Context: apiary establishing shots, beekeeper approach, smoker lighting, hive opening, frame pulling, brood nest inspection).
3. **Internal Truth Gate (No Fictional Deployment):** Scenes 02 through 10 strictly forbid external footage. They must consist solely of authentic BEEVIL physical hardware, deterministic vector graphics, firmware recordings, CMSIS-DSP acoustic plots, and validated telemetry database outputs. External footage is explicitly tagged with `FIELD CONTEXT` to ensure judges are never misled into believing prototype hardware is deployed in external commercial apiaries.

---

## 2. Canonical Hardware & Terminology Baseline (Reconnaissance)

To prevent discrepancies between video narration and physical engineering artifacts, all video scripting and graphics must adhere strictly to the repository truth:

| Subsystem | Canonical Engineering Specification | Repository Ground Truth | Claim Classification |
|---|---|---|---|
| **Node Microcontroller** | Seeed Studio RAK4631 Mini (Nordic nRF52840 ARM Cortex-M4 @ 48 MHz + SX1262 LoRa) | `hardware/BOM_AND_PINOUT.md`, `firmware/` | VALIDATED |
| **Acoustic Transducer** | Knowles / TDK InvenSense ICS-43434 I2S Digital MEMS Microphone ($\pm 1$ dB, 24-bit) | `firmware/src/ics43434_driver.c` | VALIDATED |
| **Thermal Sensing** | 3x Maxim DS18B20 1-Wire Digital Probes (2x Brood Core + 1x Ambient Reference) | `firmware/src/ds18b20_bus.c` | VALIDATED |
| **Acoustic Inference** | CMSIS-DSP 256-Point Real FFT running on MCU (200 Hz – 400 Hz Swarming Band) | `firmware/beevil_rak4631_transmitter/` | VALIDATED |
| **Telemetry Ingestion** | 32-Byte Packed Binary Struct over LoRa RF; Unpacked into SQLite WAL + FastAPI | `gateway/lora_receiver.py`, `gateway/server.py` | VALIDATED |
| **Gateway Baseline** | Raspberry Pi 3B+ + Waveshare SX1262 LoRa HAT (IN865 Band, +14 dBm, SF7) | `gateway/setup_gateway.sh` | VALIDATED |
| **Industrial Gateway** | Orange Pi CM5 + RAK2287 8-Channel Concentrator (Phase 2 Industrial Scaling Target) | `hardware/RECEIVER_GATEWAY_SCHEMATIC_SLIDE.md` | PROPOSED |
| **Enclosure** | 3D-Printed PETG IP67 Hexagonal Body + Gore-Tex Acoustic Vent Membrane | `cad/hive_node_enclosure.scad` | VALIDATED |

---

## 3. Storyboard Scene Structure & Footage Boundaries

| Scene ID | Title | Target Duration | Allowed Visual Assets | External Footage Status |
|---|---|---|---|---|
| **SCENE 01** | **Real-World Problem & Colony Loss** | 0:00 – 0:45 | Real Apiary Footage, Smoker, Hive Inspection, Brood Frame | **ALLOWED (7 Approved Clips)** |
| **SCENE 02** | **Observability Gap** | 0:45 – 1:15 | Vector Animation, Internal vs External Inspection Comparison | FORBIDDEN (Vector Animation Only) |
| **SCENE 03** | **BEEVIL Prototype Unveiling** | 1:15 – 1:45 | Physical Assembled Node, 3D Cutaway, Enclosure Exploded View | FORBIDDEN (Authentic Hardware Only) |
| **SCENE 04** | **Hardware Schematic & BOM** | 1:45 – 2:15 | KiCad Schematics, Pinout Matrix, Power Tree, NanoVNA Return Loss | FORBIDDEN (Deterministic Vector Diagrams) |
| **SCENE 05** | **Edge AI & Acoustic DSP** | 2:15 – 2:50 | CMSIS-DSP 256-pt FFT Spectrogram, 200–400Hz Band Energy Plot | FORBIDDEN (Python/MATLAB DSP Output) |
| **SCENE 06** | **Multimodal Brood Thermoregulation** | 2:50 – 3:20 | Brood Delta-T Differential Plot, 35°C Homeostatic Curve | FORBIDDEN (Deterministic Telemetry Plots) |
| **SCENE 07** | **Sub-GHz LoRa Telemetry & Protocol** | 3:20 – 3:45 | 32-Byte Binary Frame Diagram, Star Uplink Topology, Mesh Fallback | FORBIDDEN (Deterministic Protocol Diagrams) |
| **SCENE 08** | **Self-Built Gateway Receiver & UI** | 3:45 – 4:10 | RPi 3B+ Receiver HAT, Live FastAPI Ingestion, Web Dashboard | FORBIDDEN (Authentic Software Recording) |
| **SCENE 09** | **Validated Results & 4 KPIs** | 4:10 – 4:25 | BOM Table ($18.74), Battery Life (0.85 mWh/day), Range (4.2 km) | FORBIDDEN (Validated Measured Data) |
| **SCENE 10** | **Conclusion & IEEE Submission** | 4:25 – 4:30 | Prototype Hardware + Team Credits + Architecture Diagram | FORBIDDEN (Authentic System Assets) |

---

## 4. Approved Footage Inventory (Scene 01 Problem Context)

All approved clips were sourced from the **United States Department of Agriculture (USDA) Natural Resources Conservation Service (NRCS)** People's Garden Apiary public-domain archives. Every clip has been trimmed with frame accuracy using FFmpeg, standardized to 1080p H.264 at 24.0 fps, SHA-256 fingerprinted, and verified for zero watermarks or commercial copyright.

```
assets/video_sources/
├── clips/
│   ├── SHOT-001_apiary_establishing.mp4  (3.46s, 1920x1080, SHA256: 7488ff0ca1dc...)
│   ├── SHOT-002_beekeeper_approach.mp4   (3.96s, 1920x1080, SHA256: 09651dd369fd...)
│   ├── SHOT-003_smoker.mp4               (3.46s, 1920x1080, SHA256: 21a4a78e823c...)
│   ├── SHOT-004_hive_opening.mp4         (3.46s, 1920x1080, SHA256: 09864365fc94...)
│   ├── SHOT-005_frame_removal.mp4        (3.96s, 1920x1080, SHA256: e41bb5938748...)
│   ├── SHOT-006_frame_inspection.mp4     (3.96s, 1920x1080, SHA256: cad92b94ee21...)
│   └── SHOT-007_brood_closeup.mp4        (3.96s, 1920x1080, SHA256: 60f32d57b796...)
├── metadata/
│   ├── SHOT-001.json ... SHOT-007.json
├── proxy/
│   ├── SHOT-001_thumb.jpg ... SHOT-007_thumb.jpg (First, Mid, Last QA frames)
├── preview/
│   └── approved_sources_preview.mp4      (26.25s review montage with metadata stamps)
└── SHOT_CONTACT_SHEET.pdf                (Single-document publication contact sheet)
```

### Detailed Shot Ledger:

#### 1. `SHOT-001_apiary_establishing.mp4`
- **Shot ID:** `SHOT-001`
- **Scene:** SCENE 01 — REAL-WORLD PROBLEM
- **Purpose:** Apiary wide shot / establishing operational environment.
- **Source:** USDA NRCS People's Garden Apiary (`20130522-NRCS-LSC-0226-v6`)
- **Source URL:** [Wikimedia Commons File Page](https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130522-NRCS-LSC-0226-v6).webm)
- **Creator:** USDA Natural Resources Conservation Service / Wayne Bogovich & Lance Cheung
- **License:** Public Domain (17 U.S.C. § 105 - United States Federal Government Work)
- **Permission Status:** `APPROVED`
- **Timecodes:** Source `00:01:23.000` to `00:01:26.500` | Duration: `3.46s` (83 frames @ 24 fps)
- **Format:** H.264 / AAC, 1920x1080, CRF 18
- **SHA-256:** `7488ff0ca1dc8ddcfcbca1a49db237190f84478ea7f7d34cb72e0085fc526c4f`
- **Visual Description:** Establishing wide panoramic view of dual Langstroth multi-super beehives situated on a gravel rooftop apiary under clear sky.
- **Engineering Justification:** Establishes real-world physical apiary setting and outdoor operational constraints before hive intervention.

#### 2. `SHOT-002_beekeeper_approach.mp4`
- **Shot ID:** `SHOT-002`
- **Scene:** SCENE 01 — REAL-WORLD PROBLEM
- **Purpose:** Beekeeper approaching hive.
- **Source:** USDA NRCS People's Garden Apiary (`20130522-NRCS-LSC-0226-v6`)
- **License:** Public Domain (17 U.S.C. § 105)
- **Permission Status:** `APPROVED`
- **Timecodes:** Source `00:01:26.500` to `00:01:30.500` | Duration: `3.96s` (95 frames @ 24 fps)
- **Format:** H.264 / AAC, 1920x1080, CRF 18
- **SHA-256:** `09651dd369fd1cf30cb04b7be8645e2a220268bdfca2db2e65c9c3132f8373b5`
- **Visual Description:** Beekeeper in full white protective bee suit, helmet veil, and leather gloves walks across the rooftop gravel carrying smoker and hive tool toward the colony.
- **Engineering Justification:** Documents human physical labor and scheduling constraints inherent to manual apiary management.

#### 3. `SHOT-003_smoker.mp4`
- **Shot ID:** `SHOT-003`
- **Scene:** SCENE 01 — REAL-WORLD PROBLEM
- **Purpose:** Smoker preparation and fuel loading.
- **Source:** USDA NRCS People's Garden Apiary (`20130522-NRCS-LSC-0226-v6`)
- **License:** Public Domain (17 U.S.C. § 105)
- **Permission Status:** `APPROVED`
- **Timecodes:** Source `00:01:10.500` to `00:01:14.000` | Duration: `3.46s` (83 frames @ 24 fps)
- **Format:** H.264 / AAC, 1920x1080, CRF 18
- **SHA-256:** `21a4a78e823c6f93fece2ca1ee8da6a73cfa87864f1910a9733a411516eefba6`
- **Visual Description:** Macro shot of beekeeper loading pine needle fuel into the stainless-steel smoker chamber, pumping bellows as smoke rises.
- **Engineering Justification:** Illustrates the traditional chemical pacification procedure required prior to manual inspection.

#### 4. `SHOT-004_hive_opening.mp4`
- **Shot ID:** `SHOT-004`
- **Scene:** SCENE 01 — REAL-WORLD PROBLEM
- **Purpose:** Opening hive lid and inner cover.
- **Source:** USDA NRCS People's Garden Apiary (`20130522-NRCS-LSC-0226-v6`)
- **License:** Public Domain (17 U.S.C. § 105)
- **Permission Status:** `APPROVED`
- **Timecodes:** Source `00:01:44.000` to `00:01:47.500` | Duration: `3.46s` (83 frames @ 24 fps)
- **Format:** H.264 / AAC, 1920x1080, CRF 18
- **SHA-256:** `09864365fc94fb988220059537ce90c4c478a870716be0a08e1a140f0980c6c9`
- **Visual Description:** Beekeeper unseals inner cover of the upper Langstroth box with a hive tool, puffing gentle smoke into the seam to access the colony.
- **Engineering Justification:** Documents physical disturbance to internal hive temperature and humidity equilibrium caused by routine inspections.

#### 5. `SHOT-005_frame_removal.mp4`
- **Shot ID:** `SHOT-005`
- **Scene:** SCENE 01 — REAL-WORLD PROBLEM
- **Purpose:** Removing deep wooden frame from box.
- **Source:** USDA NRCS People's Garden Apiary (`20130522-NRCS-LSC-0226-v6`)
- **License:** Public Domain (17 U.S.C. § 105)
- **Permission Status:** `APPROVED`
- **Timecodes:** Source `00:02:04.500` to `00:02:08.500` | Duration: `3.96s` (95 frames @ 24 fps)
- **Format:** H.264 / AAC, 1920x1080, CRF 18
- **SHA-256:** `e41bb5938748d59a72dfd88a107849646b9a2a904005ba301fa3200ff3d93bfb`
- **Visual Description:** Direct overhead POV into the open Langstroth hive body as beekeeper pries propolis seal and lifts deep wooden brood frame vertically out of the box.
- **Engineering Justification:** Visually demonstrates the invasive mechanical extraction necessary to inspect colony health without remote telemetry.

#### 6. `SHOT-006_frame_inspection.mp4`
- **Shot ID:** `SHOT-006`
- **Scene:** SCENE 01 — REAL-WORLD PROBLEM
- **Purpose:** Hive entrance activity inspection.
- **Source:** USDA NRCS People's Garden Apiary (`20130917-NRCS-LSC-9001`)
- **Source URL:** [Wikimedia Commons File Page](https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130917-NRCS-LSC-9001).webm)
- **Creator:** USDA Natural Resources Conservation Service / Lance Cheung
- **License:** Public Domain (17 U.S.C. § 105)
- **Permission Status:** `APPROVED`
- **Timecodes:** Source `00:00:08.000` to `00:00:12.000` | Duration: `3.96s` (95 frames @ 24 fps)
- **Format:** H.264 / AAC, 1920x1080, CRF 18
- **SHA-256:** `cad92b94ee21e7d32c1c62ff9f0eb0bc115b81928a6f4fa6261541bcbe6fe1b1`
- **Visual Description:** 1080p close-up of active Italian honeybees arriving at the hive bottom entrance board, exhibiting heavy traffic and pollen foraging behavior.
- **Engineering Justification:** Highlights the deceptive nature of surface entrance activity, which fails to reveal internal brood collapse or swarming preparation until too late.

#### 7. `SHOT-007_brood_closeup.mp4`
- **Shot ID:** `SHOT-007`
- **Scene:** SCENE 01 — REAL-WORLD PROBLEM
- **Purpose:** Brood comb and honeybee close-up.
- **Source:** USDA NRCS People's Garden Apiary (`20130522-NRCS-LSC-0226-v6`)
- **License:** Public Domain (17 U.S.C. § 105)
- **Permission Status:** `APPROVED`
- **Timecodes:** Source `00:02:35.000` to `00:02:39.000` | Duration: `3.96s` (95 frames @ 24 fps)
- **Format:** H.264 / AAC, 1920x1080, CRF 18
- **SHA-256:** `60f32d57b7964e5c543f07a10682121e76550785eaae7b767d934bb614830159`
- **Visual Description:** High-definition macro video of nurse and worker honeybees crawling over capped brood cells, actively fanning wings and attending developing pupae.
- **Engineering Justification:** Establishes the physical biological entity that BEEVIL monitors: the brood cluster whose acoustic signals (200–400 Hz) and 35°C thermal stability represent core colony survival.

---

## 5. License Gate Audit & Blocked Candidate Log

To comply with Phases 3, 13, and 14 of the Master Video Loop, commercial candidates from standard YouTube uploads were analyzed, classified, and strictly blocked:

| Candidate ID | Source Title / URL | Creator | License Type | Decision | Rationale |
|---|---|---|---|---|---|
| `CAND-YT-001` | *Hive 1 Inspection - Marking the New Queen* (`faQO5Tm-P7g`) | Buzzing Bees & Critter Cams | Standard YouTube License | **BLOCKED** | Commercial copyright. No explicit Creative Commons reuse granted. |
| `CAND-YT-002` | *Conversion Hive 6 1/2 Week Inspection* (`BoG8ib35CFM`) | Suburban Sodbuster | Standard YouTube License | **BLOCKED** | Commercial proprietary rights. Reuse without written authorization is legally uncertain. |
| `CAND-YT-003` | *Hive 2 Inspection and Maintenance* (`7FutiKSymzk`) | Buzzing Bees & Critter Cams | Standard YouTube License | **BLOCKED** | Proprietary creator rights. Blocked by Phase 13 License Gate. |

---

## 6. BEEVIL Truth Gate Compliance

Every external video clip in this manifest is tagged as `FIELD CONTEXT / EXTERNAL REFERENCE FOOTAGE`. 
Narration and video presentation guidelines:
1. **Never state or visually imply that the BEEVIL Knievel sensor node is deployed in the USDA apiary.**
2. When transitioning from Scene 01 to Scene 02/03, the visual language must clearly delineate between historical/external beekeeping methods and the BEEVIL laboratory/bench-tested prototype.
3. The physical RAK4631 prototype footage must be titled: `"FIELD NODE PROTOTYPE — BENCH DEMONSTRATION"`.
