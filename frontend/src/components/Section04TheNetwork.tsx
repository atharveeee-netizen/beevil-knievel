"use client";

import React from "react";
import { Radio, Network, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function Section04TheNetwork() {
  return (
    <section id="the-network" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222632]">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            04 - THE NETWORK
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            BeevilMesh: Self-healing radio.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            Apiaries are placed in remote valleys, forest boundaries, and out-yards with zero cellular signal. BeevilMesh uses sub-GHz LoRa radio so hives relay packets across the yard to the central gateway.
          </p>
        </div>

        {/* Clean Engineering Schematic Flow */}
        <div className="bg-[#12151e] border border-[#222632] p-8 sm:p-10 rounded-sm space-y-8">
          
          <div className="flex items-center justify-between border-b border-[#222632] pb-4">
            <span className="text-xs font-mono text-[#8a90a0] uppercase tracking-wider">
              MULTI-HOP PACKET RELAY TOPOLOGY
            </span>
            <span className="text-xs font-mono text-[#2ea043] font-bold">
              15 KM SUB-GHZ RANGE
            </span>
          </div>

          {/* Minimal Schematic Path: Hive 001 -> Hive 015 -> Hive 042 -> Gateway */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            <div className="bg-[#0a0d14] border border-[#222632] p-5 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#f4f4f6]">Hive 001</span>
                <span className="text-[9px] font-mono text-[#f0b840] bg-[#f0b840]/10 px-1.5 py-0.5 rounded-sm">Node</span>
              </div>
              <p className="text-[11px] text-[#8a90a0] font-mono">
                Remote corner of the out-yard behind thick pine trees.
              </p>
              <div className="text-[10px] font-mono text-[#8a90a0] pt-1">
                Hop 1 • 865 MHz LoRa
              </div>
            </div>

            <div className="bg-[#0a0d14] border border-[#222632] p-5 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#f4f4f6]">Hive 015</span>
                <span className="text-[9px] font-mono text-[#8a90a0] bg-[#8a90a0]/10 px-1.5 py-0.5 rounded-sm">Relay</span>
              </div>
              <p className="text-[11px] text-[#8a90a0] font-mono">
                Intermediate line-of-sight repeater on ridge line.
              </p>
              <div className="text-[10px] font-mono text-[#8a90a0] pt-1">
                Hop 2 • AES-256 Forward
              </div>
            </div>

            <div className="bg-[#0a0d14] border border-[#222632] p-5 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#f4f4f6]">Hive 042</span>
                <span className="text-[9px] font-mono text-[#2ea043] bg-[#2ea043]/10 px-1.5 py-0.5 rounded-sm">Proxy</span>
              </div>
              <p className="text-[11px] text-[#8a90a0] font-mono">
                Apiary central yard with direct gateway link.
              </p>
              <div className="text-[10px] font-mono text-[#8a90a0] pt-1">
                Hop 3 • Packet Aggregated
              </div>
            </div>

            <div className="bg-[#0a0d14] border-2 border-[#f0b840]/60 p-5 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#f4f4f6]">Gateway Hub</span>
                <span className="text-[9px] font-mono bg-[#f0b840] text-[#0a0d14] px-1.5 py-0.5 rounded-sm font-bold">CM4 Hub</span>
              </div>
              <p className="text-[11px] text-[#8a90a0] font-mono">
                Base station running local SQLite WAL and neural fusion.
              </p>
              <div className="text-[10px] font-mono text-[#2ea043] pt-1">
                Ingested • 8.2ms INT8
              </div>
            </div>

          </div>

          {/* 3 Core Network Realities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#222632]">
            <div>
              <span className="text-xs font-bold text-[#f4f4f6] font-mono uppercase block mb-1">
                No Cellular SIM Required
              </span>
              <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">
                Operates entirely over license-free sub-GHz spectrum (IN865 / EU868 / US915). Zero monthly recurring SIM costs per hive.
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#f4f4f6] font-mono uppercase block mb-1">
                Dynamic Self-Healing
              </span>
              <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">
                If a hive node is moved or obstructed by growth, neighboring nodes automatically re-route packets to maintain 99.8% delivery.
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#f4f4f6] font-mono uppercase block mb-1">
                Hardware AES-256 Security
              </span>
              <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">
                Every payload is encrypted using on-chip ARM Cryptocell-310 hardware keys directly on the nRF52840 silicon.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
