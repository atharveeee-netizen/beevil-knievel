"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, RotateCw, Activity, ShieldCheck, Zap, Thermometer, Radio } from "lucide-react";

export function HeroSection() {
  const [telemetryMode, setTelemetryMode] = useState<"healthy" | "swarm" | "queen" | "temp">("healthy");
  const [crankAngle, setCrankAngle] = useState(0);

  const TELEMETRY_STATES = {
    healthy: {
      status: "COLONY HEALTHY",
      freq: "220 Hz",
      temp: "34.8°C",
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      desc: "Optimal Brood Thermoregulation & Foraging Hum",
    },
    swarm: {
      status: "SWARM IMMINENT",
      freq: "450 Hz",
      temp: "36.2°C",
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      desc: "24-Hour Departure Early Warning Triggered",
    },
    queen: {
      status: "QUEEN ACTIVE",
      freq: "250 Hz",
      temp: "35.0°C",
      color: "text-[#ffc833]",
      bg: "bg-[#ffc833]/20",
      desc: "Virgin Queen Piping & Oviposition Pattern",
    },
    temp: {
      status: "16-SENSOR FUSION",
      freq: "96.84% Acc",
      temp: "±0.08°C",
      color: "text-sky-400",
      bg: "bg-sky-500/20",
      desc: "TMP117 + SHT45 + BME688 + I2S Acoustic Core",
    },
  };

  const cycleTelemetry = () => {
    const modes: Array<"healthy" | "swarm" | "queen" | "temp"> = ["healthy", "swarm", "queen", "temp"];
    const nextIdx = (modes.indexOf(telemetryMode) + 1) % modes.length;
    setTelemetryMode(modes[nextIdx]);
    setCrankAngle((prev) => prev + 90);
  };

  const current = TELEMETRY_STATES[telemetryMode];

  return (
    <header className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#7a8085] text-white flex flex-col items-center">
      {/* Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[600px] sm:h-[800px] pointer-events-none -z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(122, 128, 133, 0) 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        {/* IEEE Challenge Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1d1c18] border border-white/20 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#ffc833] uppercase tracking-wider mb-6 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>IEEE HardwAIre Challenge Phase 2 Standard</span>
        </div>

        {/* Intro Copy */}
        <p className="text-xl sm:text-2xl md:text-3xl font-bold max-w-3xl leading-snug tracking-tight text-white mb-6">
          Autonomous Edge-AI Environmental &amp; Acoustic Health Monitoring System for Precision Apiculture.
        </p>

        {/* Interactive 3D Sensor Node Display */}
        <div className="relative my-4 sm:my-8 group">
          {/* Main Chassis */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-[#ffc833] rounded-[28px] shadow-2xl border-4 border-[#e5b329] flex flex-col justify-between p-4 transform transition-transform duration-300 hover:rotate-1 hover:scale-105 select-none text-[#312f28]">
            
            {/* Top Status Bar */}
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#312f28]/70">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#312f28]" />
                <span>LoRa 868/915 MHz</span>
              </div>
              <div className="text-[10px] tracking-widest font-mono font-bold text-[#312f28]/75 uppercase">
                Antmicro CM4
              </div>
            </div>

            {/* 1-Bit Reflective Telemetry Screen */}
            <div className="relative w-full h-36 sm:h-40 bg-[#312f28] rounded-xl border-2 border-black/30 shadow-inner flex flex-col items-center justify-center p-3 overflow-hidden text-white">
              {/* Scanline Grid */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4px_4px]" />
              
              {/* Telemetry Display */}
              <div className="relative z-10 text-center w-full space-y-1">
                <div className={`inline-block text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full ${current.bg} ${current.color}`}>
                  {current.status}
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-extrabold tracking-wider text-[#ffc833]">
                  {current.freq}
                </div>
                <div className="text-[11px] font-mono text-white/70 truncate px-2">
                  {current.desc}
                </div>
              </div>

              {/* Little Footer stats */}
              <div className="absolute bottom-1.5 left-3 right-3 flex justify-between items-center text-[9px] font-mono text-white/50 border-t border-white/10 pt-1">
                <span>Temp: {current.temp}</span>
                <span>Solar: 100%</span>
                <span>Latency: 3.35ms</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex justify-between items-center px-1 pb-1">
              {/* Mode Toggle Button */}
              <button
                onClick={cycleTelemetry}
                className="bg-[#312f28] text-white hover:bg-black px-3 py-1.5 rounded-full text-xs font-mono font-bold shadow-md active:scale-95 transition-transform flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-[#ffc833]" />
                <span>Next Telemetry</span>
              </button>

              {/* Quick Status Pill */}
              <div className="text-[10px] font-mono font-extrabold bg-[#312f28]/15 px-2.5 py-1 rounded-full text-[#312f28]">
                96.84% ACC
              </div>
            </div>

            {/* Interactive Physical Dial on Right */}
            <div
              onClick={cycleTelemetry}
              className="absolute -right-8 top-32 cursor-pointer group/crank flex items-center select-none"
              title="Click to rotate telemetry state!"
            >
              <div
                className="relative w-10 h-10 transition-transform duration-300"
                style={{ transform: `rotate(${crankAngle}deg)` }}
              >
                <div className="absolute top-4 left-0 w-8 h-2 bg-gradient-to-r from-gray-400 to-gray-200 rounded-full shadow-md" />
                <div className="absolute top-2 right-0 w-6 h-6 rounded-full bg-[#ffc833] border-2 border-[#312f28] shadow-lg flex items-center justify-center group-hover/crank:scale-110 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#312f28]" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-white/80 mt-3 flex items-center justify-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Click &ldquo;Next Telemetry&rdquo; or turn dial to cycle live hive states</span>
          </div>
        </div>

        {/* Beevil Knievel Logotype */}
        <div className="my-6 sm:my-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-md">
            Beevil Knievel<span className="text-2xl sm:text-3xl align-super ml-1 font-semibold text-[#ffc833]">®</span>
          </h1>
        </div>

        {/* 3D Purple Order Button */}
        <div className="mt-2 mb-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="#all-for-just"
            className="btn-order-purple"
          >
            Pre-Order Node for $189.
          </Link>
          <Link
            href="#edge_ai"
            className="btn-pill-black border-2 border-white/20 hover:border-[#ffc833] text-base sm:text-lg"
          >
            Explore 96.84% Edge AI
          </Link>
        </div>

        <p className="text-xs text-white/70 tracking-wide mt-2">
          16 Multi-Sensor Telemetry • 100% Real-World Provenance • Antmicro CM4 Gateway Master Architecture
        </p>
      </div>
    </header>
  );
}
