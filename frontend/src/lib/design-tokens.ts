/**
 * BEEVIL KNIEVEL — DESIGN TOKENS
 * Precision Field Engineering Design System
 * Grounded in IEEE HardwAIre Phase 2 standards.
 */

export const TOKENS = {
  colors: {
    canvas: {
      dark: "#090b10",
      darkElevated: "#0e1118",
      sunlight: "#ffffff",
    },
    surface: {
      1: "#11141d",
      2: "#181d28",
      3: "#222938",
      sunlight1: "#f8fafc",
      sunlight2: "#f1f5f9",
    },
    border: {
      subtle: "#1d2332",
      default: "#283144",
      strong: "#3d4964",
      sunlight: "#0f172a",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
      tertiary: "#64748b",
      sunlightPrimary: "#000000",
      sunlightSecondary: "#334155",
    },
    brand: {
      amber: "#f59e0b",
      gold: "#ffc833",
      amberHover: "#d97706",
      amberMuted: "rgba(245, 158, 11, 0.15)",
    },
    status: {
      normal: {
        hex: "#10b981",
        label: "NORMAL",
        desc: "Optimal homeostasis (34.5°C ± 0.8°C)",
        bg: "rgba(16, 185, 129, 0.12)",
        border: "#10b981",
        text: "#34d399",
      },
      attention: {
        hex: "#f59e0b",
        label: "ATTENTION",
        desc: "Minor drift or acoustic deviation",
        bg: "rgba(245, 158, 11, 0.12)",
        border: "#f59e0b",
        text: "#fbbf24",
      },
      investigate: {
        hex: "#f97316",
        label: "INVESTIGATE",
        desc: "Pre-swarm acoustic surge (450 Hz) or CUSUM drift",
        bg: "rgba(249, 115, 22, 0.15)",
        border: "#f97316",
        text: "#fb923c",
      },
      critical: {
        hex: "#ef4444",
        label: "CRITICAL",
        desc: "Brood chill (<31°C), queenlessness, or physical tamper",
        bg: "rgba(239, 68, 68, 0.18)",
        border: "#ef4444",
        text: "#f87171",
      },
      stale: {
        hex: "#64748b",
        label: "STALE TELEMETRY",
        desc: "Last packet received > 15 minutes ago",
        bg: "rgba(100, 116, 139, 0.15)",
        border: "#64748b",
        text: "#94a3b8",
      },
      fault: {
        hex: "#dc2626",
        label: "SENSOR FAULT",
        desc: "Physical register NACK or I2C bus error",
        bg: "rgba(220, 38, 38, 0.2)",
        border: "#dc2626",
        text: "#ef4444",
      },
    },
    claim: {
      REAL_SILICON: {
        label: "REAL SILICON",
        bg: "rgba(16, 185, 129, 0.12)",
        border: "#10b981",
        text: "#34d399",
      },
      REAL_SENSOR: {
        label: "REAL SENSOR",
        bg: "rgba(16, 185, 129, 0.12)",
        border: "#10b981",
        text: "#34d399",
      },
      VALIDATED: {
        label: "VALIDATED",
        bg: "rgba(59, 130, 246, 0.12)",
        border: "#3b82f6",
        text: "#60a5fa",
      },
      DEMONSTRATED: {
        label: "DEMONSTRATED",
        bg: "rgba(14, 165, 233, 0.12)",
        border: "#0ea5e9",
        text: "#38bdf8",
      },
      CALCULATED: {
        label: "CALCULATED",
        bg: "rgba(139, 92, 246, 0.12)",
        border: "#8b5cf6",
        text: "#a78bfa",
      },
      SIMULATED: {
        label: "SIMULATED",
        bg: "rgba(234, 179, 8, 0.12)",
        border: "#eab308",
        text: "#fde047",
      },
      PROPOSED: {
        label: "PROPOSED",
        bg: "rgba(100, 116, 139, 0.12)",
        border: "#64748b",
        text: "#94a3b8",
      },
    },
  },
  typography: {
    sans: "'Roobert', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  spacing: {
    touchTargetMin: "48px",
    headerHeight: "56px",
    containerMax: "1280px",
  },
  radius: {
    xs: "2px",
    sm: "4px",
    default: "6px",
    md: "8px",
  },
} as const;

export type StatusType = keyof typeof TOKENS.colors.status;
export type ClaimType = keyof typeof TOKENS.colors.claim;
