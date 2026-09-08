# 🐝 BEEVIL KNIEVEL — Project Migration & Reconstruction Manual
### Master Autonomous System Portable Deployment Guide

> **This document explains how to take this drive to ANY other computer (Windows, Linux, or macOS) and fully reconstruct, run, build, or continue developing the BEEVIL KNIEVEL system and SYZYGY multi-agent framework.**

---

## 📁 What Is On This Drive (`E:\`)

| Directory / File | Description |
|---|---|
| **`E:\BEEVIL_KNIEVEL_FULL_PROJECT_BACKUP\beevil-knievel\`** | Complete project codebase, firmware, frontend, Python tools, MATLAB models, and ANSYS FEA/CFD files. |
| **`E:\BEEVIL_KNIEVEL_FULL_PROJECT_BACKUP\chat_history_and_transcripts\`** | Full conversation memory, step-by-step thinking logs, scratchpad notes, JSONL transcripts, and generated media artifacts. |
| **`E:\SYZYGY_FRAMEWORK\`** | Complete SYZYGY Multi-Agent Framework repository, CLI (`syzygy.py`), core orchestrator modules, and specifications. |
| **`E:\SYZYGY_FRAMEWORK\docs\CANONICAL_IMAGE_GENERATION_HARNESS.md`** | The exact technical image generation harness that produced all publication-grade figures. |
| **`E:\SYZYGY_FRAMEWORK\agent_skills\`** | Exported specialized skills (66 Agentic Patterns, Firecrawl Research Index, Creative Dev Tools, Technical Copywriter). |
| **`E:\SYZYGY_FRAMEWORK\syzygy_memory.db`** | SQLite persistent memory checkpoint containing project topology and state. |

---

## 🚀 How to Reconstruct & Run on a New Computer

### Step 1: Copy to Your Workspace
Copy `BEEVIL_KNIEVEL_FULL_PROJECT_BACKUP\beevil-knievel` to your local drive (e.g. `C:\projects\beevil-knievel` or `~/projects/beevil-knievel`).

### Step 2: Set Up Python Environment
```bash
cd beevil-knievel
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
pip install reportlab pymupdf pillow opencv-python imageio imageio-ffmpeg matplotlib
```

### Step 3: Run the Verification Test Suite
```bash
# Verify all 27 engineering tests
pytest tests/ -v

# Run full gateway pipeline test (100 simulated hives)
python tests/test_full_gateway_pipeline.py

# Run TinyML acoustic stress test (30 audio samples)
python "TinyML Model/run_stress_test_benchmark.py"
```

### Step 4: Recompile the 2-Page Official Report PDF
```bash
python scripts/build_2page_pictorial_report.py
```
* Generates: `submission/hart_phase2_report.pdf` (Strictly 2 pages, 90% visual diagrams, zero text walls).

### Step 5: Render the Master 33.6-Second Video Presentation
```bash
python scripts/build_problem_statement_video.py
```
* Generates:
  1. `docs/media/video/01_problem_statement_master_with_voiceover.mp4` (Full narrated master with HUD telemetry)
  2. `docs/media/video/01_problem_statement_presentation_muted.mp4` (Muted for live speech)

### Step 6: Launch the Frontend Web Dashboards
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000 to view:
# - /app (Main Dashboard)
# - /field (Technician PWA)
# - /console (Panic Playdate 1-Bit Mode)
```

---

## 🎨 The Canonical Image Generation Harness

When generating any future architecture figures or schematics, use the **SYZYGY Canonical Image Harness**:
1. **Engine:** DeepMind Imagen 3 (`gemini-3.1-flash-image` via `generate_image`).
2. **Conditioning:** Pass `docs/figures/hardware_wiring_architecture.png` into `ImagePaths`.
3. **Mandatory Rules:**
   * **Pure White Canvas (`#ffffff`):** No dark mode gradients or glowing lens flares.
   * **Physical Silicon BOM Anchoring:** Explicitly specify `nRF52840 Cortex-M4F`, `SX1262 LoRa`, `Dual SHT40`, `I2S MEMS mic`, `Raspberry Pi 3B+`, `ER34615 Li-SOCl2`.
   * **Strict Zero-Text-Wall:** No paragraphs and no bullet point lists. Use component blocks, signal paths, byte division packets, and dial meters with green `[PASS]` badges.
   * **Simulation Truth:** Composite real ANSYS/MATLAB outputs deterministically via Python PIL/Matplotlib.

---

## 🧠 Memory & Project Context

All conversation decisions, architecture choices, and rationale are permanently preserved:
* Conversation transcripts: `E:\BEEVIL_KNIEVEL_FULL_PROJECT_BACKUP\chat_history_and_transcripts\`
* Project specifications: `beevil-knievel/.spec/` (`PRD.md`, `TechSpec.md`, `Architecture.md`, `Rules.md`, `Tracker.md`)
* SYZYGY memory database: `E:\SYZYGY_FRAMEWORK\syzygy_memory.db`

*Created: September 2026 | IEEE HART HardwAIre Challenge Phase 2 | Team BEEVIL KNIEVEL*
