"""Robustness of the 4-band acoustic decision engine (TinyML Model/bee_acoustic_classifier.py).

Compares the repository's DFT-probe band estimator with a Hann-windowed FFT band-power
integrator under (i) a frequency sweep, (ii) additive noise and (iii) input-level changes.
Also tabulates the acoustic front-end design space (fs, N).
"""
import sys, os, json, math, wave, struct, tempfile
import numpy as np
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
REPO, OUT = sys.argv[1], sys.argv[2]
sys.path.insert(0, os.path.join(REPO, "TinyML Model"))
from bee_acoustic_classifier import extract_multiband_spectral_features, classify_hive_state_tinyml
plt.rcParams.update({"font.family": "serif", "font.size": 8, "axes.linewidth": 0.6})
rng = np.random.default_rng(11)
FS = 16000
PROBES = {"b1_vent": [100, 120, 140, 160, 180], "b2_swarm": [200, 240, 280, 320, 360, 400],
          "b3_distress": [450, 500, 550, 600, 650, 700, 750], "b4_noise": [800, 900, 1000, 1100, 1200]}
BANDS = {"b1_vent": (100, 180), "b2_swarm": (200, 400), "b3_distress": (450, 750), "b4_noise": (800, 1200)}
KEYS = list(BANDS)

def probe_features(x, fs=FS):
    """Exact numpy re-implementation of extract_multiband_spectral_features (first 1000 samples)."""
    w = x[:1000]; n = np.arange(w.size)
    out = {}
    for k, fl in PROBES.items():
        mags = [abs(np.sum(w * np.exp(-2j * np.pi * f * n / fs))) for f in fl]
        out[k] = float(np.mean(mags))
    return out

def fft_features(x, fs=FS, nfft=2048):
    """Hann-windowed Welch band power (50% overlap) over the whole clip, Parseval-normalised."""
    win = np.hanning(nfft); hop = nfft // 2
    frames = [x[i:i + nfft] * win for i in range(0, x.size - nfft + 1, hop)]
    P = np.mean([np.abs(np.fft.rfft(f)) ** 2 for f in frames], axis=0) / np.sum(win ** 2)
    fr = np.fft.rfftfreq(nfft, 1 / fs)
    return {k: float(P[(fr >= lo) & (fr <= hi)].sum()) for k, (lo, hi) in BANDS.items()}

LABEL2BAND = {"NORMAL_HEALTHY": "b1_vent", "HIGH_ACOUSTIC_ACTIVITY": "b2_swarm", "PRE_SWARM_WARNING": "b2_swarm",
              "QUEENLESS_DISTRESS": "b3_distress", "NOISE_SUPPRESSED_FLIGHT": "b4_noise"}

def decide_probe(x):
    lab, _ = classify_hive_state_tinyml(probe_features(x), 10.0, 0.0)
    return LABEL2BAND[lab]

def decide_fft(x):
    f = fft_features(x)
    return max(f, key=f.get)  # level-independent: argmax of band power

def synth(band, amp=0.55, snr_db=None, dur=1.0):
    lo, hi = BANDS[band]
    f0 = rng.uniform(lo + 2, hi - 2)
    t = np.arange(int(dur * FS)) / FS
    ph = rng.uniform(0, 2 * np.pi, 3)
    s = amp * (0.6 * np.sin(2 * np.pi * f0 * t + ph[0]) + 0.3 * np.sin(4 * np.pi * f0 * t + ph[1])
               + 0.1 * np.sin(6 * np.pi * f0 * t + ph[2]))
    if snr_db is not None:
        # band-limited (50-1500 Hz) Gaussian noise, i.e. noise that overlaps all four bio-acoustic bands
        w = np.fft.rfft(rng.normal(0, 1, s.size)); fr = np.fft.rfftfreq(s.size, 1 / FS)
        w[(fr < 50) | (fr > 1500)] = 0; nz = np.fft.irfft(w, s.size)
        nz *= math.sqrt(np.mean(s ** 2) / 10 ** (snr_db / 10) / np.mean(nz ** 2))
        s = s + nz
    return s, f0

res = {}
# --- 0. equivalence check against the repository implementation on generated WAVs ---
diffs = []
for f0 in [150.0, 330.0, 610.0, 1000.0]:
    t = np.arange(int(1.5 * FS)) / FS
    v = 0.6 * np.sin(2 * np.pi * f0 * t) + 0.3 * np.sin(4 * np.pi * f0 * t) + 0.1 * np.sin(6 * np.pi * f0 * t)
    iv = np.clip((v * 30000).astype(int), -32768, 32767)
    fn = tempfile.mktemp(suffix=".wav")
    with wave.open(fn, "wb") as wf:
        wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(FS); wf.writeframes(iv.astype("<i2").tobytes())
    ref = extract_multiband_spectral_features(fn)
    mine = probe_features(iv / 32768.0)
    diffs.append(max(abs(ref[k] - mine[k]) / max(ref[k], 1e-9) for k in KEYS))
    os.remove(fn)
res["max_rel_diff_vs_repo_impl"] = float(max(diffs))

# --- 1. frequency sweep of a unit-amplitude tone (band response) ---
fsweep = np.arange(60, 1301, 2.0)
t = np.arange(FS) / FS
resp_probe = {k: [] for k in KEYS}; resp_fft = {k: [] for k in KEYS}
for f in fsweep:
    x = 0.5 * np.sin(2 * np.pi * f * t)
    a = probe_features(x); b = fft_features(x)
    for k in KEYS:
        resp_probe[k].append(a[k]); resp_fft[k].append(b[k])
# in-band ripple (max/min within band interior) for b2
def ripple_db(resp, k):
    lo, hi = BANDS[k]; m = (fsweep >= lo + 5) & (fsweep <= hi - 5)
    r = np.array(resp[k])[m]; return float(20 * np.log10(r.max() / max(r.min(), 1e-12)))
res["inband_ripple_dB_probe"] = {k: round(ripple_db(resp_probe, k), 1) for k in KEYS}
res["inband_ripple_dB_fft"] = {k: round(10 * np.log10(np.array(resp_fft[k])[(fsweep >= BANDS[k][0] + 5) & (fsweep <= BANDS[k][1] - 5)].max() /
                                                       np.array(resp_fft[k])[(fsweep >= BANDS[k][0] + 5) & (fsweep <= BANDS[k][1] - 5)].min()), 1) for k in KEYS}
# fraction of in-band tones whose own band is NOT the arg-max (probe vs fft)
def sweep_err(resp):
    err, tot = 0, 0
    for k, (lo, hi) in BANDS.items():
        m = (fsweep >= lo) & (fsweep <= hi)
        for i in np.where(m)[0]:
            tot += 1
            vals = {kk: resp[kk][i] for kk in KEYS}
            err += max(vals, key=vals.get) != k
    return err / tot
res["sweep_band_error_probe"] = round(sweep_err(resp_probe), 3)
res["sweep_band_error_fft"] = round(sweep_err(resp_fft), 3)

# --- 2. accuracy vs SNR (white Gaussian noise), 4 balanced classes ---
snrs = [30, 20, 10, 5, 0, -5, -10, -15]
NT = 60
acc = {"probe": [], "fft": []}
for snr in snrs:
    cp = cf = 0
    for k in KEYS:
        for _ in range(NT):
            x, _ = synth(k, snr_db=snr)
            cp += decide_probe(x) == k; cf += decide_fft(x) == k
    acc["probe"].append(cp / (4 * NT)); acc["fft"].append(cf / (4 * NT))
res["acc_vs_snr"] = {"snr_dB": snrs, **{k: [round(v, 3) for v in vals] for k, vals in acc.items()}}

# --- 3. accuracy vs input level (30 dB SNR) : absolute threshold sensitivity ---
levels_dbfs = [-6, -12, -18, -24, -30, -36, -42]
accl = {"probe": [], "fft": []}
for L in levels_dbfs:
    amp = 10 ** (L / 20)
    cp = cf = 0
    for k in KEYS:
        for _ in range(NT):
            x, _ = synth(k, amp=amp, snr_db=30)
            cp += decide_probe(x) == k; cf += decide_fft(x) == k
    accl["probe"].append(cp / (4 * NT)); accl["fft"].append(cf / (4 * NT))
res["acc_vs_level"] = {"level_dBFS": levels_dbfs, **{k: [round(v, 3) for v in vals] for k, vals in accl.items()}}

# --- 4. acoustic front-end design space ---
ds = []
for fs, N in [(2000, 256), (16000, 256), (16000, 2048), (4000, 512), (8000, 1024)]:
    df = fs / N
    row = {"fs_Hz": fs, "N": N, "df_Hz": round(df, 3), "nyquist_Hz": fs / 2, "frame_ms": round(1000 * N / fs, 1),
           "fft_buffer_kB": round(N * 4 * 2 / 1024, 1)}
    for k, (lo, hi) in BANDS.items():
        bins = [b for b in range(N // 2 + 1) if lo <= b * df <= hi]
        row[k + "_bins"] = len(bins) if hi < fs / 2 else f"{len(bins)} (aliased)" if lo < fs / 2 else "n/a"
    ds.append(row)
res["design_space"] = ds
json.dump(res, open(f"{OUT}/acoustic_robustness.json", "w"), indent=1)
print(json.dumps(res, indent=1))

# --- figure ---
fig, ax = plt.subplots(1, 3, figsize=(7.16, 2.2))
cols = {"b1_vent": "#2e7d32", "b2_swarm": "#1f4e79", "b3_distress": "#c00000", "b4_noise": "#7f7f7f"}
for k in KEYS:
    rp = np.array(resp_probe[k]); rf = np.array(resp_fft[k])
    ax[0].plot(fsweep, 20 * np.log10(rp / rp.max() + 1e-6), color=cols[k], lw=0.7)
    ax[0].plot(fsweep, 10 * np.log10(rf / rf.max() + 1e-9), color=cols[k], lw=1.2, ls="--", alpha=.8)
for k, (lo, hi) in BANDS.items():
    ax[0].axvspan(lo, hi, color=cols[k], alpha=.07, lw=0)
ax[0].set_ylim(-40, 3); ax[0].set_xlim(60, 1300)
ax[0].set_xlabel("Tone frequency [Hz]"); ax[0].set_ylabel("Normalised band response [dB]")
ax[0].plot([], [], "k-", lw=.7, label="DFT probes (repo)"); ax[0].plot([], [], "k--", lw=1.2, label="Hann FFT integration")
ax[0].legend(fontsize=5.8, frameon=True, framealpha=0.92, edgecolor="none", loc="lower center")
ax[0].set_title("(a) Band response to a pure tone", fontsize=8)
ax[1].plot(snrs, np.array(acc["probe"]) * 100, "s-", ms=3, lw=1, color="#c55a11", label="DFT probes (repo)")
ax[1].plot(snrs, np.array(acc["fft"]) * 100, "o-", ms=3, lw=1, color="#1f4e79", label="Hann FFT integration")
ax[1].invert_xaxis(); ax[1].set_ylim(0, 102); ax[1].axhline(25, color="k", ls=":", lw=.6)
ax[1].set_xlabel("SNR [dB]"); ax[1].set_ylabel("Dominant-band accuracy [%]")
ax[1].legend(fontsize=6, frameon=False, loc="lower left"); ax[1].grid(alpha=.3, lw=.4)
ax[1].set_title("(b) Band-limited noise (50-1500 Hz)", fontsize=8)
ax[2].plot(levels_dbfs, np.array(accl["probe"]) * 100, "s-", ms=3, lw=1, color="#c55a11", label="DFT probes (repo)")
ax[2].plot(levels_dbfs, np.array(accl["fft"]) * 100, "o-", ms=3, lw=1, color="#1f4e79", label="Hann FFT integration")
ax[2].set_ylim(0, 102); ax[2].axhline(25, color="k", ls=":", lw=.6); ax[2].invert_xaxis()
ax[2].set_xlabel("Input level [dBFS], SNR 30 dB"); ax[2].set_ylabel("Dominant-band accuracy [%]")
ax[2].legend(fontsize=6, frameon=False, loc="lower left"); ax[2].grid(alpha=.3, lw=.4)
ax[2].set_title("(c) Microphone gain sensitivity", fontsize=8)
fig.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig_acoustic.pdf"); fig.savefig(f"{OUT}/fig_acoustic.png", dpi=200)
