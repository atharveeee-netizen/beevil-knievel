"use client";

import React, { useState } from "react";
import { Thermometer, Volume2, Flame, Zap, Compass, Activity, CheckCircle2 } from "lucide-react";

const SENSING_CHANNELS = [
  {
    name: "Brood Core Temperature",
    silicon: "TI TMP117",
    specs: "±0.05°C accuracy (NIST-traceable)",
    metric: "34.82°C",
    tolerance: "34.5°C - 35.5°C nominal",
    meaning: "Maintains optimal larval incubation. Drift indicates queenlessness or pre-swarm heating.",
    icon: Thermometer,
    accent: "#f0b840",
  },
  {
    name: "Bio-Acoustic Spectrum",
    silicon: "TDK INMP441",
    specs: "24-bit I2S MEMS (61 dBA SNR)",
    metric: "220 Hz",
    tolerance: "200 Hz - 550 Hz frequency band",
    meaning: "128-pt FFT identifies worker hum, 250 Hz virgin queen piping, and 485 Hz swarm roars.",
    icon: Volume2,
    accent: "#f0b840",
  },
  {
    name: "Respiration CO2",
    silicon: "Sensirion SCD41",
    specs: "Photoacoustic NDIR (±40 ppm)",
    metric: "1,140 ppm",
    tolerance: "800 ppm - 2,500 ppm range",
    meaning: "Direct measurement of cluster metabolic rate and active comb fanning ventilation.",
    icon: Flame,
    accent: "#2ea043",
  },
  {
    name: "Nectar Flow Scale",
    silicon: "Avia HX711",
    specs: "24-bit Differential ADC + 200kg Load Cell",
    metric: "+1.84 kg/day",
    tolerance: "±20g net daily resolution",
    meaning: "Tracks true daily nectar inflow and immediate weight drop from swarm departures.",
    icon: Zap,
    accent: "#f0b840",
  },
  {
    name: "Stand Tilt & Tamper",
    silicon: "ST LIS3DH",
    specs: "3-axis ultra-low-power accelerometer",
    metric: "0.2° pitch",
    tolerance: "Threshold: > 5.0° displacement",
    meaning: "Detects wind toppling, animal attacks, stand subsidence, and unauthorized physical tamper.",
    icon: Compass,
    accent: "#8a90a0",
  },
  {
    name: "Colony Volatiles (VOC)",
    silicon: "Bosch BME688",
    specs: "8-channel MOX gas sensor array",
    metric: "82 kΩ",
    tolerance: "Sub-PPM gas sensitivity",
    meaning: "Identifies volatile pheromone spikes (isopentyl acetate) and brood disease markers.",
    icon: Activity,
    accent: "#8a90a0",
  },
];

export function Section02TheSignal() {
  return (
    <section id="the-signal" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222632]">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            02 - THE SIGNAL
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            Scientific observation of the brood nest.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            Every sensing channel uses industry-grade digital silicon selected for long-term stability inside the humid, propolis-rich hive environment.
          </p>
        </div>

        {/* 6 Clean Scientific Sensor Modality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SENSING_CHANNELS.map((ch) => {
            const IconComponent = ch.icon;
            return (
              <div
                key={ch.name}
                className="bg-[#12151e] border border-[#222632] p-6 rounded-sm space-y-4 flex flex-col justify-between hover:border-[#3a4154] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#8a90a0] uppercase font-bold">
                      {ch.silicon}
                    </span>
                    <div
                      className="p-1.5 rounded-sm border border-[#2e3444]"
                      style={{ color: ch.accent }}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#f4f4f6] font-sans">
                    {ch.name}
                  </h3>

                  <div className="py-2 border-y border-[#222632] flex items-baseline justify-between">
                    <span className="text-2xl font-mono font-bold text-[#f4f4f6] tracking-tight">
                      {ch.metric}
                    </span>
                    <span className="text-[10px] font-mono text-[#8a90a0]">
                      {ch.tolerance}
                    </span>
                  </div>

                  <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">
                    {ch.meaning}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-[#8a90a0] pt-2 border-t border-[#1e2330]">
                  SPEC: <span className="text-[#f4f4f6]">{ch.specs}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
