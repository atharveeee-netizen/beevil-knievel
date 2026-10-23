"""
paper_q1.features.f0_dsp: Exact Python reference for on-node ARM Cortex-M4 CMSIS-DSP pipeline.
Matches spec/beevil_spec.yaml and firmware/src/main.cpp with mathematical precision.
"""

from __future__ import annotations

import math
from typing import Dict, List, Tuple, Union
import numpy as np
from scipy import signal


# Canonical DSP Specifications from spec/beevil_spec.yaml
CAPTURE_FS = 16000          # 16 kHz native microphone DMA capture
DECIMATION_FACTOR = 4       # Decimate x4
PROCESSING_FS = 4000        # 4 kHz processing bandwidth
FFT_LENGTH = 512            # 512-point real FFT
BIN_RESOLUTION_HZ = 7.8125  # 4000 / 512 = 7.8125 Hz per bin
NYQUIST_HZ = 2000.0         # 4000 / 2 = 2000 Hz

# 8 Biological Frequency Bands from spec/beevil_spec.yaml
BAND_DEFINITIONS: List[Tuple[int, float, float, str]] = [
    (0, 30.0,   100.0,  "Sub-harmonic / tractor / wind"),
    (1, 100.0,  180.0,  "Worker fanning baseline"),
    (2, 180.0,  280.0,  "Brood nest thermoregulation"),
    (3, 280.0,  380.0,  "Foraging & flight prep"),
    (4, 380.0,  500.0,  "Pre-swarm acoustic crescendo"),
    (5, 500.0,  750.0,  "Queenless distress piping"),
    (6, 750.0,  1200.0, "Defensive & robber bee alarm"),
    (7, 1200.0, 2000.0, "High-frequency rain / electrical"),
]


def design_anti_aliasing_filter(numtaps: int = 31, cutoff_hz: float = 1800.0, fs: float = 16000.0) -> np.ndarray:
    """
    Design lowpass FIR anti-aliasing filter for x4 decimation.
    Cutoff at 1800 Hz to prevent aliasing above 2000 Hz Nyquist after decimation.
    """
    # Symmetric linear-phase FIR filter
    taps = signal.firwin(numtaps, cutoff_hz, fs=fs, window="hamming")
    return taps.astype(np.float32)


_FIR_TAPS = design_anti_aliasing_filter()


def decimate_audio_x4(audio_16k: np.ndarray) -> np.ndarray:
    """
    Apply anti-alias FIR filter and decimate 16 kHz audio by 4 to 4 kHz.
    Audio input is assumed normalized to [-1.0, 1.0].
    """
    if len(audio_16k) == 0:
        return np.empty(0, dtype=np.float32)
    # Filter along time axis
    filtered = signal.lfilter(_FIR_TAPS, 1.0, audio_16k)
    # Downsample by taking every 4th sample
    decimated = filtered[::DECIMATION_FACTOR]
    return decimated.astype(np.float32)


def get_band_bin_indices(band_defs: List[Tuple[int, float, float, str]] = BAND_DEFINITIONS) -> List[Tuple[int, int]]:
    """Convert Hz frequency limits to discrete FFT bin index ranges [start_bin, end_bin)."""
    bin_ranges = []
    for idx, f_min, f_max, desc in band_defs:
        start_bin = int(math.floor(f_min / BIN_RESOLUTION_HZ))
        end_bin = int(math.ceil(f_max / BIN_RESOLUTION_HZ))
        # Clamp to valid positive FFT bins (bins 0 to 256 for 512-point real FFT)
        start_bin = max(0, min(start_bin, FFT_LENGTH // 2))
        end_bin = max(start_bin + 1, min(end_bin, FFT_LENGTH // 2 + 1))
        bin_ranges.append((start_bin, end_bin))
    return bin_ranges


_BAND_BINS = get_band_bin_indices()


def compute_frame_spectrum_512(frame_4k: np.ndarray) -> np.ndarray:
    """
    Compute 512-point real FFT power spectrum with Hann window.
    Input: frame of length 512 at 4 kHz.
    Output: power spectrum of length 257 (bins 0 to 256).
    """
    if len(frame_4k) != FFT_LENGTH:
        raise ValueError(f"Expected frame length {FFT_LENGTH}, got {len(frame_4k)}")
    
    # Periodic Hann window (matching CMSIS-DSP arm_rfft_fast_f32 standard)
    window = np.hanning(FFT_LENGTH).astype(np.float32)
    windowed = frame_4k * window
    
    # Real FFT -> complex spectrum of 257 bins
    fft_complex = np.fft.rfft(windowed, n=FFT_LENGTH)
    
    # Power spectrum: |X[k]|^2 / N
    power_spectrum = (np.abs(fft_complex) ** 2) / float(FFT_LENGTH)
    return power_spectrum.astype(np.float32)


def extract_f0_features(audio: np.ndarray, fs: int = 16000, eps: float = 1e-10) -> Dict[str, Union[np.ndarray, float]]:
    """
    Full on-device F0 feature extraction pipeline:
    1. Resample/decimate input to 4 kHz if 16 kHz.
    2. Window into 512-sample frames with 50% overlap (256 hop = 64 ms).
    3. Compute Hann-windowed FFT power spectrum for each frame.
    4. Average power spectrum across all frames (Welch periodogram averaging).
    5. Integrate power across 8 frequency bands.
    6. Compute:
       - Relative band energy vector: E_b / (E_total + eps)
       - Log relative band energy vector: log10(E_b / (E_total + eps) + eps)
       - Total log energy: log10(E_total + eps)
       - 8-bit normalized telemetry vector: [0..255] scaled relative energies
    """
    if fs == 16000:
        audio_4k = decimate_audio_x4(audio)
    elif fs == 4000:
        audio_4k = audio.astype(np.float32)
    else:
        # Resample to 4 kHz via scipy signal resample_poly
        gcd = math.gcd(fs, 4000)
        up = 4000 // gcd
        down = fs // gcd
        audio_4k = signal.resample_poly(audio, up, down).astype(np.float32)

    hop_size = FFT_LENGTH // 2  # 50% overlap = 256 samples (64 ms)
    n_samples = len(audio_4k)
    
    if n_samples < FFT_LENGTH:
        # Zero-pad if shorter than one FFT window
        padded = np.zeros(FFT_LENGTH, dtype=np.float32)
        padded[:n_samples] = audio_4k
        audio_4k = padded
        n_samples = FFT_LENGTH

    frames = []
    for start in range(0, n_samples - FFT_LENGTH + 1, hop_size):
        frame = audio_4k[start : start + FFT_LENGTH]
        frames.append(frame)

    if not frames:
        frames = [audio_4k[:FFT_LENGTH]]

    # Compute averaged power spectrum (Welch periodogram)
    avg_psd = np.zeros(FFT_LENGTH // 2 + 1, dtype=np.float32)
    for frame in frames:
        avg_psd += compute_frame_spectrum_512(frame)
    avg_psd /= float(len(frames))

    # Integrate energy across 8 bands
    band_energies = np.zeros(8, dtype=np.float32)
    for idx, (b_start, b_end) in enumerate(_BAND_BINS):
        band_energies[idx] = np.sum(avg_psd[b_start:b_end])

    total_energy = float(np.sum(band_energies))
    rel_energies = band_energies / (total_energy + eps)
    log_rel_energies = np.log10(rel_energies + eps)
    total_log_energy = math.log10(total_energy + eps)

    # Telemetry byte vector (8 bytes, each 0-255 proportional to relative energy)
    telemetry_bytes = np.clip(np.round(rel_energies * 255.0), 0, 255).astype(np.uint8)

    return {
        "band_energies": band_energies,
        "total_energy": total_energy,
        "rel_energies": rel_energies,
        "log_rel_energies": log_rel_energies,
        "total_log_energy": total_log_energy,
        "telemetry_bytes": telemetry_bytes,
        "feature_vector_9d": np.append(log_rel_energies, total_log_energy).astype(np.float32),
        "feature_vector_8d": log_rel_energies.astype(np.float32)
    }
