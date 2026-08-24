"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShoppingCart, ShieldCheck, Sun, Radio, Cpu } from "lucide-react";

export function OrderAccessoriesSection() {
  return (
    <section className="bg-[#6c00ff] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-white/10">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* 1. Solar Sensor Node Package */}
        <div id="all-for-just" className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-[320px] sm:h-[400px] flex items-center justify-center rounded-2xl overflow-hidden bg-black/20 p-2">
            <Image
              src="/images/hardware/beevil_hardware_node.jpg"
              alt="Beevil Knievel Field Sensor Transmitter Node"
              fill
              className="object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-[#ffc833] text-[#312f28] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase">
              Field Transmitter Package
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              All for just $189.
            </h2>

            <div className="space-y-3 text-lg sm:text-xl font-medium text-white/90 leading-relaxed">
              <p>
                <strong>Includes full multi-sensor fusion suite</strong> – TMP117 brood temperature, Sensirion humidity, BME688 VOC gas analyzer, and high-frequency digital MEMS acoustic ear.
              </p>
              <p className="text-white/80 text-base">
                Includes weatherproof universal hive mount and 2W monocrystalline solar harvesting lid with 14-day battery reserve.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="#need-help"
                className="btn-pill-yellow inline-flex items-center gap-2 text-lg shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5 text-[#312f28]" />
                <span>Pre-Order Node for $189</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Antmicro CM4 Gateway */}
        <div id="gateway-package" className="pt-16 border-t border-white/20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="relative inline-block">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-3">
                <span className="bg-[#ffc833] text-[#6c00ff] text-sm font-black px-2.5 py-1 rounded-md uppercase transform -rotate-6 shadow-sm">
                  And
                </span>
                <span>Antmicro CM4 Gateway</span>
              </h2>
            </div>

            <p className="text-lg sm:text-xl font-medium text-white/90 leading-relaxed">
              The central 6 TOPS edge intelligence hub. Powered by the open-source Antmicro CM4 Baseboard, connecting up to 50 field nodes over LoRaWAN (15km radius) to run our master 96.84% accuracy Edge-AI model.
            </p>

            <div className="pt-2">
              <Link
                href="#need-help"
                className="btn-pill-yellow inline-flex items-center gap-2 text-lg shadow-lg hover:shadow-xl"
              >
                <Cpu className="w-5 h-5 text-[#312f28]" />
                <span>Configure Gateway ($249)</span>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden bg-black/20 order-1 md:order-2">
            <Image
              src="/images/hardware/beevil_gateway_hub.jpg"
              alt="Antmicro CM4 Base Station Gateway"
              fill
              className="object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
