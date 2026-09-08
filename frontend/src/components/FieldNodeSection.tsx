import React from "react";
import { Cpu } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function FieldNodeSection() {
  const ENERGY_BUDGET = [
    { state: "Deep Sleep Rest", duration: "289.45 s", current: "2.0 μA", energy: "1.91 mJ", pct: "1.2%" },
    { state: "Sensor I2C Sample", duration: "0.15 s", current: "2.5 mA", energy: "1.24 mJ", pct: "0.8%" },
    { state: "Acoustic I2S Capture", duration: "10.00 s", current: "3.2 mA", energy: "105.60 mJ", pct: "68.6%" },
    { state: "CMSIS-DSP FFT", duration: "0.05 s", current: "8.5 mA", energy: "1.40 mJ", pct: "0.9%" },
    { state: "SX1262 LoRa TX", duration: "0.35 s", current: "38.0 mA", energy: "43.89 mJ", pct: "28.5%" },
  ];

  return (
    <section id="hardware-node" className="py-16 md:py-24 border-b border-[#283144] bg-[#0c0e14] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              06 — Sensor Node Hardware &amp; Energy Budget
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Field Telemetry Node &amp; Energy Budget
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">RAK4631 nRF52840 + SX1262</Badge>
          </div>
        </div>

        {/* Narrative & Hardware Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: Hardware Subsystem Specifications */}
          <div className="lg:col-span-6 space-y-4 font-mono text-xs">
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4">
              <div className="text-sm font-bold text-[#f59e0b] uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Field Node Subsystem Architecture</span>
              </div>
              
              <div className="space-y-2 text-[#94a3b8]">
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Microcontroller:</span>
                  <span className="text-[#f1f5f9] font-bold">Nordic nRF52840 (ARM Cortex-M4F @ 64 MHz, FPU)</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Transceiver:</span>
                  <span className="text-[#f1f5f9] font-bold">Semtech SX1262 Sub-GHz (+14 dBm, -137 dBm sens)</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Baseboard Carrier:</span>
                  <span className="text-[#f1f5f9] font-bold">RAKwireless WisBlock RAK5005-O (TP4054 CC/CV)</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Battery Cell:</span>
                  <span className="text-[#10b981] font-bold">1S 3.7V 3000mAh Li-ion NMC 18650 (3.27V to 4.20V)</span>
                </div>
                <div className="flex justify-between border-b border-[#1d2332] pb-1.5">
                  <span className="text-[#64748b]">Solar Harvester:</span>
                  <span className="text-[#fbbf24] font-bold">0.5W / 6V 100mA Monocrystalline Panel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Outdoor Enclosure:</span>
                  <span className="text-[#f1f5f9] font-bold">IP65 Polycarbonate + 4x PG-7 Hermetic Glands</span>
                </div>
              </div>
            </div>

            {/* Battery Autonomy Reality Card */}
            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144] flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#64748b] uppercase">Calculated Battery Autonomy</div>
                <div className="text-xl font-bold text-[#10b981] mt-0.5">10.4 Months</div>
                <div className="text-[10px] text-[#94a3b8]">Pure Battery (Zero Solar Depletion)</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#64748b] uppercase">With 0.5W Solar Panel</div>
                <div className="text-xl font-bold text-[#f59e0b] mt-0.5">Perpetual</div>
                <div className="text-[10px] text-[#94a3b8]">Harvesting &gt; 80 mA avg irradiance</div>
              </div>
            </div>
          </div>

          {/* Right: 300-Second Duty Cycle Energy Table */}
          <div className="lg:col-span-6 p-5 rounded-sm bg-[#11141d] border border-[#283144] font-mono text-xs">
            <div className="text-sm font-bold text-[#f1f5f9] uppercase mb-1 flex items-center justify-between">
              <span>300-Second (5-Min) Duty Cycle Energy Audit</span>
              <Badge claim="CALCULATED" size="sm">154.04 mJ / cycle</Badge>
            </div>
            <p className="text-[11px] text-[#94a3b8] font-sans mb-4">
              The node spends 96.5% of its operating lifetime in ultra-low-power deep sleep (2.0 μA), waking periodically to sample transducers, run CMSIS-DSP, and transmit a 33-byte LoRa frame.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#283144] text-[10px] text-[#64748b] uppercase">
                    <th className="pb-2">State</th>
                    <th className="pb-2">Duration</th>
                    <th className="pb-2">Current</th>
                    <th className="pb-2">Energy</th>
                    <th className="pb-2 text-right">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1d2332] text-[11px]">
                  {ENERGY_BUDGET.map((b) => (
                    <tr key={b.state} className="hover:bg-[#181d28]">
                      <td className="py-2 text-[#f1f5f9] font-medium">{b.state}</td>
                      <td className="py-2 text-[#94a3b8] font-tabular">{b.duration}</td>
                      <td className="py-2 text-[#94a3b8] font-tabular">{b.current}</td>
                      <td className="py-2 text-[#38bdf8] font-tabular font-bold">{b.energy}</td>
                      <td className="py-2 text-right text-[#64748b] font-tabular">{b.pct}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#283144] text-[#f1f5f9] font-bold">
                    <td className="pt-2.5">Total / Cycle</td>
                    <td className="pt-2.5">300.00 s</td>
                    <td className="pt-2.5">—</td>
                    <td className="pt-2.5 text-[#10b981]">154.04 mJ</td>
                    <td className="pt-2.5 text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1d2332] text-[10px] text-[#64748b] flex justify-between">
              <span>Daily Energy Consumption: 12.32 mWh/day</span>
              <span>18650 Reservoir: 11,100 mWh</span>
            </div>
          </div>
        </div>

        {/* Canonical Architecture Schematics: Figure 0.3 and Figure 0.4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-md">
            <div className="px-4 py-2 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#f1f5f9] uppercase">Canonical Fig 0.3: Field Node Architecture</span>
              <span className="text-[#94a3b8] text-[10px]">RAK4631 + Power Gating</span>
            </div>
            <div className="p-4 bg-[#ffffff] flex items-center justify-center">
              <img
                src="/figures/canonical/03_sensor_node.svg"
                alt="Canonical Field Node Architecture: Nordic nRF52840, SX1262 LoRa, and Power Gating"
                className="w-full h-auto max-h-[300px] object-contain"
              />
            </div>
            <div className="p-2.5 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b]">
              Ultra-low Iq step-down regulator (TPS62840) cuts idle current to 2.0 μA
            </div>
          </div>

          <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-md">
            <div className="px-4 py-2 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#f1f5f9] uppercase">Canonical Fig 0.4: Embedded State Machine</span>
              <span className="text-[#94a3b8] text-[10px]">300s Duty Cycle</span>
            </div>
            <div className="p-4 bg-[#ffffff] flex items-center justify-center">
              <img
                src="/figures/canonical/04_embedded_processing.svg"
                alt="Canonical Embedded Processing State Machine: 300s Duty Cycle, CMSIS-DSP, Power Gating"
                className="w-full h-auto max-h-[300px] object-contain"
              />
            </div>
            <div className="p-2.5 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b]">
              Strict FreeRTOS deterministic task sequence ensures zero race conditions
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
