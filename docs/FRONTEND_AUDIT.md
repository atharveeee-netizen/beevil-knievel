# BEEVIL KNIEVEL — FRONTEND SYSTEM AUDIT

**Audit Date:** September 2026  
**Auditor:** SYZYGY Engineering & Visual-Design Swarm  
**Target Repository:** `beevil-knievel/frontend`  
**Standard:** IEEE HARDWAIre Challenge Phase 2 / Precision Cyber-Physical Apiculture  
**Evaluation Rule:** REPOSITORY TRUTH > MARKETING CLAIMS | ZERO AI SLOP  

---

## Executive Summary

This comprehensive audit evaluates the existing frontend codebase of **BEEVIL KNIEVEL**. The audit was conducted prior to code reconstruction to identify technical inaccuracies, architectural weaknesses, accessibility gaps, and AI-slop visual artifacts.

The current frontend was found to suffer from a fundamental identity contradiction: while the backend, hardware, and simulation layers represent serious IEEE-grade cyber-physical telemetry (RAK4631 nRF52840 MCU, SX1262 LoRa, TI TMP117, Sensirion SCD41, Bosch BME688, Raspberry Pi 3B+ edge gateway with SQLite WAL, and 11 ANSYS multi-physics simulation modules), the frontend was structured largely around a retro consumer toy console aesthetic (Panic Playdate imitation with yellow hand-crank), consumer e-commerce tropes ($189 pre-orders, 15% student discounts, fictitious consumer tiers), and decorative animation libraries (`reactbits` click sparks, star borders, particle emitters).

This audit mandates a complete reconstruction into three connected surfaces sharing a unified, precision field engineering visual language.

---

## A. Existing Pages

| Page Route | Source File | Lines | Purpose / Description | Primary Flaw |
|---|---|---|---|---|
| `/` | `frontend/src/app/page.tsx` | 54 | Public landing page assembling 11 sections. | Muddy `#7a8085` background, embeds toy Playdate console and fake e-commerce store. |
| `/app` | `frontend/src/app/app/page.tsx` | 2,878 | Monolithic prototype dashboard & mobile app combo. | Giant monolithic file, unmaintainable, mixes mock blockchain with toy controls. |
| `/playdate` | `frontend/src/app/playdate/page.tsx` | 133 | Standalone Playdate retro console emulator. | Pure gimmick that trivializes industrial apiary instrumentation. |
| `/_not-found` | Next.js default | — | 404 handler. | Unstyled default fallback. |

---

## B. Existing Routes

- `/`: Root landing page.
- `/app`: Unpartitioned monolith attempting to serve both mobile field technician and edge gateway console simultaneously.
- `/playdate`: Standalone retro console route with virtual crank and D-pad.

---

## C. Existing Components

### 1. Section Components (`frontend/src/components/`):
- `Navbar.tsx`: Sticky navigation with Playdate logo, quick links, and simulated universal search.
- `HeroSection.tsx`: Hero with web-audio tone oscillator (220 Hz, 250 Hz, 450 Hz), $189 pre-order button, and embedded Playdate console.
- `SystemSection.tsx`: System breakdown featuring sensor callouts and acoustic ear cutaways.
- `EdgeAISection.tsx`: 8 core diagnostic models; claims fictitious metrics ("96.84% Out-of-Sample Acc", "Sensirion SHT45").
- `CatalogSection.tsx`: Consumer product tier cards ("Beevil Solo", "Beevil Apiary Pro", "Beevil Pollination Grid").
- `DeveloperSection.tsx`: Open Apiculture SDK & HiveOS App overview.
- `EducationSection.tsx`: University research & education program claiming "15% Off".
- `OrderAccessoriesSection.tsx`: Fictitious hardware e-commerce store with pricing and cart triggers.
- `SpecsSection.tsx`: Master hardware specifications; falsely claims "Dedicated 6 TOPS Edge NPU/TPU via USB accelerator".
- `GallerySection.tsx`: Hardware image grid pulling obsolete assets.
- `MissionSection.tsx`: Narrative on Marcus Varro (37 BC Roman scholar) and modern apiculture.
- `NewsletterAndHelpSection.tsx`: Consumer newsletter signup and helpdesk form.
- `Footer.tsx`: Basic footer with social links and copyright.
- `PlaydateConsole.tsx`: 500+ line interactive component rendering a yellow retro game console with virtual crank and 1-bit screen.

### 2. Decorative Animation Components (`frontend/src/components/reactbits/`):
- `BlurText.tsx`, `ClickSpark.tsx`, `CountUp.tsx`, `DecryptedText.tsx`, `Magnet.tsx`, `Particles.tsx`, `ShinyText.tsx`, `SplitText.tsx`, `SpotlightCard.tsx`, `Squares.tsx`, `StarBorder.tsx`, `TiltedCard.tsx`, `TrueFocus.tsx`.
- **Verdict:** All 12 components represent gratuitous visual distraction and AI-slop embellishment.

---

## D. Existing Assets

- **Fonts:** `public/fonts/Roobert-*.woff2` (Roobert Light, Regular, Medium, SemiBold, Bold, Heavy) — High quality geometric grotesque font suitable for precision engineering when paired with tabular monospace.
- **Images:** `public/images/hardware/` contains legacy AI-generated concept renders and stock photos.
- **Missing in Public:** None of the 13 canonical MATLAB publication figures (`docs/figures/matlab/01_*.svg` through `13_*.svg`) were copied into `public/`, forcing README and documentation to reference local docs rather than the live web app.

---

## E. Existing Technical Claims Audit

| Claim in Current Frontend | Source in Frontend | Repository Truth / Canonical BOM | Classification | Action Required |
|---|---|---|---|---|
| "Dedicated 6 TOPS Edge NPU/TPU via USB accelerator" | `SpecsSection.tsx` | Raspberry Pi 3B+ CPU executes Python `EdgeDiagnosticEngine` in $\approx 1.2\text{ ms}$. No USB TPU exists in BOM. | **FABRICATED** | Remove claim; report Raspberry Pi 3B+ CPU inference. |
| "Sensirion SHT45 High-Precision Humidity" | `SpecsSection.tsx`, `EdgeAISection.tsx` | Canonical BOM uses Sensirion `SCD41` (photoacoustic NDIR CO2) and Bosch `BME688` (VOC + RH%). | **INACCURATE** | Correct to SCD41 and BME688. |
| "Pre-Order $189 / 15% Student Discount" | `HeroSection.tsx`, `OrderAccessoriesSection.tsx` | Research prototype developed for IEEE HardwAIre Phase 2; BOM cost is $64.54 USD (₹5,380). | **FICTITIOUS** | Eradicate all consumer e-commerce. |
| "Beevil Solo / Apiary Pro / Pollination Grid" | `CatalogSection.tsx` | System architecture is a unified 3-tier platform (RAK4631 Node $\to$ LoRa/BLE Mesh $\to$ RPi Gateway). | **FICTITIOUS** | Replace with multi-hive scalability proofs (1 to 100 hives). |
| "LiFePO4 3.2V battery chemistry" | Legacy text in `/app` | Baseboard is RAK5005-O with TP4054 CC/CV charger hardwired for 4.20V termination. Battery is strictly 1S 3.7V Li-ion (NMC) 18650. | **CONTRADICTION** | Strictly specify 1S 3.7V Li-ion NMC (3.27V to 4.20V). |
| "256-pt Real FFT @ 16 kHz" | Documentation | Validated in CMSIS-DSP firmware and MATLAB model (`05_acoustic_dsp.png`). | **VALIDATED** | Highlight as primary acoustic signal processing proof. |

---

## F. Broken UX

1. **Dual Identity Collision:** Navigating between `/` and `/app` produces a jarring context break from a Playdate toy gadget to a dense cryptocurrency-style telemetry screen.
2. **Audio Oscillation Trap:** Audio presets in `HeroSection.tsx` trigger continuous browser oscillator tones that can be annoying or startling to users.
3. **Monolithic Scroll Lag in `/app`:** 2,878 lines of React state in a single component leads to re-render bottlenecks when streaming live packets.
4. **No Direct Triage for Technicians:** An apiary inspector opening `/app` on a phone cannot immediately answer *"Is this hive okay?"* without digging through tabs and modal dialogs.

---

## G. Visual Inconsistencies

1. **Background Clashing:** Body background is hardcoded to a muddy medium grey (`#7a8085`), while card surfaces use deep black (`#212223`) and neon yellow (`#ffc833`), creating poor readability and lack of visual polish.
2. **SaaS Gradients vs Industrial Restraint:** Gratuitous linear gradients (`from-[#ffc833] via-[#ffd659] to-[#ffc833]`, purple glossy buttons) clash with the technical credibility of an IEEE engineering platform.
3. **Arbitrary Spacing:** Inconsistent padding across cards (p-4, p-6, p-8) without a unified token scale.

---

## H. Responsive Problems

1. **Horizontal Table Blowout:** Wide telemetry data tables in `/app` cause horizontal scrollbars on viewports $< 768\text{px}$.
2. **Touch Targets $< 48\text{px}$:** Sub-navigation buttons and toggle pills in `/app` measure 32px to 36px in height, making them unclickable when wearing thick leather apiary gloves.
3. **Playdate Console Sizing:** Fixed SVG dimensions on the virtual console cause clipping on small mobile viewports ($320\text{px} - 375\text{px}$).

---

## I. Accessibility Problems

1. **WCAG Contrast Failures:** Low-contrast text elements such as `text-white/40` on `#7a8085` background yield contrast ratios below 2.8:1 (WCAG AA requires 4.5:1).
2. **Missing ARIA Live Regions:** Dynamic telemetry value updates in the dashboard lack `aria-live="polite"` attributes, rendering them invisible to screen readers.
3. **Keyboard Inaccessibility:** Custom tab switchers in `/app` use un-focusable `div` elements with `onClick` handlers rather than semantic buttons or native tabs.
4. **No Reduced Motion Support:** Decorative keyframe animations run continuously without checking `prefers-reduced-motion`.

---

## J. Performance Problems

1. **Unused Animation JavaScript:** Importing `motion` alongside 12 custom `reactbits` animation components bloats initial client bundle size.
2. **Unoptimized PNG Assets:** Legacy hardware render PNGs (some $> 2\text{ MB}$) were loaded without dimension bounds or WebP optimization.
3. **Client-Side Heavy Charting:** Inline SVG recreation on every 100ms interval causes high CPU utilization on mobile devices.

---

## K. Duplicate Components

- Multiple independent status badges with divergent styling across `HeroSection.tsx`, `EdgeAISection.tsx`, and `app/page.tsx`.
- Duplicate frequency-to-tone audio engines implemented in both `HeroSection.tsx` and `PlaydateConsole.tsx`.
- Multiple divergent card wrappers with inconsistent border-radius and backdrop-filter implementations.

---

## L. Dead Code

- Unused hook definitions in `frontend/src/hooks/`.
- Dead styles in `globals.css` (`.btn-order-purple`, `.btn-pill-aqua-dark`, retro CRT scanline classes).
- Unused icons imported from `lucide-react`.

---

## M. Fake / Placeholder Content

- "Pre-Order $189" CTA and checkout buttons.
- "15% Off University Discount" banner.
- Consumer tiers: Solo ($89), Apiary Pro ($349), Fleet ($1,299).
- Synthetic alarm pheromone index ("isopentyl acetate index 0-100").

---

## N. Missing States

- **Field App:** No High-Contrast "Sunlight/Veil" mode for reading in direct outdoor glare.
- **Data Freshness:** No explicit "STALE DATA" warning when last packet timestamp exceeds 15 minutes.
- **Sensor Faults:** No individual sensor failure state (e.g. `NOT_CONNECTED`, `CRC_ERR`, `1-WIRE TIMEOUT`).
- **Offline Mode:** No visual indication of cached local data vs live gateway connection.

---

## O. Recommended Deletions

1. `frontend/src/components/reactbits/*` (All 12 files: `BlurText.tsx`, `ClickSpark.tsx`, `CountUp.tsx`, `DecryptedText.tsx`, `Magnet.tsx`, `Particles.tsx`, `ShinyText.tsx`, `SplitText.tsx`, `SpotlightCard.tsx`, `Squares.tsx`, `StarBorder.tsx`, `TiltedCard.tsx`, `TrueFocus.tsx`).
2. `frontend/src/components/OrderAccessoriesSection.tsx` (Fictitious shop).
3. `frontend/src/components/EducationSection.tsx` (Fictitious discount program).
4. `frontend/src/components/CatalogSection.tsx` (Fictitious consumer tier catalog).
5. `frontend/src/components/PlaydateConsole.tsx` (Toy console emulator).
6. `frontend/src/components/NewsletterAndHelpSection.tsx` (Generic SaaS filler).
7. Retro console CSS classes in `globals.css`.

---

## P. Recommended Rebuilds

1. **Design System:** Implement precision engineering design tokens (`frontend/src/lib/design-tokens.ts`) and modern high-contrast CSS (`globals.css`).
2. **Core Primitives:** Create unified `Badge`, `StatusDot`, `EngineeringCard`, `EngineeringChart`, `SpectralBandChart`, and `ThermalGradientPlot`.
3. **Surface A (Public Engineering Website):** Rebuild `/` as an editorial technical narrative tracing *Problem $\to$ Transduction $\to$ Acoustic DSP $\to$ Thermodynamics $\to$ Embedded Node $\to$ Dual-Radio $\to$ Edge Gateway $\to$ Simulation $\to$ Evidence*.
4. **Surface B (Field App):** Build dedicated `/field` optimized for mobile outdoor apiculture: $\ge 48\text{px}$ touch targets, sunlight high-contrast mode, and instant triage (`NORMAL`, `ATTENTION`, `INVESTIGATE`, `CRITICAL`).
5. **Surface C (Operations Console):** Build dedicated `/console` (and `/app` hub) providing industrial telemetry density, 100-hive status grid, SVG engineering plots, and live SQLite WAL transaction inspection.
6. **Canonical Asset Pipeline:** Copy all 13 canonical MATLAB figures into `public/figures/canonical/` for high-resolution vector and lossless PNG rendering.
