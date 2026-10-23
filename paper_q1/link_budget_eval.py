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
    tx_antenna_gain_dbi = 2.0   # 1/4-wave whip
    rx_antenna_gain_dbi = 2.5   # Gateway omni dipole
    fade_margin_db = 10.0

    # Semtech SX1262 sensitivity specifications (BW = 125 kHz, CR = 4/5)
    sf7_sens_dbm = -124.0
    sf10_sens_dbm = -132.0

    # Maximum Allowable Path Loss (MAPL)
    sf7_mapl_db = tx_power_dbm + tx_antenna_gain_dbi + rx_antenna_gain_dbi - sf7_sens_dbm - fade_margin_db
    sf10_mapl_db = tx_power_dbm + tx_antenna_gain_dbi + rx_antenna_gain_dbi - sf10_sens_dbm - fade_margin_db

    # 1. Free Space Path Loss (Friis)
    # PL_FS(d) = 20*log10(d) + 20*log10(f_MHz) - 27.55
    def friis_range_m(mapl: float) -> float:
        val = (mapl - 20.0 * math.log10(freq_mhz) + 27.55) / 20.0
        return 10.0 ** val

    # 2. Two-Ray Ground Reflection Model
    # Node height h_tx = 0.5 m, Gateway height h_rx = 4.0 m
    # PL_2ray(d) = 40*log10(d) - 20*log10(h_tx) - 20*log10(h_rx)
    h_tx = 0.5
    h_rx = 4.0
    two_ray_const_db = -20.0 * math.log10(h_tx) - 20.0 * math.log10(h_rx)  # -6.02 dB

    def two_ray_range_m(mapl: float) -> float:
        val = (mapl - two_ray_const_db) / 40.0
        return 10.0 ** val

    # 3. Two-Ray + Canopy Foliage Loss (ITU-R P.833 / Weissberger model)
    # L_veg(d) = 1.33 * f_GHz^0.284 * d_m^0.588, saturating at 28 dB
    f_ghz = freq_mhz / 1000.0
    foliage_coeff = 1.33 * (f_ghz ** 0.284)  # ~1.275 dB/m^0.588

    def canopy_loss_db(d_m: float) -> float:
        if d_m <= 10.0:
            return 0.0
        veg = foliage_coeff * ((d_m * 0.5) ** 0.588)  # 50% canopy path coverage
        return min(28.0, veg)

    def canopy_range_m(mapl: float) -> float:
        # Bisection search to find exact distance where PL_2ray(d) + L_veg(d) == mapl
        low, high = 10.0, 5000.0
        for _ in range(50):
            mid = (low + high) / 2.0
            pl_2ray = 40.0 * math.log10(mid) + two_ray_const_db
            tot_pl = pl_2ray + canopy_loss_db(mid)
            if tot_pl < mapl:
                low = mid
            else:
                high = mid
        return (low + high) / 2.0

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

    # Airtime for 36-byte Frame v2 (Semtech SX1262 AN1200.13 calculation)
    # SF7, BW 125 kHz, CR 4/5, Preamble 8 -> 77.06 ms
    # SF10, BW 125 kHz, CR 4/5, Preamble 8 -> 411.65 ms
    airtime_sf7_ms = float(spec["radio"]["airtime_v2_36b_ms"])
    airtime_sf10_ms = 411.65

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
            "rx_antenna_gain_dbi": rx_antenna_gain_dbi,
            "node_antenna_height_m": h_tx,
            "gateway_antenna_height_m": h_rx,
            "fade_margin_db": fade_margin_db
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
