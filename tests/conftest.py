"""
Global Pytest Configuration and Environment Shims
==================================================
Ensures cross-platform and cross-version compatibility for peer reviewers,
CI runners, and local developer setups.
"""

import atexit
import os
import shutil
import sys
import tempfile
from pathlib import Path
import httpx

# Hermetic database. The tests must never read or write gateway/beevil_telemetry.db in the
# source tree: a stale file created by an older schema once made the suite fail. The path is
# read by gateway.server at import time, so it has to be set before any test module imports it.
_TEST_DB_DIR = tempfile.mkdtemp(prefix="beevil_tests_")
os.environ.setdefault("BEEVIL_DB_PATH", os.path.join(_TEST_DB_DIR, "beevil_telemetry.db"))
atexit.register(shutil.rmtree, _TEST_DB_DIR, ignore_errors=True)

# Ensure repo root is on sys.path
REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

# Compatibility bridge: older Starlette (<0.38) passed `app=self.app` into httpx.Client.__init__,
# which was deprecated and subsequently removed in httpx >= 0.28.0.
# This transparent filter ensures TestClient continues to work seamlessly across all versions.
_orig_httpx_init = httpx.Client.__init__


def _compat_httpx_init(self, *args, **kwargs):
    kwargs.pop("app", None)
    return _orig_httpx_init(self, *args, **kwargs)


httpx.Client.__init__ = _compat_httpx_init

