"""Aggregate repeated gateway benchmark runs: median and range of throughput and latency percentiles."""
import sys, json, glob, statistics as st
files = sorted(glob.glob(sys.argv[1]))
runs = [json.load(open(f)) for f in files]
summary = {"n_runs": len(runs)}
for k in ["throughput_pps", "lat_mean_ms", "lat_p50_ms", "lat_p95_ms", "lat_p99_ms"]:
    v = [r[k] for r in runs]
    summary[k] = {"median": st.median(v), "min": min(v), "max": max(v), "runs": v}
summary["diagnoses_run1"] = runs[0]["diagnoses"]
json.dump(summary, open(sys.argv[2], "w"), indent=1)
print(json.dumps(summary, indent=1))
