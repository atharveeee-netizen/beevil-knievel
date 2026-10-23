"""
paper_q1.data_tools.manifest_manager: Strict cryptographic data hygiene ledger.
"""

from __future__ import annotations

import csv
import datetime
import hashlib
from pathlib import Path
from typing import Dict, List, Optional


class ManifestManager:
    """Manages data/MANIFEST.csv with SHA-256 checksums, licenses, and provenance tags."""

    FIELDNAMES = [
        "sha256",
        "size_bytes",
        "filename",
        "url",
        "license",
        "download_date",
        "provenance_tag"
    ]

    def __init__(self, manifest_path: Path):
        self.manifest_path = manifest_path
        self._ensure_manifest()

    def _ensure_manifest(self) -> None:
        if not self.manifest_path.exists():
            self.manifest_path.parent.mkdir(parents=True, exist_ok=True)
            with open(self.manifest_path, "w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=self.FIELDNAMES)
                writer.writeheader()

    @staticmethod
    def compute_sha256(filepath: Path, chunk_size: int = 65536) -> str:
        """Compute SHA-256 hex digest of a file in streaming chunks."""
        hasher = hashlib.sha256()
        with open(filepath, "rb") as f:
            while chunk := f.read(chunk_size):
                hasher.update(chunk)
        return hasher.hexdigest()

    def get_entries(self) -> Dict[str, Dict[str, str]]:
        """Return a mapping of relative filename -> manifest record."""
        entries = {}
        if not self.manifest_path.exists():
            return entries
        with open(self.manifest_path, "r", newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row.get("filename"):
                    entries[row["filename"]] = row
        return entries

    def register_file(
        self,
        filepath: Path,
        base_dir: Path,
        url: str,
        license_str: str,
        provenance_tag: str = "REAL_PUBLIC_DATASET",
        computed_sha256: Optional[str] = None
    ) -> Dict[str, str]:
        """Record or update a file in the manifest."""
        rel_path = filepath.relative_to(base_dir).as_posix()
        size_bytes = filepath.stat().st_size
        sha256 = computed_sha256 or self.compute_sha256(filepath)
        today = datetime.date.today().isoformat()

        entries = self.get_entries()
        record = {
            "sha256": sha256,
            "size_bytes": str(size_bytes),
            "filename": rel_path,
            "url": url,
            "license": license_str,
            "download_date": today,
            "provenance_tag": provenance_tag,
        }
        entries[rel_path] = record

        # Rewrite manifest sorted by filename
        with open(self.manifest_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=self.FIELDNAMES)
            writer.writeheader()
            for key in sorted(entries.keys()):
                writer.writerow(entries[key])

        return record

    def verify_all(self, base_dir: Path) -> List[Dict[str, str]]:
        """Verify that every file listed in the manifest exists and matches its SHA-256."""
        entries = self.get_entries()
        discrepancies = []
        for rel_name, record in entries.items():
            full_path = base_dir / rel_name
            if not full_path.exists():
                discrepancies.append({"filename": rel_name, "error": "MISSING"})
                continue
            if full_path.stat().st_size != int(record["size_bytes"]):
                discrepancies.append({"filename": rel_name, "error": "SIZE_MISMATCH"})
                continue
            actual_sha = self.compute_sha256(full_path)
            if actual_sha != record["sha256"]:
                discrepancies.append({"filename": rel_name, "error": "SHA256_MISMATCH"})
        return discrepancies
