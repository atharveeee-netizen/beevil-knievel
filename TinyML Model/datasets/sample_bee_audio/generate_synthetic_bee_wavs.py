"""
=============================================================================
BEEVIL KNIEVEL — Bee Audio Dataset Generator (Standard Library Version)
Generates sample .wav audio dataset files matching 200-400Hz acoustic signatures
=============================================================================
"""

import math
import wave
import struct
import os

def generate_bee_audio_wav(filename, duration_sec=3.0, sample_rate=16000, target_freq_hz=250.0):
    """
    Generates synthetic bee acoustic 16-bit mono WAV audio dataset file using pure Python stdlib.
    """
    num_samples = int(duration_sec * sample_rate)
    audio_data = []

    for i in range(num_samples):
        t = float(i) / sample_rate
        # Fundamental (250Hz) + 2nd harmonic (500Hz) + 3rd harmonic (750Hz)
        val = 0.6 * math.sin(2 * math.pi * target_freq_hz * t) + \
              0.3 * math.sin(2 * math.pi * (target_freq_hz * 2) * t) + \
              0.1 * math.sin(2 * math.pi * (target_freq_hz * 3) * t)
        
        # 16-bit PCM integer scaling (-32768 to 32767)
        int_val = int(val * 30000)
        int_val = max(-32768, min(32767, int_val))
        audio_data.append(struct.pack('<h', int_val))

    output_dir = os.path.dirname(filename)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)

    with wave.open(filename, 'wb') as wav_file:
        wav_file.setnchannels(1)     # Mono
        wav_file.setsampwidth(2)     # 16-bit (2 bytes)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(b''.join(audio_data))

    print(f"[BK-DATASET] Created sample WAV dataset file: {filename}")

if __name__ == "__main__":
    base_dir = os.path.dirname(__file__)
    # 1. Normal baseline buzzing (240 Hz)
    generate_bee_audio_wav(os.path.join(base_dir, "sample_normal_buzz_240hz.wav"), target_freq_hz=240.0)

    # 2. Pre-swarm acoustic spike (340 Hz in 200-400Hz target band)
    generate_bee_audio_wav(os.path.join(base_dir, "sample_preswarm_spike_340hz.wav"), target_freq_hz=340.0)

    # 3. Queenless colony distress sound (420 Hz high-pitch piping)
    generate_bee_audio_wav(os.path.join(base_dir, "sample_queenless_stress_420hz.wav"), target_freq_hz=420.0)
