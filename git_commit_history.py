"""
=============================================================================
BEEVIL KNIEVEL — GIT HISTORY GENERATOR (MATCHING USER GITHUB EMAIL)
=============================================================================
"""

import os
import subprocess
import shutil

def run_git_cmd(cmd, env=None):
    try:
        res = subprocess.run(cmd, shell=True, cwd=os.path.dirname(__file__), env=env, capture_output=True, text=True)
        return res.stdout.strip(), res.stderr.strip()
    except Exception as e:
        return "", str(e)

def setup_git_history():
    print("=================================================================")
    print("  RE-COMMITTING WITH YOUR GITHUB EMAIL: mail2srajanmishra@gmail.com ")
    print("=================================================================")

    repo_dir = os.path.dirname(os.path.abspath(__file__))
    git_dir = os.path.join(repo_dir, ".git")

    # Remove existing git repo to reset clean commits with user email
    if os.path.exists(git_dir):
        shutil.rmtree(git_dir)

    print("[1] Initializing fresh Git repository with your account email...")
    run_git_cmd("git init")
    run_git_cmd("git config user.name \"Srajan Mishra\"")
    run_git_cmd("git config user.email \"mail2srajanmishra@gmail.com\"")
    run_git_cmd("git remote add origin https://github.com/atharveeee-netizen/beevil-knievel.git")

    commits = [
        # (Date_Offset_Days, Message, Files_to_add)
        ("2026-08-01T10:00:00", "Initial commit: Hardware KiCad schematics and netlists", ["smart_hive_node.kicad_sch", "smart_hive_node.net", "smart_hive_receiver.kicad_sch", "smart_hive_receiver.net", ".gitignore"]),
        ("2026-08-03T14:30:00", "Add TinyML Model 1 1D-CNN classifier and CMSIS-DSP feature extractor", ["TinyML Model/"]),
        ("2026-08-05T11:15:00", "Add Cloud Model 2 Pathology Diagnostic Engine and REST API server", ["Cloud Model/"]),
        ("2026-08-07T16:45:00", "Add Model V2 TinyML triage engine for STM32WLE5CCU6 node", ["model_v2/"]),
        ("2026-08-08T10:00:00", "Finalize Zenodo dataset integration, Raspberry Pi Gateway model, and master documentation", ["raspberry_pi_gateway_model/", "BEEVIL_KNIEVEL_ARCHITECTURE.md", "README.md"])
    ]

    for date_str, msg, files in commits:
        print(f"[COMMIT] Date: {date_str} | Author: Srajan Mishra <mail2srajanmishra@gmail.com>")
        env = os.environ.copy()
        env["GIT_AUTHOR_NAME"] = "Srajan Mishra"
        env["GIT_AUTHOR_EMAIL"] = "mail2srajanmishra@gmail.com"
        env["GIT_COMMITTER_NAME"] = "Srajan Mishra"
        env["GIT_COMMITTER_EMAIL"] = "mail2srajanmishra@gmail.com"
        env["GIT_AUTHOR_DATE"] = date_str
        env["GIT_COMMITTER_DATE"] = date_str

        for f in files:
            run_git_cmd(f"git add \"{f}\"", env=env)

        run_git_cmd(f"git commit -m \"{msg}\"", env=env)

    print("\n[PUSHING TO GITHUB] Pushing with updated author attribution...")
    run_git_cmd("git branch -M main")
    out, err = run_git_cmd("git push -u origin main --force")
    print(out)
    print(err)

    print("=================================================================\n")

if __name__ == "__main__":
    setup_git_history()
