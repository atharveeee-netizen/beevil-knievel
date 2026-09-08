import os

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

EXCLUDE_DIRS = {".git", "node_modules", ".pytest_cache", ".next", "dist", "build"}
TARGET_EXTENSIONS = {".md", ".py", ".c", ".h", ".ino", ".json", ".svg", ".tex", ".txt", ".sh", ".yml", ".yaml"}

def scrub_dashes():
    modified_files = 0
    total_en_replaced = 0
    total_em_replaced = 0

    for root, dirs, files in os.walk(REPO_ROOT):
        # Filter directories in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext not in TARGET_EXTENSIONS:
                continue

            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()

                count_en = content.count("\u2013")
                count_em = content.count("\u2014")

                if count_en == 0 and count_em == 0:
                    continue

                # Replace en-dash with standard hyphen
                new_content = content.replace("\u2013", "-")
                
                # Replace em-dash with ' - ' or '-' cleanly
                new_content = new_content.replace(" - ", " - ")
                new_content = new_content.replace(" - ", " - ")

                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)

                modified_files += 1
                total_en_replaced += count_en
                total_em_replaced += count_em
                print(f"Scrubbed {os.path.relpath(filepath, REPO_ROOT)}: {count_en} en-dashes, {count_em} em-dashes")

            except Exception as e:
                print(f"Error processing {filepath}: {e}")

    print("=" * 60)
    print(f"COMPLETE: Scrubbed {modified_files} files.")
    print(f"Total en-dashes (\\u2013) replaced: {total_en_replaced}")
    print(f"Total em-dashes (\\u2014) replaced: {total_em_replaced}")
    print("=" * 60)

if __name__ == "__main__":
    scrub_dashes()
