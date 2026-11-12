"""
Number audit for the leakage manuscript.

Finds every numeric literal in main.tex that is not emitted by a generated
macro, so each one can be justified by hand.

Run:
    python audit_numbers.py <path-to-main.tex>
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

MACRO = re.compile(r"\\Leak[A-Za-z]+")
NUMBER = re.compile(r"(?<![\w.])\d[\d,]*(?:\.\d+)?(?![\w])")

# literals that are justified by a cited source or a physical constant
ALLOWED_CONTEXT = (
    "doi", "10.1038", "11398835", "1038", "s41597",
    "mathrm", "textwidth", "textheight", "linewidth",
    "begin{tabular}", "includegraphics",
)


def main() -> int:
    path = Path(sys.argv[1])
    text = path.read_text(encoding="utf-8")

    # strip comments
    text = "\n".join(re.sub(r"(?<!\\)%.*$", "", ln) for ln in text.splitlines())

    findings = []
    for lineno, line in enumerate(text.splitlines(), 1):
        if any(ctx in line for ctx in ALLOWED_CONTEXT):
            continue
        # remove generated macros, keeping their position
        stripped = MACRO.sub("MACRO", line)
        for m in NUMBER.finditer(stripped):
            val = m.group(0)
            findings.append((lineno, val, line.strip()[:100]))

    if not findings:
        print("no un-generated numeric literals found")
        return 0

    print(f"{len(findings)} numeric literal(s) not produced by a macro:\n")
    for lineno, val, ctx in findings:
        print(f"  L{lineno:<4} {val:>10}  {ctx}")

    print("\nEach line above must be justified as a dataset fact, a physical")
    print("constant, or a citation. Anything else is a hand-entered number.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
