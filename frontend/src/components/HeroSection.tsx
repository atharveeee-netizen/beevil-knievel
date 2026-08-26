"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Activity, 
  Volume2, 
  VolumeX, 
  Laptop, 
  ArrowRight,
  ChevronRight,
  Thermometer,
  Scale,
  Gauge,
  Smartphone,
  Layers,
  Radio
} from "lucide-react";
import { 
  SpotlightCard, 
  DecryptedText, 
  CountUp, 
  TiltedCard,
  ClickSpark,
  Magnet
} from "@/components/reactbits";

export function HeroSection() {
  const [audioFreq, setAudioFreq] = useState<number>(220);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [telemetryTick, setTelemetryTick] = useState(0);
  const [mobileAppTab, setMobileAppTab] = useState<"radar" | "audio" | "thermal" | "pass">("radar");

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Periodic telemetry micro-fluctuations for realistic empirical live stream
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTick((prev) => (prev + 1) % 1000);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const telemetryData = useMemo(() => {
    const jitter1 = Math.sin(telemetryTick * 0.4) * 0.02;
    const jitter2 = Math.cos(telemetryTick * 0.3) * 5;
    const jitter3 = Math.sin(telemetryTick * 0.5) * 0.03;
    const jitter4 = Math.cos(telemetryTick * 0.4) * 0.2;

    return {
      broodTemp: (34.82 + jitter1).toFixed(2),
      co2: Math.round(1140 + jitter2),
      scaleDelta: (1.84 + jitter3).toFixed(2),
      humidity: (58.4 + jitter4).toFixed(1),
      nodeRssi: -64 + Math.round(Math.sin(telemetryTick) * 2),
      inferenceMs: (8.20 + Math.sin(telemetryTick) * 0.15).toFixed(2)
    };
  }, [telemetryTick]);

  const FREQUENCY_PRESETS = [
    {
      hz: 220,
      label: "220 Hz Nominal Colony Hum",
      state: "Brood Nest Homeostasis (34.8°C)",
      desc: "Baseline queenright core hum. Eliminates back-breaking 40kg brood box lifting in 38°C heat with NIST-traceable TI TMP117 (±0.05°C) & TDK INMP441 24-bit I2S MEMS mic.",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      accent: "#10b981",
      fftCenterBin: 24,
    },
    {
      hz: 250,
      label: "250 Hz Queen Piping Pulse",
      state: "Virgin Queen Emergence & Oviposition",
      desc: "Characteristic acoustic signature during virgin queen emergence. Detect supersedure and queen loss weeks before the colony dwindles (128-pt CMSIS-DSP FFT on Cortex-M4F).",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      accent: "#f59e0b",
      fftCenterBin: 32,
    },
    {
      hz: 450,
      label: "450 Hz Swarm Alert Surge",
      state: "Pre-Swarm Harmonic Escalation (72h Window)",
      desc: "Acoustic energy density spike preceding colony departure split. Catches swarms 72 hours before 20,000 bees leave for the tree canopy. Automated LoRaWAN IN865 alert dispatch.",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      accent: "#f43f5e",
      fftCenterBin: 56,
    },
  ];

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
      masterGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // LFO for wingbeat flutter (6.2 Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(6.2, now);
      lfoGain.gain.setValueAtTime(0.015, now);
      lfo.connect(lfoGain.gain);
      lfo.start();
      lfoRef.current = lfo;

      // Multi-harmonic oscillator array: Fundamental + Sub-Octave + 2nd Harmonic + Detune
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

      // 2. Sub-Octave
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

      // 4. Detune flutter
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
      }, 7000);
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

  // 128-pt FFT Spectrum Bar Heights Generator (48 bins displayed)
  const fftBars = useMemo(() => {
    const bars: number[] = [];
    const peakBin = currentPreset.fftCenterBin;

    for (let i = 0; i < 48; i++) {
      const distFromPeak = Math.abs(i - peakBin);
      const primaryEnergy = Math.exp(-(distFromPeak * distFromPeak) / 12) * 82;
      
      const harmonicBin = peakBin * 1.8;
      const distFromHarmonic = Math.abs(i - harmonicBin);
      const harmonicEnergy = Math.exp(-(distFromHarmonic * distFromHarmonic) / 8) * 42;

      const noise = (Math.sin(i * 1.7 + telemetryTick * 0.8) * 5) + (Math.cos(i * 2.3 + telemetryTick * 0.5) * 3) + 10;
      const rawHeight = Math.max(8, Math.min(95, primaryEnergy + harmonicEnergy + noise));
      bars.push(rawHeight);
    }
    return bars;
  }, [currentPreset, telemetryTick]);

  return (
    <header className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#070a12] text-[#f8fafc]">
      {/* Background Precision Grid & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{
            backgroundImage: "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1200px] h-[500px] sm:h-[700px] bg-radial from-amber-500/10 via-slate-800/5 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* 1. Single Subtle Top Pill (Master Prompt Standard) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#161616] border border-amber-500/30 text-xs font-mono tracking-wider text-[#94a3b8] mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]" />
          </span>
          <span className="text-white font-bold">BEEVIL KNIEVEL</span>
          <span className="text-zinc-600">•</span>
          <span className="text-[#f59e0b] uppercase tracking-widest text-[11px] font-bold">EDGE-AI COLONY INTELLIGENCE</span>
        </div>

        {/* 2. Master Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f8fafc] max-w-4xl leading-[1.08] mb-5 font-sans uppercase">
          Know what your hives know.
        </h1>

        {/* 3. Crisp Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#94a3b8] max-w-3xl leading-relaxed font-mono mb-8">
          Beevil Knievel is an edge-AI colony intelligence system that continuously monitors hive health, detects anomalies and helps beekeepers act before problems become visible.
        </p>

        {/* 4. Clean Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-14">
          <Magnet padding={25} magnetStrength={2} className="w-full sm:w-auto">
            <ClickSpark sparkColor="#f59e0b" sparkCount={8} sparkRadius={25}>
              <Link
                href="/#the-signal"
                id="hero-explore-system"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#f59e0b] hover:bg-[#fbbf24] text-[#070a12] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-all whitespace-nowrap"
              >
                <span>Explore the system</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5] text-[#070a12]" />
              </Link>
            </ClickSpark>
          </Magnet>

          <ClickSpark sparkColor="#94a3b8" sparkCount={6}>
            <Link
              href="/app"
              id="hero-open-field-console"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#161616] hover:bg-[#262626] border border-white/10 hover:border-white/20 text-[#f8fafc] font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
            >
              <Laptop className="w-4 h-4 text-[#94a3b8]" />
              <span>Open field console</span>
            </Link>
          </ClickSpark>
        </div>

        {/* 5. Linear-Style Bento Grid (Zero Clutter) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 text-left">
          
          {/* CARD A (Large - 8 cols on desktop): 128-pt FFT Bio-Acoustic Spectrogram & Web Audio Synthesizer */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.12)"
            className="lg:col-span-8 bg-[#0b0f19]/90 border-white/10 p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#0f172a] border border-white/10 text-amber-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#f59e0b]">
                      Card A • Acoustic Spectral Engine
                    </div>
                    <div className="text-sm font-bold text-[#f8fafc]">
                      128-pt FFT Bio-Acoustic Spectrogram &amp; Web Audio Player
                    </div>
                  </div>
                </div>

                {/* Synthesis Control Button */}
                <button
                  onClick={() => playTone(audioFreq)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    isPlayingAudio
                      ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse"
                      : "bg-[#0f172a] hover:bg-slate-800 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop Synthesizer</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Play {audioFreq} Hz Audio</span>
                    </>
                  )}
                </button>
              </div>

              {/* 48-Bar Dynamic Spectrum Visualizer */}
              <div className="relative h-28 sm:h-32 w-full bg-[#070a12] rounded-xl border border-white/5 p-2 sm:p-3 flex items-end justify-between gap-1 overflow-hidden my-4">
                {/* Visualizer Gridlines */}
                <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-col justify-between p-2">
                  <div className="w-full border-b border-slate-700 border-dashed text-[8px] font-mono text-slate-500 text-right">0 dB</div>
                  <div className="w-full border-b border-slate-700 border-dashed text-[8px] font-mono text-slate-500 text-right">-12 dB</div>
                  <div className="w-full border-b border-slate-700 border-dashed text-[8px] font-mono text-slate-500 text-right">-24 dB</div>
                </div>

                {/* 48 Spectrum Bars */}
                {fftBars.map((height, idx) => {
                  const isPeakZone = Math.abs(idx - currentPreset.fftCenterBin) <= 2;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full z-10">
                      <div
                        style={{
                          height: `${height}%`,
                          backgroundColor: isPeakZone 
                            ? currentPreset.accent 
                            : `rgba(148, 163, 184, ${0.25 + (height / 100) * 0.4})`,
                          boxShadow: isPeakZone ? `0 0 10px ${currentPreset.accent}` : "none"
                        }}
                        className="w-full rounded-t-sm transition-all duration-150"
                      />
                    </div>
                  );
                })}

                {/* Peak Floating Callout */}
                <div 
                  className="absolute top-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold border backdrop-blur-md pointer-events-none transition-all duration-300"
                  style={{
                    left: `${Math.min(72, Math.max(12, (currentPreset.fftCenterBin / 48) * 100 - 8))}%`,
                    backgroundColor: "rgba(11, 15, 25, 0.9)",
                    borderColor: currentPreset.accent,
                    color: currentPreset.accent
                  }}
                >
                  Peak: {currentPreset.hz} Hz
                </div>
              </div>
            </div>

            {/* 3 Preset Switchers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              {FREQUENCY_PRESETS.map((preset) => {
                const isSelected = audioFreq === preset.hz;
                return (
                  <button
                    key={preset.hz}
                    onClick={() => handleFrequencySelect(preset.hz)}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0f172a] border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                        : "bg-[#070a12]/60 border-white/5 hover:border-white/10 hover:bg-[#0f172a]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-mono text-xs font-bold text-[#f8fafc]">
                        {preset.label.split(" ")[0]} {preset.label.split(" ")[1]}
                      </span>
                      {isSelected && (
                        <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/30">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#94a3b8] leading-tight line-clamp-1">
                      {preset.state}
                    </span>
                  </button>
                );
              })}
            </div>
          </SpotlightCard>

          {/* CARD F (Interactive - 4 cols on desktop): iPhone 16 Pro Field Companion in TiltedCard */}
          <div className="lg:col-span-4 flex flex-col">
            <TiltedCard maxTilt={8} className="h-full w-full p-0 border-none bg-transparent shadow-none">
              <div className="h-full w-full bg-[#0b0f19]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#0f172a] border border-white/10 text-amber-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f59e0b]">
                        Card F • Field App
                      </div>
                      <div className="text-xs font-bold text-[#f8fafc]">iPhone 16 Pro Mockup</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    LIVE
                  </span>
                </div>

                {/* iPhone Retina Frame */}
                <div className="my-3 bg-[#070a12] border border-white/10 rounded-2xl p-3 shadow-inner space-y-2.5">
                  {/* Dynamic Island Notch */}
                  <div className="w-24 h-4 bg-black rounded-full mx-auto flex items-center justify-between px-2 text-[8px] font-mono text-amber-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>#088</span>
                  </div>

                  {/* App Mini Tabs */}
                  <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-center">
                    {(["radar", "audio", "thermal", "pass"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setMobileAppTab(tab)}
                        className={`py-1 rounded capitalize transition-all cursor-pointer ${
                          mobileAppTab === tab
                            ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                            : "text-[#94a3b8] hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Body */}
                  {mobileAppTab === "radar" && (
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="p-2 rounded-lg bg-[#0f172a] border border-white/5 flex justify-between items-center">
                        <span className="text-[#94a3b8]">Brood Core:</span>
                        <span className="text-amber-400 font-bold">{telemetryData.broodTemp}°C</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0f172a] border border-white/5 flex justify-between items-center">
                        <span className="text-[#94a3b8]">NDIR CO2:</span>
                        <span className="text-sky-400 font-bold">{telemetryData.co2} ppm</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0f172a] border border-white/5 flex justify-between items-center">
                        <span className="text-[#94a3b8]">LoRaWAN Link:</span>
                        <span className="text-emerald-400 font-bold">{telemetryData.nodeRssi} dBm</span>
                      </div>
                    </div>
                  )}

                  {mobileAppTab === "audio" && (
                    <div className="p-2.5 rounded-lg bg-[#0f172a] border border-white/5 space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-[#94a3b8] text-[10px]">
                        <span>FFT Peak:</span>
                        <span className="text-amber-400 font-bold">{audioFreq} Hz</span>
                      </div>
                      <div className="text-[11px] text-[#f8fafc] font-semibold line-clamp-2">
                        {currentPreset.state}
                      </div>
                    </div>
                  )}

                  {mobileAppTab === "thermal" && (
                    <div className="p-2 rounded-lg bg-[#0f172a] border border-white/5 space-y-1 text-xs font-mono">
                      <div className="text-[10px] text-[#94a3b8]">5-Frame Thermal Array:</div>
                      <div className="grid grid-cols-5 gap-1 text-[9px] text-center font-bold">
                        <span className="bg-slate-900 p-1 rounded text-slate-400">32.4°</span>
                        <span className="bg-amber-950/40 p-1 rounded text-amber-300">34.6°</span>
                        <span className="bg-rose-950/60 p-1 rounded text-rose-300">34.8°</span>
                        <span className="bg-amber-950/40 p-1 rounded text-amber-300">34.6°</span>
                        <span className="bg-slate-900 p-1 rounded text-slate-400">32.3°</span>
                      </div>
                    </div>
                  )}

                  {mobileAppTab === "pass" && (
                    <div className="p-2 rounded-lg bg-[#0f172a] border border-white/5 space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-[10px] text-[#94a3b8]">
                        <span>BATCH #842988</span>
                        <span className="text-emerald-400 font-bold">VERIFIED</span>
                      </div>
                      <div className="text-[10px] text-amber-300 font-bold truncate">
                        <DecryptedText text="0x77c29a8f44d180b0" speed={30} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct App Link */}
                <Link
                  href="/app"
                  className="w-full py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 border border-white/10 text-xs font-mono font-bold text-center flex items-center justify-center gap-1.5 text-[#f8fafc] hover:text-amber-400 transition-colors"
                >
                  <span>Open Full Dashboard (/app)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </TiltedCard>
          </div>

          {/* CARD B (Medium - 3 cols on desktop): Brood Core Homeostasis with TI TMP117 */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.15)"
            className="lg:col-span-3 bg-[#0b0f19]/90 border-white/10 p-5 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[#94a3b8] mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f59e0b]">
                  Card B • Brood Core
                </span>
                <Thermometer className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs font-medium text-[#94a3b8]">TI TMP117 RTD Sensor</div>
              <div className="text-3xl font-mono font-bold text-[#f8fafc] my-2 tabular-nums">
                <CountUp to={Number(telemetryData.broodTemp)} decimals={2} duration={1} />
                <span className="text-base text-amber-400 font-normal ml-1">°C</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ±0.05°C NIST Traceable
              </span>
              <span className="text-slate-500">Brood Core Lock</span>
            </div>
          </SpotlightCard>

          {/* CARD C (Medium - 3 cols on desktop): 24-Bit Nectar Flow Scale with Avia HX711 */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.15)"
            className="lg:col-span-3 bg-[#0b0f19]/90 border-white/10 p-5 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[#94a3b8] mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Card C • Nectar Flow
                </span>
                <Scale className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs font-medium text-[#94a3b8]">Avia HX711 24-Bit ADC</div>
              <div className="text-3xl font-mono font-bold text-emerald-400 my-2 tabular-nums">
                <CountUp to={Number(telemetryData.scaleDelta)} decimals={2} duration={1} prefix="+" />
                <span className="text-base text-[#f8fafc] font-normal ml-1">kg/d</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#94a3b8]">200kg Load Cell</span>
              <span className="text-emerald-400 font-semibold">Zero Box Lifting</span>
            </div>
          </SpotlightCard>

          {/* CARD D (Compact - 3 cols on desktop): Sensirion SCD41 Photoacoustic NDIR CO2 */}
          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.15)"
            className="lg:col-span-3 bg-[#0b0f19]/90 border-white/10 p-5 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[#94a3b8] mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
                  Card D • Respiration
                </span>
                <Gauge className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xs font-medium text-[#94a3b8]">Sensirion SCD41 NDIR</div>
              <div className="text-3xl font-mono font-bold text-[#f8fafc] my-2 tabular-nums">
                <CountUp to={telemetryData.co2} duration={1} />
                <span className="text-sm text-sky-400 font-normal ml-1">ppm</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-sky-400 font-semibold">±40 ppm Precision</span>
              <span className="text-slate-500">Photoacoustic</span>
            </div>
          </SpotlightCard>

          {/* CARD E (Compact - 3 cols on desktop): Semtech SX1262 LoRaWAN IN865 Sub-GHz Mesh */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.15)"
            className="lg:col-span-3 bg-[#0b0f19]/90 border-white/10 p-5 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[#94a3b8] mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  Card E • Sub-GHz Mesh
                </span>
                <Radio className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs font-medium text-[#94a3b8]">Semtech SX1262 IN865</div>
              <div className="text-3xl font-mono font-bold text-[#f8fafc] my-2 tabular-nums">
                15<span className="text-base text-amber-400 font-normal ml-0.5">km</span>
                <span className="text-xs font-mono text-slate-500 font-normal ml-2">/ 99.8%</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                100/100 Field Hives
              </span>
              <span className="text-slate-400">42°C Tested</span>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </header>
  );
}
