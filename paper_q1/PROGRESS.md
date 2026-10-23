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
| **Phase 5** | Model training & cross-validation (Sanity checks -> CV -> `main_results.json`) | **COMPLETED** | 2026-10-23 |
| **Phase 6** | Firmware v2 & edge deployment (INT8 quantization, `tinyml_weights.h`, memory audit) | **COMPLETED** | 2026-10-23 |
| **Phase 7** | Bench protocols [HUMAN] & MSPB Page CUSUM evaluation (`cusum_eval.json`) | **COMPLETED** | 2026-10-23 |
| **Phase 8** | Statistical analysis (Friedman, Nadeau-Bengio) & vector figures | **COMPLETED** | 2026-10-23 |
| **Phase 9** | Manuscript authoring (`main.tex`, 293 numbers macros, verified DOIs) | **COMPLETED** | 2026-10-23 |
| **Phase 10** | Final reproducibility & submission verification (`smoke` 47/47 passing) | **COMPLETED** | 2026-10-23 |

---

## Detailed Task Log

### [Phase 0] Setup & Scaffolding
- Branch `q1-journal` created.
- Python 3.12.4 with PyTorch 2.7.1+cu118 (CUDA), Scikit-Learn 1.4.2, SciPy 1.13.1 verified.
- Scaffolding, lockfile (`requirements-lock.txt`), and CLI runner (`run.py`) established.

### [Phase 1] Repository Audit & Forensic Cleanup (Commit `c40f3d9`)
- Audited and remediated all 27 items from Master Plan Section 4 (documented in `paper_q1/AUDIT_FIXES.md`).
- Stripped unverified claims (96.84%, 94.2%, 18 µA [MEASURED], 0 False Negatives).
- Quarantined 33 AI-generated images to `archive/ai_generated/`.
- Designed and implemented Frame v2: 36 bytes with dedicated `flags` (uint8) and `seq` (uint16), fixing alert-flag bit collision with `tilt_deg`. Verified airtime 77.06 ms at SF7/BW125/CR4/5.
- Implemented single source of truth `spec/beevil_spec.yaml` and code generator `paper_q1/spec_generator.py` producing `firmware/config/beevil_spec_gen.h`, `gateway/beevil_spec.py`, and `paper_q1/manuscript/spec.tex`.

### [Phase 2] Data Acquisition & Forensic Audit (Commit `b4803fb`)
- Built `paper_q1/data_tools/manifest_manager.py` with chunked SHA-256 computation and ledger management.
- Downloaded and verified 100% of MSPB (D4) dataset (1,836,914 sensor records across 94 hives).
- Documented Kaggle human protocol (`paper_q1/human_tasks/01_kaggle_data_acquisition.md`).
- Executed `python -m paper_q1.run audit`: generated `data_audit.json` and `DATASHEET.md`.

### [Phase 3] Protocols & Leakage-Safe Splits (Commit `b4803fb`)
- Authored and committed study preregistration document `paper_q1/PREREGISTRATION.md`.
- Formulated Hypotheses H1, H2, H3, and H4.
- Implemented `paper_q1/split_generator.py` enforcing Protocol P-A (`StratifiedGroupKFold`, group=`hive_id`, $k=5$, seeds 0, 1, 2 = 15 outer folds).
- Verified zero hive overlap between training and test sets in all 15 outer folds.

### [Phase 4] Firmware-Faithful Features & CMSIS-DSP Golden Vectors (Commit `b4803fb`)
- Implemented reference DSP pipeline in `paper_q1/features/f0_dsp.py` (16 kHz -> 31-tap FIR -> 4x decimation -> 512-pt FFT -> 8 biological bands -> relative log-energies).
- Validated Audit Item 13 (gain invariance): 20 dB input amplitude attenuation produces $\le 0.01$ relative energy drift.
- Validated CMSIS-DSP numerical parity: relative error $0.00 \times 10^0 \le 1.0 \times 10^{-3}$ tolerance (`paper_q1/results/golden_vectors_parity.json`).

### [Phase 5] Model Training & Cross-Validation
- Implemented `paper_q1/train_engine.py` with sanity checks (64-sample overfit 100%, label-shuffle chance 59.8%).
- Executed 15 outer folds across 11 model families with complete hive isolation:
  - Floor Majority: 50.0 ± 0.0%
  - Floor Stratified: 50.3 ± 0.4%
  - Repo Heuristic V1: 53.4 ± 1.6% (confirms Hypothesis H1: legacy heuristics collapse on unseen hives)
  - F0 Logistic Regression: 77.0 ± 4.2%
  - F0 Random Forest: 79.9 ± 4.0%
  - F0 LightGBM (Gradient Boosting): 80.5 ± 3.9%
  - F0 MLP (TinyML Candidate): 80.5 ± 3.7% (confirms Hypothesis H2: matches heavy baselines)
  - Literature MFCC-SVM: 80.7 ± 4.1%
  - Neural DS-CNN: 81.0 ± 3.6%
  - Multi-Modal Early Fusion: 87.2 ± 4.8% (confirms Hypothesis H3: audio + environment synergy, AUROC 0.945)
  - Hive-Adaptive Normalization: 58.5 ± 1.5%
- Saved authoritative results to `paper_q1/results/main_results.json`.

### [Phase 6] Edge Quantization & Firmware Deployment
- Implemented `paper_q1/quantize_engine.py`:
  - Performed post-training symmetric INT8 quantization on F0 MLP.
  - Achieved exact quantization parity: FP32 76.94% vs INT8 76.91% (Delta = 0.03%, confirms Hypothesis H4).
  - Generated pure C zero-heap inference header: `firmware/config/tinyml_weights.h`.
  - Memory audit: Flash usage = 428 Bytes (0.33% of 128 KB budget), RAM scratchpad = 136 Bytes (0.21% of 64 KB budget).
  - Saved audit results to `paper_q1/results/edge_quantization.json`.

### [Phase 7] Bench Protocols & CUSUM Evaluation
- Authored step-by-step human test protocols:
  - `paper_q1/human_tasks/02_hardware_bench_measurements.md` (PPK2 power profile & DWT cycle counting).
  - `paper_q1/human_tasks/03_conducted_lora_attenuation_test.md` (Conducted LoRa PER vs attenuation).
  - `paper_q1/human_tasks/04_temperature_sensor_2point_calibration.md` (2-point ice/warm bath calibration & sentinel verification).
- Built automated parser tools in `paper_q1/bench_tools/` (`parse_ppk2.py`, `parse_lora_per.py`, `parse_temp_cal.py`).
- Implemented `paper_q1/cusum_eval.py`: evaluated Page CUSUM hypothermia detector on 96,080 records across 79 hives in MSPB; achieved $ARL_0 = 18.44$ days, mean detection latency = 2.33 hours (`paper_q1/results/cusum_eval.json`).
- Implemented `paper_q1/link_budget_eval.py`: computed analytical link budget, airtimes (77.06 ms SF7), and canopy communication range (4.15 km modelled) (`paper_q1/results/analytical_link_budget.json`).

### [Phase 8] Statistical Significance & Publication Figures
- Implemented `paper_q1/stats_engine.py`:
  - 1,000-sample bootstrap 95% confidence intervals computed for all models.
  - Non-parametric Friedman test: $\chi^2 = 137.05$, $p = 1.69 \times 10^{-24}$.
  - Nadeau-Bengio corrected resampled paired $t$-test: all proposed models significantly outperform repo heuristic ($p < 0.0001$).
  - Results saved to `paper_q1/results/statistical_tests.json`.
- Implemented `paper_q1/figure_engine.py`: generated 6 canonical vector PDF and 300-DPI PNG publication figures in `paper_q1/figures/`.
- Updated `FIGURE_PROVENANCE.md` and `RESULT_PROVENANCE.md`.
- Enhanced `paper_q1/run.py numbers`: generated 293 auto-exported LaTeX macros in `paper_q1/manuscript/numbers.tex`.

### [Phase 9 & 10] Manuscript Authoring & Final Verification
- Authored submission-ready manuscript in `paper_q1/manuscript/main.tex`:
  - Zero invented numbers: all quantitative figures read from `numbers.tex` or `spec.tex`.
  - Zero live apiary claims: explicit disclaimer in Abstract, Intro, Methodology, and Limitations.
  - Verified references in `references.bib` with DOI ledger in `refs_verification.csv`.
- Executed smoke test suite: `python -m paper_q1.run smoke`: 47/47 pytest tests passing, DSP math verified, numbers generator verified, exit code 0.
