"use client";

import React from "react";
import { Radio, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

export function Section04TheNetwork() {
  return (
    <section id="the-network" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222738]">
      <div className="space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            04 - LORA MESH
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            Sub-GHz LoRa mesh network.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            Apiaries sit in river bottoms, orchards, and forest cuts with no cell service. Nodes relay packets across the yard to the central gateway over license-free sub-GHz radio.
          </p>
        </div>

        {/* Dynamic Topology Schematic Diagram */}
        <div className="bg-[#12151e] border border-[#222738] p-6 sm:p-8 rounded-sm space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222738] pb-4">
            <span className="text-xs font-mono text-[#f4f4f6] uppercase font-bold">MULTI-HOP RELAY TOPOLOGY</span>
            <span className="text-xs font-mono text-[#f0b840]">15 KM SUB-GHZ LINE-OF-SIGHT</span>
          </div>

          {/* Node Progression Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 bg-[#0a0d14] border border-[#222738] rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">Hive 001</span>
                <Radio className="w-3.5 h-3.5 text-[#8a90a0]" />
              </div>
              <p className="text-[11px] font-mono text-[#8a90a0]">Out-yard boundary. Transmits packet to nearest neighbor.</p>
              <div className="text-[10px] font-mono text-[#2ea043]">Hop 1 • Sub-GHz LoRa</div>
            </div>

            <div className="p-4 bg-[#0a0d14] border border-[#222738] rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">Hive 015</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8a90a0]" />
              </div>
              <p className="text-[11px] font-mono text-[#8a90a0]">Mid-yard position. Relays encrypted packet.</p>
              <div className="text-[10px] font-mono text-[#06b6d4]">Hop 2 • Hardware AES-256</div>
            </div>

            <div className="p-4 bg-[#0a0d14] border border-[#222738] rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">Hive 042</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8a90a0]" />
              </div>
              <p className="text-[11px] font-mono text-[#8a90a0]">Front row position. Forwards to mast receiver.</p>
              <div className="text-[10px] font-mono text-[#f0b840]">Hop 3 • Packet Forward</div>
            </div>

            <div className="p-4 bg-[#0a0d14] border border-[#f0b840]/30 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#f0b840]">Gateway Station</span>
                <Cpu className="w-3.5 h-3.5 text-[#f0b840]" />
              </div>
              <p className="text-[11px] font-mono text-[#8a90a0]">CM4 base station logs packet to local SQLite.</p>
              <div className="text-[10px] font-mono text-[#f0b840]">Stored • Local SQLite</div>
            </div>

          </div>

          {/* 3 Core Engineering Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#181c28]">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#f0b840]" />
                <span>No Cellular SIM Fees</span>
              </div>
              <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
                Runs on license-free 865/868/915 MHz bands. No SIM card per box. No monthly data bills.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span>Multi-Hop Packet Routing</span>
              </div>
              <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
                If vegetation blocks line-of-sight, adjacent nodes re-route packets to maintain connection.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2ea043]" />
                <span>Hardware AES-256 Encryption</span>
              </div>
              <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
                Payloads are encrypted on-chip with ARM CryptoCell-310 keys inside the nRF52840.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
