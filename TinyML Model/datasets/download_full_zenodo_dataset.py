"""
=============================================================================
BEEVIL KNIEVEL — Complete Zenodo Public Dataset Downloader
Downloads 14 Real-World Beehive Audio Recordings directly from Zenodo Record 1321278
("To Bee or Not to Bee: An annotated dataset for beehive sound recognition")
=============================================================================
"""

import os
import subprocess
import sys

ZENODO_AUDIO_FILES = [
    # --- Category 1: Active Hive Recordings (Open Source Beehive Project) ---
    ("zenodo_active_214.wav", "https://zenodo.org/records/1321278/files/CF003%20-%20Active%20-%20Day%20-%20(214).wav?download=1"),
    ("zenodo_active_216.wav", "https://zenodo.org/records/1321278/files/CF003%20-%20Active%20-%20Day%20-%20(216).wav?download=1"),
    ("zenodo_active_217.wav", "https://zenodo.org/records/1321278/files/CF003%20-%20Active%20-%20Day%20-%20(217).wav?download=1"),
    ("zenodo_active_218.wav", "https://zenodo.org/records/1321278/files/CF003%20-%20Active%20-%20Day%20-%20(218).wav?download=1"),
    ("zenodo_active_219.wav", "https://zenodo.org/records/1321278/files/CF003%20-%20Active%20-%20Day%20-%20(219).wav?download=1"),

    # --- Category 2: Queen Present Recordings (NU-Hive H1 & H3) ---
    ("zenodo_h1_queen_1500.wav", "https://zenodo.org/records/1321278/files/Hive1_12_06_2018_QueenBee_H1_audio___15_00_00.wav?download=1"),
    ("zenodo_h1_queen_1620.wav", "https://zenodo.org/records/1321278/files/Hive1_12_06_2018_QueenBee_H1_audio___16_20_00.wav?download=1"),
    ("zenodo_h3_queen_0610.wav", "https://zenodo.org/records/1321278/files/Hive3_20_07_2017_QueenBee_H3_audio___06_10_00.wav?download=1"),
    ("zenodo_h3_queen_0620.wav", "https://zenodo.org/records/1321278/files/Hive3_20_07_2017_QueenBee_H3_audio___06_20_00.wav?download=1"),

    # --- Category 3: Missing Queen Recordings (NU-Hive H1 & H3 Queenless Distress) ---
    ("zenodo_h1_noqueen_1500.wav", "https://zenodo.org/records/1321278/files/Hive1_31_05_2018_NO_QueenBee_H1_audio___15_00_00.wav?download=1"),
    ("zenodo_h1_noqueen_1510.wav", "https://zenodo.org/records/1321278/files/Hive1_31_05_2018_NO_QueenBee_H1_audio___15_10_00.wav?download=1"),
    ("zenodo_h3_noqueen_0610.wav", "https://zenodo.org/records/1321278/files/Hive3_15_07_2017_NO_QueenBee_H3_audio___06_10_00.wav?download=1"),
    ("zenodo_h3_noqueen_0620.wav", "https://zenodo.org/records/1321278/files/Hive3_15_07_2017_NO_QueenBee_H3_audio___06_20_00.wav?download=1"),
    ("zenodo_h3_noqueen_0630.wav", "https://zenodo.org/records/1321278/files/Hive3_15_07_2017_NO_QueenBee_H3_audio___06_30_00.wav?download=1")
]

def download_full_zenodo_dataset():
    print("=================================================================")
    print("      BEEVIL KNIEVEL — FULL ZENODO REAL DATASET DOWNLOADER       ")
    print("=================================================================")

    target_dir = os.path.join(os.path.dirname(__file__), "sample_bee_audio")
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    for fname, url in ZENODO_AUDIO_FILES:
        filepath = os.path.join(target_dir, fname)
        if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            print(f"[EXISTS] Skipping {fname} (Already downloaded)")
            continue

        print(f"\n[DOWNLOAD] Fetching {fname} from Zenodo...")
        cmd = [
            "curl.exe", "-s", "-L",
            "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            url, "-o", filepath
        ]
        try:
            subprocess.run(cmd, check=True)
            size_mb = os.path.getsize(filepath) / (1024.0 * 1024.0)
            print(f"           [SUCCESS] Saved {fname} ({size_mb:.2f} MB)")
        except Exception as e:
            print(f"           [ERROR] Failed to download {fname}: {e}")

    print("\n=================================================================")
    print("Full Zenodo Real Dataset Download Complete!")
    print("=================================================================\n")

if __name__ == "__main__":
    download_full_zenodo_dataset()
