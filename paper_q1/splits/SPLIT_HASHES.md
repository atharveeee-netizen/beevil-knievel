# Cryptographic Signatures of Frozen Benchmark Splits (Phase 3)

These cross-validation splits were generated and cryptographically frozen **strictly before model training commenced**, adhering to the preregistration protocol.

| Split Manifest | Task | Protocol | Outer Folds | SHA-256 Hash |
|---|---|---|---|---|
| `t2_bee_vs_nobee_splits.json` | T2: Bee vs Non-Bee | P-A (Unseen Hive, k=5, 3 seeds) | 15 | `0b777faaaf991bde98958f36d20f330298f1d9f0ee604d94ec3eefe3433b1019` |
| `t4_mspb_splits.json` | T4: MSPB Phenotype | P-A (Unseen Hive, k=5, 3 seeds) | 15 | `309e29f836a8d3580363011782e3bccd18db10887eccc8eda34ced8079a21a49` |
| `splits_seed0.json` | Master Split Index | P-A Verification Index | - | `0d32e09dbe40a0426b39363c410de00135b6cd29760d1119417eba0ef8f2795e` |

---
**Verification Guarantee:** Zero hive overlap exists between training and test sets in any outer fold. No test fold data was accessed for hyperparameter tuning, feature selection, or early stopping.
