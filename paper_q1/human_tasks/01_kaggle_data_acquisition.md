# Human Task 01: Kaggle Dataset Acquisition (D1 & D3)

**Role Required:** Human researcher with Kaggle account.  
**Associated Tasks:** T1 (Queen presence/absence), T3 (Audio + Environment fusion).  
**Datasets:**
1. **D1: BeeTogether** (Bricout et al., *Sensors* 2024, DOI: 10.3390/s24186067)
   - Kaggle Slug: `augustin23/beetogether`
   - URL: https://www.kaggle.com/datasets/augustin23/beetogether
   - Content: ~396k 2-second audio clips (8 kHz mono), metadata with hive `groupID`, queen status labels.
2. **D3: Smart Bee Colony Monitor (SBCM)** (Yang et al., arXiv:2509.17800)
   - Kaggle Slug: `annajyang/beehive-sounds`
   - URL: https://www.kaggle.com/datasets/annajyang/beehive-sounds
   - Content: ~7,100 clips across 4 California hives with environmental telemetry (temperature, humidity, pressure, weather).

---

## Instructions

You have two options to acquire and stage these datasets:

### Option A: Using the Kaggle API (Recommended)
1. Log in to your Kaggle account at [kaggle.com](https://www.kaggle.com).
2. Go to **Account Settings** -> **API** -> Click **Create New Token**.
3. A file named `kaggle.json` will be downloaded.
4. Move `kaggle.json` to your user profile directory:
   - Windows: `C:\Users\<YourUsername>\.kaggle\kaggle.json`
5. Run the automated data tool:
   ```powershell
   python -m paper_q1.run data
   ```
   The runner will automatically detect your credentials, download the datasets, verify SHA-256 hashes, and log them into `data/MANIFEST.csv`.

### Option B: Manual Web Browser Download
1. Visit the two dataset URLs above while logged into Kaggle and click **Download** (Archive zip).
2. Create the destination directories inside the repository:
   - `data/raw/beetogether/`
   - `data/raw/sbcm/`
3. Extract or place the downloaded files into their respective directories:
   - BeeTogether contents -> `data/raw/beetogether/`
   - SBCM contents -> `data/raw/sbcm/`
4. Run the data ingestion step to calculate checksums and update the manifest:
   ```powershell
   python -m paper_q1.run data
   ```

---

## Verification
Run:
```powershell
python -m paper_q1.run audit
```
This will check file integrity, compute class distributions, extract the confound matrix, and update `paper_q1/results/data_audit.json`.
