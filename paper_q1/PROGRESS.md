# Q1 Journal Transformation: Progress Log

**Working Title:** *Hive-independent, edge-deployable acoustic–thermal colony monitoring on a LoRa node: a leakage-safe multi-dataset benchmark with measured on-device cost.*  
**Branch:** `q1-journal`  
**Execution Standard:** Elsevier *Computers and Electronics in Agriculture* (COMPAG) / IEEE strict scientific rigor. Zero invented numbers. Zero field deployment claims.

---

## Phase Status Summary

| Phase | Description | Status | Completion Date |
|---|---|---|---|
| **Phase 0** | Setup, scaffolding, run entry point & environment lock | **COMPLETED** | 2026-10-23 |
| **Phase 1** | Repository audit & forensic cleanup (Section 4, items 1–27) | Pending | |
| **Phase 2** | Data acquisition & audit (D1–D4, manifest, confound matrix) | Pending | |
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

---

## Blockers & Pending Human Tasks
- None currently blocking Phase 0/1.
- Human bench tasks will be staged with firmware scripts and step-by-step checklists in `paper_q1/human_tasks/`.
