# Result Provenance Ledger

Every reported quantitative result in the Q1 journal manuscript and JSON output files must be recorded here with its provenance tag and exact source script.

**Strict Prohibition:** No hand-entered numbers in LaTeX. All values in `paper_q1/manuscript/numbers.tex` are programmatically exported by `python -m paper_q1.run numbers`.

---

## Result Files Ledger

| Result File | Description | Provenance Tag | Source Script | Generation Date |
|---|---|---|---|---|
| `paper_q1/results/data_audit.json` | Dataset sample counts, hive counts, duration, and confound statistics | `REAL_PUBLIC_DATASET` | `python -m paper_q1.run audit` | Pending |
| `paper_q1/results/split_checksums.json` | Frozen outer CV splits and hash verification | `REAL_PUBLIC_DATASET` | `python -m paper_q1.run splits` | Pending |
| `paper_q1/results/golden_vector_dsp.json` | CMSIS-DSP vs Python reference FFT feature parity | `REAL_BENCH_MEASUREMENT` | `python -m paper_q1.run features` | Pending |
| `paper_q1/results/main_results.json` | Hive-independent CV metrics (F1, AUC, accuracy) across T1–T4 | `REAL_PUBLIC_DATASET` | `python -m paper_q1.run eval` | Pending |
| `paper_q1/results/cusum_mspb_results.json` | ARL0 and queen loss detection delays on MSPB | `REAL_PUBLIC_DATASET` | `paper_q1/analysis/cusum_mspb.py` | Pending |
| `paper_q1/results/bench_energy.json` | Measured energy per inference and sleep current from PPK2 | `REAL_BENCH_MEASUREMENT` | `paper_q1/bench/parse_ppk2.py` | Pending [HUMAN] |
| `paper_q1/results/bench_hil.json` | Measured acoustic HIL playback accuracy on RAK4631 | `REAL_BENCH_MEASUREMENT` | `paper_q1/bench/parse_hil.py` | Pending [HUMAN] |
| `paper_q1/results/rf_link_budget.json` | LoRa path loss, airtime (77.06 ms), and PER model | `ANALYTICAL_MODEL` | `paper_q1/analysis/lora_model.py` | Pending |
