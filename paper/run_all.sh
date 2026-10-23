#!/usr/bin/env bash
# Regenerates every analysis figure and result file used in paper/main.tex.
# Run from the repository root:   bash paper/run_all.sh
# Requirements: Python 3.10+, numpy, scipy, matplotlib, pandas, scikit-learn, joblib,
#               fastapi, uvicorn, httpx, pydantic, pytest, Pillow  (+ LaTeX for the PDF)
set -euo pipefail
REPO="$(pwd)"
OUT="$REPO/paper/figs"
RES="$REPO/paper/results"
mkdir -p "$OUT" "$RES"

echo "[1/9] Repository test suite"
python -m pytest tests/ -q

echo "[2/9] Radio analysis (airtime, ALOHA, link budget)"
python paper/analysis/lora_analysis.py "$OUT" > /dev/null

echo "[3/9] Node energy budget"
python paper/analysis/energy_budget.py "$OUT" > /dev/null

echo "[4/9] CUSUM Monte-Carlo"
python paper/analysis/cusum_mc.py "$OUT" > /dev/null

echo "[5/9] Acoustic robustness audit"
python paper/analysis/acoustic_robustness.py "$REPO" "$OUT" > /dev/null

echo "[6/9] Advisory Random-Forest evaluation"
python paper/analysis/rf_eval.py "$REPO" "$OUT" > /dev/null 2>&1

echo "[7/9] Cross-tier alert-flag check"
python paper/analysis/flag_collision_check.py "$REPO" "$OUT/flag_collision.json" > /dev/null 2>&1

echo "[8/9] Gateway ingestion benchmark: 5 runs x 1000 frames, fresh DEMO database each run"
for i in 1 2 3 4 5; do
  TMPDB="$(mktemp -d)/bench.db"
  BEEVIL_DB_PATH="$TMPDB" BEEVIL_DEMO_MODE=true \
    python -m uvicorn gateway.server:app --host 127.0.0.1 --port 8000 --log-level warning > /dev/null 2>&1 &
  UV_PID=$!
  sleep 6
  python paper/analysis/gateway_bench.py "$REPO" 10 "$OUT/gateway_bench_run$i.json" > /dev/null
  kill $UV_PID || true; wait $UV_PID 2>/dev/null || true; sleep 1
done
python paper/analysis/aggregate_bench.py "$OUT/gateway_bench_run*.json" "$OUT/gateway_bench_summary.json"

echo "[9/9] Figure panels from repository images (ANSYS screenshots, photos, UI, model plots)"
python paper/analysis/ansys_crops.py "$REPO" "$OUT"
python paper/analysis/prepare_repo_figures.py "$REPO" "$OUT"

mv "$OUT"/*.json "$RES"/
echo "Done. Figures in paper/figs, numbers in paper/results."
echo "Build the PDF with:  cd paper && latexmk -pdf main.tex"
