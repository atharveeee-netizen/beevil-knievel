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
  screen?: "triage" | "fft" | "radar" | "nfc" | "provenance" | "mesh";
  className?: string;
}

export function DeviceMockup({ screen = "triage", className = "" }: DeviceMockupProps) {
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
        <div className="w-2 h-2 rounded-full bg-[#2ea043] animate-pulse" />
      </div>

      {/* Mobile Screen Header / Status Bar */}
      <div className="pt-9 px-5 pb-2 flex items-center justify-between text-[10px] font-mono text-[#8a90a0] border-b border-white/5 bg-[#0a0d14] z-30">
        <div className="flex items-center gap-1.5 font-bold text-[#f4f4f6]">
          <span>09:41</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-[#f0b840]" />
          <span>IN865</span>
          <div className="w-4 h-2 bg-[#2ea043] rounded-[2px]" />
        </div>
      </div>

      {/* Screen Body Content */}
      <div className="flex-1 p-4 overflow-hidden bg-[#0a0d14] text-[#f4f4f6] flex flex-col justify-between">
        {screen === "radar" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#8a90a0] uppercase tracking-widest block">TELEMETRY HUD</span>
                <span className="text-sm font-bold text-[#f4f4f6]">Hive #042 Core</span>
              </div>
              <span className="text-[10px] font-mono text-[#f0b840] bg-[#f0b840]/10 border border-[#f0b840]/40 px-2 py-0.5 rounded-sm">
                SWARM RISK
              </span>
            </div>

            {/* Brood Temperature Gauge */}
            <div className="bg-[#12151e] border border-[#222632] p-3 rounded-sm space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#8a90a0] flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-[#da3633]" /> TMP117 Brood RTD
                </span>
                <span className="text-[#f0b840] font-bold">34.82°C</span>
              </div>
              <div className="h-1.5 w-full bg-[#222632] rounded-full overflow-hidden">
                <div className="h-full bg-[#f0b840] w-[88%]" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#8a90a0]">
                <span>NIST ±0.05°C</span>
                <span>Drift: +2.45°C/24h</span>
              </div>
            </div>

            {/* Photoacoustic CO2 Gauge */}
            <div className="bg-[#12151e] border border-[#222632] p-3 rounded-sm space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#8a90a0] flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#f0b840]" /> SCD41 NDIR CO2
                </span>
                <span className="text-[#f4f4f6] font-bold">1,140 ppm</span>
              </div>
              <div className="h-1.5 w-full bg-[#222632] rounded-full overflow-hidden">
                <div className="h-full bg-[#f0b840] w-[58%]" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#8a90a0]">
                <span>Photoacoustic NDIR</span>
                <span>Threshold: 2,500 ppm</span>
              </div>
            </div>

            {/* Weight Flux Scale */}
            <div className="bg-[#12151e] border border-[#222632] p-3 rounded-sm space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#8a90a0] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#2ea043]" /> HX711 200kg Load
                </span>
                <span className="text-[#2ea043] font-bold">+1.84 kg/day</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#8a90a0]">
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
                <span className="text-[9px] font-mono text-[#8a90a0] uppercase tracking-widest block">EXCEPTION FEED</span>
                <span className="text-xs font-bold text-[#f4f4f6]">4 Action Needed</span>
              </div>
              <span className="text-[9px] font-mono text-[#2ea043] bg-[#2ea043]/15 border border-[#2ea043]/40 px-2 py-0.5 rounded-sm">
                96 Nominal
              </span>
            </div>

            {/* Alert Card 1 */}
            <div className="bg-[#12151e] border-l-2 border-l-[#f0b840] border border-[#222632] p-2.5 rounded-sm space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="font-bold text-[#f4f4f6]">Hive #042</span>
                <span className="text-[#f0b840] font-bold">485 Hz Swarm</span>
              </div>
              <p className="text-[9px] text-[#8a90a0] font-mono">
                Brood temp surge +2.45°C with acoustic piping spike.
              </p>
              <div className="flex gap-1.5 pt-1">
                <span className="text-[8px] font-mono text-[#f4f4f6] bg-[#161922] border border-[#2e3444] px-1.5 py-0.5 rounded-sm">Inspect Yard A</span>
                <span className="text-[8px] font-mono text-[#f0b840] bg-[#f0b840]/15 border border-[#f0b840]/40 px-1.5 py-0.5 rounded-sm">Listen 485Hz</span>
              </div>
            </div>

            {/* Alert Card 2 */}
            <div className="bg-[#12151e] border-l-2 border-l-[#da3633] border border-[#222632] p-2.5 rounded-sm space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="font-bold text-[#f4f4f6]">Hive #015</span>
                <span className="text-[#da3633] font-bold">Queen Loss</span>
              </div>
              <p className="text-[9px] text-[#8a90a0] font-mono">
                285 Hz queenless roar detected. Brood nest chill 33.1°C.
              </p>
            </div>

            {/* Alert Card 3 */}
            <div className="bg-[#12151e] border-l-2 border-l-[#f0b840] border border-[#222632] p-2.5 rounded-sm space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="font-bold text-[#f4f4f6]">Hive #073</span>
                <span className="text-[#f0b840] font-bold">Varroa 5.4%</span>
              </div>
              <p className="text-[9px] text-[#8a90a0] font-mono">
                82 kΩ alarm pheromone release with high grooming friction.
              </p>
            </div>
          </div>
        )}

        {screen === "fft" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#8a90a0] uppercase tracking-widest block">BIO-ACOUSTIC ENGINE</span>
                <span className="text-sm font-bold text-[#f4f4f6]">128-pt FFT Spectrum</span>
              </div>
              <span className="text-[10px] font-mono text-[#2ea043] bg-[#2ea043]/15 border border-[#2ea043]/40 px-2 py-0.5 rounded-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ea043] animate-ping" />
                220 Hz NOMINAL
              </span>
            </div>

            {/* FFT Histogram Visualizer */}
            <div className="bg-[#12151e] border border-[#222632] p-3 rounded-sm h-36 flex items-end justify-between gap-1">
              {[20, 35, 45, 80, 95, 65, 40, 30, 25, 38, 55, 75, 50, 30, 20, 15].map((val, i) => (
                <div key={i} className="flex-1 bg-[#1e2330] rounded-t-sm h-full flex items-end">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      i === 4 ? "bg-[#f0b840]" : i === 11 ? "bg-[#f4f4f6]" : "bg-[#2ea043]"
                    }`}
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[10px] font-mono text-[#8a90a0]">
              <span>50 Hz</span>
              <span className="text-[#f0b840] font-bold">220 Hz (Peak)</span>
              <span>1200 Hz</span>
            </div>

            <div className="bg-[#12151e] border border-[#222632] p-2 rounded-sm text-[9px] font-mono text-[#8a90a0] flex items-center justify-between">
              <span>CMSIS-DSP Cortex-M4F</span>
              <span className="text-[#2ea043]">Latency: 1.12 ms</span>
            </div>
          </div>
        )}

        {screen === "nfc" && (
          <div className="space-y-4 text-center py-2">
            <span className="text-[9px] font-mono text-[#8a90a0] uppercase tracking-widest block">1-TAP FIELD HUD</span>
            <h4 className="text-sm font-bold text-[#f4f4f6]">NFC Tag Lock-On</h4>

            {/* Radar Scan Ring */}
            <div className="relative w-36 h-36 mx-auto rounded-full border border-[#f0b840]/40 flex items-center justify-center bg-[#f0b840]/5">
              <div className="w-24 h-24 rounded-full border border-dashed border-[#f0b840]/60 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="w-10 h-10 text-[#f0b840]" />
              </div>
            </div>

            <div className="bg-[#12151e] border border-[#222632] p-2.5 rounded-sm text-[10px] font-mono text-[#8a90a0] space-y-1">
              <div className="flex justify-between text-[#2ea043] font-bold">
                <span>TAG ID: 0x8F3A29B</span>
                <span>LOCKED</span>
              </div>
              <p className="text-[9px] text-[#8a90a0] text-left">
                Yard Alpha • Row 3 • Hive #042
              </p>
            </div>
          </div>
        )}

        {screen === "provenance" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#8a90a0] uppercase tracking-widest block">HONEY CHAIN LEDGER</span>
                <span className="text-xs font-bold text-[#f4f4f6]">Batch Provenance</span>
              </div>
              <span className="text-[9px] font-mono text-[#2ea043] bg-[#2ea043]/15 border border-[#2ea043]/40 px-2 py-0.5 rounded-sm">
                SHA-256 PASS
              </span>
            </div>

            <div className="bg-[#12151e] border border-[#222632] p-3 rounded-sm text-center space-y-2">
              <div className="w-24 h-24 mx-auto bg-white p-1.5 rounded-sm">
                <div className="w-full h-full bg-[#0a0d14] flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="text-[9px] font-mono text-[#8a90a0] break-all bg-[#0a0d14] p-1.5 rounded-sm border border-[#222632]">
                0x7d92...e41b (Merkle Root)
              </div>
            </div>

            <div className="text-[9px] font-mono text-[#8a90a0] space-y-1">
              <div className="flex justify-between">
                <span>Harvest Date:</span>
                <span className="text-[#f4f4f6]">2026-08-15</span>
              </div>
              <div className="flex justify-between">
                <span>Moisture Level:</span>
                <span className="text-[#2ea043]">17.2% (Grade A)</span>
              </div>
            </div>
          </div>
        )}

        {screen === "mesh" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#8a90a0] uppercase tracking-widest block">FLEET TOPOLOGY</span>
                <span className="text-xs font-bold text-[#f4f4f6]">100-Hive Matrix</span>
              </div>
              <span className="text-[9px] font-mono text-[#2ea043] bg-[#2ea043]/15 border border-[#2ea043]/40 px-2 py-0.5 rounded-sm">
                99.8% PDR
              </span>
            </div>

            {/* 100 Mini LED Dots */}
            <div className="bg-[#12151e] border border-[#222632] p-2.5 rounded-sm grid grid-cols-10 gap-1.5">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-[2px] ${
                    i === 41 ? "bg-[#f0b840] animate-ping" : i === 14 ? "bg-[#da3633]" : "bg-[#2ea043]"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between text-[9px] font-mono text-[#8a90a0]">
              <span>Yard Alpha: 50 Active</span>
              <span>Yard Beta: 50 Active</span>
            </div>
          </div>
        )}

        {/* Bottom App Navigation Bar */}
        <div className="pt-2 border-t border-[#222632] flex justify-around text-[#8a90a0]">
          <div className="w-6 h-6 flex items-center justify-center text-[#f0b840]">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center text-[#8a90a0]">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center text-[#8a90a0]">
            <QrCode className="w-3.5 h-3.5" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center text-[#8a90a0]">
            <Compass className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
