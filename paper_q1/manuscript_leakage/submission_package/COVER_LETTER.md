# Cover Letter

**To:**  
The Editors-in-Chief  
*Computers and Electronics in Agriculture*  
Elsevier

**Date:** November 12, 2026

**Subject:** Submission of Original Research Article: *"Split Protocol or Feature Transform? Explaining Generalisation Gaps in Acoustic Honeybee Colony Classification"*

Dear Editors,

We are pleased to submit our original research manuscript titled **"Split Protocol or Feature Transform? Explaining Generalisation Gaps in Acoustic Honeybee Colony Classification"** for consideration as a regular research article in *Computers and Electronics in Agriculture*.

### Context and Motivation
Acoustic machine learning models for honeybee (*Apis mellifera*) colony state monitoring frequently report test accuracies exceeding 90%. However, recent independent evaluations have observed that the same models degrade sharply when deployed on previously unseen physical hives. In the current literature, two competing hypotheses have been proposed to explain this performance drop:
1. **Split Leakage**: Random row-level train-test splits allow near-duplicate temporal frames from continuous recordings to cross the evaluation boundary, causing models to memorize colony-specific background signatures rather than biological state.
2. **Feature Encoding**: Fixed-gain audio representations retain microphone gain and site-specific acoustics, acting as acoustic fingerprints rather than state descriptors.

### Key Contributions & Findings
To resolve this debate, we design and execute a pre-registered benchmark evaluated on the multi-sensor public dataset MSPB (comprising 1,836,914 telemetry rows and 306 verified physical inspections across 53 hives in two apiaries):
- **Empirical Quantification of Leakage**: We reproduce published row-level evaluation protocols and demonstrate that random row splits indeed inflate classification performance by up to +9.2 macro-F1 points (and over +14% raw accuracy) for high-capacity models like Random Forests.
- **Resolution via Unit of Analysis**: We prove that aggregating continuous audio streams to the physical inspection event level completely eliminates the hive-leakage gap ($p = 0.81$ across model-transform pairs), while simultaneously raising the out-of-fold generalization score from 0.68 to 0.74 macro F1.
- **Acoustic vs. Environmental Information**: We show that relative band energies provide gain invariance, and that indoor brood microclimate telemetry contributes a robust +8.5 F1 gain that reliably transfers to an unseen geographical apiary.
- **Reproducibility & Provenance**: Every single numeric claim, table, and figure in the manuscript is generated programmatically from publicly archived raw data and open-source verification scripts, with zero manual number typing.

### Author Disclosures
- **Originality**: This manuscript is original, has not been published previously, and is not currently under consideration for publication elsewhere.
- **Related Work Separation**: A preliminary hardware architecture and telemetry specification for edge sensing was presented at an IEEE student conference. The present journal manuscript contains entirely new scientific investigations, methodological analyses, dataset evaluations, statistical tests, and findings that do not overlap with the conference paper.
- **Competing Interests**: The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper.

We believe this work addresses a critical methodological challenge in precision apiculture and provides agricultural AI researchers with clear, practical evaluation guidelines for robust bioacoustic monitoring.

Thank you very much for your time and consideration of our work.

Sincerely,

**Atharve Dahima** (Corresponding Author)  
Department of Electronics and Communication Engineering  
Malaviya National Institute of Technology Jaipur, Rajasthan, India  
Email: 2022uec1404@mnit.ac.in  
