import json

with open('zenodo_metadata.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

wavs = [f for f in data['files'] if f['key'].endswith('.wav')]
labs = [f for f in data['files'] if f['key'].endswith('.lab')]
others = [f for f in data['files'] if not f['key'].endswith('.wav') and not f['key'].endswith('.lab')]

print(f"Total WAV files: {len(wavs)} ({sum(w['size'] for w in wavs)/(1024*1024):.2f} MB)")
print(f"Total LAB files: {len(labs)}")
print(f"Other files: {len(others)}")
for o in others:
    print(f"  Other: {o['key']}")

print("\n--- Categories of WAV files ---")
categories = {}
for w in wavs:
    key = w['key']
    if 'NO_QueenBee' in key:
        cat = 'NU-Hive No Queen (Queenless)'
    elif 'QueenBee' in key:
        cat = 'NU-Hive Queen Present'
    elif 'Swarming' in key:
        cat = 'Swarming Hive'
    elif 'Active' in key:
        cat = 'OSBH Active'
    elif 'Missing Queen' in key:
        cat = 'OSBH Missing Queen'
    else:
        cat = 'Other'
    categories.setdefault(cat, []).append(w)

for cat, files in categories.items():
    total_mb = sum(f['size'] for f in files) / (1024*1024)
    print(f"{cat}: {len(files)} files ({total_mb:.2f} MB)")

print("\n--- All 54 WAV Files Sorted by Size ---")
wavs.sort(key=lambda x: x['size'])
for i, w in enumerate(wavs, 1):
    print(f"{i:2d}. {w['key']:<65} | {w['size']/(1024*1024):6.2f} MB")

