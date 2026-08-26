"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Radio, Activity, Thermometer, Zap, ShieldCheck,
  QrCode, Search, ArrowLeft, Sparkles, Volume2,
  VolumeX, Lock, Laptop, Cpu, Network,
  Wind, Layers, Compass, Printer, Bot, Send,
  ChevronRight, Check, Copy, X,
  TrendingUp, Award, Database
} from "lucide-react";
import { PlaydateConsole } from "@/components/PlaydateConsole";

/* ============================================================================
   TYPES & TELEMETRY DEFINITIONS
   ============================================================================ */

export type HiveStatus = "NOMINAL" | "PRE_SWARM" | "QUEEN_FAILURE" | "VARROA_SURGE" | "TAMPER";

export interface FrameThermal {
  frame1OuterLeft: number;
  frame2BroodLeft: number;
  frame3CoreQueen: number;
  frame4BroodRight: number;
  frame5OuterRight: number;
  cusumScore: number;
  cusumDriftStatus: "STABLE_HOMEOSTASIS" | "THERMAL_DRIFT_ALERT" | "BROOD_CHILL_RISK" | "SWARM_PRE_HEATING";
}

export interface GasPlume {
  scd41Co2Ppm: number;
  bme688VocKohm: number;
  isopentylAcetateIndex: number; // Alarm pheromone level (0-100)
  humidityRh: number;
  pressureHpa: number;
  ventilationStatus: "OPTIMAL" | "FANNING_ACTIVE" | "ANOXIA_WARNING";
}

export interface BlockProof {
  blockNumber: number;
  blockHash: string;
  previousHash: string;
  merkleRoot: string;
  timestamp: string;
  nonce: number;
  batchId: string;
  organicCertId: string;
  floralSource: string;
  purityPct: number;
  moisturePct: number;
}

export interface HiveNode {
  id: number;
  apiaryZone: string;
  status: HiveStatus;
  healthIndex: number;
  weightKg: number;
  deltaWeightKg: number;
  forecastHarvestKg: number;
  peakFrequencyHz: number;
  dominantHarmonic: string;
  batteryPct: number;
  rssi: number;
  snr: number;
  hops: number;
  meshRoute: string[];
  varroaMitesPer100: number;
  thermal: FrameThermal;
  gas: GasPlume;
  blockchain: BlockProof;
  firmware: string;
  lastPingSecAgo: number;
}

/* ============================================================================
   SIMULATED 100-HIVE FLEET TELEMETRY GENERATOR
   ============================================================================ */

function generateFleetTelemetry(): HiveNode[] {
  const zones = ["Zone Alpha (North Ridge)", "Zone Beta (Wildflower Valley)", "Zone Gamma (Clover Fields)", "Zone Delta (Forest Edge)"];
  
  return Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    const zone = zones[i % zones.length];
    
    // Predetermined realistic anomaly nodes
    let status: HiveStatus = "NOMINAL";
    let peakFrequencyHz = 225 + ((id * 7) % 25);
    let dominantHarmonic = "220-250 Hz (Nominal Colony Drone)";
    let healthIndex = 95 + ((id * 3) % 5);
    let varroaMites = +(1.1 + ((id % 4) * 0.3)).toFixed(1);
    const weightKg = +(43.5 + ((id % 15) * 0.7)).toFixed(1);
    let deltaWeightKg = +(0.65 + ((id % 7) * 0.12)).toFixed(2);
    
    // Thermal Profile
    const frame1 = +(32.4 + ((id % 5) * 0.1)).toFixed(1);
    let frame2 = +(34.3 + ((id % 3) * 0.1)).toFixed(1);
    let frame3 = +(35.2 + ((id % 4) * 0.08)).toFixed(1);
    let frame4 = +(34.2 + ((id % 3) * 0.1)).toFixed(1);
    const frame5 = +(32.3 + ((id % 5) * 0.1)).toFixed(1);
    let cusumScore = +(0.15 + ((id % 5) * 0.05)).toFixed(2);
    let cusumDriftStatus: FrameThermal["cusumDriftStatus"] = "STABLE_HOMEOSTASIS";

    // Gas Profile
    let scd41Co2 = 1150 + ((id * 23) % 300);
    let bme688Voc = 145 + ((id * 11) % 40);
    let isopentylAcetate = 12 + (id % 8);
    const humidity = 58 + (id % 9);
    let ventilationStatus: GasPlume["ventilationStatus"] = "OPTIMAL";

    // Node 88, 14, 67: Pre-Swarm Anomaly
    if (id === 88 || id === 14 || id === 67) {
      status = "PRE_SWARM";
      peakFrequencyHz = 485;
      dominantHarmonic = "450-500 Hz (Swarm Piping & Wing Buzz)";
      healthIndex = 76;
      frame3 = 36.8; // Brood nest pre-heating
      frame2 = 35.9;
      frame4 = 35.8;
      cusumScore = 2.45;
      cusumDriftStatus = "SWARM_PRE_HEATING";
      scd41Co2 = 2480;
      isopentylAcetate = 58;
      ventilationStatus = "FANNING_ACTIVE";
      deltaWeightKg = -0.15;
    }
    // Node 42, 7, 93: Queen Failure / Orphan Hive
    else if (id === 42 || id === 7 || id === 93) {
      status = "QUEEN_FAILURE";
      peakFrequencyHz = 285;
      dominantHarmonic = "260-310 Hz (Queenless Roar / Warble)";
      healthIndex = 68;
      frame3 = 33.4; // Thermal decay in brood center
      frame2 = 33.1;
      frame4 = 33.0;
      cusumScore = 1.92;
      cusumDriftStatus = "BROOD_CHILL_RISK";
      scd41Co2 = 920;
      isopentylAcetate = 74; // Agitation scent
      deltaWeightKg = 0.05;
    }
    // Node 23, 51: Varroa Mite Surge
    else if (id === 23 || id === 51) {
      status = "VARROA_SURGE";
      peakFrequencyHz = 340;
      dominantHarmonic = "320-370 Hz (Grooming Agitation & High Mite Stress)";
      healthIndex = 61;
      varroaMites = 5.2;
      cusumScore = 1.35;
      cusumDriftStatus = "THERMAL_DRIFT_ALERT";
      bme688Voc = 85; // Odor shift due to DWV viral load
      deltaWeightKg = +0.22;
    }

    const hops = id <= 25 ? 1 : id <= 70 ? 2 : 3;
    const meshRoute = hops === 1
      ? [`Node #${String(id).padStart(3, "0")}`, "Antmicro CM4 Base Station"]
      : hops === 2
      ? [`Node #${String(id).padStart(3, "0")}`, `Relay #${String((id * 3) % 25 + 1).padStart(3, "0")}`, "Antmicro CM4 Base Station"]
      : [`Node #${String(id).padStart(3, "0")}`, `Relay #${String(id + 4).padStart(3, "0")}`, `Relay #${String(12).padStart(3, "0")}`, "Antmicro CM4 Base Station"];

    return {
      id,
      apiaryZone: zone,
      status,
      healthIndex,
      weightKg,
      deltaWeightKg,
      forecastHarvestKg: +(5.2 + ((id % 8) * 0.7)).toFixed(1),
      peakFrequencyHz,
      dominantHarmonic,
      batteryPct: 92 + (id % 9),
      rssi: -72 - (id % 24),
      snr: +(8.4 + ((id % 6) * 0.4)).toFixed(1),
      hops,
      meshRoute,
      varroaMitesPer100: varroaMites,
      thermal: {
        frame1OuterLeft: frame1,
        frame2BroodLeft: frame2,
        frame3CoreQueen: frame3,
        frame4BroodRight: frame4,
        frame5OuterRight: frame5,
        cusumScore,
        cusumDriftStatus
      },
      gas: {
        scd41Co2Ppm: scd41Co2,
        bme688VocKohm: bme688Voc,
        isopentylAcetateIndex: isopentylAcetate,
        humidityRh: humidity,
        pressureHpa: +(1013.2 - (id % 5) * 0.8).toFixed(1),
        ventilationStatus
      },
      blockchain: {
        blockNumber: 842900 + id,
        blockHash: `0xbee88${id.toString(16).padStart(4, "0")}f90c741e97d620b33fa1288c${(id * 97).toString(16)}`,
        previousHash: `0xbee88${(id - 1).toString(16).padStart(4, "0")}e45b128f61a093c88e9321d5${(id * 43).toString(16)}`,
        merkleRoot: `0x77c29a8f44d180b${(id * 13).toString(16).padStart(4, "0")}ea09c31`,
        timestamp: new Date(Date.now() - (id * 42000)).toISOString().replace("T", " ").substring(0, 19) + " UTC",
        nonce: 49201 + id * 17,
        batchId: `BATCH-2026-HQ-${String(id).padStart(3, "0")}`,
        organicCertId: `USDA-NOP-BEEM-882${String(id).padStart(3, "0")}`,
        floralSource: id % 2 === 0 ? "Wild Mountain Blackberry & Clover" : "Alpine Lavender & Forest Wildflower",
        purityPct: +(99.1 + (id % 8) * 0.1).toFixed(1),
        moisturePct: +(16.8 + (id % 5) * 0.2).toFixed(1)
      },
      firmware: "v3.4.2-int8-edge",
      lastPingSecAgo: (id % 12) + 1
    };
  });
}

/* ============================================================================
   128-PT FFT SPECTRUM SYNTHESIS HELPER
   ============================================================================ */

function generate128PointFft(centerPeakHz: number, hiveStatus: HiveStatus): { freqHz: number; magnitudeDb: number; isPeak: boolean }[] {
  const bins = 128;
  const minFreq = 50;
  const maxFreq = 1200;
  const freqStep = (maxFreq - minFreq) / bins;

  return Array.from({ length: bins }, (_, i) => {
    const freqHz = Math.round(minFreq + i * freqStep);
    
    // Background 1/f pink noise floor in decibels (-75 to -60 dB)
    let magnitudeDb = -65 - 8 * Math.log10(freqHz / 100) + Math.sin(i * 0.4) * 2.5;

    // Queen Right Fundamental (220-250 Hz)
    const dist225 = Math.abs(freqHz - 225);
    if (dist225 < 60) {
      magnitudeDb += (1 - dist225 / 60) * (hiveStatus === "QUEEN_FAILURE" ? 4 : 22);
    }

    // Pre-Swarm Piping Peak (450-520 Hz)
    const distSwarm = Math.abs(freqHz - 485);
    if (distSwarm < 70 && hiveStatus === "PRE_SWARM") {
      magnitudeDb += (1 - distSwarm / 70) * 32;
    }

    // Varroa / Agitation Tone (320-370 Hz)
    const distVarroa = Math.abs(freqHz - 340);
    if (distVarroa < 50 && hiveStatus === "VARROA_SURGE") {
      magnitudeDb += (1 - distVarroa / 50) * 26;
    }

    // Specific centerPeak resonance
    const distPeak = Math.abs(freqHz - centerPeakHz);
    if (distPeak < 35) {
      magnitudeDb += (1 - distPeak / 35) * 18;
    }

    // Secondary Harmonics
    if (Math.abs(freqHz - 900) < 40) {
      magnitudeDb += 10;
    }

    // Clamp between -80 dB and -10 dB
    magnitudeDb = Math.max(-80, Math.min(-12, magnitudeDb));

    const isPeak = Math.abs(freqHz - centerPeakHz) < freqStep;

    return { freqHz, magnitudeDb, isPeak };
  });
}

/* ============================================================================
   MAIN COMPONENT: HIVEOS FLEET COMMAND CENTER
   ============================================================================ */

export default function HiveOSFleetCommandCenter() {
  const [fleet] = useState<HiveNode[]>(generateFleetTelemetry);
  const [selectedHiveId, setSelectedHiveId] = useState<number>(88); // Default to interesting Pre-Swarm node
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"DIAGNOSTICS" | "FFT_AUDIO" | "THERMAL" | "GAS_PLUME" | "CHAIN_EXPLORER" | "GEMMA_AI" | "PLAYDATE">("DIAGNOSTICS");
  const [audioToneActive, setAudioToneActive] = useState<boolean>(false);
  const [customHarmonicFreq, setCustomHarmonicFreq] = useState<number | null>(null);
  const [isQrCertModalOpen, setIsQrCertModalOpen] = useState<boolean>(false);
  const [isCopiedHash, setIsCopiedHash] = useState<boolean>(false);
  
  // SLM Gemma-2B Conversation State
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "gemma"; text: string; time: string }>>([
    {
      role: "gemma",
      text: "⚡ HiveOS Edge Gemma-2B quantized SLM active. All 16 sensors synchronized. Node #088 shows elevated 485Hz harmonic piping and positive CUSUM thermal drift (+2.45). Swarm departure forecast: 18.5 hours. How can I assist with apiary mitigation?",
      time: "14:08:12"
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isStreamingGemma, setIsStreamingGemma] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Audio Tone Generator (Web Audio API Synthesizer)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const currentHive = useMemo(() => {
    return fleet.find((h) => h.id === selectedHiveId) || fleet[0];
  }, [fleet, selectedHiveId]);

  const selectedHarmonicFreq = customHarmonicFreq ?? currentHive.peakFrequencyHz;

  // Compute 128-pt FFT Spectrum for the selected Hive
  const fftSpectrum = useMemo(() => {
    return generate128PointFft(selectedHarmonicFreq, currentHive.status);
  }, [selectedHarmonicFreq, currentHive.status]);

  // Audio Synthesizer Control
  const toggleAudioTone = (freq?: number) => {
    const targetFreq = freq || selectedHarmonicFreq;
    if (audioToneActive) {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {
          // ignore cleanup error
        }
      }
      setAudioToneActive(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth"; // Rich harmonic buzz typical of honeybees
        osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime); // Safe volume

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setAudioToneActive(true);
      } catch (err) {
        console.warn("Audio Context init error:", err);
      }
    }
  };

  useEffect(() => {
    if (audioToneActive && oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(selectedHarmonicFreq, audioCtxRef.current.currentTime);
    }
  }, [selectedHarmonicFreq, audioToneActive]);

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {
          // ignore cleanup error
        }
      }
    };
  }, []);

  // Filter and Search Logic for 100 Hives
  const filteredFleet = useMemo(() => {
    return fleet.filter((hive) => {
      const matchesFilter =
        activeFilter === "ALL" ||
        (activeFilter === "NOMINAL" && hive.status === "NOMINAL") ||
        (activeFilter === "PRE_SWARM" && hive.status === "PRE_SWARM") ||
        (activeFilter === "QUEEN_FAILURE" && hive.status === "QUEEN_FAILURE") ||
        (activeFilter === "VARROA_SURGE" && hive.status === "VARROA_SURGE") ||
        (activeFilter === "TAMPER" && hive.status === "TAMPER");

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        hive.id.toString().includes(q) ||
        hive.apiaryZone.toLowerCase().includes(q) ||
        hive.status.toLowerCase().includes(q) ||
        hive.dominantHarmonic.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [fleet, activeFilter, searchQuery]);

  // Aggregate Metrics for Fleet KPI Banner
  const nominalCount = fleet.filter((h) => h.status === "NOMINAL").length;
  const swarmCount = fleet.filter((h) => h.status === "PRE_SWARM").length;
  const queenCount = fleet.filter((h) => h.status === "QUEEN_FAILURE").length;
  const varroaCount = fleet.filter((h) => h.status === "VARROA_SURGE").length;
  const totalDailyFlux = fleet.reduce((acc, h) => acc + h.deltaWeightKg, 0).toFixed(1);

  // Gemma-2B Simulated Apicultural SLM Inference
  const handleSendGemma = (customPrompt?: string) => {
    const query = customPrompt || inputMessage;
    if (!query.trim()) return;

    const userTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    const newMsg = { role: "user" as const, text: query, time: userTime };
    setChatMessages((prev) => [...prev, newMsg]);
    if (!customPrompt) setInputMessage("");
    setIsStreamingGemma(true);

    setTimeout(() => {
      let gemmaResponse = "";
      const q = query.toLowerCase();

      if (q.includes("swarm") || q.includes("450hz") || q.includes("485")) {
        gemmaResponse = `🐝 [Gemma-2B On-Device Inference]: Hive #${String(currentHive.id).padStart(3, "0")} is displaying diagnostic pre-swarm telemetry. Acoustic signature shows a prominent 485 Hz primary peak (+32 dBV elevation over nominal 225 Hz drone). Concurrently, Core Brood Frame 3 has drifted to 36.8°C with a CUSUM score of +2.45, indicating cluster pre-heating before departure. CO2 is elevated at ${currentHive.gas.scd41Co2Ppm} ppm due to high fanning respiration.\n\nRecommended Action:\n1. Perform immediate split or Demaree swarm control.\n2. Verify queen cup / swarm cell development on frame 2 & 4.\n3. Expand brood chamber with 2 drawn supers.`;
      } else if (q.includes("cusum") || q.includes("thermal") || q.includes("gradient")) {
        gemmaResponse = `🌡️ [Gemma-2B On-Device Inference]: Analysis of the 5-point thermal gradient for Hive #${String(currentHive.id).padStart(3, "0")}:\n- Outer Frames (1 & 5): ${currentHive.thermal.frame1OuterLeft}°C / ${currentHive.thermal.frame5OuterRight}°C\n- Brood Nest (Frame 3 Core): ${currentHive.thermal.frame3CoreQueen}°C (Target: 34.5°C - 35.5°C)\n- CUSUM Statistical Drift: ${currentHive.thermal.cusumScore} (${currentHive.thermal.cusumDriftStatus.replace(/_/g, " ")})\n\nThe cumulative sum algorithm confirms ${currentHive.thermal.cusumScore > 1.5 ? "significant thermoregulatory anomaly requiring physical inspection." : "healthy homeostatic thermal stability maintained by nurse bees."}`;
      } else if (q.includes("varroa") || q.includes("mite") || q.includes("treatment")) {
        gemmaResponse = `🔬 [Gemma-2B On-Device Inference]: Varroa mite density for Hive #${String(currentHive.id).padStart(3, "0")} is currently ${currentHive.varroaMitesPer100} mites/100 bees (${currentHive.varroaMitesPer100 > 3 ? "CRITICAL THRESHOLD EXCEEDED" : "Within Economic Threshold"}).\nAcoustic agitation peak detected at ${currentHive.peakFrequencyHz} Hz. BME688 VOC resistance is ${currentHive.gas.bme688VocKohm} kΩ.\n\nAction: If >3.0%, apply formic acid vaporization or thymol pads while monitoring core brood temperature to prevent queen suppression.`;
      } else if (q.includes("certificate") || q.includes("blockchain") || q.includes("hash")) {
        gemmaResponse = `⛓️ [Gemma-2B On-Device Inference]: Sealed Blockchain Block #${currentHive.blockchain.blockNumber} with Merkle Root ${currentHive.blockchain.merkleRoot.substring(0, 12)}...\nOrganic certification ID: ${currentHive.blockchain.organicCertId}.\nPurity: ${currentHive.blockchain.purityPct}% ${currentHive.blockchain.floralSource}.\nClick "Print QR Certificate" to render the tamper-proof cryptographically signed batch certificate.`;
      } else {
        gemmaResponse = `⚡ [Gemma-2B Edge Engine]: Telemetry summary for Hive #${String(currentHive.id).padStart(3, "0")} (${currentHive.apiaryZone}):\n- Health Index: ${currentHive.healthIndex}%\n- Bio-Acoustic Peak: ${currentHive.peakFrequencyHz} Hz (${currentHive.dominantHarmonic})\n- Core Temp: ${currentHive.thermal.frame3CoreQueen}°C | CO2: ${currentHive.gas.scd41Co2Ppm} ppm\n- Daily Honey Flux: +${currentHive.deltaWeightKg} kg/day | LoRa Hops: ${currentHive.hops}\nStatus: ${currentHive.status.replace(/_/g, " ")}. All edge INT8 models executing nominally at 8.2ms latency.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "gemma",
          text: gemmaResponse,
          time: new Date().toLocaleTimeString("en-US", { hour12: false })
        }
      ]);
      setIsStreamingGemma(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 450);
  };

  const copyBlockHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setIsCopiedHash(true);
    setTimeout(() => setIsCopiedHash(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* ====================================================================
          TOP APPLICATION HEADER & ENTERPRISE COMMAND BAR
          ==================================================================== */}
      <header className="bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand & Breadcrumbs */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-all text-slate-300 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Landing Page</span>
            </Link>

            <div className="h-4 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 relative" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                    HiveOS <span className="text-amber-400 font-mono text-xs px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">FLEET COMMAND CENTER</span>
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-full font-bold hidden lg:inline-flex items-center gap-1">
                    <Zap className="w-3 h-3" /> INT8 Micro-Engine 8.2ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Nav Switcher & Live Connection Status */}
          <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-lg text-slate-400">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-bold">LoRaWAN Mesh 915MHz</span>
              <span className="text-slate-500 hidden sm:inline">| Antmicro Gateway</span>
            </div>

            <button
              onClick={() => setIsQrCertModalOpen(true)}
              className="flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-lg transition-all font-semibold"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Honey Chain Cert</span>
            </button>

            <button
              onClick={() => setActiveTab("PLAYDATE")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all font-semibold ${
                activeTab === "PLAYDATE"
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20"
                  : "bg-slate-800/60 hover:bg-slate-700 text-slate-300 border-slate-700"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Playdate Unit</span>
            </button>
          </div>

        </div>
      </header>

      {/* ====================================================================
          EXECUTIVE FLEET KPI BANNER (Linear / Samsara Enterprise Style)
          ==================================================================== */}
      <section className="bg-[#0f172a] border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1720px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Metric 1: Total Active Nodes */}
          <div className="bg-[#1e293b]/70 border border-slate-700/60 rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between shadow-lg group hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Network className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">Active Fleet Mesh</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                100% ONLINE
              </span>
            </div>
            <div className="mt-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">100</span>
                <span className="text-xs font-mono text-slate-400">/ 100 Nodes</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-2">
                <span className="text-cyan-400 font-semibold">99.8% PDR</span>
                <span>• 3-Hop LoRa Tree</span>
                <span className="text-slate-500">SF7/8 Dynamic ADR</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Fleet Health Index */}
          <div className="bg-[#1e293b]/70 border border-slate-700/60 rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between shadow-lg group hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">Fleet Health Index</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                97.0% NOMINAL
              </span>
            </div>
            <div className="mt-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">97.0%</span>
                <span className="text-xs font-mono text-slate-400">Apiary Score</span>
              </div>
              {/* Segmented bar */}
              <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2 flex overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: `${nominalCount}%` }} title={`Nominal: ${nominalCount}`} />
                <div className="bg-amber-400 h-full" style={{ width: `${swarmCount}%` }} title={`Pre-Swarm: ${swarmCount}`} />
                <div className="bg-yellow-500 h-full" style={{ width: `${queenCount}%` }} title={`Queen Alert: ${queenCount}`} />
                <div className="bg-rose-500 h-full" style={{ width: `${varroaCount}%` }} title={`Varroa Surge: ${varroaCount}`} />
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1.5 flex justify-between">
                <span>{nominalCount} Nominal</span>
                <span className="text-amber-400">{swarmCount} Swarm</span>
                <span className="text-rose-400">{varroaCount} Mite</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Daily Honey Flux */}
          <div className="bg-[#1e293b]/70 border border-slate-700/60 rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between shadow-lg group hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">Daily Honey Flux</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                +12.4% vs 7D AVG
              </span>
            </div>
            <div className="mt-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">+{totalDailyFlux} <span className="text-base text-amber-200">kg</span></span>
                <span className="text-xs font-mono text-slate-400">/ 24 hrs</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center justify-between">
                <span>Avg +0.65 kg/hive</span>
                <span className="text-emerald-400 font-semibold">Est. 4.82t Harvest</span>
              </div>
            </div>
          </div>

          {/* Metric 4: Edge AI INT8 Inference */}
          <div className="bg-[#1e293b]/70 border border-slate-700/60 rounded-2xl p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between shadow-lg group hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">Edge AI Runtime</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                128-PT FFT ONNX
              </span>
            </div>
            <div className="mt-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tracking-tight">8.2 <span className="text-base text-indigo-200">ms</span></span>
                <span className="text-xs font-mono text-slate-400">INT8 Inference</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center justify-between">
                <span className="text-slate-300 font-semibold">STM32U585 On-Device</span>
                <span className="text-indigo-300">0 Cloud Calls</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          MAIN TWO-COLUMN WORKSPACE
          Left: 100-Hive Responsive Matrix Grid (5 cols)
          Right: Deep Diagnostic Inspector (7 cols)
          ==================================================================== */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ==================================================================
            LEFT COLUMN: 100-HIVE RESPONSIVE MATRIX GRID & ROUTE INSPECTOR
            ================================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* 100-Hive Matrix Container Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col">
            
            {/* Header & Stats Count */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white tracking-tight">100-Hive Telemetry Matrix</h2>
                  <p className="text-[11px] font-mono text-slate-400">Live multi-hop LoRa sensor nodes</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg">
                {filteredFleet.length} / 100 Visible
              </span>
            </div>

            {/* Instant Search Bar */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Node ID (#088), Zone, Status, Harmonic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e293b]/90 border border-slate-700/80 rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Multi-Parameter Filter Chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[
                { key: "ALL", label: `All (${fleet.length})`, color: "border-slate-700" },
                { key: "NOMINAL", label: `Nominal (${nominalCount})`, color: "border-emerald-500/40 text-emerald-400" },
                { key: "PRE_SWARM", label: `Pre-Swarm (${swarmCount})`, color: "border-amber-500/40 text-amber-400" },
                { key: "QUEEN_FAILURE", label: `Queen Alert (${queenCount})`, color: "border-yellow-500/40 text-yellow-400" },
                { key: "VARROA_SURGE", label: `Varroa Surge (${varroaCount})`, color: "border-rose-500/40 text-rose-400" },
                { key: "TAMPER", label: "Tamper (0)", color: "border-purple-500/40 text-purple-400" }
              ].map((chip) => {
                const isActive = activeFilter === chip.key;
                return (
                  <button
                    key={chip.key}
                    onClick={() => setActiveFilter(chip.key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all border ${
                      isActive
                        ? "bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-md shadow-amber-500/20"
                        : "bg-[#1e293b]/60 text-slate-300 hover:bg-slate-800 border-slate-700/60"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* 100 Nodes Responsive Matrix Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-[420px] overflow-y-auto p-2 bg-[#090d16]/90 rounded-2xl border border-slate-800/80 shadow-inner custom-scrollbar">
              {filteredFleet.map((hive) => {
                const isSelected = hive.id === selectedHiveId;
                
                // Color badges based on status
                let stateClass = "bg-[#1e293b]/70 border-slate-700/60 text-slate-300 hover:border-slate-500";
                let statusDot = "bg-emerald-400";
                
                if (hive.status === "PRE_SWARM") {
                  stateClass = "bg-amber-500/20 border-amber-500/50 text-amber-300 hover:border-amber-400 animate-pulse";
                  statusDot = "bg-amber-400";
                } else if (hive.status === "QUEEN_FAILURE") {
                  stateClass = "bg-yellow-500/20 border-yellow-500/50 text-yellow-300 hover:border-yellow-400";
                  statusDot = "bg-yellow-400";
                } else if (hive.status === "VARROA_SURGE") {
                  stateClass = "bg-rose-500/20 border-rose-500/50 text-rose-300 hover:border-rose-400";
                  statusDot = "bg-rose-400";
                } else if (hive.status === "TAMPER") {
                  stateClass = "bg-purple-500/20 border-purple-500/50 text-purple-300 hover:border-purple-400";
                  statusDot = "bg-purple-400";
                }

                return (
                  <button
                    key={hive.id}
                    onClick={() => {
                      setSelectedHiveId(hive.id);
                      setCustomHarmonicFreq(null);
                    }}
                    className={`h-12 rounded-xl font-mono text-xs font-bold border flex flex-col items-center justify-center relative transition-all duration-150 ${stateClass} ${
                      isSelected
                        ? "ring-2 ring-cyan-400 border-cyan-400 bg-cyan-950/40 text-cyan-200 scale-105 z-10 shadow-lg shadow-cyan-950"
                        : "hover:scale-102"
                    }`}
                    title={`Hive #${hive.id} - ${hive.status} (${hive.thermal.frame3CoreQueen}°C, ${hive.peakFrequencyHz}Hz)`}
                  >
                    <div className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                      <span>#{String(hive.id).padStart(2, "0")}</span>
                    </div>
                    <span className="text-[9px] opacity-75 font-normal">{hive.thermal.frame3CoreQueen}°C</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Multi-Hop Mesh Topology Route Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-extrabold text-white">Mesh Network Telemetry</h3>
              </div>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full font-bold">
                {currentHive.hops}-Hop Relay
              </span>
            </div>

            <div className="bg-[#1e293b]/80 border border-slate-700/60 rounded-2xl p-3.5 text-xs font-mono space-y-2">
              <div className="text-slate-400 flex justify-between">
                <span>Active Routing Path:</span>
                <span className="text-amber-400 font-bold">Node #{String(currentHive.id).padStart(3, "0")}</span>
              </div>
              
              {/* Route Hop Flow */}
              <div className="flex items-center gap-2 py-1 overflow-x-auto text-[11px]">
                {currentHive.meshRoute.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg text-slate-200 whitespace-nowrap font-medium">
                      {step}
                    </span>
                    {idx < currentHive.meshRoute.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/50 text-[10px] text-slate-400">
                <div>
                  <span className="text-slate-500 block">RSSI Signal:</span>
                  <span className="text-white font-bold">{currentHive.rssi} dBm</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SNR Ratio:</span>
                  <span className="text-emerald-400 font-bold">+{currentHive.snr} dB</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ADR Config:</span>
                  <span className="text-cyan-400 font-bold">SF7 / 125kHz</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================
            RIGHT COLUMN: DEEP DIAGNOSTIC INSPECTOR (ENTERPRISE MULTI-PANEL)
            ================================================================== */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Selected Hive Header Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-extrabold text-base">
                  #{String(currentHive.id).padStart(3, "0")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold text-white">{currentHive.apiaryZone}</h2>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      currentHive.status === "NOMINAL"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : currentHive.status === "PRE_SWARM"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                        : currentHive.status === "QUEEN_FAILURE"
                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
                        : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    }`}>
                      {currentHive.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">
                    Firmware: {currentHive.firmware} • Synced: {currentHive.lastPingSecAgo}s ago • Battery: {currentHive.batteryPct}% LiFePO4
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAudioTone()}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                    audioToneActive
                      ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                      : "bg-slate-800 hover:bg-slate-700 text-cyan-400 border-slate-700"
                  }`}
                >
                  {audioToneActive ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{audioToneActive ? "Mute Tone" : "Audio Tone"}</span>
                </button>

                <button
                  onClick={() => setIsQrCertModalOpen(true)}
                  className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Seal Cert</span>
                </button>
              </div>
            </div>

            {/* Diagnostic Inspector Tabs */}
            <div className="flex flex-wrap gap-2 text-xs font-mono border-b border-slate-800 pb-2">
              {[
                { id: "DIAGNOSTICS", label: "Executive Deep View", icon: Layers },
                { id: "FFT_AUDIO", label: "128-pt FFT Bio-Acoustics", icon: Activity },
                { id: "THERMAL", label: "5-Frame CUSUM Heatmap", icon: Thermometer },
                { id: "GAS_PLUME", label: "SCD41/BME688 Plume", icon: Wind },
                { id: "CHAIN_EXPLORER", label: "Honey Chain Ledger", icon: Lock },
                { id: "GEMMA_AI", label: "Gemma-2B On-Device AI", icon: Bot },
                { id: "PLAYDATE", label: "Playdate Field Unit", icon: Laptop },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all font-semibold ${
                      isActive
                        ? "bg-slate-800 text-amber-400 border border-amber-400/40 shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ================================================================
                TAB CONTENT AREA
                ================================================================ */}
            
            {/* TAB 1 & DEFAULT: EXECUTIVE DEEP VIEW (Combines Top Sensors) */}
            {(activeTab === "DIAGNOSTICS" || activeTab === "FFT_AUDIO") && (
              <div className="space-y-4">
                
                {/* 128-PT FFT SPECTRUM ANALYZER (50 Hz - 1200 Hz) */}
                <div className="bg-[#1e293b]/70 border border-slate-700/70 rounded-2xl p-4 shadow-lg space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-extrabold text-white">128-Point FFT Bio-Acoustic Spectrum Analyzer</h3>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        50 Hz - 1200 Hz
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      Dominant Peak: <span className="text-amber-400 font-bold">{selectedHarmonicFreq} Hz</span>
                    </div>
                  </div>

                  {/* Visual Spectrum Bars */}
                  <div className="bg-[#090d16] p-3 rounded-xl border border-slate-800 relative">
                    
                    {/* Peak frequency marker tags overlaid */}
                    <div className="flex justify-between text-[9px] font-mono text-slate-500 pb-1 border-b border-slate-800/60 mb-2">
                      <span>50 Hz</span>
                      <span className="text-emerald-400">100-150 Hz (Foraging)</span>
                      <span className="text-amber-400 font-bold">220-250 Hz (Nominal)</span>
                      <span className="text-rose-400 font-bold">450-520 Hz (Swarm Piping)</span>
                      <span className="text-purple-400">900 Hz (Queen)</span>
                      <span>1200 Hz</span>
                    </div>

                    {/* 128 Frequency Bars Canvas/SVG */}
                    <div className="h-36 flex items-end gap-[1.5px] w-full pt-2">
                      {fftSpectrum.map((bin, idx) => {
                        const heightPct = Math.max(8, Math.min(100, (bin.magnitudeDb + 85) * 1.5));
                        let barColor = "bg-slate-700 hover:bg-slate-500";
                        if (bin.freqHz >= 100 && bin.freqHz <= 160) barColor = "bg-emerald-500/70";
                        if (bin.freqHz >= 210 && bin.freqHz <= 260) barColor = "bg-emerald-400";
                        if (bin.freqHz >= 310 && bin.freqHz <= 370) barColor = "bg-yellow-400";
                        if (bin.freqHz >= 440 && bin.freqHz <= 530) barColor = "bg-amber-400";
                        if (bin.freqHz >= 850 && bin.freqHz <= 950) barColor = "bg-purple-400";
                        if (bin.isPeak) barColor = "bg-cyan-400 ring-1 ring-white animate-pulse";

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setCustomHarmonicFreq(bin.freqHz);
                              toggleAudioTone(bin.freqHz);
                            }}
                            className={`flex-1 rounded-t-sm transition-all cursor-pointer ${barColor}`}
                            style={{ height: `${heightPct}%` }}
                            title={`${bin.freqHz} Hz | ${bin.magnitudeDb.toFixed(1)} dBV`}
                          />
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/60 mt-1">
                      <span>Interactive Scrubbing: Click any bar to synthesize acoustic frequency</span>
                      <span className="text-cyan-400 font-semibold">INT8 128-pt FFT (8.2ms Edge Latency)</span>
                    </div>
                  </div>

                  {/* Preset Harmonic Quick Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {[
                      { freq: 225, label: "225 Hz: Nominal Queen-Right", color: "text-emerald-400 border-emerald-500/30" },
                      { freq: 485, label: "485 Hz: Swarm Piping Buzz", color: "text-amber-400 border-amber-500/30" },
                      { freq: 340, label: "340 Hz: Varroa Agitation", color: "text-rose-400 border-rose-500/30" },
                      { freq: 285, label: "285 Hz: Queenless Roar", color: "text-yellow-400 border-yellow-500/30" },
                    ].map((preset) => (
                      <button
                        key={preset.freq}
                        onClick={() => {
                          setCustomHarmonicFreq(preset.freq);
                          if (audioToneActive) toggleAudioTone(preset.freq);
                        }}
                        className={`p-2 rounded-xl text-left bg-[#090d16] border text-[11px] font-mono font-semibold transition-all hover:bg-slate-800 ${preset.color} ${
                          selectedHarmonicFreq === preset.freq ? "ring-1 ring-white bg-slate-800" : ""
                        }`}
                      >
                        <span className="block font-bold">{preset.freq} Hz</span>
                        <span className="text-[9px] text-slate-400">{preset.label.split(":")[1]}</span>
                      </button>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: 5-POINT FRAME THERMAL GRADIENT & CUSUM STATISTICAL DRIFT */}
            {(activeTab === "DIAGNOSTICS" || activeTab === "THERMAL") && (
              <div className="bg-[#1e293b]/70 border border-slate-700/70 rounded-2xl p-4 shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-extrabold text-white">5-Point Frame Thermal Gradient & CUSUM Drift Detection</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400">CUSUM Drift Score:</span>
                    <span className={`font-bold px-2 py-0.5 rounded border ${
                      currentHive.thermal.cusumScore > 1.5
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    }`}>
                      {currentHive.thermal.cusumScore} ({currentHive.thermal.cusumDriftStatus.replace(/_/g, " ")})
                    </span>
                  </div>
                </div>

                {/* 5-Frame Hive Cross-Section Heatmap */}
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { frame: "Frame 1", label: "Outer Left Honey", temp: currentHive.thermal.frame1OuterLeft, ideal: "32.0 - 33.5°C" },
                    { frame: "Frame 2", label: "Brood Margin", temp: currentHive.thermal.frame2BroodLeft, ideal: "34.0 - 34.8°C" },
                    { frame: "Frame 3", label: "Core Brood Nest", temp: currentHive.thermal.frame3CoreQueen, ideal: "34.5 - 35.5°C (Target)", isCore: true },
                    { frame: "Frame 4", label: "Brood Margin", temp: currentHive.thermal.frame4BroodRight, ideal: "34.0 - 34.8°C" },
                    { frame: "Frame 5", label: "Outer Right Honey", temp: currentHive.thermal.frame5OuterRight, ideal: "32.0 - 33.5°C" },
                  ].map((f, idx) => {
                    // Compute heat color
                    let tempColor = "from-emerald-950 to-emerald-900/60 border-emerald-500/40 text-emerald-300";
                    if (f.temp > 35.8) tempColor = "from-amber-950 to-amber-900/60 border-amber-500/60 text-amber-300";
                    if (f.temp > 36.5) tempColor = "from-rose-950 to-rose-900/60 border-rose-500/60 text-rose-300 animate-pulse";
                    if (f.temp < 33.5 && f.isCore) tempColor = "from-cyan-950 to-cyan-900/60 border-cyan-500/60 text-cyan-300";

                    return (
                      <div
                        key={idx}
                        className={`bg-gradient-to-b ${tempColor} border rounded-xl p-3 flex flex-col justify-between text-center relative shadow-md`}
                      >
                        {f.isCore && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-mono text-[8px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                            Queen Core
                          </span>
                        )}
                        <div className="text-[10px] font-mono text-slate-400 font-medium">{f.frame}</div>
                        <div className="text-xl sm:text-2xl font-extrabold font-mono py-1">{f.temp}°C</div>
                        <div className="text-[9px] text-slate-300 font-mono leading-tight">{f.label}</div>
                        <div className="text-[8px] text-slate-400 font-mono mt-1 opacity-75">{f.ideal}</div>
                      </div>
                    );
                  })}
                </div>

                {/* CUSUM Statistical Explanation */}
                <div className="bg-[#090d16] p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span className="text-slate-300 font-semibold">CUSUM Statistical Homeostasis Engine ($S_k$):</span>
                    <span className="text-amber-400 font-bold">Alarm Threshold $h = 0.45\sigma$</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                    Calculates cumulative thermal deviations across the 5 TMP117 probes. A drift score above 1.5 indicates disruption of nurse bee thermoregulation (brood cooling or pre-swarm hyperthermia).
                  </p>
                </div>

              </div>
            )}

            {/* TAB 3: SCD41 NDIR CO2 & BME688 MULTI-GAS PLUME GAUGES */}
            {(activeTab === "DIAGNOSTICS" || activeTab === "GAS_PLUME") && (
              <div className="bg-[#1e293b]/70 border border-slate-700/70 rounded-2xl p-4 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-extrabold text-white">SCD41 NDIR CO2 & BME688 Multi-Gas Plume Gauges</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full font-bold">
                    Ventilation: {currentHive.gas.ventilationStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* CO2 Meter */}
                  <div className="bg-[#090d16] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>SCD41 NDIR CO2</span>
                      <span className="text-slate-500">ppm</span>
                    </div>
                    <div className="my-2">
                      <div className="text-2xl font-extrabold font-mono text-white">
                        {currentHive.gas.scd41Co2Ppm} <span className="text-xs text-slate-400 font-normal">ppm</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            currentHive.gas.scd41Co2Ppm > 2000 ? "bg-rose-500" : currentHive.gas.scd41Co2Ppm > 1500 ? "bg-amber-400" : "bg-emerald-400"
                          }`}
                          style={{ width: `${Math.min(100, (currentHive.gas.scd41Co2Ppm / 3000) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Nominal: 800 - 1500 ppm
                    </span>
                  </div>

                  {/* BME688 VOC Sensor */}
                  <div className="bg-[#090d16] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>BME688 AI VOC</span>
                      <span className="text-slate-500">kΩ Gas</span>
                    </div>
                    <div className="my-2">
                      <div className="text-2xl font-extrabold font-mono text-purple-300">
                        {currentHive.gas.bme688VocKohm} <span className="text-xs text-slate-400 font-normal">kΩ</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className="h-full bg-purple-400"
                          style={{ width: `${Math.min(100, (currentHive.gas.bme688VocKohm / 200) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Target Air Purity: &gt;120 kΩ
                    </span>
                  </div>

                  {/* Alarm Pheromone Index */}
                  <div className="bg-[#090d16] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>Alarm Pheromone</span>
                      <span className="text-slate-500">Isopentyl Acetate</span>
                    </div>
                    <div className="my-2">
                      <div className="text-2xl font-extrabold font-mono text-amber-400">
                        {currentHive.gas.isopentylAcetateIndex} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className={`h-full ${currentHive.gas.isopentylAcetateIndex > 50 ? "bg-rose-500" : "bg-emerald-400"}`}
                          style={{ width: `${currentHive.gas.isopentylAcetateIndex}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Low Agitation: &lt;25
                    </span>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 4: HONEY CHAIN BLOCKCHAIN BLOCK EXPLORER */}
            {(activeTab === "CHAIN_EXPLORER") && (
              <div className="bg-[#1e293b]/70 border border-slate-700/70 rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-extrabold text-white">Honey Chain Cryptographic Block Explorer</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                    Block #{currentHive.blockchain.blockNumber} Sealed
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-400 leading-relaxed">
                  Every 4 hours, multi-sensor telemetry vectors (TMP117 temperatures, 128-pt FFT acoustics, SCD41 CO2, and weight delta) are sealed onto the Honey Chain decentralized ledger with SHA-256 cryptographic proofs, guaranteeing 100% organic honey provenance.
                </p>

                <div className="bg-[#090d16] rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-2">
                    <span className="text-slate-400">SHA-256 Block Hash:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold truncate max-w-[280px] sm:max-w-md">
                        {currentHive.blockchain.blockHash}
                      </span>
                      <button
                        onClick={() => copyBlockHash(currentHive.blockchain.blockHash)}
                        className="p-1 text-slate-400 hover:text-white"
                        title="Copy Hash"
                      >
                        {isCopiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1">
                    <div>
                      <span className="text-slate-500 block">Merkle Root:</span>
                      <span className="text-cyan-300">{currentHive.blockchain.merkleRoot}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Timestamp:</span>
                      <span className="text-slate-300">{currentHive.blockchain.timestamp}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Batch Identifier:</span>
                      <span className="text-emerald-400 font-bold">{currentHive.blockchain.batchId}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Botanical Source:</span>
                      <span className="text-amber-300">{currentHive.blockchain.floralSource}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsQrCertModalOpen(true)}
                    className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-extrabold px-4 py-2 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View & Print QR Verification Certificate</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: GEMMA-2B ON-DEVICE APICULTURAL ASSISTANT (CONVERSATIONAL SLM) */}
            {(activeTab === "GEMMA_AI") && (
              <div className="bg-[#1e293b]/70 border border-slate-700/70 rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-sm font-extrabold text-white">Gemma-2B-IT Quantized Apicultural SLM</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full font-bold">
                    WebGPU / INT4 Local Engine
                  </span>
                </div>

                {/* Context Pills */}
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                    Target: Hive #{currentHive.id}
                  </span>
                  <span className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded border border-slate-800">
                    Acoustic: {currentHive.peakFrequencyHz} Hz
                  </span>
                  <span className="bg-slate-900 text-cyan-400 px-2 py-0.5 rounded border border-slate-800">
                    CUSUM: +{currentHive.thermal.cusumScore}
                  </span>
                  <span className="bg-slate-900 text-purple-400 px-2 py-0.5 rounded border border-slate-800">
                    CO2: {currentHive.gas.scd41Co2Ppm} ppm
                  </span>
                </div>

                {/* Chat Stream Window */}
                <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-4 max-h-[300px] overflow-y-auto space-y-3 font-mono text-xs custom-scrollbar">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mb-1">
                        <span>{msg.role === "user" ? "Apiary Tech" : "Gemma-2B SLM"}</span>
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>
                      <div
                        className={`p-3 rounded-2xl max-w-[90%] whitespace-pre-wrap leading-relaxed ${
                          msg.role === "user"
                            ? "bg-amber-400 text-slate-950 font-semibold"
                            : "bg-[#1e293b] border border-slate-700 text-slate-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isStreamingGemma && (
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono py-2">
                      <Zap className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing edge response...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Prompt Suggestions */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Analyze Hive #88 acoustic anomaly",
                    "Explain CUSUM brood drift reading",
                    "Evaluate Varroa surge intervention",
                    "Generate harvest batch seal",
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendGemma(preset)}
                      className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all"
                    >
                      💡 {preset}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendGemma();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Ask Gemma-2B about hive acoustics, CUSUM drift, or harvest forecast..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    disabled={isStreamingGemma || !inputMessage.trim()}
                    className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-mono font-extrabold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </button>
                </form>

              </div>
            )}

            {/* TAB 6: PLAYDATE FIELD CONSOLE INTEGRATION */}
            {(activeTab === "PLAYDATE") && (
              <div className="bg-[#1e293b]/70 border border-slate-700/70 rounded-2xl p-5 shadow-lg flex flex-col items-center justify-center space-y-4">
                <div className="w-full flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-extrabold text-white">Playdate Field Unit Simulator</h3>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    Connected to HIVE #{String(currentHive.id).padStart(3, "0")}
                  </span>
                </div>

                <div className="scale-90 sm:scale-95 py-2">
                  <PlaydateConsole
                    initialHiveId={currentHive.id}
                    onHiveChange={(id) => {
                      setSelectedHiveId(id);
                      setCustomHarmonicFreq(null);
                    }}
                    frequency={selectedHarmonicFreq}
                    onFrequencyChange={(f) => setCustomHarmonicFreq(f)}
                    compact
                  />
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* ====================================================================
          MODAL: HONEY CHAIN PRINTABLE QR CODE CERTIFICATE
          ==================================================================== */}
      {isQrCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsQrCertModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Certificate Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>OFFICIAL HONEY CHAIN VERIFICATION</span>
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight pt-1">
                Certificate of Organic Honey Provenance
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Tamper-Proof Telemetry Cryptographically Sealed On-Chain
              </p>
            </div>

            {/* Certificate Body Card */}
            <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
              
              {/* QR Code SVG / Visual */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl text-slate-950 shadow-inner">
                <QrCode className="w-32 h-32 text-slate-900" />
                <span className="text-[10px] font-mono font-bold text-slate-700 mt-1 tracking-wider">
                  SCAN TO VERIFY SHA-256 HASH
                </span>
              </div>

              {/* Certificate Details */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch ID:</span>
                  <span className="text-amber-400 font-bold">{currentHive.blockchain.batchId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Apiary Node:</span>
                  <span className="text-white font-bold">Hive #{currentHive.id} ({currentHive.apiaryZone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Floral Source:</span>
                  <span className="text-emerald-400 font-semibold">{currentHive.blockchain.floralSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Purity & Moisture:</span>
                  <span className="text-cyan-300">{currentHive.blockchain.purityPct}% Purity • {currentHive.blockchain.moisturePct}% H2O</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Block Seal Hash:</span>
                  <span className="text-slate-300 truncate max-w-[200px]">{currentHive.blockchain.blockHash}</span>
                </div>
              </div>

            </div>

            {/* Print & Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-extrabold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              
              <button
                onClick={() => setIsQrCertModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono font-semibold px-4 py-2.5 rounded-xl text-xs transition-all border border-slate-700"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

