"""
=============================================================================
BEEVIL KNIEVEL - Pareto Frontier Plot Generator (Q1 Journal Publication)
Target: IEEE Internet of Things Journal / Elsevier Computers and Electronics in Agriculture
Plots:
1. Trade-off: Macro F1-Score vs Active Energy per Inference (uJ, log-scale)
2. Trade-off: Macro F1-Score vs Bandwidth / Telemetry Payload (Bytes, log-scale)
=============================================================================
"""

import os
import json
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

RESULTS_JSON = Path(__file__).resolve().parent / "benchmark_results" / "sota_benchmark_summary.json"
OUT_FIGURE_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "images" / "evidence"

def generate_pareto_plots():
    if not RESULTS_JSON.exists():
        print(f"[ERROR] Results JSON not found at {RESULTS_JSON}")
        return

    with open(RESULTS_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    OUT_FIGURE_DIR.mkdir(parents=True, exist_ok=True)
    out_png_1 = OUT_FIGURE_DIR / "fig_energy_pareto_frontier.png"
    out_png_2 = Path(__file__).resolve().parent / "benchmark_results" / "fig_energy_pareto_frontier.png"

    # Matplotlib styling for IEEE Transactions
    plt.rcParams.update({
        "font.family": "serif",
        "font.size": 11,
        "axes.labelsize": 12,
        "axes.titlesize": 12,
        "xtick.labelsize": 10,
        "ytick.labelsize": 10,
        "legend.fontsize": 10,
        "figure.titlesize": 13,
        "figure.dpi": 300
    })

    fig, ax = plt.subplots(figsize=(9.2, 5.8))

    colors = {
        "Edge_Deterministic_DSP": "#10B981",  # Green
        "Edge_INT8_MicroMLP":     "#059669",  # Dark green
        "Baseline_MFCC_SVM":      "#2563EB",  # Tech Blue
        "Baseline_MFCC_RF":       "#4F46E5",  # Indigo
        "Gateway_SOTA_2DCNN":     "#DC2626"   # Red
    }

    markers = {
        "Edge_Deterministic_DSP": "o",
        "Edge_INT8_MicroMLP":     "s",
        "Baseline_MFCC_SVM":      "^",
        "Baseline_MFCC_RF":       "D",
        "Gateway_SOTA_2DCNN":     "*"
    }

    labels_map = {
        "Edge_Deterministic_DSP": "Edge Deterministic DSP",
        "Edge_INT8_MicroMLP":     "Edge INT8 Micro-MLP (Proposed)",
        "Baseline_MFCC_SVM":      "Baseline MFCC-39 + SVM",
        "Baseline_MFCC_RF":       "Baseline MFCC-39 + RF",
        "Gateway_SOTA_2DCNN":     "Gateway 2D-CNN (Log-Mel)"
    }

    # Explicit collision-free annotation placement: (dx_ratio, dy_abs, ha, va)
    annotation_positions = {
        "Edge_Deterministic_DSP": (1.45, -3.0, "left", "center"),
        "Edge_INT8_MicroMLP":     (1.45,  3.5, "left", "center"),
        "Baseline_MFCC_SVM":      (0.35,  4.5, "right", "bottom"),
        "Baseline_MFCC_RF":       (0.40, -5.5, "right", "top"),
        "Gateway_SOTA_2DCNN":     (0.55, -7.5, "right", "top")
    }

    for item in data:
        m = item["model"]
        energy = item["energy_uj"]
        f1 = item["macro_f1"] * 100.0
        bal_acc = item["balanced_accuracy"] * 100.0
        
        c = colors.get(m, "#4B5563")
        marker = markers.get(m, "o")
        label = labels_map.get(m, m)
        size = 140 if marker != "*" else 240

        ax.scatter(energy, f1, color=c, marker=marker, s=size, label=label, edgecolors='black', linewidth=1.2, zorder=5)
        
        # Position annotations cleanly with callout boxes
        if m in annotation_positions:
            dx_ratio, dy_abs, ha, va = annotation_positions[m]
            target_x = energy * dx_ratio
            target_y = f1 + dy_abs

            text_str = f"\\textbf{{{label}}}\n{energy:,.1f} $\\mu$J  |  {f1:.1f}\\% F1" if "Proposed" in label else f"{label}\n{energy:,.0f} $\\mu$J  |  {f1:.1f}% F1"
            # Plain text fallback without LaTeX math escapes
            text_str = f"{label}\n({energy:,.1f} $\\mu$J, {f1:.1f}% F1)" if energy < 100 else f"{label}\n({energy:,.0f} $\\mu$J, {f1:.1f}% F1)"

            ax.annotate(
                text_str,
                xy=(energy, f1),
                xytext=(target_x, target_y),
                fontsize=8.5,
                ha=ha,
                va=va,
                color=c,
                fontweight='bold' if "Proposed" in label else 'normal',
                bbox=dict(boxstyle="round,pad=0.35", fc="white", ec=c, alpha=0.92, lw=0.9),
                arrowprops=dict(arrowstyle="->", color=c, lw=1.0, shrinkA=3, shrinkB=4)
            )

    # Shaded operational tiers
    ax.axvspan(10, 100, color='#DCFCE7', alpha=0.32, label='Direct Battery / Solar Harvester Tier (<100 $\\mu$J)')
    ax.axvspan(1000, 300000, color='#FEE2E2', alpha=0.22, label='Mains / Gateway Powered Tier (>1 mJ)')

    ax.set_xscale("log")
    ax.set_xlabel("Active Energy Consumption per Inference ($\\mu$J, Log Scale)", fontweight='bold', labelpad=8)
    ax.set_ylabel("Macro F1-Score (%)", fontweight='bold', labelpad=8)
    ax.set_title("Pareto Frontier: Energy Efficiency vs. Acoustic Pathology Detection Fidelity", pad=14, fontweight='bold')
    ax.grid(True, which="both", linestyle="--", alpha=0.35)
    ax.set_xlim([8, 400000])
    ax.set_ylim([10, 100])

    # Position legend cleanly in lower-left / upper-center where no points exist
    ax.legend(
        loc="upper left",
        framealpha=0.95,
        facecolor="white",
        edgecolor="#D1D5DB",
        fontsize=9,
        borderpad=0.8,
        labelspacing=0.6
    )

    plt.tight_layout()
    fig.savefig(str(out_png_1), dpi=300)
    fig.savefig(str(out_png_2), dpi=300)
    plt.close(fig)

    print(f"[PLOT] Generated Pareto Frontier chart successfully:")

    print(f"  - {out_png_1}")
    print(f"  - {out_png_2}")

if __name__ == "__main__":
    generate_pareto_plots()
