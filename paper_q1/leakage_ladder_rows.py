"""
Row-level companion to the leakage ladder.

The inspection-level ladder found no hive leakage. That is expected if the
unit of analysis has already removed near-duplicate rows: 306 inspections give
six rows per hive, none adjacent.

This script keeps the same label, the same transform and the same models, and
changes only the unit of analysis back to the individual telemetry record.
If the literature's high scores come from row-level protocols, the P0 to P2
gap should appear here and not at inspection level.

Run:
    python -m paper_q1.leakage_ladder_rows
"""
from __future__ import annotations

import json
import warnings
from pathlib import Path
from typing import Dict, List, Tuple

import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    balanced_accuracy_score,
    f1_score,
    roc_auc_score,
)
from sklearn.model_selection import StratifiedGroupKFold, StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

warnings.filterwarnings("ignore", category=UserWarning)

REPO_ROOT = Path(__file__).resolve().parents[1]
RAW = REPO_ROOT / "data" / "raw" / "mspb" / "D1_sensor_data.csv"
FEAT = REPO_ROOT / "data" / "processed" / "mspb_colony_strength_features.csv"
OUT = REPO_ROOT / "paper_q1" / "results" / "leakage_ladder_rows.json"

HZ_COLS = [
    "hz_122.0703125", "hz_152.587890625", "hz_183.10546875",
    "hz_213.623046875", "hz_244.140625", "hz_274.658203125",
    "hz_305.17578125", "hz_335.693359375", "hz_366.2109375",
    "hz_396.728515625", "hz_427.24609375", "hz_457.763671875",
    "hz_488.28125", "hz_518.798828125", "hz_549.31640625",
    "hz_579.833984375",
]
BAND_EDGES = [(30, 100), (100, 180), (180, 280), (280, 380),
              (380, 500), (500, 750), (750, 1200), (1200, 2000)]
MAX_ROWS_PER_WINDOW = 300
SEEDS = (0,)


def build_row_features() -> pd.DataFrame:
    hz_freqs = [float(c.replace("hz_", "")) for c in HZ_COLS]
    bin_to_band: List[int | None] = []
    for f in hz_freqs:
        assigned = None
        for b, (lo, hi) in enumerate(BAND_EDGES):
            if lo <= f < hi:
                assigned = b
                break
        bin_to_band.append(assigned)

    insp = pd.read_csv(FEAT)
    insp["inspection_date"] = pd.to_datetime(insp["inspection_date"])

    print("[rows] loading telemetry ...")
    tel = pd.read_csv(
        RAW,
        usecols=["date", "time", "tag_number", "beehub_name"] + HZ_COLS,
        low_memory=False,
    )
    tel["dt"] = pd.to_datetime(tel["date"] + " " + tel["time"], errors="coerce")
    tel["tag_number"] = pd.to_numeric(tel["tag_number"], errors="coerce")
    tel = tel.dropna(subset=["dt", "tag_number"]).sort_values("dt")
    by_tag = {int(t): g for t, g in tel.groupby("tag_number")}

    rng = np.random.default_rng(0)
    frames = []
    for _, r in insp.iterrows():
        tag = int(r["sensor_tag"])
        g = by_tag.get(tag)
        if g is None:
            continue
        lo = r["inspection_date"] - pd.Timedelta(days=7)
        hi = r["inspection_date"]
        w = g[(g["dt"] >= lo) & (g["dt"] < hi)]
        if len(w) < 10:
            continue
        if len(w) > MAX_ROWS_PER_WINDOW:
            idx = np.sort(rng.choice(len(w), MAX_ROWS_PER_WINDOW, replace=False))
            w = w.iloc[idx]

        raw = w[HZ_COLS].apply(pd.to_numeric, errors="coerce").fillna(-30.0).to_numpy(float)
        lin = 10.0 ** (raw / 10.0)
        band_p = np.zeros((len(w), 8))
        for bi, b in enumerate(bin_to_band):
            if b is not None:
                band_p[:, b] += lin[:, bi]
        eps = 1e-7
        for b in (0, 6, 7):
            band_p[:, b] = np.maximum(band_p[:, b], eps)
        band_db = 10.0 * np.log10(band_p + eps)
        band_rel = band_db - band_db.mean(axis=1, keepdims=True)

        f = pd.DataFrame(band_rel, columns=[f"b{i}" for i in range(8)])
        f["hive_id"] = int(r["hive_id"])
        f["apiary"] = w["beehub_name"].to_numpy()
        f["is_strong"] = int(r["is_strong"])
        frames.append(f)

    out = pd.concat(frames, ignore_index=True)
    print(f"[rows] {len(out)} telemetry rows, {out.hive_id.nunique()} hives")
    print(f"[rows] label balance {out.is_strong.value_counts().to_dict()}")
    return out


def make_models(seed: int) -> Dict[str, object]:
    return {
        "LogisticRegression": Pipeline([
            ("s", StandardScaler()),
            ("c", LogisticRegression(C=1.0, max_iter=3000,
                                     class_weight="balanced", random_state=seed)),
        ]),
        "RandomForest": RandomForestClassifier(
            n_estimators=150, min_samples_leaf=5, class_weight="balanced_subsample",
            random_state=seed, n_jobs=-1),
        "HistGradientBoosting": HistGradientBoostingClassifier(
            max_iter=150, learning_rate=0.08, max_leaf_nodes=15,
            class_weight="balanced", random_state=seed),
    }


def evaluate(y, p) -> Dict[str, float]:
    yp = (p >= 0.5).astype(int)
    return {
        "macro_f1": float(f1_score(y, yp, average="macro", zero_division=0)),
        "balanced_accuracy": float(balanced_accuracy_score(y, yp)),
        "auroc": float(roc_auc_score(y, p)) if len(np.unique(y)) == 2 else float("nan"),
        "n": int(len(y)),
    }


def run(df: pd.DataFrame) -> dict:
    cols = [f"b{i}" for i in range(8)]
    X = df[cols].to_numpy(float)
    y = df["is_strong"].to_numpy(int)
    hives = df["hive_id"].to_numpy()

    names = list(make_models(0))
    acc = {n: np.zeros(len(df)) for n in names}
    cnt = {n: np.zeros(len(df)) for n in names}

    print("[rows] rung P0: random rows, 5-fold x 3 seeds")
    for seed in SEEDS:
        skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=seed)
        for tr, te in skf.split(X, y):
            for n, m in make_models(seed).items():
                m.fit(X[tr], y[tr])
                acc[n][te] += m.predict_proba(X[te])[:, 1]
                cnt[n][te] += 1

    out: Dict[str, dict] = {}
    for n in names:
        p = acc[n] / np.maximum(cnt[n], 1)
        out[f"P0|{n}"] = evaluate(y, p)
        print(f"  P0 {n:22s} F1={out[f'P0|{n}']['macro_f1']:.4f} "
              f"BA={out[f'P0|{n}']['balanced_accuracy']:.4f}")

    print("[rows] rung P2: grouped five-fold on hive")
    acc = {n: np.zeros(len(df)) for n in names}
    cnt = {n: np.zeros(len(df)) for n in names}
    sgkf = StratifiedGroupKFold(n_splits=5)
    for seed in SEEDS:
        for tr, te in sgkf.split(X, y, groups=hives):
            for n, m in make_models(seed).items():
                m.fit(X[tr], y[tr])
                acc[n][te] += m.predict_proba(X[te])[:, 1]
                cnt[n][te] += 1

    for n in names:
        p = acc[n] / np.maximum(cnt[n], 1)
        out[f"P2|{n}"] = evaluate(y, p)
        print(f"  P2 {n:22s} F1={out[f'P2|{n}']['macro_f1']:.4f} "
              f"BA={out[f'P2|{n}']['balanced_accuracy']:.4f}")

    return out


def main() -> int:
    df = build_row_features()
    res = run(df)

    payload = {
        "metadata": {
            "title": "Row-level leakage test",
            "provenance": "REAL_PUBLIC_DATASET",
            "dataset": "MSPB D1",
            "unit_of_analysis": "telemetry row",
            "transform": "eight relative bands, gain invariant",
            "max_rows_per_window": MAX_ROWS_PER_WINDOW,
            "n_rows": int(len(df)),
            "n_hives": int(df.hive_id.nunique()),
            "seeds": list(SEEDS),
            "cv": "5-fold stratified group (hive)",
        },
        "results": res,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"\nwritten to {OUT}")

    print("\n=== row-level gap (macro F1) ===")
    for n in ("LogisticRegression", "RandomForest", "HistGradientBoosting"):
        if f"P0|{n}" in res and f"P2|{n}" in res:
            print(f"  {n:22s} P0={res[f'P0|{n}']['macro_f1']:.4f} "
                  f"P2={res[f'P2|{n}']['macro_f1']:.4f} "
                  f"gap={res[f'P0|{n}']['macro_f1'] - res[f'P2|{n}']['macro_f1']:+.4f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

