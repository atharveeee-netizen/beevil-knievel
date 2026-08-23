"""
===============================================================================
BEEVIL KNIEVEL — IEEE HART HARDWAIRE CHALLENGE
ANSYS Simulation Suite Visualization & Plot Generator
Generates High-Resolution Charts for IEEE HART Technical Dossier
===============================================================================
"""

import os
import json
import numpy as np
import matplotlib
matplotlib.use('Agg') # Headless rendering
import matplotlib.pyplot as plt

OUTPUT_DIR = "hardware/simulations/plots"
RESULTS_DIR = "hardware/simulations/results"

def plot_hfss_s_parameters():
    with open(f"{RESULTS_DIR}/hfss_simulation_results.json", "r") as f:
        data = json.load(f)

    sweep = data["s_parameter_sweep"]
    freqs = [p["frequency_mhz"] for p in sweep]
    s11 = [p["s11_db"] for p in sweep]
    vswr = [p["vswr"] for p in sweep]

    fig, ax1 = plt.subplots(figsize=(8, 5), dpi=300)

    color = '#2563EB'
    ax1.set_xlabel('Frequency (MHz)', fontsize=12, fontweight='bold')
    ax1.set_ylabel('Return Loss S11 (dB)', color=color, fontsize=12, fontweight='bold')
    line1 = ax1.plot(freqs, s11, color=color, linewidth=2.2, label='S11 (dB)')
    ax1.axhline(y=-18.0, color='#DC2626', linestyle='--', linewidth=1.5, label='Target Threshold (-18 dB)')
    ax1.axvline(x=865.0, color='#059669', linestyle=':', linewidth=1.5, label='IN865 Center (865 MHz)')
    ax1.tick_params(axis='y', labelcolor=color)
    ax1.grid(True, linestyle=':', alpha=0.6)
    ax1.set_ylim(-35, 0)

    ax2 = ax1.twinx()
    color = '#D97706'
    ax2.set_ylabel('VSWR', color=color, fontsize=12, fontweight='bold')
    line2 = ax2.plot(freqs, vswr, color=color, linewidth=1.8, linestyle='-.', label='VSWR')
    ax2.tick_params(axis='y', labelcolor=color)
    ax2.set_ylim(1.0, 3.5)

    plt.title('ANSYS HFSS: Beevil Knievel IN865/EU868 Antenna S11 & VSWR Sweep', fontsize=13, fontweight='bold', pad=12)
    fig.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/hfss_s11_vswr_sweep.png")
    plt.close()
    print("Generated: hfss_s11_vswr_sweep.png")

def plot_icepak_thermal_distribution():
    with open(f"{RESULTS_DIR}/icepak_simulation_results.json", "r") as f:
        data = json.load(f)

    comps = data["simulation_summary"]["components"]
    names = [c["name"].split('(')[0].strip() for c in comps.values()]
    temps = [c["junction_temp_c"] for c in comps.values()]
    powers = [c["dissipated_power_w"] for c in comps.values()]

    fig, ax = plt.subplots(figsize=(9, 5), dpi=300)
    x = np.arange(len(names))
    width = 0.45

    rects = ax.bar(x, temps, width, color='#EA580C', alpha=0.85, edgecolor='#9A3412', linewidth=1.5, label='Junction Temp (°C)')
    ax.axhline(y=70.0, color='#DC2626', linestyle='--', linewidth=2.0, label='Design Max Limit (70.0 °C)')
    ax.axhline(y=45.0, color='#0284C7', linestyle=':', linewidth=1.5, label='Ambient Air (45.0 °C)')

    ax.set_ylabel('Temperature (°C)', fontsize=12, fontweight='bold')
    ax.set_title('ANSYS Icepak: Gateway Silicon Junction Temperatures (45°C Amb + 1000 W/m² Solar)', fontsize=12, fontweight='bold', pad=12)
    ax.set_xticks(x)
    ax.set_xticklabels(names, rotation=15, ha='right', fontsize=10)
    ax.set_ylim(35, 80)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(loc='upper right')

    for rect in rects:
        height = rect.get_height()
        ax.annotate(f'{height:.1f}°C',
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 4), textcoords="offset points",
                    ha='center', va='bottom', fontweight='bold', fontsize=10)

    fig.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/icepak_thermal_junction_temps.png")
    plt.close()
    print("Generated: icepak_thermal_junction_temps.png")

def plot_mechanical_drop_shock():
    with open(f"{RESULTS_DIR}/mechanical_simulation_results.json", "r") as f:
        data = json.load(f)

    history = data["drop_shock_analysis"]["time_history_sample"]
    t_ms = [h["time_ms"] for h in history]
    decel_g = [h["deceleration_g"] for h in history]
    stress = [h["von_mises_stress_mpa"] for h in history]

    fig, ax1 = plt.subplots(figsize=(8, 5), dpi=300)

    color = '#DC2626'
    ax1.set_xlabel('Time (ms)', fontsize=12, fontweight='bold')
    ax1.set_ylabel('Deceleration (g)', color=color, fontsize=12, fontweight='bold')
    ax1.plot(t_ms, decel_g, color=color, linewidth=2.0, label='Deceleration (g)')
    ax1.tick_params(axis='y', labelcolor=color)
    ax1.grid(True, linestyle=':', alpha=0.6)

    ax2 = ax1.twinx()
    color = '#7C3AED'
    ax2.set_ylabel('Von Mises Stress (MPa)', color=color, fontsize=12, fontweight='bold')
    ax2.plot(t_ms, stress, color=color, linewidth=2.0, linestyle='--', label='Stress (MPa)')
    ax2.axhline(y=65.0, color='#991B1B', linestyle=':', linewidth=1.5, label='PC/ABS Yield Limit (65 MPa)')
    ax2.tick_params(axis='y', labelcolor=color)
    ax2.set_ylim(0, 80)

    plt.title('ANSYS Mechanical: 1.5-Meter Drop Shock Dynamic Transient FEA Response', fontsize=12, fontweight='bold', pad=12)
    fig.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/mechanical_drop_shock_transient.png")
    plt.close()
    print("Generated: mechanical_drop_shock_transient.png")

def plot_modal_decoupling():
    with open(f"{RESULTS_DIR}/mechanical_simulation_results.json", "r") as f:
        data = json.load(f)

    modes = data["modal_harmonic_analysis"]["modal_modes"]
    mode_nums = [f"Mode {m['mode_number']}" for m in modes]
    freqs = [m["natural_frequency_hz"] for m in modes]

    fig, ax = plt.subplots(figsize=(8, 5), dpi=300)
    
    # Highlight bee frequency band (100-500 Hz)
    ax.axhspan(100, 500, color='#FEF3C7', alpha=0.85, label='Bee Bio-Acoustic Band (100-500 Hz)')
    ax.axhline(y=600.0, color='#DC2626', linestyle='--', linewidth=1.8, label='Minimum Decoupling Floor (600 Hz)')

    bars = ax.bar(mode_nums, freqs, color='#059669', width=0.5, edgecolor='#065F46', linewidth=1.5, label='Structural Natural Frequencies')
    ax.set_ylabel('Frequency (Hz)', fontsize=12, fontweight='bold')
    ax.set_title('ANSYS Modal: Harmonic Resonance Decoupling from Bee Bio-Acoustics', fontsize=12, fontweight='bold', pad=12)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(loc='upper left')

    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height:.1f} Hz',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 4), textcoords="offset points",
                    ha='center', va='bottom', fontweight='bold', fontsize=9)

    fig.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/mechanical_modal_decoupling.png")
    plt.close()
    print("Generated: mechanical_modal_decoupling.png")

def plot_maxwell_shielding():
    with open(f"{RESULTS_DIR}/maxwell_simulation_results.json", "r") as f:
        data = json.load(f)

    tbl = data["shielding_effectiveness_table"]
    labels = [t["label"].split('(')[0].strip() for t in tbl]
    abs_loss = [t["absorption_loss_a_db"] for t in tbl]
    ref_loss = [t["reflection_loss_r_db"] for t in tbl]
    total_se = [t["total_shielding_effectiveness_db"] for t in tbl]

    fig, ax = plt.subplots(figsize=(9, 5), dpi=300)
    x = np.arange(len(labels))
    width = 0.25

    ax.bar(x - width, ref_loss, width, label='Reflection Loss R (dB)', color='#3B82F6')
    ax.bar(x, abs_loss, width, label='Absorption Loss A (dB)', color='#8B5CF6')
    ax.bar(x + width, total_se, width, label='Total SE (dB)', color='#10B981')

    ax.axhline(y=35.0, color='#DC2626', linestyle='--', linewidth=1.5, label='Target SE Limit (35 dB)')
    ax.set_ylabel('Shielding Effectiveness (dB)', fontsize=12, fontweight='bold')
    ax.set_title('ANSYS Maxwell: Nickel-Silver C770 RF Shielding Effectiveness (SE)', fontsize=12, fontweight='bold', pad=12)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, rotation=15, ha='right', fontsize=10)
    ax.grid(axis='y', linestyle=':', alpha=0.6)
    ax.legend(loc='upper left')

    fig.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/maxwell_shielding_effectiveness.png")
    plt.close()
    print("Generated: maxwell_shielding_effectiveness.png")

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    plot_hfss_s_parameters()
    plot_icepak_thermal_distribution()
    plot_mechanical_drop_shock()
    plot_modal_decoupling()
    plot_maxwell_shielding()
    print("All simulation visualization plots successfully exported to:", OUTPUT_DIR)
