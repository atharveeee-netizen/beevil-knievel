import React from "react";
import { Server, Database, ShieldCheck, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function GatewayEdgeSection() {
  return (
    <section id="gateway" className="py-16 md:py-24 border-b border-[#283144] bg-[#0c0e14] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              07 — Hardened Base Station
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Hardened Edge Gateway &amp; Zero-Cloud Ingestion
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">Raspberry Pi 3B+ + SQLite WAL</Badge>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: Edge Architecture & Hardening Features */}
          <div className="lg:col-span-6 space-y-4 font-mono text-xs">
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4">
              <div className="text-sm font-bold text-[#f59e0b] uppercase flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span>Base Station Compute Specifications</span>
              </div>
              
              <div className="space-y-2 text-[#94a3b8]">
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">SBC Host:</span>
                  <span className="text-[#f1f5f9] font-bold">Raspberry Pi 3 Model B+ (Broadcom BCM2837B0 @ 1.4 GHz)</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Radio HAT:</span>
                  <span className="text-[#f1f5f9] font-bold">Waveshare SX1262 LoRa Gateway HAT (SPI /dev/spidev0.0)</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Storage:</span>
                  <span className="text-[#38bdf8] font-bold">Industrial pSLC MicroSD with OverlayFS Read-Only Root</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Database:</span>
                  <span className="text-[#10b981] font-bold">SQLite 3 Write-Ahead Logging (WAL) Ingestion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">API Engine:</span>
                  <span className="text-[#f1f5f9] font-bold">FastAPI + Local WebSockets (Sub-7ms latency)</span>
                </div>
              </div>
            </div>

            {/* Three Edge Hardening Principles */}
            <div className="space-y-2">
              <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
                <div className="text-xs font-bold text-[#f1f5f9] uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                  <span>1. OverlayFS Power-Cut Resilience</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-1">
                  Remote solar gateways experience sudden power cuts during storms. OverlayFS maintains the rootfs in strict read-only mode, writing temporary logs to RAM to prevent filesystem corruption.
                </p>
              </div>

              <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
                <div className="text-xs font-bold text-[#f1f5f9] uppercase flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#38bdf8]" />
                  <span>2. Sub-7ms SQLite WAL Commits</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-1">
                  High-frequency multi-node telemetry frames are committed via SQLite WAL mode, achieving 148 packets/second burst throughput with zero lock contention.
                </p>
              </div>

              <div className="p-3 rounded bg-[#11141d] border border-[#283144]">
                <div className="text-xs font-bold text-[#f1f5f9] uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#fbbf24]" />
                  <span>3. Zero Cloud Dependency</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-sans mt-1">
                  Commercial holding yards are located in rural agricultural dead zones. The gateway serves the full telemetry UI and API locally over Wi-Fi without needing internet connectivity.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Canonical Figure 0.7 */}
          <div className="lg:col-span-6 rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-lg">
            <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#f1f5f9] uppercase">Canonical Figure 0.7: Gateway Architecture</span>
              <span className="text-[#94a3b8] text-[10px]">RPi 3B+ + SX1262</span>
            </div>
            <div className="p-4 sm:p-6 bg-[#ffffff] flex items-center justify-center">
              <img
                src="/figures/canonical/07_receiver_gateway.svg"
                alt="Canonical Receiver Gateway Architecture: Raspberry Pi 3B+, Waveshare SX1262 HAT, SQLite WAL, Read-Only OverlayFS"
                className="w-full h-auto max-h-[380px] object-contain"
              />
            </div>
            <div className="px-4 py-2 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex items-center justify-between">
              <span>SPI bus /dev/spidev0.0 unrolls 33-byte binary packets directly into SQLite WAL</span>
              <Badge claim="VALIDATED" size="sm">Gateway Stack</Badge>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
