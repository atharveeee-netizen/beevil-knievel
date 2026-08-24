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
    description: "Detects queen loss, supersedure, or drone-laying emergencies within 2 hours by fusing brood thermal stability and queen piping harmonics.",
    sensors: ["TI TMP117 (±0.08°C)", "TDK MEMS Mic (250Hz)"],
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    status: "CRITICAL",
  },
  {
    id: 2,
    name: "Varroa Destructor Infestation",
    category: "Parasitic Pathology",
    metric: "96.84%",
    metricLabel: "Out-of-Sample Acc",
    description: "Analyzes micro-vibrational agitation and grooming wing-buzz perturbations to calculate colony mite load before economic injury thresholds.",
    sensors: ["3-Axis Vibration", "I2S Acoustic STFT"],
    icon: <Bug className="w-5 h-5 text-rose-400" />,
    status: "CRITICAL",
  },
  {
    id: 3,
    name: "Swarm Departure Forecast",
    category: "Behavioral Prediction",
    metric: "24 Hours",
    metricLabel: "Early Warning",
    description: "Identifies the classic 450 Hz harmonic escalation and pre-swarm brood temperature ramp, giving beekeepers time to split colonies.",
    sensors: ["Acoustic FFT (450Hz)", "Sensirion SHT45"],
    icon: <Zap className="w-5 h-5 text-[#ffc833]" />,
    status: "PREDICTIVE",
  },
  {
    id: 4,
    name: "Foulbrood (AFB / EFB) Odor",
    category: "Pathogen Biosecurity",
    metric: "sub-PPM",
    metricLabel: "VOC Sensitivity",
    description: "Bosch BME688 AI gas scanner detects Paenibacillus larvae volatile organic decomposition profiles weeks before visual frame rot.",
    sensors: ["Bosch BME688 VOC", "Internal Humidity"],
    icon: <Skull className="w-5 h-5 text-purple-400" />,
    status: "CRITICAL",
  },
  {
    id: 5,
    name: "Winter Cluster Thermal Stability",
    category: "Overwintering",
    metric: "±0.08°C",
    metricLabel: "Sensor Precision",
    description: "Monitors core cluster temperature and honey mantle thermal boundary during sub-zero ambient freezes to prevent colony freeze-out.",
    sensors: ["TMP117 Brood Temp", "Ambient Delta-T"],
    icon: <ThermometerSnowflake className="w-5 h-5 text-sky-400" />,
    status: "CONTINUOUS",
  },
  {
    id: 6,
    name: "Robbing & Wasp Invasion",
    category: "Colony Defense",
    metric: "< 5 ms",
    metricLabel: "Edge Latency",
    description: "Detects high-energy acoustic turbulence and entrance fight frequencies during yellowjacket and robber bee attacks for instant push alerts.",
    sensors: ["High-Frequency Audio (800Hz+)", "IMU Shock"],
    icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
    status: "CRITICAL",
  },
  {
    id: 7,
    name: "Starvation & Honey Depletion",
    category: "Resource Tracking",
    metric: "Daily",
    metricLabel: "Depletion Trend",
    description: "Tracks thermal heat capacity dissipation and nocturnal foraging silence to alert apiary managers before emergency sugar feeding is required.",
    sensors: ["Brood Thermal Gradient", "Nocturnal Hum"],
    icon: <TrendingDown className="w-5 h-5 text-amber-500" />,
    status: "PREDICTIVE",
  },
  {
    id: 8,
    name: "Pesticide Exposure Spikes",
    category: "Environmental Toxins",
    metric: "Real-Time",
    metricLabel: "Anomaly Filter",
    description: "Identifies acute neurotoxin exposure via sudden worker tremor spikes, erratic wing frequencies, and abnormal flight cessation.",
    sensors: ["3-Axis Micro-Jitter", "Acoustic Spectrum"],
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
      className="bg-[#1d1c18] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-white/10"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#ffc833] text-[#312f28] px-3.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Primary Production Model: BeevilFusionNetEdge</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Edge AI Intelligence.
          </h2>

          <p className="text-lg sm:text-xl text-white/80 font-medium leading-relaxed">
            Trained on <strong>over 1,050,000 multi-sensor field records</strong> with zero synthetic data. Evaluated via rigorous out-of-sample GroupKFold cross-validation to guarantee field reliability across unseen apiaries.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {["ALL", "CRITICAL", "PREDICTIVE", "CONTINUOUS"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                selectedFilter === filter
                  ? "bg-[#ffc833] text-[#312f28] shadow-md"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 8 Clean Diagnostic Cards Grid (Zero Game Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((diag) => (
            <div
              key={diag.id}
              className="bg-[#27272a] border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-[#ffc833]/60 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffc833]">
                    {diag.category}
                  </span>
                  <div className="p-2 bg-black/40 rounded-lg group-hover:scale-110 transition-transform">
                    {diag.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#ffc833] transition-colors">
                    {diag.name}
                  </h3>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed font-normal">
                    {diag.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                {/* Metric Badge */}
                <div className="flex items-baseline justify-between bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
                  <span className="text-[11px] font-mono text-white/60">
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
                      className="text-[9px] font-mono bg-white/5 text-white/60 px-2 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accuracy Provenance Callout */}
        <div className="bg-[#212223] border border-white/15 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Out-of-Sample Validated on Real Beehive Audio &amp; Telemetry</span>
            </h4>
            <p className="text-xs text-white/70">
              Zero leakage guaranteed: hives in the test set were never seen during model training. Full TorchScript binary (18.90 MB) deployed on Antmicro CM4 Gateway.
            </p>
          </div>
          <Link
            href="#the_specs"
            className="btn-pill-yellow text-xs font-bold py-2.5 px-5 flex-shrink-0"
          >
            Inspect Model Specs →
          </Link>
        </div>
      </div>
    </section>
  );
}
