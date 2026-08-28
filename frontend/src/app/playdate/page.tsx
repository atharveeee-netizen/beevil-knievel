"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlaydateConsole } from "@/components/PlaydateConsole";
import { ArrowLeft, Volume2, Sparkles, Radio } from "lucide-react";

export default function PlaydatePage() {
  const [selectedHive, setSelectedHive] = useState<number>(42);
  const [activeMode, setActiveMode] = useState<"fft" | "sensors" | "ai" | "mesh">("fft");

  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#f4f4f6] flex flex-col items-center justify-between p-4 sm:p-8 font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Top Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between border-b border-[#222738] pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8a90a0] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO PRODUCT PORTAL</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f0b840] animate-pulse" />
          <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">
            TEENAGE ENGINEERING × PLAYDATE CONSOLE
          </span>
        </div>

        <Link
          href="/app"
          className="px-3 py-1.5 rounded-sm bg-[#12151e] border border-[#222738] text-xs font-mono text-[#f0b840] hover:border-amber-400 transition-all font-bold"
        >
          OPEN FIELD APP (/app)
        </Link>
      </header>

      {/* Main Console Stage */}
      <main className="flex-1 flex flex-col items-center justify-center my-8 space-y-6 w-full max-w-2xl text-center">
        
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#8a90a0] uppercase tracking-widest bg-[#12151e] border border-[#222738] px-3 py-1 rounded-full">
            RETRO PHYSICAL HARDWARE TELEMETRY INSTRUMENT
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Beevil Playdate Field Console
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#8a90a0] max-w-lg mx-auto">
            Interactive 1-bit high-contrast memory LCD telemetry emulator with mechanical crank scrolling, live Web Audio acoustic synthesis, and 4 sensor modes.
          </p>
        </div>

        {/* Console Presets Switcher */}
        <div className="flex flex-wrap justify-center gap-2 text-xs font-mono">
          {[
            { id: 42, label: "Hive #042 (Pre-Swarm 380Hz)" },
            { id: 15, label: "Hive #015 (Queenless 285Hz)" },
            { id: 73, label: "Hive #073 (Nominal 225Hz)" },
            { id: 88, label: "Hive #088 (Swarm Surge 450Hz)" },
          ].map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHive(h.id)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedHive === h.id
                  ? "bg-amber-400 text-black border-amber-400 font-extrabold shadow-md shadow-amber-500/20"
                  : "bg-[#12151e] text-[#8a90a0] border-[#222738] hover:text-white"
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>

        {/* The Interactive Playdate Hardware Console */}
        <div className="py-4 flex items-center justify-center scale-95 sm:scale-100 transition-transform">
          <PlaydateConsole
            initialHiveId={selectedHive}
            activeMode={activeMode}
            onModeChange={setActiveMode}
          />
        </div>

        {/* Physical Instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl text-left font-mono text-[11px] bg-[#12151e] border border-[#222738] p-4 rounded-xl">
          <div className="space-y-1">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mechanical Crank</span>
            </div>
            <p className="text-[#8a90a0]">Drag the metal crank handle to rotate and tune frequency/hives in real time.</p>
          </div>
          <div className="space-y-1">
            <div className="text-[#06b6d4] font-bold flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Web Audio Synth</span>
            </div>
            <p className="text-[#8a90a0]">Click UNMUTE to synthesize authentic bio-acoustic colony resonance frequencies.</p>
          </div>
          <div className="space-y-1">
            <div className="text-[#2ea043] font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              <span>4 Modality Modes</span>
            </div>
            <p className="text-[#8a90a0]">Use A/B buttons or D-Pad to toggle between FFT, 5-Frame Brood, AI, and Mesh.</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center text-[10px] font-mono text-[#8a90a0] pt-4 border-t border-[#222738]">
        BEEVIL KNIEVEL × PLAYDATE • NORDIC NRF52840 + SEMTECH SX1262 TELEMETRY EMULATOR
      </footer>

    </div>
  );
}
