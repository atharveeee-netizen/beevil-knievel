"""
Figures for the leakage manuscript.

All values are read from paper_q1/results/leakage_ladder.json. Nothing is
hard-coded, so a figure cannot disagree with the table.

Run:
    python -m paper_q1.leakage_figures
"""
from __future__ import annotations

import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

REPO_ROOT = Path(__file__).resolve().parents[1]
RESULT = REPO_ROOT / "paper_q1" / "results" / "leakage_ladder.json"
OUT = REPO_ROOT / "paper_q1" / "manuscript_leakage" / "figures"

RUNGS = ("P0", "P1", "P2", "P3")
RUNG_LABEL = {
    "P0": "P0\nrandom rows",
    "P1": "P1\ntemporal holdout",
    "P2": "P2\nunseen hive",
    "P3": "P3\nunseen apiary",
}
TRANSFORM_LABEL = {
    "bands": "8 relative bands (gain invariant)",
    "raw": "16 absolute dB bins (gain retained)",
    "bands_env": "8 relative bands + environment",
}
TRANSFORM_COLOUR = {
    "bands": "#1f6f8b",
    "raw": "#c1440e",
    "bands_env": "#6b8e23",
}
MODEL_LABEL = {
    "LogisticRegression": "Logistic regression",
    "RandomForest": "Random forest",
    "HistGradientBoosting": "Hist. gradient boosting",
    "MLP_16_32_16_2": "MLP 16-32-16-2",
    "SVM_RBF": "SVM RBF",
}

plt.rcParams.update({
    "font.size": 9,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.grid": True,
    "grid.alpha": 0.25,
    "grid.linewidth": 0.5,
    "figure.dpi": 120,
})


def load() -> dict:
    return json.loads(RESULT.read_text(encoding="utf-8"))


def pick_headline(data: dict) -> tuple[str, str]:
    """Model with the best P2 macro F1 on the primary transform."""
    exp = data["experiments"]
    primary = "bands" if "bands" in exp else next(iter(exp))
    block = exp[primary]
    models = [k.split("|", 1)[1] for k in block if k.startswith("P2|")]
    best = max(models, key=lambda m: block[f"P2|{m}"]["metrics"]["macro_f1"])
    return primary, best


def fig_rungs(data: dict) -> Path:
    """Macro F1 and AUROC across the ladder, one line per transform.

    Two panels matter. F1 collapses at P1 while AUROC does not, which is the
    difference between a miscalibrated model and an uninformed one.
    """
    _, model = pick_headline(data)
    fig, axes = plt.subplots(1, 2, figsize=(7.4, 3.1))
    x = np.arange(len(RUNGS))

    for ax, metric, label, floor in (
        (axes[0], "macro_f1", "Macro F1", 0.5),
        (axes[1], "auroc", "AUROC", 0.5),
    ):
        for tname, block in data["experiments"].items():
            ys, lo, hi = [], [], []
            for r in RUNGS:
                res = block.get(f"{r}|{model}", {})
                m = res.get("metrics", {})
                ci = res.get("ci95", {}).get(metric, [np.nan, np.nan])
                v = m.get(metric, np.nan)
                ys.append(v)
                lo.append(v - ci[0])
                hi.append(ci[1] - v)
            ax.errorbar(
                x, ys, yerr=[lo, hi], marker="o", ms=4, lw=1.5, capsize=2,
                color=TRANSFORM_COLOUR.get(tname, "#444"),
                label=TRANSFORM_LABEL.get(tname, tname),
            )
        ax.axhline(floor, ls=":", lw=0.9, color="#999")
        ax.set_xticks(x)
        ax.set_xticklabels([RUNG_LABEL[r] for r in RUNGS], fontsize=7)
        ax.set_ylabel(label)
        ax.set_ylim(0.30, 0.95)

    axes[0].set_title("(a) Thresholded score", fontsize=8.5, loc="left")
    axes[1].set_title("(b) Ranking quality", fontsize=8.5, loc="left")
    axes[1].legend(frameon=False, fontsize=6.8, loc="lower right")
    fig.suptitle(f"Split rule and feature transform, {MODEL_LABEL.get(model, model)}",
                 fontsize=9, x=0.02, ha="left")
    fig.tight_layout(rect=(0, 0, 1, 0.94))
    p = OUT / "fig_leakage_rungs.pdf"
    fig.savefig(p, bbox_inches="tight")
    fig.savefig(p.with_suffix(".png"), dpi=300, bbox_inches="tight")
    plt.close(fig)
    return p


def fig_models(data: dict) -> Path:
    """Every model at the two strictest rungs, per transform."""
    trans = list(data["experiments"])
    models = sorted({k.split("|", 1)[1]
                     for b in data["experiments"].values() for k in b})

    fig, axes = plt.subplots(1, len(trans), figsize=(2.9 * len(trans), 2.9),
                             sharey=True)
    if len(trans) == 1:
        axes = [axes]

    for ax, tname in zip(axes, trans):
        block = data["experiments"][tname]
        x = np.arange(len(models))
        for i, r in enumerate(("P2", "P3")):
            vals, err_lo, err_hi = [], [], []
            for m in models:
                res = block.get(f"{r}|{m}", {})
                met = res.get("metrics", {})
                ci = res.get("ci95", {}).get("macro_f1", [np.nan, np.nan])
                v = met.get("macro_f1", np.nan)
                vals.append(v)
                err_lo.append(v - ci[0])
                err_hi.append(ci[1] - v)
            ax.bar(x + (i - 0.5) * 0.38, vals, 0.36,
                   yerr=[err_lo, err_hi], capsize=1.5,
                   color="#1f6f8b" if r == "P2" else "#c9a227",
                   label="unseen hive" if r == "P2" else "unseen apiary",
                   error_kw={"lw": 0.7})
        ax.axhline(0.5, ls=":", lw=0.8, color="#999")
        ax.set_xticks(x)
        ax.set_xticklabels([MODEL_LABEL.get(m, m) for m in models],
                           rotation=40, ha="right", fontsize=6.5)
        ax.set_title(TRANSFORM_LABEL.get(tname, tname).replace(" (", "\n("),
                     fontsize=7.5, loc="left")
        ax.set_ylim(0.35, 0.95)
        ax.tick_params(axis="y", labelsize=7)

    axes[0].set_ylabel("Macro F1 (pooled out-of-fold)", fontsize=8)
    axes[-1].legend(frameon=False, fontsize=6.5, loc="lower right")
    fig.tight_layout()
    p = OUT / "fig_leakage_models.pdf"
    fig.savefig(p, bbox_inches="tight")
    fig.savefig(p.with_suffix(".png"), dpi=300, bbox_inches="tight")
    plt.close(fig)
    return p


def fig_band_coverage() -> Path:
    """Which canonical bands actually receive MSPB bins.

    MSPB bins span 122-580 Hz. The eight-band spec spans 30-2000 Hz, so three
    bands are synthetic. This figure states that plainly.
    """
    hz = [122.0703125, 152.587890625, 183.10546875, 213.623046875,
          244.140625, 274.658203125, 305.17578125, 335.693359375,
          366.2109375, 396.728515625, 427.24609375, 457.763671875,
          488.28125, 518.798828125, 549.31640625, 579.833984375]
    edges = [(30, 100), (100, 180), (180, 280), (280, 380),
             (380, 500), (500, 750), (750, 1200), (1200, 2000)]

    counts = [0] * 8
    for f in hz:
        for i, (lo, hi) in enumerate(edges):
            if lo <= f < hi:
                counts[i] += 1
                break

    fig, ax = plt.subplots(figsize=(5.4, 2.6))
    colours = ["#c1440e" if c == 0 else "#1f6f8b" for c in counts]
    ax.bar(range(8), counts, color=colours, width=0.7)
    for i, c in enumerate(counts):
        ax.text(i, c + 0.15, str(c), ha="center", fontsize=8)
    ax.set_xticks(range(8))
    ax.set_xticklabels([f"B{i}\n{lo}-{hi}" for i, (lo, hi) in enumerate(edges)],
                       fontsize=7)
    ax.set_ylabel("MSPB bins mapped")
    ax.set_ylim(0, max(counts) + 1.2)
    ax.set_title("Three of eight canonical bands receive no MSPB data",
                 fontsize=9, loc="left")
    fig.tight_layout()
    p = OUT / "fig_band_coverage.pdf"
    fig.savefig(p, bbox_inches="tight")
    fig.savefig(p.with_suffix(".png"), dpi=300, bbox_inches="tight")
    plt.close(fig)
    return p


def main() -> int:
    if not RESULT.exists():
        raise SystemExit(f"missing {RESULT}")
    OUT.mkdir(parents=True, exist_ok=True)
    data = load()
    for fn in (fig_rungs, fig_models):
        print(f"wrote {fn(data)}")
    print(f"wrote {fig_band_coverage()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
