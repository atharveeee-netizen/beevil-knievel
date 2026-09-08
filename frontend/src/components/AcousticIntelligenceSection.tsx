"use client";

import React, { useState } from "react";
import { Mic } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SpectralBandChart, SpectralBand } from "@/components/ui/SpectralBandChart";

export function AcousticIntelligenceSection() {
  const [selectedScenario, setSelectedScenario] = useState<"HEALTHY" | "SWARM" | "QUEENLESS">("HEALTHY");

  const ACOUSTIC_SCENARIOS: Record<string, { bands: SpectralBand[]; peakHz: number; stateTitle: string; stateDesc: string }> = {
    HEALTHY: {
      peakHz: 224.5,
      stateTitle: "Nominal Colony Flight & Brood Care",
      stateDesc: "Colony is queenright with steady worker flight vibration centered around 200–280 Hz and moderate ventilation fanning at 135 Hz.",
      bands: [
        {
          id: "b1",
          name: "Band 1: Fanning / Ventilation",
          freqRange: "100–180 Hz",
          biologicalPhenomenon: "Thermoregulatory wing fanning across brood frames (Ferrari et al., 2008)",
          energyNormalized: 0.38,
          powerDb: -22.4,
          status: "BASELINE",
        },
        {
          id: "b2",
          name: "Band 2: Worker Baseline & Waggle",
          freqRange: "200–400 Hz",
          biologicalPhenomenon: "Normal worker thoracic flight muscle vibration & queenright hum",
          energyNormalized: 0.85,
          powerDb: -14.2,
          status: "ACTIVE",
        },
        {
          id: "b3",
          name: "Band 3: Swarm Surge / Distress",
          freqRange: "450–750 Hz",
          biologicalPhenomenon: "Pre-swarm preparation and queenless agitation roar",
          energyNormalized: 0.12,
          powerDb: -38.5,
          status: "BASELINE",
        },
        {
          id: "b4",
          name: "Band 4: Environmental Noise",
          freqRange: "800–1200 Hz",
          biologicalPhenomenon: "External foliage wind shear, rain impact, and vehicle traffic",
          energyNormalized: 0.08,
          powerDb: -44.1,
          status: "BASELINE",
        },
      ],
    },
    SWARM: {
      peakHz: 452.0,
      stateTitle: "Pre-Swarm Harmonic Escalation (24h Window)",
      stateDesc: "Colony is preparing for reproductive departure. Energy shifts dramatically into Band 3 (450–750 Hz), providing an early warning 24 to 48 hours before swarm liftoff.",
      bands: [
        {
          id: "b1",
          name: "Band 1: Fanning / Ventilation",
          freqRange: "100–180 Hz",
          biologicalPhenomenon: "Suppressed brood fanning as workers engorge on honey",
          energyNormalized: 0.22,
          powerDb: -28.0,
          status: "BASELINE",
        },
        {
          id: "b2",
          name: "Band 2: Worker Baseline & Waggle",
          freqRange: "200–400 Hz",
          biologicalPhenomenon: "Disrupted forager dances; focus shifts to scout bees",
          energyNormalized: 0.45,
          powerDb: -21.0,
          status: "ACTIVE",
        },
        {
          id: "b3",
          name: "Band 3: Swarm Surge / Distress",
          freqRange: "450–750 Hz",
          biologicalPhenomenon: "Critical acoustic surge: piping harmonics and high-energy wing buzz",
          energyNormalized: 0.94,
          powerDb: -9.8,
          status: "SURGE",
        },
        {
          id: "b4",
          name: "Band 4: Environmental Noise",
          freqRange: "800–1200 Hz",
          biologicalPhenomenon: "Residual ambient noise floor",
          energyNormalized: 0.11,
          powerDb: -41.2,
          status: "BASELINE",
        },
      ],
    },
    QUEENLESS: {
      peakHz: 512.0,
      stateTitle: "Queenless Colony Distress Roar",
      stateDesc: "Colony has lost the mated queen. Workers exhibit disorganized high-frequency acoustic agitation peaking between 480 Hz and 600 Hz within 4 hours of queen removal.",
      bands: [
        {
          id: "b1",
          name: "Band 1: Fanning / Ventilation",
          freqRange: "100–180 Hz",
          biologicalPhenomenon: "Disorganized intermittent ventilation",
          energyNormalized: 0.29,
          powerDb: -25.5,
          status: "BASELINE",
        },
        {
          id: "b2",
          name: "Band 2: Worker Baseline & Waggle",
          freqRange: "200–400 Hz",
          biologicalPhenomenon: "Severe reduction in organized foraging dances",
          energyNormalized: 0.32,
          powerDb: -24.8,
          status: "BASELINE",
        },
        {
          id: "b3",
          name: "Band 3: Swarm Surge / Distress",
          freqRange: "450–750 Hz",
          biologicalPhenomenon: "Queenless distress roar: prolonged disorganized colony agitation",
          energyNormalized: 0.78,
          powerDb: -16.4,
          status: "ELEVATED",
        },
        {
          id: "b4",
          name: "Band 4: Environmental Noise",
          freqRange: "800–1200 Hz",
          biologicalPhenomenon: "Residual ambient noise floor",
          energyNormalized: 0.10,
          powerDb: -42.0,
          status: "BASELINE",
        },
      ],
    },
  };

  const activeData = ACOUSTIC_SCENARIOS[selectedScenario];

  return (
    <section id="acoustics" className="py-16 md:py-24 border-b border-[#283144] bg-[#0c0e14] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              05 — Acoustic Signal &amp; Edge DSP
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Bio-Acoustic Spectral Intelligence
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">CMSIS-DSP 256-pt FFT</Badge>
          </div>
        </div>

        {/* Technical Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Mathematical Resolution Proof */}
          <div className="lg:col-span-6 space-y-6 font-mono text-xs">
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4">
              <div className="text-sm font-bold text-[#f59e0b] uppercase flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>FFT Parameter Selection &amp; Mathematical Proof</span>
              </div>
              
              <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
                Rather than waste RF airtime transmitting raw acoustic PCM streams, all spectral transformations are executed directly on the Nordic nRF52840 Cortex-M4F microcontroller via hardware FPU and ARM CMSIS-DSP.
              </p>

              <div className="p-3 bg-[#090b10] border border-[#283144] rounded text-[11px] space-y-1.5 text-[#f1f5f9]">
                <div>Sampling Frequency (fs): <strong className="text-[#38bdf8]">2,000 Hz</strong> (decimated from 16 kHz DMA)</div>
                <div>FFT Size (N): <strong className="text-[#38bdf8]">256 points</strong> (Real FFT)</div>
                <div>Frequency Resolution (Δf): <strong className="text-[#10b981]">7.8125 Hz per bin</strong> (fs / N)</div>
                <div>Frame Duration (Tframe): <strong className="text-[#10b981]">128.0 ms</strong> (N / fs)</div>
                <div>Windowing Function: <strong className="text-[#fbbf24]">Hanning Window (-32 dB sidelobe isolation)</strong></div>
              </div>

              <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
                The Hanning window cleanly isolates adjacent acoustic phenomena—preventing 135 Hz brood ventilation energy from leaking into the critical 200–280 Hz worker communication bins.
              </p>
            </div>

            {/* Interactive Scenario Switcher */}
            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] space-y-3">
              <div className="text-xs font-bold text-[#f1f5f9] uppercase flex items-center justify-between">
                <span>Biological Acoustic State Benchmarks:</span>
                <span className="text-[#64748b] text-[10px]">Select Condition</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["HEALTHY", "SWARM", "QUEENLESS"] as const).map((scen) => (
                  <button
                    key={scen}
                    onClick={() => setSelectedScenario(scen)}
                    className={`py-2 px-3 rounded-xs text-xs font-mono font-bold uppercase transition-all border ${
                      selectedScenario === scen
                        ? "bg-[#f59e0b] text-[#090b10] border-[#f59e0b] shadow-sm"
                        : "bg-[#181d28] text-[#94a3b8] border-[#283144] hover:text-[#f1f5f9] hover:border-[#3d4964]"
                    }`}
                  >
                    {scen}
                  </button>
                ))}
              </div>
              <div className="pt-2 border-t border-[#1d2332]">
                <div className="text-xs font-bold text-[#ffc833]">{activeData.stateTitle}</div>
                <div className="text-[11px] text-[#94a3b8] font-sans mt-0.5">{activeData.stateDesc}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Spectral Band Chart */}
          <div className="lg:col-span-6 p-5 rounded-sm bg-[#11141d] border border-[#283144] flex flex-col justify-between">
            <SpectralBandChart
              bands={activeData.bands}
              dominantFrequencyHz={activeData.peakHz}
            />

            <div className="mt-6 pt-4 border-t border-[#283144] text-[11px] font-mono text-[#64748b] flex items-center justify-between">
              <span>Execution Latency: 1.12 ms on ARM Cortex-M4F @ 64 MHz</span>
              <Badge claim="VALIDATED" size="sm">TinyML Benchmark</Badge>
            </div>
          </div>
        </div>

        {/* Canonical Figure 0.5 Display */}
        <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-lg">
          <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f1f5f9]">
              Canonical Figure 0.5: Acoustic DSP Pipeline &amp; ARM CMSIS-DSP Integration
            </span>
            <span className="text-[11px] font-mono text-[#94a3b8]">Vector SVG Pipeline</span>
          </div>
          <div className="p-4 sm:p-6 bg-[#ffffff] flex items-center justify-center">
            <img
              src="/figures/canonical/05_acoustic_dsp.svg"
              alt="Canonical Acoustic DSP Pipeline: 16 kHz I2S Sampling, 256-pt CMSIS-DSP Real FFT, Sub-Band Integration"
              className="w-full h-auto max-h-[360px] object-contain"
            />
          </div>
          <div className="px-4 py-2 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex items-center justify-between">
            <span>Reduces 10-second raw audio (320 KB) down to a compact 8-byte spectral vector (99.997% payload compression)</span>
            <Badge claim="VALIDATED" size="sm">Energy KPI Standard</Badge>
          </div>
        </div>

      </div>
    </section>
  );
}
