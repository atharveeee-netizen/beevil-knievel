import React from "react";
import { CheckCircle2, ShieldCheck, FileCheck, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ClaimType } from "@/lib/design-tokens";

export function ValidationEvidenceSection() {
  const EVIDENCE_ROWS: Array<{
    dimension: string;
    claim: string;
    classification: ClaimType;
    source: string;
  }> = [
    {
      dimension: "RF LoRa Range (LOS)",
      claim: "4.2 km Line-of-Sight",
      classification: "CALCULATED",
      source: "MATLAB Free-Space Path Loss model (simulation/matlab/rf_link_budget_and_range.m)",
    },
    {
      dimension: "RF LoRa Range (Foliage)",
      claim: "1.5 km Dense Pine Canopy",
      classification: "CALCULATED",
      source: "ITU-R P.833-9 foliage attenuation + 8.72 dB hive dielectric loss model",
    },
    {
      dimension: "Multi-Hive Network Load",
      claim: "100 Concurrent Nodes",
      classification: "DEMONSTRATED",
      source: "Gateway software load test pipeline (tests/test_full_gateway_pipeline.py)",
    },
    {
      dimension: "Deep Sleep Current",
      claim: "2.0 μA @ 3.3V",
      classification: "CALCULATED",
      source: "Semiconductor datasheet electrical sums (nRF52840 + TPS62840 + BQ25171 Iq)",
    },
    {
      dimension: "Battery Autonomy",
      claim: "10.4 Months (Zero Solar)",
      classification: "CALCULATED",
      source: "300s duty cycle energy model (simulation/matlab/node_energy_budget_model.m)",
    },
    {
      dimension: "Acoustic Classifier Bench",
      claim: "30/30 Test Cases (100%)",
      classification: "VALIDATED",
      source: "TinyML multi-spectral benchmark runner (TinyML Model/run_stress_test_benchmark.py)",
    },
    {
      dimension: "FFT Frequency Resolution",
      claim: "7.8125 Hz per bin",
      classification: "VALIDATED",
      source: "Discrete 256-pt Real FFT model validation with Hanning window (-32 dB sidelobe)",
    },
    {
      dimension: "Gateway Ingest Latency",
      claim: "Sub-7 ms Transaction Commit",
      classification: "VALIDATED",
      source: "SQLite 3 WAL throughput benchmark on Raspberry Pi 3B+ BCM2837B0",
    },
    {
      dimension: "Hardware Prototype BoM",
      claim: "$64.54 USD (₹5,380)",
      classification: "VALIDATED",
      source: "Audited engineering Bill of Materials (docs/CANONICAL_BOM.md)",
    },
  ];

  return (
    <section id="evidence" className="py-16 md:py-24 border-b border-[#283144] bg-[#090b10] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              10 — Empirical Truth &amp; Verification
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Engineering Validation Matrix &amp; Evidence Ledger
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">Zero Fabrication Policy</Badge>
          </div>
        </div>

        {/* Evidence Table */}
        <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] overflow-x-auto mb-12 font-mono text-xs">
          <div className="text-sm font-bold text-[#f1f5f9] uppercase mb-1 flex items-center justify-between">
            <span>Claims vs. Mathematical and Empirical Evidence</span>
            <span className="text-[10px] text-[#64748b]">IEEE HART Phase 2 Standard</span>
          </div>
          <p className="text-[11px] text-[#94a3b8] font-sans mb-4">
            Every technical performance metric is classified according to strict empirical taxonomy. Simulated values are never masqueraded as real sensor measurements.
          </p>

          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#283144] text-[10px] text-[#64748b] uppercase">
                <th className="pb-2.5">Engineering Dimension</th>
                <th className="pb-2.5">Claim Value</th>
                <th className="pb-2.5">Classification</th>
                <th className="pb-2.5">Artifact Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1d2332] text-[11px]">
              {EVIDENCE_ROWS.map((row) => (
                <tr key={row.dimension} className="hover:bg-[#181d28]">
                  <td className="py-2.5 font-semibold text-[#f1f5f9]">{row.dimension}</td>
                  <td className="py-2.5 font-bold text-[#ffc833]">{row.claim}</td>
                  <td className="py-2.5">
                    <Badge claim={row.classification} size="sm" />
                  </td>
                  <td className="py-2.5 text-[#94a3b8] font-sans text-[11px]">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Canonical Figure 12 Display */}
        <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-lg">
          <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#f1f5f9] uppercase">
              Canonical Figure 12: Engineering Validation Matrix
            </span>
            <span className="text-[#94a3b8] text-[10px]">Claims vs Evidence</span>
          </div>
          <div className="p-4 sm:p-6 bg-[#ffffff] flex items-center justify-center">
            <img
              src="/figures/canonical/12_validation.svg"
              alt="Canonical Engineering Validation Matrix: Claims vs Mathematical and Empirical Evidence"
              className="w-full h-auto max-h-[380px] object-contain"
            />
          </div>
          <div className="px-4 py-2 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex items-center justify-between">
            <span>Rigorous peer-reviewed reproducibility backed by Python automated test suites</span>
            <Badge claim="VALIDATED" size="sm">Audit Complete</Badge>
          </div>
        </div>

      </div>
    </section>
  );
}
