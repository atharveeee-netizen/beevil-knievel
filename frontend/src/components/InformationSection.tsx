import React from "react";
import Image from "next/image";

export default function InformationSection() {
  return (
    <section className="w-full bg-[#7A9979] text-white py-16 md:py-24">
      <div className="beewise-container">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-14 px-4 sm:px-8">
          {/* Logo icon */}
          <div className="flex-shrink-0">
            <div className="relative w-[72px] h-[72px] md:w-[110px] md:h-[110px]">
              <Image
                src="/images/beewise/transparent-square-logo.webp"
                alt="Beewise Icon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Impact Statement */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-[24px] sm:text-[32px] md:text-[42px] font-light leading-[1.3] uppercase tracking-wide">
              <strong className="font-semibold">75%</strong> of the produce we eat is pollinated by bees,{" "}
              <br className="hidden md:inline" />
              while <strong className="font-semibold">40%</strong> of bee colonies are collapsing each year.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
