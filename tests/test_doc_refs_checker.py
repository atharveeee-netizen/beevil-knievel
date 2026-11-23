"""The documented-reference checker must pass on the repository and fail when it should."""

import importlib.util
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]


def _load_checker():
    spec = importlib.util.spec_from_file_location("check_doc_refs", REPO / "scripts" / "check_doc_refs.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_canonical_documents_only_reference_things_that_exist():
    result = subprocess.run([sys.executable, str(REPO / "scripts" / "check_doc_refs.py")],
                            capture_output=True, text=True)
    assert result.returncode == 0, result.stdout


def test_checker_flags_a_missing_command_and_a_missing_path(tmp_path, monkeypatch, capsys):
    checker = _load_checker()
    (tmp_path / "doc.md").write_text("Run `python -m pkg.missing` and open `src/missing.py`.\n", encoding="utf-8")
    monkeypatch.setattr(checker, "ROOT", tmp_path)
    monkeypatch.setattr(checker, "TRACKED", None)
    monkeypatch.setattr(checker, "ALLOWLIST", tmp_path / "allow.txt")
    monkeypatch.setattr(checker, "CHECKED", ["doc.md"])
    assert checker.main() == 1
    out = capsys.readouterr().out
    assert "pkg.missing" in out and "src/missing.py" in out


def test_checker_flags_an_allowlist_entry_that_now_exists(tmp_path, monkeypatch, capsys):
    checker = _load_checker()
    (tmp_path / "dir").mkdir()
    (tmp_path / "dir" / "x.txt").write_text("now written", encoding="utf-8")
    (tmp_path / "doc.md").write_text("See `dir/x.txt`.\n", encoding="utf-8")
    (tmp_path / "allow.txt").write_text("dir/x.txt  # was planned\n", encoding="utf-8")
    monkeypatch.setattr(checker, "ROOT", tmp_path)
    monkeypatch.setattr(checker, "TRACKED", None)
    monkeypatch.setattr(checker, "ALLOWLIST", tmp_path / "allow.txt")
    monkeypatch.setattr(checker, "CHECKED", ["doc.md"])
    assert checker.main() == 1
    assert "now exists" in capsys.readouterr().out
