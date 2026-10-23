#!/usr/bin/env python3
"""
paper_q1.run: Unified cross-platform CLI entrypoint for the Q1 journal pipeline.

Usage:
    python -m paper_q1.run <step>

Available steps:
    setup       Verify environment, lockfile, directory scaffold
    spec        Generate C headers, Python structs, and TeX spec from spec/beevil_spec.yaml
    data        Download/ingest public datasets (D1–D4) into data/
    audit       Run forensic data audit, confound matrix, and duplicate checks
    splits      Generate and freeze StratifiedGroupKFold splits (hashes to paper_q1/splits/)
    features    Compute firmware-faithful audio features & verify CMSIS-DSP golden vectors
    train       Train benchmark models (T1–T4) following strict non-leakage protocol
    quantize    Export models to INT8 TFLM and C headers
    eval        Evaluate models on outer test sets & write paper_q1/results/main_results.json
    stats       Compute statistical significance tests (Friedman-Nemenyi, bootstrap CIs)
    figures     Generate all publication figures from JSON results
    numbers     Generate paper_q1/manuscript/numbers.tex macros from results JSON
    paper       Compile the LaTeX manuscript (PDF generation)
    smoke       Quick (<2 min) end-to-end smoke test on offline fixtures and unit test suite
    all         Reproduce the complete pipeline from scratch
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Dict, Any

# Ensure stdout handles UTF-8 cleanly on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parent.parent


def get_repo_root() -> Path:
    return REPO_ROOT


def step_setup(args: argparse.Namespace) -> int:
    """Verify setup, environment, lockfile, and directory scaffolding."""
    print("=== [paper_q1] Step: setup ===")
    req_dirs = [
        REPO_ROOT / "paper_q1" / "human_tasks",
        REPO_ROOT / "paper_q1" / "splits",
        REPO_ROOT / "paper_q1" / "results",
        REPO_ROOT / "paper_q1" / "manuscript",
        REPO_ROOT / "paper_q1" / "data_tools",
        REPO_ROOT / "paper_q1" / "bench_raw",
        REPO_ROOT / "paper_q1" / "runs",
        REPO_ROOT / "data",
        REPO_ROOT / "archive" / "ai_generated",
    ]
    for d in req_dirs:
        d.mkdir(parents=True, exist_ok=True)
        print(f"  [OK] Directory: {d.relative_to(REPO_ROOT)}")

    manifest = REPO_ROOT / "data" / "MANIFEST.csv"
    if not manifest.exists():
        manifest.write_text("sha256,size_bytes,filename,url,license,download_date,provenance_tag\n", encoding="utf-8")
        print(f"  [OK] Initialized {manifest.relative_to(REPO_ROOT)}")
    else:
        print(f"  [OK] Found {manifest.relative_to(REPO_ROOT)}")

    lock = REPO_ROOT / "requirements-lock.txt"
    if lock.exists():
        print(f"  [OK] Found lockfile {lock.relative_to(REPO_ROOT)}")
    else:
        print(f"  [WARN] {lock.relative_to(REPO_ROOT)} missing")

    print("[paper_q1] Setup verified successfully.")
    return 0


def step_spec(args: argparse.Namespace) -> int:
    """Generate C headers, Python structs, and TeX macros from spec/beevil_spec.yaml."""
    print("=== [paper_q1] Step: spec ===")
    spec_yaml = REPO_ROOT / "spec" / "beevil_spec.yaml"
    if not spec_yaml.exists():
        print(f"  [ERROR] Spec file not found at {spec_yaml}")
        print("  Spec will be created during Phase 1 audit remediation.")
        return 1
    
    # Delegated to spec generator tool
    from paper_q1.spec_generator import generate_all_specs
    return generate_all_specs(spec_yaml)


def step_data(args: argparse.Namespace) -> int:
    """Ingest/download verified public datasets."""
    print("=== [paper_q1] Step: data ===")
    from paper_q1.data_tools import ingest_datasets
    return ingest_datasets(REPO_ROOT / "data")


def step_audit(args: argparse.Namespace) -> int:
    """Audit datasets for confounds, duplicates, and missing annotations."""
    print("=== [paper_q1] Step: audit ===")
    from paper_q1.data_tools import audit_datasets
    return audit_datasets(REPO_ROOT / "data", REPO_ROOT / "paper_q1" / "results")


def step_splits(args: argparse.Namespace) -> int:
    """Generate and freeze outer CV splits using StratifiedGroupKFold."""
    print("=== [paper_q1] Step: splits ===")
    from paper_q1.split_generator import freeze_splits
    return freeze_splits(REPO_ROOT / "paper_q1" / "splits")


def step_features(args: argparse.Namespace) -> int:
    """Compute firmware-faithful audio features & run golden vector tests."""
    print("=== [paper_q1] Step: features ===")
    from paper_q1.feature_engine import test_feature_parity
    return test_feature_parity(REPO_ROOT / "paper_q1" / "results")


def step_train(args: argparse.Namespace) -> int:
    """Train models according to frozen preregistered protocol."""
    print("=== [paper_q1] Step: train ===")
    # Phase gate: check if splits and golden vectors exist
    splits_file = REPO_ROOT / "paper_q1" / "splits" / "splits_seed0.json"
    if not splits_file.exists():
        print("  [ERROR] Cannot start training before Phase 3 splits are frozen.")
        return 1
    from paper_q1.train_engine import run_training
    return run_training()


def step_quantize(args: argparse.Namespace) -> int:
    """Quantize trained models to INT8 and export C headers."""
    print("=== [paper_q1] Step: quantize ===")
    from paper_q1.quantize_engine import export_quantized
    return export_quantized()


def step_eval(args: argparse.Namespace) -> int:
    """Evaluate models on outer test sets & write main_results.json."""
    print("=== [paper_q1] Step: eval ===")
    from paper_q1.eval_engine import run_evaluation
    return run_evaluation()


def step_stats(args: argparse.Namespace) -> int:
    """Run statistical significance tests."""
    print("=== [paper_q1] Step: stats ===")
    from paper_q1.stats_engine import compute_statistics
    return compute_statistics()


def step_figures(args: argparse.Namespace) -> int:
    """Generate publication figures from results JSON."""
    print("=== [paper_q1] Step: figures ===")
    from paper_q1.figure_engine import generate_all_figures
    return generate_all_figures()


def step_numbers(args: argparse.Namespace) -> int:
    """Export LaTeX macros to paper_q1/manuscript/numbers.tex."""
    print("=== [paper_q1] Step: numbers ===")
    results_dir = REPO_ROOT / "paper_q1" / "results"
    output_tex = REPO_ROOT / "paper_q1" / "manuscript" / "numbers.tex"
    output_tex.parent.mkdir(parents=True, exist_ok=True)

    macros = []
    macros.append("% Auto-generated by python -m paper_q1.run numbers. DO NOT EDIT BY HAND.")
    macros.append(r"\ProvidesPackage{numbers}")

    # Read all JSON results in paper_q1/results/
    count = 0
    if results_dir.exists():
        for json_file in sorted(results_dir.glob("*.json")):
            try:
                data = json.loads(json_file.read_text(encoding="utf-8"))
                prefix = json_file.stem.replace("_", "")
                if isinstance(data, dict):
                    for k, v in data.items():
                        if isinstance(v, (int, float, str)):
                            clean_k = "".join(c for c in k if c.isalnum())
                            val_str = f"{v:.4f}" if isinstance(v, float) else str(v)
                            macros.append(f"\\newcommand{{\\{prefix}{clean_k}}}{{{val_str}}}")
                            count += 1
            except Exception as e:
                print(f"  [WARN] Failed to parse {json_file.name}: {e}")

    output_tex.write_text("\n".join(macros) + "\n", encoding="utf-8")
    print(f"  [OK] Written {count} macros to {output_tex.relative_to(REPO_ROOT)}")
    return 0


def step_paper(args: argparse.Namespace) -> int:
    """Compile LaTeX manuscript to PDF."""
    print("=== [paper_q1] Step: paper ===")
    manuscript_dir = REPO_ROOT / "paper_q1" / "manuscript"
    tex_file = manuscript_dir / "main.tex"
    if not tex_file.exists():
        print(f"  [ERROR] Manuscript file {tex_file} not yet created.")
        return 1
    # Check for tectonic or pdflatex
    import subprocess
    cmd = ["tectonic", str(tex_file)]
    try:
        subprocess.run(cmd, cwd=str(manuscript_dir), check=True)
        print("  [OK] PDF compiled successfully.")
        return 0
    except (subprocess.SubprocessError, FileNotFoundError):
        print("  [WARN] tectonic not found. Trying pdflatex...")
        try:
            subprocess.run(["pdflatex", "-interaction=nonstopmode", "main.tex"], cwd=str(manuscript_dir), check=True)
            print("  [OK] PDF compiled with pdflatex.")
            return 0
        except Exception as e:
            print(f"  [ERROR] LaTeX compilation failed: {e}")
            return 1


def step_smoke(args: argparse.Namespace) -> int:
    """Quick (<2 min) end-to-end smoke test on environment and offline fixtures."""
    print("=== [paper_q1] Step: smoke ===")
    
    # 1. Environment & Scaffolding check
    setup_rc = step_setup(args)
    if setup_rc != 0:
        return setup_rc

    # 2. Python Dependencies Check
    print("  [1/4] Checking core Python libraries...")
    try:
        import numpy as np
        import scipy
        import sklearn
        import torch
        import pydantic
        import fastapi
        import pytest
        print(f"    numpy: {np.__version__}")
        print(f"    scipy: {scipy.__version__}")
        print(f"    sklearn: {sklearn.__version__}")
        print(f"    torch: {torch.__version__} (CUDA available: {torch.cuda.is_available()})")
        print(f"    pydantic: {pydantic.__version__}")
    except ImportError as e:
        print(f"  [FAIL] Missing library: {e}")
        return 1

    # 3. DSP Math Smoke Check (Hann window + real FFT + band energy integration)
    print("  [2/4] Testing DSP mathematical pipeline...")
    fs = 4000
    n_fft = 512
    t = np.arange(n_fft) / fs
    # Synthesize two test tones: 200 Hz (fanning) and 450 Hz (piping)
    test_sig = 0.5 * np.sin(2 * np.pi * 200 * t) + 0.3 * np.sin(2 * np.pi * 450 * t)
    window = np.hanning(n_fft)
    windowed = test_sig * window
    fft_spec = np.abs(np.fft.rfft(windowed)) ** 2
    freqs = np.fft.rfftfreq(n_fft, 1.0 / fs)
    total_energy = float(np.sum(fft_spec))
    assert total_energy > 0, "DSP total energy must be strictly positive"
    band_200 = float(np.sum(fft_spec[(freqs >= 150) & (freqs <= 250)]))
    rel_energy_200 = band_200 / (total_energy + 1e-12)
    assert rel_energy_200 > 0.4, f"Expected >40% energy in 200Hz band, got {rel_energy_200:.2f}"
    print(f"    DSP verification OK: 200 Hz relative band energy = {rel_energy_200:.3f}")

    # 4. Numbers Macro Export Check
    print("  [3/4] Testing numbers export generator...")
    numbers_rc = step_numbers(args)
    if numbers_rc != 0:
        return numbers_rc

    # 5. Unit Test Suite (pytest)
    print("  [4/4] Running automated unit tests...")
    import pytest
    pytest_args = ["tests/", "-q", "--maxfail=1"]
    pytest_rc = pytest.main(pytest_args)
    if pytest_rc != 0:
        print(f"  [FAIL] pytest exited with code {pytest_rc}")
        return pytest_rc
    print("    pytest passed successfully.")

    print("\n[paper_q1] Smoke test PASSED. Phase 0 acceptance criteria met.")
    return 0


def step_all(args: argparse.Namespace) -> int:
    """Run full reproduction pipeline."""
    print("=== [paper_q1] Step: all ===")
    steps = [
        step_setup,
        step_spec,
        step_data,
        step_audit,
        step_splits,
        step_features,
        step_train,
        step_quantize,
        step_eval,
        step_stats,
        step_figures,
        step_numbers,
        step_paper,
    ]
    for fn in steps:
        rc = fn(args)
        if rc != 0:
            print(f"  [ERROR] Pipeline aborted at {fn.__name__} with return code {rc}")
            return rc
    print("[paper_q1] Full pipeline finished successfully.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        prog="python -m paper_q1.run",
        description="Cross-platform CLI entrypoint for Q1 Journal Paper pipeline.",
    )
    subparsers = parser.add_subparsers(dest="step", required=True, help="Pipeline step to execute")

    steps_map = {
        "setup": step_setup,
        "spec": step_spec,
        "data": step_data,
        "audit": step_audit,
        "splits": step_splits,
        "features": step_features,
        "train": step_train,
        "quantize": step_quantize,
        "eval": step_eval,
        "stats": step_stats,
        "figures": step_figures,
        "numbers": step_numbers,
        "paper": step_paper,
        "smoke": step_smoke,
        "all": step_all,
    }

    for step_name in steps_map:
        subparsers.add_parser(step_name, help=f"Execute step: {step_name}")

    args = parser.parse_args()
    handler = steps_map.get(args.step)
    if handler:
        return handler(args)
    else:
        parser.print_help()
        return 1


if __name__ == "__main__":
    sys.exit(main())
