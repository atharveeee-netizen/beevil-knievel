"""
MSPB Acoustic & Environmental Feature Extraction Engine.
Extracts 7-day pre-inspection telemetry windows strictly before each inspection date.
Maps MSPB FFT bins into Beevil Knievel's 8 canonical biological acoustic bands:
  1. dB to linear power conversion (P = 10^(dB/10))
  2. Integration across biological band boundaries from spec/beevil_spec.yaml
  3. Conversion to logarithmic band power (10 * log10(P + eps))
  4. Mean-subtraction across bands to ensure gain invariance
  5. Summary statistics (mean, std) across the 7-day pre-inspection window
  6. Environmental aggregation (temperature and humidity mean, min, max, std)
"""

from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple
import pandas as pd
import numpy as np
import yaml

from paper_q1.data_tools.mspb_phenotypes import (
    parse_tag_to_hive_mapping,
    parse_colony_strength_evaluations
)


def build_canonical_band_mapping(spec_path: Path) -> List[Tuple[float, float, str]]:
    with open(spec_path, "r", encoding="utf-8") as f:
        spec = yaml.safe_load(f)
    bands = spec["dsp"]["bands"]
    return [(b["f_min_hz"], b["f_max_hz"], b["label"]) for b in bands]


def extract_mspb_7day_features(
    data_dir: Path,
    spec_path: Path,
    output_path: Optional[Path] = None
) -> pd.DataFrame:
    raw_mspb = data_dir / "raw" / "mspb"
    df_evals = parse_colony_strength_evaluations(raw_mspb)
    if df_evals.empty:
        raise RuntimeError("No colony strength evaluations found in D1_ant.xlsx.")

    d1_sensor_csv = raw_mspb / "D1_sensor_data.csv"
    if not d1_sensor_csv.exists():
        raise FileNotFoundError(f"Missing {d1_sensor_csv}")

    # Load sensor data with required columns
    cols_to_load = [
        "published_at", "temperature", "humidity", "tag_number", "date", "time",
        "hz_122.0703125", "hz_152.587890625", "hz_183.10546875",
        "hz_213.623046875", "hz_244.140625", "hz_274.658203125",
        "hz_305.17578125", "hz_335.693359375", "hz_366.2109375",
        "hz_396.728515625", "hz_427.24609375", "hz_457.763671875",
        "hz_488.28125", "hz_518.798828125", "hz_549.31640625",
        "hz_579.833984375"
    ]
    
    print("[MSPBBandExtractor] Loading D1 sensor telemetry...")
    df_sensor = pd.read_csv(d1_sensor_csv, usecols=cols_to_load)
    df_sensor["dt"] = pd.to_datetime(df_sensor["date"] + " " + df_sensor["time"], errors="coerce")
    df_sensor["tag_number"] = pd.to_numeric(df_sensor["tag_number"], errors="coerce")
    df_sensor = df_sensor.dropna(subset=["dt", "tag_number"]).sort_values("dt")

    hz_cols = [c for c in cols_to_load if c.startswith("hz_")]
    hz_freqs = [float(c.replace("hz_", "")) for c in hz_cols]

    # Canonical 8 bands
    # Band 0: 30-100 Hz
    # Band 1: 100-180 Hz
    # Band 2: 180-280 Hz
    # Band 3: 280-380 Hz
    # Band 4: 380-500 Hz
    # Band 5: 500-750 Hz
    # Band 6: 750-1200 Hz
    # Band 7: 1200-2000 Hz
    band_edges = [
        (30, 100), (100, 180), (180, 280), (280, 380),
        (380, 500), (500, 750), (750, 1200), (1200, 2000)
    ]

    # Map each MSPB frequency bin to which canonical band it belongs
    bin_to_band = {}
    for idx, f in enumerate(hz_freqs):
        assigned = None
        for b_idx, (f_low, f_high) in enumerate(band_edges):
            if f_low <= f < f_high:
                assigned = b_idx
                break
        bin_to_band[idx] = assigned

    print(f"[MSPBBandExtractor] Grouping {len(df_sensor)} sensor telemetry records across {len(df_evals)} inspections...")

    # Group telemetry by tag for fast lookup
    telemetry_by_tag = {tag: grp for tag, grp in df_sensor.groupby("tag_number")}

    feature_rows = []
    skipped_inspections = 0

    for _, insp in df_evals.iterrows():
        hive_id = insp["hive_id"]
        tag_num = insp["sensor_tag"]
        insp_dt = pd.to_datetime(insp["inspection_date"])
        start_dt = insp_dt - pd.Timedelta(days=7)

        # Retrieve telemetry for this tag
        tag_data = telemetry_by_tag.get(tag_num, None)
        if tag_data is None:
            # Fallback to nectar_id
            tag_data = telemetry_by_tag.get(insp["nectar_id"], None)

        if tag_data is None:
            skipped_inspections += 1
            continue

        # Strictly slice pre-inspection window [insp_dt - 7d, insp_dt)
        mask = (tag_data["dt"] >= start_dt) & (tag_data["dt"] < insp_dt)
        window = tag_data[mask]

        if len(window) < 10:  # Require at least 10 valid telemetry samples in the 7 days
            skipped_inspections += 1
            continue

        # 1. Thermal & Humidity environmental metrics
        temp_vals = pd.to_numeric(window["temperature"], errors="coerce").dropna()
        hum_vals = pd.to_numeric(window["humidity"], errors="coerce").dropna()

        temp_mean = float(temp_vals.mean()) if len(temp_vals) > 0 else 34.0
        temp_std = float(temp_vals.std()) if len(temp_vals) > 1 else 0.0
        temp_min = float(temp_vals.min()) if len(temp_vals) > 0 else 30.0
        temp_max = float(temp_vals.max()) if len(temp_vals) > 0 else 36.0

        hum_mean = float(hum_vals.mean()) if len(hum_vals) > 0 else 55.0
        hum_std = float(hum_vals.std()) if len(hum_vals) > 1 else 0.0

        # 2. Acoustic band integration
        # Convert dB values to linear power: P = 10^(dB / 10)
        raw_db_matrix = window[hz_cols].apply(pd.to_numeric, errors="coerce").fillna(-30.0).values
        linear_power_matrix = 10.0 ** (raw_db_matrix / 10.0)

        # Sum linear power across bins for each of the 8 canonical bands
        band_powers = np.zeros((len(window), 8), dtype=np.float64)
        for bin_idx, b_idx in bin_to_band.items():
            if b_idx is not None:
                band_powers[:, b_idx] += linear_power_matrix[:, bin_idx]

        # Handle bands outside the MSPB microphone range with small baseline floor
        eps = 1e-7
        band_powers[:, 0] = np.maximum(band_powers[:, 0], eps)
        band_powers[:, 6] = np.maximum(band_powers[:, 6], eps)
        band_powers[:, 7] = np.maximum(band_powers[:, 7], eps)

        # Convert back to dB: 10 * log10(P)
        band_db = 10.0 * np.log10(band_powers + eps)

        # Relative energy: subtract mean across bands to achieve gain invariance
        band_rel = band_db - np.mean(band_db, axis=1, keepdims=True)

        # Window aggregates (mean and std of 8 relative bands)
        f0_means = np.mean(band_rel, axis=0)
        f0_stds = np.std(band_rel, axis=0)

        row = {
            "evaluation_round": insp["evaluation_round"],
            "hive_id": int(hive_id),
            "sensor_tag": int(tag_num),
            "inspection_date": insp["inspection_date"],
            "window_samples": len(window),
            "total_frames": float(insp["total_frames"]),
            "is_strong": int(insp["is_strong"]),
            "temp_mean": temp_mean,
            "temp_std": temp_std,
            "temp_min": temp_min,
            "temp_max": temp_max,
            "hum_mean": hum_mean,
            "hum_std": hum_std,
        }
        for b in range(8):
            row[f"f0_band_{b}_mean"] = float(f0_means[b])
            row[f"f0_band_{b}_std"] = float(f0_stds[b])

        feature_rows.append(row)

    df_out = pd.DataFrame(feature_rows)
    print(f"[MSPBBandExtractor] Extracted {len(df_out)} valid inspection feature records (skipped {skipped_inspections}).")
    print(f"[MSPBBandExtractor] Target distribution (is_strong): {df_out['is_strong'].value_counts().to_dict()}")
    print(f"[MSPBBandExtractor] Unique physical hives represented: {df_out['hive_id'].nunique()}")

    if output_path:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        df_out.to_csv(output_path, index=False)
        print(f"[MSPBBandExtractor] Saved feature dataset to {output_path}")

    return df_out


if __name__ == "__main__":
    d_dir = Path("data")
    s_path = Path("spec/beevil_spec.yaml")
    out_csv = d_dir / "processed" / "mspb_colony_strength_features.csv"
    extract_mspb_7day_features(d_dir, s_path, out_csv)
