"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShoppingCart, ShieldCheck, Sun, Radio, Cpu, ArrowRight } from "lucide-react";

export function OrderAccessoriesSection() {
  return (
    <section className="bg-[#0f172a] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* 1. Solar Sensor Node Package */}
        <div id="all-for-just" className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-[320px] sm:h-[400px] flex items-center justify-center rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl p-2 group">
            <Image
              src="/images/hardware/beevil_hardware_node.jpg"
              alt="Beevil Knievel Field Sensor Transmitter Node"
              fill
              className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-amber-500/30 text-[#ffc833] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase">
              Field Transmitter Package
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
              All for just $189.
            </h2>

            <div className="space-y-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Includes full multi-sensor fusion suite</strong> – TI TMP117 brood temperature (±0.05°C), Sensirion SCD41 CO2, BME688 VOC gas analyzer, and TDK high-frequency digital MEMS acoustic ear.
              </p>
              <p className="text-slate-400 text-sm">
                Includes weatherproof universal magnetic hive mount and 2W monocrystalline solar harvesting lid with 14-day battery reserve.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="#need-help"
                className="inline-flex items-center gap-2 bg-[#ffc833] hover:bg-amber-300 text-slate-950 font-extrabold text-base px-7 py-3.5 rounded-xl shadow-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5 text-slate-950" />
                <span>Pre-Order Node for $189</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Antmicro CM4 Gateway */}
        <div id="gateway-package" className="pt-16 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-sky-500/30 text-sky-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase">
                Central Apiary Hub
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
                Antmicro CM4 Gateway.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              The central 6 TOPS edge intelligence hub. Powered by the open-source Antmicro CM4 Baseboard, connecting up to 50 field nodes over LoRaWAN (15km radius) to run our master 96.84% accuracy Edge-AI model.
            </p>

            <div className="pt-2">
              <Link
                href="#need-help"
                className="inline-flex items-center gap-2 bg-[#ffc833] hover:bg-amber-300 text-slate-950 font-extrabold text-base px-7 py-3.5 rounded-xl shadow-lg transition-all"
              >
                <Cpu className="w-5 h-5 text-slate-950" />
                <span>Configure Gateway ($249)</span>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-[280px] sm:h-[360px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl order-1 md:order-2 group">
            <Image
              src="/images/hardware/beevil_gateway_hub.jpg"
              alt="Antmicro CM4 Base Station Gateway"
              fill
              className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

