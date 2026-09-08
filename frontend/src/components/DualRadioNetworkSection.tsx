import React from "react";
import { Radio, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function DualRadioNetworkSection() {
  return (
    <section id="radio" className="py-16 md:py-24 border-b border-[#283144] bg-[#090b10] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              08 — Wireless Link: Multi-Node Star Backhaul &amp; Local BLE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Multi-Node LoRa Star Backhaul &amp; Local BLE Topology
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="CALCULATED">Link Budget Calibrated</Badge>
          </div>
        </div>

        {/* Technical Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Radio 1: 2.4 GHz Direct BLE Link */}
          <div className="lg:col-span-6 p-5 rounded-sm bg-[#11141d] border border-[#283144] font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#283144]">
              <div className="flex items-center gap-2 text-[#38bdf8] font-bold text-sm">
                <Wifi className="w-4 h-4" />
                <span>Local Link: 2.4 GHz BLE Field Technician Link</span>
              </div>
              <Badge claim="DEMONSTRATED" size="sm">Point-to-Point</Badge>
            </div>

            <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
              Visiting beekeepers and field technicians connect directly to the node over Bluetooth Low Energy 5.0. This enables instant glove-friendly brood inspection and hardware parameter configuration within 15 meters, with zero reliance on cellular networks and zero interruption of the primary LoRa telemetry backhaul.
            </p>

            <div className="space-y-1.5 p-3 bg-[#090b10] border border-[#1d2332] rounded text-[11px] text-[#f1f5f9]">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Frequency Band:</span>
                <span className="font-bold">2.402 – 2.480 GHz (40 Channels)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Intra-Yard Range:</span>
                <span className="font-bold text-[#10b981]">15 to 30 Meters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">TX Power:</span>
                <span className="font-bold">0 dBm (Ultra-Low Energy)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Role:</span>
                <span className="font-bold text-[#38bdf8]">Cluster Formation &amp; Local Alerting</span>
              </div>
            </div>
          </div>

          {/* Radio 2: Sub-GHz LoRa Star Backhaul */}
          <div className="lg:col-span-6 p-5 rounded-sm bg-[#11141d] border border-[#283144] font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#283144]">
              <div className="flex items-center gap-2 text-[#f59e0b] font-bold text-sm">
                <Radio className="w-4 h-4" />
                <span>Tier 2B: Sub-GHz LoRa Star Backhaul</span>
              </div>
              <Badge claim="CALCULATED" size="sm">Long-Range</Badge>
            </div>

            <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
              For uplink to the centralized mast-mounted edge gateway, nodes utilize Semtech SX1262 LoRa chirp spread spectrum. Operating in the IN865 band (865.0625 MHz), LoRa provides robust foliage penetration across dense pine canopies and undulating agricultural terrain.
            </p>

            <div className="space-y-1.5 p-3 bg-[#090b10] border border-[#1d2332] rounded text-[11px] text-[#f1f5f9]">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Modulation &amp; Band:</span>
                <span className="font-bold">LoRa IN865 (865.0625 MHz)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Parameters:</span>
                <span className="font-bold text-[#10b981]">SF7, BW 125 kHz, CR 4/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Transmit Power:</span>
                <span className="font-bold">+14 dBm (25 mW)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Packet Airtime:</span>
                <span className="font-bold text-[#f59e0b]">18.2 ms (33-byte frame)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Link Budget Metrics Table */}
        <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] font-mono text-xs mb-12">
          <div className="text-sm font-bold text-[#f1f5f9] uppercase mb-1 flex items-center justify-between">
            <span>Calibrated RF Link Budget &amp; Channel Capacity</span>
            <Badge claim="CALCULATED" size="sm">MATLAB FSPL Model</Badge>
          </div>
          <p className="text-[11px] text-[#94a3b8] font-sans mb-4">
            Link margin calculations incorporate ITU-R P.833-9 foliage attenuation (0.18 dB/m) and hive pine comb dielectric loss (8.72 dB).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded bg-[#090b10] border border-[#1d2332]">
              <div className="text-[10px] text-[#64748b] uppercase">Line-of-Sight (LOS) Range</div>
              <div className="text-xl font-bold text-[#10b981] font-tabular mt-1">4.2 km</div>
              <div className="text-[10px] text-[#94a3b8] mt-1">+26.16 dB Net Margin</div>
            </div>

            <div className="p-4 rounded bg-[#090b10] border border-[#1d2332]">
              <div className="text-[10px] text-[#64748b] uppercase">Dense Pine Canopy Range</div>
              <div className="text-xl font-bold text-[#38bdf8] font-tabular mt-1">1.5 km</div>
              <div className="text-[10px] text-[#94a3b8] mt-1">+8.30 dB Net Margin</div>
            </div>

            <div className="p-4 rounded bg-[#090b10] border border-[#1d2332]">
              <div className="text-[10px] text-[#64748b] uppercase">100-Hive Channel Load</div>
              <div className="text-xl font-bold text-[#f59e0b] font-tabular mt-1">0.061%</div>
              <div className="text-[10px] text-[#94a3b8] mt-1">Cap: 1.0% ETSI Duty Cycle</div>
            </div>
          </div>
        </div>

        {/* Canonical Figure 0.6 and Figure 0.9 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-md">
            <div className="px-4 py-2 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#f1f5f9] uppercase">Canonical Fig 0.6: Dual-Radio Hybrid Architecture</span>
              <span className="text-[#94a3b8] text-[10px]">BLE Mesh + LoRa</span>
            </div>
            <div className="p-4 bg-[#ffffff] flex items-center justify-center">
              <img
                src="/figures/canonical/06_lora_communication.svg"
                alt="Canonical Dual-Radio Architecture: 2.4 GHz BLE Mesh Clustering and Semtech SX1262 LoRa Star Backhaul"
                className="w-full h-auto max-h-[300px] object-contain"
              />
            </div>
            <div className="p-2.5 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b]">
              Seamless coexistence: BLE Mesh intra-yard + Sub-GHz LoRa star backhaul
            </div>
          </div>

          <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-md">
            <div className="px-4 py-2 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#f1f5f9] uppercase">Canonical Fig 0.9: Multi-Hive Scalable Topology</span>
              <span className="text-[#94a3b8] text-[10px]">100 Hives</span>
            </div>
            <div className="p-4 bg-[#ffffff] flex items-center justify-center">
              <img
                src="/figures/canonical/09_multi_hive_network.svg"
                alt="Canonical Multi-Hive Network Topology: 100 Hives, Star Backhaul, Gateway Concentrator Mast"
                className="w-full h-auto max-h-[300px] object-contain"
              />
            </div>
            <div className="p-2.5 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b]">
              Tested up to 100 concurrent nodes in software load simulation (tests/test_full_gateway_pipeline.py)
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
