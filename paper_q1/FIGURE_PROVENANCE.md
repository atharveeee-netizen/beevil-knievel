# Figure Provenance Ledger

Every figure used in the Q1 journal manuscript and technical documentation must carry exactly one valid provenance tag:
- `REAL_PUBLIC_DATASET`: Directly derived from real public field recordings (BeeTogether D1, Zenodo 1321278 D2, SBCM D3, MSPB D4).
- `REAL_BENCH_MEASUREMENT`: Direct hardware bench measurements performed on physical hardware (PPK2 power profile, HIL audio test, conducted RF).
- `ANALYTICAL_MODEL`: Closed-form mathematical physics models (e.g. log-distance path loss, battery discharge model, circuit architecture).
- `SIMULATED`: Multi-physics or digital twin solver output with reproducible solver logs.
- `SYNTHETIC_FIXTURE`: Software test fixtures clearly labelled as synthetic (never presented as evidence).

**Strict Prohibition:** AI-generated images are banned across the entire repository and manuscript.

---

## Manuscript Figure Ledger

| Figure ID | File Path | Description | Provenance Tag | Source Script / Raw Data | Verified |
|---|---|---|---|---|---|
| `fig1_system_architecture` | `paper_q1/figures/fig1_system_architecture.pdf` | End-to-end monitoring pipeline: Node -> LoRa -> Gateway -> Decision Support | `ANALYTICAL_MODEL` | `paper_q1/figure_engine.py` | YES |
| `fig2_acoustic_bands` | `paper_q1/figures/fig2_acoustic_bands.pdf` | Anti-aliasing FIR response (31-tap) & 8 biological acoustic bands | `ANALYTICAL_MODEL` | `paper_q1/figure_engine.py` | YES |
| `fig3_benchmark_performance` | `paper_q1/figures/fig3_benchmark_performance.pdf` | Unseen-hive balanced accuracy distributions across 15 outer folds | `REAL_PUBLIC_DATASET` | `paper_q1/figure_engine.py` (from `main_results.json`) | YES |
| `fig4_modality_ablation` | `paper_q1/figures/fig4_modality_ablation.pdf` | Modality ablation: Acoustic F0 vs Heuristic vs Multi-Modal Early Fusion | `REAL_PUBLIC_DATASET` | `paper_q1/figure_engine.py` (from `main_results.json`) | YES |
| `fig5_energy_breakdown` | `paper_q1/figures/fig5_energy_breakdown.pdf` | Energy per 36-byte cycle: on-node computation vs LoRa Tx vs sleep | `ANALYTICAL_MODEL` | `paper_q1/figure_engine.py` (from `spec/beevil_spec.yaml`) | YES |
| `fig6_lora_link_budget` | `paper_q1/figures/fig6_lora_link_budget.pdf` | Analytical log-distance path loss & receiver sensitivity limits | `ANALYTICAL_MODEL` | `paper_q1/figure_engine.py` (Friis / log-distance model) | YES |
| `fig_hardware_bench_photo` | `paper_q1/figures/fig_hardware_bench_photo.jpg` | Real photo of bench RAK4631 + PPK2 setup | `REAL_BENCH_MEASUREMENT` | Author photograph (bench only) | Pending [HUMAN] |
