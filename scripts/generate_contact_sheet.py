"""
BEEVIL KNIEVEL — SHOT CONTACT SHEET GENERATOR
Builds publication-grade PDF contact sheet from approved video source clips
with thumbnails, legal metadata, checksums, and technical verification.
"""

import os
import json
import glob
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf():
    pdf_path = 'assets/video_sources/SHOT_CONTACT_SHEET.pdf'
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=landscape(letter),
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#1E293B'),
        fontName='Helvetica-Bold'
    )
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#64748B'),
        fontName='Helvetica'
    )
    cell_bold = ParagraphStyle(
        'CellBold',
        parent=styles['Normal'],
        fontSize=9,
        leading=12,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor('#0F172A')
    )
    cell_norm = ParagraphStyle(
        'CellNorm',
        parent=styles['Normal'],
        fontSize=8,
        leading=11,
        fontName='Helvetica',
        textColor=colors.HexColor('#334155')
    )

    story = []
    story.append(Paragraph('BEEVIL KNIEVEL — VIDEO SHOT CONTACT SHEET', title_style))
    story.append(Paragraph('Master Source Extraction & Ethical Provenance Audit | Scene 01: Real-World Problem Context', subtitle_style))
    story.append(Spacer(1, 14))

    meta_files = sorted(glob.glob('assets/video_sources/metadata/SHOT-*.json'))

    table_data = [
        [
            Paragraph('Thumbnail', cell_bold),
            Paragraph('Shot Identifier & Purpose', cell_bold),
            Paragraph('Source & Legal Provenance', cell_bold),
            Paragraph('Timing & Codec Verification', cell_bold)
        ]
    ]

    for mf in meta_files:
        with open(mf, 'r', encoding='utf-8') as f:
            meta = json.load(f)

        shot_id = meta['shot_id']
        thumb_path = os.path.join('assets/video_sources/proxy', f'{shot_id}_thumb.jpg')
        img = Image(thumb_path, width=155, height=87)

        col2_text = (
            f"<b>{meta['shot_id']}</b>: {meta['file_name']}<br/>"
            f"<b>Purpose:</b> {meta['purpose']}<br/>"
            f"<b>Description:</b> {meta['shot_description'][:120]}...<br/>"
            f"<b>Story Role:</b> {meta['why_needed'][:100]}..."
        )

        col3_text = (
            f"<b>Source:</b> {meta['source_title'][:40]}...<br/>"
            f"<b>Creator:</b> {meta['creator']}<br/>"
            f"<b>License:</b> <b>{meta['license']}</b><br/>"
            f"<b>Status:</b> <font color=\"#047857\"><b>{meta['permission_status']}</b></font><br/>"
            f"<b>BEEVIL Truth:</b> <font color=\"#475569\">External Context Only</font>"
        )

        col4_text = (
            f"<b>Start:</b> {meta['source_start']} | <b>End:</b> {meta['source_end']}<br/>"
            f"<b>Duration:</b> {meta['duration_seconds']}s ({meta['total_frames']} frames)<br/>"
            f"<b>Format:</b> {meta['resolution']} @ {meta['fps']} fps ({meta['codec']})<br/>"
            f"<b>SHA256:</b> <font face=\"Courier\" size=\"6.5\">{meta['sha256'][:28]}...</font>"
        )

        table_data.append([
            img,
            Paragraph(col2_text, cell_norm),
            Paragraph(col3_text, cell_norm),
            Paragraph(col4_text, cell_norm)
        ])

    t = Table(table_data, colWidths=[165, 235, 180, 160])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LINEBELOW', (0, 0), (-1, 0), 1.5, colors.HexColor('#94A3B8')),
        ('LINEBELOW', (0, 1), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
        ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.HexColor('#F1F5F9')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#CBD5E1')),
    ]))

    story.append(t)
    doc.build(story)
    print(f'Generated contact sheet PDF: {pdf_path} ({os.path.getsize(pdf_path)} bytes)')

if __name__ == '__main__':
    generate_pdf()
