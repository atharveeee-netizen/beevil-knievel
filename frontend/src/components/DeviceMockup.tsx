"use client";

import React from "react";
import {
  Radio, Activity, Thermometer, Zap, ShieldCheck,
  QrCode, Search, Volume2, Sparkles, AlertTriangle,
  Flame, Wifi, Compass, ChevronRight, CheckCircle2,
  Cpu, Layers, Lock, ShieldAlert
} from "lucide-react";
import { DecryptedText, ShinyText } from "@/components/reactbits";

interface DeviceMockupProps {
  screen: "triage" | "fft" | "radar" | "nfc" | "provenance" | "mesh";
  className?: string;
}

export function DeviceMockup({ screen, className = "" }: DeviceMockupProps) {
  return (
    <div
      className={`relative w-[280px] sm:w-[320px] h-[580px] sm:h-[640px] bg-[#000000] border-[6px] border-[#262626] rounded-[48px] shadow-2xl overflow-hidden flex flex-col justify-between select-none ${className}`}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), inset 0 0 0 2px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Dynamic Island Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#161616] border border-white/10" />
        <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
      </div>

      {/* Mobile Screen Header / Status Bar */}
      <div className="pt-9 px-5 pb-2 flex items-center justify-between text-[10px] font-mono text-zinc-400 border-b border-white/5 bg-[#070a12]/80 backdrop-blur-sm z-30">
        <div className="flex items-center gap-1.5 font-bold text-white">
          <span>09:41</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-amber-400" />
          <span>IN865</span>
          <div className="w-4 h-2 bg-emerald-500 rounded-[2px]" />
        </div>
      </div>

      {/* Screen Body Content */}
      <div className="flex-1 p-4 overflow-hidden bg-[#070a12] text-white flex flex-col justify-between">
        {screen === "radar" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">TELEMETRY HUD</span>
                <span className="text-sm font-bold text-white">Hive #042 Core</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-sm">
                SWARM RISK
              </span>
            </div>

            {/* Brood Temperature Gauge */}
            <div className="bg-[#161616] border border-[#393939] p-3 rounded-sm space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" /> TMP117 Brood RTD
                </span>
                <span className="text-amber-400 font-bold">34.82°C</span>
              </div>
              <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 w-[88%]" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                <span>NIST ±0.05°C</span>
                <span>Drift: +2.45°C/24h</span>
              </div>
            </div>

            {/* Photoacoustic CO2 Gauge */}
            <div className="bg-[#161616] border border-[#393939] p-3 rounded-sm space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-cyan-400" /> SCD41 NDIR CO2
                </span>
                <span className="text-cyan-400 font-bold">1,140 ppm</span>
              </div>
              <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-[58%]" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                <span>Photoacoustic NDIR</span>
                <span>Threshold: 2,500 ppm</span>
              </div>
            </div>

            {/* Weight Flux Scale */}
            <div className="bg-[#161616] border border-[#393939] p-3 rounded-sm space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" /> HX711 200kg Load
                </span>
                <span className="text-emerald-400 font-bold">+1.84 kg/day</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                <span>24-bit Differential ADC</span>
                <span>Gross: 48.20 kg</span>
              </div>
            </div>
          </div>
        )}

        {screen === "triage" && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">EXCEPTION FEED</span>
                <span className="text-xs font-bold text-white">4 Action Needed</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-sm">
                96 Nominal
              </span>
            </div>

            {/* Alert Card 1 */}
            <div className="bg-[#161616] border-l-2 border-l-amber-400 border border-[#393939] p-2.5 rounded-sm space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="font-bold text-white">Hive #042</span>
                <span className="text-amber-400 font-bold">485 Hz Swarm</span>
              </div>
              <p className="text-[9px] text-zinc-400 font-mono">
                Brood temp surge +2.45°C with acoustic piping spike.
              </p>
              <div className="flex gap-1.5 pt-1">
                <span className="text-[8px] font-mono text-zinc-300 bg-[#262626] px-1.5 py-0.5 rounded-sm">Inspect Yard A</span>
                <span className="text-[8px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded-sm">Listen 485Hz</span>
              </div>
            </div>

            {/* Alert Card 2 */}
            <div className="bg-[#161616] border-l-2 border-l-rose-500 border border-[#393939] p-2.5 rounded-sm space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="font-bold text-white">Hive #015</span>
                <span className="text-rose-400 font-bold">Queen Loss</span>
              </div>
              <p className="text-[9px] text-zinc-400 font-mono">
                285 Hz queenless roar detected. Brood nest chill 33.1°C.
              </p>
            </div>

            {/* Alert Card 3 */}
            <div className="bg-[#161616] border-l-2 border-l-purple-400 border border-[#393939] p-2.5 rounded-sm space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="font-bold text-white">Hive #073</span>
                <span className="text-purple-400 font-bold">Varroa 5.4%</span>
              </div>
              <p className="text-[9px] text-zinc-400 font-mono">
                82 kΩ alarm pheromone release with high grooming friction.
              </p>
            </div>
          </div>
        )}

        {screen === "fft" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">BIO-ACOUSTIC ENGINE</span>
                <span className="text-sm font-bold text-white">128-pt FFT Spectrum</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                220 Hz NOMINAL
              </span>
            </div>

            {/* FFT Histogram Visualizer */}
            <div className="bg-[#161616] border border-[#393939] p-3 rounded-sm h-36 flex items-end justify-between gap-1">
              {[20, 35, 45, 80, 95, 65, 40, 30, 25, 38, 55, 75, 50, 30, 20, 15].map((val, i) => (
                <div key={i} className="flex-1 bg-[#262626] rounded-t-sm h-full flex items-end">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      i === 4 ? "bg-amber-400" : i === 11 ? "bg-cyan-400" : "bg-emerald-500"
                    }`}
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>50 Hz</span>
              <span className="text-amber-400 font-bold">220 Hz (Peak)</span>
              <span>1200 Hz</span>
            </div>

            <div className="bg-[#161616] border border-[#393939] p-2 rounded-sm text-[9px] font-mono text-zinc-400 flex items-center justify-between">
              <span>CMSIS-DSP Cortex-M4F</span>
              <span className="text-emerald-400">Latency: 1.12 ms</span>
            </div>
          </div>
        )}

        {screen === "nfc" && (
          <div className="space-y-4 text-center py-2">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">1-TAP FIELD HUD</span>
            <h4 className="text-sm font-bold text-white">NFC Tag Lock-On</h4>

            {/* Radar Scan Ring */}
            <div className="relative w-36 h-36 mx-auto rounded-full border border-amber-500/40 flex items-center justify-center bg-amber-950/10">
              <div className="w-24 h-24 rounded-full border border-dashed border-amber-500/60 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="w-10 h-10 text-amber-400" />
              </div>
            </div>

            <div className="bg-[#161616] border border-[#393939] p-2.5 rounded-sm text-[10px] font-mono text-zinc-300 space-y-1">
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>TAG ID: 0x8F3A29B</span>
                <span>LOCKED</span>
              </div>
              <p className="text-[9px] text-zinc-500 text-left">
                Yard Alpha • Row 3 • Hive #042
              </p>
            </div>
          </div>
        )}

        {screen === "provenance" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">HONEY CHAIN LEDGER</span>
                <span className="text-xs font-bold text-white">Batch Provenance</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-sm">
                SHA-256 PASS
              </span>
            </div>

            <div className="bg-[#161616] border border-[#393939] p-3 rounded-sm text-center space-y-2">
              <div className="w-24 h-24 mx-auto bg-white p-1.5 rounded-sm">
                <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="text-[9px] font-mono text-zinc-400 break-all bg-black/60 p-1.5 rounded-sm border border-white/5">
                0x7d92...e41b (Merkle Root)
              </div>
            </div>

            <div className="text-[9px] font-mono text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Harvest Date:</span>
                <span className="text-white">2026-08-15</span>
              </div>
              <div className="flex justify-between">
                <span>Moisture Level:</span>
                <span className="text-emerald-400">17.2% (Grade A)</span>
              </div>
            </div>
          </div>
        )}

        {screen === "mesh" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">FLEET TOPOLOGY</span>
                <span className="text-xs font-bold text-white">100-Hive Matrix</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-sm">
                99.8% PDR
              </span>
            </div>

            {/* 100 Mini LED Dots */}
            <div className="bg-[#161616] border border-[#393939] p-2.5 rounded-sm grid grid-cols-10 gap-1.5">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-[2px] ${
                    i === 41 ? "bg-amber-400 animate-ping" : i === 14 ? "bg-rose-500" : "bg-emerald-500/80"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between text-[9px] font-mono text-zinc-400">
              <span>Yard Alpha: 50 Active</span>
              <span>Yard Beta: 50 Active</span>
            </div>
          </div>
        )}

        {/* Bottom App Navigation Bar */}
        <div className="pt-2 border-t border-white/5 flex justify-around text-zinc-500">
          <div className="w-6 h-6 flex items-center justify-center text-amber-400">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center text-zinc-400">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center text-zinc-400">
            <QrCode className="w-3.5 h-3.5" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center text-zinc-400">
            <Compass className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
