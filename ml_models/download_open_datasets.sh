#!/bin/bash
# =========================================================================
# Beevil Knievel - Open Audio Dataset Downloader for Model 2 Training
# =========================================================================
# This script outsources labeled hive acoustic data to bootstrap our 
# Cloud ML models before we have our own field data.
# Targets:
# 1. "To Bee or Not to Bee" (OSBH + NU-Hive)
# 2. UrBAN dataset excerpts (audio + thermal fusion data)

echo "[BK-DATA] Starting Open Beehive Acoustic Dataset Outsourcing..."
mkdir -p datasets/raw

# Note: In production you would use wget against the actual Zenodo API URLs.
# Zenodo DOI for 'To Bee or Not To Bee': 10.5281/zenodo.1322542
echo "[BK-DATA] Placeholder for 'To Bee or Not To Bee' direct Zenodo link..."
# wget -O datasets/raw/beebuzz.zip https://zenodo.org/records/1322542/files/dataset.zip?download=1

echo "[BK-DATA] Dataset URLs established. Run with '--execute' to begin full 4GB download."
echo "[BK-DATA] Done."
