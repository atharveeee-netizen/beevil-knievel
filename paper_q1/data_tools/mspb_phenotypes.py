"""
MSPB Annotation & Phenotype Label Parser.
Extracts colony strength, winter survival, and queen-state annotations
from D1_ant.xlsx and D2_ant.xlsx, and establishes the authoritative
mapping from sensor tag numbers to physical hives (53 hives total).
"""

from pathlib import Path
from typing import Dict, Any, List, Tuple
import pandas as pd
import numpy as np


def parse_tag_to_hive_mapping(raw_mspb_dir: Path) -> Dict[int, int]:
    """
    Builds the authoritative mapping from sensor tag_number (in CSV telemetry)
    to physical hive ID (1 to 637, 53 unique colonies).
    
    References:
      D1_ant.xlsx: 'ID lookup table'
      D2_ant.xlsx: 'Sheet1' (including 'New hive ID Nov 2020' tag reassignments)
    """
    tag_to_hive: Dict[int, int] = {}

    d1_ant_path = raw_mspb_dir / "D1_ant.xlsx"
    if d1_ant_path.exists():
        df_id = pd.read_excel(d1_ant_path, sheet_name="ID lookup table")
        for _, row in df_id.iterrows():
            if pd.notna(row["Colony number CRSAD"]) and pd.notna(row["Colony number Nectar"]):
                crsad = int(row["Colony number CRSAD"])
                nectar = int(row["Colony number Nectar"])
                # In telemetry files, sensor tag is 200000 + nectar, or raw nectar
                tag_to_hive[200000 + nectar] = crsad
                tag_to_hive[nectar] = crsad

    d2_ant_path = raw_mspb_dir / "D2_ant.xlsx"
    if d2_ant_path.exists():
        df2 = pd.read_excel(d2_ant_path)
        for _, row in df2.iterrows():
            if pd.notna(row["Hive"]):
                crsad = int(row["Hive"])
                if pd.notna(row["Hive ID"]):
                    h_id = int(row["Hive ID"])
                    tag_to_hive[200000 + h_id] = crsad
                    tag_to_hive[h_id] = crsad
                if pd.notna(row["New hive ID Nov 2020"]):
                    new_id = int(row["New hive ID Nov 2020"])
                    tag_to_hive[200000 + new_id] = crsad
                    tag_to_hive[new_id] = crsad

    return tag_to_hive


def parse_colony_strength_evaluations(raw_mspb_dir: Path) -> pd.DataFrame:
    """
    Parses Evaluations 1 to 6 from D1_ant.xlsx.
    Calculates total frames covered by bees across all brood and honey chambers.
    Labels colonies as strong (1) if total_frames >= 20.0, else 0 (moderate/weak),
    following the MSPB published paper standard (Zhu et al. 2024).
    """
    tag_to_hive = parse_tag_to_hive_mapping(raw_mspb_dir)
    d1_ant_path = raw_mspb_dir / "D1_ant.xlsx"
    if not d1_ant_path.exists():
        return pd.DataFrame()

    xl1 = pd.ExcelFile(d1_ant_path)
    eval_sheets = [s for s in xl1.sheet_names if s.startswith("Evaluation")]

    records = []
    for s in eval_sheets:
        df = pd.read_excel(xl1, s)
        sub = df.iloc[1:].copy()
        frame_cols = sub.columns[4:10]
        frames_sum = sub[frame_cols].apply(pd.to_numeric, errors="coerce").fillna(0).sum(axis=1)

        for idx, r in sub.iterrows():
            raw_hive_val = r.iloc[2]
            if pd.notna(raw_hive_val):
                try:
                    nec_id = int(float(raw_hive_val))
                except ValueError:
                    continue
                hive_id = tag_to_hive.get(nec_id, tag_to_hive.get(200000 + nec_id, None))
                if hive_id is None:
                    continue

                insp_date = pd.to_datetime(r["Dates"])
                if pd.isna(insp_date):
                    valid_dates = df["Dates"].dropna()
                    if len(valid_dates) > 0:
                        insp_date = pd.to_datetime(valid_dates.iloc[0])

                t_frames = float(frames_sum.loc[idx])
                records.append({
                    "evaluation_round": s,
                    "hive_id": hive_id,
                    "sensor_tag": 200000 + nec_id,
                    "nectar_id": nec_id,
                    "inspection_date": insp_date.strftime("%Y-%m-%d"),
                    "total_frames": round(t_frames, 2),
                    "is_strong": 1 if t_frames >= 20.0 else 0
                })

    df_res = pd.DataFrame(records)
    # Remove duplicate hive evaluations within same round if any
    df_res = df_res.drop_duplicates(subset=["evaluation_round", "hive_id"])
    return df_res


def parse_winter_survival(raw_mspb_dir: Path) -> pd.DataFrame:
    """
    Parses wintering outcomes from D2_ant.xlsx across the 45 overwintered colonies.
    Returns binary survival: 1 (survived healthy) vs 0 (mortality, starvation, dead queen, queen failure).
    """
    d2_ant_path = raw_mspb_dir / "D2_ant.xlsx"
    if not d2_ant_path.exists():
        return pd.DataFrame()

    df2 = pd.read_excel(d2_ant_path)
    records = []
    for _, r in df2.iterrows():
        if pd.notna(r["Hive"]):
            hive_id = int(r["Hive"])
            mort_cause = r["Mortality cause"] if pd.notna(r["Mortality cause"]) else None
            status_s5 = str(r["status April 5"]).lower() if pd.notna(r["status April 5"]) else ""
            status_s28 = str(r["status Apr 28"]).lower() if pd.notna(r["status Apr 28"]) else ""
            frames_apr = float(r["Bees frames Apr 2021"]) if pd.notna(r["Bees frames Apr 2021"]) else 0.0

            # Survived healthy: no mortality cause, status not dead, frame count > 1.0
            is_survived = 1 if (mort_cause is None and "dead" not in status_s5 and frames_apr > 1.0) else 0

            records.append({
                "hive_id": hive_id,
                "mortality_cause": mort_cause or "None (Survived)",
                "bees_frames_apr_2021": frames_apr,
                "status_apr_28": status_s28,
                "winter_survived": is_survived
            })

    return pd.DataFrame(records)


def parse_queen_cell_annotations(raw_mspb_dir: Path) -> List[Dict[str, Any]]:
    """
    Extracts dated queen cell, emergency cell, and queen state observations
    from the inspection comments in D1_ant.xlsx and D2_ant.xlsx.
    """
    d1_ant_path = raw_mspb_dir / "D1_ant.xlsx"
    if not d1_ant_path.exists():
        return []

    xl1 = pd.ExcelFile(d1_ant_path)
    tag_to_hive = parse_tag_to_hive_mapping(raw_mspb_dir)
    events = []

    for s in [s for s in xl1.sheet_names if s.startswith("Evaluation")]:
        df = pd.read_excel(xl1, s)
        for idx, r in df.iloc[1:].iterrows():
            row_text = " ".join([str(v) for v in r.values if pd.notna(v)])
            for kw in ["queen cell", "emergency cell", "requeening cell", "queenless", "drone laying"]:
                if kw in row_text.lower():
                    raw_hive = r.iloc[2]
                    try:
                        nec = int(float(raw_hive))
                        h_id = tag_to_hive.get(nec, tag_to_hive.get(200000 + nec, nec))
                    except Exception:
                        h_id = None
                    events.append({
                        "source_sheet": s,
                        "hive_id": h_id,
                        "keyword_matched": kw,
                        "annotation_text": row_text
                    })
                    break

    return events
