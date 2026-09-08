import React from "react";

import { Badge } from "@/components/ui/Badge";

export function MultiPhysicsSimulationSection() {
  const ANSYS_SIMULATIONS = [
    {
      simNumber: "Sim 1",
      domain: "RF Hive Penetration",
      module: "ANSYS HFSS",
      metric: "S11 Return Loss: -28.65 dB",
      target: "Return Loss < -15 dB @ 865 MHz",
      result: "PASSED (1.85 dBi gain through comb)",
      image: "/images/evidence/Sim_1_RF_Hive_Penetration_S11_Plot.png",
      desc: "Electromagnetic resonance verification through timber walls and dielectric wax honeycombs.",
    },
    {
      simNumber: "Sim 2",
      domain: "Gateway Thermal CFD",
      module: "ANSYS Icepak",
      metric: "Junction Temp: 58.4°C",
      target: "BCM2837 < 85.0°C @ 45°C ambient",
      result: "PASSED (26.6°C thermal safety margin)",
      image: "/images/evidence/Sim_2_Gateway_Thermal_CFD_Map.png",
      desc: "Convective heat dissipation inside IP67 sealed mast enclosure under full 4-core CPU load.",
    },
    {
      simNumber: "Sim 3",
      domain: "Drop Shock Deceleration",
      module: "ANSYS Mechanical",
      metric: "Von Mises: 18.4 MPa",
      target: "Stress < 65.0 MPa yield (48.5g pulse)",
      result: "PASSED (Factor of Safety: 3.53x)",
      image: "/images/evidence/Sim_3_Drop_Shock_Von_Mises_Stress.png",
      desc: "2.0-meter drop shock simulation onto rocky ground modeling field handling impacts.",
    },
    {
      simNumber: "Sim 6",
      domain: "In-Hive Aerodynamics",
      module: "ANSYS Fluent",
      metric: "Flow Velocity: 0.52 m/s",
      target: "CO2 Purge Rate > 95%",
      result: "PASSED (98.4% metabolic CO2 flush)",
      image: "/images/evidence/Sim_6_In_Hive_Aerodynamics_Velocity_Streamlines.png",
      desc: "Convective airflow streamlines through inter-frame bee space during active fanning.",
    },
  ];

  return (
    <section id="simulation" className="py-16 md:py-24 border-b border-[#283144] bg-[#0c0e14] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              09 — Finite Element &amp; CFD Validation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              ANSYS Multi-Physics Simulation Suite (11 Modules)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="SIMULATED">ANSYS Workbench Validated</Badge>
          </div>
        </div>

        {/* 4 Real Simulation Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {ANSYS_SIMULATIONS.map((sim) => (
            <div
              key={sim.simNumber}
              className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden flex flex-col justify-between shadow-md"
            >
              <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#ffc833]">{sim.simNumber}:</span>
                  <span className="text-[#f1f5f9] font-semibold">{sim.domain}</span>
                </div>
                <Badge claim="SIMULATED" size="sm">{sim.module}</Badge>
              </div>

              {/* Simulation Output Image */}
              <div className="p-3 bg-[#090b10] flex items-center justify-center border-b border-[#1d2332]">
                <img
                  src={sim.image}
                  alt={`${sim.domain} (${sim.module})`}
                  className="w-full h-48 sm:h-56 object-contain"
                />
              </div>

              <div className="p-4 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">{sim.target}</span>
                  <span className="text-[#10b981] font-bold">{sim.metric}</span>
                </div>
                <div className="text-[11px] text-[#64748b] font-sans leading-relaxed">
                  {sim.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Canonical Figure 11 Display */}
        <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-lg">
          <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#f1f5f9] uppercase">
              Canonical Figure 11: Multi-Physics Simulation Suite (11 FEA/CFD Domains)
            </span>
            <span className="text-[#94a3b8] text-[10px]">HFSS + Icepak + Mechanical + Fluent</span>
          </div>
          <div className="p-4 sm:p-6 bg-[#ffffff] flex items-center justify-center">
            <img
              src="/figures/canonical/11_ansys_simulation.svg"
              alt="Canonical Multi-Physics Simulation Suite: 11 FEA/CFD/Electromagnetic Domains Validated in ANSYS Workbench"
              className="w-full h-auto max-h-[380px] object-contain"
            />
          </div>
          <div className="px-4 py-2 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex items-center justify-between">
            <span>Rigorous pre-manufacturing verification prevents catastrophic thermal or structural field failures</span>
            <Badge claim="VALIDATED" size="sm">Academic License</Badge>
          </div>
        </div>

      </div>
    </section>
  );
}
