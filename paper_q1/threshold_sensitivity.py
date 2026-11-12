"""
Label-threshold sensitivity for the leakage ladder.

The main analysis labels a colony strong at 20 covered frames, following the
dataset authors.  A reviewer can reasonably ask whether the null result is an
artefact of that cut-off.  This script repeats the two extreme rungs at 15 and
25 frames and reports the same gap.

The estimator here is five-fold stratified group cross-validation rather than
leave-one-hive-out, to keep the sweep cheap.  The quantity of interest is the
P0 to P2 gap, not the absolute score, so the two must not be compared directly
with Table 1 of the manuscript.

Run:
    python -m paper_q1.threshold_sensitivity
"""
from __future__ import annotations

import json
import warnings
from pathlib import Path
from typing import Dict

import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedGroupKFold, StratifiedKFold

from paper_q1.leakage_ladder import (
    ENVIRONMENT,
    BANDS,
    RAW,
    attach_apiary,
    make_models,
    score_block,
)

warnings.filterwarnings("ignore")

REPO_ROOT = Path(__file__).resolve().parents[1]
FEAT = REPO_ROOT / "data" / "processed" / "mspb_colony_strength_features.csv"
OUT = REPO_ROOT / "paper_q1" / "results" / "threshold_sensitivity.json"

THRESHOLDS = (15.0, 20.0, 25.0)
TRANSFORMS: Dict[str, list] = {
    "bands": BANDS,
    "raw": RAW,
    "bands_env": BANDS + ENVIRONMENT,
}
SEED = 0


def run(df: pd.DataFrame, cols: list, grouped: bool) -> Dict[str, dict]:
    X = df[cols].to_numpy(float)
    y = df["is_strong"].to_numpy(int)
    hives = df["hive_id"].to_numpy()

    names = list(make_models(SEED))
    proba = {n: np.zeros(len(df)) for n in names}
    counts = np.zeros(len(df))

    if grouped:
        folds = StratifiedGroupKFold(n_splits=5).split(X, y, groups=hives)
    else:
        folds = StratifiedKFold(n_splits=5, shuffle=True,
                                random_state=SEED).split(X, y)

    for tr, te in folds:
        for n, m in make_models(SEED).items():
            m.fit(X[tr], y[tr])
            proba[n][te] += m.predict_proba(X[te])[:, 1]
        counts[te] += 1

    return {n: score_block(y, proba[n] / np.maximum(counts, 1)) for n in names}


def main() -> int:
    df = attach_apiary(pd.read_csv(FEAT))
    frames = df["total_frames"].to_numpy(float)

    results: Dict[str, dict] = {}
    for t in THRESHOLDS:
        label = (frames >= t).astype(int)
        work = df.copy()
        work["is_strong"] = label
        pos = int(label.sum())
        print(f"\n[threshold] {t:.0f} frames: {pos} strong, "
              f"{len(label) - pos} weak", flush=True)

        for tname, cols in TRANSFORMS.items():
            p0 = run(work, cols, grouped=False)
            p2 = run(work, cols, grouped=True)
            for model in p0:
                key = f"{t:.0f}|{tname}|{model}"
                results[key] = {
                    "threshold": t,
                    "transform": tname,
                    "model": model,
                    "p0": p0[model],
                    "p2": p2[model],
                    "gap": p0[model]["macro_f1"] - p2[model]["macro_f1"],
                    "n_pos": pos,
                }
            print(f"  {tname:10s} "
                  + "  ".join(f"{m[:6]} {p0[m]['macro_f1'] - p2[m]['macro_f1']:+.4f}"
                              for m in p0), flush=True)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({
        "metadata": {
            "title": "Label threshold sensitivity",
            "provenance": "REAL_PUBLIC_DATASET",
            "dataset": "MSPB D1",
            "cv": "five-fold stratified group (hive)",
            "thresholds": list(THRESHOLDS),
            "n_rows": int(len(df)),
            "n_hives": int(df.hive_id.nunique()),
        },
        "results": results,
    }, indent=2), encoding="utf-8")
    print(f"\nwritten to {OUT}", flush=True)

    print("\n=== P0 - P2 gap by threshold and transform (macro F1) ===")
    for tname in TRANSFORMS:
        print(f"\n{tname}")
        for t in THRESHOLDS:
            gaps = [v["gap"] for k, v in results.items()
                    if v["threshold"] == t and v["transform"] == tname]
            print(f"  {t:5.0f} frames   mean gap {np.mean(gaps):+.4f}   "
                  f"range {min(gaps):+.4f} to {max(gaps):+.4f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
