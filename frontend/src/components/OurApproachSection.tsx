import React from "react";
import { ArrowRight, Cpu, Database, Radio, Server, ShieldCheck, Thermometer, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function OurApproachSection() {
  const PIPELINE_STAGES = [
    { id: "01", name: "HIVE", desc: "10-Frame Langstroth Colony", icon: Thermometer },
    { id: "02", name: "SENSORS", desc: "9 In-Hive Transducers", icon: Cpu },
    { id: "03", name: "PROCESSING", desc: "CMSIS-DSP FFT on nRF52840", icon: Server },
    { id: "04", name: "WIRELESS", desc: "SX1262 LoRa Star Backhaul", icon: Radio },
    { id: "05", name: "RECEIVER", desc: "RPi 3B+ Gateway + SQLite WAL", icon: Database },
    { id: "06", name: "ANALYTICS", desc: "CUSUM Drift & Anomaly Triage", icon: ShieldCheck },
    { id: "07", name: "DECISION", desc: "<3s Field Technician Alert", icon: Wifi },
  ];

  return (
    <section id="approach" className="py-16 md:py-24 border-b border-[#283144] bg-[#090b10] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              03 — System Architecture &amp; Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              The BEEVIL Knievel Approach
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">3-Tier Cyber-Physical Standard</Badge>
          </div>
        </div>

        {/* Central Visual Language: Pipeline Flow */}
        <div className="mb-14 p-5 rounded-sm bg-[#11141d] border border-[#283144] overflow-x-auto">
          <div className="text-xs font-mono font-bold uppercase text-[#64748b] tracking-wider mb-4">
            Unified Cyber-Physical Telemetry Pipeline:
          </div>
          
          <div className="flex items-center justify-between min-w-[760px] gap-2">
            {PIPELINE_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <React.Fragment key={stage.id}>
                  <div className="flex flex-col items-center text-center p-3 rounded bg-[#141824] border border-[#283144] flex-1">
                    <div className="w-8 h-8 rounded-full bg-[#1e2535] border border-[#3d4964] flex items-center justify-center text-[#f59e0b] mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-[#64748b] font-bold">STAGE {stage.id}</span>
                    <span className="text-xs font-mono font-bold text-[#f1f5f9] mt-0.5">{stage.name}</span>
                    <span className="text-[10px] font-sans text-[#94a3b8] mt-1 leading-tight">{stage.desc}</span>
                  </div>
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-[#3d4964] shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Big Image Rule: Canonical Figure 10 (End-to-End Data Flow) */}
        <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-xl mb-12">
          <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="font-bold text-[#f1f5f9] uppercase">
                Canonical Figure 10: End-to-End System Telemetry Dataflow
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#94a3b8]">
              <span>Sensor DMA → LoRa Packet → SQLite WAL Commit</span>
              <span>•</span>
              <a
                href="/figures/canonical/10_end_to_end_dataflow.svg"
                target="_blank"
                className="text-[#f59e0b] hover:underline"
              >
                View Full Vector SVG
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-8 bg-[#ffffff] flex items-center justify-center">
            <img
              src="/figures/canonical/10_end_to_end_dataflow.svg"
              alt="Canonical Figure 10: End-to-End System Telemetry Dataflow from Sensor DMA capture to SQLite WAL transaction commit"
              className="w-full h-auto max-h-[460px] object-contain"
            />
          </div>

          <div className="px-4 py-2 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex flex-wrap items-center justify-between gap-2">
            <span>Deterministic 33-byte binary payload transmitted every 300s duty cycle</span>
            <Badge claim="VALIDATED" size="sm">Dataflow Protocol</Badge>
          </div>
        </div>

      </div>
    </section>
  );
}
