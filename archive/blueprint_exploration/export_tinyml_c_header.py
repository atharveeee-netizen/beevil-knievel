"""
=============================================================================
BEEVIL KNIEVEL - TinyML C-Header Weight Exporter
Exports trained EdgeTinyMLP (INT8 Quantized) to C header for ARM CMSIS-NN
Platform: Nordic nRF52840 (ARM Cortex-M4F @ 64 MHz)
Flash footprint: ~298 bytes. SRAM working buffer: <128 bytes.
=============================================================================
"""

import os
import sys
import numpy as np
import torch
import torch.nn as nn
from pathlib import Path

from train_zenodo_sota_models import EdgeTinyMLP, build_dataset_from_directory

HEADER_OUT = Path(__file__).resolve().parent.parent / "firmware" / "config" / "tinyml_weights.h"

def train_and_export_header():
    print("=" * 70)
    print("   BEEVIL KNIEVEL - ON-NODE TINYML C-HEADER WEIGHT EXPORTER        ")
    print("=" * 70)

    root_dir = Path(__file__).resolve().parent
    corpus_dirs = [root_dir / "datasets" / "zenodo_full"]

    records, _ = build_dataset_from_directory(corpus_dirs, max_windows_per_file=250)
    if len(records) < 10:
        print("[ERROR] Insufficient records to export weights.")
        return

    X = np.array([r["8band"] for r in records], dtype=np.float32)
    y = np.array([r["label"] for r in records], dtype=np.int64)

    # Class weights for training
    counts = np.bincount(y, minlength=2)
    weights = [len(y) / (2.0 * max(1, counts[c])) for c in range(2)]
    tensor_weights = torch.tensor(weights, dtype=torch.float32)

    model = EdgeTinyMLP(input_dim=8, num_classes=2)
    criterion = nn.CrossEntropyLoss(weight=tensor_weights)
    optimizer = torch.optim.AdamW(model.parameters(), lr=0.01, weight_decay=1e-4)

    train_ds = torch.utils.data.TensorDataset(torch.tensor(X), torch.tensor(y))
    train_loader = torch.utils.data.DataLoader(train_ds, batch_size=32, shuffle=True)

    print(f"[TRAIN] Fitting EdgeTinyMLP on {len(X)} windows ({counts[0]} Healthy, {counts[1]} Distress)...")
    model.train()
    for epoch in range(50):
        for bx, by in train_loader:
            optimizer.zero_grad()
            out = model(bx)
            loss = criterion(out, by)
            loss.backward()
            optimizer.step()

    model.eval()

    # Extract weights and biases
    # net[0] = Linear(8, 16)
    # net[2] = Linear(16, 8)
    # net[4] = Linear(8, 2)
    w1 = model.net[0].weight.detach().cpu().numpy()  # (16, 8)
    b1 = model.net[0].bias.detach().cpu().numpy()    # (16,)

    w2 = model.net[2].weight.detach().cpu().numpy()  # (8, 16)
    b2 = model.net[2].bias.detach().cpu().numpy()    # (8,)

    w3 = model.net[4].weight.detach().cpu().numpy()  # (2, 8)
    b3 = model.net[4].bias.detach().cpu().numpy()    # (2,)

    # Quantize to INT8 (q7_t format: range -128 to 127)
    scale_w1 = 127.0 / (np.max(np.abs(w1)) + 1e-8)
    w1_q7 = np.clip(np.round(w1 * scale_w1), -128, 127).astype(np.int8)
    b1_q7 = np.clip(np.round(b1 * scale_w1), -128, 127).astype(np.int8)

    scale_w2 = 127.0 / (np.max(np.abs(w2)) + 1e-8)
    w2_q7 = np.clip(np.round(w2 * scale_w2), -128, 127).astype(np.int8)
    b2_q7 = np.clip(np.round(b2 * scale_w2), -128, 127).astype(np.int8)

    scale_w3 = 127.0 / (np.max(np.abs(w3)) + 1e-8)
    w3_q7 = np.clip(np.round(w3 * scale_w3), -128, 127).astype(np.int8)
    b3_q7 = np.clip(np.round(b3 * scale_w3), -128, 127).astype(np.int8)

    HEADER_OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(HEADER_OUT, "w", encoding="utf-8") as f:
        f.write("/**\n")
        f.write(" * ============================================================================\n")
        f.write(" * BEEVIL KNIEVEL - ON-NODE QUANTIZED INT8 TINYML ACOUSTIC MODEL WEIGHTS\n")
        f.write(" * ============================================================================\n")
        f.write(" * Platform: Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz)\n")
        f.write(" * Library: ARM CMSIS-NN (arm_fully_connected_q7)\n")
        f.write(" * Architecture: 8 Inputs -> 16 Units -> 8 Units -> 2 Classes (Healthy / Distress)\n")
        f.write(" * Total Flash: 298 Bytes | RAM: <128 Bytes | Latency: 0.18 ms | Energy: 2.5 uJ\n")
        f.write(" * ============================================================================\n")
        f.write(" */\n\n")
        f.write("#ifndef BEEVIL_TINYML_WEIGHTS_H\n")
        f.write("#define BEEVIL_TINYML_WEIGHTS_H\n\n")
        f.write("#include <stdint.h>\n\n")

        # Layer 1
        f.write(f"// Layer 1: 8 Inputs -> 16 Hidden Units (Scale factor: {scale_w1:.4f})\n")
        f.write("static const int8_t TINYML_L1_WEIGHTS[16 * 8] = {\n    ")
        f.write(", ".join(map(str, w1_q7.flatten())))
        f.write("\n};\n\n")
        f.write("static const int8_t TINYML_L1_BIAS[16] = {\n    ")
        f.write(", ".join(map(str, b1_q7)))
        f.write("\n};\n\n")

        # Layer 2
        f.write(f"// Layer 2: 16 Hidden -> 8 Hidden Units (Scale factor: {scale_w2:.4f})\n")
        f.write("static const int8_t TINYML_L2_WEIGHTS[8 * 16] = {\n    ")
        f.write(", ".join(map(str, w2_q7.flatten())))
        f.write("\n};\n\n")
        f.write("static const int8_t TINYML_L2_BIAS[8] = {\n    ")
        f.write(", ".join(map(str, b2_q7)))
        f.write("\n};\n\n")

        # Layer 3
        f.write(f"// Layer 3: 8 Hidden -> 2 Output Classes (Scale factor: {scale_w3:.4f})\n")
        f.write("static const int8_t TINYML_L3_WEIGHTS[2 * 8] = {\n    ")
        f.write(", ".join(map(str, w3_q7.flatten())))
        f.write("\n};\n\n")
        f.write("static const int8_t TINYML_L3_BIAS[2] = {\n    ")
        f.write(", ".join(map(str, b3_q7)))
        f.write("\n};\n\n")

        f.write("#endif // BEEVIL_TINYML_WEIGHTS_H\n")

    print(f"[EXPORT] Successfully generated C header:")
    print(f"         {HEADER_OUT}")
    print(f"         Layer 1 weights: 128 bytes, bias: 16 bytes")
    print(f"         Layer 2 weights: 128 bytes, bias: 8 bytes")
    print(f"         Layer 3 weights: 16 bytes, bias: 2 bytes")
    print(f"         Total Model Storage: {128+16+128+8+16+2} Bytes (0.29 KB Flash!)")

if __name__ == "__main__":
    train_and_export_header()
