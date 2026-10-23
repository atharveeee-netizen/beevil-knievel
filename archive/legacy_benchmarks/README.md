# Archived Legacy Benchmark: run_full_zenodo_real_benchmark.py

**Date Archived:** 2026-10-23  
**Reason:** Ground-Truth Label Leakage & Confounded Evaluation.  
**Provenance Status:** DISCARDED / FLAWED.

## Flaw Analysis (Master Plan Section 4 Item 8)
1. **Confounded Hand-Typed Temperature:**
   The legacy script evaluated 14 hand-picked clips by manually overriding the thermal delta:
   - Healthy clips: `delta_t` hand-coded between 9.5 and 11.5 °C.
   - Queenless clips: `delta_t` hand-coded between 3.8 and 4.2 °C.
2. **Deterministic Thermal Short-Circuit:**
   `classify_hive_state_tinyml` automatically triggers `THERMAL_STRESS_WARNING` whenever `delta_t < 5.0 °C`. Because of this hard-coded rule, every single queenless clip was scored as a detected anomaly based solely on the hand-typed temperature input, completely bypassing the acoustic classifier.
3. **Sample Size:**
   14 selected clips are statistically inadequate to validate out-of-sample generalization.

Phase 5 replaces this benchmark with leakage-safe, hive-independent cross-validation across the complete corpus with isolated acoustic evaluation.
