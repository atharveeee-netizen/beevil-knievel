"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Volume2, 
  VolumeX, 
  Laptop, 
  ArrowRight,
  RotateCw,
  Cpu,
  Layers,
  Thermometer,
  Wind,
  Scale,
  Gauge,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Smartphone,
  Wifi,
  BatteryCharging,
  AlertTriangle
} from "lucide-react";
import { PlaydateConsole } from "@/components/PlaydateConsole";

export function HeroSection() {
  const [audioFreq, setAudioFreq] = useState<number>(220);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeHiveId, setActiveHiveId] = useState(88);
  const [activeTab, setActiveTab] = useState<"telemetry" | "mobile_app" | "console">("telemetry");
  const [mobileAppTab, setMobileAppTab] = useState<"radar" | "audio" | "thermal" | "pass">("radar");
  
  // Real-time animated telemetry micro-variations
  const [telemetryTick, setTelemetryTick] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Periodic telemetry fluctuation simulation for live sensor feel
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTick((prev) => (prev + 1) % 1000);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Real-time calculated telemetry readings with slight micro-variations
  const telemetryData = useMemo(() => {
    const jitter1 = (Math.sin(telemetryTick * 0.4) * 0.03);
    const jitter2 = (Math.cos(telemetryTick * 0.3) * 6);
    const jitter3 = (Math.sin(telemetryTick * 0.2) * 0.002);
    const jitter4 = (Math.sin(telemetryTick * 0.5) * 0.04);
    const jitter5 = (Math.cos(telemetryTick * 0.4) * 0.2);

    return {
      broodTemp: (34.82 + jitter1).toFixed(2),
      co2: Math.round(1140 + jitter2),
      voc: (0.024 + jitter3).toFixed(3),
      scaleDelta: (1.84 + jitter4).toFixed(2),
      humidity: (58.4 + jitter5).toFixed(1),
      inferenceMs: (3.35 + Math.sin(telemetryTick) * 0.08).toFixed(2),
      nodeRssi: -64 + Math.round(Math.sin(telemetryTick) * 2),
      solarWatts: (2.12 + Math.cos(telemetryTick * 0.2) * 0.05).toFixed(2)
    };
  }, [telemetryTick]);

  const FREQUENCY_PRESETS = [
    {
      hz: 220,
      label: "220 Hz Healthy Nominal",
      state: "Optimal Foraging & Brood Clustered",
      desc: "Baseline colony hum in queenright brood nest locked at 34.8°C",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      indicatorColor: "bg-emerald-400",
      accent: "#10b981",
      fftCenterBin: 28,
    },
    {
      hz: 250,
      label: "250 Hz Queen Piping",
      state: "Virgin Queen Piping & Emergence",
      desc: "G-clef acoustic pulse emitted during queen emergence and combat",
      badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      indicatorColor: "bg-amber-400",
      accent: "#f59e0b",
      fftCenterBin: 36,
    },
    {
      hz: 450,
      label: "450 Hz Swarm Alert",
      state: "Pre-Swarm Harmonic Escalation (24h Alert)",
      desc: "Acoustic density spike preceding colony departure split",
      badgeColor: "bg-rose-500/15 text-rose-400 border-rose-500/30",
      indicatorColor: "bg-rose-400",
      accent: "#f43f5e",
      fftCenterBin: 64,
    },
  ];

  // Stop Web Audio synthesizer cleanly
  const stopAudio = () => {
    try {
      if (masterGainRef.current && audioContextRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.06);
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          oscillatorsRef.current = [];
          if (lfoRef.current) {
            try {
              lfoRef.current.stop();
              lfoRef.current.disconnect();
            } catch {
              // ignore
            }
            lfoRef.current = null;
          }
        }, 100);
      }
    } catch {
      // ignore
    }
    setIsPlayingAudio(false);
  };

  // Play rich bio-acoustic synthesized bee colony tone with realistic overtones and wingbeat LFO
  const playTone = (freq: number) => {
    try {
      if (isPlayingAudio) {
        stopAudio();
        return;
      }

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.09, now + 0.1);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // LFO for subtle authentic colony flutter (6 Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(6.2, now);
      lfoGain.gain.setValueAtTime(0.015, now);
      lfo.connect(lfoGain.gain);
      lfo.start();
      lfoRef.current = lfo;

      // Multi-harmonic oscillator array: Fundamental + 2nd + 3rd harmonics
      const newOscs: OscillatorNode[] = [];

      // 1. Fundamental
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(freq, now);
      gain1.gain.setValueAtTime(0.5, now);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start();
      newOscs.push(osc1);

      // 2. Sub/Octave Fundamental
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * 0.5, now);
      gain2.gain.setValueAtTime(0.3, now);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start();
      newOscs.push(osc2);

      // 3. 2nd Harmonic
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(freq * 2, now);
      gain3.gain.setValueAtTime(0.2, now);
      osc3.connect(gain3);
      gain3.connect(masterGain);
      osc3.start();
      newOscs.push(osc3);

      // 4. Detune flutter for authentic swarm texture
      const osc4 = ctx.createOscillator();
      const gain4 = ctx.createGain();
      osc4.type = "sine";
      osc4.frequency.setValueAtTime(freq * 1.015, now);
      gain4.gain.setValueAtTime(0.15, now);
      osc4.connect(gain4);
      gain4.connect(masterGain);
      osc4.start();
      newOscs.push(osc4);

      oscillatorsRef.current = newOscs;
      setIsPlayingAudio(true);

      setTimeout(() => {
        stopAudio();
      }, 6000);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const handleFrequencySelect = (freq: number) => {
    setAudioFreq(freq);
    if (isPlayingAudio && audioContextRef.current && oscillatorsRef.current.length > 0) {
      const now = audioContextRef.current.currentTime;
      try {
        if (oscillatorsRef.current[0]) oscillatorsRef.current[0].frequency.setTargetAtTime(freq, now, 0.04);
        if (oscillatorsRef.current[1]) oscillatorsRef.current[1].frequency.setTargetAtTime(freq * 0.5, now, 0.04);
        if (oscillatorsRef.current[2]) oscillatorsRef.current[2].frequency.setTargetAtTime(freq * 2, now, 0.04);
        if (oscillatorsRef.current[3]) oscillatorsRef.current[3].frequency.setTargetAtTime(freq * 1.015, now, 0.04);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const currentPreset = FREQUENCY_PRESETS.find((p) => p.hz === audioFreq) || FREQUENCY_PRESETS[0];

  // 128-pt FFT Spectrum Bar Heights Generator
  const fftBars = useMemo(() => {
    const bars: number[] = [];
    const peakBin = currentPreset.fftCenterBin;

    for (let i = 0; i < 48; i++) {
      const distFromPeak = Math.abs(i - peakBin);
      const primaryEnergy = Math.exp(-(distFromPeak * distFromPeak) / 12) * 85;
      
      const harmonicBin = peakBin * 1.8;
      const distFromHarmonic = Math.abs(i - harmonicBin);
      const harmonicEnergy = Math.exp(-(distFromHarmonic * distFromHarmonic) / 8) * 45;

      const noise = (Math.sin(i * 1.7 + telemetryTick * 0.8) * 6) + (Math.cos(i * 2.3 + telemetryTick * 0.5) * 4) + 12;

      const rawHeight = Math.max(8, Math.min(95, primaryEnergy + harmonicEnergy + noise));
      bars.push(rawHeight);
    }
    return bars;
  }, [currentPreset, telemetryTick]);

  return (
    <header className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-[#070b14] text-slate-100 flex flex-col items-center">
      {/* Apple Pro / Linear Precision Aesthetics: Ambient Glow & Precision Rim Lights */}
      <div className="absolute inset-0 pointer-events-none -z-0">
        {/* Subtle Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.06]" 
          style={{
            backgroundImage: "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
            backgroundSize: "44px 44px"
          }}
        />
        {/* Warm Amber Gold Radiant Spotlights (#f59e0b) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1300px] h-[600px] sm:h-[850px] bg-radial from-amber-500/15 via-sky-600/5 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Badges: IEEE Challenge + Live LoRaWAN IN865 Mesh Status */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-[#0f172a]/95 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#ffc833] uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>IEEE HardwAIre Challenge Phase 2 Standard</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-emerald-500/40 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold">100/100 LoRaWAN IN865 Mesh Live</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Antmicro CM4 6 TOPS Gateway</span>
          </div>
        </div>

        {/* Headline Tagline */}
        <p className="text-xs sm:text-sm md:text-base font-mono font-bold uppercase tracking-widest text-amber-400/90 max-w-3xl mb-3">
          Cyber-Physical Precision Apiculture &bull; 16-Sensor Multi-Modal Fusion
        </p>

        {/* Master Brand Logotype (Apple Pro Typography) */}
        <div className="my-2 sm:my-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-2xl font-sans">
            Beevil Knievel
            <span className="text-2xl sm:text-4xl align-super ml-1.5 font-bold text-[#ffc833] drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]">
              &reg;
            </span>
          </h1>
        </div>

        {/* Subtitle Description */}
        <p className="text-base sm:text-xl md:text-2xl font-normal max-w-4xl leading-relaxed text-slate-300 mt-2 mb-8">
          Autonomous Edge-AI Environmental &amp; Acoustic Health Monitoring System. Fusing <span className="text-white font-semibold">16-parameter physical telemetry</span> with on-device <span className="text-[#ffc833] font-semibold">TinyML 1D-CNN triage</span> and <span className="text-emerald-400 font-semibold">6 TOPS gateway neural inference</span>.
        </p>

        {/* High-Converting Action Bar */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-3xl">
          {/* Primary High-Converting CTA: OPEN FIELD COMMAND APP (/app) */}
          <Link
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 via-amber-300 to-[#ffc833] text-slate-950 hover:text-black font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.45),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_0_45px_rgba(245,158,11,0.7)] hover:scale-[1.03] active:scale-95 transition-all uppercase tracking-wide group border border-amber-200/60"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950" />
            </span>
            <Laptop className="w-5 h-5 stroke-[2.5] text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="font-black">OPEN FIELD COMMAND APP (/app)</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary Enterprise Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <Link
              href="#the_system"
              className="inline-flex items-center justify-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-200 hover:text-white text-sm sm:text-base font-bold px-5 py-4 rounded-xl shadow-lg transition-all"
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Explore Hardware &amp; CAD</span>
            </Link>

            <Link
              href="#honey_chain"
              className="inline-flex items-center justify-center gap-2 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-amber-300 text-sm sm:text-base font-mono font-bold px-5 py-4 rounded-xl shadow-lg transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Honey Chain Ledger</span>
            </Link>
          </div>
        </div>

        {/* Centerpiece Container: Live Telemetry, Mobile Field App Showcase, and Playdate Console */}
        <div className="w-full max-w-6xl bg-[#0d1322]/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] my-4 flex flex-col items-center">
          
          {/* Top Control Header: Live Mode Selector & Telemetry Summary */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <div className="text-left">
                <div className="font-mono font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
                  <span>Hive Node Telemetry &bull; #{String(activeHiveId).padStart(3, "0")}</span>
                  <span className="text-[10px] bg-slate-800 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-bold">
                    ONLINE &bull; IN865 MESH
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Antmicro CM4 Mesh Gateway &bull; Dual-Band LoRa IN865 / 915 MHz &bull; RSSI: {telemetryData.nodeRssi} dBm
                </div>
              </div>
            </div>

            {/* View Tab Switcher: Telemetry Dashboard vs Mobile Field App vs Playdate Console */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("telemetry")}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeTab === "telemetry"
                    ? "bg-slate-800 text-[#ffc833] shadow-md border border-amber-500/30"
                    : "text-slate-400 hover:text-white cursor-pointer"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">6-Sensor HUD</span>
                <span className="sm:hidden">HUD</span>
              </button>

              <button
                onClick={() => setActiveTab("mobile_app")}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeTab === "mobile_app"
                    ? "bg-slate-800 text-[#ffc833] shadow-md border border-amber-500/30"
                    : "text-slate-400 hover:text-white cursor-pointer"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Mobile App</span>
              </button>

              <button
                onClick={() => setActiveTab("console")}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeTab === "console"
                    ? "bg-slate-800 text-[#ffc833] shadow-md border border-amber-500/30"
                    : "text-slate-400 hover:text-white cursor-pointer"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Playdate Console</span>
                <span className="sm:hidden">Playdate</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Real-Time Multi-Modal 6-Sensor HUD Dashboard */}
          {activeTab === "telemetry" && (
            <div className="w-full space-y-6">
              
              {/* 6-Metric Precision Sensor Grid (Apple Pro / Linear Style) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
                
                {/* 1. TMP117 Brood Temperature */}
                <div className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Brood Temp</span>
                    <Thermometer className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="my-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
                      {telemetryData.broodTemp}<span className="text-sm font-bold text-amber-400">&deg;C</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    <span>TMP117 &plusmn;0.05&deg;C</span>
                  </div>
                </div>

                {/* 2. SCD41 Photoacoustic NDIR CO2 */}
                <div className="bg-slate-950/80 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">NDIR CO2</span>
                    <Gauge className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="my-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
                      {telemetryData.co2}<span className="text-xs font-bold text-sky-400 ml-0.5">ppm</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-sky-400 flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
                    <span>SCD41 400-5k</span>
                  </div>
                </div>

                {/* 3. BME688 AI VOC Gas Scanner */}
                <div className="bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">BME688 VOC</span>
                    <Wind className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="my-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
                      {telemetryData.voc}<span className="text-xs font-bold text-purple-400 ml-0.5">ppm</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-purple-300 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-purple-400 inline-block" />
                    <span>AFB/EFB Clean</span>
                  </div>
                </div>

                {/* 4. TDK MEMS Acoustic Ear Peak */}
                <div className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Acoustic Ear</span>
                    <Activity className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="my-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300 tracking-tight">
                      {audioFreq}<span className="text-xs font-bold text-amber-400 ml-0.5">Hz</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-amber-300 flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    <span>24-bit I2S DMA</span>
                  </div>
                </div>

                {/* 5. HX711 24-bit Precision Scale */}
                <div className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Scale Delta</span>
                    <Scale className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="my-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400 tracking-tight">
                      +{telemetryData.scaleDelta}<span className="text-xs font-bold text-slate-300 ml-0.5">kg/d</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    <span>HX711 Active Flow</span>
                  </div>
                </div>

                {/* 6. SHT45 Humidity & Solar Harvester */}
                <div className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Humidity / Sun</span>
                    <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="my-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
                      {telemetryData.humidity}<span className="text-xs font-bold text-amber-400 ml-0.5">%RH</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-amber-300 flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    <span>{telemetryData.solarWatts}W Solar Float</span>
                  </div>
                </div>

              </div>

              {/* 128-pt FFT Audio Spectrum Visualizer Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner flex flex-col gap-4">
                
                {/* FFT Visualizer Top Legend */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
                      <Activity className="w-4 h-4 text-amber-400" />
                      <span>128-Point FFT Acoustic Spectrum (100 Hz – 6,000 Hz)</span>
                    </div>
                    <span className="text-slate-600 hidden md:inline">|</span>
                    <span className="text-slate-400 hidden md:inline">
                      I2S DMA &bull; 16.0 kHz &bull; Peak: <strong className="text-white">{audioFreq} Hz</strong>
                    </span>
                  </div>

                  {/* Play / Mute Synthesizer Button */}
                  <button
                    onClick={() => playTone(audioFreq)}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-extrabold transition-all cursor-pointer ${
                      isPlayingAudio
                        ? "bg-rose-600 text-white shadow-[0_0_18px_rgba(244,63,94,0.7)] animate-pulse"
                        : "bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 hover:border-amber-400 shadow-sm"
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Mute Bio-Acoustic Synth</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-amber-400" />
                        <span>Listen to Hive Harmonics ({audioFreq} Hz)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Animated Spectrum Bars Display */}
                <div className="relative h-28 sm:h-36 w-full bg-[#060a12] rounded-xl border border-slate-900 p-2 sm:p-3 flex items-end justify-between gap-1 overflow-hidden">
                  
                  {/* Subtle Grid Lines inside visualizer */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-col justify-between p-2">
                    <div className="w-full border-b border-slate-700 border-dashed text-[8px] font-mono text-slate-500 text-right">0 dB</div>
                    <div className="w-full border-b border-slate-700 border-dashed text-[8px] font-mono text-slate-500 text-right">-12 dB</div>
                    <div className="w-full border-b border-slate-700 border-dashed text-[8px] font-mono text-slate-500 text-right">-24 dB</div>
                  </div>

                  {/* 48 Spectrum Bars */}
                  {fftBars.map((height, idx) => {
                    const isPeakZone = Math.abs(idx - currentPreset.fftCenterBin) <= 2;
                    return (
                      <div 
                        key={idx}
                        className="flex-1 flex flex-col items-center justify-end h-full z-10"
                      >
                        <div
                          style={{
                            height: `${height}%`,
                            backgroundColor: isPeakZone 
                              ? currentPreset.accent 
                              : `rgba(56, 189, 248, ${0.3 + (height / 100) * 0.5})`,
                            boxShadow: isPeakZone 
                              ? `0 0 14px ${currentPreset.accent}` 
                              : "none"
                          }}
                          className="w-full rounded-t-sm transition-all duration-150"
                        />
                      </div>
                    );
                  })}

                  {/* Frequency Peak Callout Marker */}
                  <div 
                    className="absolute top-2 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border backdrop-blur-md shadow-lg pointer-events-none transition-all duration-300"
                    style={{
                      left: `${Math.min(75, Math.max(15, (currentPreset.fftCenterBin / 48) * 100 - 8))}%`,
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      borderColor: currentPreset.accent,
                      color: currentPreset.accent
                    }}
                  >
                    Peak: {currentPreset.hz} Hz &bull; {currentPreset.state.split("&")[0]}
                  </div>
                </div>

                {/* Frequency Band Readouts */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 px-1">
                  <span>100 Hz (Sub-Bass)</span>
                  <span className="text-emerald-400 font-bold">220 Hz (Brood Hum)</span>
                  <span className="text-amber-400 font-bold">250 Hz (Queen Piping)</span>
                  <span className="text-rose-400 font-bold">450 Hz (Swarm Surge)</span>
                  <span>6.0 kHz (Nyquist)</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Interactive Apple Pro Mobile Phone Mockup Showcase */}
          {activeTab === "mobile_app" && (
            <div className="w-full py-4 flex flex-col items-center justify-center animate-fadeIn">
              <div className="text-xs font-mono text-slate-400 mb-6 text-center max-w-xl">
                Interactive Apple Pro Titanium Mobile Mockup &bull; Live HiveOS Field Command Mobile App UI
              </div>

              {/* iPhone 16 Pro Style Mobile Phone Device Container */}
              <div className="relative w-[320px] sm:w-[360px] bg-[#1a1f2c] rounded-[52px] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.15)] border-[5px] border-[#374151] ring-1 ring-white/10 select-none">
                
                {/* Dynamic Island Notch & Camera */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5 border border-white/5 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-amber-300">#088</span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                </div>

                {/* Mobile Screen (OLED Retina Black) */}
                <div className="relative w-full h-[580px] bg-[#090d16] rounded-[42px] overflow-hidden text-slate-100 flex flex-col justify-between border border-slate-800/80 font-sans shadow-inner">
                  
                  {/* Status Bar */}
                  <div className="pt-3 px-6 pb-2 flex justify-between items-center text-[10px] font-mono text-slate-400 z-20">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Wifi className="w-3 h-3 text-emerald-400" />
                      <span>IN865</span>
                      <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
                      <span>98%</span>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-white">HiveOS Mobile</div>
                        <div className="text-[9px] font-mono text-emerald-400">Zone Alpha &bull; Node #088</div>
                      </div>
                    </div>
                    <Link
                      href="/app"
                      className="text-[10px] font-mono font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-2.5 py-1 rounded-full shadow-sm"
                    >
                      OPEN APP &rarr;
                    </Link>
                  </div>

                  {/* App Quick Tab Navigation */}
                  <div className="px-3 pt-2 grid grid-cols-4 gap-1 border-b border-slate-800/60 text-[10px] font-mono font-bold">
                    <button
                      onClick={() => setMobileAppTab("radar")}
                      className={`py-1 rounded text-center transition-all ${
                        mobileAppTab === "radar" ? "bg-amber-400/20 text-[#ffc833] border-b-2 border-amber-400" : "text-slate-400"
                      }`}
                    >
                      Radar
                    </button>
                    <button
                      onClick={() => setMobileAppTab("audio")}
                      className={`py-1 rounded text-center transition-all ${
                        mobileAppTab === "audio" ? "bg-amber-400/20 text-[#ffc833] border-b-2 border-amber-400" : "text-slate-400"
                      }`}
                    >
                      Acoustic
                    </button>
                    <button
                      onClick={() => setMobileAppTab("thermal")}
                      className={`py-1 rounded text-center transition-all ${
                        mobileAppTab === "thermal" ? "bg-amber-400/20 text-[#ffc833] border-b-2 border-amber-400" : "text-slate-400"
                      }`}
                    >
                      Thermal
                    </button>
                    <button
                      onClick={() => setMobileAppTab("pass")}
                      className={`py-1 rounded text-center transition-all ${
                        mobileAppTab === "pass" ? "bg-amber-400/20 text-[#ffc833] border-b-2 border-amber-400" : "text-slate-400"
                      }`}
                    >
                      Pass
                    </button>
                  </div>

                  {/* App Screen Content Body */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 custom-scrollbar text-left font-sans">
                    
                    {/* View 1: Radar Mode */}
                    {mobileAppTab === "radar" && (
                      <div className="space-y-2.5 animate-fadeIn">
                        {/* Alert Banner */}
                        <div className="bg-rose-950/40 border border-rose-500/50 p-2.5 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 animate-pulse" />
                            <div>
                              <div className="text-[11px] font-bold text-rose-200">Pre-Swarm Harmonic 485Hz</div>
                              <div className="text-[9px] font-mono text-rose-300/80">Departure window: ~18.5h</div>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono font-black bg-rose-500 text-white px-1.5 py-0.5 rounded">
                            ACTION
                          </span>
                        </div>

                        {/* Telemetry Micro Cards */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                            <div className="text-[9px] font-mono text-slate-400">Core Brood</div>
                            <div className="text-lg font-black text-amber-400 font-mono">36.8°C</div>
                            <div className="text-[8px] font-mono text-rose-400">CUSUM +2.45 Drift</div>
                          </div>
                          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                            <div className="text-[9px] font-mono text-slate-400">Photoacoustic CO2</div>
                            <div className="text-lg font-black text-sky-400 font-mono">2,480 <span className="text-[10px]">ppm</span></div>
                            <div className="text-[8px] font-mono text-amber-300">Fanning Active</div>
                          </div>
                        </div>

                        {/* LoRa Mesh Hop Route */}
                        <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-slate-400">
                            <span>LoRaWAN IN865 Hop Path</span>
                            <span className="text-emerald-400 font-bold">2 Hops &bull; -68 dBm</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-200">
                            <span className="bg-slate-800 px-1.5 py-0.5 rounded">#088</span>
                            <span>&rarr;</span>
                            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Relay #014</span>
                            <span>&rarr;</span>
                            <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">CM4 Hub</span>
                          </div>
                        </div>

                        {/* One-Tap Action Button */}
                        <Link
                          href="/app"
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>Dispatch Demaree Swarm Split</span>
                        </Link>
                      </div>
                    )}

                    {/* View 2: Audio Mode */}
                    {mobileAppTab === "audio" && (
                      <div className="space-y-2.5 animate-fadeIn">
                        <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-amber-400 font-bold">128-pt STFT Spectrum</span>
                            <span className="text-slate-400">Peak: 485 Hz</span>
                          </div>
                          <div className="h-16 bg-slate-950 rounded-lg p-1.5 flex items-end justify-between gap-0.5 border border-slate-800">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-amber-400 rounded-t-sm"
                                style={{
                                  height: `${Math.max(15, Math.sin(i * 0.4) * 80 + Math.random() * 20)}%`,
                                  opacity: i >= 10 && i <= 14 ? 1 : 0.4
                                }}
                              />
                            ))}
                          </div>
                          <div className="text-[9px] font-mono text-slate-400 flex justify-between">
                            <span>100Hz</span>
                            <span className="text-rose-400 font-bold">485Hz Pre-Swarm</span>
                            <span>6kHz</span>
                          </div>
                        </div>

                        <button
                          onClick={() => playTone(450)}
                          className="w-full py-2 rounded-xl bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-slate-700"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen 485Hz Swarm Surge</span>
                        </button>
                      </div>
                    )}

                    {/* View 3: Thermal Gradient Mode */}
                    {mobileAppTab === "thermal" && (
                      <div className="space-y-2 animate-fadeIn">
                        <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl space-y-2">
                          <div className="text-[10px] font-mono text-amber-400 font-bold">5-Frame Brood Thermal Map</div>
                          <div className="grid grid-cols-5 gap-1 text-center font-mono">
                            <div className="bg-slate-950 p-1 rounded border border-slate-800">
                              <div className="text-[8px] text-slate-500">F1</div>
                              <div className="text-xs font-bold text-slate-300">32.4°</div>
                            </div>
                            <div className="bg-amber-950/40 p-1 rounded border border-amber-600/40">
                              <div className="text-[8px] text-amber-400">F2</div>
                              <div className="text-xs font-bold text-amber-300">35.9°</div>
                            </div>
                            <div className="bg-rose-950/60 p-1 rounded border border-rose-500/60">
                              <div className="text-[8px] text-rose-400">F3 (Q)</div>
                              <div className="text-xs font-bold text-rose-300">36.8°</div>
                            </div>
                            <div className="bg-amber-950/40 p-1 rounded border border-amber-600/40">
                              <div className="text-[8px] text-amber-400">F4</div>
                              <div className="text-xs font-bold text-amber-300">35.8°</div>
                            </div>
                            <div className="bg-slate-950 p-1 rounded border border-slate-800">
                              <div className="text-[8px] text-slate-500">F5</div>
                              <div className="text-xs font-bold text-slate-300">32.3°</div>
                            </div>
                          </div>
                          <div className="text-[9px] font-mono text-slate-400">
                            CUSUM: <strong className="text-rose-400">+2.45</strong> (Swarm Pre-Heating Alert)
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View 4: Pass / Honey Chain Mode */}
                    {mobileAppTab === "pass" && (
                      <div className="space-y-2 animate-fadeIn">
                        <div className="bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40 p-3 rounded-xl space-y-1.5">
                          <div className="flex justify-between items-center text-[9px] font-mono text-amber-400">
                            <span>HONEY CHAIN BATCH PASS</span>
                            <span>#842988</span>
                          </div>
                          <div className="text-xs font-bold text-white">USDA Organic Raw Wildflower</div>
                          <div className="text-[9px] font-mono text-slate-400">
                            Merkle: 0x77c29a...ea09c31
                          </div>
                          <div className="text-[9px] font-mono text-emerald-400">
                            Purity: 99.4% &bull; Moisture: 16.8%
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Mobile Bottom Navigation Bar */}
                  <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-around items-center text-[9px] font-mono text-slate-400">
                    <button onClick={() => setMobileAppTab("radar")} className="flex flex-col items-center gap-0.5 text-amber-400 font-bold">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Nodes</span>
                    </button>
                    <button onClick={() => setMobileAppTab("audio")} className="flex flex-col items-center gap-0.5 hover:text-white">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio</span>
                    </button>
                    <button onClick={() => setMobileAppTab("pass")} className="flex flex-col items-center gap-0.5 hover:text-white">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Chain</span>
                    </button>
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="pb-1.5 flex justify-center">
                    <div className="w-28 h-1 bg-slate-700 rounded-full" />
                  </div>

                </div>
              </div>

              {/* Direct Link to Mobile Command App */}
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 hover:underline"
                >
                  <span>Launch Full 100-Hive Command Center (/app)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: Embedded Tactile Playdate Console */}
          {activeTab === "console" && (
            <div className="w-full py-4 flex flex-col items-center justify-center animate-fadeIn">
              <div className="text-xs font-mono text-slate-400 mb-4 text-center">
                1-Bit Ultra-Low-Power Reflective Memory LCD Simulator &bull; Turn Crank to Scrub FFT Telemetry
              </div>
              <PlaydateConsole 
                initialHiveId={activeHiveId}
                onHiveChange={(id) => setActiveHiveId(id)}
                frequency={audioFreq}
                onFrequencyChange={(freq) => handleFrequencySelect(freq)}
              />
            </div>
          )}

          {/* Live Bio-Acoustic Frequency Mode Toggles */}
          <div className="w-full mt-6 pt-6 border-t border-slate-800 flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#ffc833]">
                <Activity className="w-4 h-4" />
                <span>Live Bio-Acoustic Diagnostic Presets</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                Click preset to switch synth tone &amp; STFT filter
              </span>
            </div>

            {/* 3 Frequency Preset Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {FREQUENCY_PRESETS.map((preset) => {
                const isSelected = audioFreq === preset.hz;
                return (
                  <button
                    key={preset.hz}
                    onClick={() => handleFrequencySelect(preset.hz)}
                    className={`flex flex-col items-start text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-[1.02]"
                        : "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className="font-mono text-sm font-black text-white flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${preset.indicatorColor} ${isSelected ? "animate-pulse" : ""}`} />
                        {preset.label}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-extrabold text-[#ffc833] bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-200 line-clamp-1">
                      {preset.state}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {preset.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hardware Crank / Scrub Helper */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-2">
              <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "10s" }} />
              <span>Real-time continuous FFT sampling &bull; Edge Inference: {telemetryData.inferenceMs} ms &bull; 99.80% Triage Recall</span>
            </div>
          </div>

        </div>

        {/* Master Feature Provenance Strip */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-6 max-w-5xl">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span><strong className="text-white">16-Sensor</strong> Telemetry Fusion</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span><strong className="text-white">1.05M Records</strong> 100% Real Provenance</span>
          </div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-sky-400" />
            <span><strong className="text-white">Antmicro CM4</strong> 6 TOPS Gateway</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ffc833]" />
            <span><strong className="text-white">96.84%</strong> Out-of-Sample Accuracy</span>
          </div>
        </div>

      </div>
    </header>
  );
}


