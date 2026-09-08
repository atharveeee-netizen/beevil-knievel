# CANONICAL FIGURE STYLE CONTRACT (Zero-Slop Specification)

**Project:** BEEVIL KNIEVEL (Precision Edge AI & Multi-Hop LoRa Smart Apiculture Platform)  
**Standard:** Publication-Grade IEEE / ACM / Industrial Engineering Documentation  
**Version:** 1.0.0-PRO  
**Target:** Vector SVG Deterministic Rendering & Technical Precision Graphics  

---

## 1. Core Philosophy & Non-Negotiables

1. **Technical Correctness Over Decoration**: Every shape, trace, line, and label represents an authentic physical component, protocol bus, or mathematical transfer function.
2. **Deterministic Geometry**: All architecture, hardware, telemetry, and topology figures MUST be rendered via deterministic vector geometry (SVG), never unconstrained generative AI rasters.
3. **Zero AI Slop**: Absolutely NO glowing blue AI brains, floating futuristic holographic panels, meaningless neon traces, arbitrary circuit board traces, fake data streams, or impossible wiring.
4. **Information Hierarchy**: Strict tiering: Headline/Title > Subsystem/Block > Component Name > Pin/Register/Bus Annotation.

---

## 2. Composition & Canvas Layout

- **Primary Aspect Ratio**: 16:9 (`1080 x 608` or `1200 x 675`) and Panoramic 2:1 (`1080 x 540` / `1120 x 560`).
- **Margins & Safe Zones**: Minimum 32px outer canvas padding; 24px inner card padding.
- **Reading Direction**: Left-to-right (Data Ingress -> Processing -> Egress) or Top-to-bottom (Physical Transduction -> Edge Computation -> Cloud/Gateway Telemetry).
- **Z-Index & Layering**:
  1. Base Canvas Background: Deep technical matte `#070a14` to `#0b111e` (Subtle 0.5px coordinate grid at 24px intervals).
  2. Subsystem Containers / Group Enclosures: Dark slate container fill `#10192d`, stroke `#1e293b` (1px).
  3. Active Module Cards: `#131f37` fill with `#334155` border (1.2px) and 6px corner radius (`rx="6"`).
  4. Signal & Power Routing Traces: High-contrast orthogonal and routed polyline connectors.
  5. Text Labels & Badges: High-contrast vector typography with explicit baseline offsets.

---

## 3. Typography Hierarchy

All fonts MUST resolve cleanly across all operating systems using universal typography fallbacks:
- **Primary Font Stack**: `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Monospace Code/Pin Stack**: `"SF Mono", "JetBrains Mono", Consolas, "Liberation Mono", Menlo, monospace`

| Tier | Size | Weight | Color | Case | Tracking | Purpose |
|---|---|---|---|---|---|---|
| **Canvas Title** | 18px | 800 (Bold) | `#ffffff` | UPPERCASE | +0.8px | Main Figure Identification & Standard |
| **Subtitle / Standard** | 11px | 500 (Medium) | `#94a3b8` | Title Case | +0.3px | IEEE standard, clock rate, latency, target |
| **Subsystem Header** | 13px | 700 (Bold) | `#38bdf8` / `#fbbf24` | UPPERCASE | +0.5px | Subsystem boundary identifier |
| **Component Name** | 11.5px | 700 (Bold) | `#f8fafc` | Title Case | 0px | IC / Module / Process name |
| **Component Subtitle** | 9.5px | 400 (Regular) | `#94a3b8` | Sentence Case | 0px | Part number, manufacturer, specs |
| **Bus / Pin Annotation** | 9px | 600 (Mono) | `#38bdf8` / `#34d399` | Monospace | 0px | I2C (0x48), I2S, SPI, 1-Wire, GPIO |
| **Metric Badge** | 8.5px | 700 (Bold) | Variable | UPPERCASE | +0.4px | Status, power consumption, latency |

---

## 4. Connector & Routing Grammar

Connectors MUST NOT look identical. Every bus type has an authoritative visual dialect:

| Bus / Link Type | Stroke Color | Stroke Width | Dash Array | Marker / Arrowhead | Protocol / Description |
|---|---|---|---|---|---|
| **DATA (High-Speed / Audio)** | `#38bdf8` (Sky) | 1.8px | Solid (`none`) | `url(#arrCyan)` | I2S (2000 Hz PCM), SPI (8 MHz), UART |
| **DATA (Low-Speed Sensor)** | `#38bdf8` (Sky) | 1.2px | `4, 3` | `url(#arrCyan)` | I2C (100/400 kHz), 1-Wire (DS18B20) |
| **CONTROL & INTERRUPTS** | `#fbbf24` (Amber) | 1.4px | `3, 3` | `url(#arrGold)` | GPIO INT, WAKE, RST, BUSY, CS |
| **POWER (VCC / Battery / Solar)** | `#f43f5e` (Rose) | 2.0px | Solid (`none`) | `url(#arrRose)` | 3.3V LDO, VBAT (3.7V), VBUS (5V), Solar |
| **GROUND (GND)** | `#64748b` (Slate) | 1.2px | Solid (`none`) | Ground symbol | Common 0V Ground Plane |
| **RADIO FREQUENCY (RF)** | `#a855f7` (Purple) | 1.6px | `5, 4` | `url(#arrPurple)` | Sub-GHz LoRa (865-867 MHz), IPEX, SMA |
| **NETWORK / IP / REST** | `#10b981` (Emerald) | 1.6px | Solid (`none`) | `url(#arrEmerald)` | Ethernet / Wi-Fi, HTTP/JSON, WebSocket |

---

## 5. Technical Color Palette

Restrained, publication-grade dark palette. Zero gaudy saturation, zero neon glow:

```text
BACKGROUND:      #070a14 (Canvas Deep), #0b111e (Midtone), #0f172a (Periphery)
SURFACES:        #10192d (Panel Container), #131f37 (Card Body), #1a2744 (Highlight)
BORDERS:         #1e293b (Subtle), #334155 (Medium), #475569 (Active Focus)
TEXT PRIMARY:    #ffffff (Pure White for Headings), #f8fafc (Near White for Components)
TEXT SECONDARY:  #94a3b8 (Muted Slate for Descriptions), #64748b (Dim Slate for Footers)
ACCENT CYAN:     #0284c7 (Base), #38bdf8 (Active Signal / Telemetry Data)
ACCENT AMBER:    #d97706 (Base), #fbbf24 (Acoustics / Biological DSP / Warn)
ACCENT EMERALD:  #059669 (Base), #34d399 (Power / Nominal State / Verified)
ACCENT ROSE:     #e11d48 (Base), #fb7185 (Power Rails / Critical Alarm)
ACCENT PURPLE:   #7c3aed (Base), #a855f7 (LoRa Sub-GHz RF Physical Layer)
```

---

## 6. Density & Visual Anti-Slop Limits

1. **Maximum Labels per Figure**: 40 unique text nodes (avoids visual claustrophobia).
2. **Maximum Connector Crossings**: Zero direct unbridged line crossings where possible; use orthogonal routing with radius turns or orthogonal Manhattan routing.
3. **No Phantom Hardware**: Every pin, IC, and antenna must correspond to the official BOM (`hardware/BOM_AND_PINOUT.md`).
4. **Exact Formulas**: Equations must use standard LaTeX / IEEE notation ($f_s = 2000\text{ Hz}$, $N=256$, $\Delta f = 7.8125\text{ Hz}$).
5. **No Decorative Circuitry**: Do not draw arbitrary fake printed circuit traces that lead nowhere. Traces must connect named pins to named ICs.
