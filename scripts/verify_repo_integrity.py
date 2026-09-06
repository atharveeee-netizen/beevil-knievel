import os
import re
import sys
import urllib.parse

repo_dir = r"C:\Users\25beevdt047\.gemini\antigravity-ide\scratch\beevil-knievel"

def check_file(md_path):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    dir_path = os.path.dirname(md_path)
    patterns = [
        r'!?\[.*?\]\((?!http|mailto|#)(.*?)\)',
        r'src=[\"\'](?!http)(.*?)[\"\']'
    ]
    missing = []
    for pat in patterns:
        for match in re.finditer(pat, content):
            raw_path = match.group(1).split("#")[0].split("?")[0].strip()
            if not raw_path:
                continue
            unquoted_path = urllib.parse.unquote(raw_path)
            resolved = os.path.normpath(os.path.join(dir_path, unquoted_path))
            if not os.path.exists(resolved):
                missing.append((raw_path, resolved))
    return missing

all_missing = {}
total_checked = 0
for root, dirs, files in os.walk(repo_dir):
    if ".git" in root or "node_modules" in root or "venv" in root:
        continue
    for file in files:
        if file.endswith(".md"):
            total_checked += 1
            fp = os.path.join(root, file)
            m = check_file(fp)
            if m:
                all_missing[os.path.relpath(fp, repo_dir)] = m

print(f"Total Markdown files verified: {total_checked}")
if all_missing:
    print("MISSING LINKS DETECTED:")
    for f, miss in all_missing.items():
        print(f"File: {f}")
        for r, resolved in miss:
            print(f"  -> {r} (resolved: {resolved})")
else:
    print("SUCCESS: ALL INTERNAL LINKS AND MEDIA REFERENCES RESOLVE PERFECTLY!")
