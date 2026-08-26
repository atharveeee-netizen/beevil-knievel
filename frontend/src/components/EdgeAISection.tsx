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
  Terminal,
  ShieldCheck
} from "lucide-react";

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
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
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
    icon: <Bug className="w-5 h-5 text-rose-400" />,
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
    icon: <Zap className="w-5 h-5 text-amber-400" />,
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
    icon: <Skull className="w-5 h-5 text-purple-400" />,
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
    icon: <ThermometerSnowflake className="w-5 h-5 text-sky-400" />,
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
    icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
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
    icon: <TrendingDown className="w-5 h-5 text-amber-500" />,
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
    icon: <Flame className="w-5 h-5 text-rose-500" />,
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
      className="bg-[#090d16] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 text-[#ffc833] px-3.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Primary Production Model: BeevilFusionNetEdge</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Real-World Provenance &bull; Zero Synthetic Data</span>
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
            Edge AI Intelligence.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Trained and rigorously evaluated on <strong className="text-white">over 1,050,000 multi-sensor field records</strong> across European and North American apiaries. Verified using strict out-of-sample <strong className="text-white">GroupKFold cross-validation</strong> to guarantee zero test leakage on unseen hives.
          </p>
        </div>

        {/* Dual-Tier Edge AI Architecture Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Tier 1: Field Node TinyML */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Tier 1: On-Node TinyML 1D-CNN</span>
                </span>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                  Nordic nRF52840
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">Ultra-Low-Power Edge Triage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Micro 1D-CNN model (3,955 INT8 parameters) fitting in <strong>3.8 KB SRAM / 8.0 KB Flash</strong>. Runs in 1.12 ms with <strong>99.80% triage recall</strong> on ARM Cortex-M4F, suppressing 91.4% of redundant radio transmissions for 3.2+ years of battery autonomy.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex justify-between text-[11px] font-mono text-slate-400">
              <span>Latency: <strong className="text-white">1.12 ms</strong></span>
              <span>Footprint: <strong className="text-amber-400">3.8 KB SRAM</strong></span>
            </div>
          </div>

          {/* Tier 2: Gateway BeevilFusionNetEdge */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Tier 2: BeevilFusionNetEdge Gateway</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Antmicro CM4 6 TOPS
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Modal Sensor &amp; 2D STFT Fusion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                INT8 TorchScript neural network (18.90 MB) executing on the dedicated 6 TOPS edge NPU (Debian 64-bit / SQLite WAL). Processes 2D STFT acoustic spectrograms (257x256) combined with 16 physical sensor channels at <strong>8.2 ms inference</strong> and <strong>298 hives/sec throughput</strong> with <strong>96.84% accuracy</strong>.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex justify-between text-[11px] font-mono text-slate-400">
              <span>Inference: <strong className="text-white">8.2 ms (INT8)</strong></span>
              <span>GroupKFold: <strong className="text-emerald-400">96.84% Acc</strong></span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <span className="text-xs font-mono text-slate-400 mr-2 uppercase font-bold">Filter Diagnostics:</span>
          {["ALL", "CRITICAL", "PREDICTIVE", "CONTINUOUS"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? "bg-[#ffc833] text-slate-950 shadow-[0_0_15px_rgba(255,200,51,0.3)] scale-105"
                  : "bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 8 Diagnostic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((diag) => (
            <div
              key={diag.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all group hover:bg-slate-900/80"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffc833]">
                    {diag.category}
                  </span>
                  <div className="p-2 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                    {diag.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#ffc833] transition-colors">
                    {diag.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">
                    {diag.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800/80 space-y-3">
                {/* Metric Badge */}
                <div className="flex items-baseline justify-between bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400">
                    {diag.metricLabel}:
                  </span>
                  <span className="text-sm font-mono font-extrabold text-[#ffc833]">
                    {diag.metric}
                  </span>
                </div>

                {/* Sensor tags */}
                <div className="flex flex-wrap gap-1">
                  {diag.sensors.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded-md border border-slate-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accuracy Provenance Callout Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Out-of-Sample Validated on 1,050,000 Real Telemetry Records</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Zero leakage guaranteed: hives in the test set were never seen during model training. Full TorchScript binary (18.90 MB, 8.2ms latency) deployed on the Antmicro CM4 Gateway Hub.
            </p>
          </div>
          <Link
            href="#the_specs"
            className="inline-flex items-center gap-2 bg-[#ffc833] hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all flex-shrink-0"
          >
            <span>Inspect Model Specs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

