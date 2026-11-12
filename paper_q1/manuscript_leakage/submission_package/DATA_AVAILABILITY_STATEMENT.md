# Data and Code Availability Statement

**Manuscript Title:** Split Protocol or Feature Transform? Explaining Generalisation Gaps in Acoustic Honeybee Colony Classification  
**Journal:** *Computers and Electronics in Agriculture* (Elsevier)

### 1. Primary Public Data
The Multi-Sensor Precision Beekeeping (MSPB) dataset analyzed in this study is an open-access public dataset published by Zhu et al. (2024), *Scientific Data*, 11:794, and is openly accessible via Zenodo at:  
- **Zenodo Record:** [https://zenodo.org/records/11398835](https://zenodo.org/records/11398835)  
- **Persistent DOI:** `10.5281/zenodo.11398835`  
- **Data License:** Creative Commons Attribution 4.0 International (CC BY 4.0).

### 2. Software, Pipelines, and Reproduction Code
All code required to download the raw data, verify SHA-256 file checksums against `MANIFEST.csv`, extract features, execute the four-rung leakage evaluation ladder, run row-level and threshold sensitivity sweeps, and compile the manuscript figures and tables is openly available under an MIT License in the project repository:  
- **GitHub Repository:** [https://github.com/atharveeee-netizen/beevil-knievel](https://github.com/atharveeee-netizen/beevil-knievel)  
- **Permanent Software Archive:** Zenodo DOI pending upon final release tag (`v2.2.0-compag`).

The repository is structured to enable single-command reproduction using `python -m paper_q1.leakage_ladder` and `python -m paper_q1.leakage_spec_generator`.

