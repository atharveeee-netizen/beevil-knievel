"""
=============================================================================
BEEVIL KNIEVEL - Level 1 TinyML Feature Classifier Evaluation (~75.4 KB Model)
Evaluates 4-band spectral feature extractor against real Zenodo research audio
from Zenodo Record 1321278 (NU-Hive & Open Source Beehive datasets).
=============================================================================
"""

import os
import sys

from bee_acoustic_classifier import extract_multiband_spectral_features, classify_hive_state_tinyml, MODEL_FLASH_FOOTPRINT_KB, MODEL_RAM_FOOTPRINT_KB
from datasets.download_zenodo_dataset import download_zenodo_samples

def run_level1_benchmark():
    print("=================================================================")
    print("  BEEVIL KNIEVEL - 75.4 KB TinyML FEATURE CLASSIFIER EVALUATION  ")
    print("=================================================================")
    print("  * Model Architecture: Multi-Band Acoustic Spectral Feature Classifier")
    print(f"  * Flash Footprint:    {MODEL_FLASH_FOOTPRINT_KB} KB / 256 KB (RAK4631)")
    print(f"  * SRAM Footprint:     {MODEL_RAM_FOOTPRINT_KB} KB / 64 KB (RAK4631)")
    print("=================================================================")

    dataset_dir = os.path.join(os.path.dirname(__file__), "datasets", "sample_bee_audio")

    # Real-world Zenodo dataset test cases with expected diagnostic categories (canonical filenames)
    real_zenodo_tests = [
        ("zenodo_h1_queen_1500.wav",   10.5, ["NORMAL_HEALTHY", "HIGH_ACOUSTIC_ACTIVITY"], "Zenodo NU-Hive H1 (Queen Present 15:00)"),
        ("zenodo_h1_noqueen_1500.wav", 4.0,  ["QUEENLESS_DISTRESS", "THERMAL_STRESS_WARNING"], "Zenodo NU-Hive H1 (Missing Queen / Chill 15:00)"),
        ("zenodo_active_214.wav",      9.8,  ["NORMAL_HEALTHY", "HIGH_ACOUSTIC_ACTIVITY"], "Zenodo OSBH (Active Hive Recording 214)")
    ]

    print("\n[STEP 1] Verifying Zenodo Dataset Audio Files (DOI: 10.5281/zenodo.1321278)...")
    download_zenodo_samples()

    print("\n[STEP 2] Running 4-Band Multi-Spectral Evaluation...")
    print("-" * 105)
    print(f"{'Zenodo Audio File':<28} | {'Vent':<5} | {'Swarm':<5} | {'Distress':<8} | {'Noise':<5} | {'Predicted State':<22} | {'Score':<5} | Status")
    print("-" * 105)

    passed = 0
    total = len(real_zenodo_tests)

    for fname, delta_t, valid_states, desc in real_zenodo_tests:
        fpath = os.path.join(dataset_dir, fname)
        if os.path.exists(fpath) and os.path.getsize(fpath) > 1000:
            feats = extract_multiband_spectral_features(fpath)
            predicted_state, score = classify_hive_state_tinyml(feats, delta_t)

            is_correct = predicted_state in valid_states
            if is_correct:
                passed += 1
                status = "PASS"
            else:
                status = "FAIL"

            print(f"{fname:<28} | {feats['b1_vent']:>5.1f} | {feats['b2_swarm']:>5.1f} | {feats['b3_distress']:>8.1f} | {feats['b4_noise']:>5.1f} | {predicted_state:<22} | {score:>5.2f} | [{status}]")
        else:
            print(f"{fname:<28} | {'N/A':>5} | {'N/A':>5} | {'N/A':>8} | {'N/A':>5} | {'MISSING FILE':<22} | {'N/A':>5} | [FAIL]")

    print("-" * 105)
    accuracy = (passed / total) * 100.0 if total > 0 else 0.0
    status_str = "PASSED" if passed == total else "FAILED"

    print("\n=================================================================")
    print(f"  Level 1 Real Zenodo Evaluation Complete: {passed}/{total} Passed ({accuracy:.1f}%)")
    print(f"  Benchmark Status: {status_str}")
    print("=================================================================\n")

    if passed < total:
        sys.exit(1)

if __name__ == "__main__":
    run_level1_benchmark()
