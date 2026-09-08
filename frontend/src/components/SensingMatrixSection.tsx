import React from "react";
import { Activity, Thermometer, Mic, Wind, Gauge, ShieldAlert, Sun, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function SensingMatrixSection() {
  const SENSOR_CATALOG = [
    {
      name: "TI TMP117 Digital Sensor",
      metric: "Brood Core Temp T(core)",
      range: "-40°C to +125°C",
      accuracy: "±0.1°C Factory Calibrated",
      interface: "I2C (0x48, 400 kHz)",
      purpose: "Brood nest center thermal homeostasis (Frame 4/5)",
      status: "DRIVER_VERIFIED",
      claim: "REAL_SENSOR" as const,
      icon: Thermometer,
    },
    {
      name: "Maxim DS18B20 Array (x5)",
      metric: "5-Frame Thermal Gradient",
      range: "-55°C to +125°C",
      accuracy: "±0.5°C Factory Calibrated",
      interface: "1-Wire Bus (Pin P0.04)",
      purpose: "Cluster contraction & winter survival boundary monitoring",
      status: "DRIVER_VERIFIED",
      claim: "REAL_SENSOR" as const,
      icon: Layers,
    },
    {
      name: "TDK InvenSense INMP441",
      metric: "Bio-Acoustic PCM Audio",
      range: "60 Hz to 15 kHz",
      accuracy: "61 dBA SNR / 24-bit",
      interface: "Digital I2S DMA (16 kHz)",
      purpose: "Fanning, queen piping, and pre-swarm acoustic surge",
      status: "CODE_STANDARDIZED",
      claim: "VALIDATED" as const,
      icon: Mic,
    },
    {
      name: "Sensirion SCD41 Photoacoustic",
      metric: "Metabolic Carbon Dioxide",
      range: "400 to 5,000 ppm",
      accuracy: "±(40 ppm + 5% of reading)",
      interface: "I2C (0x62, 400 kHz)",
      purpose: "Colony respiration rate, ventilation activity, and metabolic surge",
      status: "DRIVER_VERIFIED",
      claim: "REAL_SENSOR" as const,
      icon: Wind,
    },
    {
      name: "Bosch Sensortec BME688",
      metric: "VOC Profiler, RH% & Baro",
      range: "10–90% RH / 300–1100 hPa",
      accuracy: "±3% RH / ±0.6 hPa",
      interface: "I2C (0x76, 400 kHz)",
      purpose: "Brood disease VOC biomarkers, mold risk, and flight pressure drop",
      status: "DRIVER_VERIFIED",
      claim: "REAL_SENSOR" as const,
      icon: Activity,
    },
    {
      name: "Avia Semiconductor HX711",
      metric: "Gross Colony Weight",
      range: "0 to 150 kg (Dual-Bar)",
      accuracy: "24-bit Low-Noise ADC",
      interface: "I2C Bridge (0x26) / GPIO",
      purpose: "Daily nectar flow, honey store depletion, and swarming departure loss",
      status: "DRIVER_VERIFIED",
      claim: "REAL_SENSOR" as const,
      icon: Gauge,
    },
    {
      name: "STMicroelectronics LIS3DH",
      metric: "Seismic Vibration & Tilt",
      range: "±2g / ±4g / ±8g / ±16g",
      accuracy: "Ultra-low power (2 μA)",
      interface: "I2C (0x18, Int P0.15)",
      purpose: "Bear attack, human vandalism, hive tip-over, and wind knockdowns",
      status: "DRIVER_VERIFIED",
      claim: "REAL_SENSOR" as const,
      icon: ShieldAlert,
    },
    {
      name: "Vishay VEML7700 Lux",
      metric: "Ambient Solar Illuminance",
      range: "0 to 120,000 Lux",
      accuracy: "High Sensitivity 16-bit",
      interface: "I2C (0x10, 400 kHz)",
      purpose: "Foraging departure optical correlation vs flight corridor conditions",
      status: "DRIVER_VERIFIED",
      claim: "REAL_SENSOR" as const,
      icon: Sun,
    },
  ];

  return (
    <section id="sensors" className="py-16 md:py-24 border-b border-[#283144] bg-[#090b10] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              04 — Where We Measure: In-Hive Sensor Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              In-Hive Multi-Modal Sensor Matrix
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="REAL_SENSOR">9 Precision COTS Transducers</Badge>
          </div>
        </div>

        {/* Technical Mechanical Schematic Display */}
        <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden mb-12 shadow-lg">
          <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f1f5f9]">
              Canonical Figure 0.2: In-Hive Sensor Layer &amp; Bus Topology
            </span>
            <span className="text-[11px] font-mono text-[#94a3b8]">10-Frame Langstroth Deep Brood Box</span>
          </div>
          <div className="p-4 sm:p-6 bg-[#ffffff] flex items-center justify-center">
            <img
              src="/figures/canonical/02_hive_sensor_layer.svg"
              alt="Canonical In-Hive Sensor Layer: Physical Transducer Matrix and Bus Routing"
              className="w-full h-auto max-h-[420px] object-contain"
            />
          </div>
          <div className="px-4 py-2 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex items-center justify-between">
            <span>Hermetic PG-7 cable glands preserve propolis seals and eliminate cold air drafting</span>
            <Badge claim="VALIDATED" size="sm">Mechanical Design</Badge>
          </div>
        </div>

        {/* 8-Sensor Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
          {SENSOR_CATALOG.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="p-3.5 rounded-sm bg-[#11141d] border border-[#283144] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2 text-[#f59e0b]">
                      <Icon className="w-4 h-4" />
                      <span className="font-bold">{s.name}</span>
                    </div>
                    <Badge claim={s.claim} size="sm" />
                  </div>

                  <div className="text-xs text-[#f1f5f9] font-bold mb-1">{s.metric}</div>
                  <div className="text-[11px] text-[#64748b] font-sans leading-relaxed mb-3">
                    {s.purpose}
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-[#1d2332] text-[10px] text-[#94a3b8]">
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Bus:</span>
                    <span className="text-[#f1f5f9] font-tabular">{s.interface}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Range:</span>
                    <span className="text-[#f1f5f9] font-tabular">{s.range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Precision:</span>
                    <span className="text-[#10b981] font-tabular">{s.accuracy}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
