# Repository Forensic Audit & Fix Log (Phase 1)

This document tracks the remediation of flaws, unverified claims, and technical contradictions identified in Section 4 of the Master Plan. Each item is audited, fixed, verified, and committed.

---

## Audit Items (Section 4)

### 4.A Unsupported or Fabricated Claims

| Item | Description | Affected Files | Status | Before | After | Commit |
|---|---|---|---|---|---|---|
| **1** | Remove "96.84% Out-of-Sample Accuracy" | `frontend/src/app/layout.tsx` | Pending | Unverified claim in metadata/UI | Removed or replaced with verified bench status | |
| **2** | Replace unmeasured "4.2 km" with modelled range | `frontend/src/components/*`, `MATLAB_FIGURE_INDEX.md`, `matlab/generate_figures.py` | Pending | Hardcoded "4.2 km" field claim | Labelled as analytical link-budget model | |
| **3** | Remove unmeasured labels ("94.2%", "18 µA [MEASURED]", "0 False Negatives", "[VALIDATED]") | `matlab/generate_figures.py`, `MATLAB_FIGURE_INDEX.md`, `docs/` | Pending | Claims presented as measured | Removed / clearly labelled pending bench measurement | |
| **4** | Rename synthetic data in cloud model | `Cloud Model/build_cloud_model.py` | Pending | Saved as `IEEE_Verified_Hive_Dataset.csv` | Renamed to `synthetic_fixture_hive_dataset.csv`, tagged `SYNTHETIC_FIXTURE` | |
| **5** | Clarify gateway rule-based modules | `gateway/noise_filter.py`, `local_llm_advisor.py`, `phenotypic_forecaster.py` | Pending | Docstrings claim trained/validated models | Docstrings accurately describe rule-based / heuristic logic | |
| **6** | Archive hardcoded simulation results | `simulations/run_all_ansys_simulations.py`, `master_ansys_results.json` | Pending | Contradict solver screenshots | Moved to `archive/` with explanation; genuine solver artifacts preserved | |
| **7** | Quarantine AI-generated imagery | `simulations/SIM*`, `proposal/images/infographic_*`, `docs/figures/*`, `docs/media/sensing/*` | Pending | AI renders embedded in docs | Moved to `archive/ai_generated/`; docs updated | |
| **8** | Archive label-leaking Zenodo benchmark | `TinyML Model/run_full_zenodo_real_benchmark.py` | Pending | Leaked label via handcoded `delta_t = 4.0` for queenless | Archived to `archive/legacy_benchmarks/` | |
| **9** | Quarantine synthetic audio stress tests | `TinyML Model/datasets/sample_bee_audio/generate_synthetic_bee_wavs.py` | Pending | Synthetic sine waves used in benchmarks | Moved to `tests/fixtures/`, tagged `SYNTHETIC_FIXTURE` | |
| **10** | Discard old manuscript numbers | `proposal/main.tex`, `submission/hart_phase2_report.tex`, `report/` | Pending | Carried forward unverified targets | Numbers quarantined; journal uses `numbers.tex` | |

### 4.B Firmware and Gateway Correctness

| Item | Description | Affected Files | Status | Before | After | Commit |
|---|---|---|---|---|---|---|
| **11** | Fix alert-flag collision via Frame v2 | `firmware/src/main.cpp`, `gateway/lora_receiver.py`, `gateway/server.py` | Pending | Flags OR'd into tilt byte causing drops | 36-byte frame with dedicated `flags` and `seq` | |
| **12** | Standardize CUSUM to Page CUSUM | `firmware/config/algorithm_config.h`, Python CUSUM | Pending | Latching baseline on first 3 samples, half-rate decay | Standard Page CUSUM on rolling median baseline | |
| **13** | Gain-independent acoustic features | `TinyML Model/bee_acoustic_classifier.py` | Pending | Absolute energy threshold and single-frequency probe | Log relative band energies (band/total) + total log energy | |
| **14** | Unify FFT configuration | Firmware, Python DSP, config | Pending | Disagreement (128/256/512 pt, 2 vs 16 kHz) | 16 kHz capture -> decimate x4 -> 512 pt real FFT (7.81 Hz bins) | |
| **15** | Archive synthetic sine audio in firmware | `firmware/sensor_node/src/beevil_nrf52_freertos.c` | Pending | `sinf(180) + sinf(250)` in firmware loop | Moved to `firmware/legacy_sim/` | |
| **16** | Archive simulated LoRa transmitter | `firmware/beevil_rak4631_transmitter/` | Pending | Simulated TX with `delay(60)` | Archived; canonical is `firmware/src/main.cpp` | |
| **17** | Replace sensor placeholders in firmware | `firmware/src/main.cpp` | Pending | Fake sentinel `1150` for SCD41 | Proper driver reads or sentinel `0xFFFF` | |
| **18** | Implement gateway UART reception | `gateway/lora_receiver.py` | Pending | SPI receive loop is `pass` | UART receiver implemented for Ebyte E22 module | |
| **19** | Align test suite constants with firmware | `tests/*` | Pending | Tests re-implement divergent constants | Tests import canonical spec | |
| **20** | Single source of truth spec | `spec/beevil_spec.yaml` | Pending | Inconsistent battery, payload, airtime specs | Canonical YAML generating C, Python, and TeX specs | |

### 4.C Repository Hygiene

| Item | Description | Affected Files | Status | Before | After | Commit |
|---|---|---|---|---|---|---|
| **21** | Replace absolute Windows paths | `scripts/*`, `simulation/matlab/*`, docs | Pending | Hardcoded `C:\Users\...` paths | `pathlib.Path` relative to repo root | |
| **22** | Fix hardcoded output folder in Matlab script | `simulation/matlab/run_simulations.py` | Pending | Creates stray path on Linux | Uses repo-relative paths | |
| **23** | Clean large tracked binaries | `assets/video_sources/`, `docs/media/video/` | Pending | Large MP4s in git | Untracked / moved to release instructions | |
| **24** | Simplify CI workflow | `.github/workflows/ci.yml` | Pending | Downloads Zenodo data in CI | Offline unit tests + smoke test on fixtures | |
| **25** | Git commit practice | Git repo | In Progress | Single initial commit | Granular, meaningful commits on `q1-journal` | |
| **26** | Verify untracked ephemeral files | `.gitignore` | Pending | Untracked data / DBs might leak | Verify `.gitignore` coverage | |
| **27** | Rewrite README & LIMITATIONS evidence tables | `README.md`, `LIMITATIONS.md` | Pending | Mixed claims without provenance | Explicit evidence ledger with provenance tags | |
