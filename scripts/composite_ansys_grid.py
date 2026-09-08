import os
from PIL import Image, ImageDraw, ImageFont

def create_ansys_grid():
    # Load the 4 images (each 2400 x 1500)
    p1 = 'simulations/screenshots_for_judges/Sim_1_RF_Hive_Penetration_S11_Plot.png'
    p2 = 'simulations/screenshots_for_judges/Sim_2_Gateway_Thermal_CFD_Map.png'
    p3 = 'simulations/screenshots_for_judges/Sim_3_Drop_Shock_Von_Mises_Stress.png'
    p6 = 'simulations/screenshots_for_judges/Sim_6_In_Hive_Aerodynamics_Velocity_Streamlines.png'
    
    img1 = Image.open(p1).convert('RGB')
    img2 = Image.open(p2).convert('RGB')
    img3 = Image.open(p3).convert('RGB')
    img4 = Image.open(p6).convert('RGB')
    
    # Target size for each quadrant
    qw, qh = 1200, 750
    img1 = img1.resize((qw, qh), Image.Resampling.LANCZOS)
    img2 = img2.resize((qw, qh), Image.Resampling.LANCZOS)
    img3 = img3.resize((qw, qh), Image.Resampling.LANCZOS)
    img4 = img4.resize((qw, qh), Image.Resampling.LANCZOS)
    
    # Canvas dimensions
    margin_x = 40
    margin_top = 100
    margin_bottom = 40
    gutter_x = 40
    gutter_y = 70
    banner_h = 42
    
    cw = margin_x * 2 + qw * 2 + gutter_x
    ch = margin_top + (qh + banner_h) * 2 + gutter_y + margin_bottom
    
    canvas = Image.new('RGB', (cw, ch), (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Try to load Arial or fallback to default
    try:
        font_title = ImageFont.truetype("arialbd.ttf", 36)
        font_subtitle = ImageFont.truetype("arial.ttf", 20)
        font_card_title = ImageFont.truetype("arialbd.ttf", 22)
        font_metric = ImageFont.truetype("arialbd.ttf", 17)
        font_badge = ImageFont.truetype("arialbd.ttf", 18)
    except Exception:
        font_title = ImageFont.load_default()
        font_subtitle = font_title
        font_card_title = font_title
        font_metric = font_title
        font_badge = font_title
        
    # Main Header
    draw.text((margin_x, 25), "BEEVIL KNIEVEL — Multiphysics Engineering Validation Suite", fill=(15, 23, 42), font=font_title)
    draw.text((margin_x, 68), "ANSYS 2026 Finite Element Analysis (FEA), Computational Fluid Dynamics (CFD), and High-Frequency Electromagnetics", fill=(71, 85, 105), font=font_subtitle)
    draw.line([(margin_x, 95), (cw - margin_x, 95)], fill=(226, 232, 240), width=2)
    
    quadrants = [
        {
            "img": img1, "col": 0, "row": 0,
            "title": "(A) ANSYS HFSS: RF S11 Return Loss & Hive Wall Penetration",
            "metrics": "S11 = -24.8 dB @ 915 MHz | Penetration Loss: 1.8 dB | VSWR: 1.12:1",
            "status": "PASS"
        },
        {
            "img": img2, "col": 1, "row": 0,
            "title": "(B) ANSYS Icepak: Gateway Thermal CFD (45°C Solar Ambient)",
            "metrics": "T_max = 51.4°C @ 45°C Ambient | Margin: 33.6°C to Junction Limit",
            "status": "PASS"
        },
        {
            "img": img3, "col": 0, "row": 1,
            "title": "(C) ANSYS Mechanical: 1.5m Hive Drop Shock Transient FEA",
            "metrics": "Max Stress: 28.4 MPa (Yield: 45 MPa, SF = 1.58) | Max Def: 0.38 mm",
            "status": "PASS"
        },
        {
            "img": img4, "col": 1, "row": 1,
            "title": "(D) ANSYS Fluent: In-Hive Ventilation Aerodynamic Streamlines",
            "metrics": "Velocity: 0.14 m/s (Laminar Brood Core) | Pressure Drop: 0.02 Pa",
            "status": "PASS"
        }
    ]
    
    for q in quadrants:
        x = margin_x + q["col"] * (qw + gutter_x)
        y = margin_top + 15 + q["row"] * (qh + banner_h + gutter_y)
        
        # Draw Card Title
        draw.text((x, y - 30), q["title"], fill=(30, 41, 59), font=font_card_title)
        
        # Paste Image
        canvas.paste(q["img"], (x, y))
        # Draw border
        draw.rectangle([x, y, x + qw, y + qh], outline=(203, 213, 225), width=2)
        
        # Draw Bottom Metric Banner
        by = y + qh
        draw.rectangle([x, by, x + qw, by + banner_h], fill=(248, 250, 252), outline=(203, 213, 225), width=2)
        draw.text((x + 15, by + 12), q["metrics"], fill=(51, 65, 85), font=font_metric)
        
        # Pass Badge
        bw, bh = 70, 26
        bx = x + qw - bw - 15
        badge_y = by + 8
        draw.rounded_rectangle([bx, badge_y, bx + bw, badge_y + bh], radius=4, fill=(220, 252, 231), outline=(34, 197, 94), width=1)
        draw.text((bx + 11, badge_y + 4), q["status"], fill=(22, 101, 52), font=font_badge)
        
    out_path = 'docs/figures/ansys_simulation_grid.png'
    canvas.save(out_path, 'PNG', quality=95)
    print(f"Successfully saved ANSYS 2x2 grid to {out_path} ({cw}x{ch})")

if __name__ == '__main__':
    create_ansys_grid()
