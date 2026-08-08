import os
import re
import markdown
import subprocess

md_path = r"C:\Users\25beevdt047\.gemini\antigravity\brain\03f2d722-c972-45f3-9c52-8b1fc32d541b\IEEE_HART_FINAL_ARCHITECTURE_SPECIFICATION.md"
desktop_pdf = r"C:\Users\25beevdt047\Desktop\IEEE_HART_Beevil_Knievel_Final_Architecture_Specification.pdf"

with open(md_path, "r", encoding="utf-8") as f:
    md_content = f.read()

# Convert Markdown to HTML
html_body = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])

full_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>IEEE HARDWAIRE Challenge — Beevil Knievel Master Specification</title>
<style>
  @page {{
    size: A4;
    margin: 20mm 15mm 20mm 15mm;
    @bottom-right {{
      content: counter(page);
    }}
  }}
  body {{
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #111111;
    background-color: #ffffff;
    line-height: 1.6;
    font-size: 10.5pt;
  }}
  h1 {{
    font-size: 22pt;
    font-weight: 700;
    border-bottom: 2px solid #111111;
    padding-bottom: 8px;
    margin-top: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}
  h2 {{
    font-size: 15pt;
    font-weight: 700;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 4px;
    margin-top: 24px;
    page-break-after: avoid;
  }}
  h3 {{
    font-size: 12pt;
    font-weight: 700;
    margin-top: 18px;
    page-break-after: avoid;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }}
  th, td {{
    border: 1px solid #dddddd;
    padding: 7px 10px;
    text-align: left;
  }}
  th {{
    background-color: #f4f4f4;
    font-weight: 700;
  }}
  pre, code {{
    font-family: 'Courier New', Courier, monospace;
    font-size: 8.5pt;
    background-color: #f8f8f8;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    padding: 8px;
    white-space: pre-wrap;
    word-wrap: break-word;
    page-break-inside: avoid;
  }}
  img {{
    max-width: 100%;
    height: auto;
    display: block;
    margin: 15px auto;
    page-break-inside: avoid;
  }}
  ul, ol {{
    padding-left: 20px;
  }}
  li {{
    margin-bottom: 4px;
  }}
</style>
</head>
<body>
{html_body}
</body>
</html>
"""

temp_html_path = r"C:\Users\25beevdt047\.gemini\antigravity\scratch\beevil-knievel\scratch\temp_spec.html"
with open(temp_html_path, "w", encoding="utf-8") as f:
    f.write(full_html)

print("Generated HTML for PDF conversion.")

# Use npx playwright to generate PDF
cmd = f'npx -y playwright pdf "{temp_html_path}" "{desktop_pdf}"'
try:
    subprocess.run(cmd, shell=True, check=True)
    print("PDF Successfully Generated on Desktop:", desktop_pdf)
except Exception as e:
    print("Error generating PDF via Playwright:", e)
