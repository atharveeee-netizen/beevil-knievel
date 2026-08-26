"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
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
  Play, Square, Info, Sliders, BatteryCharging,
  Wifi, Bluetooth, CheckSquare, Eye, Sun,
  CloudSun, ListChecks, Trash2, Plus, Disc,
  Clock, Shield, Battery, Droplets, HardDrive
} from "lucide-react";
import { PlaydateConsole } from "@/components/PlaydateConsole";
import {
  SpotlightCard,
  DecryptedText,
  CountUp,
  ShinyText,
  StarBorder,
  TiltedCard,
  ClickSpark,
  Magnet
} from "@/components/reactbits";

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
  isopentylAcetateIndex: number; // Alarm pheromone index (0-100)
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
  
  // Explicit 3-Part Field Instrument Hierarchy
  triageTitle: string;
  triageSeverity: string;
  urgencyReason: string;
  fftDiagnosis: string;
  thermalDiagnosis: string;
  gasDiagnosis: string;
  primaryActionTitle: string;
  primaryActionDetail: string;
  secondaryActionTitle: string;
  actionExecutedText: string;
}

export interface AudioNote {
  id: string;
  hiveId?: number;
  yard: "Yard Alpha" | "Yard Beta" | "All Apiaries";
  title: string;
  transcription: string;
  durationSec: number;
  timestamp: string;
}

export interface ChecklistItem {
  id: string;
  category: "PRE_INSPECTION" | "IN_YARD" | "BIOSECURITY";
  title: string;
  subtitle: string;
  completed: boolean;
  priority: "CRITICAL" | "STANDARD";
  hiveId?: number;
}

/* ============================================================================
   100-HIVE FLEET TELEMETRY GENERATOR (Yard Alpha 1-50, Yard Beta 51-100)
   ============================================================================ */

function generateFleetTelemetry(): HiveNode[] {
  return Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    const yard: "Yard Alpha" | "Yard Beta" = id <= 50 ? "Yard Alpha" : "Yard Beta";
    const yardName = id <= 50 ? "Yard Alpha (North Ridge Apiary)" : "Yard Beta (Wildflower Valley)";
    
    let status: HiveStatus = "NOMINAL";
    let peakFrequencyHz = 225 + ((id * 7) % 25);
    let dominantHarmonic = "220-250 Hz (Nominal Colony Drone)";
    let healthIndex = 95 + ((id * 3) % 5);
    let varroaMites = +(1.1 + ((id % 4) * 0.3)).toFixed(1);
    const weightKg = +(43.5 + ((id % 15) * 0.7)).toFixed(1);
    let deltaWeightKg = +(0.65 + ((id % 7) * 0.12)).toFixed(2);
    let tiltAngleDeg = 0.8 + ((id % 5) * 0.2);
    
    // Thermal Profile (TMP117 ±0.05°C)
    const frame1 = +(32.4 + ((id % 5) * 0.1)).toFixed(1);
    let frame2 = +(34.3 + ((id % 3) * 0.1)).toFixed(1);
    let frame3 = +(35.2 + ((id % 4) * 0.08)).toFixed(1);
    let frame4 = +(34.2 + ((id % 3) * 0.1)).toFixed(1);
    const frame5 = +(32.3 + ((id % 5) * 0.1)).toFixed(1);
    let cusumScore = +(0.15 + ((id % 5) * 0.05)).toFixed(2);
    let cusumDriftStatus: FrameThermal["cusumDriftStatus"] = "STABLE_HOMEOSTASIS";

    // Gas Profile (SCD41 & BME688)
    let scd41Co2 = 1150 + ((id * 23) % 300);
    let bme688Voc = 145 + ((id * 11) % 40);
    let isopentylAcetate = 12 + (id % 8);
    const humidity = 58 + (id % 9);
    let ventilationStatus: GasPlume["ventilationStatus"] = "OPTIMAL";

    // Default 3-Part Hierarchy for Nominal Hives
    let triageTitle = `Hive #${String(id).padStart(3, "0")} Nominal Homeostasis`;
    let triageSeverity = "NOMINAL BASELINE";
    let urgencyReason = "Colony in optimal thermal homeostasis. Brood rearing and honey supers accumulating smoothly.";
    let fftDiagnosis = "225 Hz stable queen-right drone cluster harmonic.";
    let thermalDiagnosis = "35.2°C core brood nest temperature within ±0.2°C target range.";
    let gasDiagnosis = "1,180 ppm CO2 and 145 kΩ MOX VOC (adequate natural hive ventilation).";
    let primaryActionTitle = "Log Nominal Weekly Inspection";
    let primaryActionDetail = "Record supers count, weight gain, and brood density into immutable ledger.";
    let secondaryActionTitle = "Check Honey Super Fill Level";
    let actionExecutedText = `Inspection logged for Hive #${String(id).padStart(3, "0")}. Homeostasis verified.`;

    // --- ANOMALOUS HIVES FOR EXCEPTION TRIAGE ENGINE ---
    // 1. Hive #042 (Yard Alpha): Swarm Risk (485 Hz virgin queen piping, +2.45°C brood surge, 2,480 ppm CO2)
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
      
      triageTitle = "Hive #042: Pre-Swarm Critical Alert";
      triageSeverity = "IMMEDIATE SWARM RISK (<18h)";
      urgencyReason = "Acoustic FFT detected 485 Hz virgin queen piping tone with brood nest warming to 36.8°C (+2.45°C CUSUM drift). Estimated swarm departure within 18 hours. Immediate risk of losing 50%+ foraging workforce and summer honey yield.";
      fftDiagnosis = "485 Hz Virgin Queen Piping & Pre-Swarm Buzz (+18 dB spike above 225 Hz baseline)";
      thermalDiagnosis = "Core brood nest pre-heated to 36.8°C (+2.45°C CUSUM drift cluster activation)";
      gasDiagnosis = "2,480 ppm NDIR CO2 surge with 58/100 alarm pheromone and fanning active";
      primaryActionTitle = "Prepare Vertical Split (Demaree Manipulation)";
      primaryActionDetail = "Move old queen with 2 capped brood frames to 5-frame nuc box; add 2 drawn wax supers above queen excluder.";
      secondaryActionTitle = "Check Frames 2 & 4 for Queen Swarm Cells";
      actionExecutedText = "Demaree vertical split prepared for Hive #042. Swarm impulse mitigated.";
    }
    // 2. Hive #015 (Yard Alpha): Queen Loss (285 Hz queenless roar, 33.1°C brood chill)
    else if (id === 15) {
      status = "QUEEN_FAILURE";
      peakFrequencyHz = 285;
      dominantHarmonic = "260-310 Hz (Queenless Roar & Agitation Warble)";
      healthIndex = 64;
      frame3 = 33.1;
      frame2 = 32.8;
      frame4 = 32.9;
      cusumScore = -1.95;
      cusumDriftStatus = "BROOD_CHILL_RISK";
      scd41Co2 = 910;
      isopentylAcetate = 74;
      deltaWeightKg = 0.05;
      
      triageTitle = "Hive #015: Queen Failure / Queenless Crisis";
      triageSeverity = "QUEENLESS ROAR & CHILL";
      urgencyReason = "Brood nest dropped to 33.1°C with distinct 285 Hz queenless roar and 74/100 alarm pheromone surge. Brood nest unprotected against wax moth intrusion and larvae chilling.";
      fftDiagnosis = "285 Hz Queenless Roar & Agitation Warble (absence of 9-ODA queen pheromone)";
      thermalDiagnosis = "Brood nest chilled to 33.1°C (-1.95°C CUSUM drift below 35.0°C homeostasis)";
      gasDiagnosis = "74/100 alarm pheromone spike (cluster distress) and 910 ppm CO2 drop";
      primaryActionTitle = "Check Center Frames & Introduce Caged Mated Queen";
      primaryActionDetail = "Inspect frames 2 & 3 for emergency queen cups; introduce mated caged queen with candy plug.";
      secondaryActionTitle = "Supply 1:1 Invert Sugar Feed Stimulant";
      actionExecutedText = "Mated queen introduced in caged candy-plug to Hive #015. Brood recovery underway.";
    }
    // 3. Hive #073 (Yard Beta): Varroa Surge (5.4% mite load, 82 kΩ alarm pheromone)
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
      
      triageTitle = "Hive #073: Varroa Destructor Surge";
      triageSeverity = "5.4% MITE LOAD SURGE";
      urgencyReason = "Sticky bottom board count confirms 5.4% mite infestation (economic damage threshold is 3.0%). High grooming agitation at 340 Hz and Deformed Wing Virus (DWV) stress.";
      fftDiagnosis = "340 Hz Grooming Agitation Buzz & Wing-Flapping Vibration (+14 dB elevation)";
      thermalDiagnosis = "1.42 CUSUM drift caused by nurse bee cluster agitation and thermal variance";
      gasDiagnosis = "82 kΩ BME688 MOX VOC drop with 44/100 alarm pheromone";
      primaryActionTitle = "Verify Mite Drop Count & Apply Formic Pro Pads";
      primaryActionDetail = "Insert 2 Formic Pro flash vapor pads across lower brood box; schedule 48h sticky board count.";
      secondaryActionTitle = "Screen Bottom Board Natural Drop Count";
      actionExecutedText = "Formic Pro treatment applied to Hive #073. 48h recount scheduled.";
    }
    // 4. Hive #088 (Yard Beta): Stand Tamper (14.2° tilt displacement)
    else if (id === 88) {
      status = "TAMPER";
      peakFrequencyHz = 390;
      dominantHarmonic = "380-420 Hz (Physical Disturbance Vibration)";
      healthIndex = 69;
      tiltAngleDeg = 14.2;
      isopentylAcetate = 68;
      cusumScore = 1.15;
      
      triageTitle = "Hive #088: Stand Tamper & 14.2° Tilt Alert";
      triageSeverity = "PHYSICAL TILT DISPLACEMENT";
      urgencyReason = "STM32 onboard accelerometer registered 14.2° stand tilt displacement from horizontal baseline. 390 Hz impact shock vibration detected. Suspected bear, wildlife, or strong wind gust disturbance.";
      fftDiagnosis = "390 Hz Impact Shock Vibration & Defensive Cluster Buzz";
      thermalDiagnosis = "1.15 CUSUM drift from top cover draft air leakage";
      gasDiagnosis = "68/100 Isopentyl Acetate alarm pheromone spike";
      primaryActionTitle = "Realign Hive Stand & Secure Ratchet Tie-Down";
      primaryActionDetail = "Relevel concrete foundation, tighten 500kg ratcheting tie-down strap, verify entrance reducer seal.";
      secondaryActionTitle = "Inspect Outer Lid Weather Seal";
      actionExecutedText = "Stand foundation relevelled and ratcheted securely for Hive #088.";
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
      
      triageTitle,
      triageSeverity,
      urgencyReason,
      fftDiagnosis,
      thermalDiagnosis,
      gasDiagnosis,
      primaryActionTitle,
      primaryActionDetail,
      secondaryActionTitle,
      actionExecutedText
    };
  });
}

/* ============================================================================
   DEFAULT INITIAL CHECKLIST ITEMS & AUDIO NOTES
   ============================================================================ */

const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: "chk-1",
    category: "PRE_INSPECTION",
    title: "Light Smoker (Pine Needles & Burlap)",
    subtitle: "Verify dense, cool white smoke output. Tool sanitation complete.",
    completed: true,
    priority: "STANDARD"
  },
  {
    id: "chk-2",
    category: "PRE_INSPECTION",
    title: "Inspect PPE Veil, Zippers & Leather Gloves",
    subtitle: "Check wrist cuff elastic and ankle cinch against sting intrusions.",
    completed: true,
    priority: "STANDARD"
  },
  {
    id: "chk-3",
    category: "PRE_INSPECTION",
    title: "Stage 5-Frame Nuc Box & Demaree Board",
    subtitle: "Ready in field truck for Hive #042 urgent swarm artificial split.",
    completed: true,
    priority: "CRITICAL",
    hiveId: 42
  },
  {
    id: "chk-4",
    category: "IN_YARD",
    title: "Inspect Hive #042 Brood Swarm Cells (Frames 2 & 4)",
    subtitle: "Check for capped queen swarm cells, execute split, add drawn supers.",
    completed: false,
    priority: "CRITICAL",
    hiveId: 42
  },
  {
    id: "chk-5",
    category: "IN_YARD",
    title: "Assess Hive #015 Queen Status (Brood Chill 33.1°C)",
    subtitle: "Verify emergency supersedure cups; introduce caged mated queen.",
    completed: false,
    priority: "CRITICAL",
    hiveId: 15
  },
  {
    id: "chk-6",
    category: "IN_YARD",
    title: "Apply Varroa Treatment to Hive #073 (5.4% Mites)",
    subtitle: "Insert Formic Pro vapor pads; schedule bottom board count in 48h.",
    completed: false,
    priority: "CRITICAL",
    hiveId: 73
  },
  {
    id: "chk-7",
    category: "IN_YARD",
    title: "Realign Hive #088 Stand Base & Ratchet Strap",
    subtitle: "Correct 14.2° tilt displacement; tighten 500kg ratcheting tie-down.",
    completed: false,
    priority: "CRITICAL",
    hiveId: 88
  },
  {
    id: "chk-8",
    category: "IN_YARD",
    title: "Sample 10 Nominal Brood Frames for C-Larvae",
    subtitle: "Confirm healthy glistening pearly white larvae and solid laying pattern.",
    completed: true,
    priority: "STANDARD"
  },
  {
    id: "chk-9",
    category: "BIOSECURITY",
    title: "Wipe Solar Telemetry PV Panels & Gateway Antenna",
    subtitle: "Clear pine pollen and organic dust to maximize MPPT solar charging.",
    completed: false,
    priority: "STANDARD"
  },
  {
    id: "chk-10",
    category: "BIOSECURITY",
    title: "Refill Top Feeder 1:1 Invert Sugar Syrup",
    subtitle: "Supply Yard Alpha & Beta feeder reservoirs with spring stimulant syrup.",
    completed: false,
    priority: "STANDARD"
  },
  {
    id: "chk-11",
    category: "BIOSECURITY",
    title: "Record Voice Inspection Debrief & Commit Ledger",
    subtitle: "Seal batch telemetry cryptographic proofs into Honey Chain block #842942.",
    completed: false,
    priority: "STANDARD"
  }
];

const INITIAL_AUDIO_NOTES: AudioNote[] = [
  {
    id: "note-1",
    hiveId: 42,
    yard: "Yard Alpha",
    title: "Hive #042 Swarm Cell Congestion",
    transcription: "Hive 042: Massive cluster on landing board. Uncapped queen swarm cells located on bottom bars of frame 2 and frame 4. Brood nest temperature surging at 36.8°C. Proceeding with Demaree vertical split immediately.",
    durationSec: 14,
    timestamp: "14:12"
  },
  {
    id: "note-2",
    hiveId: 15,
    yard: "Yard Alpha",
    title: "Hive #015 Queenless Roar & Brood Chill",
    transcription: "Hive 015: Brood nest dropped to 33.1°C with distinct 285 Hz queenless roar. Spotty brood pattern, no fresh eggs observed in core. Introduced caged Italian mated queen with candy plug.",
    durationSec: 18,
    timestamp: "13:48"
  },
  {
    id: "note-3",
    hiveId: 73,
    yard: "Yard Beta",
    title: "Hive #073 Varroa Formic Pro Application",
    transcription: "Hive 073: Sticky board check confirmed 5.4 mites per 100 bees. High grooming agitation at 340 Hz. Placed 2 Formic Pro pads on brood box. Ambient temperature 24.5°C is well within safety window.",
    durationSec: 16,
    timestamp: "12:30"
  },
  {
    id: "note-4",
    yard: "Yard Alpha",
    title: "North Ridge Photovoltaic Array Maintenance",
    transcription: "Yard Alpha Base Gateway: Cleaned dust and pine pollen from 50W solar array. MPPT charge controller recovered from 340mA to 480mA at 14.6V. All 50 Yard Alpha LoRa nodes pinging at under 10 seconds.",
    durationSec: 12,
    timestamp: "11:15"
  }
];

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
    
    // Background pink noise floor (-75 to -60 dB)
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

    // Stand Tamper Shock Vibration (380-420 Hz)
    const distTamper = Math.abs(freqHz - 390);
    if (distTamper < 50 && hiveStatus === "TAMPER") {
      magnitudeDb += (1 - distTamper / 50) * 28;
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
   MAIN COMPONENT: ZERO-SLOP MOBILE FIELD COMPANION INSTRUMENT
   ============================================================================ */

export default function MobileFieldAgritechApp() {
  const [fleet] = useState<HiveNode[]>(generateFleetTelemetry);
  const [currentTab, setCurrentTab] = useState<"TRIAGE" | "CHECKLIST" | "YARDS" | "SCAN" | "PROVENANCE" | "ADVISOR">("TRIAGE");
  
  // Inspected state for field triage (Set of hive IDs)
  const [inspectedHiveIds, setInspectedHiveIds] = useState<Set<number>>(new Set());
  
  // Selected Hive for Deep Inspector Modal/Sheet
  const [selectedHiveId, setSelectedHiveId] = useState<number | null>(42);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [inspectorSubTab, setInspectorSubTab] = useState<"OVERVIEW" | "FFT" | "THERMAL" | "GAS" | "CHAIN" | "HARDWARE" | "PLAYDATE">("OVERVIEW");
  
  // Active Yard Filter for Yards Tab
  const [selectedYard, setSelectedYard] = useState<"Yard Alpha" | "Yard Beta">("Yard Alpha");
  const [yardSearchQuery, setYardSearchQuery] = useState<string>("");

  // Triage filter: show only anomalous or all
  const [triageFilter, setTriageFilter] = useState<"ANOMALOUS_ONLY" | "ALL">("ANOMALOUS_ONLY");

  // Beekeeper Field Checklist State
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [checklistFilter, setChecklistFilter] = useState<"ALL" | "PRE_INSPECTION" | "IN_YARD" | "BIOSECURITY">("ALL");

  // Quick Audio Notes Recorder Simulator State
  const [audioNotes, setAudioNotes] = useState<AudioNote[]>(INITIAL_AUDIO_NOTES);
  const [isRecordingNote, setIsRecordingNote] = useState<boolean>(false);
  const [recordTimerSec, setRecordTimerSec] = useState<number>(0);
  const [noteTargetHiveId, setNoteTargetHiveId] = useState<number | undefined>(42);
  const [activePlayingNoteId, setActivePlayingNoteId] = useState<string | null>(null);
  const recordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio Synthesizer State (Harmonic Bee Tone Synthesizer)
  const [audioToneActive, setAudioToneActive] = useState<boolean>(false);
  const [activeToneFreq, setActiveToneFreq] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Speech API Voice Synthesizer State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.05);

  // NFC & Laser QR Scanner State
  const [isScanningNfc, setIsScanningNfc] = useState<boolean>(false);
  const [scannedHiveResult, setScannedHiveResult] = useState<HiveNode | null>(null);
  const [scanSuccessAnim, setScanSuccessAnim] = useState<boolean>(false);

  // Compass Navigation Modal State
  const [navTargetHive, setNavTargetHive] = useState<HiveNode | null>(null);

  // Honey Chain Jar Certificate Modal State
  const [isJarCertOpen, setIsJarCertOpen] = useState<boolean>(false);
  const [isCopiedHash, setIsCopiedHash] = useState<boolean>(false);

  // Toast confirmation notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // SLM Gemma-2B Assistant State
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "gemma"; text: string; time: string }>>([
    {
      role: "gemma",
      text: "HiveOS Edge Gemma-2B SLM online. Monitoring 100 hives across Yard Alpha & Yard Beta. 4 hives require immediate beekeeper action (#042 Pre-Swarm, #015 Queenless, #073 Varroa, #088 Stand Tamper). Tap 'Voice Debrief' or select a 1-tap protocol below for audible field instructions.",
      time: "14:20:00"
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isGemmaThinking, setIsGemmaThinking] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Frame presentation toggle (Desktop Phone Frame Bezel vs Full Canvas)
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

  // Dynamic Time-of-Day Greeting Calculation
  const greetingText = useMemo(() => {
    const hour = new Date().getHours();
    let timeGreeting = "Good Afternoon";
    if (hour >= 5 && hour < 12) timeGreeting = "Good Morning";
    else if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon";
    else if (hour >= 17 && hour < 21) timeGreeting = "Good Evening";
    else timeGreeting = "Good Night";

    return `${timeGreeting}, Beekeeper • ${nominalHives.length}/${fleet.length} Hives Nominal in Yard Alpha & Beta`;
  }, [nominalHives.length, fleet.length]);

  // Checklist completed count
  const completedChecklistCount = useMemo(() => {
    return checklist.filter((item) => item.completed).length;
  }, [checklist]);

  // Toast Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Stop audio synthesis helper
  const stopAudio = useCallback(() => {
    if (osc1Ref.current) {
      try {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
      } catch {}
      osc1Ref.current = null;
    }
    if (osc2Ref.current) {
      try {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
      } catch {}
      osc2Ref.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {}
      audioCtxRef.current = null;
    }
    setAudioToneActive(false);
    setActiveToneFreq(null);
  }, []);

  // Web Audio Tone Synthesis (Fundamental + First Harmonic for realistic bee cluster sound)
  const toggleAudioTone = useCallback((freq?: number) => {
    const targetFreq = freq || currentHive.peakFrequencyHz;
    
    if (audioToneActive && activeToneFreq === targetFreq) {
      stopAudio();
    } else {
      stopAudio();
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Primary fundamental oscillator (Sawtooth for bee buzzing texture)
        const osc1 = ctx.createOscillator();
        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(targetFreq, ctx.currentTime);

        // Secondary harmonic oscillator (Sine at 2x frequency for rich body)
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(targetFreq * 2, ctx.currentTime);

        // Low-pass filter to smooth harsh highs
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainNodeRef.current = gainNode;
        setAudioToneActive(true);
        setActiveToneFreq(targetFreq);
      } catch (err) {
        console.warn("Audio init failed:", err);
      }
    }
  }, [audioToneActive, activeToneFreq, currentHive.peakFrequencyHz, stopAudio]);

  // Clean up audio & speech on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [stopAudio]);

  // Web Speech API Voice Debriefing
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Web Speech API is not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
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

  // Full Voice Inspection Debrief Dispatcher
  const triggerVoiceDebrief = () => {
    const debrief = `${greetingText}. Apiary exception summary: 96 hives in full thermal homeostasis. 4 hives require immediate beekeeper action. In Yard Alpha: Hive 042 shows pre-swarm risk at 485 Hz virgin queen piping and plus 2.45 degrees brood warming; Hive 015 has queen failure with 285 Hz queenless roar and brood chill at 33.1 degrees. In Yard Beta: Hive 073 has a 5.4 percent Varroa mite load requiring formic acid treatment; Hive 088 has a 14.2 degree stand tilt alert. Weather is 24.5 degrees Celsius with optimal nectar foraging flight conditions and 840 Watts per square meter solar charging.`;
    speakText(debrief);
  };

  // 1-Tap Quick Audio Notes Recording Simulator
  const handleToggleRecordNote = () => {
    if (isRecordingNote) {
      // Stop Recording & Auto Transcribe
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
      setIsRecordingNote(false);

      const targetId = noteTargetHiveId;
      const targetHiveObj = fleet.find((h) => h.id === targetId);
      const yardName = targetHiveObj ? targetHiveObj.yard : "All Apiaries";
      
      let generatedTranscription = `Field Audio Inspection for ${targetId ? `Hive #${String(targetId).padStart(3, "0")}` : "General Apiary"}: Cluster temperament calm, brood pattern verified nominal, honey flow positive.`;
      
      if (targetId === 42) {
        generatedTranscription = "Hive #042: Heavy drone cluster on bottom board. Swarm cells uncapped on frame 2 and frame 4. Demaree vertical split initiated.";
      } else if (targetId === 15) {
        generatedTranscription = "Hive #015: Brood nest chilling at 33.1°C with 285 Hz roar. Queen cup observed on frame 2. Caged mated queen introduced.";
      } else if (targetId === 73) {
        generatedTranscription = "Hive #073: High mite drop on bottom board (5.4%). Applied Formic Pro vapor strip. Re-inspection scheduled in 48 hours.";
      } else if (targetId === 88) {
        generatedTranscription = "Hive #088: Corrected 14.2° stand displacement from wind gust. Relevelled concrete foundation and tightened ratchet strap.";
      }

      const newNote: AudioNote = {
        id: `note-${Date.now()}`,
        hiveId: targetId,
        yard: yardName,
        title: targetId ? `Hive #${String(targetId).padStart(3, "0")} Field Memo` : "General Apiary Memo",
        transcription: generatedTranscription,
        durationSec: Math.max(3, recordTimerSec),
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      };

      setAudioNotes((prev) => [newNote, ...prev]);
      setRecordTimerSec(0);
      triggerToast(`Saved voice memo for ${newNote.title}`);
    } else {
      // Start Recording
      setIsRecordingNote(true);
      setRecordTimerSec(0);
      recordIntervalRef.current = setInterval(() => {
        setRecordTimerSec((prev) => prev + 1);
      }, 1000);
    }
  };

  // Play simulated audio note
  const handlePlayAudioNote = (note: AudioNote) => {
    if (activePlayingNoteId === note.id) {
      stopSpeech();
      setActivePlayingNoteId(null);
    } else {
      setActivePlayingNoteId(note.id);
      speakText(note.transcription);
    }
  };

  // Delete audio note
  const handleDeleteAudioNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAudioNotes((prev) => prev.filter((n) => n.id !== noteId));
    if (activePlayingNoteId === noteId) {
      stopSpeech();
      setActivePlayingNoteId(null);
    }
  };

  // Toggle Checklist Item State
  const toggleChecklistItem = (itemId: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // 1-Tap Action Execution for Anomaly Cards (Triage Protocol Handler)
  const executeFieldAction = (hive: HiveNode, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    // 1. Mark Inspected
    setInspectedHiveIds((prev) => {
      const next = new Set(prev);
      const wasDone = next.has(hive.id);
      if (wasDone) {
        next.delete(hive.id);
        triggerToast(`Unmarked action for Hive #${String(hive.id).padStart(3, "0")}`);
      } else {
        next.add(hive.id);
        triggerToast(hive.actionExecutedText);
      }
      return next;
    });

    // 2. Cross-off associated checklist items
    setChecklist((prev) =>
      prev.map((item) =>
        item.hiveId === hive.id ? { ...item, completed: true } : item
      )
    );

    // 3. Add to Audio Field Memo Log if not already inspected
    if (!inspectedHiveIds.has(hive.id)) {
      const actionNote: AudioNote = {
        id: `action-note-${hive.id}-${Date.now()}`,
        hiveId: hive.id,
        yard: hive.yard,
        title: `Hive #${String(hive.id).padStart(3, "0")} Protocol Executed`,
        transcription: `${hive.actionExecutedText} Telemetry synced to Honey Chain block #${hive.blockchain.blockNumber}.`,
        durationSec: 10,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      };
      setAudioNotes((prev) => [actionNote, ...prev]);

      // 4. Voice Confirmation
      speakText(`${hive.actionExecutedText} Telemetry recorded.`);
    }
  };

  // 1-Tap NFC & Laser QR Scanner Simulator (Instant 0.1s tag lock-on)
  const handleSimulateNfcScan = (targetHiveId?: number) => {
    setIsScanningNfc(true);
    setScannedHiveResult(null);
    setScanSuccessAnim(false);

    // Instant 100ms (0.1s) tag lock-on
    setTimeout(() => {
      const matched = targetHiveId
        ? fleet.find((h) => h.id === targetHiveId) || fleet[0]
        : fleet[Math.floor(Math.random() * fleet.length)];
      
      setScannedHiveResult(matched);
      setIsScanningNfc(false);
      setScanSuccessAnim(true);
      setSelectedHiveId(matched.id);
      triggerToast(`NFC Tag Identified: Hive #${matched.id} (${matched.apiaryZone})`);
    }, 120);
  };

  // SLM Gemma-2B Chat Dispatch
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
        reply = `🐝 **Swarm Mitigation Protocol for Hive #042**:\n1. **Acoustic Signature**: 485 Hz virgin queen piping + brood nest pre-heating (+2.45°C CUSUM drift).\n2. **Immediate Action**: Perform a Pagden / Demaree split. Remove queen with 2 brood frames to a 5-frame nuc box.\n3. **Relief Supers**: Place 2 drawn wax supers above queen excluder to alleviate congestion immediately.`;
      } else if (q.includes("varroa") || q.includes("73") || q.includes("mite")) {
        reply = `🔬 **Varroa Surge Protocol for Hive #073**:\n1. **Diagnostic Load**: 5.4 mites / 100 bees (economic injury threshold is 3.0%). Agitation buzz at 340 Hz.\n2. **Immediate Action**: Apply Formic Pro (2 strips) or Apivar amitraz strips if ambient temp < 30°C.\n3. **Follow-up**: Re-test natural mite drop count on bottom sticky board in 48 hours.`;
      } else if (q.includes("queen") || q.includes("15") || q.includes("roar")) {
        reply = `👑 **Queen Failure Protocol for Hive #015**:\n1. **Diagnostic**: 285 Hz queenless roar + brood nest chilling to 33.1°C with 74/100 alarm pheromone.\n2. **Immediate Action**: Inspect for emergency queen cells. Introduce a mated Italian/Carniolan queen in a candy-plugged cage.\n3. **Feed**: Supply 1:1 sugar syrup to stimulate nurse bee acceptance.`;
      } else if (q.includes("tamper") || q.includes("88") || q.includes("tilt")) {
        reply = `⚠️ **Tamper & Tilt Protocol for Hive #088**:\n1. **Diagnostic**: 14.2° stand displacement detected by onboard accelerometer + 390 Hz agitation vibration.\n2. **Immediate Action**: Relevel concrete hive stand base and secure heavy-duty ratchet strap.\n3. **Inspection**: Verify hive lid seal and entrance reducer alignment against predator intrusion.`;
      } else if (q.includes("debrief") || q.includes("summary") || q.includes("report")) {
        reply = `📋 **Daily Apiary Field Summary**:\n- Total Active Fleet: 100 hives across Yard Alpha & Yard Beta (100% online LoRa mesh).\n- Fleet Status: 96 Nominal, 4 Action Needed (#042 Swarm, #015 Queen, #073 Varroa, #088 Tilt).\n- Daily Honey Flow: +48.2 kg total flux (+0.65 kg/hive avg).\n- Priority Route: Start at Yard Alpha Node #042 immediately.`;
      } else {
        reply = `⚡ **Gemma-2B On-Device AI**: Currently analyzing Hive #${currentHive.id} (${currentHive.apiaryZone}). Core Temperature is ${currentHive.thermal.frame3CoreQueen}°C, Peak Acoustic Tone is ${currentHive.peakFrequencyHz} Hz, and CO2 is ${currentHive.gas.scd41Co2Ppm} ppm. INT4 local engine executing at 8.2ms latency with zero cloud dependencies.`;
      }

      setChatMessages((prev) => [...prev, { role: "gemma", text: reply, time: new Date().toLocaleTimeString("en-US", { hour12: false }) }]);
      setIsGemmaThinking(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }, 280);
  };

  const copyBlockHash = (hash: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(hash);
      setIsCopiedHash(true);
      triggerToast("SHA-256 Block Hash copied to clipboard");
      setTimeout(() => setIsCopiedHash(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#f4f4f4] flex flex-col items-center justify-start selection:bg-amber-500/30 selection:text-amber-200 antialiased font-sans py-0 md:py-6 px-0 md:px-4">

      {/* ====================================================================
          TOAST FEEDBACK NOTIFICATION BANNER
          ==================================================================== */}
      {toastMessage && (
        <div className="fixed top-4 inset-x-4 max-w-md mx-auto z-50 bg-[#24a148] text-black border-2 border-white rounded-2xl p-3.5 shadow-2xl flex items-center gap-2.5 font-mono text-xs font-extrabold animate-in slide-in-from-top-4 duration-150">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-black/10 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ====================================================================
          TOP DESKTOP TOOLBAR & GLOBAL CONTROLS
          ==================================================================== */}
      <header className="w-full max-w-5xl mb-2 sm:mb-4 px-3 sm:px-4 py-2 flex items-center justify-between border-b border-[#393939] text-xs font-mono text-[#c6c6c6]">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-[#262626] hover:bg-amber-500 hover:text-black text-[#f4f4f4] min-h-[48px] px-4 py-2 rounded-xl border border-[#393939] transition-all font-semibold shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#24a148] animate-pulse shadow-[0_0_8px_#24a148]" />
            <span className="font-extrabold text-white text-sm tracking-tight font-sans">
              Beevil Fleet <span className="text-amber-400 text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">FIELD INSTRUMENT</span>
            </span>
          </div>
        </div>

        {/* Global Controls: Voice Stop Indicator & Frame Switcher */}
        <div className="flex items-center gap-2">
          {/* Hands-Free Voice Audio indicator if speaking */}
          {isSpeaking && (
            <button
              onClick={stopSpeech}
              className="flex items-center gap-1.5 bg-[#da1e28]/20 text-[#ff8389] border border-[#da1e28]/50 min-h-[48px] px-4 py-2 rounded-xl animate-pulse font-bold shadow-md shadow-[#da1e28]/20 active:scale-95"
              title="Stop voice briefing"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs">Speaking... (Stop)</span>
            </button>
          )}

          {/* Audio Synthesizer Global Mute Button */}
          {audioToneActive && (
            <button
              onClick={() => stopAudio()}
              className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/50 min-h-[48px] px-4 py-2 rounded-xl animate-pulse font-bold shadow-md shadow-amber-500/20 active:scale-95"
              title="Mute active acoustic synthesizer"
            >
              <VolumeX className="w-4 h-4" />
              <span className="text-xs">{activeToneFreq}Hz Mute</span>
            </button>
          )}

          {/* Desktop Wide / Phone Frame Toggle */}
          <button
            onClick={() => setViewMode(viewMode === "PHONE_FRAME" ? "FULL_WIDTH" : "PHONE_FRAME")}
            className="hidden md:flex items-center gap-1.5 bg-[#262626] hover:bg-[#393939] text-[#f4f4f4] border border-[#393939] min-h-[48px] px-4 py-2 rounded-xl transition-all shadow-sm font-semibold active:scale-95"
            title="Toggle between Mobile Phone Frame bezel and Wide Screen layout"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>{viewMode === "PHONE_FRAME" ? "Expand Canvas" : "Phone Frame"}</span>
          </button>
        </div>
      </header>

      {/* ====================================================================
          PHONE FRAME CONTAINER / FIELD APP WRAPPER (IBM Carbon Gray 100 / Gray 90)
          ==================================================================== */}
      <div className={`w-full transition-all duration-300 relative flex flex-col ${
        viewMode === "PHONE_FRAME"
          ? "w-full min-h-screen md:min-h-0 md:max-w-[440px] md:h-[930px] md:max-h-[96vh] rounded-none md:rounded-[48px] border-0 md:border-[8px] md:border-[#262626] md:shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(245,158,11,0.2)] overflow-hidden bg-[#161616]"
          : "max-w-4xl min-h-[850px] rounded-none md:rounded-3xl border-0 md:border md:border-[#393939] shadow-2xl bg-[#161616] overflow-hidden"
      }`}>

        {/* ------------------------------------------------------------------
            PHONE STATUS BAR (LoRa 915MHz • PDR 99.8% • Battery 98%)
            ------------------------------------------------------------------ */}
        <div className="bg-[#262626]/95 backdrop-blur-md pt-3 px-6 pb-2.5 flex items-center justify-between text-[11px] font-mono font-bold text-[#c6c6c6] z-30 border-b border-[#393939] select-none">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-extrabold text-xs">14:20</span>
            <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded-md font-bold">
              <ShinyText text="LoRa 915 MHz • Ch 0" speed={3} className="text-[9px]" />
            </span>
          </div>

          {/* Dynamic Island / Speaker Notch in Phone Frame Mode */}
          {viewMode === "PHONE_FRAME" && (
            <div className="hidden md:flex w-24 h-4 bg-black rounded-full items-center justify-center gap-1.5 px-2 border border-[#393939] shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8d8d8d]" />
              <span className="w-3 h-1 bg-[#393939] rounded-full" />
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[#42be65]" title="Packet Delivery Ratio">
              <Radio className="w-3 h-3 animate-pulse" />
              <ShinyText text="PDR 99.8%" speed={4} className="text-[10px] font-bold text-[#42be65]" />
            </div>
            <div className="flex items-center gap-1 text-[#f4f4f4]" title="LiFePO4 Battery Status">
              <span className="text-[10px] font-bold">Battery <CountUp to={98} suffix="%" duration={1.2} /></span>
              <div className="w-4 h-2 border border-[#8d8d8d] rounded-sm p-0.5 flex items-center">
                <div className="w-full h-full bg-[#42be65] rounded-2xs" />
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            TOP MINI HEADER & DYNAMIC GREETING TRIGGER
            ------------------------------------------------------------------ */}
        <div className="bg-[#262626] border-b border-[#393939] px-4 py-2.5 flex items-center justify-between z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-sm tracking-tight">Beevil Fleet</span>
                <span className="text-[10px] font-mono bg-[#198038]/25 text-[#42be65] border border-[#24a148]/40 px-2 py-0.5 rounded-full font-bold">
                  <CountUp to={100} duration={1.5} /> Hives Live
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#c6c6c6]">
                Active Yard: <span className="text-amber-300 font-semibold">{selectedYard}</span>
              </p>
            </div>
          </div>

          {/* Quick Hands-Free Voice Audio Debrief Button (48px Target) */}
          <ClickSpark sparkColor="#f59e0b" sparkCount={8} sparkRadius={22}>
            <button
              onClick={triggerVoiceDebrief}
              className={`flex items-center gap-2 min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border shadow-sm active:scale-95 ${
                isSpeaking
                  ? "bg-amber-400 text-black border-amber-300 shadow-md shadow-amber-500/30 animate-pulse"
                  : "bg-[#161616] hover:bg-[#393939] text-amber-400 border-amber-500/40"
              }`}
              title="Listen to Hands-Free Voice Audio Debrief (Web Speech API)"
            >
              {isSpeaking ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span className="text-xs font-bold">{isSpeaking ? "Debriefing..." : "Voice Debrief"}</span>
            </button>
          </ClickSpark>
        </div>

        {/* ------------------------------------------------------------------
            SCROLLABLE CONTENT CANVAS (TAB BASED)
            ------------------------------------------------------------------ */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 pb-24 space-y-4">
          
          {/* ================================================================
              TAB 1: TRIAGE FEED (Farmer-First Ergonomics + Anomaly Cards)
              ================================================================ */}
          {currentTab === "TRIAGE" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* DYNAMIC TIME-OF-DAY GREETING BANNER */}
              <div className="bg-gradient-to-br from-[#262626] to-[#161616] border-2 border-amber-500/40 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-extrabold flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    Field Instrument Telemetry
                  </span>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                    <CountUp to={inspectedHiveIds.size} duration={0.8} /> / <CountUp to={anomalousHives.length} duration={0.8} /> Inspected
                  </span>
                </div>

                {/* Primary Time-of-Day Greeting String */}
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
                  {greetingText}
                </h2>
                
                <p className="text-xs text-[#c6c6c6] mt-1 font-mono leading-relaxed">
                  Yard Alpha: 48/50 Nominal (2 Action Items) • Yard Beta: 48/50 Nominal (2 Action Items)
                </p>

                {/* Fleet Status Progress Bar */}
                <div className="w-full bg-[#161616] rounded-full h-3 mt-3 overflow-hidden flex border border-[#393939] shadow-inner">
                  <div
                    className="bg-[#24a148] h-full transition-all duration-500"
                    style={{ width: `${(nominalHives.length / fleet.length) * 100}%` }}
                    title="Nominal Hives (96)"
                  />
                  <div
                    className="bg-amber-400 h-full transition-all duration-500"
                    style={{ width: `${(inspectedHiveIds.size / fleet.length) * 100}%` }}
                    title="Inspected Critical Items"
                  />
                  <div
                    className="bg-[#da1e28] h-full transition-all duration-500"
                    style={{ width: `${((anomalousHives.length - inspectedHiveIds.size) / fleet.length) * 100}%` }}
                    title="Pending Anomalies"
                  />
                </div>

                {/* Filter toggle buttons (48px Glove-Friendly Targets) */}
                <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-[#393939]">
                  <button
                    onClick={() => setTriageFilter("ANOMALOUS_ONLY")}
                    className={`flex-1 min-h-[48px] py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all border text-center flex items-center justify-center gap-1.5 active:scale-95 ${
                      triageFilter === "ANOMALOUS_ONLY"
                        ? "bg-[#da1e28]/20 text-[#ff8389] border-[#da1e28]/60 shadow-sm font-extrabold"
                        : "bg-[#262626] text-[#c6c6c6] border-[#393939] hover:bg-[#393939]"
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-[#da1e28]" />
                    <span>Action Items (<CountUp to={anomalousHives.length} duration={0.8} />)</span>
                  </button>
                  <button
                    onClick={() => setTriageFilter("ALL")}
                    className={`flex-1 min-h-[48px] py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all border text-center flex items-center justify-center gap-1.5 active:scale-95 ${
                      triageFilter === "ALL"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm font-extrabold"
                        : "bg-[#262626] text-[#c6c6c6] border-[#393939] hover:bg-[#393939]"
                    }`}
                  >
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>All 100 Hives (<CountUp to={fleet.length} duration={0.8} />)</span>
                  </button>
                </div>
              </div>

              {/* QUICK WEATHER & SOLAR CHARGING TELEMETRY STRIP */}
              <div className="bg-[#262626] border border-[#393939] rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#f4f4f4] flex items-center gap-1.5">
                    <CloudSun className="w-4 h-4 text-amber-400" />
                    Apiary Microclimate & Solar Telemetry
                  </span>
                  <span className="text-[10px] bg-[#198038]/20 text-[#42be65] px-2 py-0.5 rounded-full border border-[#24a148]/30 font-bold">
                    Optimal Foraging Flight
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="bg-[#161616] border border-[#393939] rounded-xl p-2">
                    <span className="text-[10px] text-[#8d8d8d] block font-semibold">Ambient Temp</span>
                    <span className="font-extrabold text-white text-sm">24.5°C <span className="text-[10px] font-normal text-[#8d8d8d]">(76°F)</span></span>
                  </div>
                  <div className="bg-[#161616] border border-[#393939] rounded-xl p-2">
                    <span className="text-[10px] text-[#8d8d8d] block font-semibold">Wind Vector</span>
                    <span className="font-extrabold text-cyan-300 text-sm">8.2 km/h <span className="text-[10px] font-normal text-[#8d8d8d]">SW</span></span>
                  </div>
                  <div className="bg-[#161616] border border-[#393939] rounded-xl p-2">
                    <span className="text-[10px] text-[#8d8d8d] block font-semibold">Solar Irradiance</span>
                    <span className="font-extrabold text-amber-400 text-sm">840 W/m²</span>
                  </div>
                  <div className="bg-[#161616] border border-[#393939] rounded-xl p-2">
                    <span className="text-[10px] text-[#8d8d8d] block font-semibold">MPPT Solar Ingest</span>
                    <span className="font-extrabold text-[#42be65] text-sm">14.6V @ 480mA</span>
                  </div>
                </div>
              </div>

              {/* 1-TAP QUICK AUDIO NOTE RECORDER MINI STRIP (Glove Friendly 48px Button) */}
              <div className="bg-[#262626] border border-[#393939] rounded-2xl p-3.5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Mic className="w-4 h-4 text-amber-400" />
                    1-Tap Audio Inspection Notes
                  </span>
                  <span className="text-[10px] text-[#c6c6c6]">
                    {audioNotes.length} Memos Saved
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    onClick={handleToggleRecordNote}
                    className={`flex-1 min-h-[48px] py-3 px-4 rounded-xl font-mono text-xs font-extrabold transition-all border flex items-center justify-center gap-2 active:scale-95 shadow-md ${
                      isRecordingNote
                        ? "bg-[#da1e28] text-white border-[#ff8389] animate-pulse shadow-[#da1e28]/30"
                        : "bg-amber-400 hover:bg-amber-300 text-black border-amber-300 shadow-amber-500/20"
                    }`}
                  >
                    {isRecordingNote ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>Recording Note ({recordTimerSec}s)... Tap to Save</span>
                      </>
                    ) : (
                      <>
                        <Disc className="w-4 h-4" />
                        <span>1-Tap Record Field Memo (Hive #{currentHive.id})</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setCurrentTab("CHECKLIST")}
                    className="min-h-[48px] px-4 bg-[#161616] hover:bg-[#393939] text-[#f4f4f4] border border-[#393939] rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 active:scale-95"
                    title="Open Field Checklist & Notes"
                  >
                    <ListChecks className="w-4 h-4 text-amber-400" />
                    <span>Checklist</span>
                  </button>
                </div>
              </div>

              {/* ============================================================
                  3-PART EXCEPTION TRIAGE CARDS (AUTHENTIC FIELD INSTRUMENT)
                  1. WHAT NEEDS ATTENTION?
                  2. WHY? (128-pt FFT, Brood Thermal Drift, NDIR CO2 Spike)
                  3. WHAT SHOULD I DO? (1-Tap Glove-Friendly Protocols)
                  ============================================================ */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    Priority Field Exception Triage (3-Part Instrument Hierarchy)
                  </h3>
                  <span className="text-[10px] font-mono text-[#8d8d8d]">Sunlight High-Contrast</span>
                </div>

                {anomalousHives.map((hive) => {
                  const isInspected = inspectedHiveIds.has(hive.id);
                  const isPreSwarm = hive.status === "PRE_SWARM";

                  let badgeColor = "bg-[#da1e28]/20 text-[#ff8389] border-[#da1e28]/50";
                  let cardBorder = "border-[#da1e28]/60 hover:border-[#da1e28]";
                  let badgeTitle = hive.status.replace(/_/g, " ");
                  let spotlightColor = "rgba(218, 30, 40, 0.25)";

                  if (hive.status === "PRE_SWARM") {
                    badgeColor = "bg-amber-500/20 text-amber-300 border-amber-500/50";
                    cardBorder = "border-amber-500/60 hover:border-amber-400";
                    badgeTitle = "SWARM RISK (485 Hz)";
                    spotlightColor = "rgba(245, 158, 11, 0.35)";
                  } else if (hive.status === "QUEEN_FAILURE") {
                    badgeColor = "bg-[#f1c21b]/20 text-[#f1c21b] border-[#f1c21b]/50";
                    cardBorder = "border-[#f1c21b]/60 hover:border-[#f1c21b]";
                    badgeTitle = "QUEEN LOSS (285 Hz)";
                    spotlightColor = "rgba(241, 194, 27, 0.25)";
                  } else if (hive.status === "VARROA_SURGE") {
                    badgeColor = "bg-[#da1e28]/20 text-[#ff8389] border-[#da1e28]/50";
                    cardBorder = "border-[#da1e28]/60 hover:border-[#da1e28]";
                    badgeTitle = "VARROA SURGE (5.4%)";
                    spotlightColor = "rgba(218, 30, 40, 0.25)";
                  } else if (hive.status === "TAMPER") {
                    badgeColor = "bg-[#8a3ffc]/20 text-[#d4bbff] border-[#8a3ffc]/50";
                    cardBorder = "border-[#8a3ffc]/60 hover:border-[#8a3ffc]";
                    badgeTitle = "STAND TAMPER (14.2°)";
                    spotlightColor = "rgba(138, 63, 252, 0.25)";
                  }

                  const cardInner = (
                    <SpotlightCard
                      spotlightColor={spotlightColor}
                      onClick={() => {
                        setSelectedHiveId(hive.id);
                        setNoteTargetHiveId(hive.id);
                      }}
                      className={`!bg-[#262626] border-2 ${cardBorder} !rounded-2xl !p-4 shadow-2xl transition-all relative overflow-hidden group space-y-3.5 ${
                        isInspected ? "opacity-85 border-[#24a148] !bg-[#1c241e]" : ""
                      }`}
                    >
                      {/* Top Bar: Hive Identification Header */}
                      <div className="flex items-center justify-between gap-2 border-b border-[#393939] pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#161616] border-2 border-[#525252] flex items-center justify-center font-mono font-extrabold text-lg text-amber-400 shadow-inner">
                            #{String(hive.id).padStart(3, "0")}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white text-base font-sans">{hive.yard}</span>
                              <span className="text-[11px] font-mono text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                                {hive.gpsDistanceMeters}m {hive.gpsBearingText} ({hive.gpsBearingDeg}°)
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[#c6c6c6]">
                              Synced {hive.lastPingSecAgo}s ago • Bat {hive.batteryPct}% • Weight {hive.weightKg}kg ({hive.deltaWeightKg >= 0 ? `+${hive.deltaWeightKg}` : hive.deltaWeightKg}kg/24h)
                            </span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                          {badgeTitle}
                        </span>
                      </div>

                      {/* ====================================================
                          PART 1: WHAT NEEDS ATTENTION? (Exception Triage)
                          ==================================================== */}
                      <div className="bg-[#161616] border-l-4 border-amber-400 rounded-r-xl p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-extrabold flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            1. WHAT NEEDS ATTENTION?
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {hive.triageSeverity}
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-white font-mono leading-snug">
                          {hive.triageTitle}
                        </h4>
                        <p className="text-xs font-mono text-[#f4f4f4] leading-relaxed">
                          {hive.urgencyReason}
                        </p>
                      </div>

                      {/* ====================================================
                          PART 2: WHY? (Telemetry Diagnostics Evidence)
                          ==================================================== */}
                      <div className="bg-[#161616] border-l-4 border-cyan-400 rounded-r-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-extrabold flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-cyan-400" />
                            2. WHY? (TELEMETRY EVIDENCE)
                          </span>
                          <span className="text-[10px] font-mono text-[#c6c6c6]">3 Sensor Pillars</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                          {/* Pillar A: 128-pt FFT Acoustics */}
                          <div className="bg-[#262626] border border-[#393939] rounded-xl p-2.5 space-y-1">
                            <span className="text-[10px] text-[#8d8d8d] font-bold block flex items-center gap-1">
                              <Volume2 className="w-3 h-3 text-amber-400" /> 128-pt FFT Audio
                            </span>
                            <span className="text-sm font-extrabold text-amber-300 block">
                              {hive.peakFrequencyHz} Hz
                            </span>
                            <p className="text-[11px] text-[#c6c6c6] leading-tight">
                              {hive.fftDiagnosis}
                            </p>
                          </div>

                          {/* Pillar B: Brood Thermal Drift (TMP117 ±0.05°C) */}
                          <div className="bg-[#262626] border border-[#393939] rounded-xl p-2.5 space-y-1">
                            <span className="text-[10px] text-[#8d8d8d] font-bold block flex items-center gap-1">
                              <Thermometer className="w-3 h-3 text-red-400" /> Brood Thermal Drift
                            </span>
                            <span className="text-sm font-extrabold text-white block">
                              {hive.thermal.frame3CoreQueen}°C <span className="text-[10px] text-amber-400 font-bold">({hive.thermal.cusumScore > 0 ? `+${hive.thermal.cusumScore}` : hive.thermal.cusumScore}°C CUSUM)</span>
                            </span>
                            <p className="text-[11px] text-[#c6c6c6] leading-tight">
                              {hive.thermalDiagnosis}
                            </p>
                          </div>

                          {/* Pillar C: NDIR CO2 & Gas Plume (SCD41 & BME688) */}
                          <div className="bg-[#262626] border border-[#393939] rounded-xl p-2.5 space-y-1">
                            <span className="text-[10px] text-[#8d8d8d] font-bold block flex items-center gap-1">
                              <Wind className="w-3 h-3 text-purple-400" /> NDIR CO2 & Gas Plume
                            </span>
                            <span className="text-sm font-extrabold text-purple-300 block">
                              {hive.gas.scd41Co2Ppm} ppm <span className="text-[10px] text-[#8d8d8d]">({hive.gas.isopentylAcetateIndex}/100 Pheromone)</span>
                            </span>
                            <p className="text-[11px] text-[#c6c6c6] leading-tight">
                              {hive.gasDiagnosis}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ====================================================
                          PART 3: WHAT SHOULD I DO? (1-Tap Glove-Friendly Protocols)
                          ==================================================== */}
                      <div className="bg-[#161616] border-l-4 border-[#24a148] rounded-r-xl p-3 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#42be65] font-extrabold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#42be65]" />
                            3. WHAT SHOULD I DO? (1-TAP ACTIONS)
                          </span>
                          <span className="text-[10px] font-mono text-amber-300 font-bold">
                            48px Glove Touch Target
                          </span>
                        </div>

                        {/* Primary Big 1-Tap Action Button */}
                        <ClickSpark sparkColor="#24a148" sparkCount={10} sparkRadius={30}>
                          <button
                            onClick={(e) => executeFieldAction(hive, e)}
                            className={`w-full min-h-[52px] py-3 px-4 rounded-xl text-xs font-mono font-extrabold transition-all border flex items-center justify-between gap-3 shadow-lg active:scale-98 ${
                              isInspected
                                ? "bg-[#24a148] text-black border-[#24a148] shadow-[#24a148]/30"
                                : "bg-amber-400 hover:bg-amber-300 text-black border-amber-300 shadow-amber-500/20"
                            }`}
                          >
                            <div className="flex items-center gap-3 text-left">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isInspected ? "bg-black text-white" : "bg-black/20 text-black"}`}>
                                {isInspected ? <CheckCheck className="w-5 h-5 stroke-[3]" /> : <Zap className="w-5 h-5 fill-current" />}
                              </div>
                              <div>
                                <span className="block font-extrabold text-xs sm:text-sm leading-tight">
                                  {isInspected ? `Protocol Completed: ${hive.primaryActionTitle}` : `1-Tap Action: ${hive.primaryActionTitle}`}
                                </span>
                                <span className="text-[10px] font-medium opacity-90 block leading-tight mt-0.5">
                                  {isInspected ? "Verified in field checklist & sealed to ledger" : hive.primaryActionDetail}
                                </span>
                              </div>
                            </div>
                            <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase flex-shrink-0 ${isInspected ? "bg-black text-[#42be65]" : "bg-black text-amber-400"}`}>
                              {isInspected ? "Done" : "1-Tap"}
                            </span>
                          </button>
                        </ClickSpark>

                        {/* Secondary Interactive Glove-Friendly Row (48px Touch Targets) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {/* Button A: Listen FFT Tone */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHiveId(hive.id);
                              toggleAudioTone(hive.peakFrequencyHz);
                            }}
                            className={`min-h-[48px] py-2.5 px-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                              audioToneActive && activeToneFreq === hive.peakFrequencyHz
                                ? "bg-[#da1e28] text-white border-[#da1e28] animate-pulse shadow-md shadow-[#da1e28]/30"
                                : "bg-[#262626] hover:bg-[#393939] text-cyan-300 border-[#393939]"
                            }`}
                          >
                            {audioToneActive && activeToneFreq === hive.peakFrequencyHz ? (
                              <VolumeX className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                            <span className="truncate">{audioToneActive && activeToneFreq === hive.peakFrequencyHz ? "Mute Tone" : `Listen (${hive.peakFrequencyHz}Hz)`}</span>
                          </button>

                          {/* Button B: Voice Readout */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const text = `${hive.triageTitle}. Reason: ${hive.urgencyReason}. Recommended action: ${hive.primaryActionTitle}. Details: ${hive.primaryActionDetail}`;
                              speakText(text);
                            }}
                            className="min-h-[48px] py-2.5 px-2 rounded-xl text-xs font-mono font-bold bg-[#262626] hover:bg-[#393939] text-amber-300 border border-[#393939] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                            title="Read diagnosis and protocol aloud"
                          >
                            <Mic className="w-4 h-4 text-amber-400" />
                            <span>Voice Read</span>
                          </button>

                          {/* Button C: Compass HUD Navigate */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNavTargetHive(hive);
                            }}
                            className="min-h-[48px] py-2.5 px-2 rounded-xl text-xs font-mono font-bold bg-[#262626] hover:bg-[#393939] text-white border border-[#393939] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                          >
                            <Navigation className="w-4 h-4 text-amber-400" />
                            <span>Navigate HUD</span>
                          </button>

                          {/* Button D: Deep Inspector */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHiveId(hive.id);
                              setIsInspectorOpen(true);
                            }}
                            className="min-h-[48px] py-2.5 px-2 rounded-xl text-xs font-mono font-bold bg-[#262626] hover:bg-[#393939] text-amber-400 border border-amber-500/40 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                          >
                            <Activity className="w-4 h-4" />
                            <span>Deep Inspector</span>
                          </button>
                        </div>
                      </div>

                    </SpotlightCard>
                  );

                  if (isPreSwarm) {
                    return (
                      <StarBorder key={hive.id} color="#f59e0b" className="w-full !block !p-[2px] !rounded-2xl" innerClassName="!p-0 !bg-transparent !rounded-2xl">
                        {cardInner}
                      </StarBorder>
                    );
                  }

                  return <div key={hive.id}>{cardInner}</div>;
                })}
              </div>

              {/* ALL 96 NOMINAL HIVES (Collapsible View) */}
              {triageFilter === "ALL" && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#42be65]">
                      Nominal Fleet (96 Hives)
                    </h3>
                    <span className="text-[10px] font-mono text-[#8d8d8d]">100% Baseline Homeostasis</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {nominalHives.slice(0, 16).map((hive) => (
                      <div
                        key={hive.id}
                        onClick={() => {
                          setSelectedHiveId(hive.id);
                          setIsInspectorOpen(true);
                        }}
                        className="bg-[#262626] border border-[#393939] hover:border-[#24a148]/60 min-h-[48px] rounded-xl p-2.5 transition-all cursor-pointer flex flex-col justify-between shadow-sm active:scale-95"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs text-white">#{String(hive.id).padStart(3, "0")}</span>
                          <span className="w-2 h-2 rounded-full bg-[#24a148]" />
                        </div>
                        <div className="text-[10px] font-mono text-[#c6c6c6] mt-1">
                          <span>{hive.thermal.frame3CoreQueen}°C</span> • <span>{hive.peakFrequencyHz}Hz</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-mono text-center text-[#8d8d8d] pt-1">
                    + 80 more nominal hives operating in baseline thermal homeostasis.
                  </p>
                </div>
              )}

            </div>
          )}

          {/* ================================================================
              TAB 2: BEEKEEPER FIELD CHECKLIST & AUDIO NOTES WORKSPACE
              ================================================================ */}
          {currentTab === "CHECKLIST" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Checklist Header & Progress Metric */}
              <div className="bg-gradient-to-br from-[#262626] to-[#161616] border border-[#393939] rounded-2xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-extrabold flex items-center gap-1.5">
                      <ListChecks className="w-3.5 h-3.5" />
                      Field Ergonomics Protocol
                    </span>
                    <h2 className="text-base sm:text-lg font-extrabold text-white">
                      Beekeeper Inspection Checklist
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-extrabold text-amber-400">
                      <CountUp to={completedChecklistCount} duration={0.8} /> / <CountUp to={checklist.length} duration={0.8} /> Done
                    </span>
                    <p className="text-[10px] font-mono text-[#8d8d8d]">
                      {completedChecklistCount === checklist.length ? "All Tasks Completed" : "In Progress"}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#161616] rounded-full h-2.5 overflow-hidden border border-[#393939]">
                  <div
                    className="bg-amber-400 h-full transition-all duration-300"
                    style={{ width: `${(completedChecklistCount / checklist.length) * 100}%` }}
                  />
                </div>

                {/* Category Filter Tabs (48px Touch Targets) */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { id: "ALL", label: "All Items" },
                    { id: "PRE_INSPECTION", label: "Pre-Yard Prep" },
                    { id: "IN_YARD", label: "In-Yard Brood" },
                    { id: "BIOSECURITY", label: "Biosecurity" }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setChecklistFilter(filter.id as typeof checklistFilter)}
                      className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 active:scale-95 ${
                        checklistFilter === filter.id
                          ? "bg-amber-400 text-black border-amber-300 font-extrabold shadow-sm"
                          : "bg-[#161616] text-[#c6c6c6] border-[#393939] hover:bg-[#393939]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checklist Items List (Glove-Friendly 48px+ Touch Rows) */}
              <div className="space-y-2.5">
                {checklist
                  .filter((item) => checklistFilter === "ALL" || item.category === checklistFilter)
                  .map((item) => {
                    const isCritical = item.priority === "CRITICAL";
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`min-h-[56px] p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none active:scale-[0.98] ${
                          item.completed
                            ? "bg-[#262626]/60 border-[#24a148]/50 opacity-80"
                            : isCritical
                            ? "bg-[#262626] border-amber-500/60 shadow-md shadow-amber-500/5"
                            : "bg-[#262626] border-[#393939] hover:border-[#525252]"
                        }`}
                      >
                        {/* 48px Glove Friendly Checkbox Button */}
                        <div
                          className={`w-7 h-7 mt-0.5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            item.completed
                              ? "bg-[#24a148] border-[#24a148] text-black"
                              : isCritical
                              ? "border-amber-400 bg-[#161616]"
                              : "border-[#525252] bg-[#161616]"
                          }`}
                        >
                          {item.completed && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-xs font-bold font-mono ${item.completed ? "line-through text-[#8d8d8d]" : "text-white"}`}>
                              {item.title}
                            </span>
                            {item.hiveId && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex-shrink-0">
                                Hive #{String(item.hiveId).padStart(3, "0")}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-mono text-[#c6c6c6] mt-0.5 leading-relaxed">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* 1-TAP AUDIO INSPECTION NOTES RECORDER & LOG */}
              <div className="bg-[#262626] border border-[#393939] rounded-2xl p-4 shadow-xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">Voice Field Notes & Speech-to-Text</h3>
                      <p className="text-[10px] font-mono text-[#c6c6c6]">Hands-free audio transcription with 1-tap playback</p>
                    </div>
                  </div>

                  {/* Target Hive selector */}
                  <select
                    value={noteTargetHiveId || ""}
                    onChange={(e) => setNoteTargetHiveId(e.target.value ? Number(e.target.value) : undefined)}
                    className="bg-[#161616] border border-[#393939] text-xs font-mono text-amber-400 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="">General Yard Note</option>
                    <option value="42">Hive #042 (Swarm Risk)</option>
                    <option value="15">Hive #015 (Queen Loss)</option>
                    <option value="73">Hive #073 (Varroa Surge)</option>
                    <option value="88">Hive #088 (Stand Tamper)</option>
                  </select>
                </div>

                {/* Big 1-Tap Record Button (48px Target) */}
                <ClickSpark sparkColor="#f59e0b" sparkRadius={32}>
                  <button
                    onClick={handleToggleRecordNote}
                    className={`w-full min-h-[48px] py-3 px-4 rounded-xl font-mono text-xs font-extrabold transition-all border flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                      isRecordingNote
                        ? "bg-[#da1e28] text-white border-[#ff8389] animate-pulse shadow-[#da1e28]/30"
                        : "bg-amber-400 hover:bg-amber-300 text-black border-amber-300 shadow-amber-500/20"
                    }`}
                  >
                    {isRecordingNote ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>Recording Note ({recordTimerSec}s)... Tap to Save</span>
                      </>
                    ) : (
                      <>
                        <Disc className="w-4 h-4" />
                        <span>Start 1-Tap Audio Note Recording</span>
                      </>
                    )}
                  </button>
                </ClickSpark>

                {/* Saved Audio Notes List */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d8d8d] font-bold">
                    Transcribed Audio Log ({audioNotes.length} Memos)
                  </span>

                  {audioNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-[#161616] border border-[#393939] rounded-xl p-3 font-mono text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{note.title}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#393939] text-[#c6c6c6]">
                            {note.yard}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#8d8d8d]">{note.timestamp} • {note.durationSec}s</span>
                      </div>

                      <p className="text-[11px] text-[#f4f4f4] bg-[#262626] p-2.5 rounded-lg border border-[#393939] leading-relaxed">
                        &quot;{note.transcription}&quot;
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handlePlayAudioNote(note)}
                          className={`min-h-[48px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 active:scale-95 ${
                            activePlayingNoteId === note.id
                              ? "bg-amber-400 text-black border-amber-300 animate-pulse"
                              : "bg-[#262626] hover:bg-[#393939] text-amber-300 border-[#393939]"
                          }`}
                        >
                          {activePlayingNoteId === note.id ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{activePlayingNoteId === note.id ? "Stop Playback" : "Play Memo"}</span>
                        </button>

                        <button
                          onClick={(e) => handleDeleteAudioNote(note.id, e)}
                          className="min-h-[48px] px-3 text-[#8d8d8d] hover:text-[#ff8389] transition-all flex items-center justify-center"
                          title="Delete Memo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================
              TAB 3: APIARY YARDS (Yard Alpha 50 Hives / Yard Beta 50 Hives)
              ================================================================ */}
          {currentTab === "YARDS" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Yard Switcher Tabs (48px Target) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedYard("Yard Alpha")}
                  className={`min-h-[48px] p-3 rounded-2xl text-left border transition-all active:scale-95 ${
                    selectedYard === "Yard Alpha"
                      ? "bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-500/10"
                      : "bg-[#262626] border-[#393939] text-[#c6c6c6] hover:bg-[#393939]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Yard Alpha</span>
                    <span className="text-[10px] font-mono bg-[#161616] px-1.5 py-0.5 rounded text-[#c6c6c6]">
                      <CountUp to={50} duration={1} /> Hives
                    </span>
                  </div>
                  <div className="font-extrabold text-white text-sm mt-0.5">North Ridge Apiary</div>
                  <div className="text-[10px] font-mono text-[#ff8389] mt-1">2 Action Items (#042 Swarm, #015 Queen)</div>
                </button>

                <button
                  onClick={() => setSelectedYard("Yard Beta")}
                  className={`min-h-[48px] p-3 rounded-2xl text-left border transition-all active:scale-95 ${
                    selectedYard === "Yard Beta"
                      ? "bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-500/10"
                      : "bg-[#262626] border-[#393939] text-[#c6c6c6] hover:bg-[#393939]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Yard Beta</span>
                    <span className="text-[10px] font-mono bg-[#161616] px-1.5 py-0.5 rounded text-[#c6c6c6]">
                      <CountUp to={50} duration={1} /> Hives
                    </span>
                  </div>
                  <div className="font-extrabold text-white text-sm mt-0.5">Wildflower Valley</div>
                  <div className="text-[10px] font-mono text-[#ff8389] mt-1">2 Action Items (#073 Varroa, #088 Tilt)</div>
                </button>
              </div>

              {/* Gateway & Apiary Visual Card */}
              <div className="bg-[#262626] border border-[#393939] rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-36 w-full">
                  <Image
                    src={getAssetPath("/images/gateway_apiary.jpg")}
                    alt="Apiary Yard Gateway"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/40 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#525252] text-[#f4f4f4]">
                      <span className="text-[#42be65] font-bold">● CM4 Gateway Online</span> (915MHz LoRa)
                    </div>
                    <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#525252] text-amber-300 font-bold">
                      {selectedYard === "Yard Alpha" ? (
                        <>+<CountUp to={24.8} decimals={1} duration={1.2} /> kg 24h Flow</>
                      ) : (
                        <>+<CountUp to={23.4} decimals={1} duration={1.2} /> kg 24h Flow</>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-[#c6c6c6]">
                    <span>Base Station: Antmicro Raspberry Pi CM4</span>
                    <span className="text-cyan-300">RSSI -74 dBm • SNR +12.1 dB</span>
                  </div>
                  <div className="flex justify-between text-[#c6c6c6]">
                    <span>Active Hives in Yard:</span>
                    <span className="text-white font-bold">{selectedYard === "Yard Alpha" ? "Hives #001 - #050" : "Hives #051 - #100"}</span>
                  </div>
                </div>
              </div>

              {/* Yard Search & Quick Filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#8d8d8d] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Search ${selectedYard} (e.g. #042, swarm, 485Hz)...`}
                  value={yardSearchQuery}
                  onChange={(e) => setYardSearchQuery(e.target.value)}
                  className="w-full min-h-[48px] bg-[#262626] border border-[#393939] rounded-xl pl-10 pr-3 py-2.5 text-xs font-mono text-white placeholder-[#8d8d8d] focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 50-Hive Interactive Matrix for Selected Yard */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-[#c6c6c6] px-1">
                  <span>50-Hive Grid Cluster ({selectedYard})</span>
                  <span className="text-amber-400 font-bold">Tap node for deep telemetry</span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-[380px] overflow-y-auto p-2 bg-[#161616] rounded-2xl border border-[#393939] custom-scrollbar">
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
                      let nodeStyle = "bg-[#262626] border-[#393939] text-[#c6c6c6]";
                      let dotStyle = "bg-[#24a148]";

                      if (hive.status === "PRE_SWARM") {
                        nodeStyle = "bg-amber-500/20 border-amber-500/60 text-amber-300 animate-pulse";
                        dotStyle = "bg-amber-400";
                      } else if (hive.status === "QUEEN_FAILURE") {
                        nodeStyle = "bg-[#f1c21b]/20 border-[#f1c21b]/60 text-[#f1c21b]";
                        dotStyle = "bg-[#f1c21b]";
                      } else if (hive.status === "VARROA_SURGE") {
                        nodeStyle = "bg-[#da1e28]/20 border-[#da1e28]/60 text-[#ff8389]";
                        dotStyle = "bg-[#da1e28]";
                      } else if (hive.status === "TAMPER") {
                        nodeStyle = "bg-[#8a3ffc]/20 border-[#8a3ffc]/60 text-[#d4bbff]";
                        dotStyle = "bg-[#8a3ffc]";
                      }

                      return (
                        <button
                          key={hive.id}
                          onClick={() => {
                            setSelectedHiveId(hive.id);
                            setIsInspectorOpen(true);
                          }}
                          className={`min-h-[48px] h-12 rounded-xl font-mono text-xs font-bold border flex flex-col items-center justify-center transition-all ${nodeStyle} hover:scale-105 shadow-sm active:scale-95`}
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
              TAB 4: SCAN NFC & QR (Field Simulator with instant 0.1s lock-on)
              ================================================================ */}
          {currentTab === "SCAN" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="bg-[#262626] border border-[#393939] rounded-3xl p-5 shadow-xl space-y-4 text-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Field Hardware Scanner
                  </span>
                  <h2 className="text-lg font-extrabold text-white">Instant 1-Tap NFC & QR Reader</h2>
                  <p className="text-xs font-mono text-[#c6c6c6]">
                    Hold phone within 4cm of hive NTAG215 antenna or point camera at lid QR code.
                  </p>
                </div>

                {/* Simulated Camera Viewfinder with Laser Scanner */}
                <div className="relative w-full h-56 bg-[#161616] rounded-2xl border-2 border-dashed border-amber-500/40 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                  
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
                      <span>Reading NTAG215 RFID / Laser Tag (0.1s lock-on)...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#c6c6c6] font-mono text-xs">
                      <Scan className="w-8 h-8 text-amber-400/60" />
                      <span className="font-bold text-[#f4f4f4]">Scanner Ready (0.1s Fast Lock)</span>
                      <span className="text-[10px] text-[#8d8d8d]">Tap below to simulate instant hardware scan</span>
                    </div>
                  )}
                </div>

                {/* 1-Tap Big NFC Scan Buttons with ClickSpark (48px Targets) */}
                <div className="space-y-2">
                  <ClickSpark sparkColor="#f59e0b" sparkSize={6} sparkRadius={35} sparkCount={12}>
                    <button
                      onClick={() => handleSimulateNfcScan(42)}
                      disabled={isScanningNfc}
                      className="w-full min-h-[48px] py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-mono font-extrabold text-xs rounded-2xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Simulate 1-Tap NFC Touch (Hive #042 Swarm Risk)</span>
                    </button>
                  </ClickSpark>

                  <div className="grid grid-cols-3 gap-2">
                    <ClickSpark sparkColor="#f1c21b" sparkRadius={25}>
                      <button
                        onClick={() => handleSimulateNfcScan(15)}
                        className="w-full min-h-[48px] py-2.5 bg-[#161616] hover:bg-[#393939] text-[#f4f4f4] font-mono text-[11px] font-bold rounded-xl border border-[#393939] active:scale-95"
                      >
                        Scan #015 (Queen)
                      </button>
                    </ClickSpark>
                    <ClickSpark sparkColor="#da1e28" sparkRadius={25}>
                      <button
                        onClick={() => handleSimulateNfcScan(73)}
                        className="w-full min-h-[48px] py-2.5 bg-[#161616] hover:bg-[#393939] text-[#f4f4f4] font-mono text-[11px] font-bold rounded-xl border border-[#393939] active:scale-95"
                      >
                        Scan #073 (Varroa)
                      </button>
                    </ClickSpark>
                    <ClickSpark sparkColor="#8a3ffc" sparkRadius={25}>
                      <button
                        onClick={() => handleSimulateNfcScan(88)}
                        className="w-full min-h-[48px] py-2.5 bg-[#161616] hover:bg-[#393939] text-[#f4f4f4] font-mono text-[11px] font-bold rounded-xl border border-[#393939] active:scale-95"
                      >
                        Scan #088 (Tamper)
                      </button>
                    </ClickSpark>
                  </div>
                </div>

                {/* Scan Result Card */}
                {scannedHiveResult && scanSuccessAnim && (
                  <div className="bg-[#198038]/20 border border-[#24a148]/60 rounded-2xl p-4 text-left space-y-3 animate-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#42be65]" />
                        <div>
                          <span className="font-extrabold text-white text-sm">
                            RFID Tag Identified: Hive #{scannedHiveResult.id}
                          </span>
                          <p className="text-[10px] font-mono text-[#42be65]">
                            {scannedHiveResult.apiaryZone} • NTAG215 UID: <DecryptedText text="04:8F:2A:BE:EF:6C:80" speed={30} className="text-[#42be65] font-bold" />
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold bg-[#24a148]/30 text-[#42be65] border border-[#24a148]/50 px-2 py-0.5 rounded-full">
                        {scannedHiveResult.status}
                      </span>
                    </div>

                    <div className="bg-[#161616] p-2.5 rounded-xl border border-[#393939] space-y-1 text-[11px] font-mono">
                      <div className="flex justify-between">
                        <span className="text-[#8d8d8d]">Hardware Hash:</span>
                        <DecryptedText text={`0xBE88F5-${scannedHiveResult.id.toString(16).padStart(4, "0")}-STM32U585`} speed={25} className="text-cyan-300" />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8d8d8d]">Merkle Root:</span>
                        <DecryptedText text={scannedHiveResult.blockchain.merkleRoot} speed={25} className="text-amber-300" />
                      </div>
                    </div>

                    <p className="text-xs font-mono text-[#f4f4f4]">
                      {scannedHiveResult.urgencyReason || "Nominal colony telemetry verified on-chain."}
                    </p>

                    <ClickSpark sparkColor="#24a148" sparkRadius={30}>
                      <button
                        onClick={() => {
                          setSelectedHiveId(scannedHiveResult.id);
                          setIsInspectorOpen(true);
                        }}
                        className="w-full min-h-[48px] py-2.5 bg-[#24a148] hover:bg-[#42be65] text-black font-mono font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#24a148]/20 active:scale-95"
                      >
                        <Activity className="w-4 h-4" />
                        <span>Open Deep Diagnostic Inspector</span>
                      </button>
                    </ClickSpark>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* ================================================================
              TAB 5: HONEY CHAIN PROVENANCE & PRINTABLE JAR QR
              ================================================================ */}
          {currentTab === "PROVENANCE" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Premium Honey Chain Jar Card */}
              <div className="bg-[#262626] border border-[#393939] rounded-3xl overflow-hidden shadow-xl">
                <div className="relative h-44 w-full bg-[#161616]">
                  <Image
                    src={getAssetPath("/images/honey_chain_jar.jpg")}
                    alt="Honey Chain Organic Jar"
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-amber-500/90 text-black font-mono font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md">
                    <ShinyText text="USDA ORGANIC CERTIFIED" speed={3} className="text-black font-bold" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-extrabold text-sm">Honey Chain Ledger</span>
                    <span className="text-amber-300 font-bold">100% Raw Unpasteurized</span>
                  </div>
                </div>

                <div className="p-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-[#393939] pb-2">
                    <span className="text-[#c6c6c6]">Current Hive Node:</span>
                    <span className="text-amber-400 font-bold">Hive #{currentHive.id} ({currentHive.yard})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#393939] pb-2">
                    <span className="text-[#c6c6c6]">Batch Identifier:</span>
                    <ShinyText text={currentHive.blockchain.batchId} speed={4} className="text-[#42be65] font-bold" />
                  </div>
                  <div className="flex justify-between border-b border-[#393939] pb-2">
                    <span className="text-[#c6c6c6]">Botanical Flora:</span>
                    <span className="text-white">{currentHive.blockchain.floralSource}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#393939] pb-2">
                    <span className="text-[#c6c6c6]">Purity & Moisture:</span>
                    <span className="text-cyan-300">
                      <CountUp to={currentHive.blockchain.purityPct} decimals={1} suffix="% Purity" duration={1.2} /> • <CountUp to={currentHive.blockchain.moisturePct} decimals={1} suffix="% H2O" duration={1.2} />
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#393939] pb-2 items-center">
                    <span className="text-[#c6c6c6]">SHA-256 Merkle Root:</span>
                    <DecryptedText text={currentHive.blockchain.merkleRoot} speed={25} className="text-amber-400 font-mono text-[11px]" />
                  </div>
                  <div className="flex justify-between border-b border-[#393939] pb-2 items-center">
                    <span className="text-[#c6c6c6]">Hardware SE Hash:</span>
                    <DecryptedText text={`0xBE88F5-${currentHive.id.toString(16).padStart(4, "0")}-STM32U585-ATECC608A`} speed={25} className="text-cyan-300 font-mono text-[11px]" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#c6c6c6]">Block Hash:</span>
                    <div className="flex items-center gap-1.5">
                      <DecryptedText text={currentHive.blockchain.blockHash} speed={20} className="text-[#f4f4f4] truncate max-w-[140px] text-[10px]" />
                      <button
                        onClick={() => copyBlockHash(currentHive.blockchain.blockHash)}
                        className="p-1 text-[#c6c6c6] hover:text-white"
                        title="Copy Hash"
                      >
                        {isCopiedHash ? <Check className="w-3.5 h-3.5 text-[#42be65]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <ClickSpark sparkColor="#f59e0b" sparkRadius={30}>
                    <button
                      onClick={() => setIsJarCertOpen(true)}
                      className="w-full min-h-[48px] py-3 bg-amber-400 hover:bg-amber-300 text-black font-mono font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2 active:scale-95"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>View & Print Customer Jar QR Certificate</span>
                    </button>
                  </ClickSpark>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================
              TAB 6: HANDS-FREE VOICE AI ADVISOR & GEMMA-2B SLM
              ================================================================ */}
          {currentTab === "ADVISOR" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Hands-Free Audio Briefing Hero Banner */}
              <div className="bg-[#262626] border border-[#0f62fe]/40 rounded-3xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#0f62fe]/20 text-[#78a9ff] border border-[#0f62fe]/40">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-extrabold text-white">Gemma-2B Quantized SLM</h2>
                      <p className="text-[10px] font-mono text-[#78a9ff]">On-Device INT4 Engine (8.2ms Latency)</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const debrief = `Gemma Edge Briefing for Hive ${currentHive.id}. Status is ${currentHive.status}. Core brood temperature is ${currentHive.thermal.frame3CoreQueen} degrees Celsius. Acoustic dominant frequency is ${currentHive.peakFrequencyHz} Hertz. ${currentHive.urgencyReason || "Colony is in full homeostasis balance."}`;
                      speakText(debrief);
                    }}
                    className="flex items-center gap-1.5 bg-[#0f62fe] hover:bg-[#0043ce] text-white min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md shadow-[#0f62fe]/20 active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Read Aloud</span>
                  </button>
                </div>

                {/* Quick Audio Preset Buttons (48px Touch Targets) */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "Daily Apiary Debrief",
                    "Hive #042 Swarm Split",
                    "Hive #073 Varroa Protocol",
                    "Hive #015 Queen Status",
                    "Hive #088 Tamper Protocol",
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendGemmaMessage(preset)}
                      className="bg-[#161616] hover:bg-[#393939] text-[#f4f4f4] border border-[#393939] min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-mono transition-all font-semibold active:scale-95"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Stream Window */}
              <div className="bg-[#161616] border border-[#393939] rounded-3xl p-4 max-h-[360px] overflow-y-auto space-y-3 font-mono text-xs custom-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 text-[9px] text-[#8d8d8d] mb-1">
                      <span>{msg.role === "user" ? "Field Beekeeper" : "Gemma-2B Edge SLM"}</span>
                      <span>•</span>
                      <span>{msg.time}</span>
                    </div>
                    <div
                      className={`p-3 rounded-2xl max-w-[90%] whitespace-pre-wrap leading-relaxed ${
                        msg.role === "user"
                          ? "bg-amber-400 text-black font-semibold"
                          : "bg-[#262626] border border-[#393939] text-[#f4f4f4]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isGemmaThinking && (
                  <div className="flex items-center gap-2 text-[#78a9ff] text-xs font-mono py-2">
                    <Zap className="w-3.5 h-3.5 animate-spin" />
                    <span>Gemma-2B synthesizing response...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar (48px Touch Target) */}
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
                  className="flex-1 min-h-[48px] bg-[#262626] border border-[#393939] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-[#8d8d8d] focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={isGemmaThinking || !chatInput.trim()}
                  className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-mono font-extrabold min-h-[48px] px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

        </main>

        {/* ------------------------------------------------------------------
            BOTTOM TAB NAVIGATION BAR (6 Tabs - 48px Glove-Friendly Thumb Zone)
            ------------------------------------------------------------------ */}
        <nav className="absolute bottom-0 inset-x-0 bg-[#262626]/95 backdrop-blur-lg border-t border-[#393939] px-1 py-1.5 flex items-center justify-around z-30 shadow-2xl select-none">
          {[
            { id: "TRIAGE", label: "Triage", icon: ShieldAlert, badge: anomalousHives.length },
            { id: "CHECKLIST", label: "Checklist", icon: ListChecks, badge: undefined },
            { id: "YARDS", label: "Yards", icon: MapPin, badge: undefined },
            { id: "SCAN", label: "Scan NFC", icon: Scan, badge: undefined },
            { id: "PROVENANCE", label: "Provenance", icon: Lock, badge: undefined },
            { id: "ADVISOR", label: "AI Advisor", icon: Bot, badge: undefined },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as typeof currentTab)}
                className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative active:scale-95 ${
                  isActive
                    ? "text-amber-400 font-extrabold scale-105"
                    : "text-[#c6c6c6] hover:text-white"
                }`}
              >
                <Magnet magnetStrength={3} padding={25} className="flex items-center justify-center">
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? "text-amber-400 stroke-[2.5]" : "stroke-[1.8]"}`} />
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-[#da1e28] text-white font-mono text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[#161616]">
                        <CountUp to={tab.badge} duration={0.8} />
                      </span>
                    )}
                  </div>
                </Magnet>
                <span className="text-[9px] sm:text-[10px] font-mono mt-0.5 tracking-tight">{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* ====================================================================
          DEEP DIAGNOSTIC INSPECTOR BOTTOM-SHEET / MODAL
          ==================================================================== */}
      {isInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#262626] border border-[#525252] rounded-t-[32px] sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-4 sm:p-6 shadow-2xl space-y-4 relative text-[#f4f4f4]">
            
            {/* Sheet Drag Handle & Close */}
            <div className="w-12 h-1.5 bg-[#525252] rounded-full mx-auto sm:hidden mb-2" />
            <button
              onClick={() => {
                setIsInspectorOpen(false);
                stopAudio();
              }}
              className="absolute top-4 right-4 text-[#c6c6c6] hover:text-white p-2 rounded-xl bg-[#161616] border border-[#393939] min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-[#393939] pb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-extrabold text-lg shadow-inner">
                #{String(currentHive.id).padStart(3, "0")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-white">{currentHive.apiaryZone}</h2>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    currentHive.status === "NOMINAL"
                      ? "bg-[#198038]/20 text-[#42be65] border-[#24a148]/40"
                      : currentHive.status === "PRE_SWARM"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                      : "bg-[#da1e28]/20 text-[#ff8389] border-[#da1e28]/40"
                  }`}>
                    {currentHive.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#c6c6c6]">
                  Firmware {currentHive.firmware} • Battery {currentHive.batteryPct}% LiFePO4 • Weight {currentHive.weightKg} kg
                </p>
              </div>
            </div>

            {/* Inspector Sub-Tabs (48px Touch Targets) */}
            <div className="flex flex-wrap gap-1.5 text-xs font-mono border-b border-[#393939] pb-2">
              {[
                { id: "OVERVIEW", label: "Full Telemetry", icon: Layers },
                { id: "FFT", label: "128-pt FFT Audio", icon: Activity },
                { id: "THERMAL", label: "5-Frame Thermal", icon: Thermometer },
                { id: "GAS", label: "SCD41 CO2 & Gas", icon: Wind },
                { id: "CHAIN", label: "Honey Chain", icon: Lock },
                { id: "HARDWARE", label: "Hardware Node", icon: Cpu },
                { id: "PLAYDATE", label: "Playdate Console", icon: Laptop },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = inspectorSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setInspectorSubTab(tab.id as typeof inspectorSubTab)}
                    className={`min-h-[48px] px-3.5 py-2 rounded-xl flex items-center gap-1.5 font-semibold transition-all active:scale-95 ${
                      isActive
                        ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-500/20"
                        : "bg-[#161616] text-[#c6c6c6] hover:bg-[#393939] border border-[#393939]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* --------------------------------------------------------------
                INSPECTOR TAB: 128-PT FFT SPECTRUM VISUALIZER
                -------------------------------------------------------------- */}
            {(inspectorSubTab === "OVERVIEW" || inspectorSubTab === "FFT") && (
              <div className="bg-[#161616] border border-[#393939] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">128-Point FFT Bio-Acoustic Spectrum</h3>
                  </div>
                  <button
                    onClick={() => toggleAudioTone(currentHive.peakFrequencyHz)}
                    className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all active:scale-95 ${
                      audioToneActive
                        ? "bg-[#da1e28] text-white border-[#da1e28] animate-pulse shadow-md shadow-[#da1e28]/20"
                        : "bg-[#262626] text-cyan-300 border-[#393939]"
                    }`}
                  >
                    {audioToneActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{audioToneActive ? "Mute Buzz" : `Synthesize ${currentHive.peakFrequencyHz}Hz`}</span>
                  </button>
                </div>

                {/* 128 FFT Bars */}
                <div className="bg-[#161616] p-3 rounded-xl border border-[#393939]">
                  <div className="flex justify-between text-[9px] font-mono text-[#8d8d8d] pb-1.5 border-b border-[#393939] mb-2">
                    <span>50Hz (Base)</span>
                    <span className="text-[#42be65] font-bold">225Hz Nominal</span>
                    <span className="text-[#f1c21b] font-bold">285Hz Queenless</span>
                    <span className="text-[#ff8389] font-bold">485Hz Swarm</span>
                    <span className="text-purple-400">900Hz Chirp</span>
                    <span>1200Hz</span>
                  </div>

                  <div className="h-32 flex items-end gap-[1.5px] w-full pt-1">
                    {fftSpectrum.map((bin, idx) => {
                      const heightPct = Math.max(8, Math.min(100, (bin.magnitudeDb + 85) * 1.5));
                      let barColor = "bg-[#525252] hover:bg-[#8d8d8d]";
                      if (bin.freqHz >= 210 && bin.freqHz <= 260) barColor = "bg-[#42be65]";
                      if (bin.freqHz >= 270 && bin.freqHz <= 310) barColor = "bg-[#f1c21b]";
                      if (bin.freqHz >= 320 && bin.freqHz <= 370) barColor = "bg-orange-400";
                      if (bin.freqHz >= 440 && bin.freqHz <= 530) barColor = "bg-amber-400";
                      if (bin.isPeak) barColor = "bg-cyan-400 ring-1 ring-white animate-pulse";

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleAudioTone(bin.freqHz)}
                          className={`flex-1 rounded-t-xs transition-all cursor-pointer ${barColor}`}
                          style={{ height: `${heightPct}%` }}
                          title={`${bin.freqHz} Hz | ${bin.magnitudeDb.toFixed(1)} dBV - Tap to synthesize`}
                        />
                      );
                    })}
                  </div>
                </div>
                <p className="text-[10px] font-mono text-[#c6c6c6] flex items-center justify-between">
                  <span>Harmonic: <strong className="text-amber-400">{currentHive.dominantHarmonic}</strong></span>
                  <span className="text-[#8d8d8d]">Tap any bar to test tone</span>
                </p>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: 5-FRAME BROOD THERMAL GRADIENT (TMP117)
                -------------------------------------------------------------- */}
            {(inspectorSubTab === "OVERVIEW" || inspectorSubTab === "THERMAL") && (
              <div className="bg-[#161616] border border-[#393939] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">5-Frame Brood Thermal Gradient (TMP117 ±0.05°C)</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-[#262626] text-amber-300 px-2 py-0.5 rounded border border-[#393939] font-bold">
                    CUSUM Drift: {currentHive.thermal.cusumScore} ({currentHive.thermal.cusumDriftStatus.replace(/_/g, " ")})
                  </span>
                </div>

                {/* 5 Frames Visual Cross-Section */}
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { label: "Frame 1 (Outer Left)", temp: currentHive.thermal.frame1OuterLeft, isCore: false },
                    { label: "Frame 2 (Brood Left)", temp: currentHive.thermal.frame2BroodLeft, isCore: false },
                    { label: "Frame 3 (Core Queen)", temp: currentHive.thermal.frame3CoreQueen, isCore: true },
                    { label: "Frame 4 (Brood Right)", temp: currentHive.thermal.frame4BroodRight, isCore: false },
                    { label: "Frame 5 (Outer Right)", temp: currentHive.thermal.frame5OuterRight, isCore: false },
                  ].map((f, idx) => {
                    const isHot = f.temp >= 36.0;
                    const isCold = f.temp <= 33.5;
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl text-center border flex flex-col justify-between ${
                          f.isCore
                            ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10"
                            : isHot
                            ? "bg-[#da1e28]/20 border-[#da1e28]/50 text-[#ff8389]"
                            : isCold
                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                            : "bg-[#262626] border-[#393939] text-[#f4f4f4]"
                        }`}
                      >
                        <span className="text-[9px] font-mono text-[#c6c6c6] font-semibold">{f.label.split(" ")[0]} {f.label.split(" ")[1]}</span>
                        <span className="text-base font-extrabold font-mono py-1">{f.temp}°C</span>
                        <span className="text-[8px] font-mono text-[#8d8d8d]">{f.isCore ? "Queen Cluster" : "Honey Margin"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: SCD41 CO2 & BME688 MOX AI GAS INDEX
                -------------------------------------------------------------- */}
            {(inspectorSubTab === "OVERVIEW" || inspectorSubTab === "GAS") && (
              <div className="bg-[#161616] border border-[#393939] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-purple-400" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">SCD41 Photoacoustic CO2 & BME688 Gas Index</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800 font-bold">
                    Ventilation: {currentHive.gas.ventilationStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="bg-[#262626] p-3 rounded-xl border border-[#393939]">
                    <span className="text-[#8d8d8d] text-[10px] block font-semibold">SCD41 CO2</span>
                    <span className="text-lg font-extrabold text-white">{currentHive.gas.scd41Co2Ppm} ppm</span>
                    <span className="text-[9px] text-[#c6c6c6] block mt-0.5">Threshold: 2200 ppm</span>
                  </div>
                  <div className="bg-[#262626] p-3 rounded-xl border border-[#393939]">
                    <span className="text-[#8d8d8d] text-[10px] block font-semibold">BME688 MOX VOC</span>
                    <span className="text-lg font-extrabold text-purple-300">{currentHive.gas.bme688VocKohm} kΩ</span>
                    <span className="text-[9px] text-[#c6c6c6] block mt-0.5">Air Quality Index</span>
                  </div>
                  <div className="bg-[#262626] p-3 rounded-xl border border-[#393939]">
                    <span className="text-[#8d8d8d] text-[10px] block font-semibold">Alarm Pheromone</span>
                    <span className="text-lg font-extrabold text-amber-400">{currentHive.gas.isopentylAcetateIndex} / 100</span>
                    <span className="text-[9px] text-[#c6c6c6] block mt-0.5">Isopentyl Acetate</span>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: HONEY CHAIN IMMUTABLE PROOF
                -------------------------------------------------------------- */}
            {(inspectorSubTab === "OVERVIEW" || inspectorSubTab === "CHAIN") && (
              <div className="bg-[#161616] border border-[#393939] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">Honey Chain Cryptographic Proof</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-[#198038]/20 text-[#42be65] px-2 py-0.5 rounded border border-[#24a148]/40 font-bold">
                    <ShinyText text="SEALED ON-CHAIN" speed={3} className="text-[#42be65] font-bold" />
                  </span>
                </div>

                <div className="bg-[#262626] p-3 rounded-xl border border-[#393939] space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-[#393939] pb-1.5 items-center">
                    <span className="text-[#c6c6c6]">SHA-256 Merkle Root:</span>
                    <DecryptedText text={currentHive.blockchain.merkleRoot} speed={20} className="text-amber-400 font-bold font-mono" />
                  </div>
                  <div className="flex justify-between border-b border-[#393939] pb-1.5 items-center">
                    <span className="text-[#c6c6c6]">Hardware SE Hash:</span>
                    <DecryptedText text={`0xBE88F5-${currentHive.id.toString(16).padStart(4, "0")}-STM32U585-ATECC608A`} speed={20} className="text-cyan-300 font-bold font-mono" />
                  </div>
                  <div className="flex justify-between border-b border-[#393939] pb-1.5 items-center">
                    <span className="text-[#c6c6c6]">Block Number:</span>
                    <span className="text-white font-bold">#<CountUp to={currentHive.blockchain.blockNumber} duration={1} /></span>
                  </div>
                  <div className="flex justify-between border-b border-[#393939] pb-1.5 items-center">
                    <span className="text-[#c6c6c6]">Batch ID:</span>
                    <ShinyText text={currentHive.blockchain.batchId} speed={4} className="text-[#42be65] font-bold" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#c6c6c6]">Block Hash:</span>
                    <div className="flex items-center gap-1.5">
                      <DecryptedText text={currentHive.blockchain.blockHash} speed={15} className="text-[#f4f4f4] truncate max-w-[180px] text-[10px]" />
                      <button
                        onClick={() => copyBlockHash(currentHive.blockchain.blockHash)}
                        className="p-1 text-[#c6c6c6] hover:text-white"
                        title="Copy Hash"
                      >
                        {isCopiedHash ? <Check className="w-3.5 h-3.5 text-[#42be65]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: HARDWARE TELEMETRY & ANTENNA ARCHITECTURE
                -------------------------------------------------------------- */}
            {(inspectorSubTab === "OVERVIEW" || inspectorSubTab === "HARDWARE") && (
              <div className="bg-[#161616] border border-[#393939] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white">Hardware Enclosure & Edge PCB Architecture</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                    IP67 Sealed Ruggedized
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative h-36 rounded-xl overflow-hidden border border-[#393939]">
                    <Image
                      src={getAssetPath("/images/node_enclosure.jpg")}
                      alt="Beevil Hardware Node Enclosure"
                      fill
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-[10px] font-mono bg-black/80 px-2 py-1 rounded border border-[#525252] flex justify-between">
                      <span>IP67 Telemetry Node</span>
                      <span className="text-amber-400 font-bold">STM32U585</span>
                    </div>
                  </div>

                  <div className="relative h-36 rounded-xl overflow-hidden border border-[#393939]">
                    <Image
                      src={getAssetPath("/images/hardware/beevil_hardware_node.jpg")}
                      alt="Beevil PCB Architecture"
                      fill
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-[10px] font-mono bg-black/80 px-2 py-1 rounded border border-[#525252] flex justify-between">
                      <span>LoRa 915MHz SX1262</span>
                      <span className="text-cyan-300 font-bold">LiFePO4 Solar</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#262626] p-3 rounded-xl border border-[#393939] space-y-1 text-[11px] font-mono text-[#c6c6c6]">
                  <div className="flex justify-between">
                    <span>Edge Processing:</span>
                    <span className="text-white font-bold">STM32U585 Arm Cortex-M33 (160MHz)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mesh Network:</span>
                    <span className="text-cyan-300 font-bold">SX1262 LoRa 915MHz • 12km Line-of-Sight</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Element:</span>
                    <span className="text-[#42be65] font-bold">Microchip ATECC608A Hardware TrustZone</span>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                INSPECTOR TAB: PLAYDATE RETRO FIELD CONSOLE
                -------------------------------------------------------------- */}
            {inspectorSubTab === "PLAYDATE" && (
              <div className="bg-[#161616] border border-[#393939] rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                <div className="w-full flex items-center justify-between border-b border-[#393939] pb-2 text-xs font-mono">
                  <span className="text-amber-400 font-bold">Playdate Retro Field Console</span>
                  <span className="text-[#c6c6c6]">Node #{currentHive.id}</span>
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
          FIELD COMPASS NAVIGATION HUD MODAL
          ==================================================================== */}
      {navTargetHive && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#262626] border border-amber-500/50 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 relative text-[#f4f4f4]">
            <button
              onClick={() => setNavTargetHive(null)}
              className="absolute top-4 right-4 text-[#c6c6c6] hover:text-white p-2 rounded-lg bg-[#161616] min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold uppercase">
                Field GPS Bearing HUD
              </span>
              <h2 className="text-lg font-extrabold text-white">Navigate to Hive #{navTargetHive.id}</h2>
              <p className="text-xs font-mono text-[#c6c6c6]">{navTargetHive.apiaryZone}</p>
            </div>

            {/* Big Compass Rose with Live Needle */}
            <div className="relative w-44 h-44 mx-auto rounded-full border-4 border-[#393939] bg-[#161616] flex items-center justify-center shadow-inner">
              {/* Radar pulse effect */}
              <div className="absolute inset-4 rounded-full border border-amber-500/20 animate-ping" />
              
              {/* Compass Needle */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
                style={{ transform: `rotate(${navTargetHive.gpsBearingDeg}deg)` }}
              >
                <div className="w-2.5 h-18 bg-gradient-to-t from-transparent to-amber-400 rounded-full shadow-[0_0_15px_#f59e0b]" />
              </div>
              <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-black z-10 flex items-center justify-center shadow-md">
                <Navigation className="w-3.5 h-3.5 text-black" />
              </div>

              {/* Cardinal Labels */}
              <span className="absolute top-2 text-[10px] font-mono font-extrabold text-amber-400">N</span>
              <span className="absolute right-2 text-[10px] font-mono font-bold text-[#8d8d8d]">E</span>
              <span className="absolute bottom-2 text-[10px] font-mono font-bold text-[#8d8d8d]">S</span>
              <span className="absolute left-2 text-[10px] font-mono font-bold text-[#8d8d8d]">W</span>
            </div>

            {/* Distance Callout */}
            <div className="bg-[#161616] border border-[#393939] rounded-2xl p-3 font-mono text-xs space-y-1">
              <div className="text-2xl font-extrabold text-amber-400">
                <CountUp to={navTargetHive.gpsDistanceMeters} duration={1} /> <span className="text-sm font-normal text-[#8d8d8d]">meters</span>
              </div>
              <p className="text-[#f4f4f4] text-[12px] font-semibold">
                Bearing: <span className="text-white font-bold">{navTargetHive.gpsBearingDeg}° ({navTargetHive.gpsBearingText})</span>
              </p>
            </div>

            <button
              onClick={() => setNavTargetHive(null)}
              className="w-full min-h-[48px] py-3 bg-amber-400 hover:bg-amber-300 text-black font-mono font-extrabold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              Close Compass HUD
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          PRINTABLE HONEY CHAIN JAR QR CERTIFICATE MODAL
          ==================================================================== */}
      {isJarCertOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#262626] border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-[#f4f4f4] relative">
            <button
              onClick={() => setIsJarCertOpen(false)}
              className="absolute top-4 right-4 text-[#c6c6c6] hover:text-white p-2 rounded-lg bg-[#161616] min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                <Award className="w-3.5 h-3.5" />
                <ShinyText text="OFFICIAL HONEY CHAIN VERIFICATION" speed={3} className="text-amber-300 font-bold" />
              </div>
              <h2 className="text-lg font-extrabold text-white tracking-tight pt-1">
                <ShinyText text="Organic Honey Batch Certificate" speed={4} className="text-white font-extrabold" />
              </h2>
              <p className="text-xs font-mono text-[#c6c6c6]">
                Tamper-Proof Telemetry Cryptographically Sealed On-Chain
              </p>
            </div>

            <div className="bg-[#161616] border border-[#393939] rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl text-slate-950">
                <QrCode className="w-32 h-32 text-slate-900" />
                <span className="text-[10px] font-mono font-bold text-slate-700 mt-1">
                  SCAN TO VERIFY SHA-256 HASH
                </span>
              </div>

              <div className="space-y-1.5 border-t border-[#393939] pt-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#c6c6c6]">Batch ID:</span>
                  <ShinyText text={currentHive.blockchain.batchId} speed={4} className="text-amber-400 font-bold" />
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c6c6c6]">Flora:</span>
                  <span className="text-white">{currentHive.blockchain.floralSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c6c6c6]">Purity:</span>
                  <span className="text-[#42be65] font-semibold">
                    <CountUp to={currentHive.blockchain.purityPct} decimals={1} suffix="% Organic" duration={1.2} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c6c6c6]">Moisture:</span>
                  <span className="text-cyan-300 font-semibold">
                    <CountUp to={currentHive.blockchain.moisturePct} decimals={1} suffix="% H2O" duration={1.2} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c6c6c6]">SHA-256 Merkle Root:</span>
                  <DecryptedText text={currentHive.blockchain.merkleRoot} speed={20} className="text-amber-300 font-mono text-[10px]" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c6c6c6]">Hardware Hash:</span>
                  <DecryptedText text={`0xBE88F5-${currentHive.id.toString(16).padStart(4, "0")}-STM32U585`} speed={20} className="text-cyan-300 font-mono text-[10px]" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c6c6c6]">Block Hash:</span>
                  <DecryptedText text={currentHive.blockchain.blockHash} speed={15} className="text-[#f4f4f4] truncate max-w-[180px] text-[10px]" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <ClickSpark sparkColor="#f59e0b" sparkRadius={30}>
                <button
                  onClick={() => window.print()}
                  className="w-full min-h-[48px] py-3 bg-amber-400 hover:bg-amber-300 text-black font-mono font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Jar Label</span>
                </button>
              </ClickSpark>
              <button
                onClick={() => setIsJarCertOpen(false)}
                className="min-h-[48px] px-4 py-3 bg-[#161616] hover:bg-[#393939] text-[#f4f4f4] font-mono text-xs rounded-xl border border-[#393939] font-bold active:scale-95"
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
