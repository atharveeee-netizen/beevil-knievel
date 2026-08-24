"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, ShieldCheck, Eye } from "lucide-react";

interface GalleryPhoto {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

const SECURE_HARDWARE_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images/hardware/beevil_gateway_hub.jpg",
    alt: "Beevil Central Gateway Hub",
    title: "Central Apiary Gateway Hub",
    caption: "Weatherproof base station hub coordinating multi-hive radio telemetry with high-throughput Edge AI processing.",
  },
  {
    src: "/images/hardware/beevil_hardware_node.jpg",
    alt: "Beevil Field Sensor Transmitter Node",
    title: "Solar Field Sensor Node",
    caption: "Non-invasive IP67 weatherproof housing with 2W solar lid and 16-sensor acoustic fusion array.",
  },
  {
    src: "/images/hardware/beevil_hero_apiary.jpg",
    alt: "Field Apiary Deployment",
    title: "Operational Apiary Installation",
    caption: "Continuous autonomous monitoring deployed on active Langstroth production hives.",
  },
  {
    src: "/images/hardware/beevil_aerial_apiary.jpg",
    alt: "Smart Apiary Fleet Grid",
    title: "Smart Apiary Mesh Fleet",
    caption: "Wide-area coverage supporting dozens of colony nodes over ultra-low-power radio.",
  },
  {
    src: "/images/hardware/beevil_detect_macro.jpg",
    alt: "Colony Health Inspection",
    title: "Acoustic & Health Sensing",
    caption: "Non-invasive acoustic telemetry capturing micro-harmonic frequency shifts in real time.",
  },
  {
    src: "/images/hardware/tinyml_comparison_table.jpg",
    alt: "Edge AI Benchmark",
    title: "Edge AI Performance Benchmark",
    caption: "Validated 96.84% out-of-sample accuracy with 3.35 ms hardware inference latency.",
  },
];

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % SECURE_HARDWARE_PHOTOS.length);
  };

  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + SECURE_HARDWARE_PHOTOS.length) % SECURE_HARDWARE_PHOTOS.length
    );
  };

  return (
    <section
      id="gallery"
      className="bg-[#1d1c18] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#ffc833] text-[#312f28] px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            <span>Field Deployment &amp; Systems</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Hardware &amp; Apiary Gallery.
          </h2>

          <p className="text-sm sm:text-base text-white/70">
            Real field installations, solar sensor nodes, and gateway hubs operating in commercial apiaries.
          </p>
        </div>

        {/* 6 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECURE_HARDWARE_PHOTOS.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="bg-[#27272a] border border-white/10 rounded-2xl overflow-hidden shadow-lg cursor-pointer group select-none flex flex-col justify-between hover:border-[#ffc833]/60 transition-all"
            >
              <div className="relative h-56 sm:h-64 w-full bg-black/40 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="flex items-center gap-2 bg-[#ffc833] text-[#312f28] px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View High-Res</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1 bg-[#212223] border-t border-white/10">
                <h3 className="text-sm font-bold text-white group-hover:text-[#ffc833] transition-colors truncate">
                  {photo.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full h-[75vh] flex flex-col items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={SECURE_HARDWARE_PHOTOS[lightboxIndex].src}
                alt={SECURE_HARDWARE_PHOTOS[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="text-center mt-4 space-y-1">
              <div className="text-base font-bold text-[#ffc833]">
                {SECURE_HARDWARE_PHOTOS[lightboxIndex].title}
              </div>
              <p className="text-xs font-mono text-white/80 max-w-2xl">
                {SECURE_HARDWARE_PHOTOS[lightboxIndex].caption} ({lightboxIndex + 1} / {SECURE_HARDWARE_PHOTOS.length})
              </p>
            </div>
          </div>

          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
