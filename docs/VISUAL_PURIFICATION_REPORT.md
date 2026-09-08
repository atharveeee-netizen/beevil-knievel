# 🛡️ BEEVIL KNIEVEL — Visual Evidence Purification Report
**Rule Standard**: Rule 30: Visual Evidence Purification & The Big Image Rule  
**Audit Date**: September 2026  
**Status**: Purified & Verified  

---

## 1. Visual Classification Framework
All project visual assets across the repository, README, web application, and presentation video are strictly classified under the four-tier evidentiary hierarchy:

1. **`REAL_EVIDENCE`**: Real physical hardware, laboratory electrometer logs, authentic USDA documentary footage, real software UI screenshots.
2. **`ENGINEERING_ARTIFACT`**: Deterministic MATLAB publication figures (`docs/figures/matlab/`), deterministic vector SVGs (`docs/media/diagrams/`), ANSYS simulation plots, and scientific Matplotlib charts.
3. **`GENERATED_EXPLANATION`**: Permissible only where real photographic evidence is physically impossible and when explicitly labeled as conceptual/simulated.
4. **`AI_SLOP / DECORATIVE`**: **PROHIBITED & PURGED**. Generic AI-generated hardware, fake PCB renders, speculative CAD mockups, and decorative cinematic wallpaper.

---

## 2. Purified Asset Registry (Removed / Replaced Assets)

| Asset Path | Original Classification | Purification Action | Technical Rationale | Authoritative Replacement |
|:---|:---:|:---:|:---|:---|
| `docs/media/hardware/field_node_rugged_enclosure.png` | AI_SLOP | **DELETED** | AI-generated photorealistic enclosure that does not reflect actual bench WisBlock hardware. | `docs/media/diagrams/04_field_node_enclosure_schematic.svg` (CAD dimensioned drawing) & `docs/figures/matlab/03_sensor_node.png` |
| `docs/media/hardware/field_node_rugged_enclosure.jpg` | AI_SLOP | **DELETED** | Duplicate JPEG compressed artifact of AI enclosure render. | `docs/media/diagrams/04_field_node_architecture.svg` |
| `docs/media/hero/beevil_knievel_hero_engineering.png` | AI_SLOP | **DELETED** | Cinematic AI-generated hero image with speculative glowing elements and non-physical geometry. | `docs/figures/matlab/01_system_architecture.png` (Canonical IEEE 3-Tier System Architecture) |
| `docs/media/hero/beevil_knievel_hero_engineering.jpg` | AI_SLOP | **DELETED** | Duplicate compressed artifact of AI hero. | `docs/figures/matlab/01_system_architecture.png` |
| `docs/media/acoustics/acoustic_transduction_concept.png` | AI_SLOP | **DELETED** | Conceptual AI illustration of hive interior with artistic soundwave overlays. | `docs/figures/matlab/05_acoustic_dsp.png` (Canonical 16 kHz $\to$ 2 kHz decimated DSP pipeline) |
| `docs/media/acoustics/acoustic_transduction_concept.jpg` | AI_SLOP | **DELETED** | Duplicate compressed artifact of conceptual audio graphic. | `docs/media/diagrams/03_acoustic_pipeline.svg` |
| `docs/media/sensing/langstroth_sensor_cutaway.png` | AI_SLOP | **DELETED** | Synthetic 3D cutaway showing decorative comb structures. | `docs/figures/matlab/02_hive_sensor_layer.png` & `docs/media/diagrams/02_langstroth_sensor_cutaway.svg` |
| `docs/media/sensing/langstroth_sensor_cutaway.jpg` | AI_SLOP | **DELETED** | Duplicate compressed artifact of synthetic cutaway. | `docs/media/diagrams/02_sensor_placement.svg` |
| `docs/media/apiary/commercial_apiary_context.png` | DECORATIVE | **DELETED** | Duplicate uncompressed copy of commercial apiary imagery. | `docs/media/02-apiary-problem/real_commercial_apiary.jpg` (Official USDA Natural Resources Conservation Service Public Domain photograph) |
| `docs/media/apiary/commercial_apiary_context.jpg` | DECORATIVE | **DELETED** | Duplicate compressed copy of apiary photo. | `docs/media/02-apiary-problem/real_commercial_apiary.jpg` |

---

## 3. Retained & Validated Evidence Inventory

### A. Real Evidence (`REAL_EVIDENCE`)
* `docs/media/02-apiary-problem/real_commercial_apiary.jpg`: USDA Natural Resources Conservation Service public domain photograph (Montana rangeland commercial apiaries).
* `docs/media/research/apiary/usda_beekeeper_inspection.jpg`: Authentic commercial frame inspection photo (USDA).
* `docs/media/research/brood/real_brood_nest_slice.jpg`: Biological cross-section of capped worker brood comb.
* `docs/media/research/brood/real_capped_worker_brood.jpg`: Macro photographic documentation of honeybee brood nest.
* `docs/media/research/hive/real_langstroth_hive_inspection.jpg`: Physical Langstroth frame inspection in ambient air.
* `docs/media/10-dashboard/dashboard_overview.png`: Genuine Next.js / FastAPI operational gateway dashboard interface.
* `docs/media/10-dashboard/mobile_field_console.png`: Genuine responsive field technician console PWA.
* `docs/media/10-dashboard/playdate_console.png`: Genuine 1-bit high-contrast transflective console UI.
* `docs/media/10-dashboard/dashboard_hive_detail.png`: Genuine deep brood telemetry inspector with 5-point thermal gradient.
* `report/page_1.png` & `report/page_2.png`: Genuine compiled IEEE HART Phase 2 project description report pages.

### B. Engineering Artifacts (`ENGINEERING_ARTIFACT`)
* `docs/figures/matlab/01_system_architecture.png` to `13_video_master_architecture.png`: 13 canonical MATLAB figures rendered with vector typography, pure white `#ffffff` canvas, IEEE aspect ratios, and explicit subsystem color coding.
* `docs/media/diagrams/00_system_hero_architecture.svg` to `08_full_cyber_physical_architecture.svg`: 12 deterministic, scalable vector SVG schematics.
* `docs/media/results/*.png`: 14 scientific validation plots generated deterministically from MATLAB/Python simulation scripts.
* `simulations/screenshots_for_judges/*.png`: Exact ANSYS Workbench simulation outputs (HFSS S11 return loss, Icepak thermal CFD, Mechanical drop shock stress, and Fluent aerodynamics).

---

## 4. Final Visual Gate Verification
- [x] All AI-generated hardware, enclosure, and hero renders permanently deleted.
- [x] Every README section adheres to **The Big Image Rule** (1 primary large, readable figure + optionally 1 supporting diagram).
- [x] Image count across README reduced to eliminate clutter and reading fatigue.
- [x] Zero tiny, unreadable technical schematics embedded in small multi-column tables.
- [x] Every visual claim strictly mapped to real measurements, deterministic artifacts, or mathematical models.
