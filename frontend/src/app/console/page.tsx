"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";
import { Badge } from "@/components/ui/Badge";
import { EngineeringChart, DataPoint } from "@/components/ui/EngineeringChart";
import { ThermalGradientPlot, FrameTemperature } from "@/components/ui/ThermalGradientPlot";
import { SpectralBandChart, SpectralBand } from "@/components/ui/SpectralBandChart";
import { StatusType } from "@/lib/design-tokens";

interface ConsoleHive {
  id: number;
  code: string;
  yard: string;
  status: StatusType;
  tempC: number;
  peakHz: number;
  weightKg: number;
  batteryPct: number;
  batteryMv: number;
  rssi: number;
  snr: number;
  packetSeq: number;
  lastSeenSec: number;
  co2Ppm: number;
  humidityPct: number;
  vocKohm: number;
  cusumScore: number;
  diagnosticState: string;
}

const CONSOLE_HIVES: ConsoleHive[] = [
  {
    id: 7,
    code: "HIVE-007",
    yard: "Yard Alpha",
    status: "normal",
    tempC: 34.82,
    peakHz: 224.5,
    weightKg: 38.4,
    batteryPct: 88,
    batteryMv: 4015,
    rssi: -98,
    snr: 8.5,
    packetSeq: 1492,
    lastSeenSec: 14,
    co2Ppm: 780,
    humidityPct: 62.4,
    vocKohm: 48.2,
    cusumScore: 0.00,
    diagnosticState: "HEALTHY_NORMAL",
  },
  {
    id: 1,
    code: "HIVE-001",
    yard: "Yard Alpha",
    status: "normal",
    tempC: 34.65,
    peakHz: 218.0,
    weightKg: 35.2,
    batteryPct: 92,
    batteryMv: 4060,
    rssi: -92,
    snr: 9.8,
    packetSeq: 1490,
    lastSeenSec: 22,
    co2Ppm: 710,
    humidityPct: 60.1,
    vocKohm: 52.0,
    cusumScore: 0.00,
    diagnosticState: "HEALTHY_NORMAL",
  },
  {
    id: 12,
    code: "HIVE-012",
    yard: "Yard Alpha",
    status: "investigate",
    tempC: 35.60,
    peakHz: 452.0,
    weightKg: 42.1,
    batteryPct: 79,
    batteryMv: 3940,
    rssi: -104,
    snr: 5.2,
    packetSeq: 1488,
    lastSeenSec: 45,
    co2Ppm: 1420,
    humidityPct: 71.0,
    vocKohm: 28.5,
    cusumScore: 0.35,
    diagnosticState: "PRE_SWARM_WARNING",
  },
  {
    id: 3,
    code: "HIVE-003",
    yard: "Yard Alpha",
    status: "critical",
    tempC: 29.80,
    peakHz: 512.0,
    weightKg: 31.0,
    batteryPct: 64,
    batteryMv: 3820,
    rssi: -112,
    snr: 2.1,
    packetSeq: 1485,
    lastSeenSec: 180,
    co2Ppm: 520,
    humidityPct: 78.4,
    vocKohm: 18.2,
    cusumScore: 1.82,
    diagnosticState: "QUEENLESS_DISTRESS",
  },
  {
    id: 19,
    code: "HIVE-019",
    yard: "Yard Beta",
    status: "attention",
    tempC: 33.70,
    peakHz: 238.0,
    weightKg: 36.5,
    batteryPct: 91,
    batteryMv: 4050,
    rssi: -92,
    snr: 9.0,
    packetSeq: 1489,
    lastSeenSec: 95,
    co2Ppm: 890,
    humidityPct: 65.0,
    vocKohm: 44.0,
    cusumScore: 0.45,
    diagnosticState: "THERMAL_STRESS",
  },
  {
    id: 24,
    code: "HIVE-024",
    yard: "Yard Beta",
    status: "stale",
    tempC: 34.20,
    peakHz: 218.0,
    weightKg: 39.0,
    batteryPct: 45,
    batteryMv: 3680,
    rssi: -126,
    snr: -4.5,
    packetSeq: 1410,
    lastSeenSec: 1080,
    co2Ppm: 750,
    humidityPct: 63.0,
    vocKohm: 50.1,
    cusumScore: 0.00,
    diagnosticState: "STALE_TELEMETRY",
  },
];

interface LogEvent {
  timestamp: string;
  nodeCode: string;
  level: "INFO" | "WARN" | "CRIT";
  message: string;
}

const SYSTEM_LOGS: LogEvent[] = [
  { timestamp: "15:42:14", nodeCode: "HIVE-007", level: "INFO", message: "SQLite WAL commit (33B packet #1492 in 4.2ms) -> 34.82°C, 224.5Hz" },
  { timestamp: "15:41:45", nodeCode: "HIVE-012", level: "WARN", message: "EdgeDiagnosticEngine: Band 3 Surge (+18dB) -> PRE_SWARM_WARNING" },
  { timestamp: "15:41:22", nodeCode: "HIVE-001", level: "INFO", message: "SQLite WAL commit (33B packet #1490 in 3.8ms) -> 34.65°C, 218.0Hz" },
  { timestamp: "15:39:14", nodeCode: "HIVE-003", level: "CRIT", message: "CUSUM Brood Filter threshold breach (1.82°C·hr > 1.20) -> BROOD_CHILL" },
  { timestamp: "15:38:00", nodeCode: "GATEWAY", level: "INFO", message: "OverlayFS /dev/mmcblk0p2 integrity check PASSED (read-only rootfs)" },
];

export default function OperationsConsolePage() {
  const [selectedHiveId, setSelectedHiveId] = useState<number>(7);

  const selectedHive = CONSOLE_HIVES.find((h) => h.id === selectedHiveId) || CONSOLE_HIVES[0];

  // 24h Temperature Series
  const tempSeries: DataPoint[] = [
    { time: "00:00", value: selectedHive.tempC - 0.3, secondaryValue: 16.5 },
    { time: "04:00", value: selectedHive.tempC - 0.4, secondaryValue: 15.2 },
    { time: "08:00", value: selectedHive.tempC - 0.1, secondaryValue: 20.8 },
    { time: "12:00", value: selectedHive.tempC + 0.2, secondaryValue: 28.4 },
    { time: "16:00", value: selectedHive.tempC + 0.1, secondaryValue: 31.0 },
    { time: "20:00", value: selectedHive.tempC, secondaryValue: 22.5 },
  ];

  // 5-Frame Gradient Data
  const frameThermalData: FrameTemperature[] = [
    { frame: 1, label: "Outer Left", role: "Honey/Wall", tempC: selectedHive.tempC - 9.4, isCore: false },
    { frame: 2, label: "Brood Left", role: "Pollen", tempC: selectedHive.tempC - 3.2, isCore: false },
    { frame: 3, label: "Core Nest", role: "Queen", tempC: selectedHive.tempC, isCore: true },
    { frame: 4, label: "Brood Right", role: "Larvae", tempC: selectedHive.tempC - 1.1, isCore: false },
    { frame: 5, label: "Outer Right", role: "Honey/Wall", tempC: selectedHive.tempC - 8.8, isCore: false },
  ];

  // Acoustic Spectral Bands
  const spectralBandsData: SpectralBand[] = [
    {
      id: "b1",
      name: "Band 1: Fanning / Ventilation",
      freqRange: "100–180 Hz",
      biologicalPhenomenon: "Thermoregulatory wing fanning",
      energyNormalized: 0.35,
      powerDb: -24.0,
      status: "BASELINE",
    },
    {
      id: "b2",
      name: "Band 2: Worker Baseline",
      freqRange: "200–400 Hz",
      biologicalPhenomenon: "Normal worker thoracic flight & hum",
      energyNormalized: selectedHive.status === "investigate" ? 0.45 : 0.85,
      powerDb: -14.5,
      status: "ACTIVE",
    },
    {
      id: "b3",
      name: "Band 3: Swarm / Distress",
      freqRange: "450–750 Hz",
      biologicalPhenomenon: "Pre-swarm acoustic surge & piping",
      energyNormalized: selectedHive.status === "investigate" ? 0.94 : selectedHive.status === "critical" ? 0.78 : 0.12,
      powerDb: selectedHive.status === "investigate" ? -9.8 : -38.0,
      status: selectedHive.status === "investigate" ? "SURGE" : selectedHive.status === "critical" ? "ELEVATED" : "BASELINE",
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

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f1f5f9] font-mono text-xs flex flex-col selection:bg-[#f59e0b] selection:text-[#090b10]">
      
      {/* Top Industrial Mast Status Bar */}
      <header className="sticky top-0 z-50 w-full bg-[#11141d] border-b border-[#283144] px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-md">
        
        {/* Left: Identity & Gateway Hardware Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded bg-[#181d28] border border-[#283144] hover:border-[#3d4964] text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
            title="Return to Public System Portal"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#10b981] rounded-xs" />
            <span className="font-bold text-sm text-[#f1f5f9] tracking-wider uppercase">
              OPERATIONS &amp; TELEMETRY CONSOLE
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] text-[#94a3b8] border-l border-[#283144] pl-3">
            <span>Raspberry Pi 3B+ (BCM2837B0 @ 1.4 GHz)</span>
            <span>•</span>
            <span className="text-[#10b981]">OverlayFS Read-Only (Safe)</span>
          </div>
        </div>

        {/* Center: Network Fleet Health */}
        <div className="hidden md:flex items-center gap-4 text-[11px] bg-[#090b10] px-3 py-1 rounded border border-[#283144]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748b]">NETWORK:</span>
            <span className="font-bold text-[#f1f5f9]">{CONSOLE_HIVES.length} HIVES</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#10b981] font-bold">4 ONLINE</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#f59e0b] font-bold">1 ATTENTION</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#f97316] font-bold">1 INVESTIGATE</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#ef4444] font-bold">1 CRITICAL</span>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-2">
          <Link
            href="/field"
            className="px-2.5 py-1 rounded bg-[#181d28] border border-[#283144] hover:border-[#ffc833] text-[11px] font-bold text-[#ffc833] uppercase"
          >
            Switch to Field App
          </Link>
          <div className="text-[10px] text-[#64748b] hidden sm:block">
            SQLite WAL: 4.2 MB (<span className="text-[#10b981]">148 pkts/s</span>)
          </div>
        </div>
      </header>

      {/* Main Split Layout: Left Hive Fleet List + Right Operations Stage */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* ====================================================================
            LEFT PANE: APIARY HIVE FLEET LIST (HIGH DENSITY)
            ==================================================================== */}
        <aside className="w-full md:w-80 lg:w-96 border-r border-[#283144] bg-[#0c0e14] flex flex-col shrink-0">
          
          <div className="p-3 border-b border-[#283144] bg-[#11141d] flex items-center justify-between">
            <span className="font-bold text-xs uppercase text-[#94a3b8]">Monitored Fleet ({CONSOLE_HIVES.length})</span>
            <span className="text-[10px] text-[#64748b]">IN865 (865.0625 MHz)</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#1d2332]">
            {CONSOLE_HIVES.map((h) => {
              const isSelected = h.id === selectedHiveId;
              return (
                <div
                  key={h.id}
                  onClick={() => setSelectedHiveId(h.id)}
                  className={`p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#181d28] border-l-2 border-[#f59e0b]"
                      : "hover:bg-[#141824]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <StatusDot status={h.status} size="sm" showLabel={false} />
                      <span className="font-bold text-sm text-[#f1f5f9]">{h.code}</span>
                      <span className="text-[10px] text-[#64748b]">({h.yard})</span>
                    </div>
                    <span className="font-tabular text-[11px] font-bold text-[#10b981]">
                      {h.tempC.toFixed(1)}°C
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
                    <span>Audio: {h.peakHz.toFixed(0)} Hz</span>
                    <span>Mass: {h.weightKg.toFixed(1)} kg</span>
                    <span>Bat: {h.batteryPct}%</span>
                    <span className="text-[#64748b]">{h.lastSeenSec}s ago</span>
                  </div>

                  <div className="mt-1 text-[10px] text-[#ffc833] font-semibold truncate">
                    {h.diagnosticState}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bench Evaluation Hardware Status Callout */}
          <div className="p-3 border-t border-[#283144] bg-[#11141d] text-[10px] text-[#64748b] space-y-1">
            <div className="flex justify-between text-[#94a3b8]">
              <span>Hardware Mode:</span>
              <span className="text-[#10b981] font-bold">BENCH PROTOTYPE</span>
            </div>
            <div className="flex justify-between">
              <span>Die Temp (NRF_TEMP):</span>
              <span className="text-[#f1f5f9]">26.25°C [REAL_SILICON]</span>
            </div>
            <div className="flex justify-between">
              <span>I2C Presence Mask:</span>
              <span className="text-[#f1f5f9]">0x0000 (Bench Default)</span>
            </div>
          </div>
        </aside>

        {/* ====================================================================
            RIGHT PANE: SELECTED HIVE DEEP TELEMETRY & CHARTS
            ==================================================================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#090b10]">
          
          {/* Selected Hive Header & Triage Bar */}
          <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold uppercase text-[#f1f5f9]">
                  {selectedHive.code}
                </h1>
                <StatusDot status={selectedHive.status} />
                <Badge claim="REAL_SILICON" size="sm" />
              </div>
              <div className="text-xs text-[#94a3b8] mt-1 flex flex-wrap items-center gap-3">
                <span>Yard: {selectedHive.yard}</span>
                <span>•</span>
                <span>LoRa Packet #{selectedHive.packetSeq}</span>
                <span>•</span>
                <span>Last Uplink: {selectedHive.lastSeenSec}s ago</span>
                <span>•</span>
                <span>RSSI: {selectedHive.rssi} dBm (SNR: +{selectedHive.snr} dB)</span>
              </div>
            </div>

            {/* Diagnostic State Pill */}
            <div className="px-3 py-1.5 rounded bg-[#090b10] border border-[#283144] text-right">
              <div className="text-[10px] text-[#64748b] uppercase">Expert Engine State:</div>
              <div className="text-xs font-bold text-[#ffc833]">{selectedHive.diagnosticState}</div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
            <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
              <div className="text-[10px] text-[#64748b] uppercase">Brood T(core)</div>
              <div className="text-lg font-bold text-[#10b981] font-tabular mt-0.5">
                {selectedHive.tempC.toFixed(2)} °C
              </div>
              <div className="text-[9px] text-[#94a3b8]">TMP117 NIST RTD</div>
            </div>

            <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
              <div className="text-[10px] text-[#64748b] uppercase">Dominant Freq</div>
              <div className="text-lg font-bold text-[#fbbf24] font-tabular mt-0.5">
                {selectedHive.peakHz.toFixed(1)} Hz
              </div>
              <div className="text-[9px] text-[#94a3b8]">256-pt CMSIS FFT</div>
            </div>

            <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
              <div className="text-[10px] text-[#64748b] uppercase">Gross Weight</div>
              <div className="text-lg font-bold text-[#38bdf8] font-tabular mt-0.5">
                {selectedHive.weightKg.toFixed(1)} kg
              </div>
              <div className="text-[9px] text-[#94a3b8]">Avia HX711 24-bit</div>
            </div>

            <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
              <div className="text-[10px] text-[#64748b] uppercase">CO2 Respiration</div>
              <div className="text-lg font-bold text-[#f1f5f9] font-tabular mt-0.5">
                {selectedHive.co2Ppm} ppm
              </div>
              <div className="text-[9px] text-[#94a3b8]">Sensirion SCD41</div>
            </div>

            <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
              <div className="text-[10px] text-[#64748b] uppercase">Battery Voltage</div>
              <div className="text-lg font-bold text-[#a78bfa] font-tabular mt-0.5">
                {(selectedHive.batteryMv / 1000).toFixed(3)} V
              </div>
              <div className="text-[9px] text-[#94a3b8]">{selectedHive.batteryPct}% SOC (18650)</div>
            </div>

            <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
              <div className="text-[10px] text-[#64748b] uppercase">CUSUM Drift</div>
              <div className={`text-lg font-bold font-tabular mt-0.5 ${selectedHive.cusumScore > 1.0 ? "text-[#ef4444]" : "text-[#10b981]"}`}>
                {selectedHive.cusumScore.toFixed(2)}
              </div>
              <div className="text-[9px] text-[#94a3b8]">h = 1.20°C·hr limit</div>
            </div>
          </div>

          {/* Primary Engineering Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: 24-Hour Brood vs Ambient Temperature */}
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144]">
              <EngineeringChart
                data={tempSeries}
                title="Brood Core Temp vs Diurnal Ambient (24h Trend)"
                unit="°C"
                secondaryUnit="°C Amb"
                targetRange={{ min: 33.7, max: 35.3, label: "Biological Homeostasis" }}
                strokeColor="#10b981"
                secondaryStrokeColor="#64748b"
                height={160}
              />
            </div>

            {/* Chart 2: 5-Point Cross-Frame Thermal Gradient */}
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144]">
              <ThermalGradientPlot
                frames={frameThermalData}
                ambientTempC={18.5}
                optimalSetpointC={34.5}
              />
            </div>
          </div>

          {/* Acoustic Spectral Energy Distribution */}
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144]">
            <div className="text-xs font-bold uppercase text-[#f1f5f9] mb-3 flex items-center justify-between">
              <span>Acoustic 4-Band Energy Distribution (On-Node FFT DMA)</span>
              <Badge claim="VALIDATED" size="sm">INMP441 I2S DMA</Badge>
            </div>
            <SpectralBandChart
              bands={spectralBandsData}
              dominantFrequencyHz={selectedHive.peakHz}
            />
          </div>

          {/* System Event Logs & SQLite WAL Ingestion Stream */}
          <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#283144]">
              <div className="flex items-center gap-2 font-bold uppercase text-[#f1f5f9]">
                <Terminal className="w-4 h-4 text-[#f59e0b]" />
                <span>Live SQLite WAL Gateway Transaction Log</span>
              </div>
              <span className="text-[10px] text-[#64748b]">FastAPI / SQLite 3 Ingest Engine</span>
            </div>

            <div className="space-y-1.5 overflow-x-auto">
              {SYSTEM_LOGS.map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-1.5 rounded bg-[#090b10] text-[11px] font-mono">
                  <span className="text-[#64748b]">{log.timestamp}</span>
                  <span
                    className={`font-bold px-1 rounded-xs text-[9px] uppercase ${
                      log.level === "CRIT"
                        ? "bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]"
                        : log.level === "WARN"
                        ? "bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]"
                        : "bg-[#10b981]/20 text-[#34d399] border border-[#10b981]"
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-[#ffc833] font-semibold">{log.nodeCode}:</span>
                  <span className="text-[#94a3b8] truncate">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
