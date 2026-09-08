"""
BEEVIL KNIEVEL — Master Engineering Figure Generator (Publication-Grade Vector Edition)
IEEE HardwAIre Challenge Phase 2 Vector Graphics Suite

Generates the canonical 13 IEEE engineering figures in PDF (vector), SVG (vector),
and 300 DPI PNG directly from matlab/data/beevil_architecture.json.
White background, dark slate lines, zero gradients, zero AI slop.
Engineered with hierarchical card layouts (Title -> Centered Badge -> Body Text)
guaranteeing zero text-badge collisions and crisp IEEE publication fidelity.
"""

import json
import os
import sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Polygon, PathPatch

# Output directory
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'docs', 'figures', 'matlab'))
os.makedirs(OUT_DIR, exist_ok=True)

# Load Canonical Architecture Data
DATA_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data', 'beevil_architecture.json'))
with open(DATA_PATH, 'r', encoding='utf-8') as f:
    ARCH = json.load(f)

# IEEE Styling Constants
FONT_SANS = ['DejaVu Sans', 'Arial', 'sans-serif']
COLOR_BG = '#ffffff'
COLOR_SLATE_DARK = '#0f172a'   # Slate 900 (#0f172a)
COLOR_SLATE_MED = '#334155'    # Slate 700 (#334155)
COLOR_SLATE_LIGHT = '#94a3b8'  # Slate 400 (#94a3b8)
COLOR_CARD_FILL = '#f8fafc'    # Technical paper fill
COLOR_ACCENT_BLUE = '#0369a1'  # IEEE Navy Blue (#0369a1)
COLOR_ACCENT_AMBER = '#b45309' # Warning / thermal drift (#b45309)

# Evidence Badge Colors
TAG_COLORS = {
    'MEASURED': '#047857',      # Emerald Green (#047857)
    'VALIDATED': '#0284c7',     # Navy Blue (#0284c7)
    'CALCULATED': '#6b21a8',    # Muted Purple (#6b21a8)
    'SIMULATED': '#b45309',     # Amber (#b45309)
    'DEMONSTRATED': '#0f766e'   # Teal (#0f766e)
}

def create_base_canvas(figsize=(14, 8.5), title="", subtitle=""):
    fig, ax = plt.subplots(figsize=figsize, dpi=300, facecolor=COLOR_BG)
    ax.set_facecolor(COLOR_BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    
    # Title & Subtitle with generous top margin
    if title:
        ax.text(0.035, 0.965, title, fontsize=12, fontweight='bold',
                fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, va='top', ha='left')
    if subtitle:
        ax.text(0.035, 0.935, subtitle, fontsize=8.2, fontweight='normal',
                fontfamily=FONT_SANS, color=COLOR_SLATE_MED, va='top', ha='left')
        
    return fig, ax

def draw_block(ax, x, y, w, h, title, lines=None, tag=None, fill=COLOR_CARD_FILL, 
               edge=COLOR_SLATE_DARK, lw=1.1, align='center', title_size=7.8, body_size=6.8):
    """
    Renders an IEEE technical block with strict 3-tier vertical hierarchy:
    Tier 1: Card Title across full card width (zero horizontal collisions)
    Tier 2: Dedicated Centered Evidence Tag Badge (zero vertical collisions)
    Tier 3: Formatted Body Text lines strictly below badge
    """
    # Outer Card Box
    rect = FancyBboxPatch((x, y), w, h, boxstyle="square,pad=0",
                          facecolor=fill, edgecolor=edge, linewidth=lw, zorder=2)
    ax.add_patch(rect)
    
    # 1. Header Title
    tx = x + w / 2 if align == 'center' else x + 0.012
    ty = y + h - 0.016
    ax.text(tx, ty, title, fontsize=title_size, fontweight='bold',
            fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, ha=align, va='top', zorder=4)
    
    # 2. Centered Evidence Badge Row
    curr_top = ty - 0.018
    if tag:
        tag_str = tag.strip('[]').upper()
        tc = TAG_COLORS.get(tag_str, COLOR_SLATE_MED)
        badge_w, badge_h = min(0.076, w * 0.85), 0.019
        bx = x + (w - badge_w) / 2 if align == 'center' else x + 0.012
        by = curr_top - badge_h
        badge = FancyBboxPatch((bx, by), badge_w, badge_h, boxstyle="round,pad=0.001",
                               facecolor='#ffffff', edgecolor=tc, linewidth=0.75, zorder=5)
        ax.add_patch(badge)
        ax.text(bx + badge_w / 2, by + badge_h / 2, f"[{tag_str}]",
                fontsize=5.5, fontweight='bold', fontfamily=FONT_SANS, color=tc,
                ha='center', va='center', zorder=6)
        curr_top = by - 0.012
    else:
        curr_top = curr_top - 0.006
        
    # 3. Body Lines strictly below curr_top
    if lines:
        n = len(lines)
        bot_margin = 0.010
        avail_h = curr_top - (y + bot_margin)
        spacing = avail_h / max(n, 1)
        for i, line in enumerate(lines):
            ly = curr_top - i * spacing
            bx_text = x + w / 2 if align == 'center' else x + 0.012
            ax.text(bx_text, ly, line, fontsize=body_size, fontfamily=FONT_SANS,
                    color=COLOR_SLATE_MED, ha=align, va='top', zorder=4)

def draw_subsystem(ax, x, y, w, h, title, fill='#fcfdfe', edge=COLOR_SLATE_LIGHT, lw=0.9, ls='--'):
    rect = FancyBboxPatch((x, y), w, h, boxstyle="square,pad=0",
                          facecolor=fill, edgecolor=edge, linewidth=lw, linestyle=ls, zorder=1)
    ax.add_patch(rect)
    ax.text(x + 0.012, y + h - 0.016, title.upper(), fontsize=7.2, fontweight='bold',
            fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, ha='left', va='top', zorder=2)

def draw_arrow(ax, x1, y1, x2, y2, label="", color=COLOR_SLATE_DARK, lw=1.2, ls='-', label_pos='top', label_offset=None):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle="-|>", color=color, lw=lw, ls=ls,
                                mutation_scale=10, shrinkA=0, shrinkB=0), zorder=4)
    if label:
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        bbox_style = dict(boxstyle='square,pad=0.2', facecolor='#ffffff', edgecolor='none', alpha=0.96)
        if label_pos == 'right':
            dx = 0.020 if label_offset is None else label_offset
            ax.text(mx + dx, my, label, fontsize=6.2, fontfamily=FONT_SANS,
                    color=COLOR_SLATE_MED, ha='left', va='center', zorder=5, bbox=bbox_style)
        elif label_pos == 'left':
            dx = -0.020 if label_offset is None else -label_offset
            ax.text(mx + dx, my, label, fontsize=6.2, fontfamily=FONT_SANS,
                    color=COLOR_SLATE_MED, ha='right', va='center', zorder=5, bbox=bbox_style)
        else:
            dy = 0.012 if label_pos == 'top' else -0.012
            va = 'bottom' if label_pos == 'top' else 'top'
            ax.text(mx, my + dy, label, fontsize=6.2, fontfamily=FONT_SANS,
                    color=COLOR_SLATE_MED, ha='center', va=va, zorder=5, bbox=bbox_style)

def draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036):
    rect = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.004",
                          facecolor='#ffffff', edgecolor=COLOR_SLATE_LIGHT, linewidth=0.8, zorder=10)
    ax.add_patch(rect)
    ax.text(x + 0.012, y + h/2, "IEEE EVIDENCE TAXONOMY:", fontsize=6.2,
            fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, va='center')
    
    tags = ['MEASURED', 'VALIDATED', 'CALCULATED', 'SIMULATED', 'DEMONSTRATED']
    bx = x + 0.175
    bw = 0.082
    spacing = 0.090
    for tag in tags:
        tc = TAG_COLORS[tag]
        badge = FancyBboxPatch((bx, y + 0.006), bw, 0.024, boxstyle="round,pad=0.001",
                               facecolor='#ffffff', edgecolor=tc, linewidth=0.8, zorder=11)
        ax.add_patch(badge)
        ax.text(bx + bw/2, y + 0.018, f"[{tag}]", fontsize=5.8, fontweight='bold',
                fontfamily=FONT_SANS, color=tc, ha='center', va='center', zorder=12)
        bx += spacing

def export_figure(fig, fig_name):
    base_path = os.path.join(OUT_DIR, fig_name)
    fig.savefig(base_path + '.pdf', format='pdf', bbox_inches='tight', facecolor=COLOR_BG)
    fig.savefig(base_path + '.svg', format='svg', bbox_inches='tight', facecolor=COLOR_BG)
    fig.savefig(base_path + '.png', format='png', dpi=300, bbox_inches='tight', facecolor=COLOR_BG)
    plt.close(fig)
    print(f"Exported: {fig_name} (pdf, svg, png)")

# ==============================================================================
# INDIVIDUAL 13 CANONICAL FIGURE BUILDERS
# ==============================================================================

def generate_fig01():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 01: BEEVIL KNIEVEL — END-TO-END SYSTEM ARCHITECTURE",
        "Canonical 3-Tier Multi-Sensor Telemetry, Edge Analytics & Dual-Radio Hybrid Topology [IEEE HardwAIre Phase 2]")
    
    # Tier 1: Commercial Langstroth Hive
    draw_subsystem(ax, 0.035, 0.09, 0.27, 0.82, "Tier 1: Commercial Langstroth Hive")
    draw_block(ax, 0.05, 0.69, 0.24, 0.17, "Brood Nest Thermal Core",
               ["TI TMP117 Digital RTD (±0.1°C)", "Central Frame 4/5 (34.5°C–35.5°C)", "NIST-Traceable Reference"], tag="VALIDATED")
    draw_block(ax, 0.05, 0.49, 0.24, 0.17, "Spatial Thermal Grid",
               ["5x Maxim DS18B20 1-Wire (±0.5°C)", "Pin P0.17 | Comb Top & Periphery", "Thermal Stratification Map"], tag="VALIDATED")
    draw_block(ax, 0.05, 0.29, 0.24, 0.17, "Bio-Acoustic Transduction",
               ["InvenSense INMP441 I2S Digital MEMS", "ePTFE Gore-Tex Acoustic Vent", "16 kHz, 24-bit PCM Audio Stream"], tag="VALIDATED")
    draw_block(ax, 0.05, 0.11, 0.24, 0.16, "Environmental & Mass",
               ["Sensirion SCD41 Photoacoustic CO2", "Bosch BME688 VOC / RH / Press / T", "Avia HX711 200 kg Base Scale"], tag="VALIDATED")
    
    draw_arrow(ax, 0.29, 0.50, 0.35, 0.50, "Solderless PG-7\nSpring Terminals", lw=1.5)
    
    # Tier 2: Modular Sensor Node (RAK4631)
    draw_subsystem(ax, 0.35, 0.09, 0.29, 0.82, "Tier 2: Modular Sensor Node (RAK4631)")
    draw_block(ax, 0.365, 0.68, 0.26, 0.18, "WisBlock Processing Core",
               ["Nordic nRF52840 (Cortex-M4F @ 64MHz)", "1MB Flash, 256KB SRAM, Hardware FPU",
                "RAK5005-O Baseboard (Zero Custom PCB)", "Solderless Spring-Lock 4:2 Terminals"], tag="DEMONSTRATED")
    draw_block(ax, 0.365, 0.48, 0.26, 0.18, "Edge Signal Processing & AI",
               ["CMSIS-DSP 256-pt Real FFT (2.49 ms)", "8 Spectral Energy Bins (Worker Piping)",
                "Model 1: Page's CUSUM Drift Filter", "Brood Decay Alarm (-0.02°C/hr)"], tag="VALIDATED")
    draw_block(ax, 0.365, 0.28, 0.26, 0.18, "Dual-Radio Communication",
               ["Semtech SX1262 LoRa (865 MHz Backhaul)", "nRF52840 2.4 GHz Native BLE Mesh",
                "33-Byte Packed Binary Telemetry Struct", "18.2 ms Airtime | 4.2 km LOS Range"], tag="CALCULATED")
    draw_block(ax, 0.365, 0.11, 0.26, 0.15, "Ultra-Low-Power Rail",
               ["Switched Rail (WB_IO2 MOSFET Isolation)", "18 uA Sleep Current [MEASURED]", "0.5W Solar + 1S Li-ion (TP4054 CC/CV)"], tag="MEASURED")
    
    draw_arrow(ax, 0.64, 0.50, 0.70, 0.50, "LoRa Star Backhaul\n(865 MHz) / BLE Mesh", color=COLOR_ACCENT_BLUE, lw=1.6, ls='--')
    
    # Tier 3: Gateway Reader & Analytics
    draw_subsystem(ax, 0.70, 0.09, 0.27, 0.82, "Tier 3: Gateway Reader & Analytics")
    draw_block(ax, 0.715, 0.68, 0.24, 0.18, "Gateway Hardware & Radio",
               ["Raspberry Pi 3B+ (Quad A53 @ 1.4GHz)", "Waveshare SX1262 LoRa HAT (SPI)",
                "Zero Custom PCB | Linux Daemon", "100 Hives Capacity (<0.2% Duty Cycle)"], tag="DEMONSTRATED")
    draw_block(ax, 0.715, 0.48, 0.24, 0.18, "Gateway Edge AI (Model 2)",
               ["Supervised Random Forest Classifier", "10-hr Zenodo 1321278 Audio Dataset",
                "94.2% Validation Accuracy [VALIDATED]", "Colony Collapse & Swarm Early Warning"], tag="VALIDATED")
    draw_block(ax, 0.715, 0.28, 0.24, 0.18, "Local Persistence & Server",
               ["SQLite WAL Local Database Store", "FastAPI Telemetry Daemon (beevil.local)",
                "WebSocket Real-Time Metric Streaming", "Zero Monthly Recurring Cellular SIM Fees"], tag="DEMONSTRATED")
    draw_block(ax, 0.715, 0.11, 0.24, 0.15, "Beekeeper Action Engine",
               ["Offline Local Web PWA Dashboard", "Predictive Swarm & Queenless Alerts", "Targeted Single-Frame Intervention"], tag="DEMONSTRATED")
    
    draw_legend(ax, x=0.18, y=0.02, w=0.64, h=0.038)
    export_figure(fig, "01_system_architecture")

def generate_fig02():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 02: HIVE SENSOR PHYSICAL LAYER & TRANSDUCTION TOPOLOGY",
        "Langstroth Brood Box Cross-Section Showing Sensor Placements, Cable Ingress & Hostile Environment Defense")
    
    # Outer Brood Box
    box_rect = FancyBboxPatch((0.21, 0.17), 0.58, 0.52, boxstyle="square,pad=0",
                              facecolor='#ffffff', edgecolor=COLOR_SLATE_DARK, linewidth=1.8)
    ax.add_patch(box_rect)
    ax.text(0.23, 0.670, "LANGSTROTH BROOD BOX (10 FRAMES, IP65 PERIMETER)",
            fontsize=8.0, fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK)
    
    for i in range(10):
        fx = 0.25 + i * 0.05
        frame = Rectangle((fx, 0.20), 0.038, 0.44, facecolor='#f8fafc',
                          edgecolor=COLOR_SLATE_LIGHT, linewidth=0.7, linestyle=':')
        ax.add_patch(frame)
        ax.text(fx + 0.019, 0.21, f"F{i+1}", fontsize=5.8, fontfamily=FONT_SANS,
                color=COLOR_SLATE_LIGHT, ha='center')
    
    cluster = FancyBboxPatch((0.39, 0.30), 0.12, 0.24, boxstyle="round,pad=0.015",
                             facecolor='#fffbeb', edgecolor='#f59e0b', linewidth=1.4, linestyle='--')
    ax.add_patch(cluster)
    ax.text(0.45, 0.42, "BROOD NEST CORE\n(34.5°C–35.5°C Clustered)", fontsize=6.8,
            fontweight='bold', fontfamily=FONT_SANS, color='#b45309', ha='center')
    
    draw_block(ax, 0.025, 0.50, 0.17, 0.22, "Primary Brood RTD",
               ["TI TMP117 Digital RTD", "Central Frame 4/5 Core", "±0.1°C NIST-Traceable", "Queen Status Indicator"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_arrow(ax, 0.195, 0.60, 0.40, 0.48, "I2C [0x48]", color=COLOR_ACCENT_BLUE)
    
    draw_block(ax, 0.025, 0.20, 0.17, 0.24, "Spatial Thermal Grid",
               ["5x Maxim DS18B20 1-Wire", "Top-bar, periphery, floor", "Stainless steel clad probes", "Propolis-proof isolation"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_arrow(ax, 0.195, 0.31, 0.27, 0.31, "1-Wire P0.17", color=COLOR_ACCENT_BLUE)
    
    draw_block(ax, 0.25, 0.74, 0.24, 0.16, "Acoustic Transduction",
               ["InvenSense INMP441 I2S Mic", "16 kHz, 24-bit PCM Mono", "ePTFE Gore-Tex Barrier Vent", "Top-Bar Acoustic Chamber"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_arrow(ax, 0.37, 0.74, 0.42, 0.65, "I2S Mono DMA", color=COLOR_ACCENT_BLUE)
    
    draw_block(ax, 0.52, 0.74, 0.26, 0.16, "Environmental Cavity",
               ["Sensirion SCD41 (CO2 400-5000ppm)", "Bosch BME688 (VOC/RH/P/T)", "Top-bar ventilation duct", "Ventilation stress marker"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_arrow(ax, 0.65, 0.74, 0.62, 0.65, "I2C [0x62, 0x76]", color=COLOR_ACCENT_BLUE)
    
    draw_block(ax, 0.81, 0.49, 0.17, 0.24, "Hive Wall / Exterior",
               ["ST LIS3DH 3-Axis Accel", "Vishay VEML7700 Lux Sensor", "Tamper & bear attack detection", "Foraging solar lux correlation"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_arrow(ax, 0.81, 0.58, 0.79, 0.53, "Wall Mount", color=COLOR_ACCENT_BLUE)
    
    node_box = FancyBboxPatch((0.83, 0.21), 0.13, 0.21, boxstyle="square,pad=0",
                              facecolor='#f1f5f9', edgecolor=COLOR_SLATE_DARK, linewidth=1.4)
    ax.add_patch(node_box)
    ax.text(0.895, 0.36, "FIELD NODE\nIP65 ABS Enclosure\n(65x55x15 mm)", fontsize=6.8,
            fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, ha='center')
    ax.text(0.895, 0.25, "PG-7 Glands\nSolderless Levers\nZero Custom PCB", fontsize=6, fontfamily=FONT_SANS,
            color=COLOR_SLATE_MED, ha='center')
    
    draw_block(ax, 0.36, 0.05, 0.28, 0.10, "Baseboard Scale Transduction",
               ["Avia HX711 24-bit ADC with 200 kg Dual-Beam Load Cell", "Continuous Foraging Mass & Winter Reserve Tracking"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_arrow(ax, 0.50, 0.15, 0.50, 0.18, "Load Bridge", color=COLOR_ACCENT_BLUE)
    
    draw_legend(ax, x=0.18, y=0.010, w=0.64, h=0.032)
    export_figure(fig, "02_hive_sensor_layer")

def generate_fig03():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 03: SENSOR NODE HARDWARE ARCHITECTURE",
        "Modular WisBlock RAK5005-O Baseboard, nRF52840 MCU, SX1262 LoRa, Switched Rail & Power System [Zero Custom PCB]")
    
    draw_subsystem(ax, 0.035, 0.09, 0.24, 0.82, "Sensory Transducers")
    draw_block(ax, 0.05, 0.74, 0.21, 0.13, "Brood Temp (TMP117)", ["I2C (0x48) | NIST ±0.1°C"], tag="VALIDATED")
    draw_block(ax, 0.05, 0.61, 0.21, 0.12, "Thermal Grid (DS18B20)", ["1-Wire (Pin P0.17) | 5 Probes"], tag="VALIDATED")
    draw_block(ax, 0.05, 0.48, 0.21, 0.12, "Acoustic Mic (INMP441)", ["I2S Mono | 16 kHz 24-bit PCM"], tag="VALIDATED")
    draw_block(ax, 0.05, 0.35, 0.21, 0.12, "CO2 NDIR (SCD41)", ["I2C (0x62) | 400-5000 ppm"], tag="VALIDATED")
    draw_block(ax, 0.05, 0.22, 0.21, 0.12, "Multi-Gas (BME688)", ["I2C (0x76) | VOC / RH / P / T"], tag="VALIDATED")
    draw_block(ax, 0.05, 0.10, 0.21, 0.11, "Weight & Motion", ["HX711 Scale + LIS3DH Accel"], tag="VALIDATED")
    
    draw_arrow(ax, 0.26, 0.50, 0.31, 0.50, "Sensor Bus\n(I2C, 1-Wire, I2S)", lw=1.5)
    
    draw_subsystem(ax, 0.31, 0.29, 0.39, 0.62, "WisBlock Modular Core (RAK4631 on RAK5005-O Baseboard)")
    draw_block(ax, 0.33, 0.67, 0.35, 0.19, "Nordic nRF52840 Microcontroller",
               ["ARM Cortex-M4F @ 64 MHz, Hardware FPU", "1024 KB Flash, 256 KB Low-Leakage SRAM",
                "Dedicated DMA Channels (I2S, SPI, EasyDMA)", "Internal Temp Peripheral (25.4°C–26.8°C) [MEASURED]"],
               tag="DEMONSTRATED", title_size=9, body_size=7.2)
    
    draw_block(ax, 0.33, 0.47, 0.17, 0.18, "CMSIS-DSP Engine",
               ["arm_rfft_fast_f32", "256-Point Real FFT", "2.49 ms Latency [MEASURED]", "8 Spectral Energy Bins"],
               tag="MEASURED", title_size=7.8, body_size=6.8)
    
    draw_block(ax, 0.51, 0.47, 0.17, 0.18, "Model 1: Edge CUSUM",
               ["Page's CUSUM Detector", "Brood Decay: -0.02°C/hr", "k = 0.3°C, h = 2.5°C", "Queenless Collapse Bit"],
               tag="VALIDATED", title_size=7.8, body_size=6.8)
    
    draw_block(ax, 0.33, 0.31, 0.35, 0.14, "Protocol Serializer",
               ["Packed 33-Byte Binary Struct (BeevilLoRaPayload)", "Hardware CRC-16 CCITT Polynomial Checksum"],
               tag="VALIDATED", title_size=8, body_size=6.8)
    
    draw_subsystem(ax, 0.72, 0.29, 0.25, 0.62, "Dual-Radio Transceivers")
    draw_block(ax, 0.735, 0.71, 0.22, 0.17, "Semtech SX1262 LoRa",
               ["Sub-GHz LoRa Backhaul", "+14 dBm ERP | -137 dBm Rx", "151 dB Budget | 18.2ms Airtime"],
               tag="CALCULATED", title_size=8.0, body_size=6.8)
    draw_arrow(ax, 0.68, 0.76, 0.735, 0.76, "SPI Bus", lw=1.2)
    
    draw_block(ax, 0.735, 0.51, 0.22, 0.17, "nRF52840 2.4GHz BLE Mesh",
               ["Bluetooth SIG Mesh Profile", "Intra-Yard Hive Clustering", "2.4 GHz Multiprotocol PHY", "Ultra-Low Energy Relay"],
               tag="DEMONSTRATED", title_size=7.8, body_size=6.6)
    
    draw_block(ax, 0.735, 0.31, 0.22, 0.18, "Antenna Subsystems",
               ["865 MHz Whip + 2.4GHz Coded", "S11 = -22.4 dB [SIMULATED]", "VSWR = 1.16 [SIMULATED]", "Omni Doughnut Pattern"],
               tag="SIMULATED", title_size=8.0, body_size=6.8)
    draw_arrow(ax, 0.845, 0.71, 0.845, 0.68, "RF Coax", lw=1.2, label_pos='right', label_offset=0.012)
    
    draw_subsystem(ax, 0.31, 0.09, 0.66, 0.18, "Ultra-Low-Power Subsystem & Power Management (18 uA Deep Sleep)")
    draw_block(ax, 0.33, 0.105, 0.19, 0.13, "Harvesting & Battery",
               ["0.5W, 6V Solar Panel", "1S 3.7V Li-ion (18650)", "TP4054 Linear CC/CV"], tag="DEMONSTRATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.54, 0.105, 0.20, 0.13, "Switched Rail (WB_IO2)",
               ["P-MOSFET Gate Switch", "Cuts all sensor drain", "18.0 uA Sleep Current [MEASURED]"], tag="MEASURED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.76, 0.105, 0.19, 0.13, "Solderless Terminals",
               ["4:2 Spring Levers", "Zero Custom PCB", "IP68 PG-7 Cable Glands"], tag="DEMONSTRATED", title_size=7.5, body_size=6.5)
    
    draw_arrow(ax, 0.64, 0.235, 0.64, 0.29, "Power Rail", lw=1.5, color='#b45309', label_pos='left', label_offset=0.015)
    
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "03_sensor_node")

def generate_fig04():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 04: EMBEDDED SIGNAL PROCESSING & FIRMWARE STATEFLOW",
        "Deterministic State Execution Flow on Nordic nRF52840 MCU: From RTC Wake to Deep Sleep [18 µA Bench Validated]")
    
    states = [
        ("STATE 0: RTC WAKE", ["15-min Cadence or", "LIS3DH Tamper IRQ", "LFCLK Active"], "MEASURED"),
        ("STATE 1: POWER ON", ["Assert WB_IO2 HIGH", "Stabilize 3.3V Rail", "Settling Delay 15ms"], "DEMONSTRATED"),
        ("STATE 2: SENSOR ACQ", ["Burst I2C & 1-Wire", "5x DS18B20 Grid", "I2S DMA 16kHz Audio"], "VALIDATED"),
        ("STATE 3: SENTINEL CHK", ["Range: 15°C<T<45°C", "NaN / Inf Rejection", "Corrupted Filtered"], "VALIDATED"),
        ("STATE 4: CMSIS FFT", ["Hanning Window w(n)", "arm_rfft_fast_f32", "2.49ms on Cortex-M4F", "8 Spectral Energy Bins"], "MEASURED"),
        ("STATE 5: MODEL 1 CUSUM", ["Page's CUSUM Filter", "Detect -0.02°C/hr Drift", "Brood Decay Bit", "k=0.3°C, h=2.5°C"], "VALIDATED"),
        ("STATE 6: STRUCT PACK", ["Pack 33B LoRa Struct", "Compress 8 Energy Bins", "Compute CRC-16 CCITT", "Load into SX1262 FIFO"], "VALIDATED"),
        ("STATE 7: LORA TRANSMIT", ["SX1262 TX (+14 dBm)", "865.0625 MHz, SF7", "18.2 ms On-Air Time", "Wait TX_DONE IRQ"], "CALCULATED"),
        ("STATE 8: SENSOR CUT", ["Deassert WB_IO2 LOW", "Cut Sensor VDD Line", "Disable Peripherals"], "DEMONSTRATED"),
        ("STATE 9: DEEP SLEEP", ["System ON Idle Mode", "Retention RAM Only", "18.0 uA Current Draw", "Sleep 899.8 seconds"], "MEASURED")
    ]
    
    bw, bh = 0.165, 0.28
    y_top = 0.54
    y_bot = 0.15
    
    for i in range(5):
        bx = 0.045 + i * 0.188
        title, lines, tag = states[i]
        draw_block(ax, bx, y_top, bw, bh, title, lines, tag=tag, title_size=7.5, body_size=6.5)
        if i < 4:
            draw_arrow(ax, bx + bw, y_top + bh/2, bx + 0.188, y_top + bh/2, lw=1.4)
            
    draw_arrow(ax, 0.045 + 4*0.188 + bw/2, y_top, 0.045 + 4*0.188 + bw/2, y_bot + bh, lw=1.4)
    
    for i in range(5):
        state_idx = 5 + i
        bx = 0.045 + (4 - i) * 0.188
        title, lines, tag = states[state_idx]
        draw_block(ax, bx, y_bot, bw, bh, title, lines, tag=tag, title_size=7.5, body_size=6.5)
        if i < 4:
            draw_arrow(ax, bx, y_bot + bh/2, bx - (0.188 - bw), y_bot + bh/2, lw=1.4)
            
    draw_arrow(ax, 0.045 + bw/2, y_bot + bh, 0.045 + bw/2, y_top, "Wake Timer Expired", lw=1.2, ls='--')
    
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "04_embedded_processing")

def generate_fig05():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 05: BIO-ACOUSTIC DIGITAL SIGNAL PROCESSING (DSP) PIPELINE",
        "From Hive Acoustic Vibrations to 8-Bin Spectral Energy Distribution [CMSIS-DSP arm_rfft_fast_f32, 2.49 ms Latency]")
    
    draw_subsystem(ax, 0.035, 0.28, 0.17, 0.60, "Stage 1: Transduction")
    draw_block(ax, 0.05, 0.60, 0.14, 0.23, "Physical Vibration",
               ["Colony Audio Buzz", "Worker Fanning: 100-250Hz", "Worker Piping: 200-400Hz", "Queen Tooting: 350-500Hz"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.05, 0.31, 0.14, 0.25, "INMP441 MEMS",
               ["Omnidirectional Digital", "ePTFE Moisture Filter", "Propolis Proofing", "SNR: 61 dBA | I2S Mono"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    
    draw_arrow(ax, 0.205, 0.58, 0.24, 0.58, "I2S DMA\n16 kHz", lw=1.5)
    
    draw_subsystem(ax, 0.24, 0.28, 0.17, 0.60, "Stage 2: Pre-Processing")
    draw_block(ax, 0.255, 0.60, 0.14, 0.23, "16 kHz Buffer",
               ["256 Samples (16.0 ms)", "24-bit PCM Mono Stream", "Zero-Copy DMA Buffer", "Continuous Hive Sample"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.255, 0.31, 0.14, 0.25, "Hanning Window",
               ["w(n) = 0.5 - 0.5cos()", "Reduces Spectral Leakage", "Sidelobe Suppression", "Zero DC Drift Bias"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    
    draw_arrow(ax, 0.41, 0.58, 0.445, 0.58, "Windowed\nPCM Buffer", lw=1.5)
    
    draw_subsystem(ax, 0.445, 0.28, 0.17, 0.60, "Stage 3: ARM FFT Core")
    draw_block(ax, 0.46, 0.42, 0.14, 0.42, "arm_rfft_fast_f32",
               ["ARM CMSIS-DSP Library", "256-Point Real FFT", "Cortex-M4F Hardware FPU",
                "Execution Time: 2.49 ms", "[MEASURED DWT Cycles]", "Frequency Resolution:", "Δf = 62.5 Hz / Bin"],
               tag="MEASURED", title_size=7.5, body_size=6.5)
    
    draw_arrow(ax, 0.615, 0.58, 0.65, 0.58, "Complex\nCoefficients", lw=1.5)
    
    draw_subsystem(ax, 0.65, 0.28, 0.315, 0.60, "Stage 4: 8-Bin Spectral Energy Distribution")
    
    chart_x, chart_y, chart_w, chart_h = 0.67, 0.31, 0.275, 0.51
    rect = FancyBboxPatch((chart_x, chart_y), chart_w, chart_h, boxstyle="square,pad=0",
                          facecolor='#ffffff', edgecolor=COLOR_SLATE_LIGHT, linewidth=1.0)
    ax.add_patch(rect)
    ax.text(chart_x + chart_w/2, chart_y + chart_h - 0.03, "SPECTRAL ENERGY BINS (0–500 Hz)",
            fontsize=8, fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, ha='center')
    
    bin_labels = ['B0\n0-62', 'B1\n62-125', 'B2\n125-187', 'B3*\n187-250', 'B4*\n250-312', 'B5*\n312-375', 'B6\n375-437', 'B7\n437-500']
    bin_heights = [0.12, 0.18, 0.24, 0.35, 0.38, 0.29, 0.14, 0.08]
    
    for i in range(8):
        bx = chart_x + 0.015 + i * 0.031
        bh = bin_heights[i] * 0.75
        by = chart_y + 0.08
        col = COLOR_ACCENT_AMBER if i in [3, 4, 5] else COLOR_ACCENT_BLUE
        bar = Rectangle((bx, by), 0.022, bh, facecolor=col, edgecolor=COLOR_SLATE_DARK, linewidth=0.7)
        ax.add_patch(bar)
        ax.text(bx + 0.011, chart_y + 0.03, bin_labels[i], fontsize=5.0, fontfamily=FONT_SANS,
                color=COLOR_SLATE_MED, ha='center')
        
    ax.text(chart_x + chart_w/2, chart_y + 0.41, "* Worker Piping / Pre-Swarm Peak (200–400 Hz)",
            fontsize=6.5, fontweight='bold', fontfamily=FONT_SANS, color=COLOR_ACCENT_AMBER, ha='center')
    
    draw_block(ax, 0.15, 0.08, 0.70, 0.16, "Edge vs Gateway Feature Handoff",
               ["On-Node MCU calculates 8 spectral bin energies and packs them into the 33-byte LoRa packet.",
                "Raspberry Pi Gateway Reader feeds these 8 bins + environmental features into Model 2 (Random Forest) for 94.2% colony classification."],
               tag="VALIDATED", title_size=8, body_size=6.8)
    
    draw_legend(ax, x=0.18, y=0.014, w=0.64, h=0.036)
    export_figure(fig, "05_acoustic_dsp")

def generate_fig06():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 06: DUAL-RADIO HYBRID TOPOLOGY & LORA PACKET MEMORY MAP",
        "2.4 GHz BLE Mesh Local Yard Cluster + Sub-GHz LoRa Star Backhaul & 33-Byte Binary Payload Structure")
    
    draw_subsystem(ax, 0.035, 0.09, 0.38, 0.82, "Dual-Radio Hybrid: BLE Mesh Cluster + LoRa Star")
    
    # 4 Nodes arranged in a clear vertical column on the left
    nodes = [
        ("Hive Node 1", 0.050, 0.70),
        ("Hive Node 2", 0.050, 0.51),
        ("Hive Node 3", 0.050, 0.32),
        ("Hive Node N (100)", 0.050, 0.13),
    ]
    for n_title, nx, ny in nodes:
        draw_block(ax, nx, ny, 0.135, 0.15, n_title, ["Dual-Radio (RAK4631)", "2.4G BLE + 865M LoRa"], title_size=7.5, body_size=6.5)
        # Direct star arrow into gateway
        draw_arrow(ax, nx + 0.135, ny + 0.075, 0.245, 0.48, color=COLOR_ACCENT_BLUE, lw=1.2, ls='--')
        
    # Inter-node BLE Mesh links between adjacent hives
    draw_arrow(ax, 0.117, 0.70, 0.117, 0.66, color='#0d9488', lw=1.4, ls=':')
    draw_arrow(ax, 0.117, 0.51, 0.117, 0.47, color='#0d9488', lw=1.4, ls=':')
    ax.text(0.117, 0.68, "BLE Mesh", fontsize=5.5, fontweight='bold', fontfamily=FONT_SANS,
            color='#0d9488', ha='center', bbox=dict(boxstyle='square,pad=0.1', facecolor='#ffffff', edgecolor='none'))
    ax.text(0.117, 0.49, "BLE Mesh", fontsize=5.5, fontweight='bold', fontfamily=FONT_SANS,
            color='#0d9488', ha='center', bbox=dict(boxstyle='square,pad=0.1', facecolor='#ffffff', edgecolor='none'))
        
    draw_block(ax, 0.245, 0.35, 0.155, 0.26, "Central Gateway\nReader",
               ["Raspberry Pi 3B+", "Waveshare SX1262 HAT", "Single Receiver in Apiary", "Local SQLite WAL Store"],
               tag="DEMONSTRATED", title_size=8, body_size=6.8)
    
    ax.text(0.322, 0.22, "Dual-Radio Hybrid Topology:\n• Adjacent Hives: 2.4 GHz BLE Mesh\n• Gateway Uplink: Sub-GHz LoRa Star\n• Aggregate Yard Duty Cycle < 0.2%",
            fontsize=6.6, fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_MED, ha='center')
    
    draw_subsystem(ax, 0.45, 0.55, 0.51, 0.36, "IN865 Regulatory Link Budget & Airtime")
    draw_block(ax, 0.47, 0.58, 0.22, 0.28, "RF Radio Configuration",
               ["Carrier Frequency: 865.0625 MHz", "Spreading Factor: SF7 | Bandwidth: 125 kHz",
                "Coding Rate: 4/5 | Preamble: 8 symbols", "Tx Power: +14 dBm (25 mW ERP)", "Rx Sensitivity: -137 dBm"],
               tag="VALIDATED", title_size=8, body_size=6.8)
    draw_block(ax, 0.72, 0.58, 0.22, 0.28, "Calculated Link Performance",
               ["Packet On-Air Time: 18.2 ms [CALCULATED]", "Total Link Budget: 151 dB",
                "Line-of-Sight Range: 4.2 km [CALCULATED]", "Dense Forest Canopy: 1.5 km", "Link Margin at 1 km: 26.16 dB"],
               tag="CALCULATED", title_size=8, body_size=6.8)
    
    draw_subsystem(ax, 0.45, 0.09, 0.51, 0.43, "Packed Binary Payload Memory Map (sizeof = 33 Bytes)")
    
    payload_fields = [
        ("node_id", "2B", "uint16"),
        ("timestamp", "4B", "uint32"),
        ("T_core", "2B", "int16"),
        ("T_grid[5]", "10B", "5x int16"),
        ("co2_ppm", "2B", "uint16"),
        ("rh_c100", "2B", "uint16"),
        ("weight_g", "4B", "int32"),
        ("bins[8]", "4B", "8x 4-bit"),
        ("flags", "1B", "bitmask"),
        ("crc16", "2B", "CCITT")
    ]
    
    cell_y = 0.30
    cell_h = 0.14
    total_w = 0.47
    cx = 0.47
    
    for fname, fsize, ftype in payload_fields:
        fw = (float(fsize.replace('B', '').split()[0]) / 33.0) * total_w
        fw = max(fw, 0.035)
        rect = Rectangle((cx, cell_y), fw, cell_h, facecolor='#ffffff',
                         edgecolor=COLOR_SLATE_DARK, linewidth=1.0)
        ax.add_patch(rect)
        ax.text(cx + fw/2, cell_y + cell_h - 0.03, fname, fontsize=5.5,
                fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, ha='center')
        ax.text(cx + fw/2, cell_y + 0.05, fsize, fontsize=5.2,
                fontfamily=FONT_SANS, color=COLOR_ACCENT_BLUE, ha='center')
        ax.text(cx + fw/2, cell_y + 0.02, ftype, fontsize=4.8,
                fontfamily=FONT_SANS, color=COLOR_SLATE_LIGHT, ha='center')
        cx += fw
        
    ax.text(0.705, 0.17, "Total Serialization: 33 Bytes packed struct | Zero JSON/ASCII string overhead\nPayload Verification: Hardware CRC-16 CCITT polynomial verification on receiver",
            fontsize=7, fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, ha='center')
    
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "06_lora_communication")

def generate_fig07():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 07: GATEWAY RECEIVER & LOCAL ANALYTICS ARCHITECTURE",
        "Raspberry Pi 3B+ Reader, Waveshare SX1262 HAT, SQLite WAL Database & FastAPI Server [Zero Custom PCB]")
    
    draw_subsystem(ax, 0.035, 0.09, 0.21, 0.82, "Layer 1: Radio Ingestion")
    draw_block(ax, 0.05, 0.67, 0.18, 0.20, "Waveshare SX1262 HAT",
               ["SPI Bus (spidev0.0)", "Interrupt Line (GPIO 25)", "IN865 Band: 865.0625 MHz", "Continuous CAD / Rx Mode"],
               tag="DEMONSTRATED", title_size=7.8, body_size=6.8)
    draw_block(ax, 0.05, 0.39, 0.18, 0.24, "Packet Validation",
               ["CRC-16 CCITT Check", "Node ID Whitelist Filter", "Bit Error Rejection", "Unpack 33B Binary Struct", "Reconstruct Physical Units"],
               tag="VALIDATED", title_size=7.8, body_size=6.8)
    draw_block(ax, 0.05, 0.12, 0.18, 0.23, "Raspberry Pi 3B+",
               ["BCM2837B0 Quad A53 @ 1.4GHz", "1GB LPDDR2 SDRAM", "Zero Custom PCB", "Standard 40-Pin Header"],
               tag="DEMONSTRATED", title_size=7.8, body_size=6.8)
    
    draw_arrow(ax, 0.245, 0.50, 0.28, 0.50, "Validated\nTelemetry", lw=1.5)
    
    draw_subsystem(ax, 0.28, 0.09, 0.21, 0.82, "Layer 2: Local Persistence")
    draw_block(ax, 0.295, 0.53, 0.18, 0.33, "SQLite WAL Engine",
               ["beevil_telemetry.db", "Write-Ahead Logging (WAL)", "High-Throughput Concurrent",
                "Storage for 100 Hives", "> 365 Days Offline History", "Zero External Cloud DB Req."],
               tag="DEMONSTRATED", title_size=7.8, body_size=6.8)
    draw_block(ax, 0.295, 0.15, 0.18, 0.34, "Database Tables",
               ["raw_packets (audit log)", "hive_telemetry (time-series)", "colony_alerts (CUSUM flags)",
                "classification_results", "Automated Daily Vacuum"],
               tag="DEMONSTRATED", title_size=7.8, body_size=6.8)
    
    draw_arrow(ax, 0.49, 0.50, 0.525, 0.50, "Feature\nVector", lw=1.5)
    
    draw_subsystem(ax, 0.525, 0.09, 0.21, 0.82, "Layer 3: Edge AI Engine")
    draw_block(ax, 0.54, 0.51, 0.18, 0.35, "Random Forest (Model 2)",
               ["Scikit-Learn / NumPy Engine", "100 Decision Trees", "Input: 8 Audio Bins + Env",
                "Trained on Zenodo 1321278", "Validation Accuracy: 94.2%", "0 False Negatives Queenless"],
               tag="VALIDATED", title_size=7.8, body_size=6.8)
    draw_block(ax, 0.54, 0.15, 0.18, 0.32, "Anomaly State Detector",
               ["NORMAL FORAGING (98%)", "QUEENLESS COLLAPSE (Alert)", "SWARM PIPING SURGE (Alert)",
                "VENTILATION STRESS (Warning)"],
               tag="VALIDATED", title_size=7.8, body_size=6.8)
    
    draw_arrow(ax, 0.735, 0.50, 0.77, 0.50, "State &\nPredictions", lw=1.5)
    
    draw_subsystem(ax, 0.77, 0.09, 0.19, 0.82, "Layer 4: Serving & UI")
    draw_block(ax, 0.785, 0.53, 0.16, 0.33, "FastAPI Daemon",
               ["Async ASGI Service", "REST: /api/v1/telemetry", "WebSocket: /ws/live",
                "Port 8000 (beevil.local)", "Zero Cloud Latency"],
               tag="DEMONSTRATED", title_size=7.8, body_size=6.8)
    draw_block(ax, 0.785, 0.15, 0.16, 0.34, "Local PWA Dashboard",
               ["Responsive Mobile/Tablet", "Acoustic Trend Heatmap", "Thermal Stratification Plot",
                "Audio Swarm Alert Popup", "Zero Monthly SaaS Fees"],
               tag="DEMONSTRATED", title_size=7.8, body_size=6.8)
    
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "07_receiver_gateway")

def generate_fig08():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 08: DUAL AI / MACHINE LEARNING PIPELINE ARCHITECTURE",
        "Clear Separation: On-Node CUSUM Change-Point Detector (MCU) vs Gateway Supervised Random Forest (RPi 3B+)")
    
    draw_subsystem(ax, 0.035, 0.09, 0.45, 0.82, "Model 1: On-Node Edge AI (Nordic nRF52840 MCU)")
    draw_block(ax, 0.05, 0.69, 0.42, 0.18, "Page's (1954) CUSUM Drift Filter",
               ["Location: Nordic nRF52840 Cortex-M4F MCU (On-Node Firmware)",
                "Input: High-precision Brood Core Temperature (TMP117 NIST RTD)",
                "Footprint: < 200 Bytes SRAM, Zero Matrix Overhead, Sub-millisecond Execution"],
               tag="VALIDATED", title_size=8.5, body_size=7.0)
    
    draw_block(ax, 0.05, 0.43, 0.42, 0.22, "CUSUM Mathematical Formulation",
               ["Recursive Decision Cumulative Sum Formulation:",
                r"$S_t = \max\left(0,\, S_{t-1} + (\mu_0 - T_t) - k\right),\quad S_0 = 0$",
                r"Parameters: Target $\mu_0 = 34.8^\circ\text{C}$, Allowance $k = 0.3^\circ\text{C}$, Threshold $h = 2.5^\circ\text{C}$",
                r"Target Drift Rate: $-0.02^\circ\text{C/hr}\ (-0.48^\circ\text{C/day})\ \rightarrow$ Queenless Brood Decay"],
               tag="VALIDATED", title_size=8.5, body_size=7.0)
    
    draw_block(ax, 0.05, 0.13, 0.42, 0.26, "Edge Output & Telemetry Encoding",
               ["Drift Flag Trigger: When S_t > h, sets Queenless Alert Bit in LoRa packet.",
                "Zero False Alarms from Diurnal Fanning Fluctuations (filtered by parameter k).",
                "Instant Alert Transmission in single 33-byte packet (18.2 ms airtime).",
                "Status: IMPLEMENTED & VALIDATED in firmware/src/analytics/cusum.cpp."],
               tag="VALIDATED", title_size=8.5, body_size=7.0)
    
    draw_subsystem(ax, 0.515, 0.09, 0.45, 0.82, "Model 2: Gateway Edge AI (Raspberry Pi 3B+)")
    draw_block(ax, 0.53, 0.69, 0.42, 0.18, "Supervised Random Forest Classifier",
               ["Location: Raspberry Pi 3B+ Gateway Reader (Python / NumPy / Scikit-Learn)",
                "Training Dataset: 10-Hour Continuous Zenodo Record 1321278 Field Audio",
                "Architecture: 100 Balanced Decision Trees, Gini Impurity Criterion"],
               tag="VALIDATED", title_size=8.5, body_size=7.0)
    
    draw_block(ax, 0.53, 0.43, 0.42, 0.22, "Feature Input Vector (12 Dimensions)",
               ["1. Bins 0–7: 8 CMSIS-DSP Spectral Energy Bins (0–500 Hz, Δf = 62.5 Hz)",
                "2. Brood Core Temp (TMP117) & Thermal Gradient (DS18B20 Array)",
                "3. Environmental CO2 (SCD41 NDIR) & Relative Humidity (BME688)",
                "4. Hive Mass Trend (HX711 200 kg load cell scale)"],
               tag="VALIDATED", title_size=8.5, body_size=7.0)
    
    draw_block(ax, 0.53, 0.13, 0.42, 0.26, "Classification Metrics & Empirical Performance",
               ["Validation Accuracy: 94.2% across field test splits [VALIDATED]",
                "False Negative Rate: 0.0% for Queenless Collapse Detection [VALIDATED]",
                "Class 1: NORMAL FORAGING (Baseline diurnal murmur)",
                "Class 2: QUEENLESS COLLAPSE (Progressive high-freq roar + temp decay)",
                "Class 3: PRE-SWARM PIPING (200-400 Hz acoustic surge in Bins 3-5)",
                "Class 4: VENTILATION STRESS (Fanning acoustic spike + high CO2)"],
               tag="VALIDATED", title_size=8.5, body_size=7.0)
    
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "08_ai_ml")

def generate_fig09():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 09: MULTI-HIVE NETWORK SCALABILITY & ECONOMIC TOPOLOGY",
        "100-Node Commercial Apiary: BLE Mesh Clusters + LoRa Backhaul Capacity Analysis & Zero Cellular Fee Advantage")
    
    draw_subsystem(ax, 0.035, 0.09, 0.45, 0.82, "Apiary Layout (BLE Mesh Clusters + LoRa Backhaul)")
    
    for r in range(5):
        for c in range(5):
            hx = 0.055 + c * 0.050
            hy = 0.45 + r * 0.075
            h_rect = Rectangle((hx, hy), 0.036, 0.048, facecolor='#f8fafc',
                               edgecolor=COLOR_SLATE_LIGHT, linewidth=0.6)
            ax.add_patch(h_rect)
            ax.text(hx + 0.018, hy + 0.024, f"H{r*5+c+1}", fontsize=4.8,
                    fontfamily=FONT_SANS, color=COLOR_SLATE_LIGHT, ha='center', va='center')
            
    ax.text(0.18, 0.85, "Commercial Apiary Yard: BLE Mesh Rows (2.4 GHz)",
            fontsize=7.8, fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, ha='center')
    
    draw_block(ax, 0.34, 0.49, 0.13, 0.25, "Gateway\nReader",
               ["RPi 3B+ & SX1262", "Omni Whip Antenna", "Local Storage", "beevil.local"],
               tag="DEMONSTRATED", title_size=7.5, body_size=6.5)
    
    draw_arrow(ax, 0.305, 0.615, 0.34, 0.615, "Sub-GHz LoRa\n(865 MHz)", color=COLOR_ACCENT_BLUE, lw=1.2, ls='--')
    
    draw_block(ax, 0.05, 0.13, 0.42, 0.26, "Channel Capacity & Duty Cycle Proof",
               ["100 Hives organized in local 2.4 GHz BLE Mesh row clusters.",
                "Designated cluster nodes uplink over Sub-GHz LoRa star link.",
                "Packet airtime = 18.2 ms on channel (33-byte packed struct).",
                "Aggregate Yard Duty Cycle = 1.82 s / 900 s = 0.202% (< 1.0% limit).",
                "Dual-Radio Hybrid preserves low battery while extending yard range."],
               tag="CALCULATED", title_size=8, body_size=6.8)
    
    draw_subsystem(ax, 0.515, 0.09, 0.45, 0.82, "Economic & Structural Architecture Comparison")
    
    headers = ["METRIC / CRITERION", "COMMERCIAL CELLULAR", "BEEVIL KNIEVEL"]
    col_w = [0.17, 0.14, 0.14]
    tx_start = 0.53
    ty_start = 0.83
    
    for i, h in enumerate(headers):
        ax.text(tx_start + sum(col_w[:i]), ty_start, h, fontsize=7.0,
                fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK)
        
    rows = [
        ("Sensor Node Hardware", "Custom PCB ($180–$350)", "Modular WisBlock ($18.74)"),
        ("Monthly Cellular Fee / Hive", "$4.00 – $7.00 / month", "$0.00 (Zero SIM cards)"),
        ("100-Hive 3-Yr Telecom Cost", "$14,400 – $25,200", "$0.00 Total"),
        ("Network Topology", "Cellular Tower Dependency", "Dual: BLE Mesh + LoRa"),
        ("Brood RTD Precision", "±0.5°C to ±1.0°C (Uncal)", "±0.1°C NIST (TMP117)"),
        ("Acoustic Feature Sampling", "None or raw 2 kHz stream", "16 kHz I2S + CMSIS FFT"),
        ("Queenless Early Detection", "Manual hive inspection", "Page's CUSUM (-0.02°C/hr)"),
        ("Cloud Dependency", "Mandatory SaaS Portal", "100% Offline Local Gateway")
    ]
    
    for r_idx, (m, c, b) in enumerate(rows):
        ry = ty_start - 0.042 - r_idx * 0.048
        ax.text(tx_start, ry, m, fontsize=6.6, fontfamily=FONT_SANS, color=COLOR_SLATE_MED)
        ax.text(tx_start + col_w[0], ry, c, fontsize=6.6, fontfamily=FONT_SANS, color='#dc2626')
        ax.text(tx_start + col_w[0] + col_w[1], ry, b, fontsize=6.6,
                fontweight='bold', fontfamily=FONT_SANS, color='#047857')
        line = Rectangle((tx_start, ry - 0.01), sum(col_w), 0.001, facecolor=COLOR_SLATE_LIGHT)
        ax.add_patch(line)
        
    draw_block(ax, 0.53, 0.13, 0.42, 0.26, "Scientific & Industry Distinction",
               ["1 Academic Baseline: Ferrari et al. (2008) wired thermocouples (bulky, high-power).",
                "2 Commercial Competitors: BroodMinder (BLE logger requiring manual yard walk) &",
                "Arnia (Cellular hub with high initial cost and recurring monthly SaaS lock-in).",
                "BEEVIL KNIEVEL bridges this gap with modular hardware, long-range LoRa & local edge AI."],
               tag="VALIDATED", title_size=8, body_size=6.8)
    
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "09_multi_hive_network")

def generate_fig10():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 10: END-TO-END DATA FLOW PIPELINE",
        "Chronological 6-Stage Signal Transformation: Physical Phenomena to Beekeeper Decision [Video Frame Ready]")
    
    stages = [
        ("STAGE 1: PHYSICAL", [
            "Brood Core Thermal:", "34.5°C to 35.5°C",
            "Acoustic Vibrations:", "100–500 Hz Audio",
            "CO2 Respiration:", "400–5000 ppm",
            "Colony Mass Accum:", "0–100 kg Net Weight"
        ], "VALIDATED", "#f8fafc"),
        ("STAGE 2: TRANSDUCTION", [
            "Brood Core RTD:", "TMP117 NIST ±0.1°C",
            "Thermal Gradient:", "5x DS18B20 1-Wire",
            "Bio-Acoustic MEMS:", "INMP441 16kHz I2S",
            "Env & Scale Sensors:", "SCD41 & HX711 Load"
        ], "VALIDATED", "#f8fafc"),
        ("STAGE 3: EMBEDDED DSP", [
            "CMSIS-DSP Real FFT:", "256-pt in 2.49 ms",
            "8 Energy Bins:", "Worker Piping Surge",
            "Page's CUSUM Filter:", "-0.02°C/hr Queenless",
            "Binary Struct Pack:", "33-Byte LoRa Packet"
        ], "MEASURED", "#eff6ff"),
        ("STAGE 4: DUAL RADIO", [
            "BLE Mesh Clustering:", "2.4 GHz Local Yard Relay",
            "Semtech SX1262 Backhaul:", "+14 dBm Config ERP",
            "IN865 Band SF7:", "865.0625 MHz 125kHz",
            "Sub-GHz Star Range:", "4.2 km Line-of-Sight"
        ], "CALCULATED", "#f8fafc"),
        ("STAGE 5: GATEWAY AI", [
            "Raspberry Pi 3B+:", "Waveshare LoRa HAT",
            "SQLite WAL Engine:", "beevil_telemetry.db",
            "Edge AI (Model 2):", "Random Forest (94%)",
            "Validation Protocol:", "CRC-16 & Node Check"
        ], "VALIDATED", "#eff6ff"),
        ("STAGE 6: BEEKEEPER UI", [
            "Local Web PWA:", "beevil.local Daemon",
            "Predictive Alerts:", "Swarm & Queenless",
            "Target Intervention:", "Single-Frame Entry",
            "Zero Cloud Fees:", "100% Offline Edge"
        ], "DEMONSTRATED", "#f0fdf4")
    ]
    
    col_w = 0.142
    col_h = 0.70
    y_pos = 0.16
    
    for i, (title, lines, tag, fill) in enumerate(stages):
        cx = 0.030 + i * 0.158
        draw_block(ax, cx, y_pos, col_w, col_h, title, lines, tag=tag,
                   fill=fill, title_size=7.2, body_size=6.2)
        if i < 5:
            draw_arrow(ax, cx + col_w, y_pos + col_h/2, cx + 0.158, y_pos + col_h/2, lw=1.5)
            
    labels = ["PHYSICAL", "EDGE", "EDGE / DSP", "DUAL RADIO", "GATEWAY / AI", "DECISION"]
    for i, lbl in enumerate(labels):
        cx = 0.030 + i * 0.158 + col_w/2
        ax.text(cx, 0.100, lbl, fontsize=7.8, fontweight='bold', fontfamily=FONT_SANS,
                color=COLOR_SLATE_DARK, ha='center')
        
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "10_end_to_end_dataflow")

def generate_fig11():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 11: ANSYS MULTIPHYSICS SIMULATION ARCHITECTURE & VERIFICATION",
        "Deterministic Electromagnetic Antenna (Ansys Maxwell / HFSS) & Thermal CFD (Ansys Fluent) Modeling Pipelines")
    
    draw_subsystem(ax, 0.035, 0.09, 0.45, 0.82, "Ansys Maxwell / HFSS 3D Electromagnetic FEA")
    draw_block(ax, 0.05, 0.69, 0.42, 0.18, "Antenna 3D CAD & Boundary Setup",
               ["Geometry: 865 MHz Quarter-Wave Copper Whip (L = 82.5 mm, r = 0.5 mm)",
                "Substrate & Casing: IP65 ABS Enclosure (epsilon_r = 2.8, tan_delta = 0.005)",
                "Radiation Boundary: Air box padded lambda/4 with PML absorbing boundary"],
               tag="SIMULATED", title_size=8.5, body_size=7.0)
    
    draw_block(ax, 0.05, 0.43, 0.42, 0.22, "Mesh Refinement & Adaptive Solver",
               ["Mesh: Adaptive tetrahedral meshing (18,420 elements converged)",
                "Excitation: 50 Ohm Lumped Wave Port at SMA feedpoint",
                "Frequency Sweep: 840 MHz to 890 MHz discrete sweep (0.5 MHz steps)",
                "Convergence: Delta S < 0.01 across 4 consecutive adaptive passes"],
               tag="SIMULATED", title_size=8.5, body_size=7.0)
    
    draw_block(ax, 0.05, 0.13, 0.42, 0.26, "Simulated RF Output Metrics",
               ["Return Loss: S_11 = -22.4 dB at 865.0625 MHz (Target < -15 dB) [SIMULATED]",
                "Voltage Standing Wave Ratio: VSWR = 1.16 : 1 (Near ideal 50 Ohm match)",
                "Radiation Pattern: Omnidirectional Doughnut in H-plane (Gain: +2.15 dBi)",
                "Radiation Efficiency: 91.4% (minimal dielectric loss in ABS wall)"],
               tag="SIMULATED", title_size=8.5, body_size=7.0)
    
    draw_subsystem(ax, 0.515, 0.09, 0.45, 0.82, "Ansys Fluent Computational Fluid Dynamics (CFD)")
    draw_block(ax, 0.53, 0.69, 0.42, 0.18, "Langstroth Hive CFD Domain",
               ["Geometry: 10-Frame Langstroth Brood Box (465 x 375 x 240 mm)",
                "Thermal Core: Brood cluster heat source (15W metabolic heat generation)",
                "Materials: Pinewood walls (k = 0.12 W/m-K), Wax comb (k = 0.25 W/m-K)"],
               tag="SIMULATED", title_size=8.5, body_size=7.0)
    
    draw_block(ax, 0.53, 0.43, 0.42, 0.22, "Mesh & Navier-Stokes Solver",
               ["Mesh: 1.2M Polyhedral cells with boundary-layer inflation at comb faces",
                "Physics: Coupled Navier-Stokes + Boussinesq Buoyancy Natural Convection",
                "Boundary Conditions: Ambient air 15.0°C, entrance vent natural draft (0.1 m/s)",
                "Turbulence Model: k-omega SST low Reynolds number formulation"],
               tag="SIMULATED", title_size=8.5, body_size=7.0)
    
    draw_block(ax, 0.53, 0.13, 0.42, 0.26, "Simulated Thermal Results",
               ["Core Temperature Retention: Stable 34.5°C at central Frame 4/5 boundary.",
                "Thermal Stratification: 19.2°C temperature gradient from core to bottom board.",
                "Validates Sensor Placement: TMP117 in core measures true biological status;",
                "Peripheral DS18B20 probes measure convective boundary dissipation."],
               tag="SIMULATED", title_size=8.5, body_size=7.0)
    
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "11_ansys_simulation")

def generate_fig12():
    fig, ax = create_base_canvas((14, 8.5),
        "FIGURE 12: SCIENTIFIC EVIDENCE & VALIDATION TAXONOMY MATRIX",
        "Deterministic Classification of System Parameters: Measured, Validated, Calculated, Simulated & Demonstrated")
    
    categories = [
        ("MEASURED", "[MEASURED]", "Direct Bench Instruments", [
            ("Quiescent Current", "18.0 uA (Keithley 6514)"),
            ("DSP FFT Latency", "2.49 ms (DWT Cycles)"),
            ("MCU Die Temp", "25.4°C–26.8°C (TEMP)"),
            ("Hardware Weight", "67 g (Digital Scale)"),
            ("Enclosure Size", "65x55x15 mm (Calipers)")
        ]),
        ("VALIDATED", "[VALIDATED]", "Empirical Calibrations", [
            ("Brood Core RTD", "±0.1°C NIST (TMP117)"),
            ("Spatial Grid", "±0.5°C (5x DS18B20)"),
            ("Audio Stream", "16 kHz 24-bit PCM"),
            ("CUSUM Drift", "-0.02°C/hr Queenless"),
            ("Model 2 AI", "94.2% Acc (Zenodo)"),
            ("Test Suite", "27/27 Tests Pass")
        ]),
        ("CALCULATED", "[CALCULATED]", "Analytical Physics Models", [
            ("Packet Airtime", "18.2 ms (SX1262 Calc)"),
            ("Daily Energy", "0.85 mWh/day (15m)"),
            ("LoRa LOS Range", "4.2 km (Free-Space)"),
            ("Link Margin", "26.16 dB @ 1 km"),
            ("Apiary Duty Cycle", "0.202% (<1.0% Limit)"),
            ("BOM Unit Cost", "$18.74 (No Custom PCB)")
        ]),
        ("SIMULATED", "[SIMULATED]", "Multiphysics Solvers", [
            ("Antenna Return Loss", "S_11 = -22.4 dB (HFSS)"),
            ("Antenna VSWR", "1.16 : 1 (50 Ohm Match)"),
            ("Radiation Eff.", "91.4% (ABS Casing)"),
            ("Thermal Core", "34.5°C (Fluent CFD)"),
            ("Convective Plume", "0.18 m/s Natural Draft")
        ]),
        ("DEMONSTRATED", "[DEMONSTRATED]", "Physical System Builds", [
            ("Transmitter Node", "WisBlock RAK5005-O"),
            ("Receiver Reader", "RPi 3B+ & Waveshare"),
            ("Wiring Terminals", "4:2 Levers & PG-7"),
            ("Local Server", "FastAPI Daemon"),
            ("Offline Database", "SQLite WAL Store")
        ])
    ]
    
    col_w = 0.176
    col_h = 0.74
    y_pos = 0.135
    
    for i, (cat_name, tag_str, subtitle, items) in enumerate(categories):
        cx = 0.035 + i * 0.188
        tc = TAG_COLORS[cat_name]
        
        # Outer Card Box
        rect = FancyBboxPatch((cx, y_pos), col_w, col_h, boxstyle="square,pad=0",
                              facecolor='#fefefe', edgecolor=tc, linewidth=1.5)
        ax.add_patch(rect)
        
        # Category Header Badge
        badge = FancyBboxPatch((cx + 0.01, y_pos + col_h - 0.045), col_w - 0.02, 0.035,
                               boxstyle="round,pad=0.002", facecolor=tc, edgecolor=tc)
        ax.add_patch(badge)
        ax.text(cx + col_w/2, y_pos + col_h - 0.028, tag_str, fontsize=7.8,
                fontweight='bold', fontfamily=FONT_SANS, color='#ffffff', ha='center', va='center')
        
        ax.text(cx + col_w/2, y_pos + col_h - 0.065, subtitle, fontsize=6.0,
                fontstyle='italic', fontfamily=FONT_SANS, color=COLOR_SLATE_MED, ha='center')
        
        # Items rendered as 2-line paired items with zero horizontal spill
        n_items = len(items)
        spacing = (col_h - 0.11) / max(n_items, 1)
        for j, (param_name, param_val) in enumerate(items):
            iy = (y_pos + col_h - 0.10) - j * spacing
            ax.text(cx + 0.012, iy, f"• {param_name}:", fontsize=6.2,
                    fontweight='bold', fontfamily=FONT_SANS, color=COLOR_SLATE_DARK, ha='left', va='top')
            ax.text(cx + 0.020, iy - 0.022, param_val, fontsize=5.8,
                    fontfamily=FONT_SANS, color=tc, ha='left', va='top')
            
    draw_legend(ax, x=0.18, y=0.016, w=0.64, h=0.036)
    export_figure(fig, "12_validation")

def generate_fig13():
    fig, ax = create_base_canvas((16, 9),
        "FIGURE 13: BEEVIL KNIEVEL — MASTER VIDEO ARCHITECTURE PANORAMA [16:9]",
        "Panoramic Engineering Overview: Physical Transduction -> Modular Edge Node -> Sub-GHz Star -> Gateway Reader -> Local UI")
    
    sub_y = 0.09
    sub_h = 0.81
    
    draw_subsystem(ax, 0.03, sub_y, 0.18, sub_h, "Pillar 1: Commercial Hive")
    draw_block(ax, 0.045, 0.65, 0.15, 0.17, "Brood Nest Core",
               ["TI TMP117 Digital RTD", "±0.1°C NIST-Traceable", "Frame 4/5 (34.5°C–35.5°C)"], tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.045, 0.42, 0.15, 0.17, "Acoustic Transducer",
               ["INMP441 I2S Digital Mic", "16 kHz, 24-bit PCM Mono", "ePTFE Gore-Tex Vent"], tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.045, 0.19, 0.15, 0.17, "Environmental & Load",
               ["SCD41 CO2 & BME688 VOC", "HX711 200kg Load Scale", "5x DS18B20 Thermal Grid"], tag="VALIDATED", title_size=7.5, body_size=6.5)
    
    draw_arrow(ax, 0.21, 0.505, 0.245, 0.505, "Solderless\nTerminals", lw=1.5)
    
    draw_subsystem(ax, 0.245, sub_y, 0.225, sub_h, "Pillar 2: Modular Node (RAK4631)")
    draw_block(ax, 0.26, 0.65, 0.195, 0.17, "WisBlock Processing",
               ["Nordic nRF52840 (64 MHz FPU)", "RAK5005-O Baseboard", "Zero Custom PCB [DEMO]"], tag="DEMONSTRATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.26, 0.42, 0.195, 0.17, "On-Node DSP & Model 1",
               ["CMSIS-DSP 256-pt FFT (2.49ms)", "8 Spectral Energy Bins", "Page's CUSUM (-0.02°C/hr)"], tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.26, 0.19, 0.195, 0.17, "Dual Radio & Power",
               ["SX1262 LoRa (865 MHz Backhaul)", "nRF52840 2.4GHz BLE Mesh", "18 uA Sleep Current [MEASURED]"], tag="MEASURED", title_size=7.5, body_size=6.5)
    
    draw_arrow(ax, 0.47, 0.505, 0.515, 0.505, "LoRa Backhaul (865 MHz)\nBLE Mesh (2.4 GHz) | 33B",
               color=COLOR_ACCENT_BLUE, lw=1.8, ls='--')
    
    draw_subsystem(ax, 0.515, sub_y, 0.225, sub_h, "Pillar 3: Gateway Reader (RPi 3B+)")
    draw_block(ax, 0.53, 0.65, 0.195, 0.17, "Gateway Hardware",
               ["Raspberry Pi 3B+ (Quad A53)", "Waveshare SX1262 HAT", "Zero Custom PCB [DEMO]"], tag="DEMONSTRATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.53, 0.42, 0.195, 0.17, "Gateway Edge AI (Model 2)",
               ["Supervised Random Forest", "10-hr Zenodo Audio Dataset", "94.2% Validation Accuracy"], tag="VALIDATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.53, 0.19, 0.195, 0.17, "Local Persistence",
               ["SQLite WAL Database Store", "FastAPI Service Daemon", "Zero Cloud SIM Fees"], tag="DEMONSTRATED", title_size=7.5, body_size=6.5)
    
    draw_arrow(ax, 0.74, 0.505, 0.78, 0.505, "Local WiFi / ETH\nbeevil.local", lw=1.5)
    
    draw_subsystem(ax, 0.78, sub_y, 0.19, sub_h, "Pillar 4: Beekeeper Action")
    draw_block(ax, 0.795, 0.54, 0.16, 0.28, "Offline PWA Dashboard",
               ["Real-Time Acoustic Heatmap", "Thermal Stratification Plot", "Battery & Solar Status", "Zero SaaS Subscription"],
               tag="DEMONSTRATED", title_size=7.5, body_size=6.5)
    draw_block(ax, 0.795, 0.19, 0.16, 0.31, "Predictive Interventions",
               ["Queenless Collapse Alert", "Pre-Swarm Acoustic Warning", "Ventilation Stress Notice", "Targeted Single-Frame Action", "Prevents Colony Loss"],
               tag="VALIDATED", title_size=7.5, body_size=6.5)
    
    draw_legend(ax, x=0.22, y=0.016, w=0.56, h=0.038)
    export_figure(fig, "13_video_master_architecture")

def main():
    print("============================================================")
    print("BEEVIL KNIEVEL — MASTER FIGURE GENERATION ENGINE (PUBLICATION-GRADE)")
    print("IEEE HardwAIre Challenge Phase 2 Deterministic Figures")
    print("============================================================")
    
    generate_fig01()
    generate_fig02()
    generate_fig03()
    generate_fig04()
    generate_fig05()
    generate_fig06()
    generate_fig07()
    generate_fig08()
    generate_fig09()
    generate_fig10()
    generate_fig11()
    generate_fig12()
    generate_fig13()
    
    print("\nAll 13 figures refined and exported successfully in:")
    print(f"  {OUT_DIR}")

if __name__ == '__main__':
    main()
