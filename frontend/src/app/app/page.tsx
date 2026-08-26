"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Radio, Activity, Thermometer, Zap, ShieldCheck,
  QrCode, Search, ArrowLeft, Sparkles, Volume2,
  VolumeX, Lock, Laptop, Cpu, Network,
  Wind, Layers, Compass, Printer, Bot, Send,
  ChevronRight, Check, Copy, X, AlertTriangle,
  TrendingUp, Award, Database, Smartphone,
  Scan, CheckCircle2, Navigation, Mic, MicOff,
  Flame, HelpCircle, ChevronDown, CheckCheck,
  RefreshCw, MapPin, Gauge, ShieldAlert,
  Play, Square, Info
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
  yard: "Yard Alpha" | "Yard Beta";
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
  gpsDistanceMeters: number;
  gpsBearingDeg: number;
  gpsBearingText: string;
  tiltAngleDeg: number;
  urgencyReason?: string;
  recommendedAction?: string;
}

/* ============================================================================
   100-HIVE FLEET GENERATOR (Yard Alpha 1-50, Yard Beta 51-100)
   ============================================================================ */

function generateFleetTelemetry(): HiveNode[] {
  return Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    const yard: "Yard Alpha" | "Yard Beta" = id <= 50 ? "Yard Alpha" : "Yard Beta";
    const yardName = id <= 50 ? "Yard Alpha (North Ridge)" : "Yard Beta (Wildflower Valley)";
    
    let status: HiveStatus = "NOMINAL";
    let peakFrequencyHz = 225 + ((id * 7) % 25);
    let dominantHarmonic = "220-250 Hz (Nominal Colony Drone)";
    let healthIndex = 95 + ((id * 3) % 5);
    let varroaMites = +(1.1 + ((id % 4) * 0.3)).toFixed(1);
    const weightKg = +(43.5 + ((id % 15) * 0.7)).toFixed(1);
    let deltaWeightKg = +(0.65 + ((id % 7) * 0.12)).toFixed(2);
    let tiltAngleDeg = 0.8 + ((id % 5) * 0.2);
    
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

    let urgencyReason: string | undefined;
    let recommendedAction: string | undefined;

    // --- ANOMALOUS HIVES FOR TRIAGE ENGINE ---
    // 1. Hive #042 (Yard Alpha): Swarm Risk
    if (id === 42) {
      status = "PRE_SWARM";
      peakFrequencyHz = 485;
      dominantHarmonic = "450-520 Hz (Virgin Queen Piping & Swarm Buzz)";
      healthIndex = 72;
      frame3 = 36.8;
      frame2 = 35.9;
      frame4 = 35.8;
      cusumScore = 2.45;
      cusumDriftStatus = "SWARM_PRE_HEATING";
      scd41Co2 = 2480;
      isopentylAcetate = 58;
      ventilationStatus = "FANNING_ACTIVE";
      deltaWeightKg = -0.15;
      urgencyReason = "485 Hz queen piping detected + Brood pre-heating (+2.45°C CUSUM drift). Estimated swarm departure within 18 hours.";
      recommendedAction = "Perform immediate hive split or Demaree swarm manipulation. Inspect frames 2 & 4 for queen swarm cells.";
    }
    // 2. Hive #015 (Yard Alpha): Queen Piping / Failure
    else if (id === 15) {
      status = "QUEEN_FAILURE";
      peakFrequencyHz = 285;
      dominantHarmonic = "260-310 Hz (Queenless Roar & Agitation Warble)";
      healthIndex = 64;
      frame3 = 33.1;
      frame2 = 32.8;
      frame4 = 32.9;
      cusumScore = 1.95;
      cusumDriftStatus = "BROOD_CHILL_RISK";
      scd41Co2 = 910;
      isopentylAcetate = 74;
      deltaWeightKg = 0.05;
      urgencyReason = "Queenless acoustic roar at 285 Hz with brood chill risk (33.1°C core). High alarm pheromone detected (74/100).";
      recommendedAction = "Verify queen presence or introduce mated caged queen. Check for emergency supersedure cups.";
    }
    // 3. Hive #073 (Yard Beta): Varroa Mite Surge
    else if (id === 73) {
      status = "VARROA_SURGE";
      peakFrequencyHz = 340;
      dominantHarmonic = "320-370 Hz (Grooming Agitation & DWV Viral Stress)";
      healthIndex = 58;
      varroaMites = 5.4;
      cusumScore = 1.42;
      cusumDriftStatus = "THERMAL_DRIFT_ALERT";
      bme688Voc = 82;
      isopentylAcetate = 44;
      deltaWeightKg = +0.18;
      urgencyReason = "Varroa density critical at 5.4 mites/100 bees (threshold 3.0). High frequency grooming agitation (340 Hz).";
      recommendedAction = "Apply immediate formic acid flash vapor or thymol treatment pad. Screen bottom board count in 48 hrs.";
    }
    // 4. Hive #088 (Yard Beta): Tilt / Tamper Alert
    else if (id === 88) {
      status = "TAMPER";
      peakFrequencyHz = 390;
      dominantHarmonic = "380-420 Hz (Physical Disturbance Vibration)";
      healthIndex = 69;
      tiltAngleDeg = 14.2;
      isopentylAcetate = 68;
      cusumScore = 1.15;
      urgencyReason = "Accelerometer detects 14.2° tilt displacement (bear / wind gust tamper alert). Elevated cluster agitation.";
      recommendedAction = "Physically realign hive stand and strap ratchet securely. Check outer lid seal and entrance reducer.";
    }

    const hops = id <= 25 ? 1 : id <= 70 ? 2 : 3;
    const meshRoute = hops === 1
      ? [`Node #${String(id).padStart(3, "0")}`, "Antmicro CM4 Base Station"]
      : hops === 2
      ? [`Node #${String(id).padStart(3, "0")}`, `Relay #${String((id * 3) % 25 + 1).padStart(3, "0")}`, "Antmicro CM4 Base Station"]
      : [`Node #${String(id).padStart(3, "0")}`, `Relay #${String(id + 4).padStart(3, "0")}`, `Relay #${String(12).padStart(3, "0")}`, "Antmicro CM4 Base Station"];

    const gpsDistanceMeters = 8 + (id * 3.4) % 180;
    const bearings = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const gpsBearingDeg = (id * 47) % 360;
    const gpsBearingText = bearings[Math.floor(gpsBearingDeg / 45) % 8];

    return {
      id,
      yard,
      apiaryZone: yardName,
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
      lastPingSecAgo: (id % 12) + 1,
      gpsDistanceMeters: Math.round(gpsDistanceMeters),
      gpsBearingDeg,
      gpsBearingText,
      tiltAngleDeg: +tiltAngleDeg.toFixed(1),
      urgencyReason,
      recommendedAction
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
    
    // Background 1/f pink noise floor (-75 to -60 dB)
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

    magnitudeDb = Math.max(-80, Math.min(-12, magnitudeDb));
    const isPeak = Math.abs(freqHz - centerPeakHz) < freqStep;

    return { freqHz, magnitudeDb, isPeak };
  });
}

/* ============================================================================
   MAIN COMPONENT: MOBILE-FIRST FIELD AGRITECH APP
   ============================================================================ */

export default function MobileFieldAgritechApp() {
  const [fleet] = useState<HiveNode[]>(generateFleetTelemetry);
  const [currentTab, setCurrentTab] = useState<"TRIAGE" | "YARDS" | "SCAN" | "PROVENANCE" | "ADVISOR">("TRIAGE");
  
  // Inspected state for field triage (Set of hive IDs)
  const [inspectedHiveIds, setInspectedHiveIds] = useState<Set<number>>(new Set());
  
  // Selected Hive for Deep Inspector Modal/Sheet
  const [selectedHiveId, setSelectedHiveId] = useState<number | null>(42);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [inspectorSubTab, setInspectorSubTab] = useState<"OVERVIEW" | "FFT" | "THERMAL" | "GAS" | "CHAIN" | "PLAYDATE">("OVERVIEW");
  
  // Active Yard Filter for Yards Tab
  const [selectedYard, setSelectedYard] = useState<"Yard Alpha" | "Yard Beta">("Yard Alpha");
  const [yardSearchQuery, setYardSearchQuery] = useState<string>("");

  // Triage filter: show only anomalous or all
  const [triageFilter, setTriageFilter] = useState<"ANOMALOUS_ONLY" | "ALL">("ANOMALOUS_ONLY");

  // Web Audio Synthesizer State
  const [audioToneActive, setAudioToneActive] = useState<boolean>(false);
  const [activeToneFreq, setActiveToneFreq] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  // Web Speech API Voice Synthesizer State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // NFC & QR Scanner State
  const [isScanningNfc, setIsScanningNfc] = useState<boolean>(false);
  const [scannedHiveResult, setScannedHiveResult] = useState<HiveNode | null>(null);
  const [scanSuccessAnim, setScanSuccessAnim] = useState<boolean>(false);

  // Compass Navigation Modal State
  const [navTargetHive, setNavTargetHive] = useState<HiveNode | null>(null);

  // Honey Chain Jar Modal
  const [isJarCertOpen, setIsJarCertOpen] = useState<boolean>(false);
  const [isCopiedHash, setIsCopiedHash] = useState<boolean>(false);

  // SLM Gemma-2B Assistant State
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "gemma"; text: string; time: string }>>([
    {
      role: "gemma",
      text: "⚡ HiveOS Edge Gemma-2B SLM online. I am monitoring all 100 hives across Yard Alpha and Beta. Hive #042 requires immediate swarm mitigation. Tap 'Read Voice Briefing' or speak any question.",
      time: "14:20:00"
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isGemmaThinking, setIsGemmaThinking] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Frame presentation toggle (Desktop Phone Frame Bezel vs Full Wide Screen)
  const [viewMode, setViewMode] = useState<"PHONE_FRAME" | "FULL_WIDTH">("PHONE_FRAME");

  // Selected Hive object
  const currentHive = useMemo(() => {
    const id = selectedHiveId ?? 42;
    return fleet.find((h) => h.id === id) || fleet[0];
  }, [fleet, selectedHiveId]);

  // Anomalous Hives count & list
  const anomalousHives = useMemo(() => {
    return fleet.filter((h) => h.status !== "NOMINAL");
  }, [fleet]);

  const nominalHives = useMemo(() => {
    return fleet.filter((h) => h.status === "NOMINAL");
  }, [fleet]);

  // 128-pt FFT Spectrum data for selected hive
  const selectedFreq = activeToneFreq ?? currentHive.peakFrequencyHz;
  const fftSpectrum = useMemo(() => {
    return generate128PointFft(selectedFreq, currentHive.status);
  }, [selectedFreq, currentHive.status]);

  // Web Audio Tone Synthesis
  const toggleAudioTone = useCallback((freq?: number) => {
    const targetFreq = freq || currentHive.peakFrequencyHz;
    
    if (audioToneActive) {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {
          // ignore
        }
      }
      setAudioToneActive(false);
      setActiveToneFreq(null);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        setAudioToneActive(true);
        setActiveToneFreq(targetFreq);
      } catch (err) {
        console.warn("Audio init failed:", err);
      }
    }
  }, [audioToneActive, currentHive.peakFrequencyHz]);

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Web Speech API Voice Debrief
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Web Speech API not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Mark Hive Inspected Toggle
  const toggleInspectHive = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setInspectedHiveIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Trigger NFC / QR Scan Simulation
  const handleSimulateNfcScan = (targetHiveId?: number) => {
    setIsScanningNfc(true);
    setScannedHiveResult(null);
    setScanSuccessAnim(false);

    setTimeout(() => {
      const matched = targetHiveId
        ? fleet.find((h) => h.id === targetHiveId) || fleet[0]
        : fleet[Math.floor(Math.random() * fleet.length)];
      
      setScannedHiveResult(matched);
      setIsScanningNfc(false);
      setScanSuccessAnim(true);
      setSelectedHiveId(matched.id);
    }, 1200);
  };

  // Gemma Chat Dispatch
  const handleSendGemmaMessage = (customPrompt?: string) => {
    const query = customPrompt || chatInput;
    if (!query.trim()) return;

    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    setChatMessages((prev) => [...prev, { role: "user", text: query, time }]);
    if (!customPrompt) setChatInput("");
    setIsGemmaThinking(true);

    setTimeout(() => {
      let reply = "";
      const q = query.toLowerCase();

      if (q.includes("swarm") || q.includes("42") || q.includes("485")) {
        reply = `🐝 **Swarm Mitigation Protocol for Hive #042**:\n1. **Diagnostic**: 485 Hz piping buzz detected + 36.8°C core brood nest pre-heating with positive CUSUM drift (+2.45).\n2. **Immediate Action**: Perform a Pagden / Demaree split or remove queen with 2 brood frames to a 5-frame nuc box.\n3. **Add Supers**: Place 2 drawn wax supers above queen excluder to alleviate congestion.`;
      } else if (q.includes("varroa") || q.includes("73") || q.includes("mite")) {
        reply = `🔬 **Varroa Surge Protocol for Hive #073**:\n1. **Diagnostic**: 5.4 mites / 100 bees (threshold is 3.0%). Agitation buzz at 340 Hz.\n2. **Immediate Action**: Apply Formic Pro (2 strips) or Apivar amitraz strips if daytime temps allow.\n3. **Follow-up**: Re-test natural mite fall count on bottom inspection board in 48 hours.`;
      } else if (q.includes("queen") || q.includes("15") || q.includes("roar")) {
        reply = `👑 **Queen Failure Protocol for Hive #015**:\n1. **Diagnostic**: 285 Hz queenless roar + brood nest cooling to 33.1°C with 74/100 alarm pheromone.\n2. **Immediate Action**: Inspect for emergency queen cells. Introduce a mated Italian/Carniolan queen in a candy-plugged introduction cage.`;
      } else if (q.includes("debrief") || q.includes("summary") || q.includes("report")) {
        reply = `📋 **Daily Apiary Field Summary**:\n- Total Active Fleet: 100 hives across Yard Alpha & Beta (100% online LoRa mesh).\n- Status: 96 Nominal, 4 Action Required (#042 Swarm, #015 Queen, #073 Varroa, #088 Tilt).\n- Daily Honey Flow: +48.2 kg total flux (+0.65 kg/hive avg).\n- Immediate Priority: Inspect Hive #042 in Yard Alpha first.`;
      } else {
        reply = `⚡ **Gemma-2B On-Device AI**: Currently analyzing Hive #${currentHive.id} (${currentHive.apiaryZone}). Core Temp is ${currentHive.thermal.frame3CoreQueen}°C, Acoustic Peak is ${currentHive.peakFrequencyHz} Hz, and CO2 is ${currentHive.gas.scd41Co2Ppm} ppm. INT8 local engine executing at 8.2ms latency with 0 cloud dependencies.`;
      }

      setChatMessages((prev) => [...prev, { role: "gemma", text: reply, time: new Date().toLocaleTimeString("en-US", { hour12: false }) }]);
      setIsGemmaThinking(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }, 400);
  };

  const copyBlockHash = (hash: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(hash);
      setIsCopiedHash(true);
      setTimeout(() => setIsCopiedHash(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col items-center justify-start selection:bg-amber-500/30 selection:text-amber-200 antialiased font-sans py-0 md:py-6 px-0 md:px-4">

      {/* ====================================================================
          TOP GLOBAL CONTROLS & DESKTOP TOOLBAR
          ==================================================================== */}
      <header className="w-full max-w-5xl mb-2 sm:mb-4 px-3 sm:px-4 py-2 flex items-center justify-between border-b border-slate-800/60 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 transition-all font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-white text-sm tracking-tight font-sans">
              HiveOS <span className="text-amber-400 text-xs font-mono px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">MOBILE FIELD EDITION</span>
            </span>
          </div>
        </div>

        {/* Viewport Width Toggle & Quick Links */}
        <div className="flex items-center gap-2">
          {/* Hands-Free Voice Audio indicator if speaking */}
          {isSpeaking && (
            <button
              onClick={stopSpeech}
              className="flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2.5 py-1 rounded-lg animate-pulse"
              title="Stop voice briefing"
            >
              <Square className="w-3 h-3 fill-current" />
              <span className="text-[11px] font-bold">Speaking... (Stop)</span>
            </button>
          )}

          <button
            onClick={() => setViewMode(viewMode === "PHONE_FRAME" ? "FULL_WIDTH" : "PHONE_FRAME")}
            className="hidden md:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg transition-all"
            title="Toggle between Mobile Phone Frame container and Wide Field View"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>{viewMode === "PHONE_FRAME" ? "Expand Canvas" : "Phone Frame"}</span>
          </button>
        </div>
      </header>

      {/* ====================================================================
          PHONE FRAME CONTAINER / FIELD APP WRAPPER
          ==================================================================== */}
      <div className={`w-full transition-all duration-300 relative flex flex-col ${
        viewMode === "PHONE_FRAME"
          ? "max-w-[430px] h-[920px] max-h-[96vh] rounded-[48px] border-[8px] border-slate-800/90 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.12)] overflow-hidden bg-[#090d16]"
          : "max-w-4xl min-h-[850px] rounded-3xl border border-slate-800 shadow-2xl bg-[#090d16] overflow-hidden"
      }`}>

        {/* ------------------------------------------------------------------
            PHONE STATUS BAR (Time, Cellular, Wifi, Battery)
            ------------------------------------------------------------------ */}
        <div className="bg-[#090d16]/95 backdrop-blur-md pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 z-30 border-b border-slate-800/40 select-none">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-extrabold text-xs">14:20</span>
            <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1 rounded">LoRa 915M</span>
          </div>

          {/* Dynamic Island / Speaker Notch in Phone Frame Mode */}
          {viewMode === "PHONE_FRAME" && (
            <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-1.5 px-2 border border-slate-800/50 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-1 bg-slate-800 rounded-full" />
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-emerald-400">
              <Radio className="w-3 h-3 animate-pulse" />
              <span className="text-[10px]">99.8%</span>
            </div>
            <div className="flex items-center gap-0.5 text-slate-300">
              <span className="text-[10px]">98%</span>
              <div className="w-4 h-2 border border-slate-400 rounded-sm p-0.5 flex items-center">
                <div className="w-full h-full bg-emerald-400 rounded-2xs" />
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            TOP MINI HEADER & YARD PILL SWITCHER
            ------------------------------------------------------------------ */}
        <div className="bg-[#0f172a]/95 border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-sm tracking-tight">Beevil Fleet</span>
                <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-bold">
                  100 Nodes
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400">
                Active Yard: <span className="text-amber-300 font-semibold">{selectedYard}</span>
              </p>
            </div>
          </div>

          {/* Quick Voice Briefing Button */}
          <button
            onClick={() => {
              const summary = "Beevil Field Triage Audio Briefing: 96 hives nominal. 4 hives require immediate action. Hive 42 in Yard Alpha has swarm risk with 485 Hz piping buzz. Hive 15 shows queen failure and brood chill. Hive 73 in Yard Beta has 5.4 mites per 100 varroa surge. Hive 88 has 14 degree tilt alert.";
              speakText(summary);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              isSpeaking
                ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-500/30 animate-pulse"
                : "bg-slate-800/90 hover:bg-slate-700 text-amber-400 border-amber-500/30"
            }`}
            title="Listen to Hands-Free Voice Audio Debrief"
          >
            {isSpeaking ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{isSpeaking ? "Debriefing..." : "Voice Debrief"}</span>
          </button>
        </div>

        {/* ------------------------------------------------------------------
            SCROLLABLE CONTENT CANVAS (TAB BASED)
            ------------------------------------------------------------------ */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 pb-24 space-y-4">
          
          {/* ================================================================
              TAB 1: TRIAGE FEED (Farmer-First Linear / Apple Health Style)
              ================================================================ */}
          {currentTab === "TRIAGE" && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              
              {/* Executive Status Banner */}
              <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-slate-700/80 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    Apiary Fleet Triage Engine
                  </span>
                  <span className="text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                    {inspectedHiveIds.size} / {anomalousHives.length} Inspected
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-white tracking-tight">
                  All Clear: <span className="text-emerald-400">{nominalHives.length} Nominal</span> •{" "}
                  <span className="text-rose-400">{anomalousHives.length} Action Needed</span>
                </h2>
                
                <p className="text-xs text-slate-300 mt-1 font-mono">
                  Zero manual tile hunting. Prioritized emergency feed for field beekeepers.
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 rounded-full h-2 mt-3 overflow-hidden flex">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-500"
                    style={{ width: `${(nominalHives.length / fleet.length) * 100}%` }}
                    title="Nominal"
                  />
                  <div
                    className="bg-amber-400 h-full transition-all duration-500"
                    style={{ width: `${(inspectedHiveIds.size / fleet.length) * 100}%` }}
                    title="Inspected Action Items"
                  />
                  <div
                    className="bg-rose-500 h-full transition-all duration-500"
                    style={{ width: `${((anomalousHives.length - inspectedHiveIds.size) / fleet.length) * 100}%` }}
                    title="Pending Anomalies"
                  />
                </div>

                {/* Filter toggle */}
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setTriageFilter("ANOMALOUS_ONLY")}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border text-center ${
                      triageFilter === "ANOMALOUS_ONLY"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm"
                        : "bg-slate-900/60 text-slate-400 border-slate-800"
                    }`}
                  >
                    🚨 Action Items ({anomalousHives.length})
                  </button>
                  <button
                    onClick={() => setTriageFilter("ALL")}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border text-center ${
                      triageFilter === "ALL"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm"
                        : "bg-slate-900/60 text-slate-400 border-slate-800"
                    }`}
                  >
                    All 100 Hives ({fleet.length})
                  </button>
                </div>
              </div>

              {/* ACTION REQUIRED GLOVE-FRIENDLY CARDS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Priority Anomaly Cards
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">Sorted by Severity</span>
                </div>

                {anomalousHives.map((hive) => {
                  const isInspected = inspectedHiveIds.has(hive.id);

                  let badgeColor = "bg-rose-500/20 text-rose-300 border-rose-500/40";
                  let cardBorder = "border-rose-500/40 hover:border-rose-400";
                  let badgeTitle = hive.status.replace(/_/g, " ");

                  if (hive.status === "PRE_SWARM") {
                    badgeColor = "bg-amber-500/20 text-amber-300 border-amber-500/40";
                    cardBorder = "border-amber-500/40 hover:border-amber-400";
                    badgeTitle = "🚨 SWARM RISK (485 Hz)";
                  } else if (hive.status === "QUEEN_FAILURE") {
                    badgeColor = "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
                    cardBorder = "border-yellow-500/40 hover:border-yellow-400";
                    badgeTitle = "👑 QUEENLESS ROAR (285 Hz)";
                  } else if (hive.status === "VARROA_SURGE") {
                    badgeColor = "bg-rose-500/20 text-rose-300 border-rose-500/40";
                    cardBorder = "border-rose-500/40 hover:border-rose-400";
                    badgeTitle = "🔬 VARROA LOAD (5.4 Mites)";
                  } else if (hive.status === "TAMPER") {
                    badgeColor = "bg-purple-500/20 text-purple-300 border-purple-500/40";
                    cardBorder = "border-purple-500/40 hover:border-purple-400";
                    badgeTitle = "⚠️ 14.2° TILT TAMPER";
                  }

                  return (
                    <div
                      key={hive.id}
                      onClick={() => {
                        setSelectedHiveId(hive.id);
                        setIsInspectorOpen(true);
                      }}
                      className={`bg-[#0f172a] border ${cardBorder} rounded-2xl p-4 shadow-xl transition-all cursor-pointer relative overflow-hidden group ${
                        isInspected ? "opacity-75 border-emerald-500/40 bg-[#0f172a]/70" : ""
                      }`}
                    >
                      {/* Top Row: Hive ID, Yard & Severity Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-extrabold text-base text-amber-400 shadow-inner">
                            #{String(hive.id).padStart(3, "0")}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-white text-sm">{hive.yard}</span>
                              <span className="text-[10px] font-mono text-slate-400">({hive.gpsDistanceMeters}m {hive.gpsBearingText})</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">
                              Synced {hive.lastPingSecAgo}s ago • Bat {hive.batteryPct}%
                            </span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                          {badgeTitle}
                        </span>
                      </div>

                      {/* Diagnostic Urgency Text */}
                      <div className="bg-[#090d16] rounded-xl p-3 border border-slate-800/80 mb-3 space-y-1">
                        <p className="text-xs font-mono text-slate-200 leading-relaxed">
                          {hive.urgencyReason}
                        </p>
                        {hive.recommendedAction && (
                          <div className="pt-1.5 border-t border-slate-800 text-[11px] font-mono text-amber-300 flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">Action:</span>
                            <span>{hive.recommendedAction}</span>
                          </div>
                        )}
                      </div>

                      {/* Micro Metric Gauges */}
                      <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-mono mb-3">
                        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-1.5">
                          <span className="text-[9px] text-slate-500 block">Core Brood</span>
                          <span className={`font-bold ${hive.thermal.frame3CoreQueen > 36 ? "text-amber-400" : hive.thermal.frame3CoreQueen < 33.5 ? "text-cyan-400" : "text-emerald-400"}`}>
                            {hive.thermal.frame3CoreQueen}°C
                          </span>
                        </div>
                        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-1.5">
                          <span className="text-[9px] text-slate-500 block">Acoustics</span>
                          <span className="font-bold text-amber-400">{hive.peakFrequencyHz} Hz</span>
                        </div>
                        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-1.5">
                          <span className="text-[9px] text-slate-500 block">CO2 Level</span>
                          <span className="font-bold text-purple-300">{hive.gas.scd41Co2Ppm} p</span>
                        </div>
                        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-1.5">
                          <span className="text-[9px] text-slate-500 block">Honey Flux</span>
                          <span className="font-bold text-white">{hive.deltaWeightKg > 0 ? `+${hive.deltaWeightKg}` : hive.deltaWeightKg} kg</span>
                        </div>
                      </div>

                      {/* Glove-Friendly Big 1-Tap Action Buttons */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {/* 1. Mark Inspected Button */}
                        <button
                          onClick={(e) => toggleInspectHive(hive.id, e)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center justify-center gap-1.5 shadow-sm ${
                            isInspected
                              ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/20"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                          }`}
                        >
                          {isInspected ? <CheckCheck className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                          <span>{isInspected ? "Inspected" : "Mark Done"}</span>
                        </button>

                        {/* 2. Listen to Acoustics (Web Audio API) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHiveId(hive.id);
                            toggleAudioTone(hive.peakFrequencyHz);
                          }}
                          className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center justify-center gap-1.5 shadow-sm ${
                            audioToneActive && activeToneFreq === hive.peakFrequencyHz
                              ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                              : "bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700"
                          }`}
                        >
                          {audioToneActive && activeToneFreq === hive.peakFrequencyHz ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                          <span>{audioToneActive && activeToneFreq === hive.peakFrequencyHz ? "Mute" : `${hive.peakFrequencyHz}Hz`}</span>
                        </button>

                        {/* 3. Field Compass Navigate */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setNavTargetHive(hive);
                          }}
                          className="py-2.5 px-2 rounded-xl text-xs font-mono font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Navigate</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ALL 96 NOMINAL HIVES (Collapsible / Secondary List) */}
              {triageFilter === "ALL" && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      Nominal Fleet (96 Hives)
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">100% Homeostasis</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {nominalHives.slice(0, 16).map((hive) => (
                      <div
                        key={hive.id}
                        onClick={() => {
                          setSelectedHiveId(hive.id);
                          setIsInspectorOpen(true);
                        }}
                        className="bg-[#0f172a] border border-slate-800 hover:border-emerald-500/40 rounded-xl p-2.5 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs text-white">#{String(hive.id).padStart(3, "0")}</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          <span>{hive.thermal.frame3CoreQueen}°C</span> • <span>{hive.peakFrequencyHz}Hz</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-mono text-center text-slate-500 pt-1">
                    + 80 more nominal hives operating in baseline thermal homeostasis.
                  </p>
                </div>
              )}

            </div>
          )}

          {/* ================================================================
              TAB 2: APIARY YARDS (Yard Alpha 50 Hives / Yard Beta 50 Hives)
              ================================================================ */}
          {currentTab === "YARDS" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Yard Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedYard("Yard Alpha")}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedYard === "Yard Alpha"
                      ? "bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-500/10"
                      : "bg-[#0f172a] border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Yard Alpha</span>
                    <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-300">50 Hives</span>
                  </div>
                  <div className="font-extrabold text-white text-sm mt-0.5">North Ridge Apiary</div>
                  <div className="text-[10px] font-mono text-rose-400 mt-1">2 Action Items (#042, #015)</div>
                </button>

                <button
                  onClick={() => setSelectedYard("Yard Beta")}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedYard === "Yard Beta"
                      ? "bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-500/10"
                      : "bg-[#0f172a] border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Yard Beta</span>
                    <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-300">50 Hives</span>
                  </div>
                  <div className="font-extrabold text-white text-sm mt-0.5">Wildflower Valley</div>
                  <div className="text-[10px] font-mono text-rose-400 mt-1">2 Action Items (#073, #088)</div>
                </button>
              </div>

              {/* Gateway & Apiary Visual Card */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-36 w-full">
                  <Image
                    src="/images/gateway_apiary.jpg"
                    alt="Apiary Yard Gateway"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-slate-200">
                      <span className="text-emerald-400 font-bold">● CM4 Gateway Online</span> (915MHz LoRa)
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-amber-300 font-bold">
                      +24.8 kg 24h Flow
                    </div>
                  </div>
                </div>

                <div className="p-3.5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Station: Antmicro Raspberry Pi CM4</span>
                    <span className="text-cyan-300">RSSI -74 dBm</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Active Hives in Yard:</span>
                    <span className="text-white font-bold">{selectedYard === "Yard Alpha" ? "Hives #001 - #050" : "Hives #051 - #100"}</span>
                  </div>
                </div>
              </div>

              {/* Yard Search & Quick Filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Search ${selectedYard} (e.g. #042, swarm, 485Hz)...`}
                  value={yardSearchQuery}
                  onChange={(e) => setYardSearchQuery(e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 50-Hive Interactive Matrix for Selected Yard */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400 px-1">
                  <span>50-Hive Grid ({selectedYard})</span>
                  <span className="text-amber-400">Tap node for deep telemetry</span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-[380px] overflow-y-auto p-2 bg-[#090d16] rounded-2xl border border-slate-800 custom-scrollbar">
                  {fleet
                    .filter((h) => h.yard === selectedYard)
                    .filter((h) => {
                      const q = yardSearchQuery.toLowerCase();
                      if (!q) return true;
                      return (
                        h.id.toString().includes(q) ||
                        h.status.toLowerCase().includes(q) ||
                        h.dominantHarmonic.toLowerCase().includes(q)
                      );
                    })
                    .map((hive) => {
                      let nodeStyle = "bg-slate-900 border-slate-800 text-slate-300";
                      let dotStyle = "bg-emerald-400";

                      if (hive.status === "PRE_SWARM") {
                        nodeStyle = "bg-amber-500/20 border-amber-500/60 text-amber-300 animate-pulse";
                        dotStyle = "bg-amber-400";
                      } else if (hive.status === "QUEEN_FAILURE") {
                        nodeStyle = "bg-yellow-500/20 border-yellow-500/60 text-yellow-300";
                        dotStyle = "bg-yellow-400";
                      } else if (hive.status === "VARROA_SURGE") {
                        nodeStyle = "bg-rose-500/20 border-rose-500/60 text-rose-300";
                        dotStyle = "bg-rose-400";
                      } else if (hive.status === "TAMPER") {
                        nodeStyle = "bg-purple-500/20 border-purple-500/60 text-purple-300";
                        dotStyle = "bg-purple-400";
                      }

                      return (
                        <button
                          key={hive.id}
                          onClick={() => {
                            setSelectedHiveId(hive.id);
                            setIsInspectorOpen(true);
                          }}
                          className={`h-12 rounded-xl font-mono text-xs font-bold border flex flex-col items-center justify-center transition-all ${nodeStyle} hover:scale-105`}
                        >
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
                            <span>#{String(hive.id).padStart(2, "0")}</span>
                          </div>
                          <span className="text-[9px] opacity-75">{hive.thermal.frame3CoreQueen}°C</span>
                        </button>
                      );
                    })}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================
              TAB 3: SCAN NFC & QR (Field Simulator)
              ================================================================ */}
          {currentTab === "SCAN" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 text-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Field Hardware Scanner
                  </span>
                  <h2 className="text-lg font-extrabold text-white">Instant 1-Tap NFC & QR Reader</h2>
                  <p className="text-xs font-mono text-slate-400">
                    Hold phone within 4cm of hive antenna or point camera at lid QR tag.
                  </p>
                </div>

                {/* Simulated Camera Viewfinder */}
                <div className="relative w-full h-56 bg-slate-950 rounded-2xl border-2 border-dashed border-amber-500/40 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                  
                  {/* Laser Scan Line Animation */}
                  {isScanningNfc && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-bounce" />
                  )}

                  {/* Reticle corners */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400" />

                  {isScanningNfc ? (
                    <div className="flex flex-col items-center gap-2 text-amber-400 font-mono text-xs animate-pulse">
                      <Scan className="w-8 h-8 animate-spin" />
                      <span>Reading NTAG215 RFID / Barcode...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400 font-mono text-xs">
                      <Scan className="w-8 h-8 text-amber-400/60" />
                      <span>Viewfinder Ready</span>
                      <span className="text-[10px] text-slate-500">Tap below to trigger field scan</span>
                    </div>
                  )}
                </div>

                {/* 1-Tap Big NFC Scan Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleSimulateNfcScan(42)}
                    disabled={isScanningNfc}
                    className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-extrabold text-xs rounded-2xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Simulate 1-Tap NFC Touch (Hive #042 Swarm)</span>
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleSimulateNfcScan(15)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] rounded-xl border border-slate-700"
                    >
                      Scan #015 (Queen)
                    </button>
                    <button
                      onClick={() => handleSimulateNfcScan(73)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] rounded-xl border border-slate-700"
                    >
                      Scan #073 (Varroa)
                    </button>
                    <button
                      onClick={() => handleSimulateNfcScan(88)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] rounded-xl border border-slate-700"
                    >
                      Scan #088 (Tamper)
                    </button>
                  </div>
                </div>

                {/* Scan Result Card */}
                {scannedHiveResult && scanSuccessAnim && (
                  <div className="bg-emerald-950/40 border border-emerald-500/60 rounded-2xl p-4 text-left space-y-3 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <div>
                          <span className="font-extrabold text-white text-sm">
                            RFID Tag Identified: Hive #{scannedHiveResult.id}
                          </span>
                          <p className="text-[10px] font-mono text-emerald-300">
                            {scannedHiveResult.apiaryZone}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                        {scannedHiveResult.status}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-slate-300">
                      {scannedHiveResult.urgencyReason || "Nominal colony telemetry verified on-chain."}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedHiveId(scannedHiveResult.id);
                        setIsInspectorOpen(true);
                      }}
                      className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>Open Deep Telemetry Inspector</span>
                    </button>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* ================================================================
              TAB 4: HONEY CHAIN PROVENANCE & PRINTABLE JAR QR
              ================================================================ */}
          {currentTab === "PROVENANCE" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Premium Honey Chain Jar Card */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="relative h-44 w-full bg-slate-950">
                  <Image
                    src="/images/honey_chain_jar.jpg"
                    alt="Honey Chain Organic Jar"
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 font-mono font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md">
                    USDA ORGANIC CERTIFIED
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-extrabold text-sm">Honey Chain Ledger</span>
                    <span className="text-amber-300 font-bold">100% Raw Unpasteurized</span>
                  </div>
                </div>

                <div className="p-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Current Hive Node:</span>
                    <span className="text-amber-400 font-bold">Hive #{currentHive.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Batch Identifier:</span>
                    <span className="text-emerald-400 font-semibold">{currentHive.blockchain.batchId}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Botanical Flora:</span>
                    <span className="text-white">{currentHive.blockchain.floralSource}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Purity & Moisture:</span>
                    <span className="text-cyan-300">{currentHive.blockchain.purityPct}% Purity • {currentHive.blockchain.moisturePct}% H2O</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">SHA-256 Hash:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-300 truncate max-w-[140px] text-[10px]">{currentHive.blockchain.blockHash}</span>
                      <button
                        onClick={() => copyBlockHash(currentHive.blockchain.blockHash)}
                        className="p-1 text-slate-400 hover:text-white"
                        title="Copy Hash"
                      >
                        {isCopiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsJarCertOpen(true)}
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View & Print Customer Jar QR Certificate</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================
              TAB 5: HANDS-FREE VOICE AI ADVISOR & GEMMA-2B SLM
              ================================================================ */}
          {currentTab === "ADVISOR" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Hands-Free Audio Briefing Hero Banner */}
              <div className="bg-[#0f172a] border border-indigo-500/40 rounded-3xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-extrabold text-white">Gemma-2B Quantized SLM</h2>
                      <p className="text-[10px] font-mono text-indigo-300">On-Device INT4 Engine (8.2ms)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const debrief = `Gemma Edge Briefing for Hive ${currentHive.id}. Status is ${currentHive.status}. Brood temperature is ${currentHive.thermal.frame3CoreQueen} degrees Celsius. Acoustic dominant frequency is ${currentHive.peakFrequencyHz} Hertz. ${currentHive.urgencyReason || "Colony is in nominal balance."}`;
                      speakText(debrief);
                    }}
                    className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md shadow-indigo-500/20"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Read Aloud</span>
                  </button>
                </div>

                {/* Quick Audio Preset Buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "Daily Apiary Debrief",
                    "Hive #042 Swarm Split",
                    "Hive #073 Varroa Protocol",
                    "Hive #015 Queen Status",
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendGemmaMessage(preset)}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all"
                    >
                      🎙️ {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Stream Window */}
              <div className="bg-[#090d16] border border-slate-800 rounded-3xl p-4 max-h-[360px] overflow-y-auto space-y-3 font-mono text-xs custom-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mb-1">
                      <span>{msg.role === "user" ? "Field Beekeeper" : "Gemma-2B Edge SLM"}</span>
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
                {isGemmaThinking && (
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono py-2">
                    <Zap className="w-3.5 h-3.5 animate-spin" />
                    <span>Gemma-2B synthesizing response...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendGemmaMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask Gemma about acoustics, splits, or CUSUM drift..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-[#0f172a] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={isGemmaThinking || !chatInput.trim()}
                  className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-mono font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          )}

        </main>

        {/* ------------------------------------------------------------------
            BOTTOM TAB NAVIGATION BAR (5 Tabs - Thumb Zone Ergonomics)
            ------------------------------------------------------------------ */}
        <nav className="absolute bottom-0 inset-x-0 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2 flex items-center justify-around z-30 shadow-2xl select-none">
          {[
            { id: "TRIAGE", label: "Triage", icon: ShieldAlert, badge: anomalousHives.length },
            { id: "YARDS", label: "Yards", icon: MapPin, badge: undefined },
            { id: "SCAN", label: "Scan NFC", icon: Scan, badge: undefined },
            { id: "PROVENANCE", label: "Honey Chain", icon: Lock, badge: undefined },
            { id: "ADVISOR", label: "AI Advisor", icon: Bot, badge: undefined },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as typeof currentTab)}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all relative ${
                  isActive
                    ? "text-amber-400 font-extrabold scale-105"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? "text-amber-400 stroke-[2.5]" : "stroke-[1.8]"}`} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-mono text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-slate-900">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono mt-1 tracking-tight">{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* ====================================================================
          DEEP HIVE INSPECTOR BOTTOM-SHEET / MODAL
          ==================================================================== */}
      {isInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-slate-700/80 rounded-t-[32px] sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-4 sm:p-6 shadow-2xl space-y-4 relative text-slate-100">
            
            {/* Sheet Drag Handle & Close */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto sm:hidden mb-2" />
            <button
              onClick={() => {
                setIsInspectorOpen(false);
                if (audioToneActive) toggleAudioTone();
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-extrabold text-lg">
                #{String(currentHive.id).padStart(3, "0")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-white">{currentHive.apiaryZone}</h2>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    currentHive.status === "NOMINAL"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : currentHive.status === "PRE_SWARM"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                  }`}>
                    {currentHive.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Firmware {currentHive.firmware} • Battery {currentHive.batteryPct}% LiFePO4 • Weight {currentHive.weightKg} kg
                </p>
              </div>
            </div>

            {/* Inspector Sub-Tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs font-mono border-b border-slate-800 pb-2">
              {[
                { id: "OVERVIEW", label: "Full Telemetry", icon: Layers },
                { id: "FFT", label: "128-pt FFT Audio", icon: Activity },
                { id: "THERMAL", label: "5-Frame Thermal", icon: Thermometer },
                { id: "GAS", label: "SCD41 CO2 & Gas", icon: Wind },
                { id: "CHAIN", label: "Honey Chain", icon: Lock },
                { id: "PLAYDATE", label: "Playdate Console", icon: Laptop },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = inspectorSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setInspectorSubTab(tab.id as typeof inspectorSubTab)}
                    className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-semibold transition-all ${
                      isActive
                        ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* --------------------------------------------------------------
                INSPECTOR TAB: 128-PT FFT SPECTRUM VISUALIZER
                -------------------------------------------------------------- */}
            {(inspectorSubTab === "OVERVIEW" || inspectorSubTab === "FFT") && (
              <div className="bg-[#1e293b]/70 border border-slate-700/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">128-Point FFT Bio-Acoustic Spectrum</h3>
                  </div>
                  <button
                    onClick={() => toggleAudioTone(currentHive.peakFrequencyHz)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                      audioToneActive
                        ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                        : "bg-slate-800 text-cyan-300 border-slate-700"
                    }`}
                  >
                    {audioToneActive ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{audioToneActive ? "Mute Buzz" : `Synthesize ${currentHive.peakFrequencyHz}Hz`}</span>
                  </button>
                </div>

                {/* 128 FFT Bars */}
                <div className="bg-[#090d16] p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-[9px] font-mono text-slate-500 pb-1 border-b border-slate-800/60 mb-2">
                    <span>50Hz</span>
                    <span className="text-emerald-400">225Hz Nominal</span>
                    <span className="text-rose-400 font-bold">485Hz Swarm</span>
                    <span className="text-purple-400">900Hz Queen</span>
                    <span>1200Hz</span>
                  </div>

                  <div className="h-28 flex items-end gap-[1.5px] w-full pt-1">
                    {fftSpectrum.map((bin, idx) => {
                      const heightPct = Math.max(8, Math.min(100, (bin.magnitudeDb + 85) * 1.5));
                      let barColor = "bg-slate-700 hover:bg-slate-500";
                      if (bin.freqHz >= 210 && bin.freqHz <= 260) barColor = "bg-emerald-400";
                      if (bin.freqHz >= 310 && bin.freqHz <= 370) barColor = "bg-yellow-400";
                      if (bin.freqHz >= 440 && bin.freqHz <= 530) barColor = "bg-amber-400";
                      if (bin.isPeak) barColor = "bg-cyan-400 ring-1 ring-white animate-pulse";

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleAudioTone(bin.freqHz)}
                          className={`flex-1 rounded-t-xs transition-all cursor-pointer ${barColor}`}
                          style={{ height: `${heightPct}%` }}
                          title={`${bin.freqHz} Hz | ${bin.magnitudeDb.toFixed(1)} dBV`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: 5-FRAME BROOD THERMAL GRADIENT (TMP117)
                -------------------------------------------------------------- */}
            {(inspectorSubTab === "OVERVIEW" || inspectorSubTab === "THERMAL") && (
              <div className="bg-[#1e293b]/70 border border-slate-700/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">5-Frame Brood Thermal Gradient (TMP117 ±0.05°C)</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 text-amber-300 px-2 py-0.5 rounded border border-slate-800 font-bold">
                    CUSUM Drift: {currentHive.thermal.cusumScore}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { label: "F1 Outer", temp: currentHive.thermal.frame1OuterLeft },
                    { label: "F2 Brood", temp: currentHive.thermal.frame2BroodLeft },
                    { label: "F3 Core", temp: currentHive.thermal.frame3CoreQueen, isCore: true },
                    { label: "F4 Brood", temp: currentHive.thermal.frame4BroodRight },
                    { label: "F5 Outer", temp: currentHive.thermal.frame5OuterRight },
                  ].map((f, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl text-center border flex flex-col justify-between ${
                        f.isCore
                          ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                          : "bg-slate-900/80 border-slate-800 text-slate-200"
                      }`}
                    >
                      <span className="text-[9px] font-mono text-slate-400">{f.label}</span>
                      <span className="text-base font-extrabold font-mono py-0.5">{f.temp}°C</span>
                      <span className="text-[8px] font-mono text-slate-500">{f.isCore ? "Queen Target" : "Honey Margin"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: SCD41 CO2 & BME688 MOX AI GAS INDEX
                -------------------------------------------------------------- */}
            {(inspectorSubTab === "OVERVIEW" || inspectorSubTab === "GAS") && (
              <div className="bg-[#1e293b]/70 border border-slate-700/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-purple-400" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">SCD41 NDIR CO2 & BME688 MOX Gas Index</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800 font-bold">
                    Vent: {currentHive.gas.ventilationStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="bg-[#090d16] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">SCD41 CO2</span>
                    <span className="text-lg font-extrabold text-white">{currentHive.gas.scd41Co2Ppm} ppm</span>
                  </div>
                  <div className="bg-[#090d16] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">BME688 VOC</span>
                    <span className="text-lg font-extrabold text-purple-300">{currentHive.gas.bme688VocKohm} kΩ</span>
                  </div>
                  <div className="bg-[#090d16] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Alarm Pheromone</span>
                    <span className="text-lg font-extrabold text-amber-400">{currentHive.gas.isopentylAcetateIndex} / 100</span>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: HARDWARE ENCLOSURE EMBED
                -------------------------------------------------------------- */}
            {inspectorSubTab === "OVERVIEW" && (
              <div className="bg-[#1e293b]/70 border border-slate-700/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs sm:text-sm font-extrabold text-white">Hardware Telemetry Node Enclosure</h3>
                </div>

                <div className="relative h-40 w-full rounded-xl overflow-hidden border border-slate-800">
                  <Image
                    src="/images/node_enclosure.jpg"
                    alt="Beevil Hardware Node Enclosure"
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800">
                    <span>IP67 Ruggedized Enclosure</span>
                    <span className="text-cyan-300">STM32U585 + SX1262 LoRa</span>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: PLAYDATE FIELD CONSOLE
                -------------------------------------------------------------- */}
            {inspectorSubTab === "PLAYDATE" && (
              <div className="bg-[#1e293b]/70 border border-slate-700/80 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                <div className="w-full flex items-center justify-between border-b border-slate-700 pb-2 text-xs font-mono">
                  <span className="text-amber-400 font-bold">Playdate Retro Field Console</span>
                  <span className="text-slate-400">Node #{currentHive.id}</span>
                </div>

                <div className="scale-90 py-2">
                  <PlaydateConsole
                    initialHiveId={currentHive.id}
                    frequency={currentHive.peakFrequencyHz}
                    compact
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ====================================================================
          FIELD COMPASS NAVIGATION MODAL
          ==================================================================== */}
      {navTargetHive && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-amber-500/50 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 relative">
            <button
              onClick={() => setNavTargetHive(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold uppercase">
                Field GPS Bearing HUD
              </span>
              <h2 className="text-lg font-extrabold text-white">Navigate to Hive #{navTargetHive.id}</h2>
              <p className="text-xs font-mono text-slate-400">{navTargetHive.apiaryZone}</p>
            </div>

            {/* Big Compass Rose */}
            <div className="relative w-40 h-40 mx-auto rounded-full border-4 border-slate-800 bg-[#090d16] flex items-center justify-center shadow-inner">
              {/* Compass Needle */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
                style={{ transform: `rotate(${navTargetHive.gpsBearingDeg}deg)` }}
              >
                <div className="w-2 h-16 bg-gradient-to-t from-transparent to-amber-400 rounded-full shadow-[0_0_12px_#f59e0b]" />
              </div>
              <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-slate-950 z-10 flex items-center justify-center shadow-md">
                <Navigation className="w-3 h-3 text-slate-950" />
              </div>

              {/* Cardinal Labels */}
              <span className="absolute top-1 text-[9px] font-mono font-bold text-slate-500">N</span>
              <span className="absolute right-1 text-[9px] font-mono font-bold text-slate-500">E</span>
              <span className="absolute bottom-1 text-[9px] font-mono font-bold text-slate-500">S</span>
              <span className="absolute left-1 text-[9px] font-mono font-bold text-slate-500">W</span>
            </div>

            {/* Distance Callout */}
            <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-3 font-mono text-xs space-y-1">
              <div className="text-2xl font-extrabold text-amber-400">
                {navTargetHive.gpsDistanceMeters} <span className="text-sm font-normal text-slate-400">meters</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Bearing: <span className="text-white font-bold">{navTargetHive.gpsBearingDeg}° ({navTargetHive.gpsBearingText})</span>
              </p>
            </div>

            <button
              onClick={() => setNavTargetHive(null)}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-extrabold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              Close Compass
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          PRINTABLE HONEY CHAIN JAR QR CERTIFICATE MODAL
          ==================================================================== */}
      {isJarCertOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-100 relative">
            <button
              onClick={() => setIsJarCertOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>OFFICIAL HONEY CHAIN VERIFICATION</span>
              </div>
              <h2 className="text-lg font-extrabold text-white tracking-tight pt-1">
                Organic Honey Batch Certificate
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Tamper-Proof Telemetry Cryptographically Sealed On-Chain
              </p>
            </div>

            <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl text-slate-950">
                <QrCode className="w-32 h-32 text-slate-900" />
                <span className="text-[10px] font-mono font-bold text-slate-700 mt-1">
                  SCAN TO VERIFY SHA-256 HASH
                </span>
              </div>

              <div className="space-y-1.5 border-t border-slate-800 pt-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch ID:</span>
                  <span className="text-amber-400 font-bold">{currentHive.blockchain.batchId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Flora:</span>
                  <span className="text-white">{currentHive.blockchain.floralSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Purity:</span>
                  <span className="text-emerald-400 font-semibold">{currentHive.blockchain.purityPct}% Organic</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Jar Label</span>
              </button>
              <button
                onClick={() => setIsJarCertOpen(false)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-xl border border-slate-700"
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
