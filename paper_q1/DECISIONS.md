# Q1 Journal Transformation: Architecture & Research Decisions Log

This document records every scientific, architectural, and engineering decision made during the transformation of the repository into a Q1 journal submission, including the rationale and considered alternatives.

---

## Decision Index

| ID | Date | Topic | Decision | Rationale | Alternatives Rejected |
|---|---|---|---|---|---|
| DEC-001 | 2026-10-23 | Target Journal | Primary: Elsevier *Computers and Electronics in Agriculture* (COMPAG). Secondary: *IEEE Internet of Things Journal* or *Smart Agricultural Technology*. | High-impact Q1 agriculture/computing venue with rigorous standards for cyber-physical field hardware and dataset leakage control. | MDPI Sensors (lower archival tier), Pure ML conference (does not value edge cyber-physical and LoRa telemetry contributions). |
| DEC-002 | 2026-10-23 | Field Deployment Claims | Strictly 0 field deployment claims. System evaluated via real public field datasets (D1–D4), bench hardware-in-the-loop (HIL) measurements on real node/gateway, and clearly labelled analytical models. | Adheres strictly to scientific integrity; no apiary deployment was conducted by the authors. | Simulating or exaggerating in-hive deployment (unethical, grounds for immediate rejection). |
| DEC-003 | 2026-10-23 | Branching & Git History | Dedicated branch `q1-journal` without force-pushes or history rewriting. Original files moved to `archive/` rather than deleted. | Protects git provenance and allows reviewers/collaborators to inspect full evolution. | Direct mutation of main without preserving audit trails. |
| DEC-004 | 2026-10-23 | Execution Entrypoint | Single unified entrypoint: `python -m paper_q1.run <step>` implemented with `pathlib` for cross-platform Linux & Windows PowerShell compatibility. | Prevents broken OS-specific bash scripts and provides deterministic workflow. | Bash-only scripts, disparate one-off scripts scattered in subdirectories. |
| DEC-005 | 2026-10-23 | Wire Protocol Frame v2 | Extend payload to 36 bytes with dedicated `uint8_t flags` and `uint16_t seq`. | Resolves alert-flag bit collision where high-nibble alert bits in tilt caused false theft alerts and gateway frame drops. 36 bytes preserves 77.06 ms airtime at SF7/BW125/CR4/5. | Keeping 33-byte frame with bit-packed collision; truncating FFT telemetry. |
| DEC-006 | 2026-10-23 | Python Environment | Use Python 3.12.4 with Anaconda runtime (`C:\ProgramData\anaconda3\python.exe`) which includes CUDA PyTorch, torchvision, scikit-learn, scipy. | Ensures existing high-performance dependencies and GPU support are maintained without environment re-installation overhead. | Creating fresh virtualenv without CUDA wheel availability. |
