"""
tests/test_f0_dsp_pipeline.py: Unit tests for reference on-node F0 DSP pipeline.
Validates frequency resolution, band isolation, gain invariance, and telemetry byte packing.
"""

import math
import numpy as np
import pytest

from paper_q1.features.f0_dsp import (
    extract_f0_features,
    decimate_audio_x4,
    compute_frame_spectrum_512,
    BAND_DEFINITIONS,
    FFT_LENGTH,
    BIN_RESOLUTION_HZ
)


def generate_synthetic_sine(freq_hz: float, duration_s: float = 1.0, fs: int = 16000, amp: float = 0.5) -> np.ndarray:
    """Generate a clean synthetic sine wave."""
    n_samples = int(duration_s * fs)
    t = np.linspace(0, duration_s, n_samples, endpoint=False, dtype=np.float32)
    return (amp * np.sin(2.0 * np.pi * freq_hz * t)).astype(np.float32)


class TestF0DSPPipeline:
    """Verify mathematical properties of the F0 feature extractor."""

    def test_frequency_resolution(self):
        """Bin resolution must be exactly 7.8125 Hz."""
        assert BIN_RESOLUTION_HZ == 7.8125
        assert FFT_LENGTH == 512

    def test_single_tone_band_isolation(self):
        """Pure tones must localize in their specified biological frequency bands."""
        # Tone 140 Hz -> Band 1 (100-180 Hz: Worker fanning baseline)
        audio_140 = generate_synthetic_sine(140.0)
        res_140 = extract_f0_features(audio_140, fs=16000)
        assert np.argmax(res_140["rel_energies"]) == 1
        assert res_140["rel_energies"][1] > 0.85

        # Tone 340 Hz -> Band 3 (280-380 Hz: Foraging & flight prep)
        audio_340 = generate_synthetic_sine(340.0)
        res_340 = extract_f0_features(audio_340, fs=16000)
        assert np.argmax(res_340["rel_energies"]) == 3
        assert res_340["rel_energies"][3] > 0.85

        # Tone 600 Hz -> Band 5 (500-750 Hz: Queenless distress piping)
        audio_600 = generate_synthetic_sine(600.0)
        res_600 = extract_f0_features(audio_600, fs=16000)
        assert np.argmax(res_600["rel_energies"]) == 5
        assert res_600["rel_energies"][5] > 0.85

        # Tone 1500 Hz -> Band 7 (1200-2000 Hz: High-frequency environmental)
        audio_1500 = generate_synthetic_sine(1500.0)
        res_1500 = extract_f0_features(audio_1500, fs=16000)
        assert np.argmax(res_1500["rel_energies"]) == 7
        assert res_1500["rel_energies"][7] > 0.85

    def test_gain_invariance(self):
        """
        Audit Item 13 Verification:
        Relative band energies and telemetry bytes must remain invariant
        when input amplitude scales by a factor of 10 (20 dB drop).
        """
        freq = 420.0  # Band 4: Pre-swarm acoustic crescendo (380-500 Hz)
        audio_loud = generate_synthetic_sine(freq, amp=0.8)
        audio_quiet = generate_synthetic_sine(freq, amp=0.08)

        res_loud = extract_f0_features(audio_loud, fs=16000)
        res_quiet = extract_f0_features(audio_quiet, fs=16000)

        # Both must identify Band 4 as dominant
        assert np.argmax(res_loud["rel_energies"]) == 4
        assert np.argmax(res_quiet["rel_energies"]) == 4

        # Relative energies must match within 0.01 tolerance
        diff = np.max(np.abs(res_loud["rel_energies"] - res_quiet["rel_energies"]))
        assert diff < 0.01, f"Gain variation caused relative energy drift of {diff}"

        # Telemetry byte vector difference must be at most 2 quantization counts
        byte_diff = np.max(np.abs(res_loud["telemetry_bytes"].astype(int) - res_quiet["telemetry_bytes"].astype(int)))
        assert byte_diff <= 2, f"Telemetry byte discrepancy {byte_diff} exceeds allowable quantization limit"

    def test_relative_energy_conservation(self):
        """Sum of relative energies must normalize to 1.0."""
        audio = generate_synthetic_sine(250.0) + generate_synthetic_sine(550.0)
        res = extract_f0_features(audio, fs=16000)
        sum_rel = float(np.sum(res["rel_energies"]))
        assert abs(sum_rel - 1.0) < 1e-4

    def test_feature_vector_dimensions(self):
        """Feature vectors must have exact dimensions (8D relative, 9D with total energy)."""
        audio = generate_synthetic_sine(300.0)
        res = extract_f0_features(audio, fs=16000)
        assert res["feature_vector_8d"].shape == (8,)
        assert res["feature_vector_9d"].shape == (9,)
        assert res["telemetry_bytes"].shape == (8,)
        assert len(res["telemetry_bytes"]) == 8
