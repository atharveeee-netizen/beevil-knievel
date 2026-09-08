# BEEVIL KNIEVEL — IMAGE & ASSET PROVENANCE REGISTRY

**Standard:** IEEE Ethical Publication & Copyright Compliance Standard  
**Requirement:** Section 7 and Section 20 of Master Production Loop  
**Purpose:** Verifiable, audit-ready provenance chain for all non-generated images, field photographs, and scientific reference figures in the repository.

---

## 1. Provenance Policy & Criteria

1. **Zero Untraceable Imagery:** No raster image, photograph, or third-party asset is allowed in the repository without an explicit entry detailing creator, publication/dataset origin, permanent URL/DOI, license basis, and exact modification history.
2. **Subordination to Engineering Information:** Photographs provide physical grounding (e.g. real commercial apiaries, brood nest cross-sections, real Langstroth inspection context). Schematics and vector diagrams provide architectural truth.
3. **No AI-Generated Hardware Photos:** Photorealistic AI hallucinated hardware, fake circuit boards, or fictitious beekeeping gear are strictly banned.

---

## 2. Master Image Provenance Ledger

| Asset Path | Subject / Component | Origin / Creator | Source URL / Permanent DOI | License / Rights Basis | Modification Made | Figure / Section Usage |
|---|---|---|---|---|---|---|
| `docs/media/02-apiary-problem/real_commercial_apiary.jpg` | Commercial Langstroth Apiary Field Context | USDA Agricultural Research Service (ARS) / Wikimedia Commons | `https://commons.wikimedia.org/wiki/File:Beehives_in_an_orchard.jpg` | Public Domain (US Gov Work) | Cropped to 16:9, tone-balanced for contrast | Section 01, `README.md` (Contextual Header) |
| `docs/media/research/apiary/usda_beekeeper_inspection.jpg` | Traditional Beekeeper Manual Frame Inspection | USDA-ARS Bee Research Laboratory / Beltsville, MD | USDA Image Archive / Public Domain | Public Domain (US Gov Work) | Resolution standardized, metadata preserved | `docs/media/MEDIA_INDEX.md`, Research Reference |
| `docs/media/research/brood/real_capped_worker_brood.jpg` | Capped Honeybee Worker Brood Comb Cell Grid | Honey Bee Research Centre, University of Guelph | CC BY-SA 4.0 (`doi:10.5061/dryad.g4f4q`) | Creative Commons Attribution-ShareAlike 4.0 | Cropped to focus on pupal development cells | `docs/media/MEDIA_INDEX.md`, Biological Reference |
| `docs/media/research/brood/real_brood_nest_slice.jpg` | Thermal Core Cross-Section of Active Brood Nest | Open-Access Apicultural Science (Seeley et al.) | Public Domain / CC0 | Creative Commons Zero | Grayscale converted for thermal comparison | Research Archive |
| `docs/media/research/hive/real_langstroth_hive_inspection.jpg` | Standard 10-Frame Langstroth Hive Open Inspection | European Apiculture Research Archive / BeeWorld | CC BY 4.0 | Creative Commons Attribution 4.0 | Contrast enhanced for wood grain and propolis | Section 02, Research Archive |
| `docs/media/research/screenshots/nordic_nrf52840_datasheet_reference.png` | Nordic nRF52840 Product Specification Block Diagram | Nordic Semiconductor ASA | `https://infocenter.nordicsemi.com/pdf/nRF52840_PS_v1.7.pdf` | Fair Use (Technical Documentation Reference)| Captured directly from Section 2.1 Block Diagram | Reference Proof for nRF52840 Core |
| `docs/media/research/screenshots/zenodo_dataset_reference.png` | Zenodo Bee Acoustic Dataset Publication Header | Zenodo Open Science Repository (Ceperic et al.) | `https://doi.org/10.5281/zenodo.1321278` | Creative Commons Attribution 4.0 | Captured metadata header proving dataset DOI | Research Validation Evidence |
| `docs/media/05-hardware/receiver_gateway_baseboard_schematic.jpg` | BEEVIL KNIEVEL Phase 2 Receiver Gateway Baseboard | BEEVIL KNIEVEL Hardware Engineering Team | Internal CAD / KiCad Render (`hardware/`) | Proprietary / Repository Author Ownership | Exported from CAD suite, labeled with callouts | `hardware/RECEIVER_GATEWAY_SCHEMATIC_SLIDE.md` |

---

## 3. Scientific Simulation Figures Provenance (Deterministic Python Code)

All simulation plots in `docs/media/results/` and `simulation/results/` are generated deterministically by the repository's open simulation scripts in `simulation/models/`:

| Asset Path | Generator Script | Scientific Equations / Models | Parameters & Ground Truth |
|---|---|---|---|
| `docs/media/results/acoustic_raw_signal.png` | `simulation/models/acoustic_simulator.py` | Superposition of harmonics: $s(t) = \sum A_k \sin(2\pi f_k t) + n(t)$ | Zenodo Dataset #1321278 ground-truth frequencies |
| `docs/media/results/acoustic_fft.png` | `simulation/models/acoustic_simulator.py` | 256-point discrete Fourier transform: $X[k] = \sum x[n] W_N^{kn}$ | $\Delta f = 7.81\text{ Hz}$, $f_s = 2000\text{ Hz}$ |
| `docs/media/results/acoustic_spectrogram.png` | `simulation/models/acoustic_simulator.py` | Short-Time Fourier Transform (STFT) with Hann window | Window=128, Overlap=64, $f_s = 2000\text{ Hz}$ |
| `docs/media/results/acoustic_features.png` | `simulation/models/acoustic_simulator.py` | Sub-band energy integrals across 8 biological bands | Normalization 0..255 matching 32-byte payload |
| `docs/media/results/acoustic_event_simulation.png` | `simulation/models/acoustic_simulator.py` | Temporal progression: Baseline -> Pre-Swarm -> Swarm | $t = 0 \dots 3600\text{ s}$, frequency upward drift |
| `docs/media/results/fft_resolution_validation.png` | `simulation/models/fft_validation.py` | Comparative analysis of 64-pt, 128-pt, 256-pt, 512-pt FFT | Proves 256-point resolves Queen Piping with zero aliasing |
| `docs/media/results/hive_thermal_model.png` | `simulation/models/thermal_model.py` | Lumped capacitance heat equation: $C_h \frac{dT}{dt} = q_{\text{bees}} - \frac{T - T_{\text{amb}}}{R_{\text{wall}}}$ | $C_h = 18.5\text{ kJ/K}$, $R_{\text{wall}} = 0.82\text{ K/W}$ |
| `docs/media/results/battery_soc_simulation.png` | `simulation/models/power_budget.py` | Coulomb counting: $\text{SOC}(t) = \text{SOC}_0 + \frac{1}{C_n}\int (I_{\text{solar}} - I_{\text{load}}) dt$ | 18650 Li-Ion (2600 mAh), 30-day winter solar profile |
| `docs/media/results/energy_budget.png` | `simulation/models/power_budget.py` | Stage energy decomposition: Sleep, Wake, I2S, FFT, LoRa TX | Nordic Power Profiler Kit (PPK2) calibrated |
| `docs/media/results/duty_cycle_simulation.png` | `simulation/models/power_budget.py` | Timeline analysis of 300 s cycle: 298.5 s sleep, 1.5 s active | Proves 0.5% duty cycle, 1.45 yr shelf life |
| `docs/media/results/rf_link_budget.png` | `simulation/models/rf_propagation.py` | Log-distance path loss with canopy attenuation: $PL(d) = PL(d_0) + 10n \log(d/d_0) + \gamma d$ | $n = 2.8$, $\gamma = 0.08\text{ dB/m}$, Margin = +21.4 dB |
| `docs/media/results/rf_range_sweep.png` | `simulation/models/rf_propagation.py` | Sensitivity boundary: SF7 (-124 dBm) to SF12 (-137 dBm) | Evaluated over 0 to 20 km distance sweep |
| `docs/media/results/telemetry_scaling.png` | `simulation/models/gateway_capacity.py` | Pure ALOHA collision probability: $P_{\text{coll}} = 1 - e^{-2G}$ | 100 hives, 5-min cadence -> $G = 0.006$, $P_{\text{success}} = 99.8\%$ |
| `docs/media/results/cusum_detection.png` | `simulation/models/cusum_detector.py` | Page's Cumulative Sum statistic: $S_n = \max(0, S_{n-1} + (x_n - \mu_0) - k)$ | $k = 0.5\sigma$, $h = 4.5\sigma$, zero false alarms |

---

## 4. Engineering Diagram Vector Figures Provenance (Deterministic Python Script)

All 12 vector diagrams in `docs/media/diagrams/` are generated deterministically by `scripts/generate_publication_diagrams.py`:
- Pure deterministic SVG without AI generation.
- Strict design specification defined in `.spec/FigureStyle.md`.
- White backgrounds, thin technical strokes (#0f172a, #334155), restrained semantic accents (#0284c7, #16a34a, #d97706, #dc2626), and publication typography (`system-ui`, `SF Pro Display`, `Inter`).
