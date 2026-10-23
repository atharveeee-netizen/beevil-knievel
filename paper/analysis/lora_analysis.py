"""LoRa PHY analysis for the 33-byte Beevil payload: airtime, ALOHA scaling and link budget."""
import sys, json, math
import numpy as np
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
OUT = sys.argv[1]
plt.rcParams.update({"font.family": "serif", "font.size": 8, "axes.linewidth": 0.6})

def toa(PL, SF, BW=125e3, CR=1, npre=8, IH=0, CRC=1):
    DE = 1 if (SF >= 11 and BW == 125e3) else 0
    Ts = 2 ** SF / BW
    n = 8 + max(math.ceil((8 * PL - 4 * SF + 28 + 16 * CRC - 20 * IH) / (4 * (SF - 2 * DE))) * (CR + 4), 0)
    return (npre + 4.25) * Ts + n * Ts, n

PL = 33
SFS = [7, 8, 9, 10, 11, 12]
NF, BWdB = 6.0, 10 * math.log10(125e3)
SNRlim = {7: -7.5, 8: -10, 9: -12.5, 10: -15, 11: -17.5, 12: -20}
sens = {sf: -174 + BWdB + NF + SNRlim[sf] for sf in SFS}
# Link-budget assumptions (Table in paper)
Pt, Gt, Ltx, Lhive, Gr, Lrx, M = 14.0, 2.15, 0.5, 8.7, 3.0, 1.0, 15.0
f_mhz, lam = 865.0625, 3e8 / 865.0625e6
ht, hr = 0.5, 4.0
dbp = 4 * math.pi * ht * hr / lam

def fspl(d): return 20 * np.log10(d) + 20 * math.log10(f_mhz) - 27.55
def two_ray(d):
    d = np.asarray(d, float)
    return np.where(d < dbp, fspl(d), 40 * np.log10(d) - 20 * math.log10(ht) - 20 * math.log10(hr))
def weissberger(df, fghz=f_mhz / 1e3):
    df = np.asarray(df, float)
    return np.where(df <= 14, 0.45 * fghz ** 0.284 * df, 1.33 * fghz ** 0.284 * df ** 0.588)

budget = Pt + Gt - Ltx - Lhive + Gr - Lrx  # dBm at receiver before path loss
res = {"budget_dBm_before_PL": budget, "breakpoint_m": dbp, "sens": sens, "rows": []}
d = np.logspace(1, 5, 4000)
Lfol = float(weissberger(50.0))
res["foliage_50m_dB"] = Lfol
T, I_TX, V = 300.0, 92e-3, 3.3
for sf in SFS:
    t, n = toa(PL, sf)
    allow = budget - sens[sf] - M
    r_fs = d[fspl(d) <= allow].max() if (fspl(d) <= allow).any() else 0
    r_2r = d[two_ray(d) <= allow].max()
    r_2rf = d[two_ray(d) + Lfol <= allow].max()
    G1 = 99 * t / T  # offered load seen by one packet: N-1 = 99 other nodes
    res["rows"].append({"SF": sf, "symbols_payload": n, "ToA_ms": round(t * 1e3, 2),
                        "sens_dBm": round(sens[sf], 1), "allowed_PL_dB": round(allow, 1),
                        "range_FSPL_km": round(r_fs / 1e3, 1), "range_2ray_km": round(r_2r / 1e3, 2),
                        "range_2ray_fol50_km": round(r_2rf / 1e3, 2),
                        "E_tx_mJ": round(I_TX * V * t * 1e3, 1), "node_duty_pct": round(100 * t / T, 4),
                        "PDR100_1ch": round(math.exp(-2 * G1), 4), "PDR100_3ch": round(math.exp(-2 * G1 / 3), 4),
                        "Nmax_99pct_1ch": int(math.floor(-math.log(0.99) / 2 * T / t)) + 1,
                        "Nmax_99pct_3ch": int(math.floor(3 * -math.log(0.99) / 2 * T / t)) + 1})

# Monte-Carlo check of pure-ALOHA for SF7, N=100, single channel (unsynchronised periodic nodes, +/-10% jitter)
rng = np.random.default_rng(5)
t7 = toa(PL, 7)[0]
def mc_pdr(N, toa_s, hours=24, jitter=0.1, chans=1):
    starts, ch = [], []
    for i in range(N):
        t0 = rng.uniform(0, T); tt = [t0]
        while tt[-1] < hours * 3600: tt.append(tt[-1] + T * (1 + rng.uniform(-jitter, jitter)))
        starts += tt; ch += list(rng.integers(0, chans, len(tt)))
    s = np.array(starts); c = np.array(ch); o = np.argsort(s); s, c = s[o], c[o]
    ok = 0
    for k in range(len(s)):
        lo, hi = k, k
        coll = False
        j = k - 1
        while j >= 0 and s[k] - s[j] < toa_s:
            if c[j] == c[k]: coll = True; break
            j -= 1
        j = k + 1
        while not coll and j < len(s) and s[j] - s[k] < toa_s:
            if c[j] == c[k]: coll = True; break
            j += 1
        ok += not coll
    return ok / len(s)
res["mc_SF7_N100_1ch"] = round(mc_pdr(100, t7), 4)
res["mc_SF7_N100_3ch"] = round(mc_pdr(100, t7, chans=3), 4)
res["mc_SF10_N100_1ch"] = round(mc_pdr(100, toa(PL, 10)[0]), 4)
json.dump(res, open(f"{OUT}/lora_analysis.json", "w"), indent=1)
print(json.dumps(res, indent=1))

# ---------------- figure ----------------
fig, ax = plt.subplots(1, 3, figsize=(7.16, 2.2))
pls = np.arange(1, 65)
cols = plt.cm.viridis(np.linspace(0, .85, len(SFS)))
for sf, c in zip(SFS, cols):
    ax[0].semilogy(pls, [toa(p, sf)[0] * 1e3 for p in pls], color=c, lw=1, label=f"SF{sf}")
    ax[0].plot(33, toa(33, sf)[0] * 1e3, "o", ms=2.5, color=c)
ax[0].axvline(33, color="k", ls=":", lw=.7)
ax[0].text(34.5, 16, "33-B payload", fontsize=6)
ax[0].set_xlabel("PHY payload [bytes]"); ax[0].set_ylabel("Time on air [ms]")
ax[0].set_ylim(12, 9000)
ax[0].legend(fontsize=5.8, ncol=3, frameon=False, loc="upper left", columnspacing=0.8, handlelength=1.2)
ax[0].grid(alpha=.3, lw=.4, which="both")
ax[0].set_title("(a) Airtime, BW 125 kHz, CR 4/5", fontsize=8)
N = np.arange(1, 1001)
for sf, c in zip([7, 9, 10, 12], [cols[0], cols[2], cols[3], cols[5]]):
    t = toa(PL, sf)[0]
    ax[1].semilogx(N, 100 * np.exp(-2 * (N - 1) * t / T), color=c, lw=1, label=f"SF{sf}, 1 ch")
    ax[1].semilogx(N, 100 * np.exp(-2 * (N - 1) * t / T / 3), color=c, lw=1, ls="--")
ax[1].axhline(99, color="k", ls=":", lw=.7); ax[1].axvline(100, color="gray", ls=":", lw=.7)
ax[1].plot([100], [100 * res["mc_SF7_N100_1ch"]], "kx", ms=4, label="Monte-Carlo")
ax[1].set_ylim(60, 100.5); ax[1].set_xlabel("Hives per gateway"); ax[1].set_ylabel("Packet delivery [%]")
ax[1].legend(fontsize=5.8, frameon=False, loc="lower left"); ax[1].grid(alpha=.3, lw=.4, which="both")
ax[1].set_title("(b) Pure-ALOHA PDR, $T$=300 s (-- 3 ch)", fontsize=8)
dd = np.logspace(1.3, 4.5, 500)
ax[2].semilogx(dd / 1e3, budget - fspl(dd), color="#2e7d32", lw=1, label="Free space")
ax[2].semilogx(dd / 1e3, budget - two_ray(dd), color="#1f4e79", lw=1, label="Two-ray ($h_t$=0.5, $h_r$=4 m)")
ax[2].semilogx(dd / 1e3, budget - two_ray(dd) - Lfol, color="#c00000", lw=1, label="Two-ray + 50 m foliage")
for sf, ls in [(7, "--"), (12, ":")]:
    ax[2].axhline(sens[sf] + M, color="k", ls=ls, lw=.7)
    ax[2].text(0.022, sens[sf] + M + 1.5, f"SF{sf} sens.+{M:.0f} dB", fontsize=5.8)
ax[2].set_xlabel("Distance [km]"); ax[2].set_ylabel("Received power [dBm]")
ax[2].set_ylim(-140, -40); ax[2].legend(fontsize=5.8, frameon=False, loc="upper right"); ax[2].grid(alpha=.3, lw=.4, which="both")
ax[2].set_title("(c) Link budget at 865 MHz", fontsize=8)
fig.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig_lora.pdf"); fig.savefig(f"{OUT}/fig_lora.png", dpi=200)
