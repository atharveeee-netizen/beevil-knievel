"""
Reproduce the published row-level protocol, then remove its leak.

Most high-accuracy reports in hive acoustics treat each recording as an
independent sample and split the recordings at random.  Consecutive recordings
from one hive are near duplicates, so a random split places near copies of the
same signal on both sides of the boundary.

This script runs four protocols on identical data and identical features.

  A   random row split, every row            the published protocol
  A2  random row split, one row per window   split unchanged, duplicates gone
  B   hive-grouped row split, every row      split fixed, duplicates kept
  C   inspection aggregates, hive split      split and aggregation fixed

A to A2 isolates duplicate rows.
A to B isolates hive membership.
B to C isolates aggregation.

Run:
    python -m paper_q1.literature_reproduction
"""
from __future__ import annotations

import json
import time
import warnings
from pathlib import Path
from typing import Dict, Tuple

import numpy as np
import pandas as pd
from sklearn.ensemble import (
    ExtraTreesClassifier,
    HistGradientBoostingClassifier,
    RandomForestClassifier,
)
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, balanced_accuracy_score, f1_score, roc_auc_score
from sklearn.model_selection import StratifiedGroupKFold, StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

warnings.filterwarnings("ignore")

REPO_ROOT = Path(__file__).resolve().parents[1]
RAW = REPO_ROOT / "data" / "raw" / "mspb" / "D1_sensor_data.csv"
FEAT = REPO_ROOT / "data" / "processed" / "mspb_colony_strength_features.csv"
OUT = REPO_ROOT / "paper_q1" / "results" / "literature_reproduction.json"

HZ_COLS = [
    "hz_122.0703125", "hz_152.587890625", "hz_183.10546875",
    "hz_213.623046875", "hz_244.140625", "hz_274.658203125",
    "hz_305.17578125", "hz_335.693359375", "hz_366.2109375",
    "hz_396.728515625", "hz_427.24609375", "hz_457.763671875",
    "hz_488.28125", "hz_518.798828125", "hz_549.31640625",
    "hz_579.833984375",
]

SEED = 0


def make_models(seed: int = SEED) -> Dict[str, object]:
    return {
        "LogisticRegression": Pipeline([
            ("s", StandardScaler()),
            ("c", LogisticRegression(C=1.0, max_iter=3000,
                                     class_weight="balanced", random_state=seed)),
        ]),
        "RandomForest": RandomForestClassifier(
            n_estimators=120, min_samples_leaf=3, class_weight="balanced_subsample",
            random_state=seed, n_jobs=-1),
        "ExtraTrees": ExtraTreesClassifier(
            n_estimators=120, min_samples_leaf=3, class_weight="balanced",
            random_state=seed, n_jobs=-1),
        "HistGradientBoosting": HistGradientBoostingClassifier(
            max_iter=120, learning_rate=0.08, max_leaf_nodes=15,
            class_weight="balanced", random_state=seed),
    }


def evaluate(y: np.ndarray, p: np.ndarray, yhat: np.ndarray) -> Dict[str, float]:
    return {
        "accuracy": float(accuracy_score(y, yhat)),
        "balanced_accuracy": float(balanced_accuracy_score(y, yhat)),
        "macro_f1": float(f1_score(y, yhat, average="macro", zero_division=0)),
        "auroc": float(roc_auc_score(y, p)) if len(np.unique(y)) == 2 else float("nan"),
        "n": int(len(y)),
        "n_pos": int(np.sum(y)),
    }


def build_rows() -> Tuple[pd.DataFrame, pd.DataFrame]:
    """Expand each inspection window to its individual telemetry rows."""
    insp = pd.read_csv(FEAT)
    insp["inspection_date"] = pd.to_datetime(insp["inspection_date"])
    assert not insp.duplicated(["hive_id", "inspection_date"]).any(), (
        "one row per hive and inspection expected")

    print("[repro] loading telemetry ...", flush=True)
    tel = pd.read_csv(
        RAW,
        usecols=["date", "time", "tag_number"] + HZ_COLS,
        low_memory=False,
    )
    tel["dt"] = pd.to_datetime(tel["date"].astype(str) + " " + tel["time"].astype(str),
                               errors="coerce")
    tel["tag_number"] = pd.to_numeric(tel["tag_number"], errors="coerce")
    tel = tel.dropna(subset=["dt", "tag_number"]).sort_values("dt")
    print(f"[repro] {len(tel):,} telemetry rows", flush=True)

    by_tag = {int(t): g for t, g in tel.groupby("tag_number")}

    frames = []
    for _, r in insp.iterrows():
        tag = int(r["sensor_tag"])
        g = by_tag.get(tag)
        if g is None:
            continue
        lo = r["inspection_date"] - pd.Timedelta(days=7)
        w = g[(g["dt"] >= lo) & (g["dt"] < r["inspection_date"])]
        if len(w) < 10:
            continue
        f = w[HZ_COLS].apply(pd.to_numeric, errors="coerce").fillna(-30.0).copy()
        f.columns = [f"b{i}" for i in range(16)]
        f["hive_id"] = int(r["hive_id"])
        f["inspection_date"] = r["inspection_date"]
        f["is_strong"] = int(r["is_strong"])
        frames.append(f)

    rows = pd.concat(frames, ignore_index=True)
    print(f"[repro] {len(rows):,} rows from {len(frames)} windows, "
          f"{rows.hive_id.nunique()} hives", flush=True)
    return rows, insp


def run_protocol(rows: pd.DataFrame, protocol: str) -> Dict[str, dict]:
    cols = [f"b{i}" for i in range(16)]
    X = rows[cols].to_numpy(float)
    y = rows["is_strong"].to_numpy(int)
    hives = rows["hive_id"].to_numpy()

    names = list(make_models())
    proba = {n: np.zeros(len(rows)) for n in names}
    votes = {n: np.zeros(len(rows)) for n in names}
    counts = np.zeros(len(rows))

    if protocol in ("A", "A2"):
        splitter = StratifiedKFold(n_splits=5, shuffle=True, random_state=SEED)
        folds = list(splitter.split(X, y))
    else:
        splitter = StratifiedGroupKFold(n_splits=5)
        folds = list(splitter.split(X, y, groups=hives))

    t0 = time.time()
    for k, (tr, te) in enumerate(folds):
        for n, m in make_models().items():
            m.fit(X[tr], y[tr])
            proba[n][te] += m.predict_proba(X[te])[:, 1]
            votes[n][te] += m.predict(X[te])
        counts[te] += 1
        print(f"  [{protocol}] fold {k + 1}/{len(folds)} "
              f"({time.time() - t0:.0f}s)", flush=True)

    out = {}
    for n in names:
        p = proba[n] / np.maximum(counts, 1)
        yhat = (votes[n] / np.maximum(counts, 1) >= 0.5).astype(int)
        out[n] = evaluate(y, p, yhat)
    return out


def run_inspection_level(insp: pd.DataFrame) -> Dict[str, dict]:
    """Protocol C: aggregate to one row per inspection, then split by hive."""
    cols = [c for c in insp.columns if c.startswith("raw_bin_") and c.endswith("_mean")]
    cols += [c for c in insp.columns if c.startswith("raw_bin_") and c.endswith("_std")]
    X = insp[cols].to_numpy(float)
    y = insp["is_strong"].to_numpy(int)
    hives = insp["hive_id"].to_numpy()

    names = list(make_models())
    proba = {n: np.zeros(len(insp)) for n in names}
    votes = {n: np.zeros(len(insp)) for n in names}
    counts = np.zeros(len(insp))

    for k, (tr, te) in enumerate(
            StratifiedGroupKFold(n_splits=5).split(X, y, groups=hives)):
        for n, m in make_models().items():
            m.fit(X[tr], y[tr])
            proba[n][te] += m.predict_proba(X[te])[:, 1]
            votes[n][te] += m.predict(X[te])
        counts[te] += 1
        print(f"  [C] fold {k + 1}/5", flush=True)

    out = {}
    for n in names:
        p = proba[n] / np.maximum(counts, 1)
        yhat = (votes[n] / np.maximum(counts, 1) >= 0.5).astype(int)
        out[n] = evaluate(y, p, yhat)
    return out


def main() -> int:
    rows, insp = build_rows()

    print("\n[repro] protocol A: random rows, every row", flush=True)
    a = run_protocol(rows, "A")

    print("\n[repro] protocol A2: random rows, one row per window", flush=True)
    thin = (rows.sample(frac=1.0, random_state=SEED)
                .drop_duplicates(["hive_id", "inspection_date"])
                .sort_index())
    n_windows = rows.groupby(["hive_id", "inspection_date"]).ngroups
    assert len(thin) == n_windows, (
        f"A2 kept {len(thin)} rows but there are {n_windows} windows")
    print(f"[repro] A2 keeps {len(thin)} rows, one per hive-date window, "
          f"{int(thin.is_strong.sum())} strong", flush=True)
    a2 = run_protocol(thin, "A2")

    print("\n[repro] protocol B: hive-grouped rows, every row", flush=True)
    b = run_protocol(rows, "B")

    print("\n[repro] protocol C: inspection aggregates, hive-grouped", flush=True)
    c = run_inspection_level(insp)

    payload = {
        "metadata": {
            "title": "Reproduction of the published row-level protocol",
            "provenance": "REAL_PUBLIC_DATASET",
            "dataset": "MSPB D1",
            "features": "16 raw decibel bins",
            "n_rows": int(len(rows)),
            "n_windows": int(rows.groupby(["hive_id", "inspection_date"]).ngroups),
            "n_hives": int(rows.hive_id.nunique()),
            "n_inspections": int(len(insp)),
            "seed": SEED,
            "protocols": {
                "A": "random rows, every row",
                "A2": "random rows, one row per window",
                "B": "hive-grouped rows, every row",
                "C": "inspection aggregates, hive-grouped",
            },
        },
        "results": {"A": a, "A2": a2, "B": b, "C": c},
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"\nwritten to {OUT}", flush=True)

    print("\n=== accuracy, all protocols ===")
    print(f"{'model':22s} {'A':>7s} {'A2':>7s} {'B':>7s} {'C':>7s}   A-B")
    for n in a:
        print(f"{n:22s} {a[n]['accuracy']:7.4f} {a2[n]['accuracy']:7.4f} "
              f"{b[n]['accuracy']:7.4f} {c[n]['accuracy']:7.4f} "
              f"{a[n]['accuracy'] - b[n]['accuracy']:+7.4f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
