# 📄 IEEE HardwAIre Challenge Phase 2 - Final Submission Report

This directory contains the official **2-Page Project Description Report** in LaTeX formatted strictly according to the **IEEE HardwAIre Challenge Phase 2 Guidance Document** (due September 10).

---

## 📌 Document Specifications & IEEE Compliance Summary

| Requirement | IEEE Phase 2 Rule | Beevil Knievel Submission | Compliance |
|---|---|---|:---:|
| **Page Budget** | Strictly $\le 2$ Pages (Longer = Disqualified) | Exactly 2 Pages (IEEEtran 10pt 2-Column) | ✅ 100% |
| **Real-World Scenario** | Explicitly detail real-world scenario/story | 55.6% colony mortality, $17B pollination crisis, thermal disruption | ✅ 100% |
| **End-to-End System** | Inside-Hive Sensor Node + Fabricated Reader | RAK4631 Field Node + Raspberry Pi 3B+ Custom LoRa HAT Gateway | ✅ 100% |
| **Innovative Use of AI** | Demonstrate impact of AI on device efficiency | TinyML 256-pt FFT + CUSUM cuts payload by 99.7%, saving battery to 18+ mo | ✅ 100% |
| **Simulation Modeling** | Simulation data (ANSYS or equivalent) | 11 comprehensive ANSYS Workbench simulations (HFSS, Icepak, Fluent, Mech) | ✅ 100% |
| **Prototype Cost** | Lowest possible BoM converted to USD | **$18.74 USD** (Node) + **$45.80 USD** (Reader) = **$64.54 USD** (Limit: $1,000) | ✅ 100% |
| **Energy Consumption** | Measured in watt-hours | **0.0428 mWh / 5-min cycle** ($12.32\,\text{mWh/day}$) | ✅ 100% |
| **Size & Weight** | Grams and volume in smallest container | **65 x 55 x 15 mm**, **53.6 cm³** volume, **67.0 grams** weight | ✅ 100% |
| **Coverage in cm** | Max distance in centimeters | **1,500,000 cm** (15.0 km LOS) / **150,000 cm** (1.5 km dense canopy) | ✅ 100% |
| **Temp Accuracy** | Readings in tenths of degrees | **$\pm 0.1^\circ\text{C}$** NIST-traceable (TI TMP117) | ✅ 100% |

---

## 🚀 How to Compile to PDF

### Method 1: Overleaf (Recommended)
1. Open [Overleaf](https://www.overleaf.com).
2. Create a **New Project** > **Upload Project**.
3. Upload `ieee_hart_phase2_report.tex`.
4. Click **Recompile** (TeX Engine: `pdfLaTeX` or `LaTeX`).
5. Download the 2-page PDF ready for submission!

### Method 2: Local Command Line (TeXLive / MacTeX / MikTeX)
```bash
pdflatex ieee_hart_phase2_report.tex
bibtex ieee_hart_phase2_report
pdflatex ieee_hart_phase2_report.tex
pdflatex ieee_hart_phase2_report.tex
```

---

## 👥 Authors & Affiliation
* **Atharve Dahima** (System Architecture & Edge AI Lead)
* **Srajan Mishra** (Hardware & Power Systems)
* **Loshini Shankar** (Field Testing & Documentation)
* **Dr. Vishal D.** (Faculty Advisor & IEEE Student Branch Counselor)
* *School of Applied Sciences, Engineering & Technology, Rashtriya Raksha University (RRU), Lavad, Gandhinagar, Gujarat, India*
