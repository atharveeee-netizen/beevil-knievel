import React from "react";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function TechnicalDocsSection() {
  const CANONICAL_FIGURES = [
    { id: "01", title: "System Architecture (3-Tier Cyber-Physical)", path: "/figures/canonical/01_system_architecture.svg" },
    { id: "02", title: "In-Hive Sensor Layer (Transducers & Bus Routing)", path: "/figures/canonical/02_hive_sensor_layer.svg" },
    { id: "03", title: "Sensor Node Hardware Architecture (RAK4631)", path: "/figures/canonical/03_sensor_node.svg" },
    { id: "04", title: "Embedded Processing State Machine (300s Duty Cycle)", path: "/figures/canonical/04_embedded_processing.svg" },
    { id: "05", title: "Acoustic DSP Pipeline (16 kHz I2S & 256-pt FFT)", path: "/figures/canonical/05_acoustic_dsp.svg" },
    { id: "06", title: "Dual-Radio LoRa & BLE Mesh Architecture", path: "/figures/canonical/06_lora_communication.svg" },
    { id: "07", title: "Receiver Gateway Architecture (RPi 3B+ & SQLite WAL)", path: "/figures/canonical/07_receiver_gateway.svg" },
    { id: "08", title: "Edge AI & Machine Learning Pipeline", path: "/figures/canonical/08_ai_ml.svg" },
    { id: "09", title: "Multi-Hive Network Topology (100 Hives)", path: "/figures/canonical/09_multi_hive_network.svg" },
    { id: "10", title: "End-to-End System Telemetry Dataflow", path: "/figures/canonical/10_end_to_end_dataflow.svg" },
    { id: "11", title: "ANSYS Multi-Physics Simulation Suite (11 FEA/CFD)", path: "/figures/canonical/11_ansys_simulation.svg" },
    { id: "12", title: "Engineering Validation Matrix & Evidence Ledger", path: "/figures/canonical/12_validation.svg" },
    { id: "13", title: "Video Master Presentation Architecture", path: "/figures/canonical/13_video_master_architecture.svg" },
  ];

  return (
    <section id="documentation" className="py-16 md:py-24 border-b border-[#283144] bg-[#090b10] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              16 — Technical Documentation &amp; Reproducibility Suite
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Reproducibility Suite &amp; Figure Gallery
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">Deterministic Execution</Badge>
          </div>
        </div>

        {/* Reproducibility Commands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 font-mono text-xs">
          
          <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] space-y-2">
            <div className="flex items-center gap-2 text-[#38bdf8] font-bold">
              <Terminal className="w-4 h-4" />
              <span>1. Run MATLAB / Sim Suite</span>
            </div>
            <p className="text-[11px] text-[#94a3b8] font-sans">
              Zero MATLAB license required; executes via open-source Python bridge.
            </p>
            <div className="p-2.5 bg-[#090b10] border border-[#1d2332] rounded text-[11px] text-[#f1f5f9]">
              python simulation/matlab/run_simulations.py
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] space-y-2">
            <div className="flex items-center gap-2 text-[#10b981] font-bold">
              <Terminal className="w-4 h-4" />
              <span>2. 100-Hive Pipeline Load Test</span>
            </div>
            <p className="text-[11px] text-[#94a3b8] font-sans">
              Verifies SQLite WAL sub-7ms latency and 148 pkt/s ingest under full load.
            </p>
            <div className="p-2.5 bg-[#090b10] border border-[#1d2332] rounded text-[11px] text-[#f1f5f9]">
              python tests/test_full_gateway_pipeline.py
            </div>
          </div>

          <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] space-y-2">
            <div className="flex items-center gap-2 text-[#fbbf24] font-bold">
              <Terminal className="w-4 h-4" />
              <span>3. TinyML DSP Stress Test</span>
            </div>
            <p className="text-[11px] text-[#94a3b8] font-sans">
              Runs 30 unit stress test vectors across clean, noisy, and storm conditions.
            </p>
            <div className="p-2.5 bg-[#090b10] border border-[#1d2332] rounded text-[11px] text-[#f1f5f9]">
              python &quot;TinyML Model/run_stress_test_benchmark.py&quot;
            </div>
          </div>

        </div>

        {/* 13 Canonical Figures Index */}
        <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] font-mono text-xs">
          <div className="text-sm font-bold text-[#f1f5f9] uppercase mb-1 flex items-center justify-between">
            <span>Canonical IEEE Publication Figure Suite (All 13 Figures Available in Vector SVG)</span>
            <Badge claim="VALIDATED" size="sm">Vector Assets</Badge>
          </div>
          <p className="text-[11px] text-[#94a3b8] font-sans mb-4">
            Generated with deterministic MATLAB scripts, pure white backgrounds, and strict subsystem color-coding.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {CANONICAL_FIGURES.map((fig) => (
              <a
                key={fig.id}
                href={fig.path}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded bg-[#181d28] border border-[#283144] hover:border-[#ffc833] transition-colors flex items-center justify-between gap-2 group"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-bold text-[#ffc833]">{fig.id}</span>
                  <span className="text-[#94a3b8] group-hover:text-[#f1f5f9] truncate">
                    {fig.title}
                  </span>
                </div>
                <span className="text-[10px] text-[#64748b] shrink-0 uppercase">SVG</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
