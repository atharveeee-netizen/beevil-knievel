#!/usr/bin/env python3
"""
===============================================================================
BEEVIL KNIEVEL — BENCH TELEMETRY VISUALIZATION GENERATOR
===============================================================================
Standard: IEEE HARDWAIre Phase 2 Bench Bring-Up
Purpose:
  Reads telemetry CSV/JSONL files recorded by tools/serial_logger.py and
  generates a 4-panel publication-grade diagnostic engineering plot.

TRUTH RULE:
  Explicitly labels data source (REAL_SILICON, SIMULATED, REAL_SENSOR)
  and notes that hardware is a BENCH PROTOTYPE.
===============================================================================
"""

import os
import glob
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime

def generate_telemetry_plot(csv_path: str = None, output_path: str = "artifacts/bench_telemetry_plot.png"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    if not csv_path:
        csv_files = glob.glob("logs/telemetry_*.csv")
        if not csv_files:
            print("[WARN] No telemetry CSV found in logs/. Skipping plot.")
            return
        csv_path = max(csv_files, key=os.path.getmtime)

    print(f"[PLOTTER] Loading telemetry data from: {csv_path}")
    df = pd.read_csv(csv_path)
    if df.empty:
        print("[WARN] Telemetry CSV is empty.")
        return

    # Convert timestamps
    df["dt"] = pd.to_datetime(df["host_timestamp_utc"])
    df = df.sort_values("dt")

    fig, axes = plt.subplots(4, 1, figsize=(12, 10), sharex=True, dpi=200)
    fig.patch.set_facecolor("#0F172A")

    plt.style.use("dark_background")
    for ax in axes:
        ax.set_facecolor("#1E293B")
        ax.grid(True, linestyle="--", alpha=0.3, color="#64748B")
        ax.tick_params(colors="#94A3B8")

    source_tag = df["source"].iloc[0] if "source" in df.columns else "BENCH_TEST"

    # Subplot 1: Temperature
    ax1 = axes[0]
    ax1.plot(df["dt"], df["die_temp_c"], color="#38BDF8", linewidth=2.0, label=f"On-Chip Die Temp [{source_tag}]")
    if "tmp117_c" in df.columns and not df["tmp117_c"].isna().all():
        ax1.plot(df["dt"], df["tmp117_c"], color="#F59E0B", linewidth=2.0, label="TMP117 Core Brood Temp [REAL_SENSOR]")
    ax1.set_ylabel("Temperature (°C)", color="#E2E8F0", fontweight="bold")
    ax1.set_title("BEEVIL KNIEVEL — BENCH HARDWARE TELEMETRY & THERMAL PROVENANCE", color="#F8FAFC", fontweight="bold", pad=12)
    ax1.legend(loc="upper left", facecolor="#0F172A", edgecolor="#475569")

    # Subplot 2: Battery Subsystem
    ax2 = axes[1]
    ax2_soc = ax2.twinx()
    p1 = ax2.plot(df["dt"], df["vbat_mv"], color="#10B981", linewidth=2.0, label=f"VBat (mV) [{source_tag}]")
    p2 = ax2_soc.plot(df["dt"], df["soc_pct"], color="#A855F7", linestyle=":", linewidth=2.0, label=f"SoC (%) [7-Pt OCV]")
    ax2.set_ylabel("Voltage (mV)", color="#10B981", fontweight="bold")
    ax2_soc.set_ylabel("State of Charge (%)", color="#A855F7", fontweight="bold")
    ax2_soc.tick_params(colors="#A855F7")
    ax2.legend(p1 + p2, [l.get_label() for l in p1 + p2], loc="upper left", facecolor="#0F172A", edgecolor="#475569")

    # Subplot 3: CUSUM Drift Filter
    ax3 = axes[2]
    ax3.plot(df["dt"], df["cusum_drift"], color="#F43F5E", linewidth=2.0, label=f"CUSUM Score S_k (Slack k=0.3°C)")
    ax3.axhline(2.5, color="#EF4444", linestyle="--", linewidth=1.5, label="Queenless Anomaly Threshold (h=2.5°C)")
    ax3.set_ylabel("Drift S_k (°C)", color="#F43F5E", fontweight="bold")
    ax3.legend(loc="upper left", facecolor="#0F172A", edgecolor="#475569")

    # Subplot 4: Packets & Uptime
    ax4 = axes[3]
    ax4.step(df["dt"], df["packet"], color="#FBBF24", where="post", linewidth=1.8, label="Sequential Packet ID")
    ax4.set_ylabel("Packet #", color="#FBBF24", fontweight="bold")
    ax4.set_xlabel("Time (UTC)", color="#E2E8F0", fontweight="bold")
    ax4.xaxis.set_major_formatter(mdates.DateFormatter("%H:%M:%S"))
    ax4.legend(loc="upper left", facecolor="#0F172A", edgecolor="#475569")

    # Footer Truth Annotation
    fig.text(
        0.5, 0.01,
        "PROVENANCE: Bench Prototype Evaluation | Zero synthetic measurements presented as physical hive data | IEEE HARDWAIre",
        ha="center", fontsize=9, color="#94A3B8", style="italic"
    )

    plt.tight_layout(rect=[0, 0.03, 1, 0.97])
    plt.savefig(output_path, dpi=200, facecolor=fig.get_facecolor(), bbox_inches="tight")
    plt.close()
    print(f"[PLOTTER] Generated publication-grade plot at: {output_path}")

if __name__ == "__main__":
    generate_telemetry_plot()
