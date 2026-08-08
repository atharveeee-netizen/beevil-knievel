import fitz  # PyMuPDF
import os

pdf_files = [
    r"C:\Users\25beevdt047\Desktop\Beevil_Knievel_80_Research_Papers_Architecture_Report.pdf",
    r"C:\Users\25beevdt047\Desktop\IEEE_HART_Architecture_Final.pdf",
    r"C:\Users\25beevdt047\Desktop\IEEE_HART_Beevil_Knievel_Final_Architecture_Specification.pdf",
    r"C:\Users\25beevdt047\Downloads\IEEE_HART_Presentation.pdf"
]

out_summary_file = r"scratch/pdf_analysis_dump.txt"

with open(out_summary_file, "w", encoding="utf-8") as out:
    for path in pdf_files:
        out.write("==================================================\n")
        out.write(f"FILE: {path}\n")
        if not os.path.exists(path):
            out.write("STATUS: File does not exist!\n\n")
            continue
        
        doc = fitz.open(path)
        out.write(f"Page Count: {len(doc)}\n")
        out.write("==================================================\n\n")
        
        for i, page in enumerate(doc):
            text = page.get_text("text")
            out.write(f"--- PAGE {i+1} ---\n")
            out.write(text.strip() + "\n\n")
        out.write("\n\n")

print(f"Extraction complete! Saved to {out_summary_file}")
