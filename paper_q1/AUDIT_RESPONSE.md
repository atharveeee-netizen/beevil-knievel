# Independent Audit Response and Verification Report
**Date:** 23 October 2026  
**Target Submission:** *Computers and Electronics in Agriculture* (Elsevier) / Q1 Quality Standard  
**Active Branch:** `fix/audit-2026-10-23` (isolated forward fix branch, no merge to `main`)  
**Auditor Reference:** Independent audit of `main` at commit `a7389f4`

---

## 0. Process & Compliance Summary

In strict accordance with Section 0 of the audit instructions:
1. **Branch Isolation**: All remediations are committed strictly on `fix/audit-2026-10-23`. No commits have been made or pushed to `main`.
2. **Phase Reopening**: Phases 2, 3, 5, 7, 8, 9, and 10 were systematically reopened in `paper_q1/PROGRESS.md` citing the audit findings, and each acceptance criterion was verified against executable evidence.
3. **No Invented Numbers**: Every single number in the manuscript, README, and evidence ledger is programmatically exported from executable scripts into `paper_q1/results/*.json` and `paper_q1/manuscript/numbers.tex`.
4. **Zero Live Apiary Claims**: All claims of field deployment have been completely eliminated. Evidence is bounded by real public field datasets, bench characterizations, and analytical models.

---

## 1. Verified Audit Remediations

### 1.1 Benchmark Rigor (S1–S13)

| ID | Issue Identified | Remediation Implemented | Evidence File |
| :--- | :--- | :--- | :--- |
| **S1** | Target variable was trivial temperature threshold ($T < 32^\circ\text{C}$). | Replaced with real colony strength phenotype evaluations from `D1_ant.xlsx` (strong $\ge 3$ adult bee frames vs sub-optimal $< 3$ frames) evaluated across 7-day pre-inspection multi-modal telemetry windows. | [`paper_q1/features/mspb_feature_builder.py`](../paper_q1/features/mspb_feature_builder.py) |
| **S2** | MSPB description inaccurate (claimed audio, 94 hives). | Corrected title: *"MSPB: a longitudinal multi-sensor dataset with phenotypic trait measurements from honey bees"* (Québec, Canada, 53 physical hives, Zhu et al., *Sci. Data* 2024). | [`paper_q1/data_tools/audit.py`](../paper_q1/data_tools/audit.py) |
| **S3** | Incorrect sample counts reported. | Extracted authoritative counts: 53 physical hives, 67 sensor deployments, 318 colony strength evaluations, 45 winter survival outcomes, 14 queen distress events. | [`paper_q1/data_tools/mspb_phenotypes.py`](../paper_q1/data_tools/mspb_phenotypes.py) |
| **S4** | FFT bin integration in dB rather than linear power. | Implemented conversion from dB to linear power ($10^{\text{dB}/10}$), summation within 8 biological band edges, conversion back to dB ($10\log_{10}P$), and band-mean subtraction for gain invariance. | [`paper_q1/features/mspb_feature_builder.py`](../paper_q1/features/mspb_feature_builder.py) |
| **S5** | Hive grouping used `tag_number` instead of physical `hive_id`. | Created authoritative lookup mapping 67 tags to 53 physical hives via `ID lookup table` in `D1_ant.xlsx` and `D2_ant.xlsx`. Enforced strict `hive_id` grouping with zero hive overlap across all folds. | [`paper_q1/split_generator.py`](../paper_q1/split_generator.py) |
| **S6** | Trivial label shuffle sanity check. | Implemented 20-permutation hive-level label-shuffle test through the full training pipeline, achieving empirical balanced accuracy of $48.88\% \pm 3.73\% \approx 50.0\%$, verifying zero pipeline leakage. | [`paper_q1/results/label_shuffle_test.json`](../paper_q1/results/label_shuffle_test.json) |
| **S7** | 64-sample overfit verification. | Verified 64-sample overfit yielding 100.0% accuracy on unregularized MLP. | [`paper_q1/train_engine.py`](../paper_q1/train_engine.py) |
| **S8** | 15 outer folds with inner hyperparameter tuning. | Executed 15 outer folds ($k=5$, 3 seeds) with inner 3-fold nested cross-validation across 11 model families. Multi-Modal Early Fusion achieved 81.96% balanced accuracy and 0.8964 AUROC. | [`paper_q1/results/main_results.json`](../paper_q1/results/main_results.json) |
| **S9** | Frozen splits and split hash ledger. | Split indices and SHA-256 hashes generated and committed in `paper_q1/splits/` (`t4_mspb_splits.json`). | [`paper_q1/splits/SPLIT_HASHES.md`](../paper_q1/splits/SPLIT_HASHES.md) |
| **S10** | Statistical significance tests. | Computed 1,000-sample bootstrap 95% CIs, non-parametric Friedman test ($\chi^2 = 92.08, p = 2.07 \times 10^{-15}$), and Nadeau-Bengio corrected resampled paired t-test ($+8.46\%, t = 4.07, p = 0.0011$). | [`paper_q1/results/statistical_tests.json`](../paper_q1/results/statistical_tests.json) |
| **S11** | Zenodo Record 1321278 download incomplete. | Downloaded and registered 100% of Zenodo 1321278 files (141 files, 56 audio recordings, 7.34 hours) in `data/MANIFEST.csv`. | [`data/MANIFEST.csv`](../data/MANIFEST.csv) |
| **S12** | Kaggle datasets (D1, D3). | Documented as blocked on human API token (`paper_q1/human_tasks/01_kaggle_data_acquisition.md`). Excluded from current benchmark results to ensure honesty. | [`paper_q1/human_tasks/01_kaggle_data_acquisition.md`](../paper_q1/human_tasks/01_kaggle_data_acquisition.md) |
| **S13** | Edge quantization parity evaluated on 15 outer folds. | Quantized MLP to symmetric INT8 and evaluated across all 15 outer folds. FP32: 71.23%, INT8: 71.55% ($\Delta = +0.32\%$). Flash: 620 Bytes, RAM: 168 Bytes. Exported C header. | [`firmware/config/tinyml_weights.h`](../firmware/config/tinyml_weights.h) |

---

### 1.2 Radio PHY, CUSUM & Evidence Class (R1–R3, C1–C2, Q1)

| ID | Issue Identified | Remediation Implemented | Evidence File |
| :--- | :--- | :--- | :--- |
| **R1** | LoRa frequency contradicted IN865 spec. | Set frequency strictly to 865.0625 MHz (IN865 band, India GSR 564(E)). | [`spec/beevil_spec.yaml`](../spec/beevil_spec.yaml) |
| **R2** | Gateway HAT incorrectly specified as SPI concentrator. | Specified Waveshare SX1262 LoRa HAT (Ebyte E22-900T22S module, UART interface) hosted on Raspberry Pi 3B+. | [`paper_q1/link_budget_eval.py`](../paper_q1/link_budget_eval.py) |
| **R3** | Free-space propagation unrepresentative of apiaries. | Implemented two-ray ground reflection ($h_{\text{node}} = 0.5\text{ m}, h_{\text{gw}} = 4.0\text{ m}$) + ITU-R P.833-10 / Weissberger canopy attenuation ($d_f = 20\text{ m}$, 0.24 dB/m). Verified physical bounds: Canopy (0.58 km SF7 / 0.92 km SF10) $\le$ Two-Ray (2.90 km) $\le$ Free Space (116.3 km). | [`paper_q1/results/analytical_link_budget.json`](../paper_q1/results/analytical_link_budget.json) |
| **C1** | CUSUM evaluated on raw temperature with latched baseline. | Implemented Page CUSUM on residuals from a 24-hour robust rolling baseline window ($e_t = \hat{\mu}_t - x_t$) with reference slack $k = 0.25^\circ\text{C}$ across 53 physical hives. Evaluated $\text{ARL}_0$ across $h \in [2.0, 4.0, 6.0, 8.0]$. | [`paper_q1/results/cusum_eval.json`](../paper_q1/results/cusum_eval.json) |
| **C2** | Lack of dated real queen failure events. | Evaluated detection latency against 14 documented queen distress events and 10 winter mortality colonies in MSPB, achieving mean detection latency of 10.52 hours at $h=6.0$ ($\text{ARL}_0 = 3.48$ days). | [`paper_q1/results/cusum_eval.json`](../paper_q1/results/cusum_eval.json) |
| **Q1** | Quantization results tagged as `REAL_BENCH_MEASUREMENT`. | Re-tagged as `NUMERICAL_SIMULATION` / `BUILD_ARTIFACT`. Firmware execution time benchmarking formalized under human task `H-HIL`. | [`paper_q1/results/edge_quantization.json`](../paper_q1/results/edge_quantization.json) |

---

### 1.3 Manuscript Claims (M1–M10)

| ID | Issue Identified | Remediation in `paper_q1/manuscript/main.tex` |
| :--- | :--- | :--- |
| **M1** | Claimed conducted RF sensitivity measurements. | Replaced with datasheet sensitivity (Semtech SX1262: -124 dBm at SF7/125 kHz, -132 dBm at SF10/125 kHz) pending bench task H-RF. |
| **M2** | Claimed "empirical log-distance model (n=2.8)". | Updated text to describe analytical two-ray ground reflection plus ITU-R P.833 / Weissberger canopy foliage attenuation. |
| **M3** | Section 4 described raw temperature CUSUM with fixed $k_{\text{ref}}$. | Updated to describe residual-based CUSUM on 24-hour rolling baseline residuals with $k=0.25^\circ\text{C}$, $h=6.0^\circ\text{C}\cdot\text{samples}$, and real MSPB queen events. |
| **M4** | Document class was generic `article`. | Converted to Elsevier single-column review template: `\documentclass[review,12pt]{elsarticle}` targeting *Computers and Electronics in Agriculture*. |
| **M5** | Table 2 tagged as `[REAL_BENCH_MEASUREMENT]`. | Re-tagged as `[NUMERICAL_SIMULATION / ANALYTICAL_MODEL]`, noting that hardware execution timing is scheduled under task H-HIL. |
| **M6** | MSPB cited incorrectly as Nolasco audio. | Cited authoritative data descriptor: Zhu, Abdollahi, Maucourt et al., *Scientific Data* 11, 888 (2024), DOI: 10.1038/s41597-024-03695-1. |
| **M7** | Abstract claimed "measured airtime". | Stated "computed airtime of 77.06 ms at SF7 (Semtech AN1200.13)". |
| **M8** | Author block. | Retained confirmed authors: Atharve Dahima, Srajan Mishra, Vishal Sharma (MNIT Jaipur). |
| **M9** | Figure 5 energy discussion claimed measured current. | Labeled entire figure and section as "Analytical Energy Budget (from component datasheets and firmware cycle estimates)", stating PPK2 testing is scheduled under task H-PWR. |
| **M10**| Contributions claimed bench measurements. | Rewrote contributions C1–C5 to clearly distinguish what is delivered in this manuscript from what is scheduled as physical bench tests. |

---

### 1.4 References & Citations Verification

- Expanded `paper_q1/manuscript/references.bib` to 41 peer-reviewed citations.
- Executed automated REST API verification against CrossRef and arXiv APIs via `paper_q1/manuscript/verify_refs.py`.
- Recorded verification status in `paper_q1/manuscript/refs_verification.csv`.

---

### 1.5 Repository Hygiene & Unsupported Claims Cleanup

1. **Quarantined Legacy Presentation Scripts**: Moved `scripts/build_2page_pictorial_report.py`, `generate_impact_summary_slide.py`, `build_problem_statement_video.py`, and `MATLAB_FIGURE_INDEX.md` to `archive/legacy_competition/` with a README explaining they contain historical competition estimates superseded by journal benchmarks.
2. **Frontend Demonstration Disclaimer**: Added `frontend/README.md` explicitly stating that the web UI is a synthetic demonstration and does not represent an active apiary deployment.
3. **Unified Limitations**: Merged duplicate `LIMITATIONS.md` into a single authoritative root document (`LIMITATIONS.md`) and pointed `docs/LIMITATIONS.md` to it.

---

### 1.6 Journal-Grade README Implementation

- Structured root `README.md` into the 16 required sections (~230 lines).
- Created CLI step `python -m paper_q1.run readme` to dynamically inject verified benchmark tables between `<!-- RESULTS:START -->` and `<!-- RESULTS:END -->`.
- Created CLI step `python -m paper_q1.run linkcheck` to verify all relative markdown links. All 29 links verified passing with 0 broken links.
- Created valid `CITATION.cff` conforming to CFF 1.2.0.
