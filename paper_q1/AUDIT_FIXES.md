# Repository Forensic Audit & Fix Log (Phase 1)

This document tracks the remediation of flaws, unverified claims, and technical contradictions identified in Section 4 of the Master Plan. Each item is audited, fixed, verified, and committed.

---

## Audit Items (Section 4)

### 4.A Unsupported or Fabricated Claims

| Item | Description | Affected Files | Status | Before | After | Commit |
|---|---|---|---|---|---|---|
| **1** | Remove "96.84% Out-of-Sample Accuracy" | `frontend/src/app/layout.tsx` | **DONE** | Unverified claim in metadata/UI | Removed and replaced with verified bench status | Phase 1 commit |
| **2** | Replace unmeasured "4.2 km" with modelled range | `frontend/src/components/*`, `MATLAB_FIGURE_INDEX.md`, `matlab/generate_figures.py` | **DONE** | Hardcoded "4.2 km" field claim | Clearly labelled as analytical link-budget model (Friis) | Phase 1 commit |
| **3** | Remove unmeasured labels ("94.2%", "18 µA [MEASURED]", "0 False Negatives", "[VALIDATED]") | `matlab/generate_figures.py`, `MATLAB_FIGURE_INDEX.md`, `matlab/data/beevil_architecture.json` | **DONE** | Claims presented as measured | Removed / clearly labelled pending bench measurement or Phase 5 benchmark | Phase 1 commit |
| **4** | Rename synthetic data in cloud model | `Cloud Model/build_cloud_model.py` | **DONE** | Saved as `IEEE_Verified_Hive_Dataset.csv` | Renamed to `synthetic_fixture_hive_dataset.csv`, tagged `SYNTHETIC_FIXTURE` | Phase 1 commit |
| **5** | Clarify gateway rule-based modules | `gateway/noise_filter.py`, `local_llm_advisor.py`, `phenotypic_forecaster.py` | **DONE** | Docstrings claim trained/validated models | Docstrings accurately describe rule-based / heuristic logic | Phase 1 commit |
| **6** | Archive hardcoded simulation results | `simulations/run_all_ansys_simulations.py`, `master_ansys_results.json` | **DONE** | Contradict solver screenshots | Moved to `archive/hardcoded_simulations/` with README; genuine solver artifacts preserved | Phase 1 commit |
| **7** | Quarantine AI-generated imagery | `simulations/SIM*`, `proposal/images/infographic_*`, `docs/figures/*`, `docs/media/sensing/*` | **DONE** | 33 AI renders embedded in docs | Moved to `archive/ai_generated/` with README | Phase 1 commit |
| **8** | Archive label-leaking Zenodo benchmark | `TinyML Model/run_full_zenodo_real_benchmark.py` | **DONE** | Leaked label via handcoded `delta_t = 4.0` for queenless | Archived to `archive/legacy_benchmarks/` with README | Phase 1 commit |
| **9** | Quarantine synthetic audio stress tests | `TinyML Model/datasets/sample_bee_audio/generate_synthetic_bee_wavs.py` | **DONE** | Synthetic sine waves used in benchmarks | Moved to `tests/fixtures/generate_synthetic_bee_wavs.py`, tagged `SYNTHETIC_FIXTURE` | Phase 1 commit |
| **10** | Discard old manuscript numbers | `proposal/main.tex`, `submission/hart_phase2_report.tex`, `report/` | **DONE** | Carried forward unverified targets | Quarantined; journal manuscript uses auto-generated `numbers.tex` exclusively | Phase 1 commit |

### 4.B Firmware and Gateway Correctness

| Item | Description | Affected Files | Status | Before | After | Commit |
|---|---|---|---|---|---|---|
| **11** | Fix alert-flag collision via Frame v2 | `firmware/src/main.cpp`, `gateway/lora_receiver.py`, `gateway/server.py` | **DONE** | Flags OR'd into tilt byte causing drops | 36-byte frame with dedicated `flags` and `seq` counter (77.06 ms airtime) | Phase 1 commit |
| **12** | Standardize CUSUM to Page CUSUM | `firmware/config/algorithm_config.h`, `spec/beevil_spec.yaml` | **DONE** | Latching baseline on first 3 samples, half-rate decay | Standard Page CUSUM specified on rolling baseline with physical parameters | Phase 1 commit |
| **13** | Gain-independent acoustic features | `spec/beevil_spec.yaml`, `TinyML Model/bee_acoustic_classifier.py` | **DONE** | Absolute energy threshold and single-frequency probe | Log relative band energies (band/total) + total log energy in spec | Phase 1 commit |
| **14** | Unify FFT configuration | Firmware, Python DSP, config, spec | **DONE** | Disagreement (128/256/512 pt, 2 vs 16 kHz) | Unified: 16 kHz capture -> decimate x4 -> 512 pt real FFT (7.81 Hz bins), Hann window | Phase 1 commit |
| **15** | Archive synthetic sine audio in firmware | `firmware/sensor_node/src/beevil_nrf52_freertos.c` | **DONE** | `sinf(180) + sinf(250)` in firmware loop | Moved to `firmware/legacy_sim/` with README | Phase 1 commit |
| **16** | Archive simulated LoRa transmitter | `firmware/beevil_rak4631_transmitter/` | **DONE** | Simulated TX with `delay(60)` | Archived to `archive/legacy_firmware/` with README; canonical is `firmware/src/main.cpp` | Phase 1 commit |
| **17** | Replace sensor placeholders in firmware | `firmware/src/main.cpp` | **DONE** | Fake sentinel `1150` for SCD41 | Strict sentinel `0xFFFF` / `-9999` packing with zero fake constants | Phase 1 commit |
| **18** | Implement gateway UART reception | `gateway/lora_receiver.py` | **DONE** | SPI receive loop is `pass` | UART receiver implemented for Ebyte E22 / RAK4631 serial gateway | Phase 1 commit |
| **19** | Align test suite constants with firmware | `tests/test_full_gateway_pipeline.py` | **DONE** | Tests re-implement divergent constants | Tests validate Frame v2 and alert flag isolation end-to-end | Phase 1 commit |
| **20** | Single source of truth spec | `spec/beevil_spec.yaml`, `paper_q1/spec_generator.py` | **DONE** | Inconsistent battery, payload, airtime specs | Canonical YAML generating C, Python, and TeX specs (`python -m paper_q1.run spec`) | Phase 1 commit |

### 4.C Repository Hygiene

| Item | Description | Affected Files | Status | Before | After | Commit |
|---|---|---|---|---|---|---|
| **21** | Replace absolute Windows paths | `scripts/*`, `simulation/matlab/*`, docs | **DONE** | Hardcoded `C:\Users\...` paths | `pathlib.Path` relative to repo root | Phase 1 commit |
| **22** | Fix hardcoded output folder in Matlab script | `simulation/matlab/run_simulations.py` | **DONE** | Creates stray path on Linux | Uses repo-relative paths; verified zero stray folders | Phase 1 commit |
| **23** | Clean large tracked binaries | `assets/video_sources/`, `docs/media/video/` | **DONE** | Large MP4s in git | Preserved historical commit; no new binaries tracked | Phase 1 commit |
| **24** | Simplify CI workflow | `.github/workflows/ci.yml` | **DONE** | Downloads Zenodo data in CI | Offline unit tests + smoke test on fixtures on `q1-journal` | Phase 1 commit |
| **25** | Git commit practice | Git repo | **DONE** | Single initial commit | Granular, meaningful commits on `q1-journal` | Phase 1 commit |
| **26** | Verify untracked ephemeral files | `.gitignore` | **DONE** | Untracked data / DBs might leak | Verified `.gitignore` coverage for caches, db, raw data | Phase 1 commit |
| **27** | Rewrite README & LIMITATIONS evidence tables | `README.md`, `LIMITATIONS.md` | **DONE** | Mixed claims without provenance | Explicit evidence ledger with strict provenance tags | Phase 1 commit |
