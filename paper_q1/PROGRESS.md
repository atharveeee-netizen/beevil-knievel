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
| **Phase 2** | Data acquisition & audit (D1–D4, manifest, confound matrix) | **IN PROGRESS** | |
| **Phase 3** | Protocols & leakage-safe splits (T1–T4, CD, StratifiedGroupKFold) | Pending | |
| **Phase 4** | Firmware-faithful features & CMSIS-DSP golden vectors | Pending | |
| **Phase 5** | Model training & cross-validation (Sanity checks -> CV -> `main_results.json`) | Blocked (Requires Phases 2–4) | |
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
  - `paper_q1/` (human_tasks, splits, results, manuscript, data_tools, bench_raw, runs)
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

### [Phase 1] Repository Audit & Forensic Cleanup
- **Audited 27 Items** from Master Plan Section 4:
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

---

## Blockers & Pending Human Tasks
- Human task: Kaggle API token (`kaggle.json`) or direct download of Kaggle datasets (D1, D3) if CLI authentication required.
- Human task: Bench measurements on physical RAK4631 and gateway node (PPK2 power, DWT cycles, UART link) will be staged in `paper_q1/human_tasks/`.
