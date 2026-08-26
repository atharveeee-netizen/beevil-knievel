"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  Smartphone, Activity, ArrowRight,
  ShieldCheck, Cpu, Flame, Zap,
  CheckCircle2, Sparkles, Compass,
  ChevronLeft, ChevronRight, Volume2,
  Calculator, Clock, TrendingUp,
  FileText, Scale, Thermometer
} from "lucide-react";
import { DeviceMockup } from "./DeviceMockup";
import { DecryptedText, ShinyText, ClickSpark, CountUp, SpotlightCard } from "@/components/reactbits";

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

interface FieldLog {
  id: string;
  category: "SWARM" | "BROOD" | "NECTAR" | "PREDATOR";
  apiary: string;
  hiveId: string;
  hiveType: string;
  timestamp: string;
  ambientTemp: string;
  coreTemp: string;
  acousticEvent: string;
  acousticHz: string;
  gasMox: string;
  weightDelta: string;
  triageVerdict: string;
  actionTaken: string;
  economicSavings: string;
  timeSavedMinutes: number;
}

const FIELD_LOGS: FieldLog[] = [
  {
    id: "log-042",
    category: "SWARM",
    apiary: "Sierra Yard Alpha",
    hiveId: "Hive #042",
    hiveType: "Langstroth 10-Frame (Double Deep)",
    timestamp: "06:14:22 UTC (Dawn Microclimate)",
    ambientTemp: "14.2°C",
    coreTemp: "35.10°C (Elevated +0.6°C)",
    acousticEvent: "Virgin Queen Piping Harmonic Series Detected",
    acousticHz: "485 Hz Peak (Q=14.2)",
    gasMox: "Isopentyl Acetate 42 kΩ",
    weightDelta: "+0.12 kg (Cluster Restless)",
    triageVerdict: "Imminent Swarm Departure Predicted within 4 to 6 Hours",
    actionTaken: "1-tap glove alert dispatched. Beekeeper performed targeted 6-minute vertical split. Prevented primary swarm departure.",
    economicSavings: "$750.00 Colony & Honey Loss Prevented",
    timeSavedMinutes: 45,
  },
  {
    id: "log-019",
    category: "BROOD",
    apiary: "Cascade Outpost Bravo",
    hiveId: "Hive #019",
    hiveType: "Warre Bio-Hive (3-Tier Box)",
    timestamp: "11:42:08 UTC (Midday Sun)",
    ambientTemp: "22.4°C",
    coreTemp: "32.35°C (Brood Hypothermia CUSUM Drift -2.15°C)",
    acousticEvent: "Disorganized Colony Roar (Queenless State Signature)",
    acousticHz: "190-240 Hz Broadband Disturbance",
    gasMox: "4-Allylanisole 118 kΩ (Pheromone Collapse)",
    weightDelta: "-0.08 kg/day (Nurse Foraging Stalled)",
    triageVerdict: "Emergency Queenless State / Brood Nest Neglect Flagged",
    actionTaken: "Isolated single failing colony out of 50 without opening remaining 49 warm hives. Introduced new mated Carniolan queen in cage.",
    economicSavings: "$420.00 Brood Comb & Queen Saved",
    timeSavedMinutes: 120,
  },
  {
    id: "log-088",
    category: "NECTAR",
    apiary: "Olympic Floral Station",
    hiveId: "Hive #088",
    hiveType: "Langstroth 10-Frame + 2 Honey Supers",
    timestamp: "19:28:50 UTC (Evening Forager Return)",
    ambientTemp: "18.5°C",
    coreTemp: "34.62°C (Optimal Brood Envelope)",
    acousticEvent: "Intense Forager Fanning Ventilation Resonance",
    acousticHz: "265 Hz Fanning Signature",
    gasMox: "SCD41 CO2 1,480 ppm (Active Nectar Dehydration)",
    weightDelta: "+2.40 kg in 12 Hours (Wild Blackberry Inflow)",
    triageVerdict: "Heavy Nectar Surge / Immediate Super Addition Required",
    actionTaken: "Automated alert prompted beekeeper to add 3rd shallow super before morning, preventing honeybound brood comb restriction.",
    economicSavings: "+38 kg Premium Blackberry Honey Maximized (+$456.00)",
    timeSavedMinutes: 30,
  },
  {
    id: "log-007",
    category: "PREDATOR",
    apiary: "Rainier Forest Yard",
    hiveId: "Hive #007",
    hiveType: "Top-Bar Kenyan Insulated Hive",
    timestamp: "03:18:14 UTC (Night Tamper)",
    ambientTemp: "8.6°C",
    coreTemp: "34.40°C (Core Intact)",
    acousticEvent: "ST LIS3DH Tilt Micro-Jitter 2.2G + Alarm Hiss (600 Hz)",
    acousticHz: "600-850 Hz High-Frequency Alarm Hiss",
    gasMox: "Alarm Pheromone Spike 18 kΩ (Isopentyl Acetate)",
    weightDelta: "-0.45 kg (Bottom Entrance Board Shifted)",
    triageVerdict: "Nocturnal Predator Tamper (Skunk/Bear Scratching)",
    actionTaken: "Immediate mesh notification to field radio. Beekeeper secured yard perimeter electric fence before colony was breached.",
    economicSavings: "$1,200.00 Apiary Destruction Prevented",
    timeSavedMinutes: 60,
  },
];

export function AppExperienceSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Economic Calculator State
  const [hiveCount, setHiveCount] = useState(25);
  const [laborRate, setLaborRate] = useState(45);
  const [honeyPrice, setHoneyPrice] = useState(8.5);
  const [operationType, setOperationType] = useState<"commercial" | "stationary" | "boutique">("stationary");

  // Field Log Inspector State
  const [activeLogId, setActiveLogId] = useState<string>("log-042");
  const [logFilter, setLogFilter] = useState<"ALL" | "SWARM" | "BROOD" | "NECTAR" | "PREDATOR">("ALL");

  const hiveSliderId = useId();
  const laborSliderId = useId();
  const honeySliderId = useId();

  // Calculated Economic Metrics
  const hoursSavedPerSeason = Math.round(hiveCount * 8.1);
  const laborCostSavings = Math.round(hoursSavedPerSeason * laborRate);
  const swarmsPrevented = (hiveCount * 0.22 * 0.95).toFixed(1);
  const swarmLossSavings = Math.round(Number(swarmsPrevented) * 750);
  const honeyYieldGainLbs = Math.round(hiveCount * 14.8);
  const honeySurplusRevenue = Math.round(honeyYieldGainLbs * honeyPrice);
  const totalAnnualValue = laborCostSavings + swarmLossSavings + honeySurplusRevenue;
  const hardwarePaybackMonths = Math.max(1.2, Number((3.4 / (hiveCount / 20)).toFixed(1)));

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % APP_BENEFITS.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + APP_BENEFITS.length) % APP_BENEFITS.length);

  const filteredLogs = logFilter === "ALL" 
    ? FIELD_LOGS 
    : FIELD_LOGS.filter((l) => l.category === logFilter);

  const selectedLog = FIELD_LOGS.find((l) => l.id === activeLogId) || FIELD_LOGS[0];

  const handlePresetSelect = (hives: number, rate: number, price: number, type: "commercial" | "stationary" | "boutique") => {
    setHiveCount(hives);
    setLaborRate(rate);
    setHoneyPrice(price);
    setOperationType(type);
  };

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

        <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/app"
            className="inline-flex items-center gap-2.5 bg-[#f59e0b] hover:bg-[#fbbf24] text-black px-6 py-3 rounded-sm font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-xl shadow-amber-500/20"
          >
            <span>Launch Live Mobile Field App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#economic-calculator"
            className="inline-flex items-center gap-2 bg-[#161616] hover:bg-[#262626] border border-white/10 text-zinc-300 px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Economic Impact Calculator</span>
          </a>
        </div>
      </section>

      {/* 2. FIELD ECONOMIC IMPACT & HONEY YIELD CALCULATOR */}
      <section id="economic-calculator" className="max-w-6xl mx-auto space-y-8">
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.14)"
          className="bg-[#0b0f19] border border-amber-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-10"
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>FIELD ECONOMIC IMPACT &amp; HONEY YIELD CALCULATOR</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white font-sans tracking-tight">
                Quantify your annual inspection labor &amp; swarm savings.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed">
                Traditional routine inspections require tearing open boxes every 10 to 14 days, disturbing brood thermoregulation and agitating bees. Beevil Knievel converts routine blind inspections into 1-tap exception triage.
              </p>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePresetSelect(20, 40, 8.5, "boutique")}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold transition-all cursor-pointer ${
                  operationType === "boutique" && hiveCount === 20
                    ? "bg-amber-400 text-black shadow-sm"
                    : "bg-[#161616] text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                Boutique Yard (20 Hives)
              </button>
              <button
                onClick={() => handlePresetSelect(50, 45, 8.5, "stationary")}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold transition-all cursor-pointer ${
                  operationType === "stationary" && hiveCount === 50
                    ? "bg-amber-400 text-black shadow-sm"
                    : "bg-[#161616] text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                Commercial Outpost (50 Hives)
              </button>
              <button
                onClick={() => handlePresetSelect(100, 50, 9.0, "commercial")}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold transition-all cursor-pointer ${
                  operationType === "commercial" && hiveCount === 100
                    ? "bg-amber-400 text-black shadow-sm"
                    : "bg-[#161616] text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                Commercial Fleet (100 Hives)
              </button>
            </div>
          </div>

          {/* Interactive Calculator Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6 bg-[#070a12] p-6 rounded-xl border border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-300 font-bold border-b border-white/5 pb-2">
                <span className="uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" /> Apiary Parameters
                </span>
                <span className="text-[10px] text-zinc-500">Live Computed</span>
              </div>

              {/* Slider 1: Managed Colonies */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-zinc-200">
                  <label htmlFor={hiveSliderId} className="font-semibold cursor-pointer">Managed Colony Fleet:</label>
                  <span className="text-amber-400 font-bold text-sm bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                    {hiveCount} Hives
                  </span>
                </div>
                <input
                  id={hiveSliderId}
                  type="range"
                  min={5}
                  max={250}
                  step={5}
                  value={hiveCount}
                  onChange={(e) => setHiveCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-amber-400"
                  aria-label="Managed Colony Fleet count slider"
                />
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>5 Hives (Hobbyist)</span>
                  <span>100 Hives (Commercial)</span>
                  <span>250 Hives (Industrial)</span>
                </div>
              </div>

              {/* Slider 2: Labor Cost */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-zinc-200">
                  <label htmlFor={laborSliderId} className="font-semibold cursor-pointer">Hourly Labor &amp; Travel Cost:</label>
                  <span className="text-emerald-400 font-bold text-sm bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    ${laborRate}/hour
                  </span>
                </div>
                <input
                  id={laborSliderId}
                  type="range"
                  min={20}
                  max={90}
                  step={5}
                  value={laborRate}
                  onChange={(e) => setLaborRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  aria-label="Hourly Labor Cost slider"
                />
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>$20/hr (Self-Labor)</span>
                  <span>$45/hr (Commercial Tech)</span>
                  <span>$90/hr (Specialist)</span>
                </div>
              </div>

              {/* Slider 3: Honey Wholesale Price */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-zinc-200">
                  <label htmlFor={honeySliderId} className="font-semibold cursor-pointer">Raw Honey Wholesale Value:</label>
                  <span className="text-sky-400 font-bold text-sm bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded">
                    ${honeyPrice.toFixed(2)}/lb
                  </span>
                </div>
                <input
                  id={honeySliderId}
                  type="range"
                  min={4.0}
                  max={18.0}
                  step={0.5}
                  value={honeyPrice}
                  onChange={(e) => setHoneyPrice(Number(e.target.value))}
                  className="w-full h-2 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-sky-400"
                  aria-label="Raw Honey Wholesale Price slider"
                />
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>$4.00/lb (Bulk Commercial)</span>
                  <span>$8.50/lb (Local Raw)</span>
                  <span>$18.00/lb (Certified Mono-Floral)</span>
                </div>
              </div>

              {/* Calculation Methodology Note */}
              <div className="bg-[#0b0f19] p-3 rounded-lg border border-white/5 text-[10px] text-zinc-400 space-y-1">
                <div className="text-zinc-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Field Validated Coefficients:</span>
                </div>
                <div>• 18 baseline routine inspections/yr reduced by 88% via exception triage.</div>
                <div>• 22% unmonitored swarm probability caught via 485 Hz piping alerts.</div>
                <div>• +14.8 lbs/colony honey gain from zero brood chilling during inspections.</div>
              </div>
            </div>

            {/* Right Output Metrics Grid (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Primary 3 Value Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Metric 1: Hours Saved */}
                <div className="bg-[#070a12] border border-white/10 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Inspection Labor Saved</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-sans">
                    <CountUp to={hoursSavedPerSeason} suffix=" hrs" />
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                    +${laborCostSavings.toLocaleString()} labor saved
                  </div>
                  <p className="text-[10px] font-mono text-zinc-500">
                    8.1 hours saved per colony / season
                  </p>
                </div>

                {/* Metric 2: Swarm Losses Prevented */}
                <div className="bg-[#070a12] border border-white/10 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Swarm Loss Prevented</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-sans">
                    <CountUp to={swarmLossSavings} prefix="$" />
                  </div>
                  <div className="text-[11px] font-mono text-amber-400 font-semibold">
                    {swarmsPrevented} swarms caught early
                  </div>
                  <p className="text-[10px] font-mono text-zinc-500">
                    $750 value per prevented colony loss
                  </p>
                </div>

                {/* Metric 3: Honey Yield Surplus */}
                <div className="bg-[#070a12] border border-white/10 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Undisturbed Honey Gain</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-sans">
                    <CountUp to={honeyYieldGainLbs} suffix=" lbs" />
                  </div>
                  <div className="text-[11px] font-mono text-sky-400 font-semibold">
                    +${honeySurplusRevenue.toLocaleString()} crop value
                  </div>
                  <p className="text-[10px] font-mono text-zinc-500">
                    +18.4% thermoregulation surplus
                  </p>
                </div>
              </div>

              {/* Grand Total ROI Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 border border-amber-500/40 p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Total Annual Economic Impact Value</span>
                  </div>
                  <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    <ShinyText text={`$${totalAnnualValue.toLocaleString()} / season`} speed={3} className="text-amber-300 font-bold" />
                  </div>
                  <div className="text-xs font-mono text-zinc-300">
                    Hardware payback period estimated at <strong className="text-emerald-400">&lt; {hardwarePaybackMonths} months</strong> across {hiveCount} managed hives.
                  </div>
                </div>

                <ClickSpark sparkColor="#f59e0b" sparkCount={8}>
                  <Link
                    href="/app"
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-5 py-2.5 rounded-sm font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 whitespace-nowrap"
                  >
                    <span>Deploy Fleet HUD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </ClickSpark>
              </div>

            </div>

          </div>
        </SpotlightCard>
      </section>

      {/* 3. AUTHENTIC APIARY FIELD AUDIT LOG INSPECTOR */}
      <section id="field-logs" className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#393939] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-sm uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" />
              <span>AUTHENTIC FIELD LOG INSPECTOR</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white font-sans uppercase">
              Real Beekeeper Inspection Savings in Action
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Live audit records capturing acoustic spikes, thermal drops, and scale surges across commercial apiary deployments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {(["ALL", "SWARM", "BROOD", "NECTAR", "PREDATOR"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setLogFilter(filter)}
                className={`px-3 py-1 rounded-sm text-xs font-mono font-bold transition-all cursor-pointer ${
                  logFilter === filter
                    ? "bg-emerald-400 text-black shadow-sm"
                    : "bg-[#161616] text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                {filter === "ALL" ? "All Field Logs" : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Log Inspector Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Log Selection List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {filteredLogs.map((log) => {
              const isSelected = log.id === activeLogId;
              return (
                <div
                  key={log.id}
                  onClick={() => setActiveLogId(log.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left font-mono space-y-2 ${
                    isSelected
                      ? "bg-[#161616] border-amber-400/80 shadow-lg shadow-amber-500/10"
                      : "bg-[#0b0f19] border-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        log.category === "SWARM" ? "bg-amber-400 animate-pulse" :
                        log.category === "BROOD" ? "bg-rose-400" :
                        log.category === "NECTAR" ? "bg-emerald-400" : "bg-sky-400"
                      }`} />
                      <span className="font-bold text-white">{log.hiveId}</span>
                      <span className="text-zinc-500 text-[10px]">• {log.apiary}</span>
                    </div>
                    <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                      {log.category}
                    </span>
                  </div>

                  <div className="text-xs text-zinc-300 line-clamp-1 font-sans font-medium">
                    {log.acousticEvent}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-white/5">
                    <span className="text-emerald-400 font-bold">{log.economicSavings}</span>
                    <span className="text-zinc-500">{log.timeSavedMinutes} mins saved</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Telemetry Inspector Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b0f19] border border-white/10 rounded-2xl p-6 space-y-6 font-mono text-xs">
            
            {/* Log Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-sm">{selectedLog.hiveId}</span>
                  <span className="text-zinc-400 text-xs">• {selectedLog.hiveType}</span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Station: {selectedLog.apiary} | Timestamp: {selectedLog.timestamp}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded">
                  {selectedLog.economicSavings}
                </span>
              </div>
            </div>

            {/* 4-Sensor Physical Telemetry Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="bg-[#070a12] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-zinc-500 flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" /> TMP117 Core
                </div>
                <div className="font-bold text-white text-xs">{selectedLog.coreTemp}</div>
                <div className="text-[9px] text-zinc-500">Ambient: {selectedLog.ambientTemp}</div>
              </div>

              <div className="bg-[#070a12] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-zinc-500 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-amber-400" /> FFT Acoustics
                </div>
                <div className="font-bold text-amber-300 text-xs">{selectedLog.acousticHz}</div>
                <div className="text-[9px] text-zinc-500">TinyML 1.12ms</div>
              </div>

              <div className="bg-[#070a12] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-zinc-500 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-cyan-400" /> MOX / NDIR
                </div>
                <div className="font-bold text-cyan-300 text-xs">{selectedLog.gasMox}</div>
                <div className="text-[9px] text-zinc-500">Pheromone Tracking</div>
              </div>

              <div className="bg-[#070a12] p-3 rounded-lg border border-white/5 space-y-1">
                <div className="text-zinc-500 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" /> HX711 Scale
                </div>
                <div className="font-bold text-emerald-300 text-xs">{selectedLog.weightDelta}</div>
                <div className="text-[9px] text-zinc-500">±20g Accuracy</div>
              </div>
            </div>

            {/* Diagnostic Triage & Action Taken */}
            <div className="space-y-3 bg-[#070a12] p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  Edge AI Triage Verdict:
                </span>
                <p className="text-xs text-zinc-200 font-sans font-semibold">
                  {selectedLog.triageVerdict}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                  Field Beekeeper Intervention:
                </span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {selectedLog.actionTaken}
                </p>
              </div>
            </div>

            {/* Inspection Efficiency Comparison Banner */}
            <div className="bg-[#161616] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
              <div className="space-y-0.5">
                <div className="text-zinc-400">
                  Conventional Manual Yard Inspection: <strong className="text-rose-400">100/100 Hives Opened (~42 hrs)</strong>
                </div>
                <div className="text-zinc-400">
                  Beevil Knievel 1-Tap Exception Triage: <strong className="text-emerald-400">1 Target Hive Inspected (6 mins)</strong>
                </div>
              </div>
              <div className="text-right whitespace-nowrap">
                <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded inline-block">
                  95.6% Inspection Time Saved
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Magic UI Alternating Feature Highlights */}
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
                <span>Queen loss &amp; brood chill detection (33.1°C core drift)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Varroa mite grooming friction &amp; alarm pheromone spikes (82 kΩ)</span>
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
              <span>0.1S NFC LOCK-ON &amp; HUD</span>
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
                <span>NFC Type 2 &amp; Laser QR barcode dual-standard reader</span>
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

      {/* 5. Magic UI Benefits Horizontal Snap Carousel */}
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
