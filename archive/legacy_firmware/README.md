# Archived Legacy Transmitter Simulation

**Date Archived:** 2026-10-23  
**Reason:** Simulated LoRa transmission via delay loop (`delay(60)`) and hard-coded FFT bands.  
**Provenance Status:** ARCHIVED / SUPERSEDED.

Per Master Plan Section 4 Item 16:
- The sketch `beevil_rak4631_transmitter.ino` did not implement real Semtech SX1262 LoRa transmission over the air.
- Canonical firmware that initializes the SX1262 SPI bus and transmits real binary LoRa packets is located in `firmware/src/main.cpp`.
