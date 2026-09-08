import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

def create_impact_slide():
    # 16:9 aspect ratio, 3840x2160 equivalent at 240 DPI (16 x 9 inches)
    fig, ax = plt.subplots(figsize=(16, 9), dpi=240)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#ffffff')
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.axis('off')

    # Top Header
    ax.text(8.0, 8.35, "BEEVIL KNIEVEL — PRECISION EDGE-AI APICULTURE PLATFORM", 
            ha='center', va='center', fontsize=20, fontweight='bold', color='#0f172a', fontfamily='sans-serif')
    ax.text(8.0, 7.95, "IEEE HART HardwAIre Challenge 2026 Phase 2 Engineering Verification Summary", 
            ha='center', va='center', fontsize=12, fontweight='medium', color='#475569', fontfamily='sans-serif')
    
    # Dividing rule
    ax.plot([1.0, 15.0], [7.70, 7.70], color='#cbd5e1', lw=1.5)

    # 6 Hexagonal / Rounded Achievement Cards in 2 rows of 3
    cards = [
        {
            "metric": "±0.1°C",
            "title": "SENSOR ACCURACY",
            "sub": "Brood Core Thermal Homeostasis",
            "stat": "Target: < ±0.2°C  |  Status: PASS",
            "color": "#0284c7", # Sky blue
            "bg": "#f0f9ff",
            "border": "#38bdf8",
            "badge": "PASS"
        },
        {
            "metric": "18.2 µA",
            "title": "SLEEP CURRENT",
            "sub": "3.42-Year Primary Autonomy",
            "stat": "3.6V 8500mAh Li-SOCl2 (ER34615)",
            "color": "#16a34a", # Green
            "bg": "#f0fdf4",
            "border": "#4ade80",
            "badge": "PASS"
        },
        {
            "metric": "2.49 ms",
            "title": "CMSIS-DSP FFT SPEED",
            "sub": "0.08 mJ Execution on Cortex-M4F",
            "stat": "512-pt Real FFT @ 64 MHz",
            "color": "#d97706", # Amber
            "bg": "#fffbeb",
            "border": "#fcd34d",
            "badge": "PASS"
        },
        {
            "metric": "4.2 km",
            "title": "LoRa RF RANGE",
            "sub": "98.7% PDR at SF7 (+14 dBm)",
            "stat": "Sub-GHz SX1262 Star Topology",
            "color": "#7c3aed", # Violet
            "bg": "#f5f3ff",
            "border": "#c084fc",
            "badge": "PASS"
        },
        {
            "metric": "96.8%",
            "title": "SWARM DETECTION F1",
            "sub": "72h Pre-Swarm Acoustic Warning",
            "stat": "Dual-Tier Acoustic CUSUM + RF",
            "color": "#0d9488", # Teal
            "bg": "#f0fdfa",
            "border": "#5eead4",
            "badge": "PASS"
        },
        {
            "metric": "$18.74",
            "title": "SENSOR NODE BOM",
            "sub": "86% Commercial Cost Reduction",
            "stat": "$1,974 per 100 Hives (vs $25k)",
            "color": "#e11d48", # Rose
            "bg": "#fff1f2",
            "border": "#fda4af",
            "badge": "PASS"
        }
    ]

    card_w = 4.2
    card_h = 2.45
    spacing_x = 0.4
    spacing_y = 0.35
    start_x = 1.3
    start_y = 4.75

    for idx, c in enumerate(cards):
        row = idx // 3
        col = idx % 3
        cx = start_x + col * (card_w + spacing_x)
        cy = start_y - row * (card_h + spacing_y)

        # Card container box
        rect = patches.FancyBboxPatch((cx, cy), card_w, card_h,
                                     boxstyle="round,pad=0.08,rounding_size=0.15",
                                     linewidth=1.8, edgecolor=c["border"],
                                     facecolor=c["bg"], zorder=2)
        ax.add_patch(rect)

        # Top Metric Badge
        ax.text(cx + 0.3, cy + card_h - 0.55, c["metric"],
                fontsize=24, fontweight='heavy', color=c["color"],
                va='center', fontfamily='sans-serif', zorder=3)

        # PASS pill
        pass_w = 0.85
        pass_h = 0.32
        pass_rect = patches.FancyBboxPatch((cx + card_w - pass_w - 0.25, cy + card_h - 0.70),
                                          pass_w, pass_h,
                                          boxstyle="round,pad=0.04,rounding_size=0.08",
                                          linewidth=1.0, edgecolor='#22c55e',
                                          facecolor='#dcfce7', zorder=3)
        ax.add_patch(pass_rect)
        ax.text(cx + card_w - pass_w/2 - 0.25, cy + card_h - 0.70 + pass_h/2, "PASS",
                fontsize=9, fontweight='bold', color='#15803d',
                ha='center', va='center', fontfamily='sans-serif', zorder=4)

        # Title
        ax.text(cx + 0.3, cy + card_h - 1.15, c["title"],
                fontsize=11.5, fontweight='bold', color='#1e293b',
                va='center', fontfamily='sans-serif', zorder=3)

        # Subtitle
        ax.text(cx + 0.3, cy + card_h - 1.55, c["sub"],
                fontsize=9.5, fontweight='medium', color='#475569',
                va='center', fontfamily='sans-serif', zorder=3)

        # Bottom stat bar line
        ax.plot([cx + 0.3, cx + card_w - 0.3], [cy + 0.55, cy + 0.55],
                color=c["border"], lw=1.0, zorder=3)

        # Bottom stat
        ax.text(cx + 0.3, cy + 0.30, c["stat"],
                fontsize=8.5, fontweight='normal', color='#64748b',
                va='center', fontfamily='sans-serif', zorder=3)

    # Bottom Verification & Status Strip
    strip_y = 1.05
    strip_h = 0.85
    strip_rect = patches.FancyBboxPatch((1.0, strip_y), 14.0, strip_h,
                                       boxstyle="round,pad=0.06,rounding_size=0.12",
                                       linewidth=1.5, edgecolor='#e2e8f0',
                                       facecolor='#f8fafc', zorder=2)
    ax.add_patch(strip_rect)

    # 3 Summary Pills in the bottom strip
    ax.text(3.3, strip_y + strip_h/2, "[PASS]  27 / 27 TESTS VERIFIED (100% PASS RATE)",
            ha='center', va='center', fontsize=9.5, fontweight='bold', color='#166534',
            fontfamily='sans-serif', zorder=3)
    
    ax.plot([5.6, 5.6], [strip_y + 0.15, strip_y + strip_h - 0.15], color='#cbd5e1', lw=1.5, zorder=3)

    ax.text(8.0, strip_y + strip_h/2, "[AUTONOMOUS]  ZERO-SUBSCRIPTION — 100% OFFLINE",
            ha='center', va='center', fontsize=9.5, fontweight='bold', color='#0369a1',
            fontfamily='sans-serif', zorder=3)

    ax.plot([10.4, 10.4], [strip_y + 0.15, strip_y + strip_h - 0.15], color='#cbd5e1', lw=1.5, zorder=3)

    ax.text(12.7, strip_y + strip_h/2, "[PILOT READY]  PHASE 3: 100-HIVE DEPLOYMENT",
            ha='center', va='center', fontsize=9.5, fontweight='bold', color='#7e22ce',
            fontfamily='sans-serif', zorder=3)

    # Footer note
    ax.text(8.0, 0.45, "Engineering Verification Suite: HIL Chamber, LoRa RF Link Budget, ANSYS Multiphysics, Field Bench",
            ha='center', va='center', fontsize=8, color='#94a3b8', fontfamily='sans-serif')

    out_file = 'docs/figures/results_impact_summary.png'
    plt.tight_layout()
    plt.savefig(out_file, dpi=240, bbox_inches='tight', facecolor='#ffffff')
    plt.close()
    print(f"Successfully generated {out_file}")

if __name__ == '__main__':
    create_impact_slide()
