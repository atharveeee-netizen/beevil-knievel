"""
BEEVIL KNIEVEL — PREVIEW MONTAGE BUILDER
Concatenates all approved source clips in sequence with minimal review overlay metadata:
Shot ID, Source Timestamps, and Approval Status.
"""

import os
import subprocess
import json
import glob
import cv2
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

def build_montage():
    preview_dir = 'assets/video_sources/preview'
    os.makedirs(preview_dir, exist_ok=True)
    out_montage = os.path.join(preview_dir, 'approved_sources_preview.mp4')
    temp_stamped_dir = os.path.join(preview_dir, 'temp_stamped')
    os.makedirs(temp_stamped_dir, exist_ok=True)

    meta_files = sorted(glob.glob('assets/video_sources/metadata/SHOT-*.json'))
    stamped_clips = []

    print(f'Stamping review metadata on {len(meta_files)} approved clips...')
    for mf in meta_files:
        with open(mf, 'r', encoding='utf-8') as f:
            meta = json.load(f)

        shot_id = meta['shot_id']
        clip_path = os.path.join('assets/video_sources/clips', meta['file_name'])
        stamped_path = os.path.join(temp_stamped_dir, f'stamped_{shot_id}.mp4')

        # Read clip frame by frame with OpenCV, add semi-transparent banner at top-left
        cap = cv2.VideoCapture(clip_path)
        fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
        w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        # Setup temporary writer
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        raw_stamped = os.path.join(temp_stamped_dir, f'raw_{shot_id}.mp4')
        out_writer = cv2.VideoWriter(raw_stamped, fourcc, fps, (w, h))

        text_line1 = f"{meta['shot_id']} | {meta['source_start']} - {meta['source_end']} | {meta['permission_status']}"
        text_line2 = f"SCENE 01: {meta['purpose'].upper()} | FIELD REFERENCE ONLY"

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # Draw semi-transparent dark banner in top-left
            overlay = frame.copy()
            cv2.rectangle(overlay, (20, 20), (620, 95), (15, 23, 42), -1)
            cv2.addWeighted(overlay, 0.75, frame, 0.25, 0, frame)

            # Draw boundary line
            cv2.rectangle(frame, (20, 20), (620, 95), (4, 120, 87), 2)

            # Render text
            cv2.putText(frame, text_line1, (35, 52), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255, 255, 255), 2, cv2.LINE_AA)
            cv2.putText(frame, text_line2, (35, 80), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (167, 243, 208), 1, cv2.LINE_AA)

            out_writer.write(frame)

        cap.release()
        out_writer.release()

        # Re-encode stamped clip with x264 and audio from original
        reencode_cmd = [
            ffmpeg, '-y',
            '-i', raw_stamped,
            '-i', clip_path,
            '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', '-pix_fmt', 'yuv420p',
            '-c:a', 'aac', '-b:a', '192k',
            '-map', '0:v:0', '-map', '1:a:0?',
            stamped_path
        ]
        subprocess.run(reencode_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if os.path.exists(raw_stamped):
            os.remove(raw_stamped)

        stamped_clips.append(stamped_path)
        print(f'Stamped: {shot_id}')

    # Create concat demuxer file
    concat_list_path = os.path.join(temp_stamped_dir, 'concat_list.txt')
    with open(concat_list_path, 'w', encoding='utf-8') as f:
        for sc in stamped_clips:
            abs_sc = os.path.abspath(sc).replace('\\', '/')
            f.write(f"file '{abs_sc}'\n")

    # Concatenate all stamped clips into approved_sources_preview.mp4
    print('Concatenating clips into final preview montage...')
    concat_cmd = [
        ffmpeg, '-y',
        '-f', 'concat', '-safe', '0',
        '-i', concat_list_path,
        '-c', 'copy',
        out_montage
    ]
    subprocess.run(concat_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Clean up intermediate stamped files
    for sc in stamped_clips:
        if os.path.exists(sc):
            os.remove(sc)
    if os.path.exists(concat_list_path):
        os.remove(concat_list_path)
    if os.path.exists(temp_stamped_dir):
        os.rmdir(temp_stamped_dir)

    print(f'Approved preview montage generated: {out_montage} ({os.path.getsize(out_montage)} bytes)')

if __name__ == '__main__':
    build_montage()
