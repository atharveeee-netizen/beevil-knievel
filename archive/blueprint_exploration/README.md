# Archive: Blueprint Exploration Artifacts

## Rationale
These files were generated during the preliminary "Q1 Blueprint" conceptual session prior to the adoption of the rigorous Master Plan (dated 22 Oct 2026). As noted in Master Plan Section 2:
- Preliminary targets ("92.4% F1", "2.49 ms", "80 µJ", "94.2% -> 93.1%") were exploratory estimates before multi-dataset benchmarking.
- 1D-CNN on 8 band energies is not technically valid because 8 scalar numbers do not form a temporal sequence (MLP/LogReg/GBM should be used on band vectors, and DS-CNN on log-mel spectrogram frames).
- Real benchmarking and INT8 firmware export occur in Phases 2–6 under strict leakage-safe cross-validation.

These scripts, figures, and documents are preserved here for historical context and auditability, but are excluded from active pipelines and journal results.
