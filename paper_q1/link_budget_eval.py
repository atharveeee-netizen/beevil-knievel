"""
paper_q1.link_budget_eval: Analytical LoRa PHY Link Budget Evaluation.
Computes path losses, link margins, and communication ranges under:
  1. Free-space line-of-sight (Friis)
  2. Two-ray ground reflection model (node 0.5 m, gateway 4.0 m)
  3. Two-ray with apiary orchard canopy attenuation (ITU-R P.833 / Weissberger)

Frequency: IN865 (865.0625 MHz) from spec/beevil_spec.yaml
Gateway: Waveshare SX1262 LoRa HAT (Ebyte E22-900T22S, UART)
Outputs: paper_q1/results/analytical_link_budget.json
Provenance Tag: ANALYTICAL_MODEL
"""

from __future__ import annotations

import json
import math
import sys
from pathlib import Path
from typing import Dict, Any
import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent


def compute_lora_link_budget() -> Dict[str, Any]:
    print("=== [paper_q1] Computing Analytical LoRa Link Budget (IN865) ===")

    spec_path = REPO_ROOT / "spec" / "beevil_spec.yaml"
    with open(spec_path, "r", encoding="utf-8") as f:
        spec = yaml.safe_load(f)

    freq_mhz = float(spec["radio"]["frequency_mhz"])  # 865.0625 MHz
    c = 299792458.0
    wavelength_m = c / (freq_mhz * 1e6)  # 0.3465 m
    tx_power_dbm = float(spec["radio"]["tx_power_dbm"])  # 14.0 dBm
    tx_antenna_gain_dbi = 2.15   # 1/4-wave dipole/whip inside hive
    tx_feeder_loss_db = 0.5      # PCB trace / connector loss
    hive_body_atten_db = 8.7     # Langstroth wooden hive body & comb attenuation
    rx_antenna_gain_dbi = 3.0    # Gateway mast omni antenna
    rx_feeder_loss_db = 1.0      # Gateway coaxial feeder cable
    fade_margin_db = 15.0        # Log-normal shadowing & Rayleigh fading margin

    # Semtech SX1262 sensitivity specifications (BW = 125 kHz, CR = 4/5)
    sf7_sens_dbm = -124.5
    sf10_sens_dbm = -132.0

    # Net link budget before propagation path loss:
    # P_rx_eff = P_tx + G_tx - L_tx - L_hive + G_rx - L_rx - FadeMargin
    budget_before_pl = tx_power_dbm + tx_antenna_gain_dbi - tx_feeder_loss_db - hive_body_atten_db + rx_antenna_gain_dbi - rx_feeder_loss_db

    # Maximum Allowable Path Loss (MAPL)
    sf7_mapl_db = budget_before_pl - sf7_sens_dbm - fade_margin_db
    sf10_mapl_db = budget_before_pl - sf10_sens_dbm - fade_margin_db

    # Breakpoint distance for 2-ray ground reflection
    h_tx = 0.5   # Node height on hive (m)
    h_rx = 4.0   # Gateway mast height (m)
    d_break_m = (4.0 * math.pi * h_tx * h_rx) / wavelength_m  # ~72.5 m
    two_ray_const_db = -20.0 * math.log10(h_tx) - 20.0 * math.log10(h_rx)  # -6.02 dB

    # 1. Free Space Path Loss (Friis)
    # PL_FS(d) = 20*log10(d) + 20*log10(f_MHz) - 27.55 (d in meters)
    def friis_range_m(mapl: float) -> float:
        val = (mapl - 20.0 * math.log10(freq_mhz) + 27.55) / 20.0
        return 10.0 ** val

    # 2. Two-Ray Ground Reflection Model (valid beyond breakpoint d_break)
    # PL_2ray(d) = 40*log10(d) - 20*log10(h_tx) - 20*log10(h_rx)
    def two_ray_range_m(mapl: float) -> float:
        val = (mapl - two_ray_const_db) / 40.0
        return 10.0 ** val

    # 3. Two-Ray + Canopy Foliage Loss (Weissberger / ITU-R P.833 model for 50 m orchard canopy)
    # L_fol = 1.33 * f_GHz^0.284 * d_f^0.588 dB (for d_f = 50 m -> 12.7 dB)
    f_ghz = freq_mhz / 1000.0
    foliage_50m_db = 1.33 * (f_ghz ** 0.284) * (50.0 ** 0.588)  # ~12.7 dB

    def canopy_range_m(mapl: float) -> float:
        val = (mapl - foliage_50m_db - two_ray_const_db) / 40.0
        return 10.0 ** val

    sf7_los_m = friis_range_m(sf7_mapl_db)
    sf10_los_m = friis_range_m(sf10_mapl_db)

    sf7_tworay_m = two_ray_range_m(sf7_mapl_db)
    sf10_tworay_m = two_ray_range_m(sf10_mapl_db)

    sf7_canopy_m = canopy_range_m(sf7_mapl_db)
    sf10_canopy_m = canopy_range_m(sf10_mapl_db)

    # Physical Consistency Assertions: canopy <= two_ray <= free_space
    assert sf7_canopy_m <= sf7_tworay_m <= sf7_los_m, (
        f"Physical violation in SF7 ranges: {sf7_canopy_m} <= {sf7_tworay_m} <= {sf7_los_m}"
    )
    assert sf10_canopy_m <= sf10_tworay_m <= sf10_los_m, (
        f"Physical violation in SF10 ranges: {sf10_canopy_m} <= {sf10_tworay_m} <= {sf10_los_m}"
    )

    # Exact LoRa Packet Airtime Calculation (Semtech SX1261/2 datasheet & AN1200.13)
    # T_sym = 2^SF / BW
    # T_preamble = (N_preamble + 4.25) * T_sym
    # Payload symbol count with explicit header (H=0), CRC enabled (CRC=1), CR=4/5 (CR=1)
    def compute_lora_airtime_ms(sf: int, bw_khz: float = 125.0, pl_bytes: int = 36,
                                cr: int = 1, preamble_sym: int = 8) -> float:
        t_sym_ms = (2.0 ** sf) / (bw_khz * 1.0)  # in ms
        t_preamble_ms = (preamble_sym + 4.25) * t_sym_ms
        # LowDataRateOptimize (DE) enabled when symbol duration exceeds 16 ms (SF11, SF12 at 125 kHz)
        de = 1 if t_sym_ms > 16.0 else 0
        num = 8 * pl_bytes - 4 * sf + 28 + 16 * 1  # 16*CRC=16
        den = 4 * (sf - 2 * de)
        n_payload = 8 + max(math.ceil(num / den) * (cr + 4), 0)
        t_payload_ms = n_payload * t_sym_ms
        return round(t_preamble_ms + t_payload_ms, 2)

    airtime_sf7_ms = compute_lora_airtime_ms(7, 125.0, 36)    # 77.06 ms
    airtime_sf10_ms = compute_lora_airtime_ms(10, 125.0, 36)  # 493.57 ms (exact Semtech standard formula)

    results = {
        "metadata": {
            "title": "Beevil Knievel LoRa PHY Analytical Link Budget",
            "provenance": "ANALYTICAL_MODEL",
            "node_transceiver": "Semtech SX1262 (RAK4631)",
            "gateway_radio_hat": "Waveshare SX1262 LoRa HAT (Ebyte E22-900T22S, UART)",
            "gateway_host": "Raspberry Pi 3B+",
            "regulatory_band": "IN865 (India 865-867 MHz)",
            "frame_version": "Frame v2 (36 Bytes)"
        },
        "rf_parameters": {
            "frequency_mhz": freq_mhz,
            "tx_power_dbm": tx_power_dbm,
            "tx_antenna_gain_dbi": tx_antenna_gain_dbi,
            "tx_feeder_loss_db": tx_feeder_loss_db,
            "hive_body_atten_db": hive_body_atten_db,
            "rx_antenna_gain_dbi": rx_antenna_gain_dbi,
            "rx_feeder_loss_db": rx_feeder_loss_db,
            "node_antenna_height_m": h_tx,
            "gateway_antenna_height_m": h_rx,
            "fade_margin_db": fade_margin_db,
            "foliage_atten_50m_canopy_db": round(foliage_50m_db, 2),
            "sources": {
                "tx_power": "Semtech SX1262 datasheet / E22-900T22S (14 dBm compliant with India WPC GSR 564(E) 865-867 MHz)",
                "tx_antenna": "Internal quarter-wave wire whip inside Langstroth wooden frame (2.15 dBi)",
                "tx_feeder_loss": "PCB microstrip feed to IPEX connector (0.5 dB)",
                "hive_attenuation": "Langstroth pine/cedar supers with wax combs (8.7 dB empirically referenced)",
                "rx_antenna": "Mast-mounted collinear omnidirectional dipole (3.0 dBi)",
                "rx_feeder_loss": "RG-58 gateway pigtail cable loss (1.0 dB)",
                "fade_margin": "15 dB log-normal shadowing and Rayleigh multi-path margin",
                "two_ray_model": "Two-ray ground reflection beyond dc = 72.5 m (ht=0.5 m, hr=4.0 m)",
                "foliage_model": "ITU-R P.833 / Weissberger orchard canopy attenuation (50 m foliage path)"
            }
        },
        "sf7_mode": {
            "spreading_factor": 7,
            "bandwidth_khz": 125,
            "coding_rate": "4/5",
            "payload_bytes": 36,
            "airtime_ms": airtime_sf7_ms,
            "receiver_sensitivity_dbm": sf7_sens_dbm,
            "max_allowable_path_loss_db": round(sf7_mapl_db, 2),
            "free_space_range_km": round(sf7_los_m / 1000.0, 2),
            "two_ray_ground_range_km": round(sf7_tworay_m / 1000.0, 2),
            "orchard_canopy_range_km": round(sf7_canopy_m / 1000.0, 2),
            "orchard_canopy_range_m": round(sf7_canopy_m, 1)
        },
        "sf10_mode": {
            "spreading_factor": 10,
            "bandwidth_khz": 125,
            "coding_rate": "4/5",
            "payload_bytes": 36,
            "airtime_ms": airtime_sf10_ms,
            "receiver_sensitivity_dbm": sf10_sens_dbm,
            "max_allowable_path_loss_db": round(sf10_mapl_db, 2),
            "free_space_range_km": round(sf10_los_m / 1000.0, 2),
            "two_ray_ground_range_km": round(sf10_tworay_m / 1000.0, 2),
            "orchard_canopy_range_km": round(sf10_canopy_m / 1000.0, 2),
            "orchard_canopy_range_m": round(sf10_canopy_m, 1)
        }
    }

    out_file = REPO_ROOT / "paper_q1" / "results" / "analytical_link_budget.json"
    out_file.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"  [OK] SF7 Orchard Canopy Range: {sf7_canopy_m:.1f} m ({sf7_canopy_m/1000.0:.2f} km)")
    print(f"  [OK] SF10 Orchard Canopy Range: {sf10_canopy_m:.1f} m ({sf10_canopy_m/1000.0:.2f} km)")
    print(f"  [OK] Results written -> {out_file.relative_to(REPO_ROOT)}")
    return results


if __name__ == "__main__":
    compute_lora_link_budget()
