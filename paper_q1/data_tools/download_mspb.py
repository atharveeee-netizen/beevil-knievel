"""
paper_q1.data_tools.download_mspb: Ingest MSPB dataset (D4) from Zenodo Record 11398835.
"""

from __future__ import annotations

import sys
import time
from pathlib import Path
import requests

from paper_q1.data_tools.manifest_manager import ManifestManager


MSPB_RECORD_ID = "11398835"
MSPB_DOI = "10.5281/zenodo.11398835"
MSPB_LICENSE = "CC-BY-4.0"
MSPB_API_URL = f"https://zenodo.org/api/records/{MSPB_RECORD_ID}"

# Files to download for MSPB (D4)
# Video file (MSPB_human_visit_video.mp4) is visual demo only and excluded to conserve storage
TARGET_FILES = [
    "D1_sensor_data.csv",
    "D2_sensor_data.csv",
    "D1_ant.xlsx",
    "D2_ant.xlsx",
    "README.pdf"
]


def download_file(url: str, dest_path: Path, expected_size: int | None = None) -> bool:
    """Download a file with streaming chunks and console progress."""
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = dest_path.with_suffix(dest_path.suffix + ".tmp")

    headers = {"User-Agent": "BeevilKnievel-Q1ResearchAgent/1.0"}
    try:
        with requests.get(url, headers=headers, stream=True, timeout=30) as r:
            r.raise_for_status()
            total_size = int(r.headers.get("content-length", expected_size or 0))
            downloaded = 0
            start_time = time.time()
            last_print = 0

            with open(temp_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=1048576):  # 1MB chunks
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        now = time.time()
                        if now - last_print > 1.0 or downloaded == total_size:
                            pct = (downloaded / total_size * 100) if total_size else 0
                            mb = downloaded / (1024 * 1024)
                            total_mb = total_size / (1024 * 1024) if total_size else 0
                            speed = mb / (now - start_time + 1e-6)
                            print(f"\r    -> Downloading {dest_path.name}: {mb:.1f}/{total_mb:.1f} MB ({pct:.1f}%) at {speed:.2f} MB/s", end="", flush=True)
                            last_print = now
            print()

        if expected_size and temp_path.stat().st_size != expected_size:
            print(f"  [ERROR] Size mismatch: got {temp_path.stat().st_size}, expected {expected_size}")
            temp_path.unlink(missing_ok=True)
            return False

        temp_path.replace(dest_path)
        return True
    except Exception as e:
        print(f"\n  [ERROR] Download failed for {url}: {e}")
        temp_path.unlink(missing_ok=True)
        return False


def ingest_mspb(data_dir: Path) -> bool:
    """Download and register MSPB files into data/raw/mspb/."""
    print("--- [D4: MSPB] Ingestion from Zenodo Record 11398835 ---")
    dest_dir = data_dir / "raw" / "mspb"
    dest_dir.mkdir(parents=True, exist_ok=True)
    manifest_mgr = ManifestManager(data_dir / "MANIFEST.csv")

    try:
        r = requests.get(MSPB_API_URL, headers={"User-Agent": "BeevilKnievel-Q1ResearchAgent/1.0"}, timeout=15)
        r.raise_for_status()
        record_data = r.json()
        files_meta = {f["key"]: f for f in record_data.get("files", [])}
    except Exception as e:
        print(f"  [ERROR] Failed to query Zenodo API for record {MSPB_RECORD_ID}: {e}")
        return False

    all_success = True
    manifest_entries = manifest_mgr.get_entries()

    for filename in TARGET_FILES:
        meta = files_meta.get(filename)
        if not meta:
            print(f"  [WARN] File {filename} not listed in Zenodo record")
            continue

        file_url = meta["links"]["self"]
        file_size = meta["size"]
        file_dest = dest_dir / filename
        rel_key = file_dest.relative_to(data_dir).as_posix()

        # Check if already present and verified
        if file_dest.exists() and file_dest.stat().st_size == file_size:
            if rel_key in manifest_entries:
                print(f"  [OK] {filename} already present and verified in manifest.")
                continue

        print(f"  [FETCH] Downloading {filename} ({file_size / (1024 * 1024):.1f} MB)...")
        success = download_file(file_url, file_dest, expected_size=file_size)
        if success:
            rec = manifest_mgr.register_file(
                filepath=file_dest,
                base_dir=data_dir,
                url=file_url,
                license_str=MSPB_LICENSE,
                provenance_tag="REAL_PUBLIC_DATASET"
            )
            print(f"  [SAVED] {filename} -> SHA256: {rec['sha256'][:16]}... registered in MANIFEST.csv")
        else:
            all_success = False

    return all_success


if __name__ == "__main__":
    root_data = Path(__file__).resolve().parent.parent.parent / "data"
    success = ingest_mspb(root_data)
    sys.exit(0 if success else 1)
