"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Cpu, 
  ShieldCheck, 
  Sun, 
  Radio, 
  Activity, 
  Gauge, 
  Wind, 
  Thermometer, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  Network, 
  Lock, 
  Compass, 
  QrCode, 
  Zap, 
  Wrench, 
  Layers, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Sliders
} from "lucide-react";
import { 
  SpotlightCard, 
  DecryptedText, 
  CountUp, 
  ShinyText, 
  TiltedCard, 
  BlurText, 
  ClickSpark 
} from "@/components/reactbits";

export function SystemSection() {
  const [frequencyDial, setFrequencyDial] = useState(220);

  const getAcousticDiagnostic = (freq: number) => {
    if (freq < 210) {
      return { 
        label: "180 – 220 Hz: Nominal Colony Hum & Brood Homeostasis", 
        state: "Queenright Brood Nest Core Homeostasis", 
        badge: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
        desc: "Steady baseline acoustic energy concentrated in the brood nest core. Thermal stability is locked at 34.82°C ±0.05°C via TI TMP117 RTD."
      };
    }
    if (freq < 320) {
      return { 
        label: "250 Hz: Virgin Queen Piping & Oviposition Pulse", 
        state: "Queen Active / Mating & Emergence Pulse", 
        badge: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
        desc: "Characteristic high-energy G-clef pulses emitted by virgin queens. Captured by TDK INMP441 24-bit I2S microphone (128-pt CMSIS-DSP FFT)."
      };
    }
    if (freq < 550) {
      return { 
        label: "450 Hz: Pre-Swarm Harmonic Escalation (24h Alert)", 
        state: "Pre-Swarm Departure Harmonic Surge", 
        badge: "bg-rose-500/20 text-rose-400 border border-rose-500/40",
        desc: "Critical acoustic density shift preceding colony departure split. Triggers automated Semtech SX1262 LoRa mesh alert to Antmicro CM4 Gateway."
      };
    }
    return { 
      label: "800+ Hz: Robbing & Yellowjacket Defensive Agitation", 
      state: "Predator / Robber Bee Defense Turbulence", 
      badge: "bg-purple-500/20 text-purple-400 border border-purple-500/40",
      desc: "High-frequency turbulent flight agitation at hive entrance caused by robber bees or yellowjackets. Fused with STMicroelectronics LIS3DH shock alerts."
    };
  };

  const currentDiagnostic = getAcousticDiagnostic(frequencyDial);

  const SENSOR_GRID = [
    {
      name: "TI TMP117 Brood RTD",
      spec: "±0.05°C NIST Traceable",
      detail: "Medical-grade RTD core brood nest thermoregulation tracking at 34.8°C.",
      icon: <Thermometer className="w-4 h-4 text-amber-400" />,
    },
    {
      name: "Sensirion SCD41 CO2",
      spec: "400 – 5,000 ppm NDIR (±40ppm)",
      detail: "Photoacoustic cavity respiration tracking colony metabolic gas exchange.",
      icon: <Gauge className="w-4 h-4 text-sky-400" />,
    },
    {
      name: "Bosch BME688 8-Ch MOX",
      spec: "sub-PPM Gas Scanner",
      detail: "Isopentyl Acetate alarm pheromone & 4-Allylanisole foulbrood bio-markers.",
      icon: <Wind className="w-4 h-4 text-purple-400" />,
    },
    {
      name: "TDK INMP441 / ICS-43434",
      spec: "24-bit I2S (100Hz – 6kHz)",
      detail: "Hardware DMA audio capture with 128-pt CMSIS-DSP FFT on Cortex-M4F.",
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
    },
    {
      name: "Avia HX711 Differential ADC",
      spec: "200kg Load Cell (+1.84 kg/d)",
      detail: "24-bit precision nocturnal honey accumulation & nectar flow tracking.",
      icon: <Scale className="w-4 h-4 text-amber-400" />,
    },
    {
      name: "STMicroelectronics LIS3DH",
      spec: "3-Axis Ultra-Low-Power IMU",
      detail: "Micro-vibration grooming tremor & hive knock/tamper tilt detection.",
      icon: <Sun className="w-4 h-4 text-sky-400" />,
    },
  ];

  return (
    <section id="the_system" className="bg-[#070b14] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32">
        
        {/* 1. The Sensor System */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/40 text-[#ffc833] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <Cpu className="w-3.5 h-3.5" />
              <ShinyText text="Verified BOM Silicon Architecture" speed={3.5} className="font-bold text-[#ffc833]" />
            </div>
            <span className="text-xs font-mono text-slate-400">Robu.in &bull; Amazon &bull; PCBPower Verified</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
              <BlurText text="The Cyber-Physical Sensor System." delay={35} />
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Beevil Knievel combines <strong className="text-white">16 simultaneous physical and acoustic telemetry channels</strong> into an ultra-low-power edge monitoring node. Every environmental parameter affecting queen vitality, brood nest homeostasis, and honey flow is quantified with lab-grade precision.
            </p>
          </div>

          {/* 6-Sensor Specification Cards Grid with SpotlightCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {SENSOR_GRID.map((sensor, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(245, 158, 11, 0.18)"
                className="bg-slate-900/80 border-slate-800 hover:border-amber-500/40 p-5 shadow-lg flex flex-col justify-between transition-all hover:bg-slate-900 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">{sensor.name}</span>
                  <div className="p-2 bg-slate-950 rounded-lg group-hover:scale-110 transition-transform">{sensor.icon}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono font-extrabold text-[#ffc833]">
                    {sensor.spec}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {sensor.detail}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Hardware Enclosure Showcase: /images/node_enclosure.jpg with TiltedCard */}
          <div className="my-10 flex justify-center">
            <TiltedCard maxTilt={6} className="w-full max-w-4xl p-0 border-none bg-transparent shadow-none">
              <div className="relative w-full h-[360px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex items-center justify-center p-4 group">
                <Image
                  src="/images/node_enclosure.jpg"
                  alt="Beevil Knievel Field Sensor Node Enclosure with IP67 Weatherproof Solar Mast"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
                
                {/* Telemetry HUD Overlays */}
                <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-4 py-2.5 rounded-2xl text-left font-mono text-xs shadow-2xl hidden sm:block">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-amber-400" />
                    <span>Nordic nRF52840 &bull; FreeRTOS 2.0µA Sleep</span>
                  </div>
                  <div className="text-white font-bold text-sm mt-0.5">CNC Polycarbonate Enclosure</div>
                  <div className="text-[10px] text-slate-400">Tool-less Magnetic Quick-Dock &bull; 30s Mount</div>
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-4 py-2.5 rounded-2xl text-right font-mono text-xs shadow-2xl hidden sm:block">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>99.80% On-Node TinyML Triage</span>
                  </div>
                  <div className="text-[10px] text-slate-400">91.4% Radio TX Energy Suppressed &bull; 3.2+ Yr Battery</div>
                </div>
              </div>
            </TiltedCard>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>On-Device TinyML 1D-CNN Micro-Architecture</span>
              </h4>
              <p className="text-xs text-slate-400">
                Executes locally in 1.12 ms on the Nordic nRF52840 MCU (3.8 KB SRAM / 8.0 KB Flash). Conserves battery by suppressing 91.4% of redundant telemetry transmissions for 3.2+ years of autonomous field operation.
              </p>
            </div>
            <ClickSpark sparkColor="#f59e0b" sparkCount={6}>
              <Link
                href="#edge_ai"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#ffc833] text-slate-950 hover:bg-amber-300 transition-colors flex-shrink-0"
              >
                <span>Inspect TinyML Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ClickSpark>
          </div>
        </div>

        {/* 2. The Gateway Deployment: /images/gateway_apiary.jpg with TiltedCard */}
        <div id="the_design" className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-emerald-500/40 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <ShinyText text="Antmicro CM4 Enterprise 6 TOPS Gateway Station" speed={4} className="font-bold text-emerald-400" />
            </div>
            <span className="text-xs font-mono text-slate-400">Debian 64-bit &bull; OverlayFS &bull; SQLite WAL</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
              <BlurText text="Active Apiary Field Gateway." delay={35} />
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Engineered for extreme commercial apiary conditions, <strong className="text-white">Beevil Knievel installs in under 30 seconds</strong> on any standard Langstroth, Warre, or Top-Bar hive. The central Antmicro Raspberry Pi CM4 base station powers 6 TOPS neural inference and aggregates up to 100 field hives across 15 km LoRaWAN IN865 multi-hop mesh.
            </p>
          </div>

          {/* Operational Apiary Gateway Installation Photo with TiltedCard */}
          <div className="my-10 flex justify-center">
            <TiltedCard maxTilt={6} className="w-full max-w-4xl p-0 border-none bg-transparent shadow-none">
              <div className="relative w-full h-[360px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex items-center justify-center group">
                <Image
                  src="/images/gateway_apiary.jpg"
                  alt="Beevil Knievel Antmicro CM4 Gateway deployed in active commercial apiary"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
                
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-bold">Commercial Apiary Test Station #01 &bull; Antmicro CM4 Hub</span>
                  </div>
                  <div className="text-slate-400">
                    Semtech SX1262 (+22 dBm) &bull; 6 TOPS NPU &bull; 8.2ms INT8 TorchScript &bull; 14-Day Sunless Reserve
                  </div>
                </div>
              </div>
            </TiltedCard>
          </div>
        </div>

        {/* 3. 100-Hive LoRaWAN IN865 Multi-Hop Topology */}
        <div id="mesh" className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-sky-500/40 text-sky-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <Network className="w-3.5 h-3.5" />
              <ShinyText text="Semtech SX1262 LoRaWAN IN865 Architecture" speed={4} className="font-bold text-sky-400" />
            </div>
            <span className="text-xs font-mono text-slate-400">100-Hive LoRaWAN IN865 Dynamic Mesh</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
              <BlurText text="100-Hive LoRaWAN IN865 Mesh Network." delay={35} />
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Zero single points of failure. The fleet auto-forms an adaptive, self-healing tree mesh over <strong className="text-white">LoRaWAN IN865 (865–867 MHz, +22 dBm Tx)</strong>. Even nodes obstructed by dense foliage or topography relay telemetry through nearest neighbor hives to reach the central Antmicro CM4 Gateway.
            </p>
          </div>

          {/* Mesh Architecture Showcase Card with SpotlightCard */}
          <div className="bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.25)" className="bg-slate-900/80 border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Packet Delivery Rate (PDR)</span>
                  <Radio className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-mono font-black text-emerald-400">
                  <CountUp to={99.8} decimals={1} suffix="%" duration={1.2} />
                </div>
                <div className="text-[11px] font-mono text-slate-400">Dynamic Adaptive Data Rate (ADR SF7–SF12)</div>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.25)" className="bg-slate-900/80 border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Coverage Line-of-Sight</span>
                  <Compass className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-3xl font-mono font-black text-sky-400">
                  <CountUp to={15.0} decimals={1} suffix=" km" duration={1.2} />
                </div>
                <div className="text-[11px] font-mono text-slate-400">3-Hop Tree Mesh with Auto-Healing Reroute</div>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.25)" className="bg-slate-900/80 border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Payload Cryptography</span>
                  <Lock className="w-4 h-4 text-[#ffc833]" />
                </div>
                <div className="text-3xl font-mono font-black text-[#ffc833]">
                  <DecryptedText text="AES-256" speed={30} className="text-[#ffc833]" />
                </div>
                <div className="text-[11px] font-mono text-slate-400">Dual-Layer Network &amp; Application Key Vault</div>
              </SpotlightCard>
            </div>

            {/* Interactive Hop Visualization */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-bold">100/100 Nodes Active</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">Duty Cycle &lt; 0.1% Airtime</span>
              </div>
              <ClickSpark sparkColor="#38bdf8" sparkCount={6}>
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold hover:bg-sky-500/30 transition-all"
                >
                  <span>Inspect 100-Hive Matrix in Field App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </ClickSpark>
            </div>
          </div>
        </div>

        {/* 4. The Acoustic Ear */}
        <div id="the_crank" className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-sky-500/30 text-sky-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>TDK INMP441 / ICS-43434 24-bit MEMS</span>
            </div>
            <span className="text-xs font-mono text-slate-500">100 Hz to 6,000 Hz Sampling (CMSIS-DSP FFT)</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
              <BlurText text="The Acoustic Frequency Analyzer." delay={35} />
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Acoustic frequency shifts precede visual physical symptoms by up to 24 hours. Our <strong className="text-white">TDK INMP441 24-bit I2S microphone</strong> performs 128-point CMSIS-DSP FFT on the ARM Cortex-M4F MCU to detect queen emergence piping, Varroa grooming buzzes, and pre-swarm harmonic surges.
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

              <div className="relative w-32 h-32 bg-slate-950 rounded-full border-4 border-amber-400 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.25)] select-none cursor-pointer group">
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

        {/* 5. Honey Chain Cryptographic Provenance: /images/honey_chain_jar.jpg with TiltedCard */}
        <div id="honey_chain" className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <ShinyText text="Honey Chain SHA-256 Merkle Provenance" speed={3.5} className="font-bold text-amber-300" />
            </div>
            <span className="text-xs font-mono text-slate-400">Verifiable Honey Chain Batch Pass</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
              <BlurText text="Honey Chain Cryptographic Provenance." delay={35} />
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Every jar of honey harvested from Beevil Knievel apiaries is backed by an immutable <strong className="text-white">SHA-256 cryptographic telemetry ledger</strong>. Over 1,050,000 multi-sensor readings verify 45 days of unadulterated queenright brood nest homeostasis, zero chemical contamination, and 100% authentic organic harvest.
            </p>
          </div>

          {/* Honey Chain Showcase Card with /images/honey_chain_jar.jpg and TiltedCard */}
          <div className="my-10 flex justify-center">
            <TiltedCard maxTilt={6} className="w-full max-w-4xl p-0 border-none bg-transparent shadow-none">
              <div className="relative w-full h-[380px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex items-center justify-center group">
                <Image
                  src="/images/honey_chain_jar.jpg"
                  alt="Honey Chain Verifiable Organic Honey Jar with Cryptographic SHA-256 QR Seal"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
                
                <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md border border-amber-500/40 p-4 rounded-2xl flex flex-col gap-1 text-left font-mono text-xs shadow-2xl hidden sm:block">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>SEALED BLOCK #842988</span>
                  </div>
                  <div className="text-white font-bold text-sm">USDA Organic Raw Wildflower</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span>Merkle Root:</span>
                    <DecryptedText text="0x77c29a8f44d180b0740ea09c31fa8820c78" speed={25} className="text-amber-300 font-bold" />
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-1">Purity: 99.4% &bull; Moisture: 16.8%</div>
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl flex items-center gap-3 text-xs font-mono shadow-2xl">
                  <QrCode className="w-8 h-8 text-amber-400" />
                  <div className="text-left">
                    <div className="text-white font-bold">Consumer QR Pass</div>
                    <div className="text-[10px] text-slate-400">Scan jar for 45-day sensor proof</div>
                  </div>
                </div>
              </div>
            </TiltedCard>
          </div>
        </div>

      </div>
    </section>
  );
}


