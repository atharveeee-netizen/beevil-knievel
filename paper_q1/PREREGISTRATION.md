# Study Preregistration: Leakage-Safe Apicultural Multi-Dataset Benchmark

**Study Title:** *Hive-independent, edge-deployable acoustic–thermal colony monitoring on a LoRa node: a leakage-safe multi-dataset benchmark with measured on-device cost.*  
**Authors:** Atharve Dahima, Srajan Mishra, Dr Vishal Sharma  
**Target Venue:** Elsevier *Computers and Electronics in Agriculture* (COMPAG)  
**Date of Preregistration:** 2026-10-23  
**Status:** FROZEN BEFORE ANY MODEL TRAINING  

---

## 1. Context and Problem Statement
Recent literature on machine learning for honeybee (*Apis mellifera*) colony acoustics reports classification accuracies frequently exceeding 98%. However, closer forensic scrutiny reveals widespread data leakage:
1. **Hive-Identity Memorization:** Random segment-level splits place adjacent 2-second audio clips from the same recording or hive into both training and test sets. Classifiers memorize the ambient acoustic background, hive resonance, or specific recording hardware rather than genuine colony bioacoustics.
2. **Thermal-Acoustic Confound:** Multi-modal benchmarks often embed synthetic or hand-coded thermal anomalies ($\Delta T < 5^\circ\text{C}$ for queenless colonies), allowing heuristic rules to achieve 100% "detection" without exercising the acoustic pipeline.
3. **Unmeasured Edge Targets:** Embedded claims ("80 µJ per inference", "18 µA sleep current", "4.2 km range") are frequently published as targets without physical bench instruments or hardware-in-the-loop validation.

This benchmark establishes a leakage-safe, reproducible evaluation across 4 verified public datasets and hardware bench measurements on the Nordic nRF52840 / Semtech SX1262 LoRa platform.

---

## 2. Hard Ground Rules and Explicit Non-Claims
1. **Zero Field Deployment Claim:** The BEEVIL KNIEVEL hardware was **NOT** deployed in a live apiary. All empirical validation is derived exclusively from:
   - Published, peer-reviewed public apiary datasets (D1: BeeTogether, D2: Zenodo 1321278, D3: SBCM, D4: MSPB).
   - Real physical bench measurements on commercial off-the-shelf (COTS) WisBlock RAK4631 nodes and Raspberry Pi gateways using laboratory instruments.
   - Analytical models, unambiguously labeled `ANALYTICAL_MODEL`.
2. **Zero Invented Numbers:** Every numeric value reported in the manuscript originates from an automated script outputting to `paper_q1/results/*.json` and mapped via `paper_q1/manuscript/numbers.tex`.
3. **Strict Phase Discipline:** This preregistration document and all outer test split hashes are committed to git version control **prior to executing Phase 5 (model training)**.

---

## 3. Pre-Specified Hypotheses

- **Hypothesis 1 (The Generalization Gap):**  
  Classifiers evaluated under naive random segment splits (Protocol P-C) will overestimate out-of-sample balanced accuracy by $\ge 15.0$ percentage points compared to rigorous hive-independent evaluation (Protocol P-A, `StratifiedGroupKFold` grouped by hive).

- **Hypothesis 2 (Bioacoustic Feasibility without Thermal Confound):**  
  When evaluated on purely acoustic data with thermal confounds removed, classical feature-based models ($F_0$ band energies) and neural models will achieve balanced accuracy statistically significantly above the random/majority floor ($p < 0.05$, corrected resampled t-test), but will exhibit substantial inter-hive variance.

- **Hypothesis 3 (Multi-Modal Synergy):**  
  Fusing acoustic spectral band features with physical hive telemetry (temperature, relative humidity, pressure) under Protocol P-A will yield higher balanced accuracy and lower false-alarm rates than acoustic-only or thermal-only models.

- **Hypothesis 4 (Edge Quantization Parity):**  
  Quantizing acoustic models from FP32 to INT8 using ARM CMSIS-NN and TensorFlow Lite for Microcontrollers (TFLM) will preserve test balanced accuracy within 1.5 percentage points while reducing inference energy ($\mu\text{J}$) by $\ge 3\times$ on the ARM Cortex-M4F MCU.

---

## 4. Benchmark Tasks

| Task ID | Description | Source Dataset | Input Modality | Target Classes | Evaluation Metric |
|---|---|---|---|---|---|
| **T1** | Queen Presence Detection | D1 (BeeTogether) | Audio (8 kHz) | Binary: Queen Present vs Queen Absent | Balanced Accuracy, Macro-F1 |
| **T2** | Bee Activity Gating | D2 (Zenodo 1321278) | Audio (16 kHz / 4 kHz) | Binary: Bee Audio vs Environmental Noise | Balanced Accuracy, AUPRC |
| **T3** | Acoustic + Environmental Fusion | D3 (SBCM) | Audio + Temp + Humidity | Multi-class: Normal, Queenless, Swarm | Balanced Accuracy, Confusion Matrix |
| **T4** | Colony Phenotypic Outcomes | D4 (MSPB) | 16 Band Features + Brood Temp | (a) Winter Survival (b) Strength $\ge 20$ frames | AUROC, Balanced Accuracy |
| **CD** | Thermal Collapse Change Detection | D4 (MSPB) | Brood Core Temperature (15-min) | Change-point detection delay, ARL$_0$ | Detection delay (hours), False Alarm Rate |

---

## 5. Evaluation Protocols & Anti-Leakage Constraints

### Protocol P-A: Unseen Hive (Primary Protocol)
- `StratifiedGroupKFold` with $k = 5$ folds, where `groups = hive_id`.
- Repeated over 3 random seeds (Seed 0, Seed 1, Seed 2), generating exactly 15 outer splits.
- All models are evaluated on identical, pre-frozen fold partitions.
- **Strict Leakage Barrier:** No audio segment or time slice from any recording in the test fold may appear in the training fold. All normalizers, feature scalers, and imputation parameters are fitted strictly on the training fold.

### Protocol P-B: Cross-Dataset Generalization
- Models trained on NU-Hive + OSBH (D1/D2) and tested on SBCM (D3), and vice versa.
- Mutual overlap deduplication enforced: shared recordings between D1, D2, and D3 are explicitly excluded from cross-testing.

### Protocol P-C: Random Segment Split (Ablation Benchmark)
- Clips partitioned randomly without hive grouping (reproducing common literature methodologies).
- Reported strictly as an ablation to quantify the magnitude of the generalization gap ($\Delta_{\text{gap}} = \text{Acc}_{\text{P-C}} - \text{Acc}_{\text{P-A}}$).

---

## 6. Model Hierarchy & Progression Order
Models must be trained and logged in strict sequence to avoid selective reporting:
1. **Level 0 (Floor):** Majority-class baseline and stratified chance predictor.
2. **Level 1 (Repo Baseline):** Existing heuristic rule-based classifier.
3. **Level 2 (Classical $F_0$):** Linear Logistic Regression, Random Forest (100 trees), LightGBM, and 2-layer MLP on 8-band relative log-energy vectors.
4. **Level 3 (Literature Baseline):** MFCC (13 coeffs) + Support Vector Machine (RBF kernel), matching standard literature baselines.
5. **Level 4 (On-Device Neural):** Depthwise-Separable CNN (DS-CNN) operating on log-mel spectrogram frames, constrained to $< 64$ KB RAM and $< 128$ KB Flash.
6. **Level 5 (Upper Bound):** Pre-trained Audio Spectrogram Transformer / PANNs (CNN14) transfer learning.

---

## 7. Statistical Testing & Significance Thresholds
- Differences between paired fold scores across algorithms evaluated via:
  - Nadeau and Bengio (2003) corrected resampled t-test for cross-validation.
  - Non-parametric Friedman test with Nemenyi post-hoc analysis across model families.
  - 1,000-sample stratified bootstrap confidence intervals (95% CI) for all headline metrics.
- Significance threshold: $\alpha = 0.05$.
- Negative or non-significant results will be fully reported in accordance with scientific integrity guidelines.

---

## 8. Frozen Split Signatures
Outer cross-validation split files are stored in `paper_q1/splits/` and hashed with SHA-256 before model training commences.
