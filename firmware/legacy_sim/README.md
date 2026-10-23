# Legacy Simulation Code (Not Firmware)

**Date Moved:** 2026-10-23  
**Reason:** Contains synthetic sine wave generation (`sinf(180) + sinf(250)`) inside sensor loops.  
**Provenance Status:** SYNTHETIC_FIXTURE / SIMULATED.

Per Master Plan Section 4 Item 15:
- This file was previously mislabelled as firmware.
- It is a host simulation test fixture, not embedded firmware.
- The canonical production firmware for the RAK4631 / nRF52840 is located in `firmware/src/main.cpp`.
