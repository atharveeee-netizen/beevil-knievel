import os
import cv2
import numpy as np
import imageio_ffmpeg
import subprocess
from PIL import Image, ImageDraw, ImageFont

def build_video():
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    out_dir = "docs/media/video"
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs("assets/video_sources/preview", exist_ok=True)

    # 7 Clips and their metadata
    shots = [
        {
            "path": "assets/video_sources/clips/SHOT-001_apiary_establishing.mp4",
            "title": "COMMERCIAL APICULTURE OBSERVABILITY GAP",
            "stat": "Global Crop Value at Risk: $17 Billion USD",
            "sub": "Honeybee pollination underpins billions of dollars in global agriculture."
        },
        {
            "path": "assets/video_sources/clips/SHOT-002_beekeeper_approach.mp4",
            "title": "DISCRETE 14–21 DAY INSPECTION BLINDSPOTS",
            "stat": "Annual Managed Colony Losses: 55.6% (USDA-ARS Survey)",
            "sub": "Yet commercial beekeepers lose nearly half their colonies each year."
        },
        {
            "path": "assets/video_sources/clips/SHOT-003_smoker.mp4",
            "title": "INVASIVE INTERVENTION: SMOKE & COLONY AGITATION",
            "stat": "Masks Alarm Pheromones | Disrupts 60,000 Honeybees",
            "sub": "Today, health monitoring relies on manual inspections spaced weeks apart."
        },
        {
            "path": "assets/video_sources/clips/SHOT-004_hive_opening.mp4",
            "title": "ACUTE THERMAL SHOCK: BROOD CHILLED BY UP TO -12°C",
            "stat": "Tears Protective Propolis Antimicrobial Seal",
            "sub": "Beekeepers have to suit up, smoke the colony, and physically open the hive."
        },
        {
            "path": "assets/video_sources/clips/SHOT-005_frame_removal.mp4",
            "title": "COMB INTEGRITY COMPROMISED: COLD AIR INTRUSION",
            "stat": "Larval Core Homeostasis Target: 34.5°C – 35.5°C",
            "sub": "Opening the hive chills the delicate brood nest by up to twelve degrees Celsius."
        },
        {
            "path": "assets/video_sources/clips/SHOT-006_frame_inspection.mp4",
            "title": "SILENT CATASTROPHES BETWEEN INSPECTION VISITS",
            "stat": "Narrow Swarming Window: 24–48 Hours | Undetected Queen Mortality",
            "sub": "It tears open the protective propolis seal and stresses sixty thousand bees."
        },
        {
            "path": "assets/video_sources/clips/SHOT-007_brood_closeup.mp4",
            "title": "LARVAL MORTALITY & SILENT COLONY COLLAPSE",
            "stat": "Brood Hypothermia Induces Irreversible Developmental Defects",
            "sub": "Crucial events like queen mortality or pre-swarming happen silently inside the dark comb."
        }
    ]

    # Target parameters
    fps = 24.0
    width = 1920
    height = 1080

    # Intermediate raw video output
    temp_raw_video = "assets/video_sources/temp_raw_composite.mp4"
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(temp_raw_video, fourcc, fps, (width, height))

    # Font handling with PIL
    try:
        font_header = ImageFont.truetype("arialbd.ttf", 26)
        font_title = ImageFont.truetype("arialbd.ttf", 36)
        font_stat = ImageFont.truetype("arialbd.ttf", 24)
        font_sub = ImageFont.truetype("arial.ttf", 28)
        font_timer = ImageFont.truetype("arialbd.ttf", 26)
    except Exception:
        font_header = ImageFont.load_default()
        font_title = font_header
        font_stat = font_header
        font_sub = font_header
        font_timer = font_header

    current_frame_idx = 0

    def draw_overlay(frame_bgr, title, stat, sub, frame_num, total_target_frames):
        # Convert BGR to RGB for PIL
        img_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(img_rgb)
        draw = ImageDraw.Draw(pil_img, "RGBA")

        # Top Header Bar
        draw.rectangle([(0, 0), (width, 65)], fill=(15, 23, 42, 210))
        draw.text((40, 18), "IEEE HARDWAIRE CHALLENGE 2026  |  BEEVIL KNIEVEL — 01: THE PROBLEM STATEMENT", 
                  fill=(248, 250, 252), font=font_header)

        # Elapsed Time Badge
        cur_sec = int(frame_num / fps)
        tot_sec = int(total_target_frames / fps)
        timer_str = f"00:{cur_sec:02d} / 00:{tot_sec:02d}"
        draw.text((width - 220, 18), timer_str, fill=(56, 189, 248), font=font_timer)

        # Bottom Lower-Third Banner
        banner_h = 175
        draw.rectangle([(0, height - banner_h), (width, height)], fill=(15, 23, 42, 225))
        draw.line([(0, height - banner_h), (width, height - banner_h)], fill=(234, 179, 8), width=4)

        # Title (Golden Yellow)
        draw.text((50, height - banner_h + 18), title, fill=(250, 204, 21), font=font_title)

        # Stat Tag Pill
        stat_y = height - banner_h + 68
        draw.text((50, stat_y), f"⚠️  {stat}", fill=(248, 113, 113), font=font_stat)

        # Subtitle Narration (Clean White / Italic style)
        sub_y = height - banner_h + 115
        draw.text((50, sub_y), f'"{sub}"', fill=(255, 255, 255), font=font_sub)

        # Convert back to BGR
        return cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

    # Calculate total target frames based on 33.62s voiceover
    total_target_frames = int(33.62 * fps) # ~806 frames

    # Write each video clip
    for shot in shots:
        cap = cv2.VideoCapture(shot["path"])
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            if frame.shape[1] != width or frame.shape[0] != height:
                frame = cv2.resize(frame, (width, height))
            
            overlay_frame = draw_overlay(frame, shot["title"], shot["stat"], shot["sub"], current_frame_idx, total_target_frames)
            out.write(overlay_frame)
            current_frame_idx += 1
        cap.release()

    print(f"Rendered {current_frame_idx} footage frames. Target total: {total_target_frames}")

    # Now add the Problem Statement Visual Diagram for remaining frames
    diag_path = "docs/figures/problem_statement_visual.png"
    if os.path.exists(diag_path):
        diag_bgr = cv2.imread(diag_path)
        diag_bgr = cv2.resize(diag_bgr, (width, height))
    else:
        diag_bgr = np.ones((height, width, 3), dtype=np.uint8) * 255

    closing_title = "THE OBSERVABILITY GAP: WHAT HAPPENS WHEN NOBODY IS LOOKING?"
    closing_stat = "BEEVIL KNIEVEL: Continuous 24/7 In-Situ Autonomous Edge-AI Monitoring"
    closing_sub = "What happens when nobody is looking?"

    while current_frame_idx < total_target_frames:
        overlay_frame = draw_overlay(diag_bgr, closing_title, closing_stat, closing_sub, current_frame_idx, total_target_frames)
        out.write(overlay_frame)
        current_frame_idx += 1

    out.release()
    print(f"Total video track completed: {current_frame_idx} frames ({current_frame_idx/fps:.2f} seconds)")

    # Multiplex with audio using FFmpeg
    voice_path = "assets/video_sources/problem_statement_voiceover.wav"
    master_video = "docs/media/video/01_problem_statement_master_with_voiceover.mp4"
    muted_video = "docs/media/video/01_problem_statement_presentation_muted.mp4"
    preview_video = "assets/video_sources/preview/approved_sources_preview.mp4"

    # 1. Master Video with Voiceover (AAC audio, H.264 video)
    cmd_audio = [
        ffmpeg_exe, "-y",
        "-i", temp_raw_video,
        "-i", voice_path,
        "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        master_video
    ]
    subprocess.run(cmd_audio, check=True)
    print(f"Generated Master Video with Voiceover: {master_video}")

    # 2. Muted Video for Live User Speaking
    cmd_muted = [
        ffmpeg_exe, "-y",
        "-i", temp_raw_video,
        "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-an",
        muted_video
    ]
    subprocess.run(cmd_muted, check=True)
    print(f"Generated Muted Video: {muted_video}")

    # 3. Update Preview in assets
    import shutil
    shutil.copyfile(master_video, preview_video)
    print(f"Updated Preview Video: {preview_video}")

    # Clean up temp
    if os.path.exists(temp_raw_video):
        os.remove(temp_raw_video)

if __name__ == '__main__':
    build_video()
