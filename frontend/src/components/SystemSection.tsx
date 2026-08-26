"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cpu, ShieldCheck, Sun, Radio, Activity, Gauge, Wind, Thermometer, Scale, ArrowRight, CheckCircle2 } from "lucide-react";

export function SystemSection() {
  const [frequencyDial, setFrequencyDial] = useState(220);

  const getAcousticDiagnostic = (freq: number) => {
    if (freq < 210) {
      return { 
        label: "180 – 220 Hz: Nominal Foraging & Brood Care", 
        state: "Optimal Queenright Colony Hum", 
        badge: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
        desc: "Steady baseline acoustic energy concentrated in the brood nest core. Thermal stability is locked at 34.8°C."
      };
    }
    if (freq < 320) {
      return { 
        label: "250 Hz: Virgin Queen Piping & Emergence", 
        state: "Queen Active / Oviposition Pulse", 
        badge: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
        desc: "Characteristic high-energy G-clef pulses emitted by newly emerged virgin queens prior to mating flight or duel."
      };
    }
    if (freq < 550) {
      return { 
        label: "450 Hz: Swarm Departure Escalation (24h Alert)", 
        state: "Pre-Swarm Harmonic Escalation", 
        badge: "bg-rose-500/20 text-rose-400 border border-rose-500/40",
        desc: "Critical acoustic density shift 24 hours prior to colony departure. Automated alert dispatched via LoRa mesh."
      };
    }
    return { 
      label: "800+ Hz: Robbing & Yellowjacket Attack", 
      state: "Predator / Wasp Defense Mode", 
      badge: "bg-purple-500/20 text-purple-400 border border-purple-500/40",
      desc: "High-frequency turbulent flight agitation at hive entrance caused by robber bees or yellowjacket incursions."
    };
  };

  const currentDiagnostic = getAcousticDiagnostic(frequencyDial);

  const SENSOR_GRID = [
    {
      name: "TI TMP117 Brood Temp",
      spec: "±0.05°C NIST Traceable",
      detail: "Ultra-precision core cluster temperature monitoring",
      icon: <Thermometer className="w-4 h-4 text-amber-400" />,
    },
    {
      name: "Sensirion SCD41 CO2",
      spec: "400 – 5,000 ppm NDIR",
      detail: "Photoacoustic cavity respiration & ventilation",
      icon: <Gauge className="w-4 h-4 text-sky-400" />,
    },
    {
      name: "Bosch BME688 AI VOC",
      spec: "sub-PPM Gas Scanner",
      detail: "Foulbrood (AFB/EFB) volatile organic biomarker index",
      icon: <Wind className="w-4 h-4 text-purple-400" />,
    },
    {
      name: "TDK MEMS Acoustic Ear",
      spec: "24-bit I2S (100Hz – 6kHz)",
      detail: "Hardware DMA sampling with zero CPU jitter",
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
    },
    {
      name: "HX711 24-bit Scale",
      spec: "±10g Daily Flow Delta",
      detail: "Precision nocturnal honey accumulation tracking",
      icon: <Scale className="w-4 h-4 text-amber-400" />,
    },
    {
      name: "Sensirion SHT45 RH",
      spec: "±1.0% Relative Humidity",
      detail: "Internal cavity moisture and condensation balance",
      icon: <Sun className="w-4 h-4 text-sky-400" />,
    },
  ];

  return (
    <section id="the_system" className="bg-[#0b101b] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32">
        
        {/* 1. The Sensor System */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 text-[#ffc833] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>16-Parameter Sensor Fusion Array</span>
            </div>
            <span className="text-xs font-mono text-slate-500">Autonomous Edge Silicon</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
              The Cyber-Physical Sensor System.
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Beevil Knievel combines <strong className="text-white">16 simultaneous physical and acoustic sensor channels</strong> into an ultra-low-power edge monitoring node. Every environmental parameter affecting queen vitality, brood nest homeostasis, and honey flow is quantified in real time.
            </p>
          </div>

          {/* 6-Sensor Specification Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {SENSOR_GRID.map((sensor, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all hover:bg-slate-900"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white text-base">{sensor.name}</span>
                  <div className="p-2 bg-slate-950 rounded-lg">{sensor.icon}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono font-extrabold text-[#ffc833]">
                    {sensor.spec}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {sensor.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hardware Enclosure Showcase with HUD Frame */}
          <div className="my-10 flex justify-center">
            <div className="relative w-full max-w-4xl h-[340px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex items-center justify-center p-4 group">
              <Image
                src="/images/hardware/beevil_hardware_node.jpg"
                alt="Beevil Knievel Solar Sensor Node Hardware"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                sizes="(max-width: 768px) 100vw, 1000px"
              />
              
              {/* Telemetry HUD Overlays */}
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl text-left font-mono text-xs shadow-xl hidden sm:block">
                <div className="text-[10px] text-amber-400 font-bold uppercase">Field Node Rev 1.0.5</div>
                <div className="text-white font-bold">COTS Solar Integrated Frame</div>
                <div className="text-[10px] text-slate-400">ARM Cortex-M4F &bull; 3.8 KB SRAM</div>
              </div>

              <div className="absolute bottom-4 right-4 bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-xl text-right font-mono text-xs shadow-xl hidden sm:block">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>99.80% On-Node Triage Recall</span>
                </div>
                <div className="text-[10px] text-slate-400">91.4% Radio TX Energy Suppressed</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>On-Device TinyML 1D-CNN Micro-Architecture</span>
              </h4>
              <p className="text-xs text-slate-400">
                Executes locally in 1.12 ms on the nRF52840 MCU (3.8 KB SRAM / 8.0 KB Flash). Conserves battery by suppressing 91.4% of redundant telemetry transmissions for 3.2+ years of autonomous operation.
              </p>
            </div>
            <Link
              href="#edge_ai"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#ffc833] text-slate-950 hover:bg-amber-300 transition-colors flex-shrink-0"
            >
              <span>Inspect TinyML Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2. The Design */}
        <div id="the_design" className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-emerald-500/30 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Disturbance Non-Invasive Enclosure</span>
            </div>
            <span className="text-xs font-mono text-slate-500">IP67 Weatherproof &bull; UV Stabilized</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
              The Industrial Enclosure.
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Engineered for extreme apiary field conditions, <strong className="text-white">Beevil Knievel installs in under 30 seconds</strong> on any standard Langstroth, Warre, or Top-Bar hive. Its patented magnetic quick-dock clamp mounts without opening the hive, disturbing the queen, or breaking vital propolis weather seals.
            </p>
          </div>

          {/* Operational Apiary Field Installation Photo */}
          <div className="my-10 flex justify-center">
            <div className="relative w-full max-w-4xl h-[360px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex items-center justify-center group">
              <Image
                src="/images/hardware/beevil_hero_apiary.jpg"
                alt="Beevil Knievel active apiary field deployment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                sizes="(max-width: 768px) 100vw, 1000px"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-bold">Active Apiary Field Test Station #01</span>
                </div>
                <div className="text-slate-400">
                  Operating Range: -20°C to +65°C &bull; 14-Day Sunless Reserve &bull; IP67 Sealed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. The Acoustic Ear */}
        <div id="the_crank" className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-sky-500/30 text-sky-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>Digital MEMS Acoustic Ear</span>
            </div>
            <span className="text-xs font-mono text-slate-500">100 Hz to 6,000 Hz Sampling</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
              The Acoustic Frequency Analyzer.
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Why monitor hive acoustics? Because acoustic frequency shifts precede visual physical symptoms by up to 24 hours. Our <strong className="text-white">24-bit digital acoustic ear</strong> detects queen emergence piping, Varroa stress buzzing, and pre-swarm harmonic surges long before swarms leave the apiary.
            </p>
          </div>

          {/* Interactive Acoustic Frequency Tuner & Dial */}
          <div className="bg-slate-950 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="text-xs font-mono uppercase tracking-widest text-[#ffc833] font-bold flex items-center justify-center lg:justify-start gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Live Hive Audio Spectrogram Simulator</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentDiagnostic.label}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {currentDiagnostic.desc}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${currentDiagnostic.badge}`}>
                  State: {currentDiagnostic.state}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Bandwidth: 100 Hz – 6.0 kHz
                </span>
              </div>
            </div>

            {/* Interactive Rotary Frequency Dial */}
            <div className="flex flex-col items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex-shrink-0">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                Rotate / Scrub Frequency Dial
              </div>

              <div className="relative w-32 h-32 bg-slate-950 rounded-full border-4 border-amber-400 flex items-center justify-center shadow-[0_0_25px_rgba(255,200,51,0.2)] select-none cursor-pointer group">
                <input
                  type="range"
                  min="150"
                  max="900"
                  step="5"
                  value={frequencyDial}
                  onChange={(e) => setFrequencyDial(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize z-20"
                  aria-label="Acoustic Frequency Dial"
                />
                <div
                  className="w-full h-full rounded-full flex items-center justify-center transition-transform duration-75"
                  style={{ transform: `rotate(${(frequencyDial - 150) * 0.48}deg)` }}
                >
                  <div className="absolute top-2.5 w-4 h-4 rounded-full bg-[#ffc833] border-2 border-slate-950 shadow-md group-hover:scale-125 transition-transform" />
                  <div className="w-1.5 h-14 bg-slate-700 rounded-full" />
                </div>
              </div>

              <div className="text-center font-mono">
                <div className="text-xl font-extrabold text-white">
                  {frequencyDial} <span className="text-amber-400 text-sm">Hz</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Drag knob to scrub spectrum
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

