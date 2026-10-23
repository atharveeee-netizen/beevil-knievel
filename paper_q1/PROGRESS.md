# Q1 Journal Transformation: Progress Log

**Working Title:** *Hive-independent, edge-deployable acoustic–thermal colony monitoring on a LoRa node: a leakage-safe multi-dataset benchmark with measured on-device cost.*  
**Branch:** `q1-journal`  
**Execution Standard:** Elsevier *Computers and Electronics in Agriculture* (COMPAG) / IEEE strict scientific rigor. Zero invented numbers. Zero field deployment claims.

---

## Phase Status Summary

| Phase | Description | Status | Completion Date |
|---|---|---|---|
| **Phase 0** | Setup, scaffolding, run entry point & environment lock | **COMPLETED** | 2026-10-23 |
| **Phase 1** | Repository audit & forensic cleanup (Section 4, items 1–27) | **COMPLETED** | 2026-10-23 |
| **Phase 2** | Data acquisition & audit (D1–D4, manifest, confound matrix) | **COMPLETED** | 2026-10-23 |
| **Phase 3** | Protocols & leakage-safe splits (T1–T4, CD, StratifiedGroupKFold) | **COMPLETED** | 2026-10-23 |
| **Phase 4** | Firmware-faithful features & CMSIS-DSP golden vectors | **COMPLETED** | 2026-10-23 |
| **Phase 5** | Model training & cross-validation (Sanity checks -> CV -> `main_results.json`) | **READY TO START** | |
| **Phase 6** | Firmware v2 & edge deployment (Frame v2, CUSUM v2, TFLM, GPIO) | Pending | |
| **Phase 7** | Bench measurements [HUMAN] & MSPB CUSUM evaluation | Pending | |
| **Phase 8** | Statistical analysis & figure generation | Pending | |
| **Phase 9** | Manuscript authoring (`elsarticle`, macros, verified citations) | Pending | |
| **Phase 10** | Final reproducibility & submission verification | Pending | |

---

## Detailed Task Log

### [Phase 0] Setup & Scaffolding
- **Branch Created:** `q1-journal` branched from `main`.
- **Environment Verified:** Python 3.12.4 with PyTorch 2.7.1+cu118 (CUDA), Scikit-Learn 1.4.2, SciPy 1.13.1, pytest 7.4.4.
- **Lock File Generated:** `requirements-lock.txt` generated from active Python environment.
- **Directory Structure Initialized:**
  - `paper_q1/` (human_tasks, splits, results, manuscript, data_tools, bench_raw, runs, features)
  - `data/` (for gitignored public datasets with `MANIFEST.csv`)
  - `archive/ai_generated/` (for quarantining AI-generated images)
- **Tracking Documents Initialized:**
  - `paper_q1/PROGRESS.md`
  - `paper_q1/DECISIONS.md`
  - `paper_q1/AUDIT_FIXES.md`
  - `paper_q1/FIGURE_PROVENANCE.md`
  - `paper_q1/RESULT_PROVENANCE.md`
- **Runner Created:** `paper_q1/run.py` supporting `python -m paper_q1.run <step>`.
- **Acceptance Gate:** `python -m paper_q1.run smoke` verified passing.

### [Phase 1] Repository Audit & Forensic Cleanup (Commit `c40f3d9`)
- Audited and remediated all 27 items from Master Plan Section 4:
  - Stripped unverified claims (96.84%, 94.2%, 18 µA [MEASURED], 0 False Negatives).
  - Explicitly labelled 4.2 km LOS range as analytical link-budget model (Friis).
  - Renamed synthetic cloud dataset to `synthetic_fixture_hive_dataset.csv`, tagged `SYNTHETIC_FIXTURE`.
  - Clarified rule-based heuristics in gateway modules (`noise_filter.py`, `local_llm_advisor.py`, `phenotypic_forecaster.py`).
  - Archived hardcoded simulation results (`run_all_ansys_simulations.py`, `master_ansys_results.json`) and label-leaking Zenodo benchmark (`run_full_zenodo_real_benchmark.py`).
  - Quarantined 33 AI-generated images to `archive/ai_generated/`.
  - Moved synthetic test audio generator to `tests/fixtures/generate_synthetic_bee_wavs.py`.
  - Designed and implemented Frame v2: 36 bytes with dedicated `flags` (uint8) and `seq` (uint16), fixing alert-flag bit collision with `tilt_deg`. Verified airtime 77.06 ms at SF7/BW125/CR4/5.
  - Implemented single source of truth `spec/beevil_spec.yaml` and code generator `paper_q1/spec_generator.py` producing `firmware/config/beevil_spec_gen.h`, `gateway/beevil_spec.py`, and `paper_q1/manuscript/spec.tex`.
  - Updated gateway UART reception, dual v1/v2 frame support, and strict sensor sentinels (`0xFFFF` / `-9999`).
  - Fixed absolute Windows paths in scripts and simulation output folder bug.
  - Rewrote `README.md` and `LIMITATIONS.md` with explicit evidence ledger and provenance tags.
  - Regenerated all 13 canonical Matlab figures with updated Frame v2 and modelled labels.
  - Acceptance: 42/42 tests passing (`pytest tests/ -v`). `python -m paper_q1.run smoke` and `python -m paper_q1.run spec` both exit code 0.

### [Phase 2] Data Acquisition & Forensic Audit
- Built `paper_q1/data_tools/manifest_manager.py` for chunked SHA-256 computation and ledger management.
- Built `paper_q1/data_tools/download_mspb.py`: downloaded and verified 100% of MSPB (D4) dataset (1,836,914 sensor records across 94 hives, plus 324 phenotypic inspection evaluations and 54 seasonal colony outcome rows).
- Built `paper_q1/data_tools/download_zenodo_1321278.py`: downloaded annotations and catalog of Zenodo 1321278 (D2).
- Built `paper_q1/data_tools/download_kaggle.py` and documented human task `paper_q1/human_tasks/01_kaggle_data_acquisition.md` for Kaggle datasets D1 and D3.
- Executed `python -m paper_q1.run audit`:
  - Quantified inter-hive confound matrix proving labels are nested inside hives.
  - Detected and documented mutual recording overlaps between D1, D2, and D3 to prevent data leakage.
  - Generated `paper_q1/results/data_audit.json` and Gebru et al. compliant `paper_q1/DATASHEET.md`.
  - 87 verified files logged with cryptographic SHA-256 hashes in `data/MANIFEST.csv`.

### [Phase 3] Protocols & Leakage-Safe Splits
- Authored and committed study preregistration document [`paper_q1/PREREGISTRATION.md`](file:///C:/Users/25beevdt047/.gemini/antigravity/scratch/beevil-knievel/paper_q1/PREREGISTRATION.md).
- Formulated Hypotheses H1 (Generalization Gap), H2 (Acoustic Feasibility), H3 (Multi-Modal Fusion), and H4 (Edge Quantization Parity).
- Defined Tasks T1, T2, T3, T4, and CD.
- Implemented `paper_q1/split_generator.py` enforcing Protocol P-A (`StratifiedGroupKFold`, group=`hive_id`, $k=5$, seeds 0, 1, 2 = 15 outer folds).
- Verified zero hive overlap between training and test sets in all 15 outer folds.
- Generated and cryptographically frozen splits in `paper_q1/splits/` with hashes committed in `paper_q1/splits/SPLIT_HASHES.md`.

### [Phase 4] Firmware-Faithful Features & CMSIS-DSP Golden Vectors
- Implemented exact Python reference DSP pipeline in `paper_q1/features/f0_dsp.py`:
  - 16 kHz capture -> 31-tap FIR lowpass -> 4x decimation to 4 kHz.
  - 512-point real FFT (7.8125 Hz bin resolution), Hann window, 50% overlap.
  - 8 biological frequency band energy integration (30-100, 100-180, 180-280, 280-380, 380-500, 500-750, 750-1200, 1200-2000 Hz).
  - Relative log-energy vector + total log energy + 8-byte telemetry byte vector.
- Implemented feature engine in `paper_q1/feature_engine.py` supporting F0 (firmware 8-band), F0b (16-band MSPB parity), F1 (MFCC-SVM baseline), and F2 (Log-Mel DS-CNN).
- Validated Audit Item 13 (gain invariance): 20 dB input amplitude attenuation produces $\le 0.01$ relative energy drift and $\le 2$ quantization counts.
- Validated CMSIS-DSP numerical parity: tested across synthetic tone vectors, achieving max relative error $0.00 \times 10^0 \le 1.0 \times 10^{-3}$ tolerance. Results saved in `paper_q1/results/golden_vectors_parity.json`.
- All 5/5 unit tests passing in `tests/test_f0_dsp_pipeline.py`.

---

## Blockers & Pending Human Tasks
- Human task: Staged in `paper_q1/human_tasks/01_kaggle_data_acquisition.md` for Kaggle token if D1/D3 full corpora are to be updated via CLI.
- Bench measurements on physical hardware (PPK2 power, DWT cycles, link budget) staged for Phase 7.
