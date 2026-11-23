#!/usr/bin/env python3
"""
Documented-reference check
==========================
Fail when a canonical document tells the reader to run, open or build something that does not exist.

Checked, in the documents listed in CHECKED:
  * every ``python -m package.module`` command resolves to a file in the repository;
  * every backticked repository path (for example `gateway/server.py`) exists.

Files that are planned, or that only exist after a download or a run, are listed in
scripts/doc_refs_allowlist.txt together with the reason. An allowlist entry that has started to exist is
reported too, so the list cannot go stale: delete the entry when the file is written.

Run from anywhere:  python scripts/check_doc_refs.py
"""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOWLIST = ROOT / "scripts" / "doc_refs_allowlist.txt"

CHECKED = [
    "README.md", "REPRODUCIBILITY.md", "LIMITATIONS.md", "DEPLOYMENT_GUIDE.md", "paper/README.md",
    "docs/CANONICAL_BOM.md", "docs/HARDWARE_ARCHITECTURE.md", "submission/README.md",
    "paper_q1/*.md", "paper_q1/human_tasks/*.md", "paper_q1/manuscript_leakage/*.md",
    "paper_q1/manuscript_leakage/submission_package/*.md",
]
# Historical logs record what existed when they were written, so they are not checked.
SKIP = {"paper_q1/PROGRESS.md", "paper_q1/DECISIONS.md", "paper_q1/AUDIT_FIXES.md", "paper_q1/AUDIT_RESPONSE.md"}
NOT_OURS = {"pytest", "pip", "venv", "uvicorn", "http", "json", "build", "platformio", "ensurepip"}

MODULE_RE = re.compile(r"python3?\s+-m\s+([A-Za-z0-9_.]+)")
PATH_RE = re.compile(r"`([^`\s]+)`")


def load_allowlist() -> dict:
    allowed = {}
    if ALLOWLIST.exists():
        for raw in ALLOWLIST.read_text(encoding="utf-8").splitlines():
            entry = raw.split("#", 1)[0].strip()
            if entry:
                allowed[entry] = raw.split("#", 1)[1].strip() if "#" in raw else ""
    return allowed


def _tracked_paths():
    """Tracked files and their parent directories, so a sparse or partial checkout gives the same answer as a
    full one. Falls back to the working tree when git is unavailable."""
    try:
        out = subprocess.run(["git", "-C", str(ROOT), "ls-files"], capture_output=True, text=True, check=True).stdout
    except (OSError, subprocess.CalledProcessError):
        return None
    files = {line for line in out.splitlines() if line}
    dirs = {parent.as_posix() for f in files for parent in Path(f).parents if parent.as_posix() != "."}
    return files | dirs


TRACKED = _tracked_paths()


def _exists(rel: Path) -> bool:
    """With git available, only tracked files and directories count. Scaffolding that the pipeline creates
    locally (for example the empty paper_q1/bench_raw/) must not change the answer."""
    key = rel.as_posix().rstrip("/")
    if TRACKED is not None:
        return key in TRACKED
    return (ROOT / rel).exists()


def module_exists(module: str) -> bool:
    rel = Path(*module.split("."))
    return any(_exists(candidate) for candidate in (rel.with_suffix(".py"), rel / "__init__.py", rel / "__main__.py"))


def path_exists(token: str, doc: Path) -> bool:
    relative_to_doc = (doc.parent / token).resolve().relative_to(ROOT) if str((doc.parent / token).resolve()).startswith(str(ROOT)) else None
    return _exists(Path(token)) or (relative_to_doc is not None and _exists(relative_to_doc))


def looks_like_repo_path(token: str) -> bool:
    if "/" not in token or token.endswith("/") and token.count("/") < 2:
        return False
    if any(ch in token for ch in "*<>{}$:()|=,;") or token.startswith(("/", "~", ".", "http", "api/", "-")):
        return False
    return bool(re.search(r"\.[A-Za-z0-9]{1,5}$", token)) or token.endswith("/")


def main() -> int:
    allowed = load_allowlist()
    used, problems = set(), []
    docs = sorted({p for pattern in CHECKED for p in ROOT.glob(pattern) if p.is_file()})
    for doc in docs:
        rel_doc = doc.relative_to(ROOT).as_posix()
        if rel_doc in SKIP:
            continue
        for lineno, line in enumerate(doc.read_text(encoding="utf-8", errors="ignore").splitlines(), 1):
            for module in MODULE_RE.findall(line):
                if module.split(".")[0] in NOT_OURS or module_exists(module):
                    continue
                if module in allowed:
                    used.add(module)
                else:
                    problems.append(f"{rel_doc}:{lineno}: command `python -m {module}` does not exist")
            for token in PATH_RE.findall(line):
                if not looks_like_repo_path(token) or path_exists(token, doc):
                    continue
                if token in allowed:
                    used.add(token)
                else:
                    problems.append(f"{rel_doc}:{lineno}: path `{token}` does not exist")

    for entry in sorted(set(allowed) - used):
        exists = module_exists(entry) if "/" not in entry else _exists(Path(entry))
        problems.append(f"scripts/doc_refs_allowlist.txt: `{entry}` "
                        + ("now exists, remove it from the allowlist" if exists else "is no longer referenced, remove it"))

    if problems:
        print("Documented-reference check FAILED:")
        for problem in sorted(set(problems)):
            print("  " + problem)
        print("\nFix the document, write the missing file, or (for planned or runtime-generated files) add it to "
              "scripts/doc_refs_allowlist.txt with the reason.")
        return 1
    print(f"Documented-reference check passed ({len(docs)} documents, {len(used)} allowlisted references).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
