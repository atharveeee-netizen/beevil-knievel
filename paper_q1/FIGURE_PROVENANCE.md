# Figure Provenance Ledger

Every figure used in the Q1 journal manuscript and technical documentation must carry exactly one valid provenance tag:
- `REAL_PUBLIC_DATASET`: Directly derived from real public field recordings (BeeTogether D1, Zenodo 1321278 D2, SBCM D3, MSPB D4, UrBAN D5).
- `REAL_BENCH_MEASUREMENT`: Direct hardware bench measurements performed on physical hardware (PPK2 power profile, HIL audio test, conducted RF).
- `ANALYTICAL_MODEL`: Closed-form mathematical physics models (e.g. Okumura-Hata / log-distance path loss, battery discharge model).
- `SIMULATED`: Multi-physics or digital twin solver output with reproducible solver logs.
- `SYNTHETIC_FIXTURE`: Software test fixtures clearly labelled as synthetic (never presented as evidence).

**Strict Prohibition:** AI-generated images are banned across the entire repository and manuscript.

---

## Manuscript Figure Ledger

| Figure ID | File Path | Description | Provenance Tag | Source Script / Raw Data | Verified |
|---|---|---|---|---|---|
| `fig_system_architecture` | `paper_q1/figures/fig_system_architecture.pdf` | Hardware and firmware architecture diagram | `ANALYTICAL_MODEL` | TikZ vector source | Pending |
| `fig_spectrogram_bands` | `paper_q1/figures/fig_spectrogram_bands.pdf` | 8-band decimation & filter response | `ANALYTICAL_MODEL` | `paper_q1/figures/plot_bands.py` | Pending |
| `fig_energy_pareto` | `paper_q1/figures/fig_energy_pareto.pdf` | Energy per inference vs Accuracy Pareto frontier | `REAL_BENCH_MEASUREMENT` / `REAL_PUBLIC_DATASET` | `paper_q1/figures/plot_pareto.py` | Pending |
| `fig_cusum_trajectories` | `paper_q1/figures/fig_cusum_trajectories.pdf` | Rolling Page CUSUM detection on MSPB dataset | `REAL_PUBLIC_DATASET` | `paper_q1/figures/plot_cusum.py` | Pending |
| `fig_rf_link_budget` | `paper_q1/figures/fig_rf_link_budget.pdf` | Modelled vs conducted LoRa PER vs attenuation | `ANALYTICAL_MODEL` / `REAL_BENCH_MEASUREMENT` | `paper_q1/figures/plot_rf.py` | Pending |
| `fig_hardware_bench_photo` | `paper_q1/figures/fig_hardware_bench_photo.jpg` | Real photo of bench RAK4631 + INMP441 + PPK2 setup | `REAL_BENCH_MEASUREMENT` | Author photograph (bench only) | Pending [HUMAN] |
