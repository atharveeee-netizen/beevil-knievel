"""
=============================================================================
BEEVIL KNIEVEL - Automated Zenodo 1321278 Complete Corpus Downloader
Dataset: "To Bee or Not to Bee: An annotated dataset for beehive sound recognition"
Provenance: Cejrowski et al., 2018 (Zenodo Record 1321278)
Downloads: 54 Real-World Apiary WAV Audio Recordings (~3.49 GB) + Annotations
=============================================================================
"""

import os
import sys
import json
import time
import subprocess
from pathlib import Path

METADATA_FILE = Path(__file__).resolve().parent.parent.parent / "zenodo_metadata.json"
TARGET_DIR = Path(__file__).resolve().parent / "zenodo_full"

def load_metadata():
    if not METADATA_FILE.exists():
        print(f"[ERROR] Metadata file not found at {METADATA_FILE}")
        sys.exit(1)
    with open(METADATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def download_file(file_info, target_dir):
    key = file_info["key"]
    expected_size = file_info["size"]
    # Download URL from Zenodo API
    url = file_info.get("links", {}).get("self")
    if not url:
        url = f"https://zenodo.org/records/1321278/files/{key}?download=1"

    dest_path = target_dir / key
    target_dir.mkdir(parents=True, exist_ok=True)

    if dest_path.exists():
        actual_size = dest_path.stat().st_size
        if actual_size >= expected_size:
            print(f"  [OK] {key} ({actual_size / (1024*1024):.2f} MB) already exists.")
            return True
        else:
            print(f"  [RESUME] {key}: partial download ({actual_size / (1024*1024):.2f} MB / {expected_size / (1024*1024):.2f} MB)")
    else:
        print(f"  [START] {key} ({expected_size / (1024*1024):.2f} MB)...")

    cmd = [
        "curl.exe",
        "-L",
        "-s",
        "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "-C", "-",
        "--connect-timeout", "30",
        "--retry", "3",
        url,
        "-o", str(dest_path)
    ]

    t0 = time.time()
    res = subprocess.run(cmd)
    dt = time.time() - t0

    if dest_path.exists():
        actual_size = dest_path.stat().st_size
        mb = actual_size / (1024 * 1024)
        rate = (mb / dt) if dt > 0 else 0
        if actual_size >= expected_size:
            print(f"  [SUCCESS] {key} ({mb:.2f} MB, {rate:.2f} MB/s)")
            return True
        else:
            print(f"  [PARTIAL] {key} ({actual_size}/{expected_size} bytes)")
            return False
    else:
        print(f"  [FAILED] {key}")
        return False

def main():
    print("=" * 70)
    print("  BEEVIL KNIEVEL - ZENODO 1321278 CORPUS AUTONOMOUS DOWNLOADER")
    print("=" * 70)
    
    meta = load_metadata()
    files = meta.get("files", [])
    
    # Separate WAV files and annotation files
    wav_files = [f for f in files if f["key"].endswith(".wav")]
    lab_files = [f for f in files if f["key"].endswith(".lab") or f["key"] == "beeAnnotations.mlf"]
    
    print(f"Identified {len(wav_files)} audio files and {len(lab_files)} annotation files.")
    print(f"Target Directory: {TARGET_DIR}")
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    
    # 1. Download annotations first (very small, quick)
    print("\n--- Phase 1: Downloading Ground Truth Annotations ---")
    for f in lab_files:
        download_file(f, TARGET_DIR)
        
    # 2. Categorize WAV files to enable balanced interleaved downloading
    categories = {
        "osbh_active": [f for f in wav_files if "CF003" in f["key"]],
        "osbh_queenless": [f for f in wav_files if "CJ001" in f["key"]],
        "nuhive_queen": [f for f in wav_files if "QueenBee" in f["key"] and "NO_QueenBee" not in f["key"]],
        "nuhive_queenless": [f for f in wav_files if "NO_QueenBee" in f["key"]],
    }
    
    print("\nCorpus Category Composition:")
    for cat_name, cat_list in categories.items():
        total_mb = sum(f["size"] for f in cat_list) / (1024 * 1024)
        print(f"  - {cat_name}: {len(cat_list)} files ({total_mb:.1f} MB)")
        
    # Interleave files across categories so training can start early with balanced classes
    interleaved = []
    max_len = max(len(l) for l in categories.values())
    for i in range(max_len):
        for cat_name in ["osbh_active", "osbh_queenless", "nuhive_queen", "nuhive_queenless"]:
            l = categories[cat_name]
            if i < len(l):
                interleaved.append(l[i])
                
    print(f"\n--- Phase 2: Downloading 54 Audio Files (Interleaved Balanced Order) ---")
    success_count = 0
    for idx, f in enumerate(interleaved, 1):
        print(f"[{idx}/{len(interleaved)}] Fetching {f['key']}...")
        ok = download_file(f, TARGET_DIR)
        if ok:
            success_count += 1
            
    print("\n" + "=" * 70)
    print(f"Corpus Download Complete: {success_count}/{len(interleaved)} files downloaded.")
    print("=" * 70)

if __name__ == "__main__":
    main()
