"""
=============================================================================
BEEVIL KNIEVEL — Official Zenodo Dataset Downloader
Downloads actual real-world beehive recordings from Zenodo Record 1321278
("To Bee or Not to Bee: An annotated dataset for beehive sound recognition")
=============================================================================
"""

import urllib.request
import ssl
import os
import sys

# Official Zenodo Dataset Files (Zenodo DOI: 10.5281/zenodo.1321278)
ZENODO_FILES = [
    {
        "filename": "zenodo_active_hive_214.wav",
        "url": "https://zenodo.org/records/1321278/files/CF003%20-%20Active%20-%20Day%20-%20(214).wav?download=1",
        "desc": "Real Beehive Recording — Active Hive (Day)"
    },
    {
        "filename": "zenodo_queen_present_h1.wav",
        "url": "https://zenodo.org/records/1321278/files/Hive1_12_06_2018_QueenBee_H1_audio___15_00_00.wav?download=1",
        "desc": "Real Beehive Recording — Queen Bee Present (NU-Hive H1)"
    },
    {
        "filename": "zenodo_missing_queen_h1.wav",
        "url": "https://zenodo.org/records/1321278/files/Hive1_31_05_2018_NO_QueenBee_H1_audio___15_00_00.wav?download=1",
        "desc": "Real Beehive Recording — Missing Queen / Distress (NU-Hive H1)"
    }
]

def download_zenodo_samples():
    print("=================================================================")
    print("      BEEVIL KNIEVEL — ZENODO REAL DATASET DOWNLOADER           ")
    print("=================================================================")

    target_dir = os.path.join(os.path.dirname(__file__), "sample_bee_audio")
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    # SSL & User-Agent Opener Configuration
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=ctx))
    opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')]
    urllib.request.install_opener(opener)

    for item in ZENODO_FILES:
        filepath = os.path.join(target_dir, item["filename"])
        print(f"\n[DOWNLOAD] Fetching: {item['desc']}")
        print(f"           URL: {item['url']}")
        
        try:
            urllib.request.urlretrieve(item['url'], filepath)
            size_kb = os.path.getsize(filepath) / 1024.0
            print(f"           [SUCCESS] Saved to {item['filename']} ({size_kb:.1f} KB)")
        except Exception as e:
            print(f"           [ERROR] Failed to download: {e}")

    print("\n=================================================================")
    print("Zenodo Dataset Download Complete! Files ready for AI Classifier.")
    print("=================================================================\n")

if __name__ == "__main__":
    download_zenodo_samples()
