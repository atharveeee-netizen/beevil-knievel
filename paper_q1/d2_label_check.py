"""
Measure why the original D2 temperature target was abandoned.

The first analysis plan labelled a colony stressed when the brood-nest
temperature fell below 32 degrees Celsius in D2.  Profiling showed that almost
every D2 row satisfies that condition, so the label carried no information.
This script records the exact proportion, so the manuscript can cite a measured
number rather than a recollection.

Run:
    python -m paper_q1.d2_label_check
"""
from __future__ import annotations

import json
from pathlib import Path

import pandas as pd

REPO_ROOT = Path(__file__).resolve().parents[1]
D2 = REPO_ROOT / "data" / "raw" / "mspb" / "D2_sensor_data.csv"
OUT = REPO_ROOT / "paper_q1" / "results" / "d2_label_check.json"

CUTOFF_C = 32.0


def main() -> int:
    if not D2.exists():
        raise SystemExit(f"missing {D2}")

    df = pd.read_csv(D2, usecols=["temperature"], low_memory=False)
    t = pd.to_numeric(df["temperature"], errors="coerce").dropna()
    below = int((t < CUTOFF_C).sum())
    total = int(len(t))

    payload = {
        "metadata": {
            "title": "D2 temperature label degeneracy check",
            "provenance": "REAL_PUBLIC_DATASET",
            "dataset": "MSPB D2",
            "cutoff_celsius": CUTOFF_C,
        },
        "results": {
            "n_rows": total,
            "n_below_cutoff": below,
            "n_above_cutoff": total - below,
            "pct_below_cutoff": round(below / total * 100.0, 2),
            "median_celsius": round(float(t.median()), 2),
        },
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"{below:,} of {total:,} rows below {CUTOFF_C:.0f} C "
          f"({below / total * 100:.2f}%)")
    print(f"median temperature {t.median():.2f} C")
    print(f"written to {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
