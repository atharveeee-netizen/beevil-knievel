"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye, Radio, Sparkles, Cpu, ShieldCheck } from "lucide-react";
import { DecryptedText, ShinyText, ClickSpark } from "@/components/reactbits";

interface GalleryItem {
  id: number;
  color: string;
  label: string;
  subtitle: string;
  image: string;
  badge: string;
  specs: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    color: "var(--hue-1)",
    label: "Operational Apiary",
    subtitle: "Continuous autonomous monitoring across active Langstroth production hives.",
    image: "/images/hardware/beevil_hero_apiary.jpg",
    badge: "IN865 MESH // 15KM RANGE",
    specs: "100 Nodes • AES-256 Radio • 99.8% PDR",
  },
  {
    id: 2,
    color: "var(--hue-2)",
    label: "Solar Field Sensor Node",
    subtitle: "Non-invasive IP67 weatherproof housing with 2W monocrystalline solar lid.",
    image: "/images/hardware/beevil_hardware_node.jpg",
    badge: "TI TMP117 + SCD41 NDIR",
    specs: "±0.05°C NIST RTD • 400-5000 ppm CO2 • 2.0µA Sleep",
  },
  {
    id: 3,
    color: "var(--hue-3)",
    label: "Central Apiary Gateway",
    subtitle: "Weatherproof base station hub running dual-tier neural inference models.",
    image: "/images/hardware/beevil_gateway_hub.jpg",
    badge: "6 TOPS CM4 AI ENGINE",
    specs: "8.2ms INT8 Torch • Debian 64-bit • SQLite WAL",
  },
  {
    id: 4,
    color: "var(--hue-4)",
    label: "Acoustic Detection Array",
    subtitle: "24-bit I2S MEMS micro-harmonic acoustic telemetry capturing colony state.",
    image: "/images/hardware/beevil_detect_macro.jpg",
    badge: "128-PT CMSIS-DSP FFT",
    specs: "INMP441 MEMS • 50-1200 Hz • Sub-PPM MOX AI",
  },
  {
    id: 5,
    color: "var(--hue-5)",
    label: "Smart Apiary Fleet Grid",
    subtitle: "Wide-area coverage coordinating multi-hop telemetry across commercial yards.",
    image: "/images/hardware/beevil_aerial_apiary.jpg",
    badge: "SX1262 SUB-GHZ LORAWAN",
    specs: "Multi-Hop Routing • Dynamic Power Control • Solar LiFePO4",
  },
  {
    id: 6,
    color: "var(--hue-6)",
    label: "Antmicro CM4 Carrier Base",
    subtitle: "Custom open-source baseboard with industrial power supply and LoRa transceiver.",
    image: "/images/hardware/cm4-baseboard-render.png",
    badge: "HARDWARE CAD SPEC // RPi CM4",
    specs: "Broadcom BCM2711 • 4GB LPDDR4 • Gigabit Ethernet",
  },
];

export function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Measure and calculate scroll progress
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress from 0 (top enters) to 1 (bottom exits)
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      animationFrameId = requestAnimationFrame(() => {
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute translateX based on card dimensions and count
  const itemWidth = typeof window !== "undefined" && window.innerWidth < 640 ? 300 : 420;
  const gap = typeof window !== "undefined" && window.innerWidth < 640 ? 20 : 32;
  const totalDistance = (GALLERY_ITEMS.length - 1) * (itemWidth + gap);
  const translateX = scrollProgress * totalDistance;

  // Lightbox handlers
  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
  }, [lightboxIndex]);
  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  return (
    <section id="gallery" className="bg-[#070a12] text-[#f8fafc] border-t border-[#393939] overflow-visible">
      {/* Intro Header Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#161616] border border-amber-500/30 text-[#f59e0b] px-4 py-1.5 rounded-sm text-xs font-mono font-semibold uppercase tracking-widest">
          <Eye className="w-3.5 h-3.5 text-[#f59e0b]" />
          <DecryptedText
            text="FIELD TELEMETRY & HARDWARE STREAM"
            speed={25}
            className="text-[#f59e0b]"
          />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-sans uppercase">
          Autonomous Apiary Gallery
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-mono leading-relaxed">
          Scroll vertically to scrub horizontally through real-world commercial field installations, solar sensor nodes, and gateway hubs.
        </p>

        {/* Interactive Scrub Indicator */}
        <div className="pt-4 max-w-md mx-auto flex items-center gap-3">
          <span className="text-[11px] font-mono text-zinc-500">01</span>
          <div className="flex-1 h-1 bg-[#262626] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400 transition-all duration-75"
              style={{ width: `${Math.max(scrollProgress * 100, 4)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-zinc-500">06</span>
        </div>
      </div>

      {/* Sticky 300vh Scroll Container */}
      <div ref={containerRef} className="relative h-[280vh] sm:h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-start overflow-hidden px-4 sm:px-12 lg:px-24">
          {/* Sliding Gallery Track */}
          <div
            ref={trackRef}
            className="flex gap-5 sm:gap-8 will-change-transform transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(-${translateX}px, 0, 0)`,
            }}
          >
            {GALLERY_ITEMS.map((item, idx) => (
              <ClickSpark key={item.id} sparkColor="#f59e0b" sparkCount={6}>
                <div
                  onClick={() => openLightbox(idx)}
                  className="group relative flex-shrink-0 w-[300px] sm:w-[420px] h-[460px] sm:h-[540px] rounded-sm border border-[#393939] bg-[#161616] overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:shadow-amber-500/10 select-none flex flex-col justify-between"
                  style={{
                    boxShadow: `0 20px 40px -15px rgba(0,0,0,0.8), 0 0 20px -5px ${item.color}20`,
                  }}
                >
                  {/* Background Hardware Image */}
                  <div className="absolute inset-0 bg-[#070a12]">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 300px, 420px"
                    />
                  </div>

                  {/* Dual Ambient Gradient Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, rgba(7,10,18,0.98) 0%, rgba(7,10,18,0.75) 40%, rgba(7,10,18,0.2) 70%, transparent 100%)`,
                    }}
                  />

                  {/* Subtle Accent Color Rim */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300 mix-blend-screen"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${item.color} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Top Badge & Number Header */}
                  <div className="relative z-10 p-5 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 bg-[#070a12]/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-sm text-[10px] font-mono text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{item.badge}</span>
                    </div>

                    <span
                      className="text-lg font-mono font-bold tracking-tighter"
                      style={{ color: item.color }}
                    >
                      0{item.id}
                    </span>
                  </div>

                  {/* Bottom Content Metadata */}
                  <div className="relative z-10 p-6 space-y-2 bg-gradient-to-t from-[#070a12] via-[#070a12]/90 to-transparent">
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-amber-400" />
                      <span>{item.specs}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#f59e0b] transition-colors font-sans">
                      {item.label}
                    </h3>

                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 font-mono">
                      {item.subtitle}
                    </p>

                    {/* Hover Prompt */}
                    <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-amber-400/80 group-hover:text-amber-400 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to expand high-res telemetry</span>
                    </div>
                  </div>
                </div>
              </ClickSpark>
            ))}
          </div>
        </div>
      </div>

      {/* Outro Section */}
      <div className="py-24 px-4 text-center border-t border-[#262626] bg-[#0b0f19]">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FIELD PROVEN // 100/100 NODES VERIFIED</span>
          </div>
          <h4 className="text-2xl font-bold text-white font-sans">
            Ready for Commercial Scale Deployment
          </h4>
          <p className="text-xs text-zinc-400 font-mono">
            All nodes feature NIST-traceable calibration certificates and verified LoRaWAN IN865 packet delivery rates.
          </p>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#070a12]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-[#161616] hover:bg-[#262626] border border-white/10 text-white rounded-sm transition-colors z-50 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-[#161616] hover:bg-[#262626] border border-white/10 text-white rounded-sm transition-colors z-50 cursor-pointer"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Modal Center Content */}
          <div className="relative max-w-5xl w-full h-[75vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full h-full rounded-sm overflow-hidden border border-[#393939] bg-black">
              <Image
                src={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].label}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="w-full bg-[#161616] border border-[#393939] p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-base font-bold text-[#f59e0b] font-sans flex items-center gap-2">
                  <span>{GALLERY_ITEMS[lightboxIndex].label}</span>
                  <span className="text-xs font-mono text-zinc-400">
                    ({lightboxIndex + 1} / {GALLERY_ITEMS.length})
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-300 mt-0.5">
                  {GALLERY_ITEMS[lightboxIndex].subtitle}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-sm">
                  {GALLERY_ITEMS[lightboxIndex].badge}
                </span>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-[#161616] hover:bg-[#262626] border border-white/10 text-white rounded-sm transition-colors z-50 cursor-pointer"
            aria-label="Next item"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
