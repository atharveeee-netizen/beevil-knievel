# BEEVIL KNIEVEL — FRONTEND DESIGN SPECIFICATION

**Standard:** IEEE HARDWAIre Challenge Phase 2 / Precision Cyber-Physical Telemetry  
**Visual Style:** Precision Field Engineering (Scientific Instrumentation, Restraint, High-Information Hierarchy)  
**Authority:** Master Frontend Design Source of Truth  
**Target Surfaces:** Surface A (Public Portal), Surface B (Field App), Surface C (Operations Console)  

---

## 1. Visual Philosophy & Design Principles

1. **Information over Decoration:** Every visual element must convey engineering truth or structural hierarchy. Reject decorative gradients, glowing borders, floating blobs, and artificial animations.
2. **Monochrome Foundation with Semantic Accents:** Base surfaces utilize deep technical slates and carbon tones (`#0a0c10`, `#12151c`, `#1a1e28`). Accent color is strictly reserved for actionable interactions (amber `#f59e0b` / gold `#ffc833`) and physical status indicators.
3. **Restraint & Precision:** Thin technical borders (1px solid `#262c3a`), generous whitespace, disciplined alignment, and crisp tabular typography.
4. **Zero AI Slop:** No decorative network meshes, no glowing artificial brains, no fake counters, and no fictitious metrics.
5. **Outdoor Readability First:** The interface must provide a dedicated Sunlight/Veil mode with high-contrast monochrome inversion and large touch targets ($\ge 48\text{px}$) for field operation in direct sunlight with protective apiary gloves.

---

## 2. Design Tokens

### 2.1 Color Palette

#### Base Neutrals (Dark Theme - Standard)
- `bg-canvas`: `#090b10` (Primary background, deep technical black)
- `bg-surface-1`: `#11141d` (Base component and card background)
- `bg-surface-2`: `#181d28` (Interactive hover surface, secondary containers)
- `bg-surface-3`: `#222938` (Elevated headers, active selection states)
- `border-subtle`: `#1d2332` (Subtle dividers and background grid lines)
- `border-default`: `#283144` (Standard card and table borders)
- `border-strong`: `#3d4964` (Focused inputs, active tab highlights)
- `text-primary`: `#f1f5f9` (High-contrast white for primary metrics and titles)
- `text-secondary`: `#94a3b8` (Muted gray for subtitles, units, and labels)
- `text-tertiary`: `#64748b` (Dim gray for timestamps, breadcrumbs, and inactive items)

#### High-Contrast Sunlight Mode (Field App)
- `bg-sunlight-canvas`: `#ffffff` (Pure white background for direct outdoor glare)
- `bg-sunlight-surface`: `#f8fafc` (Light gray surface)
- `border-sunlight`: `#0f172a` (Solid high-contrast black borders)
- `text-sunlight-primary`: `#000000` (Maximal contrast black text, 21:1 ratio)
- `text-sunlight-secondary`: `#334155` (Dark slate secondary text)

#### Semantic Status & Triage Colors
- `status-normal`: `#10b981` (Emerald - optimal colony homeostasis, nominal temperature $34.5^\circ\text{C}$)
- `status-attention`: `#f59e0b` (Amber - early variance, minor thermal fluctuation, elevated foraging)
- `status-investigate`: `#f97316` (Orange - pre-swarm acoustic surge $450\text{ Hz}$, prolonged thermal drift)
- `status-critical`: `#ef4444` (Red - queenlessness, severe brood chill $<32^\circ\text{C}$, bear tamper/knockdown)
- `status-stale`: `#64748b` (Muted Slate - telemetry packet timestamp $>15\text{ min}$)
- `status-fault`: `#dc2626` (Bright Red - hardware I2C NACK or disconnected sensor)

#### Evidence & Claim Class Tokens
- `badge-real-silicon`: Border `#10b981`, Text `#34d399`, Background `rgba(16, 185, 129, 0.1)`
- `badge-validated`: Border `#3b82f6`, Text `#60a5fa`, Background `rgba(59, 130, 246, 0.1)`
- `badge-calculated`: Border `#8b5cf6`, Text `#a78bfa`, Background `rgba(139, 92, 246, 0.1)`
- `badge-simulated`: Border `#eab308`, Text `#fde047`, Background `rgba(234, 179, 8, 0.1)`
- `badge-proposed`: Border `#64748b`, Text `#94a3b8`, Background `rgba(100, 116, 139, 0.1)`

---

### 2.2 Typography

#### Font Families
- **Primary Sans:** `Roobert`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif` (Precision geometric grotesque)
- **Technical & Data Mono:** `JetBrains Mono`, `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, `monospace` (Tabular numbers, hex masks, code blocks, telemetry metrics)

#### Type Scale
- `text-2xs`: `10px` / `line-height: 14px` (Hardware pin tags, packet hex values, timestamps)
- `text-xs`: `12px` / `line-height: 16px` (Secondary telemetry units, badges, breadcrumbs)
- `text-sm`: `14px` / `line-height: 20px` (Body text, data table rows, navigation items)
- `text-base`: `16px` / `line-height: 24px` (Standard narrative body, input field text)
- `text-lg`: `18px` / `line-height: 28px` (Card headers, key callouts)
- `text-xl`: `20px` / `line-height: 28px` (Section subheaders, metric values)
- `text-2xl`: `24px` / `line-height: 32px` (Section titles, modal headers)
- `text-3xl`: `30px` / `line-height: 36px` (Major section headings)
- `text-4xl`: `36px` / `line-height: 40px` (Public portal display headlines)
- `text-5xl`: `48px` / `line-height: 52px` (Hero brand title)

---

### 2.3 Spacing, Grid & Layout

- **Base Spacing Unit:** `4px`
- **Scale:** `4px` (1), `8px` (2), `12px` (3), `16px` (4), `24px` (6), `32px` (8), `48px` (12), `64px` (16), `96px` (24).
- **Container Max-Widths:**
  - Standard Content: `1280px` (`max-w-7xl`)
  - Reading / Technical Specs: `960px` (`max-w-4xl`)
  - Console Split Layout: Fluid `100vw` with `320px` left panel and flex-grow right viewport.
- **Breakpoints:**
  - `mobile-sm`: `375px` (Small smartphone)
  - `mobile`: `430px` (Standard modern smartphone)
  - `tablet`: `768px` (iPad / field tablet portrait)
  - `desktop`: `1024px` (Field laptop / tablet landscape)
  - `wide`: `1280px` (Standard monitor)
  - `ultra`: `1536px` (Operations wall display / dual-monitor)

---

### 2.4 Borders, Radius & Shadows

- **Border Width:** Uniform `1px` solid for all technical frames. Focus ring `2px` offset.
- **Corner Radius:**
  - Micro / Badges / Tags: `2px` (`rounded-xs`)
  - Buttons / Inputs / Controls: `4px` (`rounded-sm`)
  - Cards / Panels / Containers: `6px` (`rounded`)
  - Large Modals: `8px` (`rounded-md`)
  - *Strict Rule:* Zero rounded-3xl or pill-shaped cards.
- **Shadows:**
  - Ambient: `0 1px 3px rgba(0, 0, 0, 0.4)`
  - Elevated Popover: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)`

---

## 3. Component Standards

### 3.1 Buttons & Interactive Controls
- **Touch Target:** Minimum `48px` height for all mobile Field App buttons. Minimum `36px` for desktop Console.
- **Primary Action:** Solid background (`bg-[#f59e0b] text-[#090b10] hover:bg-[#d97706]`), font-mono uppercase, letter-spacing `0.05em`, bold `600`.
- **Secondary Action:** Dark slate background (`bg-[#181d28] text-[#f1f5f9] border border-[#283144] hover:border-[#3d4964]`).
- **Ghost Action:** Transparent background with hover highlight.

### 3.2 Cards & Technical Panels
- **Structure:** 
  1. Header with uppercase monospace title, status indicator, and claim badge.
  2. Main body with clear tabular data, chart, or technical schematic.
  3. Footer with timestamp, sampling rate, and hardware source.
- **Background:** `bg-[#11141d] border border-[#283144]`.

### 3.3 Data Visualization & Engineering Charts
- **Framework:** Deterministic SVG vector charts with tabular numeric tooltips.
- **Axes & Grids:** Subtle dotted or dashed gridlines (`#1d2332`), explicit units on Y-axis (e.g. `°C`, `ppm`, `Hz`, `kg`, `dBm`), time delta on X-axis.
- **Telemetry Lines:** Solid 1.5px paths; no heavy blurred drop-shadows under lines.
- **Missing Data:** Clear dashed gaps when packets are missed; never interpolate across sensor disconnects.

### 3.4 Status Indicators & Triage Hierarchy
- **`NORMAL`:** Hive is thermoregulating stably ($34.5 \pm 0.8^\circ\text{C}$), acoustic baseline $180 - 240\text{ Hz}$, positive/flat mass.
- **`ATTENTION`:** Minor drift detected ($S_t^- > 0.5^\circ\text{C}\cdot\text{hr}$), slight acoustic deviation, battery $< 30\%$.
- **`INVESTIGATE`:** Acoustic surge in $450 - 750\text{ Hz}$ band (pre-swarm warning within 24h), CUSUM breach ($S_t^- > 1.2^\circ\text{C}\cdot\text{hr}$), sudden weight loss $> 2.5\text{ kg}$.
- **`CRITICAL`:** Core temperature collapse ($T_{\text{core}} < 31.0^\circ\text{C}$), queenless roar, tamper accelerometer tilt $> 45^\circ$, battery cutoff imminent ($< 3.3\text{V}$).

---

## 4. Outdoor Field Conditions & Offline States

1. **Sunlight/Veil Mode:** Dedicated toggle in the Field App header switching the entire DOM to high-contrast monochrome (white canvas, solid black text, 2px borders) designed for maximum visibility through bee veils and glare.
2. **Offline Resilience:** Local storage cache holds last known hive states. Header displays `OFFLINE (CACHED: 14m AGO)` with automatic sync retry.
3. **Data Freshness Badge:** Displayed next to every live value:
   - Green dot: Received $< 5\text{ min}$ ago.
   - Yellow dot: Received $5 - 15\text{ min}$ ago.
   - Flashing red outline: Received $> 15\text{ min}$ ago (`STALE TELEMETRY`).
4. **Sensor Fault Display:** When an unpopulated or failed sensor returns sentinel values (`null` or `-9999`), display `SENSOR NOT DETECTED [0x0000]` instead of zero or fake values.

---

## 5. Accessibility & Motion

- **Color Invariance:** Status states are always indicated by both color AND text/icon (e.g., green dot + "NORMAL" label; red warning icon + "CRITICAL").
- **Contrast:** Minimum 4.5:1 for standard text; minimum 7:1 for critical telemetry in Sunlight mode.
- **Motion:** Transitions restricted to fast, subtle micro-interactions ($100 - 150\text{ms}$ ease-out). Full support for `@media (prefers-reduced-motion: reduce)`.
