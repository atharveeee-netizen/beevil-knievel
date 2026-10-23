"""
paper_q1.data_tools package init.
"""

from pathlib import Path
from paper_q1.data_tools.download_mspb import ingest_mspb
from paper_q1.data_tools.download_zenodo_1321278 import ingest_zenodo_1321278
from paper_q1.data_tools.download_kaggle import ingest_kaggle_datasets


def ingest_datasets(data_dir: Path) -> int:
    """Download/ingest all available public datasets."""
    print("=== [paper_q1] Public Data Ingestion Engine ===")
    
    # Ingest MSPB (D4) - open download from Zenodo
    print("\n[1/3] Processing MSPB (D4)...")
    s_mspb = ingest_mspb(data_dir)
    
    # Ingest Zenodo 1321278 (D2) - open download from Zenodo
    print("\n[2/3] Processing Zenodo 1321278 (D2)...")
    s_zenodo = ingest_zenodo_1321278(data_dir)
    
    # Ingest Kaggle sets (D1 & D3)
    print("\n[3/3] Processing Kaggle Datasets (D1 & D3)...")
    s_kaggle = ingest_kaggle_datasets(data_dir)
    
    print("\n[paper_q1] Ingestion run completed.")
    return 0 if (s_mspb and s_zenodo and s_kaggle) else 1


def audit_datasets(data_dir: Path, results_dir: Path) -> int:
    """Run forensic audit across ingested datasets."""
    from paper_q1.data_tools.audit import run_full_data_audit
    return run_full_data_audit(data_dir, results_dir)
