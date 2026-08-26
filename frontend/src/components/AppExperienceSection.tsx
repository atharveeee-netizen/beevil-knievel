"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone, Activity, Radio, ArrowRight,
  ShieldCheck, Cpu, Flame, Zap, QrCode,
  CheckCircle2, Sparkles, Compass, Eye,
  ChevronLeft, ChevronRight, Layers, Volume2,
  TrendingUp, Scale, Clock, Award
} from "lucide-react";
import { DeviceMockup } from "./DeviceMockup";
import { DecryptedText, ShinyText, ClickSpark, Magnet } from "@/components/reactbits";

const APP_BENEFITS = [
  {
    id: 1,
    title: "1-Tap Exception Triage",
    desc: "Immediately isolate the 4 anomalous hives out of 100 without manual frame inspections.",
    badge: "LINEAR STYLE TRIAGE",
    screen: "triage" as const,
  },
  {
    id: 2,
    title: "128-pt FFT Bio-Acoustics",
    desc: "Analyze colony frequencies in real time with 1.12ms on-device TinyML inference.",
    badge: "50-1200 HZ RANGE",
    screen: "fft" as const,
  },
  {
    id: 3,
    title: "NIST Brood Thermoregulation",
    desc: "Track core brood nest temperature drift at ±0.05°C accuracy with CUSUM early warning.",
    badge: "TI TMP117 RTD",
    screen: "radar" as const,
  },
  {
    id: 4,
    title: "1-Tap NFC Field Lock-On",
    desc: "Tap your glove against any hive to instantly load historical telemetry and acoustic history.",
    badge: "0.1S LOCK SPEED",
    screen: "nfc" as const,
  },
  {
    id: 5,
    title: "Honey Chain Merkle Pass",
    desc: "Cryptographically sign honey batches with verifiable SHA-256 sensor proofs for consumers.",
    badge: "BLOCKCHAIN PROVENANCE",
    screen: "provenance" as const,
  },
];

export function AppExperienceSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hiveCount, setHiveCount] = useState(100);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % APP_BENEFITS.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + APP_BENEFITS.length) % APP_BENEFITS.length);

  // Economic calculations based on real commercial apiary benchmarks
  const hoursSaved = Math.round(hiveCount * 2.2); // ~2.2 hours saved per hive/season
  const liftingSavedKg = Math.round(hiveCount * 52); // ~52 kg box lifting avoided/season
  const swarmLossPrevented = Math.round(hiveCount * 148); // ~$148/hive swarm & honey loss prevented
  const extraHoneyKg = (hiveCount * 3.4).toFixed(1); // +3.4kg honey per hive from optimal supering timing

  return (
    <div className="bg-[#070a12] text-[#f8fafc] border-t border-[#393939] space-y-24 py-24 px-4 sm:px-6 lg:px-8">
      {/* 1. Magic UI Experience: 3 Floating Staggered Devices */}
      <section id="experience" className="max-w-6xl mx-auto text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#161616] border border-amber-500/30 text-[#f59e0b] px-4 py-1.5 rounded-sm text-xs font-mono font-semibold uppercase tracking-widest">
            <Smartphone className="w-3.5 h-3.5 text-[#f59e0b]" />
            <DecryptedText text="FIELD COMPANION APP" speed={25} className="text-[#f59e0b]" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-sans uppercase">
            An App Engineered for the Field
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-mono max-w-2xl mx-auto leading-relaxed">
            High-contrast sunlight readability, 48px glove-friendly touch targets, and hands-free voice debriefing across 100-hive yards.
          </p>
        </div>

        {/* 3 Staggered Floating Phone Mockups (Magic UI Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center pt-6 max-w-5xl mx-auto">
          <div className="transform md:-translate-y-6 transition-transform duration-500 hover:scale-105">
            <DeviceMockup screen="fft" />
          </div>
          <div className="transform md:translate-y-4 transition-transform duration-500 hover:scale-105">
            <DeviceMockup screen="radar" />
          </div>
          <div className="transform md:translate-y-12 transition-transform duration-500 hover:scale-105">
            <DeviceMockup screen="triage" />
          </div>
        </div>

        <div className="pt-8">
          <Link
            href="/app"
            className="inline-flex items-center gap-2.5 bg-[#f59e0b] hover:bg-[#fbbf24] text-black px-6 py-3 rounded-sm font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-xl shadow-amber-500/20"
          >
            <span>Launch Live Mobile Field App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. Interactive Field Economic & Labor Savings Calculator (Human Touch) */}
      <section className="max-w-5xl mx-auto bg-[#161616] border border-[#393939] p-8 sm:p-12 rounded-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-sm">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>COMMERCIAL BEEKEEPER ROI</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans uppercase">
              Field Labor &amp; Swarm Loss Calculator
            </h3>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-zinc-400 block">YOUR COMMERCIAL FLEET</span>
            <span className="text-2xl font-mono font-bold text-[#f59e0b]">{hiveCount} Hives</span>
          </div>
        </div>

        {/* Hive Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono text-zinc-400">
            <span>Scale: 10 Hives (Small Outyard)</span>
            <span>500 Hives (Commercial Operation)</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={hiveCount}
            onChange={(e) => setHiveCount(Number(e.target.value))}
            className="w-full h-2 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
          />
        </div>

        {/* 4 Concrete Economic Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#070a12] border border-[#393939] p-4 rounded-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Inspection Hours Saved</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">{hoursSaved} hrs</div>
            <p className="text-[10px] text-zinc-500 font-mono">Based on 2.2h saved per hive/yr</p>
          </div>

          <div className="bg-[#070a12] border border-[#393939] p-4 rounded-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Box Lifting Avoided</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">{liftingSavedKg.toLocaleString()} kg</div>
            <p className="text-[10px] text-zinc-500 font-mono">Protects beekeeper lumbar strain</p>
          </div>

          <div className="bg-[#070a12] border border-[#393939] p-4 rounded-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Swarm Loss Prevented</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">${swarmLossPrevented.toLocaleString()}</div>
            <p className="text-[10px] text-zinc-500 font-mono">72h acoustic early warning</p>
          </div>

          <div className="bg-[#070a12] border border-[#393939] p-4 rounded-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Nectar Flow Delta</span>
            </div>
            <div className="text-2xl font-bold text-purple-400 font-mono">+{extraHoneyKg} kg</div>
            <p className="text-[10px] text-zinc-500 font-mono">Optimized supering timing</p>
          </div>
        </div>
      </section>

      {/* 3. Magic UI Alternating Feature Highlights */}
      <section id="app-features" className="max-w-6xl mx-auto space-y-24">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#161616] border border-white/10 text-zinc-300 px-3 py-1 rounded-sm text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>OPERATIONAL CAPABILITIES</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white font-sans uppercase">
            Autonomous Inspection Intelligence
          </h3>
        </div>

        {/* Feature 1: Exception Triage Feed (Image Right, Text Left) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-[#161616]/60 border border-[#393939] p-8 sm:p-12 rounded-sm">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-sm">
              <Activity className="w-3.5 h-3.5" />
              <span>EXCEPTION-FIRST TRIAGE</span>
            </div>

            <h4 className="text-2xl sm:text-4xl font-bold text-white font-sans">
              Stop inspecting 100 hives manually.
            </h4>

            <p className="text-sm sm:text-base text-zinc-300 font-mono leading-relaxed">
              Traditional beekeeping requires opening every box, chilling the brood nest, and agitating the colony in 38°C heat. Beevil Knievel continuously surfaces only the anomalous colonies requiring immediate action.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pre-swarm acoustic signature alerts (485 Hz virgin queen piping)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Queen loss & brood chill detection (33.1°C core drift)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Varroa mite grooming friction & alarm pheromone spikes (82 kΩ)</span>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <DeviceMockup screen="triage" className="hover:scale-105 transition-transform" />
          </div>
        </div>

        {/* Feature 2: 1-Tap NFC & Compass HUD (Image Left, Text Right) */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 bg-[#161616]/60 border border-[#393939] p-8 sm:p-12 rounded-sm">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>0.1S NFC LOCK-ON & HUD</span>
            </div>

            <h4 className="text-2xl sm:text-4xl font-bold text-white font-sans">
              Instant hive recognition in the field.
            </h4>

            <p className="text-sm sm:text-base text-zinc-300 font-mono leading-relaxed">
              Walk up to any hive in the yard, tap your glove-friendly smartphone against the waterproof solar lid, and the HUD instantly locks on to the colony telemetry with GPS compass navigation.
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>NFC Type 2 & Laser QR barcode dual-standard reader</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Hands-free audio debriefing via Web Speech API</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Offline SQLite WAL sync with auto-mesh relay</span>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <DeviceMockup screen="nfc" className="hover:scale-105 transition-transform" />
          </div>
        </div>
      </section>

      {/* 4. Magic UI Benefits Horizontal Snap Carousel */}
      <section id="app-benefits" className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#393939] pb-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              BENEFITS &amp; CAPABILITIES
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans uppercase">
              What You Can Do With HiveOS
            </h3>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 bg-[#161616] hover:bg-[#262626] border border-white/10 text-white rounded-sm transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 bg-[#161616] hover:bg-[#262626] border border-white/10 text-white rounded-sm transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {APP_BENEFITS.slice(activeSlide, activeSlide + 3).concat(
            APP_BENEFITS.slice(0, Math.max(0, activeSlide + 3 - APP_BENEFITS.length))
          ).map((item) => (
            <div
              key={item.id}
              className="bg-[#161616] border border-[#393939] p-6 rounded-sm space-y-4 hover:border-amber-500/50 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-sm inline-block">
                  {item.badge}
                </span>
                <h4 className="text-lg font-bold text-white font-sans">{item.title}</h4>
                <p className="text-xs text-zinc-300 font-mono leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-2 flex justify-between items-center text-[11px] font-mono text-amber-400">
                <span>Feature 0{item.id}</span>
                <span className="text-zinc-500">Live in /app</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
