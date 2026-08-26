"use client";

import React, { useState } from "react";
import {
  Clock, Activity, AlertTriangle, ShieldCheck,
  Thermometer, Volume2, Flame, CheckCircle2,
  ChevronRight, ArrowRight, Play, Sparkles
} from "lucide-react";
import { DecryptedText, ShinyText } from "@/components/reactbits";

interface TimelineEvent {
  hoursBefore: number;
  timeLabel: string;
  stageName: string;
  tempC: number;
  acousticHz: number;
  co2Ppm: number;
  visibleToHuman: string;
  invisibleSignal: string;
  systemAction: string;
  status: "NORMAL" | "WATCH" | "ALERT" | "PREVENTED";
  accent: string;
}

const SWARM_TIMELINE: TimelineEvent[] = [
  {
    hoursBefore: 72,
    timeLabel: "Day -3 (72h Out)",
    stageName: "THERMAL PRE-HEATING",
    tempC: 35.8,
    acousticHz: 228,
    co2Ppm: 1240,
    visibleToHuman: "Looks 100% normal from outside. Normal foraging flights at the entrance.",
    invisibleSignal: "TI TMP117 detects subtle +1.0°C brood core heating as workers prepare queen cup cells.",
    systemAction: "CUSUM drift algorithm triggers internal node telemetry log elevation.",
    status: "WATCH",
    accent: "#f59e0b",
  },
  {
    hoursBefore: 48,
    timeLabel: "Day -2 (48h Out)",
    stageName: "VIRGIN QUEEN PIPING",
    tempC: 36.4,
    acousticHz: 252,
    co2Ppm: 1560,
    visibleToHuman: "No visible clues. Entrance traffic looks healthy. Beekeepers would walk right past.",
    invisibleSignal: "TDK INMP441 captures 250 Hz characteristic virgin queen piping pulses in brood nest.",
    systemAction: "1D-CNN TinyML model on node flags 'Queen Transition' state with 94.2% confidence.",
    status: "WATCH",
    accent: "#06b6d4",
  },
  {
    hoursBefore: 24,
    timeLabel: "Day -1 (24h Out)",
    stageName: "METABOLIC & ACOUSTIC SURGE",
    tempC: 37.1,
    acousticHz: 485,
    co2Ppm: 2480,
    visibleToHuman: "Bees look slightly crowded on the landing board, but easily mistaken for warm weather beard.",
    invisibleSignal: "High-frequency acoustic energy escalates to 485 Hz. Sensirion SCD41 registers 2,480 ppm CO2 spike.",
    systemAction: "Edge Gateway dispatches high-priority LoRa alert: 'Hive #042: Pre-Swarm Split Window (24h)'.",
    status: "ALERT",
    accent: "#f43f5e",
  },
  {
    hoursBefore: 0,
    timeLabel: "Day 0 (Departure Window)",
    stageName: "PREVENTION & VALUE PRESERVED",
    tempC: 34.8,
    acousticHz: 220,
    co2Ppm: 1120,
    visibleToHuman: "Without Beevil Knievel: 20,000 bees take flight into the high tree canopy ($750 lost).",
    invisibleSignal: "With Beevil Knievel: Beekeeper completed 6-minute artificial swarm split yesterday afternoon.",
    systemAction: "Colony split into two productive hives. Both colonies preserved. Zero honey crop lost.",
    status: "PREVENTED",
    accent: "#10b981",
  },
];

export function BeforeFailureTimelineSection() {
  const [activeStep, setActiveStep] = useState(2); // Default to Day -1 alert state
  const current = SWARM_TIMELINE[activeStep];

  return (
    <section id="the-timeline" className="bg-[#070a12] text-[#f8fafc] py-28 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#161616] border border-amber-500/30 text-[#f59e0b] px-3.5 py-1.5 rounded-sm text-xs font-mono font-semibold uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>SIGNATURE DEMO // 72-HOUR ANOMALY PROGRESSION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans uppercase">
            Before Failure Becomes Visible.
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-mono leading-relaxed">
            A colony does not fail overnight. In this real-world swarm sequence, physical micro-signals shift 72 hours before 20,000 bees take flight for the tree canopy.
          </p>
        </div>

        {/* Interactive 4-Step Scrubber Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#161616] border border-[#393939] p-2 rounded-sm">
          {SWARM_TIMELINE.map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.hoursBefore}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-sm text-left transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#070a12] border-amber-500 text-white shadow-lg"
                    : "bg-transparent border-transparent hover:bg-[#202020] text-zinc-400"
                }`}
              >
                <div className="text-[10px] font-mono text-zinc-500 uppercase">{item.timeLabel}</div>
                <div className="text-xs sm:text-sm font-bold truncate mt-0.5" style={{ color: isSelected ? item.accent : "#ffffff" }}>
                  {item.stageName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep State Comparison: Human Sight vs Edge Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: What the Beekeeper Sees (Zero Clues) */}
          <div className="lg:col-span-6 bg-[#161616] border border-[#393939] p-6 sm:p-8 rounded-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  WHAT IS VISIBLE TO THE HUMAN EYE
                </span>
                <span className="text-xs font-mono text-zinc-500">Traditional Beekeeping</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                {current.timeLabel}: Outside the Hive
              </h3>

              <div className="bg-[#070a12] border border-[#262626] p-4 rounded-sm space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">VISUAL OBSERVATION</span>
                <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                  {current.visibleToHuman}
                </p>
              </div>

              <div className="p-4 bg-amber-950/20 border border-amber-800/30 rounded-sm text-xs font-mono text-amber-300">
                ⚠️ Without continuous telemetry, detecting this state requires pulling 10 heavy frames, chilling brood, and luck.
              </div>
            </div>

            <div className="text-xs font-mono text-zinc-500 border-t border-white/5 pt-3">
              Inspection Status: <strong className="text-zinc-300">Routine blind check required</strong>
            </div>
          </div>

          {/* Right Column: What Beevil Knievel Senses (Micro-Signals) */}
          <div className="lg:col-span-6 bg-[#161616] border-2 rounded-sm p-6 sm:p-8 space-y-6 flex flex-col justify-between" style={{ borderColor: `${current.accent}60` }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: current.accent }}>
                  WHAT BEEVIL KNIEVEL SENSES INTERNALLY
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-sm border" style={{ backgroundColor: `${current.accent}20`, borderColor: current.accent, color: current.accent }}>
                  {current.status}
                </span>
              </div>

              {/* 3 Real-time Gauge Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#070a12] border border-[#262626] p-3 rounded-sm space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                    <Thermometer className="w-3 h-3 text-rose-400" /> Brood Temp
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono">{current.tempC}°C</div>
                </div>

                <div className="bg-[#070a12] border border-[#262626] p-3 rounded-sm space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                    <Volume2 className="w-3 h-3 text-cyan-400" /> Acoustics
                  </div>
                  <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono">{current.acousticHz} Hz</div>
                </div>

                <div className="bg-[#070a12] border border-[#262626] p-3 rounded-sm space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                    <Flame className="w-3 h-3 text-emerald-400" /> SCD41 CO2
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono">{current.co2Ppm} ppm</div>
                </div>
              </div>

              {/* Invisible Signal Detail */}
              <div className="bg-[#070a12] border border-[#262626] p-4 rounded-sm space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 block uppercase">EDGE AI TELEMETRY</span>
                <p className="text-xs font-mono text-zinc-200 leading-relaxed">
                  {current.invisibleSignal}
                </p>
              </div>

              {/* Autonomous System Action */}
              <div className="bg-[#0b0f19] border border-[#262626] p-4 rounded-sm space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-400 block uppercase">SYSTEM INTERVENTION</span>
                <p className="text-xs font-mono text-emerald-300 leading-relaxed">
                  {current.systemAction}
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-zinc-400 border-t border-white/5 pt-3 flex justify-between items-center">
              <span>Operational Outcome:</span>
              <strong className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Colony Swarm Absconding Prevented ($750 Saved)
              </strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
