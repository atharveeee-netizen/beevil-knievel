"""
=============================================================================
BEEVIL KNIEVEL — Acoustic Bee Swarming Classifier & FFT Feature Extractor
Dataset Targets: NU-Hive / OSBH / "To Bee or Not to Bee" Zenodo Audio Files
Target Band: 200 Hz – 400 Hz (Acoustic Swarm & Queen Piping Signature)
=============================================================================
"""

import numpy as np
import scipy.io.wavfile as wav
from scipy.fft import fft
import os

def extract_200_400hz_energy(audio_filepath, sample_rate=16000):
    """
    Reads WAV audio file, computes Real FFT, and extracts energy in 200-400Hz band.
    """
    sr, data = wav.read(audio_filepath)
    if len(data.shape) > 1:
        data = data[:, 0] // Mono conversion

    # Compute FFT
    N = len(data)
    fft_vals = np.abs(fft(data))
    fft_freqs = np.fft.fftfreq(N, 1.0 / sr)

    # Filter 200 Hz - 400 Hz band
    mask = (fft_freqs >= 200) & (fft_freqs <= 400)
    band_energy = np.sum(fft_vals[mask]) / np.sum(mask)

    return float(band_energy)

def classify_hive_state(band_energy, delta_temp_celsius):
    """
    Hybrid Rules-Engine Classifier combining Audio FFT Energy & Thermal Delta.
    """
    SWARM_ENERGY_THRESHOLD = 550.0
    CRITICAL_DELTA_TEMP = 8.0  # Brood temp vs Ambient temp delta

    if band_energy > SWARM_ENERGY_THRESHOLD and delta_temp_celsius < CRITICAL_DELTA_TEMP:
        return "PRE_SWARM_WARNING", 0.94  # State, Confidence
    elif band_energy > SWARM_ENERGY_THRESHOLD:
        return "HIGH_ACOUSTIC_ACTIVITY", 0.78
    elif delta_temp_celsius < 5.0:
        return "THERMAL_STRESS_WARNING", 0.85
    else:
        return "NORMAL_HEALTHY", 0.99

if __name__ == "__main__":
    print("[BK-AI] Beevil Knievel Acoustic Feature Extractor Initialized.")
    print("[BK-AI] Target Acoustic Frequency Band: 200 Hz - 400 Hz")

    # Example test execution
    simulated_energy = 620.5  # High 200-400Hz buzz
    simulated_delta_t = 6.5   # Dropping brood delta
    state, confidence = classify_hive_state(simulated_energy, simulated_delta_t)

    print(f"[BK-AI] Classification Result: {state} (Confidence: {confidence * 100:.1f}%)")
