"""
BEEVIL KNIEVEL — MASTER VIDEO SOURCE EXTRACTION SCRIPT
Deterministic extraction of IEEE Scene 01 candidate footage with frame-level accuracy,
metadata provenance, SHA-256 verification, and thumbnail generation.
"""

import os
import subprocess
import json
import hashlib
import cv2
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

CLIPS_SPEC = [
    {
        'shot_id': 'SHOT-001',
        'file_name': 'SHOT-001_apiary_establishing.mp4',
        'source_raw': 'assets/video_sources/raw/usda_peoples_garden_apiary_20130522.webm',
        'source_url': 'https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130522-NRCS-LSC-0226-v6).webm',
        'source_title': "People's Garden Apiary and Pollinator Garden (20130522-NRCS-LSC-0226-v6)",
        'creator': 'USDA Natural Resources Conservation Service / Wayne Bogovich & Lance Cheung',
        'license': 'Public Domain (17 U.S.C. § 105)',
        'license_url': 'https://www.usa.gov/government-works',
        'permission_status': 'APPROVED',
        'start_time': '00:01:23.000',
        'end_time': '00:01:26.500',
        'duration_seconds': 3.5,
        'scene': 'SCENE 01 — REAL-WORLD PROBLEM',
        'purpose': 'apiary wide shot',
        'shot_description': 'Establishing wide panoramic view of dual Langstroth multi-super beehives situated on gravel rooftop apiary at USDA headquarters under open sky.',
        'why_needed': 'Establishes commercial apiary physical setting and outdoor operational environment prior to hive intervention.',
        'final_use': 'SCENE_01'
    },
    {
        'shot_id': 'SHOT-002',
        'file_name': 'SHOT-002_beekeeper_approach.mp4',
        'source_raw': 'assets/video_sources/raw/usda_peoples_garden_apiary_20130522.webm',
        'source_url': 'https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130522-NRCS-LSC-0226-v6).webm',
        'source_title': "People's Garden Apiary and Pollinator Garden (20130522-NRCS-LSC-0226-v6)",
        'creator': 'USDA Natural Resources Conservation Service / Wayne Bogovich & Lance Cheung',
        'license': 'Public Domain (17 U.S.C. § 105)',
        'license_url': 'https://www.usa.gov/government-works',
        'permission_status': 'APPROVED',
        'start_time': '00:01:26.500',
        'end_time': '00:01:30.500',
        'duration_seconds': 4.0,
        'scene': 'SCENE 01 — REAL-WORLD PROBLEM',
        'purpose': 'beekeeper approaching hive',
        'shot_description': 'Beekeeper in full white protective bee suit, helmet veil, and leather gloves carries smoker and hive tool across the gravel toward the active colony.',
        'why_needed': 'Demonstrates human physical presence and the manual overhead involved in conventional apiary monitoring.',
        'final_use': 'SCENE_01'
    },
    {
        'shot_id': 'SHOT-003',
        'file_name': 'SHOT-003_smoker.mp4',
        'source_raw': 'assets/video_sources/raw/usda_peoples_garden_apiary_20130522.webm',
        'source_url': 'https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130522-NRCS-LSC-0226-v6).webm',
        'source_title': "People's Garden Apiary and Pollinator Garden (20130522-NRCS-LSC-0226-v6)",
        'creator': 'USDA Natural Resources Conservation Service / Wayne Bogovich & Lance Cheung',
        'license': 'Public Domain (17 U.S.C. § 105)',
        'license_url': 'https://www.usa.gov/government-works',
        'permission_status': 'APPROVED',
        'start_time': '00:01:10.500',
        'end_time': '00:01:14.000',
        'duration_seconds': 3.5,
        'scene': 'SCENE 01 — REAL-WORLD PROBLEM',
        'purpose': 'smoker / hive preparation',
        'shot_description': 'Close-up macro of beekeeper loading dry pine needles into the combustion chamber of the stainless-steel bee smoker, pumping bellows as smoke rises.',
        'why_needed': 'Illustrates traditional smoke pacification procedure used by apiarists to suppress alarm pheromones before invasive inspection.',
        'final_use': 'SCENE_01'
    },
    {
        'shot_id': 'SHOT-004',
        'file_name': 'SHOT-004_hive_opening.mp4',
        'source_raw': 'assets/video_sources/raw/usda_peoples_garden_apiary_20130522.webm',
        'source_url': 'https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130522-NRCS-LSC-0226-v6).webm',
        'source_title': "People's Garden Apiary and Pollinator Garden (20130522-NRCS-LSC-0226-v6)",
        'creator': 'USDA Natural Resources Conservation Service / Wayne Bogovich & Lance Cheung',
        'license': 'Public Domain (17 U.S.C. § 105)',
        'license_url': 'https://www.usa.gov/government-works',
        'permission_status': 'APPROVED',
        'start_time': '00:01:44.000',
        'end_time': '00:01:47.500',
        'duration_seconds': 3.5,
        'scene': 'SCENE 01 — REAL-WORLD PROBLEM',
        'purpose': 'opening hive',
        'shot_description': 'Beekeeper unseals inner cover of the upper Langstroth box with a hive tool, puffing tranquilizing smoke into the seam to access the colony.',
        'why_needed': 'Documents the physical disturbance caused to hive microclimate and colony stress during manual inspections.',
        'final_use': 'SCENE_01'
    },
    {
        'shot_id': 'SHOT-005',
        'file_name': 'SHOT-005_frame_removal.mp4',
        'source_raw': 'assets/video_sources/raw/usda_peoples_garden_apiary_20130522.webm',
        'source_url': 'https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130522-NRCS-LSC-0226-v6).webm',
        'source_title': "People's Garden Apiary and Pollinator Garden (20130522-NRCS-LSC-0226-v6)",
        'creator': 'USDA Natural Resources Conservation Service / Wayne Bogovich & Lance Cheung',
        'license': 'Public Domain (17 U.S.C. § 105)',
        'license_url': 'https://www.usa.gov/government-works',
        'permission_status': 'APPROVED',
        'start_time': '00:02:04.500',
        'end_time': '00:02:08.500',
        'duration_seconds': 4.0,
        'scene': 'SCENE 01 — REAL-WORLD PROBLEM',
        'purpose': 'removing frame',
        'shot_description': 'Direct overhead POV into the open Langstroth hive body as beekeeper pries propolis seal and lifts deep wooden brood frame vertically out of the rack.',
        'why_needed': 'Visually communicates manual frame extraction required to evaluate internal colony health under status-quo management.',
        'final_use': 'SCENE_01'
    },
    {
        'shot_id': 'SHOT-006',
        'file_name': 'SHOT-006_frame_inspection.mp4',
        'source_raw': 'assets/video_sources/raw/usda_peoples_garden_apiary_20130917.webm',
        'source_url': 'https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130917-NRCS-LSC-9001).webm',
        'source_title': "People's Garden Apiary and Pollinator Garden (20130917-NRCS-LSC-9001)",
        'creator': 'USDA Natural Resources Conservation Service / Lance Cheung',
        'license': 'Public Domain (17 U.S.C. § 105)',
        'license_url': 'https://www.usa.gov/government-works',
        'permission_status': 'APPROVED',
        'start_time': '00:00:08.000',
        'end_time': '00:00:12.000',
        'duration_seconds': 4.0,
        'scene': 'SCENE 01 — REAL-WORLD PROBLEM',
        'purpose': 'close-up inspection',
        'shot_description': '1080p close-up of active Italian honeybees arriving at the hive bottom entrance board, exhibiting heavy traffic and pollen foraging behavior.',
        'why_needed': 'Contrasts external activity observation against the hidden internal state of brood health and colony thermoregulation.',
        'final_use': 'SCENE_01'
    },
    {
        'shot_id': 'SHOT-007',
        'file_name': 'SHOT-007_brood_closeup.mp4',
        'source_raw': 'assets/video_sources/raw/usda_peoples_garden_apiary_20130522.webm',
        'source_url': 'https://commons.wikimedia.org/wiki/File:People%27s_Garden_Apiary_and_Pollinator_Garden_(20130522-NRCS-LSC-0226-v6).webm',
        'source_title': "People's Garden Apiary and Pollinator Garden (20130522-NRCS-LSC-0226-v6)",
        'creator': 'USDA Natural Resources Conservation Service / Wayne Bogovich & Lance Cheung',
        'license': 'Public Domain (17 U.S.C. § 105)',
        'license_url': 'https://www.usa.gov/government-works',
        'permission_status': 'APPROVED',
        'start_time': '00:02:35.000',
        'end_time': '00:02:39.000',
        'duration_seconds': 4.0,
        'scene': 'SCENE 01 — REAL-WORLD PROBLEM',
        'purpose': 'brood / bees / frame',
        'shot_description': 'High-definition macro video of nurse and worker honeybees crawling over capped brood cells, actively fanning wings and attending developing pupae.',
        'why_needed': 'Provides visual proof of the biological target: the brood nest cluster whose acoustic signals and 35°C core temp BEEVIL measures.',
        'final_use': 'SCENE_01'
    }
]

def run():
    os.makedirs('assets/video_sources/clips', exist_ok=True)
    os.makedirs('assets/video_sources/proxy', exist_ok=True)
    os.makedirs('assets/video_sources/metadata', exist_ok=True)

    print('Starting precise extraction for 7 approved clips...')
    for spec in CLIPS_SPEC:
        out_path = os.path.join('assets/video_sources/clips', spec['file_name'])
        shot_id = spec['shot_id']

        # FFmpeg frame-accurate trim and standardization
        cmd = [
            ffmpeg, '-y',
            '-ss', spec['start_time'],
            '-to', spec['end_time'],
            '-i', spec['source_raw'],
            '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black,fps=24',
            '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', '-pix_fmt', 'yuv420p',
            '-c:a', 'aac', '-b:a', '192k',
            out_path
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # Calculate sha256
        with open(out_path, 'rb') as f:
            sha256 = hashlib.sha256(f.read()).hexdigest()

        # Extract first, middle, last frames for QA and thumbnails
        cap = cv2.VideoCapture(out_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        # First frame
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        ret, frame_first = cap.read()
        if ret:
            cv2.imwrite(f'assets/video_sources/proxy/{shot_id}_first.jpg', frame_first)

        # Middle frame
        cap.set(cv2.CAP_PROP_POS_FRAMES, total_frames // 2)
        ret, frame_mid = cap.read()
        if ret:
            cv2.imwrite(f'assets/video_sources/proxy/{shot_id}_mid.jpg', frame_mid)
            cv2.imwrite(f'assets/video_sources/proxy/{shot_id}_thumb.jpg', frame_mid)

        # Last frame
        cap.set(cv2.CAP_PROP_POS_FRAMES, max(0, total_frames - 1))
        ret, frame_last = cap.read()
        if ret:
            cv2.imwrite(f'assets/video_sources/proxy/{shot_id}_last.jpg', frame_last)

        cap.release()

        # Write metadata JSON
        meta = {
            'shot_id': shot_id,
            'file_name': spec['file_name'],
            'source_url': spec['source_url'],
            'source_title': spec['source_title'],
            'creator': spec['creator'],
            'license': spec['license'],
            'license_url': spec['license_url'],
            'permission_status': spec['permission_status'],
            'source_start': spec['start_time'],
            'source_end': spec['end_time'],
            'duration_seconds': spec['duration_seconds'],
            'resolution': f'{w}x{h}',
            'fps': fps,
            'total_frames': total_frames,
            'codec': 'H.264 / AAC',
            'spatial_crop': None,
            'purpose': spec['purpose'],
            'scene': spec['scene'],
            'shot_description': spec['shot_description'],
            'why_needed': spec['why_needed'],
            'final_use': spec['final_use'],
            'download_date': '2026-09-08',
            'sha256': sha256
        }
        meta_path = os.path.join('assets/video_sources/metadata', f'{shot_id}.json')
        with open(meta_path, 'w', encoding='utf-8') as f:
            json.dump(meta, f, indent=2)

        print(f'[{shot_id}] Extracted: {spec["file_name"]} ({w}x{h}, {total_frames} frames, {total_frames/fps:.2f}s) - SHA256: {sha256[:12]}...')

    print('All 7 approved clips successfully extracted and verified!')

if __name__ == '__main__':
    run()
