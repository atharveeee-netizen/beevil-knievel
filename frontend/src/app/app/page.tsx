"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Radio, RotateCw, Activity, Thermometer, Zap, ShieldCheck, 
  AlertTriangle, CheckCircle2, QrCode, Search, ArrowLeft, Sparkles, Volume2,
  Lock, Laptop, Cpu, Network, FileText, Download, Droplet
} from "lucide-react";
import { PlaydateConsole } from "@/components/PlaydateConsole";

interface HiveNode {
  id: number;
  status: "HEALTHY" | "SWARM_RISK" | "QUEEN_ALERT" | "VARROA_SURGE";
  tempCore: number;
  humidity: number;
  co2: number;
  voc: number;
  weightKg: number;
  deltaWeightKg: number;
  audioFreq: number;
  batteryPct: number;
  rssi: number;
  snr: number;
  hops: number;
  varroaPct: number;
  honeyForecastKg: number;
  blockHash: string;
}

export default function HiveOSApp() {
  const [selectedHiveId, setSelectedHiveId] = useState<number>(1);
  const [activeFrequency, setActiveFrequency] = useState<number>(220);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Generate simulated 100-hive fleet telemetry
  const generateHives = (): HiveNode[] => {
    return Array.from({ length: 100 }, (_, i) => {
      const id = i + 1;
      let status: "HEALTHY" | "SWARM_RISK" | "QUEEN_ALERT" | "VARROA_SURGE" = "HEALTHY";
      let audioFreq = 220;
      let tempCore = +(34.5 + (id % 5) * 0.1).toFixed(2);
      let varroaPct = +(1.2 + (id % 3) * 0.4).toFixed(1);

      if (id === 88 || id === 14 || id === 67) {
        status = "SWARM_RISK";
        audioFreq = 450;
        tempCore = 36.4;
      } else if (id === 42 || id === 7 || id === 93) {
        status = "QUEEN_ALERT";
        audioFreq = 250;
        tempCore = 33.8;
      } else if (id === 23 || id === 51) {
        status = "VARROA_SURGE";
        audioFreq = 310;
        varroaPct = 4.8;
      }

      return {
        id,
        status,
        tempCore,
        humidity: 58 + (id % 8),
        co2: 1100 + (id % 30) * 15,
        voc: 135 + (id % 20),
        weightKg: +(42.5 + (id % 12) * 0.8).toFixed(1),
        deltaWeightKg: +(0.8 + (id % 6) * 0.3).toFixed(2),
        audioFreq,
        batteryPct: 90 + (id % 10),
        rssi: -75 - (id % 25),
        snr: +(8.5 + (id % 5) * 0.5).toFixed(1),
        hops: id <= 25 ? 1 : id <= 70 ? 2 : 3,
        varroaPct,
        honeyForecastKg: +(4.2 + (id % 4) * 0.6).toFixed(1),
        blockHash: `0xbee88${id.toString(16).padStart(4, "0")}f90c741`,
      };
    });
  };

  const [fleet] = useState<HiveNode[]>(generateHives);
  const currentHive = fleet.find((h) => h.id === selectedHiveId) || fleet[0];

  useEffect(() => {
    setActiveFrequency(currentHive.audioFreq);
  }, [selectedHiveId, currentHive.audioFreq]);

  const filteredFleet = fleet.filter((hive) => {
    const matchesFilter = activeFilter === "ALL" || hive.status === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      hive.id.toString().includes(searchQuery) ||
      hive.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#191a1b] text-white flex flex-col font-sans">
      {/* Top Application Bar */}
      <header className="bg-[#212223] border-b border-white/10 px-4 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-white/10 hover:bg-[#ffc833] hover:text-[#312f28] px-3.5 py-1.5 rounded-full transition-all text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing Page</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ffc833] animate-pulse" />
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
              HiveOS <span className="text-[#ffc833] font-mono text-sm font-semibold">Console v2.4</span>
            </span>
          </div>
        </div>

        {/* Global Apiary Stats Summary */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono text-white/80 overflow-x-auto max-w-full pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full">
            <Radio className="w-3.5 h-3.5 text-[#ffc833]" />
            <span>100 Nodes Active</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>92 Nominal</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/15 text-amber-400 px-3 py-1 rounded-full">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>8 Alerts</span>
          </div>
          <div className="flex items-center gap-1.5 bg-purple-500/15 text-purple-400 px-3 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>Honey Chain Synced</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 100-Hive Multi-Hop Fleet Matrix (5 Cols) */}
        <div className="lg:col-span-5 bg-[#212223] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-[#ffc833]" />
                <h2 className="text-lg font-extrabold text-white">100-Hive Mesh Fleet</h2>
              </div>
              <span className="text-xs font-mono text-white/50">{filteredFleet.length} Nodes Shown</span>
            </div>

            {/* Search and Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Hive ID or Status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-[#ffc833]"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {["ALL", "HEALTHY", "SWARM_RISK", "QUEEN_ALERT", "VARROA_SURGE"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                      activeFilter === filter
                        ? "bg-[#ffc833] text-[#312f28]"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {filter.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* 100 Nodes Interactive Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-[380px] overflow-y-auto p-1 bg-black/30 rounded-2xl border border-white/5">
              {filteredFleet.map((hive) => {
                const isSelected = hive.id === selectedHiveId;
                let statusColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
                if (hive.status === "SWARM_RISK") statusColor = "bg-amber-500/30 text-amber-300 border-amber-500/60 animate-pulse";
                if (hive.status === "QUEEN_ALERT") statusColor = "bg-[#ffc833]/30 text-[#ffc833] border-[#ffc833]/60";
                if (hive.status === "VARROA_SURGE") statusColor = "bg-rose-500/30 text-rose-300 border-rose-500/60";

                return (
                  <button
                    key={hive.id}
                    onClick={() => setSelectedHiveId(hive.id)}
                    className={`h-11 rounded-xl font-mono text-xs font-bold border flex flex-col items-center justify-center transition-all ${statusColor} ${
                      isSelected ? "ring-2 ring-white scale-105 z-10 shadow-lg" : "hover:scale-102"
                    }`}
                  >
                    <span>#{String(hive.id).padStart(2, "0")}</span>
                    <span className="text-[8px] opacity-70">{hive.tempCore}°</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mesh Route Info for Selected Node */}
          <div className="mt-4 pt-4 border-t border-white/10 bg-black/20 p-3.5 rounded-2xl text-xs font-mono space-y-1.5">
            <div className="flex justify-between text-white/70">
              <span>LoRaWAN Mesh Path:</span>
              <span className="text-[#ffc833] font-bold">{currentHive.hops}-Hop Relay</span>
            </div>
            <div className="text-[11px] text-white/90">
              Node #{String(currentHive.id).padStart(3, "0")} ➔ {currentHive.hops > 1 ? `Relay #${String(currentHive.id + 3).padStart(3, "0")} ➔ ` : ""}Antmicro CM4 Base Station
            </div>
            <div className="flex justify-between text-[10px] text-white/50 pt-1">
              <span>RSSI: {currentHive.rssi} dBm</span>
              <span>SNR: +{currentHive.snr} dB</span>
              <span>SF7 / 868.1 MHz</span>
            </div>
          </div>
        </div>

        {/* Center Column: Interactive Playdate Console (4 Cols) */}
        <div className="lg:col-span-4 bg-[#212223] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffc833]" />
              <h2 className="text-base font-extrabold text-white">Playdate Field Unit</h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#ffc833]">
              HIVE #{String(currentHive.id).padStart(3, "0")}
            </span>
          </div>

          <div className="py-2 scale-95 sm:scale-100 flex items-center justify-center">
            <PlaydateConsole 
              initialHiveId={currentHive.id}
              onHiveChange={(id) => setSelectedHiveId(id)}
              frequency={activeFrequency}
              onFrequencyChange={(freq) => setActiveFrequency(freq)}
              compact
            />
          </div>

          {/* Quick Frequency Presets for Selected Hive */}
          <div className="w-full mt-4 pt-4 border-t border-white/10 space-y-2">
            <div className="text-xs font-mono font-bold text-white/70 uppercase">
              Scrub Frequency Harmonics:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveFrequency(220)}
                className={`py-1.5 px-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  activeFrequency === 220 ? "bg-emerald-500/30 text-emerald-300 border-emerald-400" : "bg-black/30 border-white/10 text-white/70"
                }`}
              >
                220 Hz
              </button>
              <button
                onClick={() => setActiveFrequency(450)}
                className={`py-1.5 px-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  activeFrequency === 450 ? "bg-amber-500/30 text-amber-300 border-amber-400" : "bg-black/30 border-white/10 text-white/70"
                }`}
              >
                450 Hz
              </button>
              <button
                onClick={() => setActiveFrequency(250)}
                className={`py-1.5 px-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  activeFrequency === 250 ? "bg-[#ffc833]/30 text-[#ffc833] border-[#ffc833]" : "bg-black/30 border-white/10 text-white/70"
                }`}
              >
                250 Hz
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 16-Sensor Deep Telemetry & Honey Chain (3 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Deep Sensor Card */}
          <div className="bg-[#212223] border border-white/10 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">Live 16-Sensor Fusion</h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                8.2ms Edge
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-white/60">Brood Core Temp:</span>
                <span className="font-bold text-[#ffc833]">{currentHive.tempCore}°C (TMP117)</span>
              </div>
              <div className="flex justify-between bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-white/60">Hive Humidity:</span>
                <span className="font-bold text-sky-400">{currentHive.humidity}% RH</span>
              </div>
              <div className="flex justify-between bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-white/60">NDIR CO2 Sensor:</span>
                <span className="font-bold text-white">{currentHive.co2} ppm</span>
              </div>
              <div className="flex justify-between bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-white/60">BME688 AI VOC:</span>
                <span className="font-bold text-purple-300">{currentHive.voc} kΩ</span>
              </div>
              <div className="flex justify-between bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-white/60">Weight Delta:</span>
                <span className="font-bold text-[#21c6a9]">+{currentHive.deltaWeightKg} kg/day</span>
              </div>
              <div className="flex justify-between bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-white/60">Varroa Mite Load:</span>
                <span className="font-bold text-amber-300">{currentHive.varroaPct}%</span>
              </div>
            </div>
          </div>

          {/* Honey Chain Cryptographic Card */}
          <div id="honey_chain" className="bg-gradient-to-br from-[#212223] to-[#2d281e] border border-[#ffc833]/30 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#ffc833]">
                <Lock className="w-4 h-4" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider">Honey Chain Ledger</h3>
              </div>
              <QrCode className="w-4 h-4 text-[#ffc833]" />
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Tamper-proof telemetry sealed on-chain for 100% organic honey batch provenance.
            </p>

            <div className="bg-black/50 p-2.5 rounded-xl border border-white/10 text-[10px] font-mono space-y-1">
              <div className="text-white/50">SHA-256 Batch Sealing Hash:</div>
              <div className="text-[#ffc833] truncate font-bold">{currentHive.blockHash}</div>
              <div className="text-white/50 pt-1">Forecast Honey Harvest:</div>
              <div className="text-emerald-400 font-bold">+{currentHive.honeyForecastKg} kg Grade-A Monofloral</div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
