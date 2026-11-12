# Leakage ladder manuscript

A methods paper testing whether reported acoustic honeybee colony classifier
scores come from split leakage or from feature encoding.

## Reproduce

From the repository root:

```bash
# 1. download the public data (415 MB, SHA-256 verified against MANIFEST.csv)
python -m paper_q1.data_tools.mspb_download

# 2. build the feature table (306 inspection rows, 53 hives)
python -m paper_q1.features.mspb_feature_builder

# 3. run the inspection-level ladder (4 rungs x 3 transforms x 5 models)
python -m paper_q1.leakage_ladder

# 4. run the row-level comparison
python -m paper_q1.leakage_ladder_rows

# 5. reproduce the published row-level protocol, then repair it
python -m paper_q1.literature_reproduction

# 6. sweep the label cut-off (15, 20, 25 frames)
python -m paper_q1.threshold_sensitivity

# 7. measure why the original D2 temperature label was abandoned
python -m paper_q1.d2_label_check

# 8. generate numbers and figures from the result files
python -m paper_q1.leakage_spec_generator
python -m paper_q1.leakage_figures

# 9. build the PDF
cd paper_q1/manuscript_leakage
pdflatex main && bibtex main && pdflatex main && pdflatex main
```

## What is generated, what is written

| File | Origin |
|---|---|
| `leakage_numbers.tex` / `.sty` | generated from `results/leakage_ladder.json` and the other result files |
| `figures/*.pdf` | generated from `results/leakage_ladder.json` and `results/literature_reproduction.json` |
| `main.tex` | written by hand, all numbers are macros |
| `references.bib` | written by hand, every entry verified against Crossref or arXiv |

No number in the manuscript is typed directly. `paper_q1/audit_numbers.py`
lists every numeric literal that is not a macro, so each one can be justified.

## Result summary

The pre-registered claim was that a random row split inflates macro F1 above a
hive holdout. That claim is falsified at inspection granularity.

| Transform | P0 random rows | P2 unseen hive | P0 - P2 |
|---|---|---|---|
| relative bands | 0.7310 | 0.7439 | -0.0129 |
| absolute dB bins | 0.7344 | 0.7178 | +0.0166 |
| bands + environment | 0.8374 | 0.8342 | +0.0033 |

The largest effect at that unit of analysis is the indoor environment block,
worth about eight to nine macro-F1 points and stable across apiaries.

Restoring the row-level protocol brings the leak back, and it is
capacity-dependent:

| Model | P0 random rows | P2 unseen hive | Gap |
|---|---|---|---|
| Logistic regression | 0.6889 | 0.6784 | +0.0105 |
| Random forest | 0.7754 | 0.6832 | +0.0922 |
| Hist. gradient boosting | 0.7407 | 0.6852 | +0.0555 |

Aggregation removes the leak and raises the honest score
(inspection-level P2 0.7439 vs row-level P2 0.6852), so aggregating before
splitting is both the safer protocol and the better model.

## Known limitations, stated in the paper

- Three of eight canonical acoustic bands receive no MSPB data, because the
  sensor covers 122 to 580 Hz and the band spec covers 30 to 2000 Hz.
- Only 53 of 94 sensor tags carry colony-strength labels.
- Colony strength is not stable within a hive: 46 of 53 hives (86.8%) change
  class across rounds, and the median within-hive range of total frames is 14.0
  on a 0 to 34 scale. The hive holdout therefore tests generalisation of that
  within-hive change to new hives, not steady-state discrimination.
- The apiary holdout is a two-fold comparison.
- The reproduction applies the published protocol to this dataset. It does not
  reproduce the number of any single prior study.
