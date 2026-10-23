"""
paper_q1.bench_tools.parse_lora_per: Processes conducted LoRa attenuation bench logs.
Computes empirical PER curves, sensitivity limits (1% and 10% PER thresholds),
and RSSI/SNR linearity.
Provenance Tag: REAL_BENCH_MEASUREMENT
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Dict, Any
import numpy as np
import pandas as pd

REPO_ROOT = Path(__file__).resolve().parent.parent.parent


def parse_lora_per_csv(csv_path: Path) -> Dict[str, Any]:
    if not csv_path.exists():
        raise FileNotFoundError(f"Conducted LoRa PER log not found at {csv_path}")

    print(f"Reading LoRa PER log from {csv_path}...")
    df = pd.read_csv(csv_path)

    # Required columns: attenuation_db, packets_sent, packets_recv, rssi_dbm, snr_db
    col_map = {c: c.strip().lower() for c in df.columns}
    df.rename(columns=col_map, inplace=True)

    att_col = [c for c in df.columns if "att" in c][0]
    sent_col = [c for c in df.columns if "sent" in c][0]
    recv_col = [c for c in df.columns if "recv" in c or "rx" in c][0]
    rssi_col = [c for c in df.columns if "rssi" in c][0]
    snr_col = [c for c in df.columns if "snr" in c][0]

    df["per"] = 1.0 - (df[recv_col] / df[sent_col])

    # Find sensitivity limits
    per_1pct_att = None
    per_10pct_att = None

    for _, row in df.sort_values(by=att_col).iterrows():
        if row["per"] <= 0.01:
            per_1pct_att = float(row[att_col])
        if row["per"] <= 0.10:
            per_10pct_att = float(row[att_col])

    results = {
        "metadata": {
            "source_file": csv_path.name,
            "provenance": "REAL_BENCH_MEASUREMENT",
            "test_type": "conducted_rf_attenuation_sweep",
            "total_steps": len(df)
        },
        "sensitivity": {
            "max_attenuation_1pct_per_db": per_1pct_att,
            "max_attenuation_10pct_per_db": per_10pct_att,
            "measured_points": [
                {
                    "attenuation_db": float(r[att_col]),
                    "per": round(float(r["per"]), 4),
                    "mean_rssi_dbm": round(float(r[rssi_col]), 1),
                    "mean_snr_db": round(float(r[snr_col]), 1)
                }
                for _, r in df.iterrows()
            ]
        }
    }

    out_file = REPO_ROOT / "paper_q1" / "results" / "measured_lora_per.json"
    out_file.parent.mkdir(parents=True, exist_ok=True)
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    print(f"[OK] Parsed LoRa PER log. Saved to {out_file.relative_to(REPO_ROOT)}")
    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Parse Conducted LoRa PER log")
    parser.add_argument("--input", type=Path, required=True, help="Path to PER CSV log")
    args = parser.parse_args()
    parse_lora_per_csv(args.input)
