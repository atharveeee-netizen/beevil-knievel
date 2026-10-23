"""Monte-Carlo characterisation of the on-node brood-cooling CUSUM detector.

Two detectors are compared:
  FW  : the variant implemented in firmware/src/main.cpp (baseline latched from the
        3rd sample, half-rate decay when the increment is negative), K=0.15, h=1.20
  PAGE: Page's one-sided lower CUSUM with known target mu0 = 34.82 C,
        S_k = max(0, S_{k-1} + (mu0 - T_k) - k)

Brood temperature model (5-min sampling, 288 samples/day):
  T_k = mu0 + A sin(2 pi t/24h) + e_k,  e_k AR(1) with stationary std sigma
"""
import sys, json
import numpy as np
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
OUT = sys.argv[1]
plt.rcParams.update({"font.family": "serif", "font.size": 8, "axes.linewidth": 0.6})
rng = np.random.default_rng(2026)
MU0, DT_MIN = 34.82, 5.0
SPD = int(24 * 60 / DT_MIN)  # samples per day

def gen(nrun, nsamp, sigma=0.15, phi=0.0, A=0.0, shift=None, t0=None, ramp=None):
    e = np.zeros((nrun, nsamp))
    w = rng.normal(0, sigma * np.sqrt(1 - phi ** 2), (nrun, nsamp))
    e[:, 0] = rng.normal(0, sigma, nrun)
    for t in range(1, nsamp):
        e[:, t] = phi * e[:, t - 1] + w[:, t]
    tt = np.arange(nsamp)
    ph = rng.uniform(0, 2 * np.pi, (nrun, 1))
    T = MU0 + A * np.sin(2 * np.pi * tt / SPD + ph) + e
    if shift is not None:
        T[:, t0:] -= shift
    if ramp is not None:  # degC per hour, starting at t0
        T[:, t0:] -= ramp * (np.arange(nsamp - t0) * DT_MIN / 60.0)
    return T

def run_page(T, k, h):
    S = np.zeros(T.shape[0]); first = np.full(T.shape[0], -1)
    for t in range(T.shape[1]):
        S = np.maximum(0, S + (MU0 - T[:, t]) - k)
        hit = (S >= h) & (first < 0); first[hit] = t
    return first

def run_fw(T, k, h):
    n = T.shape[0]; S = np.zeros(n); first = np.full(n, -1); base = np.zeros(n)
    for t in range(T.shape[1]):
        if t < 3:
            base = T[:, t].copy(); S[:] = 0; continue
        d = base - T[:, t] - k
        S = np.where(d > 0, S + d, np.maximum(0, S + 0.5 * d))
        hit = (S >= h) & (first < 0); first[hit] = t
    return first

res = {}
# ---------- in-control false-alarm behaviour (30-day horizon) ----------
NR, ND = 1000, 30
scen = {"iid": dict(phi=0.0, A=0.0), "AR1": dict(phi=0.9, A=0.0), "AR1+diurnal": dict(phi=0.9, A=0.2)}
ic = {}
for name, kw in scen.items():
    T = gen(NR, ND * SPD, **kw)
    out = {}
    for lab, fn, k, h in [("FW k=0.15 h=1.2", run_fw, 0.15, 1.2), ("PAGE k=0.15 h=1.2", run_page, 0.15, 1.2),
                          ("PAGE k=0.25 h=4", run_page, 0.25, 4.0), ("PAGE k=0.25 h=8", run_page, 0.25, 8.0)]:
        f = fn(T, k, h)
        fa30 = float(np.mean(f >= 0))
        med = float(np.median(np.where(f >= 0, f, ND * SPD))) / SPD
        out[lab] = {"P_false_alarm_30d": round(fa30, 3), "median_RL_days_censored30": round(med, 3)}
    ic[name] = out
res["in_control"] = ic

# ARL0 vs h (AR1+diurnal, censored at 60 days) for the design chart
hs = [1, 2, 4, 6, 8, 12, 16]
arl = {}
T = gen(400, 60 * SPD, phi=0.9, A=0.2)
for k in [0.15, 0.25, 0.35]:
    arl[k] = []
    for h in hs:
        f = run_page(T, k, h)
        rl = np.where(f >= 0, f, 60 * SPD) / SPD
        arl[k].append(float(np.mean(rl)))
res["ARL0_days_AR1_diurnal"] = {str(k): dict(zip(map(str, hs), np.round(v, 2).tolist())) for k, v in arl.items()}

# ---------- detection delay ----------
t0 = 2 * SPD
steps = [0.3, 0.5, 1.0, 2.0, 3.8]
dd = {}
for lab, fn, k, h in [("FW k=0.15 h=1.2", run_fw, 0.15, 1.2), ("PAGE k=0.25 h=8", run_page, 0.25, 8.0)]:
    rows = []
    for s in steps:
        T = gen(400, t0 + 3 * SPD, phi=0.9, A=0.2, shift=s, t0=t0)
        f = fn(T, k, h)
        valid = f >= t0
        delay_h = (f[valid] - t0 + 1) * DT_MIN / 60.0
        rows.append({"step_C": s, "pre_change_alarm_frac": round(float(np.mean((f >= 0) & (f < t0))), 3),
                     "detected_frac": round(float(np.mean(valid)), 3),
                     "median_delay_h": round(float(np.median(delay_h)), 2) if valid.any() else None})
    dd[lab] = rows
ramps = [0.02, 0.05, 0.1]
for lab, fn, k, h in [("FW k=0.15 h=1.2", run_fw, 0.15, 1.2), ("PAGE k=0.25 h=8", run_page, 0.25, 8.0)]:
    for r in ramps:
        T = gen(400, t0 + 5 * SPD, phi=0.9, A=0.2, ramp=r, t0=t0)
        f = fn(T, k, h); valid = f >= t0
        delay_h = (f[valid] - t0 + 1) * DT_MIN / 60.0
        dd[lab].append({"ramp_C_per_h": r, "pre_change_alarm_frac": round(float(np.mean((f >= 0) & (f < t0))), 3),
                        "median_delay_h": round(float(np.median(delay_h)), 2) if valid.any() else None,
                        "temp_drop_at_alarm_C": round(float(np.median(delay_h)) * r, 2) if valid.any() else None})
res["detection"] = dd
json.dump(res, open(f"{OUT}/cusum_mc.json", "w"), indent=1)
print(json.dumps(res, indent=1))

# ---------- figure ----------
fig, ax = plt.subplots(1, 3, figsize=(7.16, 2.2))
# (a) example trace: 2 days in-control then 0.05 C/h ramp
Tx = gen(1, 4 * SPD, phi=0.9, A=0.2, ramp=0.05, t0=2 * SPD)[0]
th = np.arange(Tx.size) * DT_MIN / 60
S1 = np.zeros_like(Tx); S2 = np.zeros_like(Tx)
for t in range(1, Tx.size):
    S2[t] = max(0, S2[t - 1] + (MU0 - Tx[t]) - 0.25)
base = Tx[2]
for t in range(3, Tx.size):
    d = base - Tx[t] - 0.15
    S1[t] = S1[t - 1] + d if d > 0 else max(0, S1[t - 1] + 0.5 * d)
ax[0].plot(th, Tx, lw=0.6, color="#444")
ax[0].axvline(48, color="k", ls=":", lw=0.7)
ax[0].set_xlabel("Time [h]"); ax[0].set_ylabel(r"$T_{\rm core}$ [$^\circ$C]")
a2 = ax[0].twinx()
a2.plot(th, S1, color="#c00000", lw=0.9, label="FW ($k$=0.15, $h$=1.2)")
a2.plot(th, S2, color="#1f4e79", lw=0.9, label="Page ($k$=0.25, $h$=8)")
a2.axhline(1.2, color="#c00000", ls="--", lw=0.6); a2.axhline(8, color="#1f4e79", ls="--", lw=0.6)
a2.set_ylim(0, 30); a2.set_ylabel(r"$S_k$ [$^\circ$C$\cdot$sample]")
a2.text(13, 27, "FW", color="#c00000", fontsize=7, fontweight="bold")
a2.text(60, 27, "Page", color="#1f4e79", fontsize=7, fontweight="bold")
ax[0].set_title("(a) 0.05$^\\circ$C/h cooling after 48 h", fontsize=8)
for k, c in zip([0.15, 0.25, 0.35], ["#c00000", "#1f4e79", "#2e7d32"]):
    ax[1].semilogy(hs, arl[k], "o-", ms=3, lw=1, color=c, label=f"$k$={k}")
ax[1].axhline(30, color="k", ls=":", lw=0.7)
ax[1].set_xlabel("Threshold $h$ [$^\\circ$C$\\cdot$sample]"); ax[1].set_ylabel("ARL$_0$ [days] (cens. 60 d)")
ax[1].legend(fontsize=6.5, frameon=False); ax[1].grid(alpha=.3, lw=.4, which="both")
ax[1].set_title("(b) In-control run length", fontsize=8)
for lab, c, mk in [("FW k=0.15 h=1.2", "#c00000", "s"), ("PAGE k=0.25 h=8", "#1f4e79", "o")]:
    xs = [r["step_C"] for r in dd[lab] if "step_C" in r and r["median_delay_h"] is not None]
    ys = [r["median_delay_h"] for r in dd[lab] if "step_C" in r and r["median_delay_h"] is not None]
    ax[2].semilogy(xs, ys, mk + "-", ms=3, lw=1, color=c, label=lab.replace("PAGE", "Page").replace("FW", "FW"))
ax[2].set_xlabel(r"Step cooling $\Delta$ [$^\circ$C]"); ax[2].set_ylabel("Median detection delay [h]")
ax[2].legend(fontsize=6, frameon=False); ax[2].grid(alpha=.3, lw=.4, which="both")
ax[2].set_title("(c) Out-of-control delay", fontsize=8)
fig.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig_cusum_mc.pdf"); fig.savefig(f"{OUT}/fig_cusum_mc.png", dpi=200)
