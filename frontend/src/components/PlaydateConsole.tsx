"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Radio, 
  Volume2, 
  VolumeX,
  RotateCw, 
  Activity, 
  Thermometer, 
  Zap, 
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Crown,
  Cpu,
  Share2,
  Sparkles,
  Wifi,
  QrCode
} from "lucide-react";

export interface PlaydateConsoleProps {
  initialHiveId?: number;
  onHiveChange?: (hiveId: number) => void;
  onOpenLedgerModal?: () => void;
  compact?: boolean;
  frequency?: number;
  onFrequencyChange?: (freq: number) => void;
  activeMode?: "fft" | "sensors" | "ai" | "mesh";
  onModeChange?: (mode: "fft" | "sensors" | "ai" | "mesh") => void;
}

export function PlaydateConsole({ 
  initialHiveId = 1, 
  onHiveChange,
  onOpenLedgerModal,
  compact = false,
  frequency,
  onFrequencyChange,
  activeMode,
  onModeChange,
}: PlaydateConsoleProps) {
  const [hiveId, setHiveId] = useState<number>(initialHiveId);
  const [crankAngle, setCrankAngle] = useState<number>(0);
  const [internalTab, setInternalTab] = useState<"fft" | "sensors" | "ai" | "mesh">("fft");
  const [internalFreq, setInternalFreq] = useState<number>(frequency || 220);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isDpadActive, setIsDpadActive] = useState<string | null>(null);

  const activeTab = activeMode !== undefined ? activeMode : internalTab;
  const currentFreq = frequency !== undefined ? frequency : internalFreq;

  const crankRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setHiveId(initialHiveId);
  }, [initialHiveId]);

  useEffect(() => {
    if (frequency !== undefined) {
      setInternalFreq(frequency);
    }
  }, [frequency]);

  // Sync simulated dominant frequency based on hive ID if frequency prop not forced
  useEffect(() => {
    if (frequency === undefined) {
      if (hiveId === 42 || hiveId === 17) {
        setInternalFreq(380); // Virgin Queen Piping
      } else if (hiveId === 88 || hiveId === 12 || hiveId === 63) {
        setInternalFreq(450); // Swarm Preparation Surge
      } else if (hiveId === 25 || hiveId === 79) {
        setInternalFreq(180); // Broodless Low Hum
      } else {
        setInternalFreq(220 + ((hiveId * 3) % 40)); // Normal colony forage buzz
      }
    }
  }, [hiveId, frequency]);

  const handleTabSelect = (tab: "fft" | "sensors" | "ai" | "mesh") => {
    setInternalTab(tab);
    if (onModeChange) onModeChange(tab);
  };

  // Audio tone generator (Web Audio API)
  const toggleAudio = () => {
    if (isAudioMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(currentFreq, ctx.currentTime);
        
        // Low volume for pleasant bee buzz
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        audioContextRef.current = ctx;
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsAudioMuted(false);
      } catch {
        setIsAudioMuted(true);
      }
    } else {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setIsAudioMuted(true);
    }
  };

  // Update oscillator frequency on frequency change
  useEffect(() => {
    if (!isAudioMuted && oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setTargetAtTime(currentFreq, audioContextRef.current.currentTime, 0.05);
    }
  }, [currentFreq, isAudioMuted]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {}
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, []);

  // Crank step rotation
  const handleCrankStep = useCallback((stepDegrees: number = 45) => {
    setCrankAngle((prev) => (prev + stepDegrees) % 360);
    
    const nextFreq = currentFreq >= 500 ? 160 : currentFreq + 35;
    setInternalFreq(nextFreq);
    if (onFrequencyChange) {
      onFrequencyChange(nextFreq);
    }

    if (crankAngle + stepDegrees >= 360) {
      const nextHive = (hiveId % 100) + 1;
      setHiveId(nextHive);
      if (onHiveChange) {
        onHiveChange(nextHive);
      }
    }
  }, [currentFreq, crankAngle, hiveId, onFrequencyChange, onHiveChange]);

  const handleNextHive = useCallback(() => {
    const next = (hiveId % 100) + 1;
    setHiveId(next);
    if (onHiveChange) onHiveChange(next);
  }, [hiveId, onHiveChange]);

  const handlePrevHive = useCallback(() => {
    const prev = hiveId === 1 ? 100 : hiveId - 1;
    setHiveId(prev);
    if (onHiveChange) onHiveChange(prev);
  }, [hiveId, onHiveChange]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowUp") {
        handleTabSelect("fft");
        setIsDpadActive("up");
        setTimeout(() => setIsDpadActive(null), 150);
      } else if (e.key === "ArrowDown") {
        handleTabSelect("sensors");
        setIsDpadActive("down");
        setTimeout(() => setIsDpadActive(null), 150);
      } else if (e.key === "ArrowLeft") {
        handlePrevHive();
        setIsDpadActive("left");
        setTimeout(() => setIsDpadActive(null), 150);
      } else if (e.key === "ArrowRight") {
        handleNextHive();
        setIsDpadActive("right");
        setTimeout(() => setIsDpadActive(null), 150);
      } else if (e.key.toLowerCase() === "c") {
        handleCrankStep(45);
      } else if (e.key.toLowerCase() === "a") {
        handleTabSelect("ai");
      } else if (e.key.toLowerCase() === "b") {
        handleTabSelect("mesh");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextHive, handlePrevHive, handleCrankStep]);

  // Mouse wheel on crank
  const handleCrankWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleCrankStep(30);
    } else {
      setCrankAngle((prev) => (prev - 30 + 360) % 360);
      const prevFreq = Math.max(140, currentFreq - 25);
      setInternalFreq(prevFreq);
      if (onFrequencyChange) onFrequencyChange(prevFreq);
    }
  };

  const isAnomalous = hiveId === 88 || hiveId === 12 || hiveId === 63 || currentFreq >= 440;
  const isQueenAlert = hiveId === 42 || hiveId === 17 || (currentFreq >= 360 && currentFreq < 440);

  // Generate 16 simulated 128-pt FFT frequency bins
  const fftBins = [
    32, 54, 88, 120, 95, 70, 48, 85, 110, 75, 42, 68, 52, 78, 60, 35
  ];

  return (
    <div className={`relative flex items-center justify-center select-none ${compact ? "scale-90 sm:scale-95" : "scale-100"}`}>
      {/* Playdate Yellow Chassis */}
      <div className="relative w-[340px] sm:w-[390px] bg-[#ffc833] rounded-[40px] p-5 sm:p-6 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-5px_10px_rgba(0,0,0,0.3)] border-4 border-[#e5b329] text-[#312f28]">
        
        {/* Top Edge: Power/Lock Indicator & Logo */}
        <div className="flex justify-between items-center mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#312f28] shadow-inner animate-pulse" />
            <span className="text-[11px] font-mono font-black tracking-widest uppercase opacity-85">
              BEEVIL HIVE-OS
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className="flex items-center gap-1 text-[9px] font-mono font-bold bg-[#312f28]/15 hover:bg-[#312f28]/25 px-2 py-0.5 rounded-full transition-colors"
              title={isAudioMuted ? "Unmute Acoustic Buzz" : "Mute Acoustic Buzz"}
            >
              {isAudioMuted ? (
                <>
                  <VolumeX className="w-3 h-3 text-[#312f28]/70" />
                  <span className="text-[8px]">MUTE</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3 text-[#312f28] animate-bounce" />
                  <span className="text-[8px] text-green-900 font-black">BUZZ ON</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1 text-[10px] font-mono font-bold bg-[#312f28]/15 px-2 py-0.5 rounded-full">
              <Radio className="w-3 h-3 text-[#312f28] animate-pulse" />
              <span>#{String(hiveId).padStart(3, "0")}</span>
            </div>
          </div>
        </div>

        {/* 1-Bit Memory LCD Screen Bezel */}
        <div className="relative w-full h-[230px] sm:h-[250px] bg-[#212223] rounded-2xl p-2.5 shadow-[inset_0_4px_12px_rgba(0,0,0,0.85)] border border-black/50 flex flex-col justify-between overflow-hidden">
          
          {/* LCD Screen Display (#312f28 background with #efefef monochrome pixels) */}
          <div className="relative w-full h-full bg-[#312f28] rounded-xl p-3 flex flex-col justify-between overflow-hidden text-[#efefef] shadow-inner font-mono">
            
            {/* Scanline Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:3px_3px]" />

            {/* Screen Header Bar */}
            <div className="relative z-10 flex justify-between items-center border-b border-[#efefef]/25 pb-1.5 text-[10px] font-bold tracking-wider">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-[#efefef] inline-block animate-pulse" />
                <span className="uppercase text-[#ffc833]">
                  {activeTab === "fft" && "128-PT FFT SPECTRUM"}
                  {activeTab === "sensors" && "EDGE TELEMETRY"}
                  {activeTab === "ai" && "ON-DEVICE SLM"}
                  {activeTab === "mesh" && "LORA MESH TOPOLOGY"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[9px]">
                <span className="text-[#efefef]/80">BAT: 96%</span>
                <span className="bg-[#efefef]/15 px-1 rounded text-[#ffc833]">SF7/IN865</span>
              </div>
            </div>

            {/* Main Screen Telemetry Body */}
            <div className="relative z-10 my-auto py-1">
              
              {/* TAB 1: 128-Point CMSIS-DSP FFT Audio Visualizer */}
              {activeTab === "fft" && (
                <div className="flex flex-col items-center justify-center text-center space-y-1.5">
                  {/* Acoustic Waveform Simulation */}
                  <div className="flex items-end justify-center gap-1 h-14 w-full px-1">
                    {fftBins.map((val, idx) => {
                      const dynamicHeight = Math.min(
                        100,
                        (val * (currentFreq / 230)) + (isAnomalous ? (idx === 8 ? 40 : 15) : isQueenAlert ? (idx === 6 ? 35 : 10) : 5)
                      );
                      const isPeak = (isAnomalous && idx === 8) || (isQueenAlert && idx === 6) || (!isAnomalous && !isQueenAlert && idx === 3);

                      return (
                        <div 
                          key={idx} 
                          className={`w-2 sm:w-2.5 rounded-t-sm transition-all duration-150 ${
                            isPeak ? "bg-[#ffc833]" : "bg-[#efefef]"
                          }`}
                          style={{ 
                            height: `${dynamicHeight}%`,
                            opacity: isPeak ? 1 : 0.75
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center w-full px-1 text-[10px]">
                    <span className="text-[#ffc833] font-black text-xs">{currentFreq} Hz</span>
                    <span className={`font-bold uppercase text-[9px] px-1 rounded ${
                      isAnomalous ? "bg-[#ef5023] text-white" : isQueenAlert ? "bg-[#6c00ff] text-white" : "bg-[#21c6a9]/30 text-[#21c6a9]"
                    }`}>
                      {isAnomalous ? "SWARM PREP SURGE" : isQueenAlert ? "VIRGIN QUEEN PIPING" : "COLONY NOMINAL"}
                    </span>
                  </div>

                  <div className="text-[8px] uppercase tracking-widest text-[#efefef]/70 bg-black/40 px-2 py-0.5 rounded w-full flex justify-between">
                    <span>128-Pt CMSIS-DSP</span>
                    <span className="text-[#ffc833]">8.2ms LATENCY</span>
                  </div>
                </div>
              )}

              {/* TAB 2: Physical Sensors Telemetry Grid */}
              {activeTab === "sensors" && (
                <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                  <div className="bg-black/35 p-1.5 rounded border border-[#efefef]/15">
                    <div className="text-[#efefef]/60 text-[8px] flex items-center justify-between">
                      <span>BROOD CORE</span>
                      <Thermometer className="w-2.5 h-2.5 text-[#ffc833]" />
                    </div>
                    <div className="text-[12px] font-black text-[#ffc833]">34.85°C</div>
                    <div className="text-[7.5px] text-[#efefef]/70">TMP117 ±0.05°C</div>
                  </div>

                  <div className="bg-black/35 p-1.5 rounded border border-[#efefef]/15">
                    <div className="text-[#efefef]/60 text-[8px] flex items-center justify-between">
                      <span>WEIGHT DELTA</span>
                      <Activity className="w-2.5 h-2.5 text-[#21c6a9]" />
                    </div>
                    <div className="text-[12px] font-black text-[#21c6a9]">+1.42 kg</div>
                    <div className="text-[7.5px] text-[#efefef]/70">HX711 24-Bit ADC</div>
                  </div>

                  <div className="bg-black/35 p-1.5 rounded border border-[#efefef]/15">
                    <div className="text-[#efefef]/60 text-[8px] flex items-center justify-between">
                      <span>NDIR CO2</span>
                      <Zap className="w-2.5 h-2.5 text-blue-300" />
                    </div>
                    <div className="text-[12px] font-black">1,180 ppm</div>
                    <div className="text-[7.5px] text-[#efefef]/70">SCD41 Photoacoustic</div>
                  </div>

                  <div className="bg-black/35 p-1.5 rounded border border-[#efefef]/15">
                    <div className="text-[#efefef]/60 text-[8px] flex items-center justify-between">
                      <span>AI GAS VOC</span>
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    </div>
                    <div className="text-[12px] font-black">154.2 kΩ</div>
                    <div className="text-[7.5px] text-[#efefef]/70">BME688 MOX AI Index</div>
                  </div>
                </div>
              )}

              {/* TAB 3: On-Device TinyLLM / SLM Diagnostics */}
              {activeTab === "ai" && (
                <div className="flex flex-col text-left space-y-1 text-[9px]">
                  <div className="flex items-center justify-between border-b border-[#efefef]/15 pb-1">
                    <span className="text-[#efefef]/70 text-[8px]">DIAGNOSTIC:</span>
                    <span className={`font-bold ${isAnomalous ? "text-[#ef5023]" : isQueenAlert ? "text-[#ffc833]" : "text-[#21c6a9]"}`}>
                      {isAnomalous ? "[!] PRE-SWARM DETECTED" : isQueenAlert ? "[👑] QUEEN EVENT" : "[✓] QUEENRIGHT NOMINAL"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[8.5px]">
                    <span className="text-[#efefef]/70">VARROA LOAD:</span>
                    <span className="font-bold text-[#ffc833]">1.8% (Below Threshold)</span>
                  </div>
                  <div className="flex items-center justify-between text-[8.5px]">
                    <span className="text-[#efefef]/70">7-DAY FORECAST:</span>
                    <span className="font-bold text-[#21c6a9]">+5.2 kg Honey Super</span>
                  </div>
                  <div className="bg-black/40 p-1 rounded text-[7.5px] text-[#efefef]/80 italic">
                    Gemma-2B Quantized: &quot;Brood cluster stable at 34.8°C. No immediate intervention required.&quot;
                  </div>
                </div>
              )}

              {/* TAB 4: LoRa Mesh Multi-Hop Routing */}
              {activeTab === "mesh" && (
                <div className="flex flex-col text-left space-y-1 text-[9px]">
                  <div className="flex justify-between items-center border-b border-[#efefef]/15 pb-0.5">
                    <span className="text-[8px]">TOPOLOGY:</span>
                    <span className="text-[#ffc833] font-bold text-[8.5px]">100-NODE MESH</span>
                  </div>
                  <div className="bg-black/45 p-1 rounded text-[8px] space-y-0.5">
                    <div className="text-[#ffc833]">
                      Node #{String(hiveId).padStart(3, "0")} ➔ Relay #014 ➔ CM4 Gateway
                    </div>
                    <div className="flex justify-between text-[#efefef]/80 text-[7.5px]">
                      <span>RSSI: -82 dBm</span>
                      <span>SNR: +11.4 dB</span>
                      <span>LOSS: 0.0%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[8px] text-[#21c6a9]">
                    <span>STATUS: ONLINE</span>
                    <span className="text-white bg-[#21c6a9]/30 px-1 rounded">2.4 GHz + 865 MHz</span>
                  </div>
                </div>
              )}
            </div>

            {/* Screen Bottom Navigation Bar */}
            <div className="relative z-10 flex justify-between items-center border-t border-[#efefef]/20 pt-1 text-[8px] text-[#efefef]/75">
              <span>▲▼: TABS</span>
              <span className="text-[#ffc833] font-bold">◀▶: HIVE #{hiveId}</span>
              {onOpenLedgerModal ? (
                <button 
                  onClick={onOpenLedgerModal}
                  className="text-[#ffc833] hover:underline flex items-center gap-0.5"
                >
                  <QrCode className="w-2.5 h-2.5" />
                  <span>QR</span>
                </button>
              ) : (
                <span>(A): AI | (B): MESH</span>
              )}
            </div>
          </div>
        </div>

        {/* Lower Controls Area: D-Pad, Speaker & Action Buttons */}
        <div className="mt-5 flex justify-between items-center px-1">
          
          {/* 4-Way Tactile D-Pad */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Up Button */}
            <button 
              onClick={() => handleTabSelect("fft")}
              className={`absolute top-0 w-8 h-8 rounded-t-md playdate-dpad-btn flex items-center justify-center text-[#ffc833] hover:text-white transition-transform ${
                isDpadActive === "up" ? "scale-95 translate-y-0.5" : ""
              }`}
              title="FFT Tab"
            >
              ▲
            </button>
            {/* Down Button */}
            <button 
              onClick={() => handleTabSelect("sensors")}
              className={`absolute bottom-0 w-8 h-8 rounded-b-md playdate-dpad-btn flex items-center justify-center text-[#ffc833] hover:text-white transition-transform ${
                isDpadActive === "down" ? "scale-95 -translate-y-0.5" : ""
              }`}
              title="Sensors Tab"
            >
              ▼
            </button>
            {/* Left Button */}
            <button 
              onClick={handlePrevHive}
              className={`absolute left-0 w-8 h-8 rounded-l-md playdate-dpad-btn flex items-center justify-center text-[#ffc833] hover:text-white transition-transform ${
                isDpadActive === "left" ? "scale-95 translate-x-0.5" : ""
              }`}
              title="Previous Hive"
            >
              ◀
            </button>
            {/* Right Button */}
            <button 
              onClick={handleNextHive}
              className={`absolute right-0 w-8 h-8 rounded-r-md playdate-dpad-btn flex items-center justify-center text-[#ffc833] hover:text-white transition-transform ${
                isDpadActive === "right" ? "scale-95 -translate-x-0.5" : ""
              }`}
              title="Next Hive"
            >
              ▶
            </button>
            {/* Center Pivot */}
            <div className="w-8 h-8 bg-[#212223] rounded-sm shadow-inner flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111112]" />
            </div>
          </div>

          {/* Speaker Grille (3x3 perforated acoustic holes) */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#312f28]/10 rounded-lg">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#312f28]/70 shadow-inner" />
            ))}
          </div>

          {/* (B) and (A) Tactile Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <button 
                onClick={() => handleTabSelect("mesh")}
                className="w-10 h-10 rounded-full playdate-action-btn font-mono font-black text-sm flex items-center justify-center active:scale-95 transition-transform"
                title="Mesh View (B)"
              >
                B
              </button>
              <span className="text-[9px] font-mono font-bold text-[#312f28]/80">MESH</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button 
                onClick={() => handleTabSelect("ai")}
                className="w-10 h-10 rounded-full playdate-action-btn font-mono font-black text-sm flex items-center justify-center active:scale-95 transition-transform"
                title="AI Advisor (A)"
              >
                A
              </button>
              <span className="text-[9px] font-mono font-bold text-[#312f28]/80">AI</span>
            </div>
          </div>
        </div>

        {/* Interactive Rotating Mechanical Crank */}
        <div 
          ref={crankRef}
          onClick={() => handleCrankStep(45)}
          onWheel={handleCrankWheel}
          className="absolute -right-8 sm:-right-9 top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-30"
          title="Click or Scroll to Rotate Mechanical Crank"
        >
          {/* Metallic Crank Arm */}
          <div 
            className="w-5 h-20 bg-gradient-to-b from-[#f0f0f0] via-[#cfcfcf] to-[#888888] rounded-full shadow-[3px_5px_12px_rgba(0,0,0,0.5)] border border-white/80 flex items-end justify-center pb-1 transition-transform duration-200"
            style={{ transform: `rotate(${crankAngle}deg)` }}
          >
            {/* Playdate Yellow Knob */}
            <div className="w-6 h-6 rounded-full bg-[#ffc833] border-2 border-[#312f28] shadow-md group-hover:scale-115 transition-transform flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#312f28]" />
            </div>
          </div>

          <div className="mt-2 bg-[#312f28] text-[#ffc833] font-mono text-[8px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap opacity-85 group-hover:opacity-100 transition-opacity">
            ↻ CRANK
          </div>
        </div>

      </div>
    </div>
  );
}
