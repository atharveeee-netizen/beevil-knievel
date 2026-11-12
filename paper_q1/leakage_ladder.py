"""
Leakage ladder: separate split artefact from feature transform.

Two things can make an acoustic colony classifier look better than it is:

  1. The split lets the same hive appear in train and test.
  2. The features encode microphone gain, which is a hive fingerprint.

Phase 2 tested (1) alone and found no inflation. This script tests both by
crossing the split rule with the feature transform.

Splits, most leaky first:
  P0  stratified random row split        hive seen, apiary seen
  P1  temporal holdout (last round)      hive seen, apiary seen, time unseen
  P2  LeaveOneGroupOut on hive_id        hive unseen, apiary seen
  P3  apiary holdout, both directions    hive unseen, apiary unseen

Transforms:
  bands  eight canonical bands, row-mean subtracted (gain invariant)
  raw    sixteen absolute dB bins (gain retained)
  bands_env  bands plus six indoor environment features

Reported quantity is pooled out-of-fold predictions. Rows that were never
held out are excluded, never filled. Uncertainty is a bootstrap over hives.

Run:
    python -m paper_q1.leakage_ladder
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
    average_precision_score,
    balanced_accuracy_score,
    brier_score_loss,
    f1_score,
    roc_auc_score,
)
from sklearn.model_selection import LeaveOneGroupOut, StratifiedKFold
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

warnings.filterwarnings("ignore", category=UserWarning)

REPO_ROOT = Path(__file__).resolve().parents[1]
FEATURES_CSV = REPO_ROOT / "data" / "processed" / "mspb_colony_strength_features.csv"
OUT_JSON = REPO_ROOT / "paper_q1" / "results" / "leakage_ladder.json"

BANDS = [f"f0_band_{b}_{s}" for b in range(8) for s in ("mean", "std")]
RAW = [f"raw_bin_{i}_{s}" for i in range(16) for s in ("mean", "std")]
ENVIRONMENT = ["temp_mean", "temp_std", "temp_min", "temp_max", "hum_mean", "hum_std"]

TRANSFORMS: Dict[str, List[str]] = {
    "bands": BANDS,
    "raw": RAW,
    "bands_env": BANDS + ENVIRONMENT,
}

TARGET = "is_strong"
GROUPS = "hive_id"
APIARY = "apiary"

SEEDS = (0, 1, 2)
N_BOOT = 2000
RUNGS = ("P0", "P1", "P2", "P3")


# ---------------------------------------------------------------- setup
def attach_apiary(df: pd.DataFrame) -> pd.DataFrame:
    """Resolve apiary per hive from raw telemetry, cached."""
    cache = REPO_ROOT / "data" / "processed" / "tag_to_apiary.parquet"
    if cache.exists():
        tag_apiary = pd.read_parquet(cache)
    else:
        raw = REPO_ROOT / "data" / "raw" / "mspb" / "D1_sensor_data.csv"
        if not raw.exists():
            raise SystemExit(f"cannot resolve apiary: {raw} not found")
        tel = pd.read_csv(raw, usecols=["tag_number", "beehub_name"], low_memory=False)
        tel["tag_number"] = pd.to_numeric(tel["tag_number"], errors="coerce")
        tel = tel.dropna(subset=["tag_number"])
        tel["tag_number"] = tel["tag_number"].astype("int64")
        tag_apiary = (tel.groupby("tag_number")["beehub_name"]
                      .agg(nunique="nunique", apiary="first").reset_index())
        tag_apiary.to_parquet(cache, index=False)

    df = df.merge(tag_apiary[["tag_number", "apiary"]],
                  left_on="sensor_tag", right_on="tag_number", how="left")
    if df[APIARY].isna().any():
        raise SystemExit(f"{int(df[APIARY].isna().sum())} rows have no apiary")
    span = df.groupby(GROUPS)[APIARY].nunique()
    bad = span[span > 1]
    if len(bad):
        raise SystemExit(f"hives spanning apiaries: {bad.index.tolist()}")
    return df


# ---------------------------------------------------------------- models
def make_models(seed: int) -> Dict[str, object]:
    return {
        "LogisticRegression": Pipeline([
            ("scale", StandardScaler()),
            ("clf", LogisticRegression(C=1.0, max_iter=5000,
                                       class_weight="balanced", random_state=seed)),
        ]),
        "RandomForest": RandomForestClassifier(
            n_estimators=300, min_samples_leaf=2, class_weight="balanced",
            random_state=seed, n_jobs=-1),
        "HistGradientBoosting": HistGradientBoostingClassifier(
            max_iter=200, learning_rate=0.06, max_leaf_nodes=15,
            class_weight="balanced", random_state=seed),
        "MLP_16_32_16_2": Pipeline([
            ("scale", StandardScaler()),
            ("clf", MLPClassifier(hidden_layer_sizes=(32, 16), activation="relu",
                                  solver="adam", alpha=1e-3, learning_rate_init=3e-3,
                                  max_iter=800, early_stopping=True,
                                  n_iter_no_change=30, validation_fraction=0.15,
                                  random_state=seed)),
        ]),
        "SVM_RBF": Pipeline([
            ("scale", StandardScaler()),
            ("clf", SVC(kernel="rbf", C=1.0, gamma="scale", probability=True,
                        class_weight="balanced", random_state=seed)),
        ]),
    }


# ---------------------------------------------------------------- metrics
def score_block(y: np.ndarray, p: np.ndarray) -> Dict[str, float]:
    y_pred = (p >= 0.5).astype(int)
    out = {
        "macro_f1": float(f1_score(y, y_pred, average="macro", zero_division=0)),
        "balanced_accuracy": float(balanced_accuracy_score(y, y_pred)),
        "brier": float(brier_score_loss(y, p)),
        "n": int(len(y)),
        "n_pos": int(y.sum()),
    }
    if len(np.unique(y)) == 2:
        out["auroc"] = float(roc_auc_score(y, p))
        out["pr_auc"] = float(average_precision_score(y, p))
    else:
        out["auroc"] = float("nan")
        out["pr_auc"] = float("nan")
    return out


def bootstrap_over_hives(y, p, hives, n_boot, seed) -> Dict[str, List[float]]:
    rng = np.random.default_rng(seed)
    unique = np.unique(hives)
    idx_by_hive = {h: np.flatnonzero(hives == h) for h in unique}
    keys = ("macro_f1", "balanced_accuracy", "auroc", "pr_auc")
    draws: Dict[str, List[float]] = {k: [] for k in keys}

    for _ in range(n_boot):
        pick = rng.choice(unique, size=len(unique), replace=True)
        rows = np.concatenate([idx_by_hive[h] for h in pick])
        s = score_block(y[rows], p[rows])
        for k in keys:
            if not np.isnan(s[k]):
                draws[k].append(s[k])

    return {k: [float(np.percentile(v, 2.5)), float(np.percentile(v, 97.5))]
            for k, v in draws.items() if v}


# ---------------------------------------------------------------- rungs
def run_rung(rung: str, df: pd.DataFrame, cols: List[str]):
    """Pool predictions for one rung. Returns (preds, eval_mask)."""
    X = df[cols].to_numpy(float)
    y = df[TARGET].to_numpy(int)
    hives = df[GROUPS].to_numpy()
    rounds = df["evaluation_round"].to_numpy()
    apiary = df[APIARY].to_numpy()

    names = list(make_models(0).keys())
    acc = {n: np.zeros(len(df)) for n in names}
    cnt = {n: np.zeros(len(df)) for n in names}

    def add(name: str, te: np.ndarray, p: np.ndarray) -> None:
        acc[name][te] += p
        cnt[name][te] += 1.0

    if rung == "P0":
        for seed in SEEDS:
            skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=seed)
            for tr, te in skf.split(X, y):
                for n, m in make_models(seed).items():
                    m.fit(X[tr], y[tr])
                    add(n, te, m.predict_proba(X[te])[:, 1])

    elif rung == "P1":
        # hold out the chronologically last round; predict it only
        order = df.groupby("evaluation_round")["inspection_date"].min().sort_values()
        test_round = order.index[-1]
        te = np.flatnonzero(rounds == test_round)
        tr = np.flatnonzero(rounds != test_round)
        print(f"  [P1] held-out round = {test_round} ({len(te)} rows)")
        for seed in SEEDS:
            for n, m in make_models(seed).items():
                m.fit(X[tr], y[tr])
                add(n, te, m.predict_proba(X[te])[:, 1])

    elif rung == "P2":
        logo = LeaveOneGroupOut()
        for seed in SEEDS:
            for tr, te in logo.split(X, y, groups=hives):
                for n, m in make_models(seed).items():
                    m.fit(X[tr], y[tr])
                    add(n, te, m.predict_proba(X[te])[:, 1])

    elif rung == "P3":
        for site in np.unique(apiary):
            tr = np.flatnonzero(apiary == site)
            te = np.flatnonzero(apiary != site)
            for seed in SEEDS:
                for n, m in make_models(seed).items():
                    m.fit(X[tr], y[tr])
                    add(n, te, m.predict_proba(X[te])[:, 1])
    else:
        raise ValueError(rung)

    preds, mask = {}, None
    for n in names:
        m_ok = cnt[n] > 0
        if not m_ok.any():
            raise RuntimeError(f"{rung}/{n}: no predictions produced")
        preds[n] = acc[n][m_ok] / cnt[n][m_ok]
        mask = m_ok if mask is None else (mask & m_ok)
    return preds, mask


# ---------------------------------------------------------------- driver
def main() -> int:
    df = pd.read_csv(FEATURES_CSV)
    if APIARY not in df.columns:
        df = attach_apiary(df)

    print(f"rows   : {len(df)}")
    print(f"hives  : {df[GROUPS].nunique()}")
    print(f"label  : {df[TARGET].value_counts().to_dict()}")
    print(f"apiary : {df[APIARY].value_counts().to_dict()}")

    payload: Dict[str, object] = {
        "metadata": {
            "title": "Leakage Ladder: split rule x feature transform",
            "provenance": "REAL_PUBLIC_DATASET",
            "dataset": "MSPB (Zenodo 11398835)",
            "target": "is_strong (colony strength, total frames >= 20)",
            "unit_of_analysis": "inspection event",
            "n_rows": int(len(df)),
            "n_hives": int(df[GROUPS].nunique()),
            "seeds": list(SEEDS),
            "bootstrap_resamples": N_BOOT,
            "bootstrap_unit": "hive",
            "transforms": {k: len(v) for k, v in TRANSFORMS.items()},
        },
        "experiments": {},
    }

    for tname, cols in TRANSFORMS.items():
        missing = [c for c in cols if c not in df.columns]
        if missing:
            print(f"\n[skip] transform {tname}: missing {len(missing)} cols")
            continue
        print(f"\n===== transform: {tname} ({len(cols)} features) =====")
        block: Dict[str, dict] = {}

        for rung in RUNGS:
            print(f"--- {rung} ---")
            preds, mask = run_rung(rung, df, cols)
            y = df[TARGET].to_numpy(int)[mask]
            hives = df[GROUPS].to_numpy()[mask]

            for name, p in preds.items():
                s = score_block(y, p)
                ci = bootstrap_over_hives(y, p, hives, N_BOOT, seed=999)
                block[f"{rung}|{name}"] = {"metrics": s, "ci95": ci}
                ci_f1 = ci.get("macro_f1", [float("nan")] * 2)
                print(f"  {name:22s} F1={s['macro_f1']:.4f} "
                      f"BA={s['balanced_accuracy']:.4f} "
                      f"AUROC={s['auroc']:.4f} "
                      f"n={s['n']:4d} "
                      f"CI=[{ci_f1[0]:.3f},{ci_f1[1]:.3f}]")
        payload["experiments"][tname] = block  # type: ignore[index]

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"\nwritten to {OUT_JSON}")

    print("\n=== gaps (macro F1, RandomForest) ===")
    for tname in payload["experiments"]:  # type: ignore[union-attr]
        b = payload["experiments"][tname]  # type: ignore[index]
        try:
            f1 = {r: b[f"{r}|RandomForest"]["metrics"]["macro_f1"] for r in RUNGS}
        except KeyError:
            continue
        print(f"  {tname:10s} P0={f1['P0']:.4f} P1={f1['P1']:.4f} "
              f"P2={f1['P2']:.4f} P3={f1['P3']:.4f} "
              f"| total(P0-P2)={f1['P0'] - f1['P2']:+.4f} "
              f"env(P2-P3)={f1['P2'] - f1['P3']:+.4f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
