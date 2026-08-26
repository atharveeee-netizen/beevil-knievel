"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ShieldAlert,
  Zap,
  Flame,
  Bug,
  ThermometerSnowflake,
  TrendingDown,
  Skull,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { 
  SpotlightCard, 
  DecryptedText, 
  CountUp, 
  ShinyText, 
  ClickSpark 
} from "@/components/reactbits";

interface DiagnosticModel {
  id: number;
  name: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  sensors: string[];
  icon: React.ReactNode;
  status: "CRITICAL" | "PREDICTIVE" | "CONTINUOUS";
}

const AI_DIAGNOSTICS: DiagnosticModel[] = [
  {
    id: 1,
    name: "Queen Presence & Oviposition",
    category: "Vital Colony Health",
    metric: "100.00%",
    metricLabel: "Queenless Recall",
    description: "Detects queen loss, supersedure, or drone-laying emergencies within 2 hours by fusing TI TMP117 (±0.05°C) brood core stability and TDK INMP441 250Hz queen piping harmonics.",
    sensors: ["TI TMP117 (±0.05°C RTD)", "TDK INMP441 (250Hz FFT)"],
    icon: <Activity className="w-4 h-4 text-emerald-400" />,
    status: "CRITICAL",
  },
  {
    id: 2,
    name: "Varroa Destructor Infestation",
    category: "Parasitic Pathology",
    metric: "96.84%",
    metricLabel: "Out-of-Sample Acc",
    description: "Analyzes STMicroelectronics LIS3DH 3-axis micro-vibrational agitation and grooming wing-buzz perturbations to calculate colony mite load before economic injury thresholds.",
    sensors: ["ST LIS3DH 3-Axis IMU", "TDK INMP441 24-bit I2S"],
    icon: <Bug className="w-4 h-4 text-rose-400" />,
    status: "CRITICAL",
  },
  {
    id: 3,
    name: "Pre-Swarm Departure Forecast",
    category: "Behavioral Prediction",
    metric: "24 Hours",
    metricLabel: "Early Warning",
    description: "Identifies the classic 450 Hz harmonic escalation and pre-swarm brood core temperature ramp, allowing apiary managers to execute Demaree splits.",
    sensors: ["128-pt CMSIS-DSP FFT", "TI TMP117 + Sensirion SHT45"],
    icon: <Zap className="w-4 h-4 text-amber-400" />,
    status: "PREDICTIVE",
  },
  {
    id: 4,
    name: "Foulbrood (AFB / EFB) Odor Markers",
    category: "Pathogen Biosecurity",
    metric: "sub-PPM",
    metricLabel: "MOX Sensitivity",
    description: "Bosch BME688 8-channel MOX gas sensor detects Paenibacillus larvae volatile 4-Allylanisole decomposition profiles weeks before visual frame rot.",
    sensors: ["Bosch BME688 8-Ch MOX", "Sensirion SHT45 RH"],
    icon: <Skull className="w-4 h-4 text-purple-400" />,
    status: "CRITICAL",
  },
  {
    id: 5,
    name: "Winter Cluster Core Thermoregulation",
    category: "Overwintering",
    metric: "±0.05°C",
    metricLabel: "Sensor Precision",
    description: "Monitors core cluster temperature and honey mantle thermal boundary during sub-zero ambient freezes to prevent colony freeze-out.",
    sensors: ["TI TMP117 Core RTD", "Sensirion SHT45 Ambient"],
    icon: <ThermometerSnowflake className="w-4 h-4 text-sky-400" />,
    status: "CONTINUOUS",
  },
  {
    id: 6,
    name: "Robbing & Yellowjacket Defense",
    category: "Colony Defense",
    metric: "< 5 ms",
    metricLabel: "Edge Latency",
    description: "Detects 800+ Hz acoustic turbulence and entrance fight frequencies during yellowjacket and robber bee attacks for instant LoRa push alerts.",
    sensors: ["TDK INMP441 (800Hz+)", "ST LIS3DH Shock Alert"],
    icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
    status: "CRITICAL",
  },
  {
    id: 7,
    name: "Nectar Flow & Honey Depletion",
    category: "Resource Tracking",
    metric: "+1.84 kg/d",
    metricLabel: "Flow Delta",
    description: "Avia HX711 24-bit differential ADC tracks diurnal foraging gains and nocturnal evaporation, predicting superseding honey flow vs starvation.",
    sensors: ["Avia HX711 24-bit ADC", "200kg Aviation Load Cell"],
    icon: <TrendingDown className="w-4 h-4 text-amber-400" />,
    status: "PREDICTIVE",
  },
  {
    id: 8,
    name: "Pesticide & Alarm Pheromone Spikes",
    category: "Environmental Toxins",
    metric: "Real-Time",
    metricLabel: "Anomaly Filter",
    description: "Bosch BME688 MOX gas sensor detects Isopentyl Acetate alarm pheromone surges combined with sudden ST LIS3DH worker tremor spikes.",
    sensors: ["Bosch BME688 (Isopentyl)", "ST LIS3DH Micro-Jitter"],
    icon: <Flame className="w-4 h-4 text-rose-400" />,
    status: "CRITICAL",
  },
];

export function EdgeAISection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const filtered = selectedFilter === "ALL" 
    ? AI_DIAGNOSTICS 
    : AI_DIAGNOSTICS.filter(d => d.status === selectedFilter);

  return (
    <section
      id="edge_ai"
      className="bg-[#070a12] text-[#f8fafc] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="max-w-[1360px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b0f19] border border-white/10 text-xs font-mono tracking-wider text-[#94a3b8]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[#f8fafc] font-semibold">DUAL-TIER EDGE NEURAL STACK</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-bold">1,050,000 FIELD RECORDS PROVENANCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f8fafc] font-sans">
            Edge neural inference with zero test leakage.
          </h2>

          <p className="text-base sm:text-lg text-[#94a3b8] font-normal leading-relaxed">
            Evaluated on real multi-sensor field telemetry across European and North American commercial apiaries. Verified using strict out-of-sample <strong className="text-[#f8fafc]">GroupKFold cross-validation</strong> to guarantee zero test leakage on unseen hives.
          </p>
        </div>

        {/* Dual-Tier Edge AI Architecture Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tier 1: Field Node TinyML */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.12)"
            className="bg-[#0b0f19]/90 border-white/10 p-6 rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Tier 1: On-Node TinyML 1D-CNN</span>
                </span>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                  Nordic nRF52840
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#f8fafc]">Ultra-Low-Power Edge Triage</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Micro 1D-CNN model (3,955 INT8 parameters) fitting in <strong>3.8 KB SRAM / 8.0 KB Flash</strong>. Runs in 1.12 ms with <strong>99.80% triage recall</strong> on ARM Cortex-M4F, suppressing 91.4% of redundant radio transmissions for 3.2+ years of battery autonomy.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-white/10 flex justify-between text-[11px] font-mono text-[#94a3b8]">
              <span>Latency: <strong className="text-[#f8fafc]">1.12 ms</strong></span>
              <span>Footprint: <strong className="text-amber-400">3.8 KB SRAM</strong></span>
            </div>
          </SpotlightCard>

          {/* Tier 2: Gateway BeevilFusionNetEdge */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="bg-[#0b0f19]/90 border-white/10 p-6 rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Tier 2: BeevilFusionNetEdge Gateway</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Antmicro CM4 6 TOPS
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#f8fafc]">Multi-Modal Sensor &amp; 2D STFT Fusion</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                INT8 TorchScript neural network (18.90 MB) executing on dedicated 6 TOPS edge NPU (Debian 64-bit / SQLite WAL). Processes 2D STFT acoustic spectrograms (257x256) combined with 16 physical sensor channels at <strong>8.2 ms inference</strong> and <strong>298 hives/sec throughput</strong> with <strong>96.84% accuracy</strong>.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-white/10 flex justify-between text-[11px] font-mono text-[#94a3b8]">
              <span>Inference: <strong className="text-[#f8fafc]">8.2 ms (INT8)</strong></span>
              <span>GroupKFold: <strong className="text-emerald-400">96.84% Acc</strong></span>
            </div>
          </SpotlightCard>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono text-[#94a3b8] mr-2 uppercase font-bold">Filter Diagnostics:</span>
          {(["ALL", "CRITICAL", "PREDICTIVE", "CONTINUOUS"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? "bg-[#f59e0b] text-[#070a12] shadow-sm font-black"
                  : "bg-[#0b0f19] text-[#94a3b8] hover:text-white hover:bg-[#0f172a] border border-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 8 Diagnostic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((diag) => (
            <SpotlightCard
              key={diag.id}
              spotlightColor="rgba(245, 158, 11, 0.1)"
              className="bg-[#0b0f19]/80 border-white/10 p-5 rounded-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    {diag.category}
                  </span>
                  <div className="p-1.5 bg-[#070a12] border border-white/10 rounded-lg">
                    {diag.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#f8fafc] leading-snug">
                    {diag.name}
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed font-normal">
                    {diag.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 space-y-2.5">
                {/* Metric Badge */}
                <div className="flex items-baseline justify-between bg-[#070a12] px-2.5 py-1 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-[#94a3b8]">
                    {diag.metricLabel}:
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {diag.metric}
                  </span>
                </div>

                {/* Sensor tags */}
                <div className="flex flex-wrap gap-1">
                  {diag.sensors.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono bg-[#070a12] text-slate-400 px-1.5 py-0.2 rounded border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
