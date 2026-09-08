import React from "react";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function EdgeDiagnosticsSection() {
  const DIAGNOSTIC_STATES = [
    {
      id: "HEALTHY_NORMAL",
      name: "Healthy Normal Homeostasis",
      level: "NOMINAL",
      color: "text-[#10b981]",
      border: "border-[#10b981]",
      sensors: ["TMP117: 34.5°C ± 0.5°C", "Acoustic Band 2 Dominant", "Stable Mass"],
      action: "No intervention required. Standard 5-min duty cycle.",
    },
    {
      id: "QUEEN_PRESENT",
      name: "Queenright Oviposition",
      level: "NOMINAL",
      color: "text-[#10b981]",
      border: "border-[#10b981]",
      sensors: ["Brood core gradient steep", "Worker waggle harmonics active"],
      action: "Colony actively laying worker brood.",
    },
    {
      id: "QUEENLESS_DISTRESS",
      name: "Queenless Colony Roaring",
      level: "CRITICAL",
      color: "text-[#ef4444]",
      border: "border-[#ef4444]",
      sensors: ["Band 3 Acoustic Surge (500–600 Hz)", "Brood core cooling"],
      action: "Immediate technician alert: Introduce queen cage or combine colony.",
    },
    {
      id: "PRE_SWARM_WARNING",
      name: "Pre-Swarm Departure Warning",
      level: "INVESTIGATE",
      color: "text-[#f97316]",
      border: "border-[#f97316]",
      sensors: ["450 Hz Harmonic Escalation", "Thermal pre-heating", "CO2 surge"],
      action: "24-48 Hour Window: Perform emergency colony split to preserve bees.",
    },
    {
      id: "ACTIVE_SWARM",
      name: "Active Swarm Liftoff",
      level: "CRITICAL",
      color: "text-[#ef4444]",
      border: "border-[#ef4444]",
      sensors: ["Sudden mass drop > 2.5 kg", "Massive acoustic dispersion"],
      action: "Swarm in progress; locate cluster on nearby vegetation.",
    },
    {
      id: "VARROA_HIGH",
      name: "Elevated Varroa Mite Infestation",
      level: "ATTENTION",
      color: "text-[#f59e0b]",
      border: "border-[#f59e0b]",
      sensors: ["Progressive CUSUM brood chill drift", "High grooming vibration"],
      action: "Schedule oxalic acid vaporization or formic acid treatment.",
    },
    {
      id: "THERMAL_STRESS",
      name: "Extreme Brood Chill / Overheating",
      level: "CRITICAL",
      color: "text-[#ef4444]",
      border: "border-[#ef4444]",
      sensors: ["Core Temp < 31.0°C or > 38.0°C", "Intense fanning Band 1"],
      action: "Inspect for broken lid, winter starvation cluster collapse, or sun exposure.",
    },
    {
      id: "TAMPER_THEFT",
      name: "Hive Knockdown / Theft Attack",
      level: "CRITICAL",
      color: "text-[#ef4444]",
      border: "border-[#ef4444]",
      sensors: ["LIS3DH Accelerometer Shock > 2.0g", "Tilt Angle > 45°"],
      action: "Instant push alert: Bear predation, high wind tip-over, or theft.",
    },
  ];

  return (
    <section id="analytics" className="py-16 md:py-24 border-b border-[#283144] bg-[#090b10] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              10 — Analytics &amp; Edge Machine Learning
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Multi-Modal Diagnostics &amp; AI Truth Taxonomy
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">Deterministic Sensor Fusion</Badge>
          </div>
        </div>

        {/* 5-Tier AI / ML Taxonomy Table (Section 20 Truth Gate) */}
        <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] mb-10 font-mono text-xs overflow-x-auto">
          <div className="text-sm font-bold text-[#ffc833] uppercase mb-1 flex items-center justify-between">
            <span>5-Tier Computing &amp; Machine Learning Taxonomy</span>
            <Badge claim="VALIDATED" size="sm">Strict Truth Gate</Badge>
          </div>
          <p className="text-[11px] text-[#94a3b8] font-sans mb-4">
            We explicitly partition mathematical signal processing from machine learning models. Firmware on the sensor node executes deterministic DSP; machine learning inference executes strictly on the Edge Gateway CPU.
          </p>

          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-[#283144] text-[10px] text-[#64748b] uppercase">
                <th className="pb-2">Taxonomy Tier</th>
                <th className="pb-2">Algorithm / Model</th>
                <th className="pb-2">Execution Location</th>
                <th className="pb-2">Input Signals</th>
                <th className="pb-2">Evidentiary Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1d2332] text-[11px]">
              <tr className="hover:bg-[#181d28]">
                <td className="py-2.5 font-bold text-[#10b981]">A. Signal Processing</td>
                <td className="py-2.5 text-[#f1f5f9]">CMSIS-DSP Real FFT (256-pt, 7.81 Hz bins)</td>
                <td className="py-2.5 text-[#38bdf8]">Sensor Node (nRF52840 MCU)</td>
                <td className="py-2.5 text-[#94a3b8]">2 kHz decimated I2S audio</td>
                <td className="py-2.5"><Badge claim="VALIDATED" size="sm" /></td>
              </tr>
              <tr className="hover:bg-[#181d28]">
                <td className="py-2.5 font-bold text-[#10b981]">B. Deterministic Rules</td>
                <td className="py-2.5 text-[#f1f5f9]">CUSUM Drift Filter &amp; 8-State Diagnostic Engine</td>
                <td className="py-2.5 text-[#38bdf8]">Gateway (RPi 3B+ CPU)</td>
                <td className="py-2.5 text-[#94a3b8]">Core Temp, Acoustic Bins, CO2, Mass</td>
                <td className="py-2.5"><Badge claim="VALIDATED" size="sm" /></td>
              </tr>
              <tr className="hover:bg-[#181d28]">
                <td className="py-2.5 font-bold text-[#38bdf8]">C. Edge Machine Learning</td>
                <td className="py-2.5 text-[#f1f5f9]">Random Forest Hive State Classifier (1.2 ms)</td>
                <td className="py-2.5 text-[#38bdf8]">Gateway (RPi 3B+ CPU)</td>
                <td className="py-2.5 text-[#94a3b8]">14-feature multi-modal vector</td>
                <td className="py-2.5"><Badge claim="DEMONSTRATED" size="sm" /></td>
              </tr>
              <tr className="hover:bg-[#181d28]">
                <td className="py-2.5 font-bold text-[#fbbf24]">D. Fog / Central ML</td>
                <td className="py-2.5 text-[#f1f5f9]">Multi-Hive Spatial Normalization &amp; Trend Engine</td>
                <td className="py-2.5 text-[#38bdf8]">Gateway / Local Server</td>
                <td className="py-2.5 text-[#94a3b8]">Fleet SQLite WAL records</td>
                <td className="py-2.5"><Badge claim="DEMONSTRATED" size="sm" /></td>
              </tr>
              <tr className="hover:bg-[#181d28]">
                <td className="py-2.5 font-bold text-[#a78bfa]">E. Proposed Deep Learning</td>
                <td className="py-2.5 text-[#f1f5f9]">BeevilFusionNetEdge (Multi-Modal Transformer)</td>
                <td className="py-2.5 text-[#64748b]">Structural Proof-of-Concept</td>
                <td className="py-2.5 text-[#94a3b8]">Spectrograms + Respiration</td>
                <td className="py-2.5"><Badge claim="PROPOSED" size="sm" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 8 Diagnostic States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs mb-12">
          {DIAGNOSTIC_STATES.map((st) => (
            <div
              key={st.id}
              className={`p-4 rounded-sm bg-[#11141d] border border-[#283144] flex flex-col justify-between hover:border-[#3d4964] transition-colors`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-[#1d2332] mb-2">
                  <span className={`font-bold ${st.color}`}>{st.level}</span>
                  <span className="text-[#64748b]">{st.id}</span>
                </div>

                <div className="text-xs font-bold text-[#f1f5f9] mb-2">{st.name}</div>

                <div className="space-y-1 mb-3 text-[11px] text-[#94a3b8]">
                  {st.sensors.map((sens, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[#64748b]">•</span>
                      <span>{sens}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#1d2332] text-[10px] text-[#64748b] font-sans leading-tight">
                <strong className="text-[#94a3b8] font-mono">Action:</strong> {st.action}
              </div>
            </div>
          ))}
        </div>

        {/* Canonical Figure 0.8 Display */}
        <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-lg">
          <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#f1f5f9] uppercase">
              Canonical Figure 0.8: Edge AI &amp; Machine Learning Architecture
            </span>
            <span className="text-[#94a3b8] text-[10px]">TinyML Compression + CUSUM Filter</span>
          </div>
          <div className="p-4 sm:p-6 bg-[#ffffff] flex items-center justify-center">
            <img
              src="/figures/canonical/08_ai_ml.svg"
              alt="Canonical Edge AI and Machine Learning Architecture: TinyML Acoustic Compression and CUSUM Anomaly Filter"
              className="w-full h-auto max-h-[360px] object-contain"
            />
          </div>
          <div className="px-4 py-2 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex items-center justify-between">
            <span>Inference execution time: 1.2 ms on Raspberry Pi 3B+ CPU (zero external GPU required)</span>
            <Badge claim="VALIDATED" size="sm">Pipeline Verified</Badge>
          </div>
        </div>

      </div>
    </section>
  );
}
