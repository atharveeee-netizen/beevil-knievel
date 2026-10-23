# Datasheet for Apicultural Datasets (D1–D4)
*Prepared following Gebru et al., "Datasheets for Datasets" (CACM 2021) for Q1 Journal Submission.*

---

## 1. Motivation
- **Purpose:** Provide rigorous, leakage-safe empirical benchmarks for acoustic and thermal honeybee (*Apis mellifera*) colony health monitoring on resource-constrained LoRa edge nodes.
- **Funding & Creators:**
  - **D1 (BeeTogether):** Bricout et al., LAAS-CNRS / Sensors 2024 (DOI: 10.3390/s24186067).
  - **D2 (Zenodo 1321278):** Nolasco & Benetos, Queen Mary University of London / DCASE 2018.
  - **D3 (SBCM):** Yang et al., arXiv:2509.17800 (California apiaries).
  - **D4 (MSPB):** Multi-Sensor Polish Beehive, *Scientific Data* 2024 (DOI: 10.1038/s41597-024-03695-1).

---

## 2. Dataset Composition & Audit Summary

### D2: Zenodo 1321278 ("To bee or not to bee")
- **Task Relevance:** T2 (Bee vs. non-bee acoustic gating).
- **Total Audio Files:** 56
- **Total Duration:** 7.34 hours
- **Label Distribution (Annotated Seconds):**
  - Bee: 21730.5 s
  - No-Bee: 7871.4 s
- **Hive Distribution:**
  - `OSBH_CF003`: 14 recordings
  - `OSBH_CJ001`: 5 recordings
  - `NU_Hive_1`: 17 recordings
  - `NU_Hive_3`: 18 recordings
  - `OSBH_CF001`: 1 recordings
  - `OSBH_GH001`: 1 recordings

### D4: MSPB (Multi-Sensor Polish Beehive)
- **Task Relevance:** T4 (Winter survival, colony strength, queen cells) & C4 (Page CUSUM thermal baseline calibration).
- **Hives Monitored:** 53 hives across 2 apiaries.
- **Total Sensor Telemetry Rows:** 1,836,914 records.
- **Sensor Cadence:** 15-minute brood frame temperature and relative humidity; 5-minute extracted acoustic feature vectors.
- **Ground Truth Inspections:** Bi-weekly apiary inspections recording frames of adult bees, brood coverage, queen cells, Varroa count, and post-winter colony survival.

---

## 3. Confound Analysis & Anti-Leakage Protocol
- **Acoustic Confound:** In D1 and D2, recording devices and apiary environments vary significantly across hives. A random segment-level split permits classifiers to achieve >98% accuracy by memorizing microphone frequency responses and hive reverberation rather than bee bioacoustics.
- **Mandatory Split Protocol:** All evaluations must use **Group-K-Fold or Leave-One-Hive-Out** cross-validation grouped strictly by `hive_id`.
- **Deduplication:** BeeTogether (D1) encompasses source audio from D2 (NU-Hive/OSBH) and D3 (SBCM). Test partitions must be strictly mutually exclusive.

---

## 4. Collection & Preprocessing
- **Audio Standardization:** Audio decimated to 4 kHz analysis bandwidth; 512-point real FFT with Hann window and 50% overlap.
- **Temperature Preprocessing:** Residuals computed against a robust rolling 24-hour baseline median to decouple diurnal oscillations from true thermoregulatory collapse.

---

## 5. Provenance & Licensing
- All datasets are open-access research artifacts:
  - D2: Creative Commons Attribution 4.0 International (CC BY 4.0).
  - D4: Creative Commons Attribution 4.0 International (CC BY 4.0).
- Manifest logged with SHA-256 hashes in `data/MANIFEST.csv`.
