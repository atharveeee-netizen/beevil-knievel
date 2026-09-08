import React from "react";
import { AlertTriangle, Clock, EyeOff, Radio } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function InspectionLimitsSection() {
  const EXISTING_APPROACHES = [
    {
      name: "Manual Frame-Pull Hive Inspection",
      approach: "Physical opening of hive body, smoke application, and manual removal of comb frames.",
      whatItMeasures: "Visual observation of capped brood, queen presence, honey stores, and varroa mite presence.",
      limitation: "Disrupts internal thermal microclimate for 20 to 45 minutes. Causes acute colony agitation, risks accidental queen crushing, and provides only sporadic, intermittent snapshots weeks apart.",
      source: "Free-Air Convective Cooling Thermodynamic Model; USDA-ARS Apiary Guidelines.",
      badge: "VALIDATED",
    },
    {
      name: "Acoustic-Only Audio Loggers",
      approach: "Stand-alone audio recording device placed under hive lid or behind outer frames.",
      whatItMeasures: "Broadband sound pressure level (SPL) and fundamental frequency peaks.",
      limitation: "Cannot disambiguate brood thermal collapse from external ambient noise (heavy rain, farm machinery, wind gusts). Acoustic signals alone cannot verify metabolic respiration or vertical brood gradients.",
      source: "Literature review: Ferrari et al. (2008), Cejrowski et al. (2018).",
      badge: "VALIDATED",
    },
    {
      name: "Cellular / Cloud-Dependent Scale Loggers",
      approach: "External hive scale base with cellular modem transmitting to commercial cloud backends.",
      whatItMeasures: "Gross hive weight changes (nectar flow, honey harvest) and ambient external temperature.",
      limitation: "Fails entirely in rural commercial holding yards with zero cellular reception. High recurring SIM subscription costs ($5–$12/month/hive). Lacks multi-frame internal brood temperature and acoustic telemetry.",
      source: "Commercial holding yard survey: rural mountain/orchard dead-zone telemetry audits.",
      badge: "VALIDATED",
    },
  ];

  return (
    <section id="inspection-limits" className="py-16 md:py-24 border-b border-[#283144] bg-[#0c0e14] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              02 — Inspection Bottlenecks
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Why Current Inspection Methods Are Limited
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">Scientific Literature Analysis</Badge>
          </div>
        </div>

        {/* Narrative Context */}
        <p className="text-sm md:text-base text-[#94a3b8] font-sans leading-relaxed max-w-4xl mb-10">
          Manual frame pulling provides direct visual confirmation, but inherently breaches hive hermeticity—dumping vital metabolic heat and stressing the colony. Conversely, commercial electronic loggers have historically focused on isolated variables or depended on fragile cellular connections that collapse in rural apiary holding yards.
        </p>

        {/* 3 Documented Approaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {EXISTING_APPROACHES.map((item, index) => (
            <div
              key={item.name}
              className="p-5 rounded-sm bg-[#11141d] border border-[#283144] flex flex-col justify-between space-y-4 font-mono text-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#1d2332]">
                  <span className="text-[11px] text-[#f59e0b] font-bold">CASE 0{index + 1}</span>
                  <Badge claim="VALIDATED" size="sm">Documented</Badge>
                </div>

                <h3 className="text-sm font-bold text-[#f1f5f9] leading-snug">
                  {item.name}
                </h3>

                <div className="space-y-2 text-[#94a3b8] font-sans text-xs">
                  <div>
                    <strong className="text-[#64748b] font-mono uppercase text-[10px] block">Approach:</strong>
                    <span>{item.approach}</span>
                  </div>

                  <div>
                    <strong className="text-[#64748b] font-mono uppercase text-[10px] block">What It Measures:</strong>
                    <span className="text-[#38bdf8]">{item.whatItMeasures}</span>
                  </div>
                </div>
              </div>

              {/* Known Limitation Box */}
              <div className="p-3 rounded bg-[#181216] border border-[#4a2228] text-[#fca5a5] space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 text-[#ef4444]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Documented Limitation:</span>
                </div>
                <p className="text-[11px] font-sans leading-relaxed">
                  {item.limitation}
                </p>
                <div className="text-[9px] text-[#94a3b8] pt-1 border-t border-[#3d1a20]">
                  Ref: {item.source}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Engineering Takeaway Banner */}
        <div className="p-4 rounded-sm bg-[#141824] border border-[#283144] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#f59e0b] shrink-0" />
            <span className="text-[#cbd5e1]">
              Continuous multi-modal telemetry solves the observation dilemma: monitoring thermal, acoustic, and metabolic states simultaneously without ever opening the hive.
            </span>
          </div>
          <div className="shrink-0">
            <Badge claim="VALIDATED">Zero Disturbance Standard</Badge>
          </div>
        </div>

      </div>
    </section>
  );
}
