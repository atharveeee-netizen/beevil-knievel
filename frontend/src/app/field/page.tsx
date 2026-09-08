"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  Wifi,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Thermometer,
  Mic,
  Wind,
  Gauge,
  ShieldAlert,
  Battery,
  Sliders,
  History,
  Activity,
  Layers,
  Radio,
  ArrowLeft
} from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";
import { ThermalGradientPlot, FrameTemperature } from "@/components/ui/ThermalGradientPlot";
import { SpectralBandChart, SpectralBand } from "@/components/ui/SpectralBandChart";
import { EngineeringChart, DataPoint } from "@/components/ui/EngineeringChart";
import { StatusType } from "@/lib/design-tokens";

// 14 Core Field Views
type FieldView =
  | "overview"
  | "hives"
  | "telemetry"
  | "temperature"
  | "acoustics"
  | "environment"
  | "weight"
  | "motion"
  | "alerts"
  | "history"
  | "health"
  | "connectivity"
  | "power"
  | "settings";

interface HiveItem {
  id: number;
  code: string;
  yard: string;
  status: StatusType;
  triageAnswer: string;
  triageDetail: string;
  tempC: number;
  peakHz: number;
  weightKg: number;
  batteryPct: number;
  rssi: number;
  lastSeenSec: number;
  alertsCount: number;
}

const APIARY_HIVES: HiveItem[] = [
  {
    id: 7,
    code: "HIVE-007",
    yard: "Yard Alpha",
    status: "normal",
    triageAnswer: "OPTIMAL HOMEOSTASIS",
    triageDetail: "Brood core at 34.82°C (±0.2°C). Baseline worker flight at 224 Hz. No drift detected.",
    tempC: 34.82,
    peakHz: 224.5,
    weightKg: 38.4,
    batteryPct: 88,
    rssi: -98,
    lastSeenSec: 14,
    alertsCount: 0,
  },
  {
    id: 12,
    code: "HIVE-012",
    yard: "Yard Alpha",
    status: "investigate",
    triageAnswer: "PRE-SWARM HARMONIC SURGE",
    triageDetail: "Acoustic Band 3 (450–750 Hz) elevated by +18 dBFS. Imminent reproductive swarm departure within 24 hours.",
    tempC: 35.6,
    peakHz: 452.0,
    weightKg: 42.1,
    batteryPct: 79,
    rssi: -104,
    lastSeenSec: 42,
    alertsCount: 2,
  },
  {
    id: 3,
    code: "HIVE-003",
    yard: "Yard Alpha",
    status: "critical",
    triageAnswer: "SEVERE BROOD CHILL / QUEENLESS",
    triageDetail: "Brood core dropped to 29.8°C (-4.7°C deficit). CUSUM alarm triggered at 1.82°C·hr. Inspect frame 3 immediately.",
    tempC: 29.8,
    peakHz: 512.0,
    weightKg: 31.0,
    batteryPct: 64,
    rssi: -112,
    lastSeenSec: 180,
    alertsCount: 3,
  },
  {
    id: 19,
    code: "HIVE-019",
    yard: "Yard Beta",
    status: "attention",
    triageAnswer: "MILD THERMAL DRIFT",
    triageDetail: "Negative thermal drift detected over past 6 hours (0.04°C/hr). Possible early Varroa agitation or cold snap drafting.",
    tempC: 33.7,
    peakHz: 238.0,
    weightKg: 36.5,
    batteryPct: 91,
    rssi: -92,
    lastSeenSec: 95,
    alertsCount: 1,
  },
  {
    id: 24,
    code: "HIVE-024",
    yard: "Yard Beta",
    status: "stale",
    triageAnswer: "STALE TELEMETRY (>15 MIN)",
    triageDetail: "No LoRa uplink received for 18 minutes. Last known status was nominal. Check antenna or field node solar panel.",
    tempC: 34.2,
    peakHz: 218.0,
    weightKg: 39.0,
    batteryPct: 45,
    rssi: -126,
    lastSeenSec: 1080,
    alertsCount: 1,
  },
];

export default function FieldAppPage() {
  const [selectedHiveId, setSelectedHiveId] = useState<number>(7);
  const [currentView, setCurrentView] = useState<FieldView>("overview");
  const [sunlightMode, setSunlightMode] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);

  const activeHive = APIARY_HIVES.find((h) => h.id === selectedHiveId) || APIARY_HIVES[0];

  // Toggle sunlight mode class on HTML element
  useEffect(() => {
    if (sunlightMode) {
      document.documentElement.classList.add("sunlight-mode");
    } else {
      document.documentElement.classList.remove("sunlight-mode");
    }
  }, [sunlightMode]);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 800);
  };

  // 5-Frame Thermal Probes for active hive
  const frameThermalData: FrameTemperature[] = [
    { frame: 1, label: "Outer Left", role: "Honey Wall", tempC: activeHive.tempC - 9.4, isCore: false },
    { frame: 2, label: "Brood Left", role: "Pollen", tempC: activeHive.tempC - 3.2, isCore: false },
    { frame: 3, label: "Core Nest", role: "Queen", tempC: activeHive.tempC, isCore: true },
    { frame: 4, label: "Brood Right", role: "Larvae", tempC: activeHive.tempC - 1.1, isCore: false },
    { frame: 5, label: "Outer Right", role: "Honey Wall", tempC: activeHive.tempC - 8.8, isCore: false },
  ];

  // Acoustic Spectral Bands for active hive
  const spectralBandsData: SpectralBand[] = [
    {
      id: "b1",
      name: "Band 1: Ventilation",
      freqRange: "100–180 Hz",
      biologicalPhenomenon: "Fanning wing activity",
      energyNormalized: 0.35,
      powerDb: -24.0,
      status: "BASELINE",
    },
    {
      id: "b2",
      name: "Band 2: Worker Baseline",
      freqRange: "200–400 Hz",
      biologicalPhenomenon: "Normal worker thoracic flight & hum",
      energyNormalized: activeHive.status === "investigate" ? 0.45 : 0.85,
      powerDb: -14.5,
      status: "ACTIVE",
    },
    {
      id: "b3",
      name: "Band 3: Swarm / Distress",
      freqRange: "450–750 Hz",
      biologicalPhenomenon: "Pre-swarm acoustic surge & piping",
      energyNormalized: activeHive.status === "investigate" ? 0.94 : activeHive.status === "critical" ? 0.78 : 0.12,
      powerDb: activeHive.status === "investigate" ? -9.8 : -38.0,
      status: activeHive.status === "investigate" ? "SURGE" : activeHive.status === "critical" ? "ELEVATED" : "BASELINE",
    },
    {
      id: "b4",
      name: "Band 4: Environmental Noise",
      freqRange: "800–1200 Hz",
      biologicalPhenomenon: "Wind shear & foliage rustle",
      energyNormalized: 0.08,
      powerDb: -44.0,
      status: "BASELINE",
    },
  ];

  // 24-Hour Trend Data
  const trend24hData: DataPoint[] = [
    { time: "00:00", value: activeHive.tempC - 0.2 },
    { time: "04:00", value: activeHive.tempC - 0.4 },
    { time: "08:00", value: activeHive.tempC },
    { time: "12:00", value: activeHive.tempC + 0.3 },
    { time: "16:00", value: activeHive.tempC + 0.1 },
    { time: "20:00", value: activeHive.tempC - 0.1 },
  ];

  // Triage Banner Styles
  const getTriageStyle = (status: StatusType) => {
    switch (status) {
      case "critical":
        return {
          bg: "bg-[#ef4444]",
          text: "text-white",
          border: "border-[#b91c1c]",
          label: "CRITICAL ACTION REQUIRED",
        };
      case "investigate":
        return {
          bg: "bg-[#f97316]",
          text: "text-white",
          border: "border-[#c2410c]",
          label: "INVESTIGATE — SWARM RISK",
        };
      case "attention":
        return {
          bg: "bg-[#f59e0b]",
          text: "text-[#090b10]",
          border: "border-[#d97706]",
          label: "ATTENTION — THERMAL DRIFT",
        };
      case "stale":
        return {
          bg: "bg-[#64748b]",
          text: "text-white",
          border: "border-[#475569]",
          label: "STALE TELEMETRY (>15M)",
        };
      default:
        return {
          bg: "bg-[#10b981]",
          text: "text-[#090b10]",
          border: "border-[#059669]",
          label: "NORMAL HOMEOSTASIS",
        };
    }
  };

  const triageStyle = getTriageStyle(activeHive.status);

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f1f5f9] font-mono flex flex-col selection:bg-[#f59e0b] selection:text-[#090b10]">
      
      {/* Top Field Bar (Glove-Friendly Min 48px Height) */}
      <header className="sticky top-0 z-50 w-full bg-[#11141d] border-b border-[#283144] px-4 py-2.5 flex items-center justify-between gap-3 shadow-md">
        
        {/* Left: Back Link & Hive Identifier */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="h-12 w-12 flex items-center justify-center rounded-sm bg-[#181d28] border border-[#283144] hover:border-[#3d4964] text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
            title="Back to Public Portal"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="text-[10px] text-[#64748b] uppercase font-bold tracking-wider">
              FIELD INSPECTION APP
            </div>
            <div className="text-base sm:text-lg font-extrabold text-[#f1f5f9] flex items-center gap-2">
              <span>{activeHive.code}</span>
              <span className="text-xs text-[#94a3b8] font-normal">({activeHive.yard})</span>
            </div>
          </div>
        </div>

        {/* Right: Controls (Sunlight Mode & Sync) */}
        <div className="flex items-center gap-2">
          
          {/* Sunlight High-Contrast Toggle Button (Min 48px Touch Target) */}
          <button
            onClick={() => setSunlightMode(!sunlightMode)}
            className="h-12 px-3.5 flex items-center gap-2 rounded-sm bg-[#181d28] border border-[#283144] hover:border-[#ffc833] text-xs font-bold uppercase transition-colors"
            title="Toggle High-Contrast Sunlight Veil Mode for Direct Outdoor Glare"
          >
            {sunlightMode ? (
              <>
                <Moon className="w-4 h-4 text-[#38bdf8]" />
                <span className="hidden sm:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-[#ffc833]" />
                <span className="hidden sm:inline">Sunlight Mode</span>
              </>
            )}
          </button>

          {/* Sync / Refresh Button (Min 48px Touch Target) */}
          <button
            onClick={handleSync}
            className={`h-12 w-12 flex items-center justify-center rounded-sm bg-[#181d28] border border-[#283144] hover:border-[#ffc833] transition-colors ${
              syncing ? "text-[#f59e0b]" : "text-[#94a3b8]"
            }`}
            title="Sync Latest Packet from Gateway"
          >
            <RefreshCw className={`w-5 h-5 ${syncing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      {/* Main Field Stage */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* ====================================================================
            CRITICAL INTERACTION: "IS THIS HIVE OKAY?" TRIAGE BANNER (<3 SECONDS)
            ==================================================================== */}
        <div className={`rounded-sm border-2 p-5 shadow-lg ${triageStyle.bg} ${triageStyle.text} ${triageStyle.border}`}>
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2 opacity-90">
            <span>COLONY TRIAGE ASSESSMENT</span>
            <span className="bg-black/20 px-2 py-0.5 rounded text-[10px]">{triageStyle.label}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2">
            {triageStyle.label}: {activeHive.triageAnswer}
          </h1>

          <p className="text-xs sm:text-sm font-sans font-medium leading-relaxed opacity-95">
            {activeHive.triageDetail}
          </p>

          <div className="mt-4 pt-3 border-t border-black/20 flex flex-wrap items-center justify-between text-xs font-mono font-semibold">
            <div className="flex items-center gap-4">
              <span>Brood: {activeHive.tempC.toFixed(1)}°C</span>
              <span>Audio: {activeHive.peakHz.toFixed(0)} Hz</span>
              <span>Mass: {activeHive.weightKg.toFixed(1)} kg</span>
            </div>
            <div className="opacity-80 text-[11px]">
              Last Seen: {activeHive.lastSeenSec}s ago via LoRa
            </div>
          </div>
        </div>

        {/* ====================================================================
            14 CORE VIEWS NAVIGATION BAR (GLOVE-FRIENDLY BUTTONS >= 48px)
            ==================================================================== */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "hives", label: "Hives (5)", icon: Layers },
              { id: "temperature", label: "Temperature", icon: Thermometer },
              { id: "acoustics", label: "Acoustics", icon: Mic },
              { id: "environment", label: "Environment", icon: Wind },
              { id: "weight", label: "Weight", icon: Gauge },
              { id: "motion", label: "Motion / Tilt", icon: ShieldAlert },
              { id: "alerts", label: `Alerts (${activeHive.alertsCount})`, icon: AlertTriangle },
              { id: "history", label: "24h History", icon: History },
              { id: "telemetry", label: "Raw Frame", icon: Radio },
              { id: "health", label: "Health / Bus", icon: CheckCircle2 },
              { id: "connectivity", label: "RF Link", icon: Wifi },
              { id: "power", label: "Power", icon: Battery },
              { id: "settings", label: "Settings", icon: Sliders },
            ].map((v) => {
              const Icon = v.icon;
              const isActive = currentView === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setCurrentView(v.id as FieldView)}
                  className={`h-12 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all border shrink-0 ${
                    isActive
                      ? "bg-[#f59e0b] text-[#090b10] border-[#f59e0b] shadow-md"
                      : "bg-[#11141d] text-[#94a3b8] border-[#283144] hover:border-[#3d4964] hover:text-[#f1f5f9]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{v.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            VIEW CONTENT SWITCHER
            ==================================================================== */}

        {/* VIEW 1: OVERVIEW */}
        {currentView === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144]">
                <div className="text-[10px] text-[#64748b] uppercase">Core Brood T(core)</div>
                <div className="text-2xl font-bold text-[#10b981] font-tabular mt-0.5">
                  {activeHive.tempC.toFixed(2)} °C
                </div>
                <div className="text-[10px] text-[#94a3b8] mt-1">TI TMP117 (Frame 3)</div>
              </div>

              <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144]">
                <div className="text-[10px] text-[#64748b] uppercase">Dominant Frequency</div>
                <div className="text-2xl font-bold text-[#fbbf24] font-tabular mt-0.5">
                  {activeHive.peakHz.toFixed(1)} Hz
                </div>
                <div className="text-[10px] text-[#94a3b8] mt-1">INMP441 CMSIS-DSP</div>
              </div>

              <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144]">
                <div className="text-[10px] text-[#64748b] uppercase">Gross Hive Weight</div>
                <div className="text-2xl font-bold text-[#38bdf8] font-tabular mt-0.5">
                  {activeHive.weightKg.toFixed(1)} kg
                </div>
                <div className="text-[10px] text-[#94a3b8] mt-1">Avia HX711 24-bit</div>
              </div>

              <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144]">
                <div className="text-[10px] text-[#64748b] uppercase">Battery State of Charge</div>
                <div className="text-2xl font-bold text-[#a78bfa] font-tabular mt-0.5">
                  {activeHive.batteryPct}%
                </div>
                <div className="text-[10px] text-[#94a3b8] mt-1">1S 3.7V NMC 18650</div>
              </div>
            </div>

            {/* Quick 5-Point Frame Gradient in Overview */}
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144]">
              <ThermalGradientPlot
                frames={frameThermalData}
                ambientTempC={18.5}
                optimalSetpointC={34.5}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: HIVE LIST (YARD OVERVIEW) */}
        {currentView === "hives" && (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase text-[#94a3b8] px-1">
              Monitored Apiary Colonies ({APIARY_HIVES.length} Nodes in Field):
            </div>
            {APIARY_HIVES.map((h) => {
              const isSelected = h.id === selectedHiveId;
              return (
                <div
                  key={h.id}
                  onClick={() => setSelectedHiveId(h.id)}
                  className={`p-4 rounded-sm border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-[#181d28] border-[#f59e0b] shadow-md"
                      : "bg-[#11141d] border-[#283144] hover:border-[#3d4964]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <StatusDot status={h.status} size="lg" showLabel={false} />
                    <div>
                      <div className="font-bold text-sm text-[#f1f5f9] flex items-center gap-2">
                        <span>{h.code}</span>
                        <span className="text-xs text-[#94a3b8]">({h.yard})</span>
                      </div>
                      <div className="text-xs text-[#94a3b8] font-sans mt-0.5">
                        {h.triageAnswer}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right hidden sm:block">
                      <div className="text-[#f1f5f9] font-bold">{h.tempC.toFixed(1)}°C</div>
                      <div className="text-[#64748b] text-[10px]">{h.peakHz.toFixed(0)} Hz</div>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isSelected ? "text-[#f59e0b]" : "text-[#64748b]"}`} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 3: TEMPERATURE VIEW */}
        {currentView === "temperature" && (
          <div className="space-y-6">
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144]">
              <div className="text-sm font-bold uppercase text-[#f1f5f9] mb-4">
                5-Point Cross-Frame Brood Thermal Array
              </div>
              <ThermalGradientPlot
                frames={frameThermalData}
                ambientTempC={18.5}
                optimalSetpointC={34.5}
              />
            </div>

            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] space-y-2 text-xs">
              <div className="font-bold text-[#ffc833] uppercase">CUSUM Thermal Drift Filter Status:</div>
              <p className="text-[#94a3b8] font-sans leading-relaxed">
                Page (1954) change-point detector accumulates negative cooling deficits relative to setpoint μ0 = 34.5°C with allowance k = 0.15°C and alarm threshold h = 1.20°C·hr.
              </p>
              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#1d2332]">
                <span className="text-[#64748b]">Current CUSUM Score:</span>
                <span className="text-[#10b981] font-bold">0.00°C·hr (STABLE HOMEOSTASIS)</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: ACOUSTICS VIEW */}
        {currentView === "acoustics" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-6">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              Bio-Acoustic Spectral Energy Breakdown
            </div>
            <SpectralBandChart
              bands={spectralBandsData}
              dominantFrequencyHz={activeHive.peakHz}
            />
          </div>
        )}

        {/* VIEW 5: ENVIRONMENT VIEW */}
        {currentView === "environment" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] space-y-2">
              <div className="text-xs text-[#64748b] uppercase">Sensirion SCD41 Photoacoustic</div>
              <div className="text-2xl font-bold text-[#38bdf8] font-tabular">782 ppm</div>
              <div className="text-[11px] text-[#94a3b8] font-sans">
                Brood Respiration CO2 (Baseline range: 500–1200 ppm)
              </div>
            </div>

            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] space-y-2">
              <div className="text-xs text-[#64748b] uppercase">Bosch BME688 Multi-Gas</div>
              <div className="text-2xl font-bold text-[#10b981] font-tabular">64.5% RH</div>
              <div className="text-[11px] text-[#94a3b8] font-sans">
                Hive relative humidity &amp; 1013.2 hPa barometric pressure
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: WEIGHT & HARVEST VIEW */}
        {currentView === "weight" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              Dual-Bar Hive Scale Telemetry (HX711 24-bit ADC)
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">Gross Hive Mass</div>
                <div className="text-3xl font-bold text-[#38bdf8] font-tabular mt-1">
                  {activeHive.weightKg.toFixed(2)} kg
                </div>
              </div>
              <div className="p-4 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">24h Net Nectar Delta</div>
                <div className="text-3xl font-bold text-[#10b981] font-tabular mt-1">
                  +1.14 kg
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: MOTION & THEFT VIEW */}
        {currentView === "motion" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              Seismic Vibration &amp; Hive Tilt (ST LIS3DH)
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">Tilt Angle</div>
                <div className="text-xl font-bold text-[#10b981] mt-0.5">1.2°</div>
                <div className="text-[9px] text-[#94a3b8]">Max: 45° threshold</div>
              </div>
              <div className="p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">Shock Interrupt</div>
                <div className="text-xl font-bold text-[#10b981] mt-0.5">CLEAR</div>
                <div className="text-[9px] text-[#94a3b8]">Pin P0.15 INT1</div>
              </div>
              <div className="p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">Pest Agitation</div>
                <div className="text-xl font-bold text-[#38bdf8] mt-0.5">NORMAL</div>
                <div className="text-[9px] text-[#94a3b8]">Micro-vibration</div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 8: ALERTS VIEW */}
        {currentView === "alerts" && (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase text-[#94a3b8] px-1">
              Active Hive Event Alerts:
            </div>
            {activeHive.alertsCount === 0 ? (
              <div className="p-6 rounded-sm bg-[#11141d] border border-[#283144] text-center text-xs text-[#64748b]">
                <CheckCircle2 className="w-8 h-8 text-[#10b981] mx-auto mb-2" />
                <span>Zero active alarms. Colony is operating within nominal physiological boundaries.</span>
              </div>
            ) : (
              <div className="p-4 rounded-sm bg-[#11141d] border border-[#ef4444] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ef4444] uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>CUSUM Thermal Deficit Alert Detected</span>
                </div>
                <p className="text-xs text-[#94a3b8] font-sans">
                  Persistent negative drift over 4 consecutive 5-minute packets. Brood cooling rate exceeds 0.5°C/hr.
                </p>
              </div>
            )}
          </div>
        )}

        {/* VIEW 9: 24H HISTORY VIEW */}
        {currentView === "history" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              24-Hour Telemetry Trend Trajectory
            </div>
            <EngineeringChart
              data={trend24hData}
              title="Brood Core Temp Trend (24h)"
              unit="°C"
              strokeColor="#10b981"
              height={160}
            />
          </div>
        )}

        {/* VIEW 10: RAW TELEMETRY FRAME VIEW */}
        {currentView === "telemetry" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-3 font-mono text-xs">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              Canonical 33-Byte LoRa Binary Frame (BeevilLoRaPayload)
            </div>
            <div className="p-3 bg-[#090b10] border border-[#1d2332] rounded text-[11px] text-[#38bdf8] break-all">
              0x07 0x0D 0x9A 0x00 0x14 0x00 0x30 0x01 0x0E 0x08 0x00 0x58 0x02 0x00 0x58 0x18 0x58 0x00 0x48 0x00 0x12 0x00 0x00 0x00 0x00 0x00 0x58 0x00 0x00 0x00 0x00 0x00 0x2A
            </div>
            <div className="text-[11px] text-[#64748b]">
              Payload unpacked: node_id=7, vbat=4015mV, t_core=34.82°C, fft_bands=[0.35, 0.85, 0.12, 0.08]
            </div>
          </div>
        )}

        {/* VIEW 11: HEALTH / BUS VIEW */}
        {currentView === "health" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-3 font-mono text-xs">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              Field Node Silicon &amp; Bus Diagnostic Health
            </div>
            <div className="space-y-2 text-[#94a3b8]">
              <div className="flex justify-between border-b border-[#1d2332] pb-1">
                <span>Silicon Die Temperature:</span>
                <span className="text-[#10b981] font-bold">26.25°C [REAL_SILICON]</span>
              </div>
              <div className="flex justify-between border-b border-[#1d2332] pb-1">
                <span>Hardware Presence Mask:</span>
                <span className="text-[#f1f5f9] font-bold">0x0000 (Bench Prototype)</span>
              </div>
              <div className="flex justify-between border-b border-[#1d2332] pb-1">
                <span>I2C Bus State (P0.13/P0.14):</span>
                <span className="text-[#10b981] font-bold">OPERATIONAL (400 kHz)</span>
              </div>
              <div className="flex justify-between">
                <span>1-Wire Probes Detected:</span>
                <span className="text-[#10b981] font-bold">5 / 5 Responsive</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 12: CONNECTIVITY VIEW */}
        {currentView === "connectivity" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4 font-mono text-xs">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              Sub-GHz LoRa RF Link Quality (IN865 865.0625 MHz)
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">RSSI</div>
                <div className="text-xl font-bold text-[#10b981] mt-0.5">{activeHive.rssi} dBm</div>
              </div>
              <div className="p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">SNR</div>
                <div className="text-xl font-bold text-[#38bdf8] mt-0.5">+8.5 dB</div>
              </div>
              <div className="p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">Packet Loss</div>
                <div className="text-xl font-bold text-[#10b981] mt-0.5">0.0%</div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 13: POWER VIEW */}
        {currentView === "power" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4 font-mono text-xs">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              Power &amp; Energy Reservoir (18650 Li-ion + Solar)
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">Battery Voltage</div>
                <div className="text-2xl font-bold text-[#10b981] font-tabular mt-1">4.015 V</div>
                <div className="text-[10px] text-[#94a3b8] mt-1">{activeHive.batteryPct}% State of Charge</div>
              </div>
              <div className="p-4 rounded bg-[#090b10] border border-[#1d2332]">
                <div className="text-[10px] text-[#64748b] uppercase">Solar Inflow</div>
                <div className="text-2xl font-bold text-[#f59e0b] font-tabular mt-1">84 mA</div>
                <div className="text-[10px] text-[#94a3b8] mt-1">0.5W Monocrystalline Panel</div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 14: SETTINGS VIEW */}
        {currentView === "settings" && (
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4 font-mono text-xs">
            <div className="text-sm font-bold uppercase text-[#f1f5f9]">
              Field Application &amp; Apiary Settings
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <span>Sunlight / Veil Mode:</span>
                <button
                  onClick={() => setSunlightMode(!sunlightMode)}
                  className="px-3 py-1.5 rounded bg-[#181d28] border border-[#283144] text-[#ffc833] font-bold"
                >
                  {sunlightMode ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <span>Offline Cache Storage:</span>
                <span className="text-[#10b981] font-bold">14.2 KB (5 Hives Synced)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-[#090b10] border border-[#1d2332]">
                <span>Gateway Local IP:</span>
                <span className="text-[#f1f5f9]">192.168.4.1:8000</span>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
