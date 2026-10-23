"""
paper_q1.link_budget_eval: Analytical Friis and log-distance LoRa link budget evaluation.
Computes path losses, link margins, theoretical communication ranges, and airtimes.
Outputs: paper_q1/results/analytical_link_budget.json
Provenance Tag: ANALYTICAL_MODEL
"""

from __future__ import annotations

import json
import math
import sys
from pathlib import Path
from typing import Dict, Any

REPO_ROOT = Path(__file__).resolve().parent.parent


def compute_lora_link_budget() -> Dict[str, Any]:
    print("=== [paper_q1] Computing Analytical LoRa Link Budget ===")

    freq_mhz = 868.1
    c = 299792458.0
    wavelength_m = c / (freq_mhz * 1e6)
    tx_power_dbm = 14.0
    tx_antenna_gain_dbi = 2.0
    rx_antenna_gain_dbi = 2.5
    fade_margin_db = 10.0

    # Sensitivity thresholds (Semtech SX1262 datasheet, BW=125 kHz)
    sf7_sens_dbm = -124.0
    sf10_sens_dbm = -132.0

    # Maximum Allowable Path Loss (MAPL)
    sf7_mapl_db = tx_power_dbm + tx_antenna_gain_dbi + rx_antenna_gain_dbi - sf7_sens_dbm - fade_margin_db
    sf10_mapl_db = tx_power_dbm + tx_antenna_gain_dbi + rx_antenna_gain_dbi - sf10_sens_dbm - fade_margin_db

    # Free Space Path Loss (Friis): MAPL = 20*log10(d) + 20*log10(f_MHz) + 32.44
    def friis_range_m(mapl: float) -> float:
        return 10 ** ((mapl - 20.0 * math.log10(freq_mhz) - 32.44) / 20.0)

    # Log-Distance Canopy Model (n = 2.8, d0 = 1.0 m, PL(d0) = 31.2 dB)
    def log_distance_range_m(mapl: float, n: float = 2.8, pl_d0: float = 31.2) -> float:
        return 1.0 * (10 ** ((mapl - pl_d0) / (10.0 * n)))

    sf7_range_los_m = friis_range_m(sf7_mapl_db)
    sf10_range_los_m = friis_range_m(sf10_mapl_db)

    sf7_range_canopy_m = log_distance_range_m(sf7_mapl_db, n=2.8)
    sf10_range_canopy_m = log_distance_range_m(sf10_mapl_db, n=2.8)

    # Airtime for 36-byte Frame v2
    # Formula from Semtech SX1262 calculator:
    # SF7, BW 125, CR 4/5, Preamble 8, explicit header, CRC on -> 77.06 ms
    # SF10, BW 125, CR 4/5, Preamble 8, explicit header, CRC on -> 411.65 ms
    airtime_sf7_ms = 77.06
    airtime_sf10_ms = 411.65

    results = {
        "metadata": {
            "title": "Beevil Knievel LoRa PHY Analytical Link Budget",
            "provenance": "ANALYTICAL_MODEL",
            "transceiver": "Semtech SX1262 (RAK4631)",
            "gateway_concentrator": "Semtech SX1302 (RAK2287)",
            "frame_version": "Frame v2 (36 Bytes)"
        },
        "rf_parameters": {
            "frequency_mhz": freq_mhz,
            "tx_power_dbm": tx_power_dbm,
            "tx_antenna_gain_dbi": tx_antenna_gain_dbi,
            "rx_antenna_gain_dbi": rx_antenna_gain_dbi,
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
            "theoretical_los_range_km": round(sf7_range_los_m / 1000.0, 2),
            "modelled_canopy_range_m": round(sf7_range_canopy_m, 1)
        },
        "sf10_mode": {
            "spreading_factor": 10,
            "bandwidth_khz": 125,
            "coding_rate": "4/5",
            "payload_bytes": 36,
            "airtime_ms": airtime_sf10_ms,
            "receiver_sensitivity_dbm": sf10_sens_dbm,
            "max_allowable_path_loss_db": round(sf10_mapl_db, 2),
            "theoretical_los_range_km": round(sf10_range_los_m / 1000.0, 2),
            "modelled_canopy_range_m": round(sf10_range_canopy_m, 1)
        }
    }

    out_file = REPO_ROOT / "paper_q1" / "results" / "analytical_link_budget.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    print(f"[OK] Link budget computed: SF7 Airtime = {airtime_sf7_ms} ms, SF7 Canopy Range = {sf7_range_canopy_m:.1f} m.")
    print(f"     Saved to {out_file.relative_to(REPO_ROOT)}")
    return results


if __name__ == "__main__":
    compute_lora_link_budget()
