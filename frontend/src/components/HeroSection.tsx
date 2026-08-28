"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Layers
} from "lucide-react";
import { PlaydateConsole } from "@/components/PlaydateConsole";

export function HeroSection() {
  const [audioFreq, setAudioFreq] = useState<number>(220);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeHiveId, setActiveHiveId] = useState(1);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const FREQUENCY_PRESETS = [
    {
      hz: 220,
      label: "220 Hz Healthy",
      state: "Optimal Colony Foraging & Brood Care",
      desc: "Baseline colony hum in queenright brood nest at 34.8°C",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      indicatorColor: "bg-emerald-400",
    },
    {
      hz: 450,
      label: "450 Hz Swarm Alert",
      state: "Pre-Swarm Harmonic Escalation",
      desc: "24-Hour departure early warning triggered by acoustic surge",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      indicatorColor: "bg-amber-400",
    },
    {
      hz: 250,
      label: "250 Hz Queen Piping",
      state: "Virgin Queen Piping & Oviposition",
      desc: "High-frequency G-clef pulse from newly emerged virgin queen",
      badgeColor: "bg-[#ffc833]/20 text-[#ffc833] border-[#ffc833]/40",
      indicatorColor: "bg-[#ffc833]",
    },
  ];

  // Stop audio oscillator safely
  const stopAudio = () => {
    try {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.05);
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
            oscillatorRef.current = null;
          }
        }, 80);
      }
    } catch {
      // ignore
    }
    setIsPlayingAudio(false);
  };

  // Play bio-acoustic frequency tone with harmonics
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

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlayingAudio(true);

      // Auto-stop after 4 seconds to be gentle on user ears
      setTimeout(() => {
        stopAudio();
      }, 4000);
    } catch {
      // Audio not permitted or supported in this context
      setIsPlayingAudio(false);
    }
  };

  const handleFrequencySelect = (freq: number) => {
    setAudioFreq(freq);
    if (isPlayingAudio && oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setTargetAtTime(freq, audioContextRef.current.currentTime, 0.05);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const currentPreset = FREQUENCY_PRESETS.find((p) => p.hz === audioFreq) || FREQUENCY_PRESETS[0];

  return (
    <header className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#7a8085] text-white flex flex-col items-center">
      {/* Radial Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[700px] sm:h-[900px] pointer-events-none -z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(122, 128, 133, 0) 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* IEEE Challenge Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1d1c18] border border-white/20 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#ffc833] uppercase tracking-wider mb-6 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>IEEE HardwAIre Challenge Phase 2 Standard</span>
        </div>

        {/* Headline Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl font-bold max-w-4xl leading-snug tracking-tight text-white mb-4">
          Autonomous Edge-AI Environmental &amp; Acoustic Health Monitoring System for Precision Apiculture.
        </p>

        {/* Beevil Knievel Logotype */}
        <div className="my-3 sm:my-5">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-md">
            Beevil Knievel<span className="text-2xl sm:text-3xl align-super ml-1 font-semibold text-[#ffc833]">®</span>
          </h1>
        </div>

        {/* Direct High-Visibility CTA Bar */}
        <div className="mt-2 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-2xl">
          {/* Main Primary CTA: Launch HiveOS App */}
          <Link
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#ffc833] via-[#ffd659] to-[#ffc833] text-[#212223] hover:text-black font-extrabold text-base sm:text-lg px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(255,200,51,0.4),0_0_0_2px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_35px_rgba(255,200,51,0.6),0_0_0_3px_rgba(255,255,255,0.8)] hover:scale-105 active:scale-95 transition-all uppercase tracking-wide group"
          >
            <Laptop className="w-6 h-6 stroke-[2.5] text-[#212223] group-hover:rotate-12 transition-transform" />
            <span className="font-black">LAUNCH HIVEOS APP (/app)</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="#all-for-just"
              className="btn-order-purple text-base sm:text-lg whitespace-nowrap !py-2.5 !px-6"
            >
              Pre-Order $189
            </Link>
            <Link
              href="#edge_ai"
              className="btn-pill-black border-2 border-white/20 hover:border-[#ffc833] text-sm sm:text-base whitespace-nowrap !py-2.5 !px-5"
            >
              96.84% AI
            </Link>
          </div>
        </div>

        {/* Centerpiece: Interactive PlaydateConsole & Frequency Controls */}
        <div className="w-full max-w-4xl bg-[#212223]/70 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl my-4 flex flex-col items-center">
          
          {/* Header over Console */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#ffc833] animate-pulse" />
              <span className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                Interactive Playdate Field Console
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/70">
              <span>Node: #{String(activeHiveId).padStart(3, "0")}</span>
              <span>•</span>
              <span className="text-[#ffc833] font-bold">1-Bit Reflective Telemetry</span>
            </div>
          </div>

          {/* Embedded Playdate Console */}
          <div className="py-2 flex justify-center">
            <PlaydateConsole 
              initialHiveId={activeHiveId}
              onHiveChange={(id) => setActiveHiveId(id)}
              frequency={audioFreq}
              onFrequencyChange={(freq) => setAudioFreq(freq)}
            />
          </div>

          {/* Live Audio Frequency Toggles */}
          <div className="w-full mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-full max-w-2xl px-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#ffc833]">
                <Activity className="w-4 h-4" />
                <span>Live Bio-Acoustic Frequency Presets</span>
              </div>
              
              {/* Sound Preview Button */}
              <button
                onClick={() => playTone(audioFreq)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  isPlayingAudio
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                title="Play bio-acoustic frequency tone"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Mute Tone</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#ffc833]" />
                    <span>Listen ({audioFreq} Hz)</span>
                  </>
                )}
              </button>
            </div>

            {/* 3 Frequency Toggle Buttons: 220Hz healthy, 450Hz swarm, 250Hz queen */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
              {FREQUENCY_PRESETS.map((preset) => {
                const isSelected = audioFreq === preset.hz;
                return (
                  <button
                    key={preset.hz}
                    onClick={() => handleFrequencySelect(preset.hz)}
                    className={`flex flex-col items-start text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-[#312f28] border-[#ffc833] ring-2 ring-[#ffc833]/50 shadow-lg scale-102"
                        : "bg-black/30 border-white/10 hover:border-white/30 hover:bg-black/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-mono text-sm font-black text-white flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${preset.indicatorColor} ${isSelected ? "animate-ping" : ""}`} />
                        {preset.label}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-bold text-[#ffc833] bg-[#ffc833]/15 px-1.5 py-0.5 rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-white/80 line-clamp-1">
                      {preset.state}
                    </div>
                    <div className="text-[9px] font-mono text-white/50 mt-1 line-clamp-1">
                      {preset.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-white/70 mt-1">
              <RotateCw className="w-3.5 h-3.5 text-[#ffc833] animate-spin" style={{ animationDuration: "8s" }} />
              <span>Turn hardware crank on right or click frequency presets above to scrub FFT audio</span>
            </div>
          </div>
        </div>

        {/* Feature Provenance Bar */}
        <div className="mt-4 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs font-mono text-white/80">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#ffc833]" />
            <span>16 Multi-Sensor Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Real-World Provenance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span>Antmicro CM4 6 TOPS Gateway</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#ffc833]" />
            <span>96.84% Out-of-Sample Accuracy</span>
          </div>
        </div>
      </div>
    </header>
  );
}
