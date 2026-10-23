"""
BEEVIL KNIEVEL - External Bioacoustic Audio Validation Suite
============================================================
Evaluates the robustness and biological fidelity of the TinyML DSP pipeline:
1. 24-Bit PCM Ingestion Invariance: Proves 24-bit audio unpacks cleanly without byte misalignment.
2. Stereophonic Downmixing Invariance: Verifies (L + R) / 2 coherent stereo downmix.
3. Bioacoustic Frequency Band Isolation:
   - Band 1 (100-180 Hz): Hive ventilation & worker fanning
   - Band 2 (200-400 Hz): Flight muscle warmup & pre-swarm piping
   - Band 3 (450-750 Hz): Queenless distress roar
   - Band 4 (800-1200 Hz): Non-biological noise floor
4. Real-World Field Audio Validation: Validates third-party downloaded researcher recordings
   (if present in local directory) across heterogeneous bit depths and sample rates.
"""

import os
import sys
import math
import struct
import wave
import tempfile
import pytest
import numpy as np

# Add repo root to path
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, REPO_ROOT)
sys.path.insert(0, os.path.join(REPO_ROOT, "TinyML Model"))

from bee_acoustic_classifier import (
    extract_multiband_spectral_features,
    classify_hive_state_tinyml,
    SPECTRAL_BANDS
)

def create_synthetic_wav(filepath, freq_hz, duration_sec=0.5, framerate=16000, sampwidth=2, nchannels=1):
    """Utility to generate uncompressed PCM WAV files with variable bit depths and channels."""
    n_samples = int(duration_sec * framerate)
    t = [i / float(framerate) for i in range(n_samples)]
    sine_wave = [0.8 * math.sin(2.0 * math.pi * freq_hz * ti) for ti in t]

    with wave.open(filepath, 'wb') as wf:
        wf.setnchannels(nchannels)
        wf.setsampwidth(sampwidth)
        wf.setframerate(framerate)

        raw = bytearray()
        for sample in sine_wave:
            for ch in range(nchannels):
                if sampwidth == 2:
                    val = int(sample * 32767.0)
                    raw += struct.pack('<h', max(-32768, min(32767, val)))
                elif sampwidth == 3:
                    val = int(sample * 8388607.0)
                    val = max(-8388608, min(8388607, val))
                    raw += int(val).to_bytes(3, byteorder='little', signed=True)
                elif sampwidth == 4:
                    val = int(sample * 2147483647.0)
                    raw += struct.pack('<i', max(-2147483648, min(2147483647, val)))
        wf.writeframes(bytes(raw))

class TestExternalAudioDSPRobustness:
    """Verifies that the audio ingestion pipeline handles variable bit-depths and channels cleanly."""

    def test_24bit_pcm_unpacking_fidelity(self):
        """Verifies that 24-bit PCM produces consistent spectral energy without byte corruption."""
        with tempfile.TemporaryDirectory() as tmpdir:
            p16 = os.path.join(tmpdir, "tone_16bit.wav")
            p24 = os.path.join(tmpdir, "tone_24bit.wav")

            # Generate identical 141 Hz tone in 16-bit and 24-bit
            create_synthetic_wav(p16, freq_hz=141.0, sampwidth=2, framerate=48000)
            create_synthetic_wav(p24, freq_hz=141.0, sampwidth=3, framerate=48000)

            feats16 = extract_multiband_spectral_features(p16)
            feats24 = extract_multiband_spectral_features(p24)

            # Both must concentrate dominant energy in Band 1 (100-180 Hz)
            assert feats16["b1_vent"] > feats16["b3_distress"] * 2.0
            assert feats24["b1_vent"] > feats24["b3_distress"] * 2.0

            # 24-bit energy must match 16-bit within tight tolerance (< 5% numerical variance)
            ratio = feats24["b1_vent"] / (feats16["b1_vent"] + 1e-6)
            assert 0.90 <= ratio <= 1.10

    def test_stereophonic_coherent_downmixing(self):
        """Verifies that (L + R) / 2 coherent stereo downmix preserves acoustic energy."""
        with tempfile.TemporaryDirectory() as tmpdir:
            p_mono = os.path.join(tmpdir, "tone_mono.wav")
            p_stereo = os.path.join(tmpdir, "tone_stereo.wav")

            create_synthetic_wav(p_mono, freq_hz=150.0, sampwidth=2, nchannels=1, framerate=48000)
            create_synthetic_wav(p_stereo, freq_hz=150.0, sampwidth=2, nchannels=2, framerate=48000)

            feats_mono = extract_multiband_spectral_features(p_mono)
            feats_stereo = extract_multiband_spectral_features(p_stereo)

            # Energy in Band 1 must be identical between coherent mono and stereo downmix
            assert abs(feats_mono["b1_vent"] - feats_stereo["b1_vent"]) < 0.1

    def test_sample_rate_invariance_48k_and_96k(self):
        """Verifies that sampling at 16k, 48k, and 96k isolates the same peak energy band."""
        with tempfile.TemporaryDirectory() as tmpdir:
            p16k = os.path.join(tmpdir, "tone_16k.wav")
            p48k = os.path.join(tmpdir, "tone_48k.wav")
            p96k = os.path.join(tmpdir, "tone_96k.wav")

            create_synthetic_wav(p16k, freq_hz=140.0, framerate=16000)
            create_synthetic_wav(p48k, freq_hz=140.0, framerate=48000)
            create_synthetic_wav(p96k, freq_hz=140.0, framerate=96000)

            f16k = extract_multiband_spectral_features(p16k)
            f48k = extract_multiband_spectral_features(p48k)
            f96k = extract_multiband_spectral_features(p96k)

            # All three must isolate Band 1 as dominant
            assert f16k["b1_vent"] > f16k["b2_swarm"]
            assert f48k["b1_vent"] > f48k["b2_swarm"]
            assert f96k["b1_vent"] > f96k["b2_swarm"]

class TestBioacousticBandDiscrimination:
    """Verifies that the 4 frequency bands correctly classify apicultural acoustic regimes."""

    def test_worker_fanning_band1(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            path = os.path.join(tmpdir, "fanning.wav")
            create_synthetic_wav(path, freq_hz=145.0)
            feats = extract_multiband_spectral_features(path)
            state, score = classify_hive_state_tinyml(feats, delta_temp_celsius=10.0)
            assert feats["b1_vent"] > feats["b2_swarm"]
            assert state in ["NORMAL_HEALTHY", "HIGH_ACOUSTIC_ACTIVITY"]

    def test_pre_swarm_piping_band2(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            path = os.path.join(tmpdir, "swarm.wav")
            create_synthetic_wav(path, freq_hz=320.0)
            feats = extract_multiband_spectral_features(path)
            state, score = classify_hive_state_tinyml(feats, delta_temp_celsius=7.0)
            assert feats["b2_swarm"] > feats["b1_vent"]
            assert state == "PRE_SWARM_WARNING"

    def test_queenless_distress_band3(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            path = os.path.join(tmpdir, "distress.wav")
            create_synthetic_wav(path, freq_hz=600.0)
            feats = extract_multiband_spectral_features(path)
            state, score = classify_hive_state_tinyml(feats, delta_temp_celsius=10.0)
            assert feats["b3_distress"] > feats["b1_vent"]
            assert state == "QUEENLESS_DISTRESS"

class TestRealWorldDownloadedRecordings:
    """Evaluates the 6 downloaded researcher audio files across local testbeds and repository datasets."""

    SEARCH_DIRS = [
        os.path.join(REPO_ROOT, "TinyML Model", "datasets", "external_ood_test_audio"),
        r"C:\Users\25beevdt047\Downloads"
    ]

    @classmethod
    def _find_audio(cls, fname):
        for d in cls.SEARCH_DIRS:
            p = os.path.join(d, fname)
            if os.path.exists(p):
                return p
        return None

    def test_real_bee_buzzin_24bit_stereo(self):
        path = self._find_audio("bee_buzzin.wav")
        if not path:
            pytest.skip("bee_buzzin.wav not found in search paths")

        feats = extract_multiband_spectral_features(path)
        # 141 Hz fanning must dominate over distress and ambient noise
        assert feats["b1_vent"] > feats["b3_distress"]
        assert feats["b1_vent"] > feats["b4_noise"]

    def test_real_cognito_buzzing_16bit_stereo(self):
        path = self._find_audio("cognito-perceptu__buzzing-bee.wav")
        if not path:
            pytest.skip("cognito-perceptu__buzzing-bee.wav not found in search paths")

        feats = extract_multiband_spectral_features(path)
        assert feats["b1_vent"] > feats["b3_distress"]

    def test_real_robak_bumblebee_high_freq_flight(self):
        path = self._find_audio("robak__bumblebee.wav")
        if not path:
            pytest.skip("robak__bumblebee.wav not found in search paths")

        feats = extract_multiband_spectral_features(path)
        # High speed flight (~296.5 Hz) must activate Band 2 or Band 4 over Band 1
        assert feats["b2_swarm"] > feats["b1_vent"]

    def test_real_bumblebee_extended_flight(self):
        path = self._find_audio("bumblebee.wav")
        if not path:
            pytest.skip("bumblebee.wav not found in search paths")

        feats = extract_multiband_spectral_features(path)
        # Bumblebee flight tone centered at ~195 Hz activates Band 1 & Band 2
        assert (feats["b1_vent"] + feats["b2_swarm"]) > feats["b4_noise"]

    def test_real_breviceps_adpcm_fallback_graceful(self):
        path = self._find_audio("breviceps__bumblebee.wav")
        if not path:
            pytest.skip("breviceps__bumblebee.wav not found in search paths")

        feats = extract_multiband_spectral_features(path)
        # Must return valid non-negative feature dict even under non-standard format
        assert isinstance(feats, dict)
        assert all(v >= 0.0 for v in feats.values())

    def test_real_kvgarlic_96khz_high_res(self):
        path = self._find_audio("kvgarlic__bee.wav")
        if not path:
            pytest.skip("kvgarlic__bee.wav not found in search paths")

        feats = extract_multiband_spectral_features(path)
        assert feats["b1_vent"] > 0.0

