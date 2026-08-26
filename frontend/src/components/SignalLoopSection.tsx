"use client";

import React, { useState } from "react";
import {
  Activity, Thermometer, Radio, Flame, Zap,
  Volume2, ShieldCheck, Cpu, ArrowRight, CheckCircle2,
  Layers, Compass, Sliders, Info, Eye
} from "lucide-react";
import { DecryptedText, ShinyText, SpotlightCard, ClickSpark } from "@/components/reactbits";

interface SignalDetail {
  name: string;
  sensor: string;
  nominal: string;
  anomaly: string;
  earlyWarning: string;
  leadTime: string;
  icon: React.ElementType;
  accent: string;
}

const HIVE_SIGNALS: SignalDetail[] = [
  {
    name: "Brood Core Temperature",
    sensor: "TI TMP117 (NIST-Traceable RTD)",
    nominal: "34.82°C ± 0.5°C (Tight Homeostasis)",
    anomaly: "CUSUM drift > +1.8°C (Pre-heating) or < 33.0°C (Brood chill / Queen loss)",
    earlyWarning: "Identifies queenlessness and pre-swarm heating before workers start emergency queen cells.",
    leadTime: "48 - 72 Hours",
    icon: Thermometer,
    accent: "#f59e0b",
  },
  {
    name: "Bio-Acoustic Frequency",
    sensor: "TDK INMP441 (24-bit I2S MEMS Microphone)",
    nominal: "200 - 240 Hz steady worker hum",
    anomaly: "250 Hz pulsed piping (Virgin Queen) or 450 - 550 Hz high-energy escalation (Swarm swarm-roar)",
    earlyWarning: "Captures acoustic energy density shifts preceding swarms before 20,000 bees depart for the tree canopy.",
    leadTime: "24 - 72 Hours",
    icon: Volume2,
    accent: "#06b6d4",
  },
  {
    name: "Respiration & Gas Dynamics",
    sensor: "Sensirion SCD41 (Photoacoustic NDIR CO2)",
    nominal: "800 - 1,200 ppm baseline ventilation",
    anomaly: "Spike > 2,500 ppm (Pre-flight metabolic surge) or rapid decline (Cluster collapse)",
    earlyWarning: "Measures hive metabolic activity and cluster contraction during cold snaps or predator stress.",
    leadTime: "12 - 36 Hours",
    icon: Flame,
    accent: "#10b981",
  },
  {
    name: "Daily Honey Flux & Weight",
    sensor: "Avia HX711 (24-bit Differential ADC + Load Cell)",
    nominal: "+0.5 to +3.5 kg/day active nectar flow",
    anomaly: "Sudden -1.8 to -3.0 kg cliff (Swarm departure) or flatline during peak bloom (Robbing / Flow stop)",
    earlyWarning: "Detects real-time nectar flows, informing exactly when to add honey supers without opening the box.",
    leadTime: "Real-time",
    icon: Zap,
    accent: "#a855f7",
  },
];

const CORE_LOOP_STEPS = [
  {
    step: "01",
    title: "SENSE",
    kicker: "MICRO-SENSING ARRAY",
    desc: "Precision digital sensors capture temperature, acoustics, CO2, VOCs, and weight inside the propolis envelope.",
    hardware: "TMP117 • INMP441 • SCD41 • HX711",
    accent: "#f59e0b",
  },
  {
    step: "02",
    title: "PROCESS",
    kicker: "LOW-POWER MCU",
    desc: "Nordic nRF52840 extracts 128-pt CMSIS-DSP FFT bins and statistical feature vectors in 2.0µA deep sleep cycles.",
    hardware: "Arm Cortex-M4F @ 64MHz",
    accent: "#06b6d4",
  },
  {
    step: "03",
    title: "UNDERSTAND",
    kicker: "ON-DEVICE TINYML",
    desc: "1D-CNN neural classifier classifies colony acoustic and multi-modal states locally on the node in 1.12 ms.",
    hardware: "TFLite Micro Quantized INT8",
    accent: "#10b981",
  },
  {
    step: "04",
    title: "DETECT",
    kicker: "STATISTICAL ANOMALY ENGINE",
    desc: "Edge gateway runs CUSUM thermal drift detection and multi-hive correlation across the 100-node mesh.",
    hardware: "Antmicro CM4 Baseboard (6 TOPS)",
    accent: "#a855f7",
  },
  {
    step: "05",
    title: "ALERT",
    kicker: "ACTIONABLE OPERATIONAL TRIAGE",
    desc: "Beekeeper receives concise, verified warnings specifying exact hive ID, root cause, and recommended action.",
    hardware: "LoRaWAN IN865 • Field App HUD",
    accent: "#f43f5e",
  },
];

export function SignalLoopSection() {
  const [selectedSignal, setSelectedSignal] = useState(0);

  return (
    <section id="the-signal" className="bg-[#070a12] text-[#f8fafc] py-28 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Section 1: The Hive is a Signal */}
        <div className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#161616] border border-amber-500/30 text-[#f59e0b] px-3.5 py-1.5 rounded-sm text-xs font-mono font-semibold uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>COLONY BIOPHYSICS // CONTINUOUS OBSERVATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans uppercase">
              The Hive is a Signal.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-mono leading-relaxed">
              Temperature. Acoustics. Respiration. Weight flux. Colony motion. These physical signals shift days before colony failure becomes visible to human eyes. Beevil Knievel continuously observes these invisible patterns and turns them into actionable intelligence.
            </p>
          </div>

          {/* Interactive Signal Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Signal Selector Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {HIVE_SIGNALS.map((sig, idx) => {
                const IconComponent = sig.icon;
                const isSelected = selectedSignal === idx;
                return (
                  <button
                    key={sig.name}
                    onClick={() => setSelectedSignal(idx)}
                    className={`w-full text-left p-4 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-[#161616] border-amber-500/60 shadow-lg shadow-amber-500/5"
                        : "bg-[#0b0f19] border-[#262626] hover:border-zinc-700 hover:bg-[#121824]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="p-2.5 rounded-sm border"
                        style={{
                          backgroundColor: isSelected ? `${sig.accent}20` : "#161616",
                          borderColor: isSelected ? sig.accent : "#393939",
                          color: sig.accent,
                        }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white font-sans">{sig.name}</div>
                        <div className="text-[11px] font-mono text-zinc-400">{sig.sensor}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-zinc-500 block">EARLY WARNING</span>
                      <span className="text-xs font-mono font-bold" style={{ color: sig.accent }}>
                        {sig.leadTime}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Signal Deep Detail Inspector Card */}
            <div className="lg:col-span-7 bg-[#161616] border border-[#393939] p-6 sm:p-8 rounded-sm space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">TELEMETRY DEEP DIVE</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    {HIVE_SIGNALS[selectedSignal].name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-zinc-400 block">PRECISION HARDWARE</span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {HIVE_SIGNALS[selectedSignal].sensor}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#070a12] border border-[#262626] p-4 rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">NOMINAL STATE</span>
                  <p className="text-xs font-mono text-zinc-200">
                    {HIVE_SIGNALS[selectedSignal].nominal}
                  </p>
                </div>

                <div className="bg-[#070a12] border border-[#262626] p-4 rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">ANOMALY TRIGGER</span>
                  <p className="text-xs font-mono text-zinc-200">
                    {HIVE_SIGNALS[selectedSignal].anomaly}
                  </p>
                </div>
              </div>

              <div className="space-y-2 bg-[#0b0f19] border border-[#262626] p-4 rounded-sm">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  <span>BIOLOGICAL &amp; OPERATIONAL SIGNIFICANCE</span>
                </span>
                <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                  {HIVE_SIGNALS[selectedSignal].earlyWarning}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
                <span>Detection Horizon: <strong className="text-white">{HIVE_SIGNALS[selectedSignal].leadTime}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified in Field Trials
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The Core Loop (SENSE -> PROCESS -> UNDERSTAND -> DETECT -> ALERT) */}
        <div className="space-y-12 pt-12 border-t border-[#262626]">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#161616] border border-white/10 text-zinc-300 px-3.5 py-1.5 rounded-sm text-xs font-mono uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>THE FIVE-STAGE CLOSED LOOP</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-white font-sans uppercase">
              From Physical World to Operational Decision
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              How invisible micro-signals inside the brood nest become verified alerts on your phone.
            </p>
          </div>

          {/* 5-Step Pipeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {CORE_LOOP_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="bg-[#161616] border border-[#262626] p-5 rounded-sm flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors group relative"
              >
                {/* Top Step Number & Kicker */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold" style={{ color: item.accent }}>
                      {item.step}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 px-1.5 py-0.5 bg-[#070a12] rounded-sm border border-white/5">
                      STAGE {idx + 1}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono font-bold tracking-wider" style={{ color: item.accent }}>
                    {item.kicker}
                  </div>

                  <h4 className="text-lg font-bold text-white font-sans tracking-tight">
                    {item.title}
                  </h4>

                  <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Hardware Tag */}
                <div className="pt-3 border-t border-white/5 text-[10px] font-mono text-zinc-400">
                  <span className="text-zinc-500 block text-[8px] uppercase">EXECUTION TARGET</span>
                  <span className="text-zinc-300 font-bold truncate block">{item.hardware}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
