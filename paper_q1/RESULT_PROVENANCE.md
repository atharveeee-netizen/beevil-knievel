# Result Provenance Ledger

Every reported quantitative result in the Q1 journal manuscript and JSON output files must be recorded here with its provenance tag and exact source script.

**Strict Prohibition:** No hand-entered numbers in LaTeX. All values in `paper_q1/manuscript/numbers.tex` are programmatically exported by `python -m paper_q1.run numbers`.

---

## Result Files Ledger

| Result File | Description | Provenance Tag | Source Script | Generation Date | Status |
|---|---|---|---|---|---|
| `paper_q1/results/data_audit.json` | Dataset sample counts, hive counts, duration, and confound statistics | `REAL_PUBLIC_DATASET` | `python -m paper_q1.run audit` | 2026-10-23 | VERIFIED |
| `paper_q1/results/golden_vectors_parity.json` | CMSIS-DSP vs Python reference FFT feature parity (relative error 0.00e+00) | `REAL_BENCH_MEASUREMENT` | `python -m paper_q1.run features` | 2026-10-23 | VERIFIED |
| `paper_q1/results/main_results.json` | Hive-independent CV metrics (F1, AUC, accuracy) across 15 outer folds & 11 models | `REAL_PUBLIC_DATASET` | `python -m paper_q1.run train` | 2026-10-23 | VERIFIED |
| `paper_q1/results/edge_quantization.json` | FP32 vs INT8 quantization parity (0.03% delta), Flash (428 B) & RAM (136 B) footprints | `REAL_BENCH_MEASUREMENT` | `python -m paper_q1.run quantize` | 2026-10-23 | VERIFIED |
| `paper_q1/results/statistical_tests.json` | Nadeau-Bengio corrected resampled t-test, Friedman test (p=1.69e-24), 1000-bootstrap 95% CIs | `REAL_PUBLIC_DATASET` | `python -m paper_q1.run stats` | 2026-10-23 | VERIFIED |
| `paper_q1/results/cusum_eval.json` | Page CUSUM downward hypothermia detection (ARL0 = 18.44 days, latency = 2.33 h) on MSPB | `REAL_PUBLIC_DATASET` | `python -m paper_q1.cusum_eval` | 2026-10-23 | VERIFIED |
| `paper_q1/results/analytical_link_budget.json` | LoRa PHY path loss, airtime (77.06 ms SF7), link margin, and canopy model ranges | `ANALYTICAL_MODEL` | `python -m paper_q1.link_budget_eval` | 2026-10-23 | VERIFIED |
| `paper_q1/results/measured_power_bench.json` | Measured energy per inference and sleep current from PPK2 | `REAL_BENCH_MEASUREMENT` | `python -m paper_q1.bench_tools.parse_ppk2` | Pending [HUMAN] | PROTOCOL READY |
| `paper_q1/results/measured_lora_per.json` | Measured conducted LoRa PER vs attenuation sweep | `REAL_BENCH_MEASUREMENT` | `python -m paper_q1.bench_tools.parse_lora_per` | Pending [HUMAN] | PROTOCOL READY |
| `paper_q1/results/measured_temp_calibration.json` | 2-point temperature calibration and sentinel fault handling | `REAL_BENCH_MEASUREMENT` | `python -m paper_q1.bench_tools.parse_temp_cal` | Pending [HUMAN] | PROTOCOL READY |
