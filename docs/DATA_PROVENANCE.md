# BEEVIL KNIEVEL — DATA PROVENANCE & TRUTH GOVERNANCE SPECIFICATION

**Standard:** IEEE HARDWAIre Phase 2 Bench Bring-Up  
**Document Revision:** Rev 1.0  
**Effective Date:** September 2026  
**Core Law:** ZERO FABRICATION OF PHYSICAL SENSOR MEASUREMENTS  

---

## 1. Absolute Truth Rule & Data Classification Taxonomy

To ensure scientific and engineering integrity, every data point, telemetry packet, CSV log, and analytical figure generated within the **Beevil Knievel** project must carry unambiguous metadata establishing its provenance.

The six mutually exclusive data provenance classes are:

| PROVENANCE CLASS | DEFINITION | CRITERIA & EVIDENCE REQUIRED |
|---|---|---|
| **`REAL_SENSOR`** | Direct physical measurement from a populated, responsive sensor module. | I2C ACK received; physical register transaction completed; hardware timestamp recorded. |
| **`REAL_SILICON`** | Direct measurement from on-chip MCU peripherals (nRF52840 internal die temperature sensor or SAADC battery divider). | Hardware register `NRF_TEMP->TEMP` or SAADC sample completed without error. |
| **`NOT_CONNECTED`** | Explicit indication that the peripheral or sensor is absent, unpopulated, or non-responsive. | I2C NACK on address scan, 1-Wire discovery returns 0 ROMs, or I2S DMA idle. Sentinel value (`-9999`, `0xFFFF`, or `null`) assigned. |
| **`SIMULATED`** | Mathematically modeled data generated on host or MCU to test algorithms (e.g., CUSUM thermal drift, battery discharge curve, LoRa link margin). | Must be labeled `SIMULATED` in schema; cannot be mixed into real datasets without clear markers. |
| **`SYNTHETIC`** | Artificially generated test signals (e.g., synthetic sine waves, noise vectors) used for DSP unit tests. | Strictly confined to automated test benches (`tests/`). Eradicated from production embedded firmware. |
| **`MANUAL_TEST`** | Test vector manually injected via interactive serial console or API to verify system state machine. | Flagged with `source="MANUAL_TEST"` in telemetry frame and database. |

---

## 2. Telemetry Frame Provenance Schema

Every JSON Lines record produced by the firmware or logger must adhere to the following schema:

```json
{
  "host_timestamp_utc": "2026-09-08T15:51:19.850459+00:00",
  "firmware_version": "v2.1.0-bench",
  "hardware_revision": "Rev 2.1 Bench Prototype",
  "packet": 142,
  "uptime_ms": 284000,
  "source": "REAL_SILICON",
  "environment": "LABORATORY_BENCH",
  "calibration_state": "FACTORY_DEFAULT",
  "die_temp_c": 26.25,
  "vbat_mv": 4015,
  "soc_pct": 86.8,
  "cusum_drift": 0.000,
  "tmp117_c": null,
  "co2_ppm": null,
  "humidity_pct": null,
  "voc_kohm": null,
  "weight_kg": null,
  "lux": null,
  "presence_mask": 0,
  "presence_mask_hex": "0x0000",
  "status": "BENCH_PROTOTYPE_WAITING_SENSORS"
}
```

### Unconnected Sensor Sentinels:
- Floating Point / JSON: `null`
- Binary Telemetry (16-bit signed): `-9999` (e.g., `brood_core_temp_c_x100`, `frame_temps_c_x100`)
- Binary Telemetry (16-bit unsigned): `0xFFFF` (e.g., `humidity_pct_x100`, `co2_ppm`, `weight_kg_x100`)
- Binary Telemetry (8-bit unsigned): `0xFF` (e.g., `tilt_deg`)

---

## 3. Physical Calibration State Tracking

| SENSOR | CALIBRATION REQUIRED | BENCH PROTOTYPE DEFAULT | CALIBRATION PROCEDURE |
|---|---|---|---|
| **TI TMP117** | None (NIST-traceable factory trimmed) | `CALIBRATED_FACTORY` ($\pm 0.1^\circ\text{C}$) | Register read verification against reference platinum RTD |
| **Maxim DS18B20** | Factory trimmed ($\pm 0.5^\circ\text{C}$) | `CALIBRATED_FACTORY` | Ice-point single-temperature offset verification |
| **Sensirion SCD41** | Automatic Baseline Calibration (ASC) | `UNCALIBRATED_FACTORY` | 400 ppm fresh air exposure for 5 continuous minutes |
| **Bosch BME688** | Bosch BSEC gas sensor baseline burn-in | `BURN_IN_PENDING` | 48-hour continuous VOC burn-in run |
| **Avia HX711** | Zero tare + Known mass slope ($y = mx + b$) | `UNCALIBRATED` | Tare with empty hive super, calibrate with 5.00 kg calibrated test weight |
| **InvenSense INMP441**| Sensitivity tolerance ($\pm 1\text{ dB}$) | `CALIBRATED_FACTORY` | 94 dB SPL 1 kHz acoustic calibrator cup |

---

## 4. Verification Checklist for Publication & Competition Artifacts

Before any table, plot, figure, or video includes data:
- [x] Measurement source verified against serial logs (`logs/raw_serial_*.log`).
- [x] No `sinf()` or synthetic sine waves passed off as microphone audio.
- [x] Battery SoC derived from real 7-point LiPo curve with Arrhenius temperature compensation.
- [x] Real bench environment clearly distinguished from projected hive field conditions.
- [x] Hardware status explicitly stated as **BENCH EVALUATION PROTOTYPE**.
