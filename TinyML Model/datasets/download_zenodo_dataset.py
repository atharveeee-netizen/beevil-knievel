"""
=============================================================================
BEEVIL KNIEVEL - Official Zenodo Dataset Downloader
Downloads real-world beehive recordings from Zenodo Record 1321278
("To Bee or Not to Bee: An annotated dataset for beehive sound recognition")
=============================================================================
"""

import os
import shutil
import subprocess
import sys

# Official Zenodo Dataset Files (Zenodo DOI: 10.5281/zenodo.1321278)
ZENODO_FILES = [
    {
        "filename": "zenodo_active_214.wav",
        "url": "https://zenodo.org/records/1321278/files/CF003%20-%20Active%20-%20Day%20-%20(214).wav?download=1",
        "desc": "Real Beehive Recording - Active Hive 214 (Day)"
    },
    {
        "filename": "zenodo_h1_queen_1500.wav",
        "url": "https://zenodo.org/records/1321278/files/Hive1_12_06_2018_QueenBee_H1_audio___15_00_00.wav?download=1",
        "desc": "Real Beehive Recording - Queen Present 15:00 (NU-Hive H1)"
    },
    {
        "filename": "zenodo_h1_noqueen_1500.wav",
        "url": "https://zenodo.org/records/1321278/files/Hive1_31_05_2018_NO_QueenBee_H1_audio___15_00_00.wav?download=1",
        "desc": "Real Beehive Recording - Missing Queen 15:00 (NU-Hive H1)"
    }
]

def download_zenodo_samples():
    print("=================================================================")
    print("      BEEVIL KNIEVEL - ZENODO REAL DATASET DOWNLOADER           ")
    print("=================================================================")

    target_dir = os.path.join(os.path.dirname(__file__), "sample_bee_audio")
    os.makedirs(target_dir, exist_ok=True)

    for item in ZENODO_FILES:
        filepath = os.path.join(target_dir, item["filename"])

        # 1. Check if target exists
        if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            size_mb = os.path.getsize(filepath) / (1024.0 * 1024.0)
            print(f"[EXISTS] {item['filename']} already present ({size_mb:.2f} MB)")
            continue

        # 3. Download via curl with browser headers
        print(f"\n[DOWNLOAD] Fetching: {item['desc']}")
        print(f"           URL: {item['url']}")
        cmd = [
            "curl.exe", "-s", "-L",
            "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            item["url"], "-o", filepath
        ]
        try:
            subprocess.run(cmd, check=True)
            if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
                size_mb = os.path.getsize(filepath) / (1024.0 * 1024.0)
                print(f"           [SUCCESS] Saved to {item['filename']} ({size_mb:.2f} MB)")
            else:
                print(f"           [ERROR] File empty or failed to download: {item['filename']}")
        except Exception as e:
            print(f"           [ERROR] Download failed: {e}")

    print("\n=================================================================")
    print("Zenodo Dataset Verification Complete! Files ready for evaluation.")
    print("=================================================================\n")

if __name__ == "__main__":
    download_zenodo_samples()
