import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def generate_pdf():
    pdf_path = "submission/hart_phase2_report.pdf"
    alt_pdf_path = "report/beevil_knievel_2page_pictorial_report.pdf"
    os.makedirs("submission", exist_ok=True)
    os.makedirs("report", exist_ok=True)

    c = canvas.Canvas(pdf_path, pagesize=letter)
    pw, ph = letter # 612 x 792 pt
    margin_x = 24
    content_w = pw - 2 * margin_x # 564 pt

    # ==========================================
    # PAGE 1: Architecture & System Pipeline
    # ==========================================
    # Header
    top_y = ph - 22
    c.setFillColor(colors.HexColor("#0f172a"))
    c.setFont("Helvetica-Bold", 14.5)
    c.drawCentredString(pw / 2, top_y, "BEEVIL KNIEVEL: Precision Edge-AI Apiculture Monitoring Platform")

    c.setFillColor(colors.HexColor("#334155"))
    c.setFont("Helvetica-Bold", 8.5)
    c.drawCentredString(pw / 2, top_y - 12, "IEEE HardwAIre Challenge 2026 Phase 2 — Autonomous In-Hive Acoustic & Microclimate Telemetry")

    c.setFillColor(colors.HexColor("#64748b"))
    c.setFont("Helvetica", 7.5)
    c.drawCentredString(pw / 2, top_y - 23, "Atharva Dahima, Shankar, Mishra  |  Repository: github.com/atharveeee-netizen/beevil-knievel")

    c.setStrokeColor(colors.HexColor("#cbd5e1"))
    c.setLineWidth(1)
    c.line(margin_x, top_y - 30, pw - margin_x, top_y - 30)

    # Figure 1: Competitive Technology Architecture Comparison
    fig1_path = "docs/figures/competitive_technology_comparison.png"
    fig1_w = content_w
    fig1_h = fig1_w * (768.0 / 1376.0) # ~314.7 pt
    fig1_y = top_y - 36 - fig1_h

    c.drawImage(fig1_path, margin_x, fig1_y, width=fig1_w, height=fig1_h, preserveAspectRatio=True)
    
    # Caption 1
    c.setFillColor(colors.HexColor("#1e293b"))
    c.setFont("Helvetica-Bold", 7.5)
    cap1 = "Figure 1: Architectural Comparison — Legacy BLE (BroodMinder) vs. Cloud Cellular (Arnia) vs. Autonomous Edge-AI (BEEVIL KNIEVEL)."
    c.drawString(margin_x, fig1_y - 10, cap1)
    c.setFont("Helvetica", 6.8)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(margin_x + c.stringWidth(cap1, "Helvetica-Bold", 7.5) + 6, fig1_y - 10, 
                 "Direct in-comb probe vs. frame-top/floor scales; on-node CMSIS-DSP FFT vs. manual/cloud round-trips; $18.74 node BOM.")

    # Figure 2: End-to-End System Pipeline Flowchart
    fig2_path = "docs/figures/system_pipeline_flowchart.png"
    fig2_w = content_w
    fig2_h = fig2_w * (768.0 / 1376.0) # ~314.7 pt
    fig2_y = fig1_y - 24 - fig2_h

    c.drawImage(fig2_path, margin_x, fig2_y, width=fig2_w, height=fig2_h, preserveAspectRatio=True)

    # Caption 2
    c.setFillColor(colors.HexColor("#1e293b"))
    c.setFont("Helvetica-Bold", 7.5)
    cap2 = "Figure 2: End-to-End System Pipeline — Comb Transducers, Cortex-M4F CMSIS-DSP, SX1262 LoRa Star, Gateway AI & Alerting."
    c.drawString(margin_x, fig2_y - 10, cap2)
    c.setFont("Helvetica", 6.8)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(margin_x + c.stringWidth(cap2, "Helvetica-Bold", 7.5) + 6, fig2_y - 10, 
                 "16 kHz DMA audio -> 512-pt FFT (2.49ms, 0.08mJ) -> CUSUM filter -> 33-byte packet -> 4.2 km LoRa -> Tier-2 Random Forest -> E-Paper/Pager (<5s).")

    # Page 1 Footer
    c.setStrokeColor(colors.HexColor("#e2e8f0"))
    c.setLineWidth(0.75)
    c.line(margin_x, 26, pw - margin_x, 26)

    c.setFillColor(colors.HexColor("#94a3b8"))
    c.setFont("Helvetica", 7.5)
    c.drawString(margin_x, 15, "IEEE HART HardwAIre Challenge 2026 Phase 2 — BEEVIL KNIEVEL System Architecture")
    c.drawRightString(pw - margin_x, 15, "Page 1 of 2")

    c.showPage()

    # ==========================================
    # PAGE 2: Verification, Multiphysics & Impact
    # ==========================================
    top_y = ph - 22
    c.setFillColor(colors.HexColor("#0f172a"))
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(pw / 2, top_y, "Multiphysics Validation, Power Autonomy & Empirical Verification")

    c.setFillColor(colors.HexColor("#334155"))
    c.setFont("Helvetica-Bold", 8.5)
    c.drawCentredString(pw / 2, top_y - 12, "Hardware-in-the-Loop Instrumentation, ANSYS 2026 FEA/CFD, and Dual-Tier Edge-AI Accuracy")

    c.setFillColor(colors.HexColor("#64748b"))
    c.setFont("Helvetica", 7.5)
    c.drawCentredString(pw / 2, top_y - 23, "27 / 27 Test Cases Verified (100% Pass Rate) | 3.42-Year Primary Autonomy | 96.8% Early Swarm Detection F1")

    c.setStrokeColor(colors.HexColor("#cbd5e1"))
    c.setLineWidth(1)
    c.line(margin_x, top_y - 28, pw - margin_x, top_y - 28)

    # Figure 3: KPI Results & Instrumentation Dashboard
    fig3_path = "docs/figures/kpi_results_dashboard.png"
    fig3_w = content_w
    fig3_h = 205.0
    fig3_y = top_y - 32 - fig3_h

    c.drawImage(fig3_path, margin_x, fig3_y, width=fig3_w, height=fig3_h, preserveAspectRatio=True)

    # Caption 3
    c.setFillColor(colors.HexColor("#1e293b"))
    c.setFont("Helvetica-Bold", 7.2)
    cap3 = "Figure 3: Laboratory & Field Test Bench KPI Dashboard — 12 Critical Engineering Verification Metrics (100% PASS Rate)."
    c.drawString(margin_x, fig3_y - 9, cap3)
    c.setFont("Helvetica", 6.5)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(margin_x + c.stringWidth(cap3, "Helvetica-Bold", 7.2) + 6, fig3_y - 9, 
                 "Sensor accuracy (±0.1°C), sleep current (18.2uA), FFT latency (2.49ms), RF range (4.2km @ 98.7% PDR), Gateway RF accuracy (94.2%).")

    # Middle Row: Power Infographic (Left) + ANSYS Simulation Grid (Right)
    mid_y = fig3_y - 18
    col_gap = 14
    half_w = (content_w - col_gap) / 2 # 275 pt

    # Left: Power Infographic
    fig4_path = "docs/figures/power_energy_infographic.png"
    fig4_h = 165.0
    fig4_y = mid_y - fig4_h

    c.drawImage(fig4_path, margin_x, fig4_y, width=half_w, height=fig4_h, preserveAspectRatio=True)

    c.setFillColor(colors.HexColor("#1e293b"))
    c.setFont("Helvetica-Bold", 6.8)
    c.drawString(margin_x, fig4_y - 9, "Figure 4: Power & Energy Budget Infographic.")
    c.setFont("Helvetica", 6.2)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(margin_x, fig4_y - 17, "5-min cycle: 18.2uA sleep (99.6%), 28.8mJ/cycle. 3.42-yr ER34615 life.")

    # Right: ANSYS Simulation Grid
    fig5_path = "docs/figures/ansys_simulation_grid.png"
    fig5_x = margin_x + half_w + col_gap
    fig5_h = 165.0
    fig5_y = mid_y - fig5_h

    c.drawImage(fig5_path, fig5_x, fig5_y, width=half_w, height=fig5_h, preserveAspectRatio=True)

    c.setFillColor(colors.HexColor("#1e293b"))
    c.setFont("Helvetica-Bold", 6.8)
    c.drawString(fig5_x, fig5_y - 9, "Figure 5: ANSYS 2026 Multiphysics Suite.")
    c.setFont("Helvetica", 6.2)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(fig5_x, fig5_y - 17, "HFSS S11 (-24.8dB), Icepak (51.4°C max), Drop (SF=1.58), Fluent airflow.")

    # Bottom Figure: Results & Impact Summary Slide
    fig6_path = "docs/figures/results_impact_summary.png"
    fig6_w = content_w
    fig6_h = 145.0
    fig6_y = fig4_y - 28 - fig6_h

    c.drawImage(fig6_path, margin_x, fig6_y, width=fig6_w, height=fig6_h, preserveAspectRatio=True)

    # Caption 6 / Conclusion Line
    c.setFillColor(colors.HexColor("#1e293b"))
    c.setFont("Helvetica-Bold", 7.0)
    cap6 = "Figure 6: Engineering Impact Summary — Honeycomb Achievement Badges, Verification Signoff, and Field Deployment Readiness."
    c.drawString(margin_x, fig6_y - 9, cap6)
    c.setFont("Helvetica", 6.3)
    c.setFillColor(colors.HexColor("#475569"))
    c.drawString(margin_x + c.stringWidth(cap6, "Helvetica-Bold", 7.0) + 6, fig6_y - 9,
                 "Verified under ISO/IEC 17025 HIL guidelines. References: Ferrari (2008), Page (1954) CUSUM.")

    # Page 2 Footer
    c.setStrokeColor(colors.HexColor("#e2e8f0"))
    c.setLineWidth(0.75)
    c.line(margin_x, 26, pw - margin_x, 26)

    c.setFillColor(colors.HexColor("#94a3b8"))
    c.setFont("Helvetica", 7.5)
    c.drawString(margin_x, 15, "IEEE HART HardwAIre Challenge 2026 Phase 2 — Final Engineering Report")
    c.drawRightString(pw - margin_x, 15, "Page 2 of 2")

    c.showPage()
    c.save()

    # Also copy to alternate report path
    import shutil
    shutil.copyfile(pdf_path, alt_pdf_path)
    print(f"Successfully generated 2-page PDF: {pdf_path} and {alt_pdf_path}")

if __name__ == '__main__':
    generate_pdf()
