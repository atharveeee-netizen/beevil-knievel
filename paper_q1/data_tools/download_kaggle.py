"""
paper_q1.data_tools.download_kaggle: Ingest Kaggle datasets D1 (BeeTogether) and D3 (SBCM).
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

from paper_q1.data_tools.manifest_manager import ManifestManager


KAGGLE_DATASETS = {
    "beetogether": {
        "id": "D1",
        "slug": "augustin23/beetogether",
        "name": "BeeTogether",
        "url": "https://www.kaggle.com/datasets/augustin23/beetogether",
        "license": "CC-BY-NC-SA-4.0",
        "subdir": "beetogether",
        "expected_indicators": ["metadata.csv", "audio", "labels.csv"]
    },
    "sbcm": {
        "id": "D3",
        "slug": "annajyang/beehive-sounds",
        "name": "Smart Bee Colony Monitor (SBCM)",
        "url": "https://www.kaggle.com/datasets/annajyang/beehive-sounds",
        "license": "CC0-1.0",
        "subdir": "sbcm",
        "expected_indicators": ["smart_bee_colony_monitor.csv", "audio"]
    }
}


def check_kaggle_cli_configured() -> bool:
    """Check if kaggle CLI is available and has credentials."""
    kaggle_json = Path.home() / ".kaggle" / "kaggle.json"
    if kaggle_json.exists():
        return True
    return bool(os.environ.get("KAGGLE_USERNAME") and os.environ.get("KAGGLE_KEY"))


def ingest_existing_directory(dest_dir: Path, data_dir: Path, manifest_mgr: ManifestManager, url: str, license_str: str) -> int:
    """Scan and register files in an already downloaded dataset directory."""
    count = 0
    manifest_entries = manifest_mgr.get_entries()
    for p in dest_dir.rglob("*"):
        if p.is_file() and not p.name.endswith(".tmp") and not p.name.endswith(".zip"):
            rel_key = p.relative_to(data_dir).as_posix()
            if rel_key in manifest_entries and p.stat().st_size == int(manifest_entries[rel_key]["size_bytes"]):
                count += 1
                continue
            manifest_mgr.register_file(
                filepath=p,
                base_dir=data_dir,
                url=url,
                license_str=license_str,
                provenance_tag="REAL_PUBLIC_DATASET"
            )
            count += 1
    return count


def ingest_kaggle_datasets(data_dir: Path) -> bool:
    """Ingest BeeTogether (D1) and SBCM (D3)."""
    print("--- [D1 & D3: Kaggle Datasets] Ingestion ---")
    manifest_mgr = ManifestManager(data_dir / "MANIFEST.csv")
    raw_dir = data_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    has_credentials = check_kaggle_cli_configured()

    for key, info in KAGGLE_DATASETS.items():
        print(f"\nChecking dataset [{info['id']}: {info['name']}] ({info['slug']})...")
        dest_dir = raw_dir / info["subdir"]
        dest_dir.mkdir(parents=True, exist_ok=True)

        # Check if zip archive exists in raw_dir
        zip_candidates = list(raw_dir.glob(f"*{key}*.zip")) + list(dest_dir.glob("*.zip"))
        for z in zip_candidates:
            print(f"  [EXTRACT] Found zip archive {z.name}, extracting...")
            with zipfile.ZipFile(z, "r") as zf:
                zf.extractall(dest_dir)
            z.unlink()  # Save disk space

        # Check if directory already has files
        existing_files = list(dest_dir.rglob("*"))
        valid_files = [f for f in existing_files if f.is_file() and not f.name.endswith(".tmp")]

        if valid_files:
            print(f"  Found {len(valid_files)} local files in {dest_dir.relative_to(data_dir)}. Indexing...")
            registered = ingest_existing_directory(dest_dir, data_dir, manifest_mgr, info["url"], info["license"])
            print(f"  [OK] {registered} files indexed in MANIFEST.csv")
            continue

        # If not present and has credentials, attempt download via kaggle API / CLI
        if has_credentials:
            print(f"  [FETCH] Attempting download via Kaggle API: {info['slug']}...")
            try:
                cmd = ["kaggle", "datasets", "download", "-d", info["slug"], "-p", str(dest_dir), "--unzip"]
                res = subprocess.run(cmd, capture_output=True, text=True, check=True)
                print(f"  [OK] Kaggle download succeeded: {res.stdout.strip()}")
                registered = ingest_existing_directory(dest_dir, data_dir, manifest_mgr, info["url"], info["license"])
                print(f"  [OK] {registered} files indexed in MANIFEST.csv")
            except Exception as e:
                print(f"  [WARN] Kaggle API download failed: {e}")
                print(f"  Refer to paper_q1/human_tasks/01_kaggle_data_acquisition.md for manual steps.")
        else:
            print(f"  [PENDING HUMAN TASK] No Kaggle API credentials found.")
            print(f"  Please see instructions in: paper_q1/human_tasks/01_kaggle_data_acquisition.md")
            print(f"  Download from {info['url']} and place into {dest_dir.relative_to(data_dir)}/")

    return True


if __name__ == "__main__":
    root_data = Path(__file__).resolve().parent.parent.parent / "data"
    ingest_kaggle_datasets(root_data)
