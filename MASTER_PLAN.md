<USER_REQUEST>
# MASTER PLAN — Beevil Knievel → Q1 Journal Paper
*Instructions for the Antigravity agent. Prepared 22 Oct 2026 for Atharve Dahima, Srajan Mishra and Dr Vishal Sharma.*

---

## 0. Read this first

**Your role.** You are the engineering and research agent for this repository. Turn it into:
1. a clean, honest, reproducible research artifact; and
2. a submission-ready manuscript for a Q1 journal.

The humans will review everything when they return. They expect finished work at the standard below, with nothing invented.

**Hard constraint: the system will NOT be deployed in a real apiary.** There will be no field trial. All evidence must come from:
1. **real public field datasets** that others recorded in real hives (audio, temperature, humidity, colony inspections);
2. **bench measurements on the real hardware** (RAK4631 node, gateway), done by the humans using scripts you write;
3. **analytical models**, clearly labelled as models.

Never write or imply that the system was deployed, field-tested or validated in a hive.

**How to work.**
- Run the phases in Section 14 in order. Do not start Phase 5 (training) until Phases 2–4 have been accepted.
- After every task, update `paper_q1/PROGRESS.md`: what was done, which files changed, what comes next, and any blockers.
- Record every judgement call in `paper_q1/DECISIONS.md`: what you decided, why, and which alternatives you rejected.
- Some tasks are marked **[HUMAN]** because they need a person or physical hardware. For each one:
  - write the scripts, the firmware and a step-by-step checklist in `paper_q1/human_tasks/`;
  - then continue with the next unblocked task;
  - never simulate, estimate or guess what a [HUMAN] task would produce.
- The humans use Windows. Everything must run on Windows (PowerShell) and on Linux:
  - use `pathlib` and no hard-coded paths;
  - do not write bash-only scripts;
  - provide a single cross-platform entry point: `python -m paper_q1.run <step>`.
- The repo may contain `paper/` from the previous session (the IEEE conference version, with `paper/analysis/*.py` and `paper/results/*.json`). If it does:
  - reuse those analysis scripts;
  - leave the conference paper itself untouched.

  All journal work goes into a new folder, `paper_q1/`.

---

## 1. Non-negotiable rules

1. **No invented numbers.**
   - Every number in the manuscript must be produced by a script in the repo and stored in `paper_q1/results/*.json`.
   - The manuscript reads numbers only from an auto-generated `paper_q1/manuscript/numbers.tex`. That file holds `\newcommand` macros written by `python -m paper_q1.run numbers`.
   - Never type a result into the .tex by hand.
2. **No targets disguised as results.** Remove these numbers everywhere unless a script in the repo reproduces them: "92.4 % F1", "2.49 ms", "80 µJ", "94.2 % → 93.1 %", "96.84 %", "18 µA", "4.2 km", "15 km".
3. **No AI-generated images** anywhere in the paper or README, whether as figures, evidence or decoration. Only these are allowed:
   - plots generated from code;
   - real photos taken by the authors;
   - diagrams drawn in TikZ, draw.io or Inkscape whose labels match measured or specified values.
4. **Provenance tags.**
   - Every dataset, result file and figure carries exactly one tag: `REAL_PUBLIC_DATASET`, `REAL_BENCH_MEASUREMENT`, `ANALYTICAL_MODEL`, `SIMULATED` or `SYNTHETIC_FIXTURE`.
   - Keep `paper_q1/FIGURE_PROVENANCE.md` and `paper_q1/RESULT_PROVENANCE.md` up to date.
5. **Test data is sacred.**
   - None of the following may use outer-test data: tuning, feature selection, threshold picking, early stopping, calibration or model choice.
   - Splits are frozen and hashed before any training (Phase 3).
6. **No fake citations.**
   - Check every reference online: the DOI must resolve or the arXiv ID must exist, and the title, authors, venue and year must match.
   - Log each check in `paper_q1/manuscript/refs_verification.csv` with the bibkey, DOI/URL, date checked and the claim it supports.
   - Never cite from memory.
7. **Negative results stay in.**
   - If a model fails on unseen hives, report it.
   - Never re-run with different seeds or splits until a result looks good.
8. **Git safety.**
   - Work on a new branch, `q1-journal`, with small commits and clear messages.
   - Never force-push, rewrite history or push to the remote. The humans approve pushes.
   - Never delete files. Move them to `archive/` with a README explaining why.
9. **Data hygiene.**
   - Raw datasets live in `data/`, which is gitignored. They never go into git.
   - For every file, record SHA-256, size, URL, licence and download date in `data/MANIFEST.csv`.
   - Respect each dataset's licence.
10. **Log every run** to `paper_q1/runs/`, including: git commit hash, package versions, seed, hardware (CPU/GPU/RAM), wall-clock time and config.
11. **When blocked**, record the blocker in PROGRESS.md and move on to the next unblocked task. Never fill a gap with a plausible-looking value.
12. **Tone.** Do not use words like "world-class", "revolutionary", "guarantees" or "outperforms SOTA" unless a statistical test supports that exact claim.

---

## 2. Corrections to the earlier "Q1 blueprint" (do NOT follow these parts of it)

| Blueprint item | Problem | Do instead |
|---|---|---|
| "Quantized 1D-CNN achieves 92.4 % F1, 2.49 ms, 80 µJ" and "94.2 % → 93.1 %" | These are targets written as results before any experiment. | Measure, then report whatever comes out. |
| "Zenodo 1321278 (~700 WAVs)" | The record holds 78 annotated recordings (~12 h) from OSBH and NU-Hive, with bee / no-bee annotations. Clip counts depend on how you segment. | Use it for bee vs. non-bee (T2). De-duplicate it against BeeTogether. |
| "Zenodo 3942006: 12 months of weight, temperature, acoustics" | Could not be verified. | Use MSPB (Section 5, D4) for long-term temperature and audio features. |
| "p < 0.001, Wilcoxon over 5-fold CV" | With n = 5 paired folds, the smallest possible two-sided Wilcoxon p is 2/2⁵ = 0.0625. | Use the tests in Section 11: corrected resampled t-test, Bayesian correlated t-test, Friedman–Nemenyi, bootstrap CIs. |
| "PDR vs. distance through canopy, 100–1500 m, SF7 vs SF10" | Impossible without a field deployment. | Run a conducted PER-vs-attenuation bench test and build a link-budget model labelled "modelled" (Section 9.4). |
| SOTA "competitive matrix" (Nolasco, Kulyukin, Zgank, Cecchi/HOBOS, "Terahertz radar") | Several venues, years, methods and power figures could not be verified as written. | Rebuild the related-work table from verified sources only (Section 10.1). |
| "1D-CNN on 8 band energies" | Eight numbers do not form a sequence. | Use MLP/LogReg/GBM on band vectors; a 1D-CNN/GRU only over a *time sequence* of band frames; DS-CNN on log-mel for the on-device neural net. |
| "Ablation with CO₂" | No public labelled dataset with in-hive CO₂ was found. | Run the modality ablation on MSPB (audio features vs. temperature/RH) and on SBCM (audio vs. hive environment). |
| "IEEEtran double-column" | The template depends on the journal. | Elsevier → `elsarticle`. IEEE → IEEEtran journal. |
| "PG-7 hermetic", "NIST-traceable TMP117", "$64.54 BOM", "18 µA sleep" | Not measured or documented. | State only what you can document: BOM with vendor and date, PPK2-measured sleep current, 2-point temperature check. |
| "This guarantees Q1 acceptance" | Nothing guarantees acceptance. | Rely on rigour, honesty, clear novelty and reproducibility. |

**Keep from the blueprint:**
- train on real public data;
- MFCC-SVM and CNN baselines;
- DWT cycle counts and µJ per inference;
- FP32 vs. INT8 comparison;
- an acoustic-only benchmark with the ΔT confound removed;
- removal of absolute paths;
- retirement of the synthetic-sine firmware.

---

## 3. The paper: thesis and contributions

**Working title** (finalise after results): *Hive-independent, edge-deployable acoustic–thermal colony monitoring on a LoRa node: a leakage-safe multi-dataset benchmark with measured on-device cost.*

**The gap.** These sources are verified; cite them and re-verify. Bee-audio papers often report ~99 % accuracy with random splits, but performance drops sharply when whole hives are held out.
- **Bricout et al., "Bee Together", *Sensors* 2024, 24(18):6067, doi:10.3390/s24186067.** A mel-CNN scores 99.2 % on a random split. Under leave-one-hive-out, its per-hive accuracy ranges from 34 % to 84 %.
- **Abdollahi et al., arXiv:2607.20386 (2026).** Colony strength on UrBAN: r ≈ 0.97 with a random split vs. r = 0.78 ± 0.17 hive-independent.
- **Recent edge/TinyML bee papers do not use hive-independent splits:**
  - De Luca & Donati, arXiv:2509.14061: LightGBM on STM32, 4 hives, and the authors state that the same hive appears in both training and test data.
  - Harshit et al., arXiv:2509.17800: CNN on Kaggle beehive-sounds, with no hive grouping.
  - Ormeño-Arriagada et al., *Insects* 2026, 17:547, doi:10.3390/insects17060547: ~0.70–0.73 accuracy, and the split is not clearly hive-independent.
  - The survey by Sucipto et al., arXiv:2509.08822, notes that benchmarking practice varies widely.
- **Our gap.** No work was found that combines all three of:
  1. hive-independent and cross-dataset evaluation;
  2. features that a LoRa MCU node can actually compute;
  3. measured on-device latency and energy, plus telemetry cost.

  Re-check this with a fresh literature search (Section 10.1) before writing.

**Contributions.** C1, C2 and C5 are mandatory. C3 and C4 are strongly recommended.
- **C1 — Leakage-safe benchmark.**
  - Unseen-hive and cross-dataset evaluation on at least 2 tasks and at least 3 public datasets.
  - Compare node-computable features (8-band log-relative energies) against MFCC, a log-mel CNN and pretrained-embedding upper bounds.
  - Quantify the gap between random-split and unseen-hive results.
- **C2 — Measured on-device cost** on the real RAK4631 (nRF52840):
  - flash and RAM;
  - latency (DWT cycles);
  - energy per inference and per report (PPK2).

  From these, build the Pareto front of balanced accuracy vs. µJ vs. bytes on air.
- **C3 — Hardware-in-the-loop acoustic replay.** Real hive recordings are replayed through the node's own microphone and DSP chain. Measure:
  - fidelity of on-node features against reference features;
  - agreement between on-device and offline decisions, including under gain changes.
- **C4 — Within-hive change detection.**
  - Recalibrate Page-CUSUM on real in-hive temperature from MSPB (53 hives, one year).
  - Report the real-data in-control run length and detection examples.
  - Compare change detection with absolute classification under hive shift.
- **C5 — Telemetry and energy co-design.** Cover:
  - frame v2 (flags + sequence number);
  - airtime;
  - ALOHA capacity;
  - bench PER vs. attenuation;
  - an energy budget built from measured currents.

**The paper must explicitly say it does NOT:**
- include a field deployment;
- validate the full node inside a hive;
- validate CO₂ sensing;
- claim long-term field battery life.

---

## 4. Repository audit: flaws to fix (Phase 1)

Fix each item, commit it separately, and record the before and after in `paper_q1/AUDIT_FIXES.md`.

### 4.A Unsupported or fabricated claims
1. **`frontend/src/app/layout.tsx`** says "96.84% Out-of-Sample Accuracy". Remove it.
2. **"4.2 km"** appears in:
   - `frontend/src/components/HeroSection.tsx`, `DualRadioNetworkSection.tsx`, `ResultsSection.tsx` and `ValidationEvidenceSection.tsx`;
   - `MATLAB_FIGURE_INDEX.md`;
   - `matlab/generate_figures.py`.

   Replace it with the modelled range from the link-budget script, state the antenna heights, and label it "modelled".
3. **Unmeasured labels:** "94.2 % validation accuracy", "18 µA [MEASURED]", "0 False Negatives" and "[VALIDATED]". They appear in `matlab/generate_figures.py`, `MATLAB_FIGURE_INDEX.md` and `docs/`. Remove them until measured, then regenerate those figures.
4. **`Cloud Model/build_cloud_model.py`** saves synthetic Gaussian data as `IEEE_Verified_Hive_Dataset.csv`.
   - Rename the file to `synthetic_fixture_hive_dataset.csv` and tag it SYNTHETIC_FIXTURE.
   - The cloud random forest is a demo, not a result.
5. **Overclaiming gateway modules:** `gateway/noise_filter.py`, `gateway/local_llm_advisor.py` and `gateway/phenotypic_forecaster.py`. Their docstrings present rule-based logic as trained or validated. Rewrite the docstrings to describe what the code actually does, or archive the modules.
6. **Hard-coded simulation results:** `simulations/run_all_ansys_simulations.py` and `simulations/master_ansys_results.json`. Several values contradict the genuine solver screenshots.
   - Archive both with a README stating "hard-coded, not solver output".
   - Keep the genuine ANSYS artifacts: `solve.out` and the GUI screenshots.
   - The HFSS lumped port touches only one conductor. Either [HUMAN] fixes it and re-runs ANSYS, or the paper drops all antenna-simulation claims.
7. **AI-generated images.** Move these to `archive/ai_generated/` with a README:
   - `simulations/SIM*/SIM*_Generated_Result.jpg`
   - `proposal/images/infographic_*.png`
   - in `docs/figures/`: `kpi_results_dashboard.png`, `power_energy_infographic.png`, `competitive_technology_comparison.*`, `hardware_wiring_architecture.*`, `master_architecture_diagram.*`, `dual_tier_ai_architecture.png`, `system_pipeline_flowchart.png`, `problem_statement_visual.png`, `apiary_scalability_topology.*`
   - `docs/media/sensing/*`

   Update every README and doc that embeds them.
8. **`TinyML Model/run_full_zenodo_real_benchmark.py` has a label leak.**
   - Its manifest lists 14 hand-picked Zenodo clips, which are downloaded at run time and are gitignored.
   - It hand-sets `delta_t` to 9.5–11.5 °C for the 9 healthy clips and to 3.8–4.2 °C for the 5 queenless clips.
   - `classify_hive_state_tinyml` returns THERMAL_STRESS_WARNING whenever `delta_temp < 5`. The benchmark then scores THERMAL_STRESS_WARNING as a correct "anomaly" for the queenless clips.
   - So every queenless clip is "detected" because of the hand-typed temperature, not the audio.
   - Fourteen hand-picked clips are also far too few to evaluate anything.

   Archive this benchmark. Phase 5 replaces it.
9. **Synthetic stress-test audio.**
   - `TinyML Model/datasets/sample_bee_audio/generate_synthetic_bee_wavs.py` generates the `stress_*.wav` files at run time. Only the generator is tracked; the WAVs are gitignored.
   - Move the generator to `tests/fixtures/` and tag its output SYNTHETIC_FIXTURE.
   - Keep that output out of every reported result. Any benchmark that uses it is a software test, not evidence; check `run_stress_test_benchmark.py` and `run_level1_testing.py`.
10. **Old manuscripts:** `proposal/main.tex`, `submission/hart_phase2_report.tex` and `report/` contain the unsupported numbers. Do not reuse any of those numbers.

### 4.B Firmware and gateway correctness
11. **Alert-flag collision.**
    - The firmware ORs 0x80/0x40/0x20/0x10 (CUSUM, pre-swarm, low SoC, tamper) into the tilt byte.
    - `gateway/server.py` reads that byte as degrees. `tilt > 15` triggers "theft", and the Pydantic limit `le=90` returns HTTP 422, so the frame is dropped.

    **Fix with frame v2:** add a dedicated `uint8 flags` and a `uint16 seq`, making the frame 36 bytes.
    - At SF7/BW125/CR4/5 (explicit header, CRC on), airtime is 77.06 ms, the same as 35 bytes. Recompute it with the airtime script.
    - Update `firmware/src/main.cpp`, `gateway/lora_receiver.py` (`PAYLOAD_FORMAT`), `gateway/server.py`, the tests and the docs.
    - The gateway must accept both v1 and v2 frames, distinguished by length or a version field.
12. **CUSUM.**
    - **Current problems:**
      - In `firmware/config/algorithm_config.h`, k = 0.15 and h = 1.2 are in °C per sample.
      - The baseline is latched from the first 3 samples.
      - The decay runs at half rate, which is non-standard.
      - Result: on autocorrelated brood temperature the detector false-alarms within hours (see `paper/analysis/cusum_mc.py`).
    - **Replace it with standard Page CUSUM:**
      - run it on residuals from a robust rolling baseline (e.g., a 24 h median);
      - set parameters in physical units (°C, hours) and convert them per sampling interval;
      - calibrate on MSPB (Phase 7.3).
    - **Parity:** use the same code path in C and Python, with shared test vectors.
13. **Acoustic features are gain-dependent.**
    - `TinyML Model/bee_acoustic_classifier.py` probes single frequencies with a DFT over the first 1000 samples, then applies an absolute `ENERGY_THRESHOLD = 5.0`.
    - Accuracy therefore collapses when the input level drops.

    Fix:
    - integrate FFT bands with a Hann window, Welch-averaged over at least 1 s;
    - use the log of relative band energies (band / total);
    - add total log-energy as a separate feature.
14. **The FFT configuration is inconsistent.** Files disagree on the size (128/256/512 points) and the sample rate (2 vs 16 kHz). Use one spec:
    - capture at 16 kHz;
    - anti-alias FIR, then decimate ×4 to 4 kHz;
    - 512-point real FFT (7.81 Hz bins), Hann window, 50 % overlap;
    - band edges: keep the 8 bands from `firmware/config/sensor_config.h` and document them, plus an ablation with 8 log-spaced bands from 50 to 2000 Hz.
15. **Synthetic audio in firmware.** `firmware/sensor_node/src/beevil_nrf52_freertos.c` synthesises audio with `sinf` (lines 88–89). Move it to `firmware/legacy_sim/` and never describe it as firmware.
16. **Simulated LoRa transmitter.** `firmware/beevil_rak4631_transmitter/beevil_rak4631_transmitter.ino` only fakes a "LoRa Transmission Burst Simulation" (an LED plus `delay(60)`) and hard-codes the FFT bands.
    - Archive it.
    - The canonical firmware is `firmware/src/main.cpp`, and it must transmit real LoRa frames.
17. **Sensor placeholders in `main.cpp`**, e.g. `co2_ppm = has_scd41 ? 1150 : 0xFFFF`.
    - Replace them with real driver reads.
    - If a sensor is absent, send the sentinel.
    - Never send constant fake values.
18. **Gateway receiver.**
    - The SPI receive loop in `gateway/lora_receiver.py` is just `pass`.
    - The gateway's Waveshare HAT (Ebyte E22-900T22S) is a UART module, so implement UART reception.
    - For bench work, a second RAK4631 acting as a USB-serial receiver is acceptable.
19. **Tests.** Files in `tests/` re-implement the logic with constants that differ from the firmware. Tests must import constants from the single spec and exercise the real code.
20. **Single source of truth.**
    - Create `spec/beevil_spec.yaml` covering: frame layout, sentinels, sampling, FFT, bands, CUSUM parameters, radio parameters and battery.
    - Generate these files from it with `python -m paper_q1.run spec`:
      - `firmware/config/beevil_spec_gen.h`
      - `gateway/beevil_spec.py`
      - `paper_q1/manuscript/spec.tex`
    - Resolve the existing inconsistencies:
      - battery capacity: 1000 / 2600 / 3000 mAh;
      - payload: 32 / 33 B;
      - airtime: 18.2 / 61.7 / 71.94 ms. The correct value is 71.94 ms for 33 B at SF7/BW125/CR4/5.

### 4.C Repository hygiene
21. **Absolute Windows paths.** These files contain them:
    - `scripts/verify_repo_integrity.py`
    - `scripts/create_simulink_models.py`
    - `scripts/audit_readme_assets.py`
    - `scripts/generate_publication_diagrams.py`
    - `simulation/matlab/run_simulations.py` (line 17, `base_dir`)
    - `docs/WORKING_PROTOTYPE_PRESENTATION_SCRIPT.md`

    Make them repo-relative with `Path(__file__).resolve().parents[n]`.
22. **Hard-coded output folder in `simulation/matlab/run_simulations.py`.**
    - Line 17 sets `base_dir = r"C:\Users\25beevdt047\.gemini\antigravity-ide\scratch\beevil-knievel"`.
    - On any other machine, the script writes its figures to the wrong place. On Linux/macOS that string is not an absolute path, so the script creates a new folder literally named after it inside the current directory.
    - Item 21 fixes this. After that fix, run the script once from a clean clone and confirm that `git status` shows no stray folders.
23. **Large binaries tracked in git:**
    - `assets/video_sources/**/*.mp4`
    - `docs/media/video/*.mp4`
    - `simulations/sim 1 workbench_files/**/SYS.mechdb`
    - `Cloud Model/cloud_advisor_model.joblib`

    Fix:
    - stop tracking new copies;
    - propose moving the videos to a GitHub Release or Zenodo;
    - have scripts regenerate the models;
    - do not rewrite history without approval.
24. **CI.** `.github/workflows/ci.yml` downloads Zenodo data.
    - CI should run only offline unit tests plus a 2-minute smoke run on fixtures.
    - Heavy steps run locally via `python -m paper_q1.run all`.
25. **Commit history.** The repo has a single commit.
    - From now on, make meaningful commits.
    - At submission, tag `v1.0-journal` and archive the release on Zenodo for a DOI.
26. **Untracked files.** Make sure `gateway/beevil_telemetry.db`, `logs/*.csv` and `__pycache__/` are untracked. They are in `.gitignore`; confirm with `git ls-files`.
27. **Rewrite `README.md` and `LIMITATIONS.md`** with an evidence table. For each claim give its status (measured / modelled / simulated / not yet done) and the source file.

---

## 5. Datasets (Phase 2)

- Put download scripts in `paper_q1/data_tools/`.
- Store raw data under `data/raw/<name>/` and log every file in `data/MANIFEST.csv`.
- Check free disk space first; you need about 60 GB. If there is less, stream the data: download one part, extract features, keep the checksums, then delete the raw part.

| ID | Dataset | Content (as published) | Use | Caveats |
|---|---|---|---|---|
| D1 | **BeeTogether**: Bricout et al., *Sensors* 2024, 24(18):6067. The joined set is on Kaggle; take the exact link from the paper's data-availability section. | NU-Hive (2 hives), OSBH (4), SBCM (4) and TBON-derived (6) hives. Resampled to 8 kHz, cut into 2-s clips, ≈396 k clips, labelled queen / no-queen, with a `groupID` per hive. | **Primary queen task (T1)** with unseen-hive splits. | The label is constant within many hives, so hive ≈ label. Its audio overlaps D2 and D3, so never treat those as independent test sets. |
| D2 | **Zenodo 1321278**, "To bee or not to bee" (Nolasco & Benetos, DCASE 2018 workshop). | 78 recordings, ~12 h, from OSBH and NU-Hive, with bee / no-bee annotations (.lab). | **T2: bee vs. non-bee gating.** | Shares source recordings with part of D1. |
| D3 | **SBCM**: Kaggle "Smart Bee Colony Monitor: Clips of Beehive Sounds" (`annajyang/beehive-sounds`). | 4 hives in California, ≈7,100 clips (per arXiv:2509.17800). ESP32 + INMP441 audio. Columns for hive temperature, humidity and pressure plus weather. Queen-status classes. | **T3: audio + environment fusion**, and the modality ablation. | Rare queenless class, missing values, strong hive and time confounds. |
| D4 | **MSPB**: *Scientific Data* 2024, doi:10.1038/s41597-024-03695-1. Data on Zenodo, doi:10.5281/zenodo.11398835. The GitHub README links 10.5281/zenodo.8371700 instead, so check which is current. | 53 hives in 2 apiaries (Québec), Apr 2020–Apr 2021. Sensor on top of the central brood frame. Temperature and RH every 15 min. Audio *features* every 5 min (hive power, band-density ratio, density variation, 16 band coefficients); no raw audio. Inspections roughly every 2 weeks: frames of bees, brood, Varroa, queen cells, winter survival. About 500 MB in 4 CSVs. | **T4** (survival, colony strength, queen cells) with node-like features. **C4** CUSUM calibration on real brood temperature. | Published baselines, to be compared only under the same protocol: survival AUC 0.730; strength balanced accuracy 65.8 %; queen-cell AUC 0.646. |
| D5 | **UrBAN**: Abdollahi et al., *Scientific Data* 2025, arXiv:2406.03657. Data on FRDR, doi:10.20383/103.0972. | Montréal rooftop apiary, ~9–10 hives, 2021–2022. Over 2,000 h of raw audio (the 2026 paper reports over 3,000 h), plus temperature/humidity and inspections. | OPTIONAL T5: colony strength, hive-independent. Compare with arXiv:2607.20386. | Very large; use a subset only. |
| D6 | **Sudden queen loss**: Rodrigues, de Melo, Gomes (WCAMA). Mendeley Data doi:10.17632/j97khfj656.1, CC BY 4.0. | One Africanized colony over 6 days; the queen was removed on day 6. 23 extracted features (3 time, 5 spectral, 13 MFCC), 5,400 rows. | OPTIONAL within-hive change-detection case study: ARL₀ on days 1–5, detection delay on day 6. | Single hive, so case study only. Check whether raw audio exists. |
| — | Repo WAVs in `TinyML Model/datasets/sample_bee_audio/` | Synthetic. | Unit tests only. | Never in results. |

[HUMAN] Create a Kaggle account and API token (`kaggle.json`), and accept each dataset's terms.

### 5.1 Data audit: mandatory before any training

Produce `paper_q1/results/data_audit/` and `paper_q1/DATASHEET.md`, following Gebru et al., "Datasheets for Datasets".

- **Per-dataset counts:**
  - hives, recordings, total duration;
  - sample rates, channels, devices;
  - clip counts per label × hive × date × hour of day.
- **Confound matrix.**
  - Cross-tabulate each label against hive, date, device and time of day.
  - State explicitly when a label is (almost) fully determined by hive or date. In that case:
    - a random split is meaningless;
    - leave-one-hive-out is meaningful only for hives that actually contain the class.
- **Duplicate detection** across D1, D2 and D3.
  - Use a hash of the resampled audio plus a near-duplicate check on log-mel fingerprints.
  - Remove every overlap from any cross-dataset test.
- **File-quality checks:** silence, clipping, DC offset, corrupted files and sample-rate anomalies.
- **Feasibility.** Decide which tasks are feasible and record the decision in DECISIONS.md.

---

## 6. Tasks and protocols (Phase 3: freeze these before training)

**Tasks**

| ID | Task | Data |
|---|---|---|
| T1 | Queen present vs. absent (audio) | D1, with D3 as the cross-dataset test |
| T2 | Bee vs. non-bee | D2 |
| T3 | Queen status from audio + hive environment | D3 |
| T4 | Winter survival (hive level); colony strength (≥ 20 frames of bees, as in the MSPB paper); queen-cell presence. All from band features + temperature/RH. | D4 (MSPB) |
| T5 (optional) | Colony strength | D5 |
| CD | Change detection | MSPB temperature, plus D6 acoustic data |

**Protocols**
- **P-A, unseen hive (primary).**
  - `StratifiedGroupKFold` with group = hive and k = 5. Use leave-one-hive-out when a task has 8 hives or fewer.
  - Repeat 3 times with seeds 0, 1 and 2, giving 15 outer splits.
  - Every model uses identical folds, so comparisons are paired.
- **P-B, cross-dataset.** Train on one source and test on another, after de-duplication. Examples: NU-Hive + OSBH → SBCM; SBCM → NU-Hive.
- **P-C, random segment split.** Use it only to reproduce the optimistic setting common in the literature and to quantify the gap. It is never the headline number.
- **P-D, time-blocked** (MSPB/UrBAN). Train on earlier months and test on later months, combined with hive grouping.
- **Leakage rules:**
  - segments from one recording never cross folds;
  - overlapping windows never cross folds;
  - every scaler, normaliser and feature selector is fitted on the training fold only.
- **Hive-adaptive normalisation** is a separate, explicitly named method variant: z-scoring each hive's features against that hive's own earlier, unlabelled data. Report it separately and never mix it into the baselines.
- **Freeze the splits.** Save every split to `paper_q1/splits/<task>.json` with its SHA-256, and commit it **before** any training.

**Metrics**
- **Primary:** balanced accuracy.
- **Also report:**
  - macro-F1, AUROC, AUPRC (minority class);
  - sensitivity and specificity;
  - per-hive accuracy and confusion matrices;
  - calibration (ECE, Brier).
- **Regression:** MAE, Pearson r and Spearman ρ.
- **Change detection:**
  - in-control average run length (ARL₀, in days);
  - detection delay;
  - false alarms per hive-month.

**Pre-registration.** Before training, commit `paper_q1/PREREGISTRATION.md` covering:
- tasks and primary metric;
- primary comparison (e.g., "F0 + LightGBM vs. MFCC-SVM vs. DS-CNN under P-A on T1");
- protocols, stopping rules and statistical tests.

Later deviations are allowed only if they are logged with a reason.

---

## 7. Features (Phase 4)

- **F0: node features.**
  - Write a Python reference that is numerically faithful to the firmware, following the spec in 4.B item 14.
  - Features: 8 log-relative band energies and total log energy, plus spectral centroid (optional).
  - **Golden test.** Generate test vectors in Python and run them through the firmware feature code, either on the device or in a host build with CMSIS-DSP. Maximum relative error must be ≤ 1e-3.
- **F0b: band variants.** 16 bands (matching MSPB's 16 band coefficients), plus the log-spaced ablation.
- **F1: MFCC.** 20 MFCC + Δ + ΔΔ, with mean and std per clip. This is the MFCC-SVM baseline.
- **F2: log-mel.** 40 mel bands, 25 ms window, 10 ms hop at 8 kHz. This is the DS-CNN input.
- **F3: pretrained embeddings.** These are an upper bound and are not deployable.
  - Use frozen PANNs CNN14 or YAMNet.
  - Resample to whatever rate each model needs.
- **Clip length.**
  - 2 s is primary, matching BeeTogether.
  - Report-level aggregation is the mean probability over the clips in a 60-s window. This is what the node does per report.
  - Sensitivity check at 1 s and 5 s.
- **Processing.**
  - Resample with a polyphase filter (`scipy.signal.resample_poly` or soxr).
  - Cache features as Parquet under `data/features/`, keyed by a config hash.

---

## 8. Training: order, settings and when to stop (Phase 5)

**Check the environment first.**
- Log CPU, RAM and GPU (`torch.cuda.is_available()`).
- Everything must run on CPU; use a GPU if one is present.
- Use Python 3.11 and pin versions in `requirements-lock.txt`.
- Libraries:
  - numpy, scipy, pandas;
  - librosa or torchaudio;
  - scikit-learn, lightgbm, optuna;
  - TensorFlow/Keras 2.x for deployable neural nets (→ TFLite → TFLM);
  - PyTorch only for PANNs embeddings.

### 8.1 Order (strict)
0. **Pipeline sanity.**
   1. A model must be able to overfit 64 training samples. This proves the pipeline works.
   2. **Label-shuffle test:** train with shuffled labels under P-A. The result must be ≈ chance. If it is not, there is leakage — stop and fix it.
1. **Floors:** majority class and stratified random.
2. **"Before" baseline.** Evaluate the current repo heuristic unchanged on the same folds. That is the thresholds in `gateway/server.py` and `TinyML Model/bee_acoustic_classifier.py`.
3. **Classical models on F0** (node features): logistic regression, random forest, LightGBM and a small MLP.
4. **Literature baselines:** MFCC + SVM-RBF, and LightGBM on F1.
5. **DS-CNN on F2.** Use the Hello Edge DS-CNN-S, plus a smaller variant with half the channels ("XS").
6. **Temporal model on F0 sequences** (optional): a 1D-CNN or GRU over about 30 consecutive band frames.
7. **Upper bound:** F3 embeddings + logistic regression or an MLP.
8. **Fusion** (T3, T4):
   - early fusion: LightGBM on F0 + environment features;
   - late fusion: combine the audio and environment probabilities.
9. **Hive-adaptive normalisation** variant for the two best deployable models.
10. **Quantisation** of the deployable models.
    - Start with INT8 post-training quantisation.
    - If balanced accuracy drops by more than 1 percentage point vs. FP32, run quantisation-aware training.
11. **Calibration:** temperature scaling on inner-validation data.
12. **Final outer-test evaluation, run once.** Freeze the results and write `paper_q1/results/main_results.json`.

### 8.2 Hyper-parameter search
The search is nested: it runs only inside each outer training fold.

**Inner split.** `StratifiedGroupKFold(k = 3)` by hive, inside the outer training set. If there are fewer than 3 hives, use a time-blocked inner split.

**Classical models.**
- Use Optuna TPE: one study per (task, model, outer fold), seeded.
- Each study stops at **40 trials or 20 min, whichever comes first**.

| Model | Search space |
|---|---|
| LogReg | C ∈ [1e-3, 1e2] (log); class_weight = balanced |
| RF | n_estimators ∈ {100, 200, 400}; max_depth ∈ {4…20, None}; min_samples_leaf ∈ [1, 20]; max_features ∈ {sqrt, 0.3, 0.6}; class_weight = balanced_subsample |
| LightGBM | num_leaves [8, 64]; learning_rate [0.01, 0.2] (log); up to 2,000 trees with early stopping at 50 rounds on inner validation; min_child_samples [10, 100]; feature_fraction [0.5, 1]; bagging_fraction [0.5, 1]; lambda_l2 [1e-3, 10] (log); class weights |
| SVM-RBF | C [1e-2, 1e3] (log); gamma [1e-4, 1] (log); StandardScaler inside the pipeline |
| MLP | hidden ∈ {(32), (64), (64, 32)}; alpha [1e-5, 1e-2] (log); early_stopping = True |

**Neural nets.** Use a small grid to keep time bounded.
- Grid: lr ∈ {1e-3, 3e-3} × dropout ∈ {0.1, 0.3} × size ∈ {S, XS} = 8 configs.
- Train each config on the inner split for at most 30 epochs, with patience 5.
- Pick the config with the best mean inner balanced accuracy.

### 8.3 Neural-net training settings
- **Optimiser:** AdamW, weight decay 1e-4, batch 128.
- **Schedule:** ReduceLROnPlateau (factor 0.5, patience 3) or cosine decay.
- **Loss:** cross-entropy with inverse-frequency class weights, computed on the training fold.
- **Balancing:** at most 2,000 clips per hive per class per epoch, so large hives do not dominate.
- **Augmentation:** applied to training data only, after splitting.
  - random gain ±6 dB;
  - time shift;
  - mixing with non-bee segments from training hives only, at SNR 0–20 dB;
  - SpecAugment: 2 frequency masks of ≤ 5 bins and 2 time masks of ≤ 10 frames.
- **No pitch shifting in the main runs**, because bee frequency content is informative. Test it only as an ablation.

### 8.4 When to stop training (the rules; do not improvise)
- **Final retrain per outer fold.**
  - Maximum **60 epochs**.
  - Validation set: 15 % of the training **hives**, never test hives.
  - Early stopping on validation balanced accuracy: **patience 10**, min_delta 0.002, restore the best weights.
- **Hard wall-clock cap per run: 40 min on CPU, 10 min on GPU.** If a run hits the cap:
  - stop it;
  - keep the best checkpoint;
  - mark the run `TIME_CAPPED` in the log.
- **If validation is still improving at epoch 60 in more than half of the folds:**
  - raise the cap to 120 epochs, **once**;
  - apply it to all folds and all models of that family equally;
  - log the change.
- **QAT:** at most 15 epochs, lr 1e-4, patience 5, starting from the best FP32 checkpoint.
- **Seeds:**
  - 3 seeds (0, 1, 2) for every neural config in each outer fold;
  - 3 seeds for RF and LightGBM;
  - 1 seed for deterministic models.
- **Global compute budget for Phase 5: 36 hours.**
  - After the first outer fold, project the total time.
  - If it is over budget, cut in this order:
    1. lower the per-hive clip cap to 1,000;
    2. reduce the neural grid to 4 configs;
    3. reduce outer repeats from 3 to 2.
  - Never drop the unseen-hive protocol, and never tune on test data.
- **Never train "until the accuracy is good".**
  - Stop only by these rules.
  - Do not change a model after looking at outer-test results.
  - If a bug forces a change, log it as a deviation and re-run everything it affects.
- **Checkpoints:** save every epoch so runs can resume after a crash or sleep.
- **Run logs:** for each run, write the config, seed, fold, curves, metrics, time and git hash to `paper_q1/runs/`.
- **Storage:**
  - checkpoints go in `models/`, which is gitignored;
  - exported deployable models go in `paper_q1/models_export/`.

---

## 9. Deployment and bench measurements (Phases 6–7)

### 9.1 On-device deployment (AGENT)
- **Conversion path:**
  - Keras → full-integer INT8 TFLite. The representative set is 500 samples from the training fold.
  - Then TensorFlow Lite Micro with CMSIS-NN on the nRF52840, via PlatformIO/Arduino or Zephyr/nRF Connect SDK.
  - Classical models go to C via emlearn or m2cgen.
  - Edge Impulse is an acceptable alternative route.
- **Measurements:**
  - flash and RAM, from the linker map / `arm-none-eabi-size` and the tensor-arena size;
  - latency with the DWT cycle counter at 64 MHz, over 1,000 repetitions, reporting median and p95;
  - feature extraction and inference measured separately.
- **On-device vs. offline agreement.**
  - Run 200 fixed test vectors on the device and in Python.
  - Target ≥ 99 % identical decisions.
  - Report the maximum feature and logit difference.

### 9.2 Energy with a Nordic PPK2 [HUMAN runs it; AGENT writes the firmware and scripts]
- **Setup.** Run the PPK2 at 100 kS/s, either:
  - in source-meter mode at 3.7 V in place of the battery; or
  - in ampere-meter mode in the battery line.
- **Phase markers.**
  - The firmware toggles GPIO lines wired to the PPK2 digital inputs at each phase boundary: wake, sensor read, audio capture, features, inference, LoRa TX, sleep.
  - This gives the charge per phase.
- **Measure:**
  - sleep current, over a window of at least 10 min;
  - each phase, over at least 100 report cycles;
  - TX energy at SF7, SF9 and SF12 at the configured power.
- **Outputs:**
  - µJ per inference and mJ per report;
  - average current at 5, 15 and 30-min reporting intervals;
  - from these, a battery-life estimate based on **measured** currents. Update `paper/analysis/energy_budget.py`, and keep the datasheet budget as a comparison column.
- **If no PPK2 is available**, use an INA226-based logger or a µCurrent + oscilloscope, and state the accuracy. A PPK2 (about USD 100) is strongly recommended.

### 9.3 Hardware-in-the-loop acoustic replay [HUMAN builds the rig; AGENT writes the scripts]
- **Rig.**
  - A small box lined with acoustic foam, holding a full-range speaker.
  - The node's microphone sits at a fixed 10 cm from the speaker.
  - A laptop plays **test-fold** clips.
  - The node streams features over USB serial (debug mode) and also sends real LoRa frames.
- **Calibration.**
  - Play a log sweep and record it with the node mic. Report the speaker + box response.
  - Set the playback level so the node RMS (dBFS) matches the dataset median.
  - Replay at −12, −6, 0 and +6 dB to test gain robustness.
- **Outputs:**
  - per-band correlation and MAE between on-node and reference features for the same clip;
  - agreement between on-device and offline decisions;
  - accuracy on the replayed subset.
- **Wording.** Always call this "bench hardware-in-the-loop replay of field recordings", never field validation.

### 9.4 Radio [HUMAN runs it; AGENT writes the scripts]
- **Conducted PER test.**
  - **Chain:** node → SMA cable → fixed attenuators + step attenuator → receiver (the gateway or a second RAK4631).
  - **Leakage control:** put the transmitter in a shielded box or metal tin and set the lowest TX power.
  - **Sweep:**
    - move in 1–2 dB steps around sensitivity;
    - send at least 1,000 packets per step, counted with `seq`;
    - log PER, RSSI and SNR at SF7, and at SF9/SF12 if time allows.
  - **Report:** measured sensitivity at PER = 10 %, compared against the SX1262 datasheet.
- **Range is a model, not a measurement.**
  - Build a link budget from measured sensitivity, TX power, antenna gains and cable losses.
  - Use a two-ray model with stated heights (node 0.5 m, gateway 4 m).
  - Add vegetation loss (Weissberger / ITU-R P.833).
  - The output is a modelled range with an uncertainty band.
  - The previous analysis gave ≈1.3 km at SF7 (two-ray) and ≈0.62 km with 50 m of foliage. Recompute both with the measured sensitivity.
- **Bench endurance run.**
  - Run for 72 h at a 5-min interval with every fitted sensor.
  - Report bench PDR from `seq`, plus resets and timing drift.

### 9.5 Sensors [HUMAN, optional, cheap]
- Run a two-point temperature check for the TMP117/DS18B20 against a reference thermometer:
  - an ice-water bath;
  - a water bath at about 35 °C.
- Do not write "NIST-traceable" unless the reference thermometer has a calibration certificate.

---

## 10. Literature, hardware photos and figures

### 10.1 Literature
- **Search** Google Scholar, Scopus and arXiv for 2018–2026 work on:
  - beehive acoustic monitoring, queen detection, swarming and colony strength;
  - beehive datasets;
  - TinyML / edge AI for apiculture and LoRa hive monitoring;
  - hive-independent evaluation and ML leakage.
- **Read** at least 40 relevant papers.
- **Build** `paper_q1/manuscript/related_work_matrix.csv` with columns: task, data, hives, split type, features, model, hardware, energy measured (yes/no), result.
- **Paper table.** The comparison table in the paper uses only verified entries, and states each paper's split type.

Methodology references to use (verify each one):
- Kapoor & Narayanan 2023, *Patterns* (leakage)
- Kapoor et al. 2024, *Science Advances* (REFORMS checklist)
- Nadeau & Bengio 2003, *Machine Learning*
- Bouckaert & Frank 2004, PAKDD
- Benavoli et al. 2017, *JMLR*
- Demšar 2006, *JMLR*
- Zhang et al. 2017, "Hello Edge", arXiv:1711.07128
- Banbury et al. 2021, MLPerf Tiny, arXiv:2106.07597
- Gebru et al., "Datasheets for Datasets"
- Mitchell et al. 2019, "Model Cards"
- Semtech AN1200.13 (LoRa airtime)

### 10.2 Hardware photos: yes, include them
Reviewers want proof that the prototype exists. [HUMAN] takes the photos; [AGENT] annotates them and lays them out.

**What to photograph:**
- the node: open enclosure, top view, with labelled call-outs (Inkscape arrows and labels) and a ruler for scale;
- the sensor probe / frame harness;
- the gateway (existing `docs/figures/beevil_knievel_gateway_hardware.jpg`);
- each bench rig: PPK2 wiring, HIL box, RF attenuator chain.

**How to shoot and store them:**
- Use a phone camera in daylight against a plain background, at ≥ 300 dpi at print size.
- No filters, AI enhancement or upscaling.
- Keep originals in `paper_q1/photos/raw/` and annotated versions in `paper_q1/photos/annotated/`. Log both in FIGURE_PROVENANCE.md.

**Supporting material:**
- a wiring schematic drawn from the real connections (KiCad or Fritzing export);
- a BOM table with vendor, date and INR prices.

**Rules:**
- Show only sensors that are physically fitted.
- Beehive context photos are unnecessary.

### 10.3 Figures
All figures come from `paper_q1/figures/*.py`, read only results JSON, and are saved as vector PDF with 8–9 pt text and a colour-blind-safe palette.

1. **System architecture:** TikZ or draw.io, using numbers from the spec only.
2. **Hardware photo composite.**
3. **Evaluation protocol diagram:** splits, nested CV, HIL, bench.
4. **Data-audit confound matrix:** label × hive.
5. **The "gap" figure:** random vs. unseen-hive vs. cross-dataset performance, per feature and model.
6. **Per-hive performance distribution.**
7. **Pareto front:** balanced accuracy vs. µJ per inference. Marker size = RAM; annotate bytes on air.
8. **FP32 vs. INT8.**
9. **HIL fidelity:** on-node vs. reference features, and gain robustness.
10. **PPK2 current trace** with phases marked, plus the energy breakdown.
11. **CUSUM on real MSPB temperature:** ARL₀ vs. h, and detection examples.
12. **Radio:** PER vs. attenuation, plus the modelled range.

**Tables:**
- related work (verified);
- datasets;
- tasks and protocols;
- main results (mean ± SD, 95 % CI);
- on-device cost;
- energy budget (measured vs. datasheet);
- frame format v1 vs. v2;
- before/after fixes.

---

## 11. Statistics (Phase 8)

- **Summary statistics.** Report mean ± SD over the 15 outer splits, with 95 % CIs from a **hive-level bootstrap** (resample hives, 2,000 resamples).
- **Paired comparisons on identical folds:**
  - the **corrected repeated k-fold t-test** (Nadeau–Bengio correction; Bouckaert & Frank);
  - the **Bayesian correlated t-test** with a ROPE of ±1 percentage point (Benavoli et al.).
- **Several models across tasks and datasets:**
  - **Friedman test + Nemenyi post-hoc**, with a critical-difference diagram (Demšar);
  - Holm correction for multiple pairwise tests.
- **Single fixed test set:** McNemar test.
- **Effect sizes:** always report them next to p-values.
- **Do not** use a plain Wilcoxon test over 5 folds.
- **REFORMS:** fill in the checklist as `paper_q1/REFORMS_checklist.md`, for the supplementary material.

---

## 12. Manuscript (Phase 9)

**Journal order**
1. *Computers and Electronics in Agriculture* (Elsevier): primary target.
2. *Smart Agricultural Technology* or *Biosystems Engineering* (Elsevier).
3. *Ecological Informatics*, if the bioacoustic benchmark turns out to be the strongest part.
4. *IEEE Internet of Things Journal* or *IEEE Sensors Journal*, if the hardware and measurement part is the strongest.

**Before writing:**
- Read the chosen journal's Guide for Authors and follow it exactly. That covers length, structure, highlights, graphical abstract, CRediT, data-availability statement and the generative-AI declaration.
- Check the journal's current quartile (JCR/SJR) and APC, and record both in DECISIONS.md.

**Template.** Put the manuscript in `paper_q1/manuscript/`.
- Elsevier: `elsarticle` with `\documentclass[review]{elsarticle}` and line numbers on.
- IEEE: `IEEEtran` journal mode.

**Structure**
1. **Introduction:** the problem, the verified gap, contributions C1–C5, and explicit non-claims.
2. **Related work**, with the verified comparison table.
3. **System design:** node, firmware, frame v2 and gateway. Keep it concise and use spec numbers.
4. **Materials and methods:**
   - datasets and audit; tasks; features; models; protocols;
   - training and stopping rules; quantisation and deployment;
   - HIL, PPK2 and RF bench;
   - statistics.
5. **Results**, in order C1 → C5.
6. **Discussion:**
   - why hive shift happens and what generalises;
   - the practical meaning for beekeepers, and cost;
   - limitations, stated plainly: no field deployment, limited regions and subspecies, no CO₂ data, HIL ≠ in-hive acoustics;
   - a concrete protocol for a future field trial.
7. **Conclusion.**
8. **Back matter:** data and code availability (GitHub tag + Zenodo DOI), CRediT, funding, conflicts, and the generative-AI declaration.

**Also produce:**
- a cover letter;
- 3–5 highlights of ≤ 85 characters each;
- a graphical abstract built from real figures;
- a supplementary PDF with per-hive tables, hyper-parameters, the REFORMS checklist and the datasheet;
- a response-to-reviewers template.

**Writing rules**
- Back every claim with a figure, a table or a verified citation.
- Take numbers only from `numbers.tex`.
- Use SI units and consistent terms.
- No hype; state limitations plainly.
- Authors: Atharve Dahima, Srajan Mishra, Vishal Sharma. Leave affiliations, e-mails and ORCIDs as placeholders for the humans.

**Overlap with the conference paper.** If the IEEE conference version (`paper/`) is submitted or published, the journal paper must:
- cite it;
- be substantially extended;
- follow the journal's prior-publication policy.

Check that policy and note it in DECISIONS.md.

---

## 13. Reproducibility package

- **Single entry point:** `python -m paper_q1.run <step>`, with steps:
  - `setup`, `spec`, `data`, `audit`, `splits`, `features`;
  - `train`, `quantize`, `eval`, `stats`;
  - `figures`, `numbers`, `paper`;
  - `smoke` (≤ 10 min on fixtures) and `all`.
- **Environment:** pin exact versions in `requirements-lock.txt`; a Dockerfile is optional.
- **Determinism:**
  - set seeds for random, numpy, TensorFlow and PyTorch, and set `PYTHONHASHSEED`;
  - document any remaining non-determinism.
- **Documentation:** model cards for the exported models, and the datasheet from the data audit.
- **Zenodo release:**
  - include code, results JSON, exported models and figure scripts;
  - leave out third-party raw data and link to the sources instead.

---

## 14. Phases, order and acceptance criteria

| Phase | Work | Accepted when |
|---|---|---|
| 0 Setup (½ day) | Create branch `q1-journal`. Read README, LIMITATIONS, REPRODUCIBILITY and `paper/`. Create the `paper_q1/` skeleton and PROGRESS/DECISIONS. Set up the environment and lock file. | `python -m paper_q1.run smoke` runs |
| 1 Clean-up (1–2 days) | Section 4, items 1–27 (except hardware tests of firmware) | AUDIT_FIXES.md complete; `pytest` green; `grep` finds no absolute paths; no unsupported numbers in README, frontend or docs |
| 2 Data (1–2 days) | Section 5 and the audit | MANIFEST with checksums; DATASHEET.md; confound matrix; duplicates removed |
| 3 Protocol (½ day) | Section 6 | PREREGISTRATION.md and hashed splits committed |
| 4 Features (1–2 days) | Section 7: firmware-faithful reference and golden tests | Golden test passes (host build at least; on-device once hardware is available) |
| 5 Training (≤ 36 h compute) | Section 8 | Sanity tests pass; all runs logged; `main_results.json` written once |
| 6 Firmware v2 + deployment (2–3 days) | Frame v2, CUSUM v2, real I²S/FFT path, TFLM model, GPIO markers, serial feature dump, UART receive on the gateway | Builds with PlatformIO; host unit tests pass; on-device agreement test ready |
| 7 Bench [HUMAN] (3–5 days) | PPK2, HIL, RF, endurance, temperature check, photos | Raw logs in `paper_q1/bench_raw/`, parsed by scripts |
| 7.3 CUSUM on MSPB (AGENT; can run in parallel with 6–7) | Real-data ARL₀ and detection analysis | Results JSON + figure |
| 8 Stats + figures (1–2 days) | Sections 10–11 | All figures regenerate from JSON |
| 9 Manuscript (3–5 days) | Section 12 | Compiles with no errors and no overfull boxes; every number is a macro; references verified |
| 10 Final check | Section 16 | Every checklist item ticked or explained |

If the bench hardware is not available yet:
- finish everything else;
- leave the C2/C3/C5 measurement sections with clearly marked placeholders;
- the scripts fill those placeholders automatically once the raw logs arrive.

---

## 15. Human checklist [HUMAN]

1. Create a Kaggle API token and accept the dataset terms.
2. Tell the agent which sensors are physically fitted and wired. List them in `paper_q1/human_tasks/hardware_inventory.md`.
3. Buy or borrow a Nordic PPK2, SMA cables, fixed attenuators, a step attenuator and a metal box or tin.
4. Build the HIL box: a foam-lined box with a full-range speaker.
5. Run the measurement scripts and put the raw logs in `paper_q1/bench_raw/`.
6. Take the hardware photos (Section 10.2).
7. If you have ANSYS access, fix the HFSS port and re-run it. Otherwise, approve dropping the antenna claims.
8. Choose the journal, and provide affiliations, e-mails, ORCIDs, funding and acknowledgements.
9. Approve any push, history rewrite or deletion.
10. Optional but valuable: ask a beekeeper or entomologist to check the bee-biology statements.

---

## 16. Definition of done

- [ ] Every Section 4 item is fixed, or explicitly deferred with a reason.
- [ ] No AI-generated image is referenced anywhere in the paper or README.
- [ ] Every manuscript number comes from `numbers.tex`, which is generated from `results/*.json`.
- [ ] Every citation is verified in `refs_verification.csv`.
- [ ] Splits were hashed and committed before training, and the label-shuffle test gives ≈ chance.
- [ ] Unseen-hive (P-A) and cross-dataset (P-B) results exist for at least T1 and T2, and the random-split gap is quantified.
- [ ] On-device flash, RAM and latency are measured. Energy is measured with the PPK2, or explicitly marked as pending [HUMAN].
- [ ] HIL and RF bench results are present, or explicitly marked as pending [HUMAN].
- [ ] CUSUM is calibrated on MSPB, with a real-data ARL₀.
- [ ] Statistics follow Section 11, and the REFORMS checklist is filled in.
- [ ] `python -m paper_q1.run all` reproduces the results, figures and PDF from a clean clone. The exceptions are [HUMAN] raw logs and third-party downloads.
- [ ] Manuscript, cover letter, highlights, graphical abstract and supplementary material are ready, with placeholders only for the humans' personal details.
- [ ] The README evidence table is updated, and LIMITATIONS.md is honest.

---

## 17. When you finish (or stop)

Write `paper_q1/SUMMARY.md` containing:
- what was done in each phase;
- a key results table, naming the protocol for each result;
- what is still pending on [HUMAN] tasks;
- every deviation from this plan, and why;
- open risks that reviewers might raise;
- the exact commands to reproduce everything.


</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-10-23T18:46:57+05:30.
</ADDITIONAL_METADATA>