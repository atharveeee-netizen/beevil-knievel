# Archived Hardcoded Simulation Scripts

**Date Archived:** 2026-10-23  
**Reason:** Hard-coded, not solver output.  
**Provenance Status:** Discarded / Unvalidated.

## Context
The files `run_all_ansys_simulations.py` and `master_ansys_results.json` contained pre-programmed, hand-coded output values rather than extracting genuine outputs from ANSYS solver runs (`solve.out` or exported field data). Several values contradicted genuine solver screenshots from the original ANSYS Mechanical/Maxwell/HFSS GUI logs.

Per Master Plan Section 4 Item 6:
- These scripts have been moved to `archive/hardcoded_simulations/` to prevent unverified metrics from leaking into the Q1 paper pipeline.
- Genuine ANSYS solver artifacts (`solve.out` files and GUI screenshots) remain in the respective `simulations/SIM*` directories.
- Any antenna simulation claim must rely solely on verified solver reruns or be replaced by analytical RF link-budget models.
