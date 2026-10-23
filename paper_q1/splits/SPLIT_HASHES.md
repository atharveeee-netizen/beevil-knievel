# Cryptographic Signatures of Frozen Benchmark Splits (Phase 3)

These cross-validation splits were generated and cryptographically frozen **strictly before model training commenced**, adhering to the preregistration protocol.

| Split Manifest | Task | Protocol | Outer Folds | SHA-256 Hash |
|---|---|---|---|---|
| `t2_bee_vs_nobee_splits.json` | T2: Bee vs Non-Bee | P-A (Unseen Hive, k=5, 3 seeds) | 15 | `a7deccd7dcc4c57fb1bd95d75b99697583050b0a147c0e5c156ce9b37895110f` |
| `t4_mspb_splits.json` | T4: MSPB Phenotype | P-A (Unseen Hive, k=5, 3 seeds) | 15 | `c224f706661a5a4178ef64e137ed2b5a3b8a8684ecc7abb7981ceb6ac7c08323` |
| `splits_seed0.json` | Master Split Index | P-A Verification Index | - | `0d32e09dbe40a0426b39363c410de00135b6cd29760d1119417eba0ef8f2795e` |

---
**Verification Guarantee:** Zero hive overlap exists between training and test sets in any outer fold. No test fold data was accessed for hyperparameter tuning, feature selection, or early stopping.
