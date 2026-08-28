"use client";

import React, { useRef } from "react";

export default function VideoScrollerSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8 md:gap-12">
        <h2 className="text-[32px] sm:text-[40px] md:text-[50px] font-normal text-black text-center leading-[1.2]">
          Beewise is here to help.
        </h2>

        <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-[#EBEBEB] bg-[#1A1A1A]">
          <video
            ref={videoRef}
            src="/videos/beewise/beewise-scrolly.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto max-h-[650px] object-cover mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
