# BEEVIL KNIEVEL — FIGURE RENDERERS & RENDERING ENGINE SELECTION

**Standard:** IEEE HART / Deterministic Engineering Visualization  
**Requirement:** Section 10 of Master Production Loop  

---

## 1. Renderer Selection Philosophy

In accordance with Section 10 of the Master Loop:
- **Renderer follows the engineering question.**
- **Generative AI is NOT used as an engineering figure renderer.** Generative AI produces hallucinated geometries, floating nonsense connections, unreadable text, and fake circuit traces.
- **Deterministic Code-Driven Renderers** guarantee exact pixel-perfect reproduction, version-controlled source code, scalable vector output (SVG/PDF), and 100% alignment with the underlying codebase.

---

## 2. Rendering Engine Matrix

| Category | Engineering Question | Designated Renderer | Source File | Output Format | Justification |
|---|---|---|---|---|---|
| **System Architecture** | Subsystem interconnection, data flows | Deterministic Python SVG Script | `scripts/generate_publication_diagrams.py` | SVG (Vector) | Exact vector alignment, zero text overlap, crisp typography, clean publication style. |
| **Circuit Schematics** | Component pinouts, bus wiring | KiCad / Open Technical Vector SVG | `hardware/BOM_AND_PINOUT.md` | SVG / KiCad Sch | Solder-level electrical accuracy, verifiable pin numbers and net labels. |
| **Physical Enclosure CAD** | 3D mechanical enclosure, gasket, mounting | OpenSCAD 3D Parametric CAD | `hardware/enclosure/hive_node_enclosure.scad` | .scad -> STL / SVG | Parametric dimensioning, direct 3D printing reproducibility. |
| **DSP Pipeline** | Audio sampling, windowing, 256-pt FFT | Python Matplotlib / Vector SVG | `simulation/models/fft_validation.py` | SVG / PNG | Mathematical fidelity, exact frequency bin spacing (7.81 Hz). |
| **Simulations & Results** | RF link budget, thermal, power, CUSUM | Python (NumPy, SciPy, Matplotlib) | `simulation/models/*.py` | High-DPI PNG (Vector PDF compatible)| Direct calculation from closed-form physical equations and calibrated data. |
| **Electromagnetic & Thermal Ansys** | RF S11 antenna return loss, Gateway CFD | Ansys PyAEDT (HFSS, Icepak, Maxwell) | `hardware/simulations/*.py` | High-Resolution Solver Plots | Certified finite-element and CFD numerical simulation outputs. |
| **Field / Biological Grounding** | Real hive context, capped brood cells | Calibrated High-Res Camera / Field Photo | `docs/media/research/`, `docs/media/02-apiary-problem/` | JPG (Full Provenance) | Real physical grounding with USDA/Zenodo license attribution. |
