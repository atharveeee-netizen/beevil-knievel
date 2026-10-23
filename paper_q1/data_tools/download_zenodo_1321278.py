"""
paper_q1.data_tools.download_zenodo_1321278: Ingest Zenodo 1321278 (D2: "To bee or not to bee").
"""

from __future__ import annotations

import json
import sys
import time
from pathlib import Path
import requests

from paper_q1.data_tools.manifest_manager import ManifestManager


ZENODO_RECORD_ID = "1321278"
ZENODO_DOI = "10.5281/zenodo.1321278"
ZENODO_LICENSE = "CC-BY-4.0"
API_URL = f"https://zenodo.org/api/records/{ZENODO_RECORD_ID}"
METADATA_FALLBACK = Path(__file__).parent / "zenodo_1321278_api_metadata.json"


def download_file(url: str, dest_path: Path, expected_size: int | None = None) -> bool:
    """Download a file with streaming chunks and status reporting."""
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
                for chunk in r.iter_content(chunk_size=1048576):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        now = time.time()
                        if now - last_print > 1.0 or downloaded == total_size:
                            pct = (downloaded / total_size * 100) if total_size else 0
                            mb = downloaded / (1024 * 1024)
                            total_mb = total_size / (1024 * 1024) if total_size else 0
                            speed = mb / (now - start_time + 1e-6)
                            print(f"\r    -> {dest_path.name}: {mb:.1f}/{total_mb:.1f} MB ({pct:.1f}%) at {speed:.2f} MB/s", end="", flush=True)
                            last_print = now
            print()

        if expected_size and temp_path.stat().st_size != expected_size:
            print(f"  [ERROR] Size mismatch: got {temp_path.stat().st_size}, expected {expected_size}")
            temp_path.unlink(missing_ok=True)
            return False

        temp_path.replace(dest_path)
        return True
    except Exception as e:
        print(f"\n  [ERROR] Download failed for {dest_path.name}: {e}")
        temp_path.unlink(missing_ok=True)
        return False


def ingest_zenodo_1321278(data_dir: Path, max_files: int | None = None) -> bool:
    """Download Zenodo 1321278 files into data/raw/zenodo_1321278/."""
    print("--- [D2: Zenodo 1321278] Ingestion ('To bee or not to bee') ---")
    dest_dir = data_dir / "raw" / "zenodo_1321278"
    dest_dir.mkdir(parents=True, exist_ok=True)
    manifest_mgr = ManifestManager(data_dir / "MANIFEST.csv")

    files_list = []
    try:
        r = requests.get(API_URL, headers={"User-Agent": "BeevilKnievel-Q1ResearchAgent/1.0"}, timeout=15)
        if r.status_code == 200:
            files_list = r.json().get("files", [])
    except Exception:
        pass

    if not files_list and METADATA_FALLBACK.exists():
        print(f"  [INFO] Using cached metadata from {METADATA_FALLBACK.name}")
        with open(METADATA_FALLBACK, "r", encoding="utf-8") as f:
            d = json.load(f)
            files_list = d.get("files", [])

    if not files_list:
        print("  [ERROR] No file metadata available for Zenodo 1321278")
        return False

    manifest_entries = manifest_mgr.get_entries()
    print(f"  Found {len(files_list)} files in record catalog.")

    # Prioritize label files (.lab, .mlf) first, then audio files (.wav, .mp3)
    sorted_files = sorted(files_list, key=lambda x: (not x["key"].endswith(".lab") and not x["key"].endswith(".mlf"), x["key"]))
    
    if max_files:
        sorted_files = sorted_files[:max_files]

    all_success = True
    for item in sorted_files:
        filename = item["key"]
        file_size = item["size"]
        file_url = item["links"]["self"]
        file_dest = dest_dir / filename
        rel_key = file_dest.relative_to(data_dir).as_posix()

        if file_dest.exists() and file_dest.stat().st_size == file_size:
            if rel_key in manifest_entries:
                continue

        success = download_file(file_url, file_dest, expected_size=file_size)
        if success:
            rec = manifest_mgr.register_file(
                filepath=file_dest,
                base_dir=data_dir,
                url=file_url,
                license_str=ZENODO_LICENSE,
                provenance_tag="REAL_PUBLIC_DATASET"
            )
            print(f"  [SAVED] {filename} -> SHA256: {rec['sha256'][:16]}... registered in MANIFEST.csv")
        else:
            all_success = False

    return all_success


if __name__ == "__main__":
    root_data = Path(__file__).resolve().parent.parent.parent / "data"
    success = ingest_zenodo_1321278(root_data)
    sys.exit(0 if success else 1)
