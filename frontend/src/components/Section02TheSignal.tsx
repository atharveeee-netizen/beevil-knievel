"use client";

import React from "react";
import { Thermometer, Volume2, Flame, Zap, Compass, Activity } from "lucide-react";

const SENSING_CHANNELS = [
  {
    name: "Brood Core Temperature",
    silicon: "TI TMP117",
    specs: "±0.05°C factory NIST-traceable",
    metric: "34.82°C",
    tolerance: "34.5°C - 35.5°C nominal",
    meaning: "Drift below 34.5°C indicates queen loss. Heating above 36.5°C indicates swarm preparation.",
    icon: Thermometer,
    accent: "#f0b840",
  },
  {
    name: "Acoustic Frequency Spectrum",
    silicon: "TDK INMP441",
    specs: "24-bit I2S MEMS (61 dBA SNR)",
    metric: "220 Hz",
    tolerance: "200 Hz - 550 Hz band",
    meaning: "128-point FFT isolates 225 Hz colony hum, 285 Hz queenless roar, and 485 Hz swarm piping.",
    icon: Volume2,
    accent: "#06b6d4",
  },
  {
    name: "Carbon Dioxide (CO2)",
    silicon: "Sensirion SCD41",
    specs: "Photoacoustic NDIR (±40 ppm)",
    metric: "1,140 ppm",
    tolerance: "800 - 2,500 ppm range",
    meaning: "Measures worker bee respiration and active comb fanning ventilation.",
    icon: Flame,
    accent: "#2ea043",
  },
  {
    name: "Hive Scale",
    silicon: "Avia HX711",
    specs: "24-bit Differential ADC + 200kg Cell",
    metric: "+1.84 kg/day",
    tolerance: "±20g net daily resolution",
    meaning: "Measures daily nectar intake and 2-3 kg weight drops from departing swarms.",
    icon: Zap,
    accent: "#a855f7",
  },
  {
    name: "Stand Tilt & Shock",
    silicon: "ST LIS3DH",
    specs: "3-axis ultra-low-power accelerometer",
    metric: "0.2° pitch",
    tolerance: "Threshold: > 5.0° displacement",
    meaning: "Detects wind toppling, animal disturbance, and ground subsidence.",
    icon: Compass,
    accent: "#f43f5e",
  },
  {
    name: "Gas & Pheromone Index",
    silicon: "Bosch BME688",
    specs: "8-channel MOX gas sensor array",
    metric: "82 kΩ",
    tolerance: "Sub-PPM gas sensitivity",
    meaning: "Measures isopentyl acetate alarm pheromones and brood breakdown gases.",
    icon: Activity,
    accent: "#3b82f6",
  },
];

export function Section02TheSignal() {
  return (
    <section id="the-signal" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222738]">
      <div className="space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            02 - THE SENSORS
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            Brood nest sensor suite.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            Six digital sensors run continuously inside comb frames and stand bases, withstanding hive humidity and propolis.
          </p>
        </div>

        {/* 6 Clean Scientific Sensor Modality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SENSING_CHANNELS.map((ch) => {
            const IconComponent = ch.icon;
            return (
              <div
                key={ch.name}
                className="bg-[#12151e] border border-[#222738] p-6 rounded-sm space-y-4 flex flex-col justify-between hover:border-[#3a4154] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#8a90a0] uppercase font-bold">
                      {ch.silicon}
                    </span>
                    <div
                      className="p-1.5 rounded-sm border border-[#222738]"
                      style={{ color: ch.accent }}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans">
                    {ch.name}
                  </h3>

                  <div className="py-2 border-y border-[#222738] flex items-baseline justify-between">
                    <span className="text-2xl font-mono font-bold text-white tracking-tight">
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

                <div className="text-[10px] font-mono text-[#8a90a0] pt-2 border-t border-[#181c28]">
                  SPEC: <span className="text-zinc-300">{ch.specs}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
