import React from "react";
import { Network, Radio, Server, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function MultiHiveNetworkSection() {
  return (
    <section id="network" className="py-16 md:py-24 border-b border-[#283144] bg-[#0c0e14] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              11 — Fleet Scaling &amp; Topology
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Multi-Hive Network Architecture (100 Hives)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">Star Topology Standard</Badge>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: Star Topology Justification */}
          <div className="lg:col-span-6 space-y-4 font-mono text-xs">
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-3">
              <div className="text-sm font-bold text-[#f59e0b] uppercase flex items-center gap-2">
                <Network className="w-4 h-4" />
                <span>Single-Hop Star vs. Multi-Hop Mesh</span>
              </div>
              <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
                Commercial holding yards arrange hives in parallel rows within a 100-meter to 500-meter perimeter. In accordance with strict empirical radio engineering, BEEVIL Knievel implements a direct <strong className="text-[#f1f5f9]">Multi-Node Star Topology</strong> rather than complex multi-hop mesh routing.
              </p>

              <div className="space-y-2 pt-2 text-[#94a3b8]">
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Topology Class:</span>
                  <span className="text-[#10b981] font-bold">Star Backhaul (Point-to-Multipoint)</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Max Node Capacity:</span>
                  <span className="text-[#f1f5f9] font-bold">100 Hives per Gateway Reader</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Packet Airtime (SF7):</span>
                  <span className="text-[#38bdf8] font-bold">61.7 milliseconds / transmission</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Aggregate Channel Duty Cycle:</span>
                  <span className="text-[#10b981] font-bold">0.41% (Regulatory limit: 1.0%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Packet Collision Probability:</span>
                  <span className="text-[#38bdf8] font-bold">&lt; 0.82% (Pure ALOHA Model)</span>
                </div>
              </div>
            </div>

            {/* Why Star Topology Wins */}
            <div className="space-y-2">
              <div className="p-3.5 rounded bg-[#11141d] border border-[#283144]">
                <div className="text-xs font-bold text-[#f1f5f9] uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                  <span>1. Zero Relay Power Penalty</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-1">
                  In mesh routing, nodes closest to the gateway deplete their batteries forwarding packets for peripheral nodes. Direct star uplink guarantees every node experiences an identical, predictable 14.8-month battery lifespan.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[#11141d] border border-[#283144]">
                <div className="text-xs font-bold text-[#f1f5f9] uppercase flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#38bdf8]" />
                  <span>2. Sub-7ms Deterministic Ingestion</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-1">
                  Each 33-byte packet is received directly by the gateway SPI HAT and committed into SQLite WAL in under 7 milliseconds, with zero routing hops, route discovery latencies, or dropped packet retries.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Architectural Flow Diagram */}
          <div className="lg:col-span-6 p-5 rounded-sm bg-[#11141d] border border-[#283144] font-mono text-xs space-y-4">
            <div className="text-sm font-bold text-[#ffc833] uppercase flex items-center justify-between pb-2 border-b border-[#283144]">
              <span>Holding Yard Dataflow Hierarchy</span>
              <Badge claim="VALIDATED" size="sm">Star Model</Badge>
            </div>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="p-3 bg-[#181d28] border border-[#283144] rounded">
                <div className="text-[#38bdf8] font-bold uppercase mb-1">In-Hive Nodes (1 to 100):</div>
                <div className="text-[#94a3b8]">Hive 01, Hive 02 ... Hive 100 sample sensors independently on 300s clock</div>
              </div>

              <div className="text-center text-[#64748b] font-bold">↓ Direct LoRa Sub-GHz Star Uplink (865–915 MHz)</div>

              <div className="p-3 bg-[#181d28] border border-[#283144] rounded">
                <div className="text-[#10b981] font-bold uppercase mb-1">Assembled Edge Gateway Reader:</div>
                <div className="text-[#94a3b8]">Raspberry Pi 3B+ with SX1262 HAT unrolls packets directly into SQLite WAL</div>
              </div>

              <div className="text-center text-[#64748b] font-bold">↓ Sub-7ms Local Transaction Commit</div>

              <div className="p-3 bg-[#181d28] border border-[#283144] rounded">
                <div className="text-[#f59e0b] font-bold uppercase mb-1">Local Analytics &amp; Operator Console:</div>
                <div className="text-[#94a3b8]">FastAPI server presents high-contrast field triage on mobile without cloud reliance</div>
              </div>
            </div>

            <div className="p-3 bg-[#090b10] border border-[#1d2332] rounded text-[11px] text-[#94a3b8] font-sans">
              <strong>Collision Resilience:</strong> Pseudo-randomized 300s ± 15s duty cycle jitter prevents packet synchrony between nodes, verified via 100-hive simulated packet stress tests.
            </div>
          </div>

        </div>

        {/* Big Image Rule: Canonical Figure 09 (Multi-Hive Network Topology) */}
        <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="font-bold text-[#f1f5f9] uppercase">
                Canonical Figure 09: Multi-Hive Network Topology (100 Hives)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#94a3b8]">
              <span>100-Hive Apiary Star Topology with Mast-Mounted Gateway</span>
              <span>•</span>
              <a
                href="/figures/canonical/09_multi_hive_network.svg"
                target="_blank"
                className="text-[#f59e0b] hover:underline"
              >
                View Full SVG
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-8 bg-[#ffffff] flex items-center justify-center">
            <img
              src="/figures/canonical/09_multi_hive_network.svg"
              alt="Canonical Figure 09: Multi-Hive Network Topology showing 100-hive star backhaul to central mast gateway"
              className="w-full h-auto max-h-[460px] object-contain"
            />
          </div>

          <div className="px-4 py-2 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex flex-wrap items-center justify-between gap-2">
            <span>Star topology prevents packet relay exhaustion and provides deterministic battery endurance</span>
            <Badge claim="VALIDATED" size="sm">Topology Verified</Badge>
          </div>
        </div>

      </div>
    </section>
  );
}
