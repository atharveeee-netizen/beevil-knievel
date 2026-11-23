# submission/

`hart_phase2_report.tex` and its PDF are the IEEE HART HardwAIre Challenge Phase 2 report as it was submitted. They are kept unchanged for the record.

**Do not cite their numbers.** Several were withdrawn by the October 2026 audit (`paper_q1/AUDIT_RESPONSE.md`) or were never measured:

| Claim in the report | Label there | Current status |
|---|---|---|
| Quiescent sleep 18 µA | MEASURED | Not measured. The firmware has no sleep mode yet (`paper_q1/human_tasks/02_hardware_bench_measurements.md`). |
| FFT latency 2.49 ms on the Cortex-M4F | MEASURED | Not measured. The firmware contains no FFT. |
| Range 4.2 km with a 26.16 dB margin | CALCULATED | Superseded. The analytical model gives 0.62 km (SF7) and 0.96 km (SF10) through an orchard canopy and 1.29 km and 1.99 km over open ground, with a 15 dB margin (`paper_q1/results/analytical_link_budget.json`). |
| Random Forest accuracy 94.2% | VALIDATED | The Random Forest is trained and evaluated on synthetic data, so whatever its score it says nothing about real hives. No script in the repository reproduces 94.2%. |
| 27 of 27 regression tests pass | | The suite has changed; see `REPRODUCIBILITY.md` for the current counts. |
| 33-byte struct with CRC-16 tamper verification | | The wire format is Frame v2 (36 bytes). The frame has no CRC or authentication field; only the LoRa PHY CRC protects the air interface. |
