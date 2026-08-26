"use client";

import React, { useState, useMemo } from "react";
import {
  Grid, Activity, Search, Thermometer, Volume2,
  Flame, Zap, ShieldCheck, ShieldAlert, AlertTriangle,
  CheckCircle2, ChevronRight, X, Sparkles, Filter,
  Layers, Radio
} from "lucide-react";
import { DecryptedText, ShinyText } from "@/components/reactbits";

interface HiveData {
  id: number;
  apiary: string;
  status: "HEALTHY" | "WATCH" | "CRITICAL";
  tempC: number;
  humidityPct: number;
  acousticHz: number;
  co2Ppm: number;
  anomalyScore: number;
  confidencePct: number;
  stateLabel: string;
  recommendedAction: string;
  lastPacket: string;
}

// Generate deterministic realistic 100-hive fleet with 4 specific notable anomalies
const generate100Hives = (): HiveData[] => {
  const hives: HiveData[] = [];
  for (let i = 1; i <= 100; i++) {
    if (i === 42) {
      hives.push({
        id: 42,
        apiary: "Yard Alpha • Row 3",
        status: "CRITICAL",
        tempC: 37.2,
        humidityPct: 62,
        acousticHz: 485,
        co2Ppm: 2480,
        anomalyScore: 0.94,
        confidencePct: 97.4,
        stateLabel: "Pre-Swarm Harmonic Escalation",
        recommendedAction: "Execute 6-minute vertical artificial swarm split within 24 hours.",
        lastPacket: "14s ago",
      });
    } else if (i === 15) {
      hives.push({
        id: 15,
        apiary: "Yard Alpha • Row 1",
        status: "WATCH",
        tempC: 33.1,
        humidityPct: 68,
        acousticHz: 285,
        co2Ppm: 940,
        anomalyScore: 0.78,
        confidencePct: 94.1,
        stateLabel: "Queenless Roar & Brood Chill",
        recommendedAction: "Inspect center frames for queen presence and fresh egg posture.",
        lastPacket: "32s ago",
      });
    } else if (i === 73) {
      hives.push({
        id: 73,
        apiary: "Yard Beta • Row 4",
        status: "WATCH",
        tempC: 34.6,
        humidityPct: 74,
        acousticHz: 310,
        co2Ppm: 1320,
        anomalyScore: 0.65,
        confidencePct: 91.8,
        stateLabel: "Varroa Mite Grooming Surge",
        recommendedAction: "Verify sticky board mite drop count; apply organic formic acid pad.",
        lastPacket: "45s ago",
      });
    } else if (i === 88) {
      hives.push({
        id: 88,
        apiary: "Yard Beta • Row 5",
        status: "WATCH",
        tempC: 34.9,
        humidityPct: 69,
        acousticHz: 230,
        co2Ppm: 1160,
        anomalyScore: 0.71,
        confidencePct: 96.0,
        stateLabel: "Stand Displacement / Predator Tamper",
        recommendedAction: "Check hive stand level (ST LIS3DH 14.2° tilt displacement detected).",
        lastPacket: "1m ago",
      });
    } else {
      // 96 Nominal Healthy Hives with realistic jitter
      const jitterT = (Math.sin(i * 0.7) * 0.3);
      const jitterH = Math.round(Math.cos(i * 0.5) * 4);
      const jitterHz = Math.round(Math.sin(i * 0.9) * 8);
      const jitterCo2 = Math.round(Math.sin(i * 0.3) * 60);

      hives.push({
        id: i,
        apiary: i <= 50 ? `Yard Alpha • Row ${Math.ceil(i / 10)}` : `Yard Beta • Row ${Math.ceil((i - 50) / 10)}`,
        status: "HEALTHY",
        tempC: +(34.8 + jitterT).toFixed(1),
        humidityPct: 70 + jitterH,
        acousticHz: 220 + jitterHz,
        co2Ppm: 1100 + jitterCo2,
        anomalyScore: +(0.03 + (Math.abs(Math.sin(i)) * 0.08)).toFixed(2),
        confidencePct: +(96.0 + (Math.abs(Math.cos(i)) * 3.5)).toFixed(1),
        stateLabel: "Optimal Brood Homeostasis",
        recommendedAction: "All telemetry nominal. Routine check not required.",
        lastPacket: `${(i % 55) + 5}s ago`,
      });
    }
  }
  return hives;
};

const ALL_HIVES = generate100Hives();

export function CommandCenter100Section() {
  const [selectedHiveId, setSelectedHiveId] = useState<number>(42);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "HEALTHY" | "WATCH" | "CRITICAL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHives = useMemo(() => {
    return ALL_HIVES.filter((hive) => {
      const matchesFilter = statusFilter === "ALL" || hive.status === statusFilter;
      const matchesSearch =
        searchQuery === "" ||
        hive.id.toString().includes(searchQuery) ||
        hive.apiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hive.stateLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  const selectedHive = useMemo(() => {
    return ALL_HIVES.find((h) => h.id === selectedHiveId) || ALL_HIVES[41];
  }, [selectedHiveId]);

  return (
    <section id="command-center" className="bg-[#070a12] text-[#f8fafc] py-28 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#161616] border border-amber-500/30 text-[#f59e0b] px-3.5 py-1.5 rounded-sm text-xs font-mono font-semibold uppercase tracking-widest">
              <Grid className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>SIGNATURE DEMO // 100-HIVE FLEET MATRIX</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans uppercase">
              100-Hive Command Center.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-mono leading-relaxed">
              Click any hive tile below to inspect its real-time multi-sensor telemetry, TinyML anomaly confidence, and recommended field action.
            </p>
          </div>

          {/* Fleet Status Summary Cards */}
          <div className="flex items-center gap-3">
            <div className="bg-[#161616] border border-emerald-500/30 px-4 py-2.5 rounded-sm text-center">
              <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">HEALTHY</span>
              <span className="text-xl font-mono font-bold text-white">96</span>
            </div>
            <div className="bg-[#161616] border border-amber-500/30 px-4 py-2.5 rounded-sm text-center">
              <span className="text-[10px] font-mono text-amber-400 block uppercase font-bold">WATCH</span>
              <span className="text-xl font-mono font-bold text-[#f59e0b]">3</span>
            </div>
            <div className="bg-[#161616] border border-rose-500/30 px-4 py-2.5 rounded-sm text-center">
              <span className="text-[10px] font-mono text-rose-400 block uppercase font-bold">CRITICAL</span>
              <span className="text-xl font-mono font-bold text-rose-400">1</span>
            </div>
          </div>
        </div>

        {/* Interactive Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161616] border border-[#393939] p-3 rounded-sm">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            {(["ALL", "HEALTHY", "WATCH", "CRITICAL"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                  statusFilter === filter
                    ? "bg-[#070a12] text-white border border-amber-500 font-bold"
                    : "bg-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {filter === "ALL" ? "All 100 Hives" : filter}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search hive ID (e.g. 42)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070a12] border border-[#262626] pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-zinc-500 rounded-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 100-Hive Interactive Matrix & Deep Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 100 Hive Tiles Grid (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#161616] border border-[#393939] p-5 rounded-sm space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-white/5 pb-2">
              <span>FLEET GRID ({filteredHives.length} MATCHING)</span>
              <span>SELECT TILE TO INSPECT</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {filteredHives.map((hive) => {
                const isSelected = selectedHiveId === hive.id;
                let bgDot = "bg-emerald-400";
                let borderColor = "border-[#262626]";

                if (hive.status === "CRITICAL") {
                  bgDot = "bg-rose-500 animate-ping";
                  borderColor = "border-rose-500/80";
                } else if (hive.status === "WATCH") {
                  bgDot = "bg-amber-400";
                  borderColor = "border-amber-500/60";
                }

                return (
                  <button
                    key={hive.id}
                    onClick={() => setSelectedHiveId(hive.id)}
                    className={`h-12 rounded-sm border p-1 flex flex-col items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#070a12] border-2 border-white ring-2 ring-amber-500/40 shadow-lg"
                        : `bg-[#0b0f19] ${borderColor} hover:border-zinc-500 hover:bg-[#141c2b]`
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-zinc-300">
                      #{hive.id < 10 ? `00${hive.id}` : hive.id < 100 ? `0${hive.id}` : hive.id}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${bgDot}`} />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/5">
              <span>● Green: Nominal</span>
              <span>● Amber: Watch Condition</span>
              <span>● Red: Critical Action Required</span>
            </div>
          </div>

          {/* Deep Hive Inspector Drawer (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[#161616] border-2 border-amber-500/40 p-6 rounded-sm space-y-6">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                  {selectedHive.apiary}
                </span>
                <h3 className="text-2xl font-bold text-white font-sans">
                  Hive #{selectedHive.id < 10 ? `00${selectedHive.id}` : selectedHive.id < 100 ? `0${selectedHive.id}` : selectedHive.id}
                </h3>
              </div>

              <span
                className={`text-xs font-mono font-bold px-3 py-1 rounded-sm border ${
                  selectedHive.status === "CRITICAL"
                    ? "bg-rose-950/60 text-rose-400 border-rose-800"
                    : selectedHive.status === "WATCH"
                    ? "bg-amber-950/60 text-amber-400 border-amber-800"
                    : "bg-emerald-950/60 text-emerald-400 border-emerald-800"
                }`}
              >
                {selectedHive.status}
              </span>
            </div>

            {/* Colony State Diagnosis */}
            <div className="bg-[#070a12] border border-[#262626] p-4 rounded-sm space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">COLONY DIAGNOSIS</span>
              <div className="text-sm font-bold text-white font-sans">{selectedHive.stateLabel}</div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 pt-1">
                <span>Model Confidence: <strong className="text-amber-400">{selectedHive.confidencePct}%</strong></span>
                <span>Anomaly Score: <strong className="text-white">{selectedHive.anomalyScore}</strong></span>
              </div>
            </div>

            {/* 4 Sensor Telemetry Readouts */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#070a12] border border-[#262626] p-3 rounded-sm space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" /> Brood Temp
                </span>
                <span className="text-lg font-bold text-white font-mono">{selectedHive.tempC}°C</span>
                <span className="text-[9px] font-mono text-zinc-500 block">NIST RTD (±0.05°C)</span>
              </div>

              <div className="bg-[#070a12] border border-[#262626] p-3 rounded-sm space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-cyan-400" /> Acoustic Peak
                </span>
                <span className="text-lg font-bold text-cyan-400 font-mono">{selectedHive.acousticHz} Hz</span>
                <span className="text-[9px] font-mono text-zinc-500 block">128-pt FFT Bin</span>
              </div>

              <div className="bg-[#070a12] border border-[#262626] p-3 rounded-sm space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-emerald-400" /> NDIR CO2
                </span>
                <span className="text-lg font-bold text-white font-mono">{selectedHive.co2Ppm} ppm</span>
                <span className="text-[9px] font-mono text-zinc-500 block">Sensirion SCD41</span>
              </div>

              <div className="bg-[#070a12] border border-[#262626] p-3 rounded-sm space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-amber-400" /> LoRa Mesh Link
                </span>
                <span className="text-lg font-bold text-amber-400 font-mono">IN865</span>
                <span className="text-[9px] font-mono text-zinc-500 block">Packet: {selectedHive.lastPacket}</span>
              </div>
            </div>

            {/* Recommended Beekeeper Action */}
            <div className="p-4 bg-[#0b0f19] border border-amber-500/40 rounded-sm space-y-1.5">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RECOMMENDED FIELD ACTION</span>
              </span>
              <p className="text-xs font-mono text-zinc-200 leading-relaxed">
                {selectedHive.recommendedAction}
              </p>
            </div>

            <div className="text-[10px] font-mono text-zinc-500 text-center">
              INTERACTIVE SIMULATION • DEMO STREAM GROUNDED IN VERIFIED BIOPHYSICS
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
