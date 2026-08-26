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
  Wrench, 
  Layers
} from "lucide-react";
import { 
  SpotlightCard, 
  DecryptedText, 
  CountUp, 
  ShinyText, 
  TiltedCard, 
  ClickSpark 
} from "@/components/reactbits";

export function SystemSection() {
  const [frequencyDial, setFrequencyDial] = useState(220);

  const getAcousticDiagnostic = (freq: number) => {
    if (freq < 235) {
      return { 
        label: "180 - 220 Hz: Nominal Colony Hum & Brood Homeostasis", 
        state: "Queenright Brood Nest Core Homeostasis", 
        badge: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
        desc: "Steady baseline acoustic energy concentrated in the brood nest core. Thermal stability is locked at 34.82°C ±0.05°C via TI TMP117 RTD. Eliminates intrusive 40kg brood box lifting in 38°C summer heat."
      };
    }
    if (freq < 270) {
      return { 
        label: "250 Hz: Virgin Queen Piping & Oviposition Pulse", 
        state: "Queen Active / Mating & Emergence Pulse", 
        badge: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
        desc: "Characteristic high-energy G-clef pulses emitted by virgin queens. Detect supersedure weeks before colony dwindles, captured by TDK INMP441 24-bit I2S microphone (128-pt CMSIS-DSP FFT)."
      };
    }
    if (freq < 360) {
      return { 
        label: "285 Hz: Queenless Roar & Brood Nest Agitation", 
        state: "Queenless Colony Roar (Emergency State)", 
        badge: "bg-rose-500/20 text-rose-400 border border-rose-500/40",
        desc: "Distinct 285 Hz warble signaling sudden absence of 9-ODA queen pheromone. Fused with TI TMP117 brood nest chill detection (<33.5°C) to direct immediate mated queen introduction."
      };
    }
    if (freq < 580) {
      return { 
        label: "450 - 485 Hz: Pre-Swarm Harmonic Escalation (72h Alert)", 
        state: "Pre-Swarm Departure Harmonic Surge", 
        badge: "bg-orange-500/20 text-orange-400 border border-orange-500/40",
        desc: "Critical acoustic density shift preceding colony departure. Catches swarms 72 hours before 20,000 bees flee for the tree canopy, enabling timely Demaree vertical splits."
      };
    }
    return { 
      label: "800+ Hz: Robbing & Yellowjacket Defensive Agitation", 
      state: "Predator / Robber Bee Defense Turbulence", 
      badge: "bg-purple-500/20 text-purple-400 border border-purple-500/40",
      desc: "High-frequency turbulent flight agitation at hive entrance caused by robber bees, wasps, or yellowjackets. Fused with STMicroelectronics LIS3DH shock alerts to prevent apiary collapse."
    };
  };

  const currentDiagnostic = getAcousticDiagnostic(frequencyDial);

  const SENSOR_GRID = [
    {
      name: "TI TMP117 Brood RTD",
      spec: "±0.05°C NIST Traceable",
      detail: "Medical-grade RTD core brood nest thermoregulation tracking at 34.8°C. Detects queenless cooling drop weeks before colony dwindles.",
      icon: <Thermometer className="w-4 h-4 text-amber-400" />,
    },
    {
      name: "Sensirion SCD41 CO2",
      spec: "400 - 5,000 ppm NDIR (±40ppm)",
      detail: "Photoacoustic cavity respiration tracking colony metabolic gas exchange and cluster tightness during winter and heat waves.",
      icon: <Gauge className="w-4 h-4 text-sky-400" />,
    },
    {
      name: "Bosch BME688 8-Ch MOX",
      spec: "sub-PPM Gas Scanner",
      detail: "Isopentyl Acetate alarm pheromone & 4-Allylanisole foulbrood bio-markers. Bench-calibrated against synthetic apiary standards.",
      icon: <Wind className="w-4 h-4 text-purple-400" />,
    },
    {
      name: "TDK INMP441 / ICS-43434",
      spec: "24-bit I2S (100Hz - 6kHz)",
      detail: "Hardware DMA audio capture with 128-pt CMSIS-DSP FFT on Cortex-M4F. Isolates queen piping and pre-swarm harmonics in noisy apiaries.",
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
    },
    {
      name: "Avia HX711 Differential ADC",
      spec: "200kg Load Cell (+1.84 kg/d)",
      detail: "24-bit precision nocturnal honey accumulation & nectar flow tracking. Measures exact supers surplus without back-breaking hive lifts.",
      icon: <Scale className="w-4 h-4 text-amber-400" />,
    },
    {
      name: "STMicroelectronics LIS3DH",
      spec: "3-Axis Ultra-Low-Power IMU",
      detail: "Micro-vibration grooming tremor & hive knock/tamper tilt detection. Alerts beekeepers instantly to bear strikes or wind blowovers.",
      icon: <Sun className="w-4 h-4 text-sky-400" />,
    },
  ];

  return (
    <section id="the_system" className="bg-[#070a12] text-[#f8fafc] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto space-y-24">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b0f19] border border-white/10 text-xs font-mono tracking-wider text-[#94a3b8]">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[#f8fafc] font-semibold">HARDWARE ARCHITECTURE</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-bold">NIST-TRACEABLE BENCH CALIBRATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f8fafc] font-sans">
            Hardware architecture engineered for empirical apiary realities.
          </h2>

          <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed font-normal">
            Three interconnected cyber-physical hardware tiers engineered to operate autonomously across 100 Langstroth hives in 42°C summer heat, high-humidity monsoon seasons, and remote out-yards.
          </p>
        </div>

        {/* Minimalist 3-Card Hardware Architecture (Framework / DJI Enterprise Standard) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Hardware Card 1: Edge Sensor Node Enclosure */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.12)"
            className="bg-[#0b0f19]/90 border-white/10 p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <TiltedCard maxTilt={5} className="w-full p-0 border-none bg-transparent shadow-none">
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#070a12] border border-white/10 group">
                  <Image
                    src="/images/node_enclosure.jpg"
                    alt="Beevil Knievel Field Sensor Node Enclosure"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#070a12]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-amber-400 border border-white/10">
                    TIER 1 • FIELD NODE
                  </div>
                </div>
              </TiltedCard>

              <div>
                <h3 className="text-lg font-bold text-[#f8fafc]">Edge Sensor Node Enclosure</h3>
                <p className="text-xs font-mono text-[#94a3b8] mt-1">Nordic nRF52840 • FreeRTOS 2.0µA Sleep • Field Tested on 100 Langstroth Hives</p>
                <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                  IP67 CNC polycarbonate enclosure with tool-less magnetic quick-dock mounting (30s deploy between hive frames without upsetting bees). Eliminates back-breaking 40kg brood box lifting in 38°C heat. Runs on-node TinyML 1D-CNN triage in 1.12 ms with 99.80% recall, suppressing 91.4% redundant radio transmissions.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-semibold">14-Day Sunless Reserve</span>
              <span className="text-slate-400">3.2+ Yr Battery Life</span>
            </div>
          </SpotlightCard>

          {/* Hardware Card 2: Central Gateway Station */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="bg-[#0b0f19]/90 border-white/10 p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <TiltedCard maxTilt={5} className="w-full p-0 border-none bg-transparent shadow-none">
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#070a12] border border-white/10 group">
                  <Image
                    src="/images/gateway_apiary.jpg"
                    alt="Antmicro CM4 Central Gateway Station"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#070a12]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-400 border border-white/10">
                    TIER 2 • GATEWAY HUB
                  </div>
                </div>
              </TiltedCard>

              <div>
                <h3 className="text-lg font-bold text-[#f8fafc]">Antmicro CM4 Gateway Station</h3>
                <p className="text-xs font-mono text-[#94a3b8] mt-1">6 TOPS NPU • Debian 64-bit • SQLite WAL • Field Tested in 42°C Heat</p>
                <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                  Open-source Antmicro baseboard hosting Raspberry Pi Compute Module 4 with dedicated 6 TOPS edge NPU. Aggregates up to 100 field hives across a 15 km LoRaWAN IN865 mesh with 8.2ms INT8 neural inference, providing instant alerts in remote out-yards with zero cellular coverage.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-semibold">298 Hives/Sec Throughput</span>
              <span className="text-slate-400">96.84% Field Accuracy</span>
            </div>
          </SpotlightCard>

          {/* Hardware Card 3: Honey Chain Cryptographic Provenance */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.12)"
            className="bg-[#0b0f19]/90 border-white/10 p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <TiltedCard maxTilt={5} className="w-full p-0 border-none bg-transparent shadow-none">
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#070a12] border border-white/10 group">
                  <Image
                    src="/images/honey_chain_jar.jpg"
                    alt="Honey Chain SHA-256 Merkle Provenance"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#070a12]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-amber-300 border border-white/10">
                    TIER 3 • LEDGER VAULT
                  </div>
                </div>
              </TiltedCard>

              <div>
                <h3 className="text-lg font-bold text-[#f8fafc]">Honey Chain SHA-256 Ledger</h3>
                <p className="text-xs font-mono text-[#94a3b8] mt-1">Immutable Merkle Batch Pass • QR Seal • NIST-Calibrated Sensor History</p>
                <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                  Every harvested honey batch is sealed with an immutable SHA-256 Merkle root. Over 1,050,000 continuous multi-sensor readings verify 45 days of uninterrupted queenright brood homeostasis, zero synthetic chemical treatments, and authentic single-origin floral nectar flow.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-amber-400 font-semibold">1,050,000 Records Sealed</span>
              <span className="text-emerald-400 font-semibold">0.00% Chemicals</span>
            </div>
          </SpotlightCard>

        </div>

        {/* 6-Sensor Specification Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#f8fafc]">16-Channel Telemetry Sensor Suite</h3>
              <p className="text-xs font-mono text-[#94a3b8] mt-0.5">NIST-traceable silicon precision bench-tested across 100 Langstroth hives in 42°C summer heat</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SENSOR_GRID.map((sensor, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(245, 158, 11, 0.1)"
                className="bg-[#0b0f19]/80 border-white/10 p-5 rounded-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-[#f8fafc] text-sm">{sensor.name}</span>
                  <div className="p-1.5 bg-[#070a12] border border-white/10 rounded-lg">{sensor.icon}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-400">
                    {sensor.spec}
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {sensor.detail}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* 100-Hive LoRaWAN IN865 Sub-GHz Mesh Architecture Banner */}
        <div id="mesh" className="bg-[#0b0f19]/90 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                <Network className="w-4 h-4" />
                <span>100-HIVE LORAWAN IN865 MESH TOPOLOGY</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc]">
                Self-healing dynamic tree mesh across 15 km line-of-sight in remote out-yards
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#94a3b8]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Semtech SX1262 (+22 dBm Tx) • Field Tested across 100 Langstroth Hives</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-[#070a12] border border-white/5 p-4 rounded-xl space-y-1.5">
              <div className="text-xs font-mono text-[#94a3b8]">Packet Delivery Rate</div>
              <div className="text-2xl font-mono font-bold text-emerald-400">99.8%</div>
              <div className="text-[11px] font-mono text-slate-400">Adaptive Data Rate (ADR SF7-SF12) across 100 nodes</div>
            </div>

            <div className="bg-[#070a12] border border-white/5 p-4 rounded-xl space-y-1.5">
              <div className="text-xs font-mono text-[#94a3b8]">Maximum Range per Link</div>
              <div className="text-2xl font-mono font-bold text-sky-400">15.0 km</div>
              <div className="text-[11px] font-mono text-slate-400">3-Hop Auto-Rerouting Tree through dense forest canopies</div>
            </div>

            <div className="bg-[#070a12] border border-white/5 p-4 rounded-xl space-y-1.5">
              <div className="text-xs font-mono text-[#94a3b8]">Airtime Duty Cycle</div>
              <div className="text-2xl font-mono font-bold text-amber-400">&lt; 0.1%</div>
              <div className="text-[11px] font-mono text-slate-400">Dual-Layer AES-256 Cryptographic Vault with NIST-traceable telemetry</div>
            </div>
          </div>
        </div>

        {/* Interactive Acoustic Frequency Analyzer & Rotary Dial */}
        <div id="the_crank" className="bg-[#0b0f19]/90 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                <Activity className="w-4 h-4" />
                <span>ACOUSTIC FREQUENCY ANALYZER (100 HZ - 6,000 HZ)</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc]">
                TDK INMP441 24-bit I2S MEMS Micro-Acoustics
              </h3>
            </div>
            <div className="text-xs font-mono text-[#94a3b8]">
              128-Point CMSIS-DSP FFT on ARM Cortex-M4F • Field Tested in 42°C Heat
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-left">
              <h4 className="text-xl font-bold text-[#f8fafc]">{currentDiagnostic.label}</h4>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-normal">
                {currentDiagnostic.desc}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${currentDiagnostic.badge}`}>
                  State: {currentDiagnostic.state}
                </span>
              </div>
            </div>

            {/* Interactive Rotary Dial */}
            <div className="flex flex-col items-center gap-3 bg-[#070a12] border border-white/10 p-5 rounded-2xl flex-shrink-0">
              <span className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider font-bold">
                Scrub Frequency Range
              </span>

              <div className="relative w-28 h-28 bg-[#0b0f19] rounded-full border-2 border-amber-400 flex items-center justify-center select-none cursor-pointer">
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
                  <div className="absolute top-2 w-3.5 h-3.5 rounded-full bg-amber-400 border border-[#070a12]" />
                  <div className="w-1 h-12 bg-slate-700 rounded-full" />
                </div>
              </div>

              <div className="text-center font-mono">
                <div className="text-lg font-bold text-[#f8fafc]">
                  {frequencyDial} <span className="text-amber-400 text-xs font-normal">Hz</span>
                </div>
                <div className="text-[10px] text-slate-500">Drag to test spectral thresholds</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
