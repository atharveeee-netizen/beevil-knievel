import React from "react";
import Image from "next/image";

export default function DualColumnSection() {
  return (
    <section className="w-full bg-[#C1E5BF] overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-stretch justify-center min-h-[460px] md:min-h-[520px]">
        {/* Left Column: Image with Curved Corner Overlay */}
        <div className="relative w-full md:w-[calc(50%-20px)] h-[320px] sm:h-[400px] md:h-auto min-h-[300px]">
          <Image
            src="/images/beewise/bh-in-almond.webp"
            alt="BeeHome in Almond Orchard"
            fill
            className="object-cover"
          />
          {/* Curved divider SVG on top-right of left column for desktop */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[2vw] bg-[#C1E5BF] rounded-tl-[59px]" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="hidden md:block absolute bottom-[-1px] right-[calc(2vw-2px)] w-[2.5vw] h-[2.5vw] z-10"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 24C13.2548 24 24 13.2548 24 0L24 24L0 24Z"
              fill="#C1E5BF"
            />
          </svg>
        </div>

        {/* Right Column: Icon and Statistic */}
        <div className="w-full md:w-[calc(50%+20px)] flex flex-col justify-center gap-6 p-6 sm:p-10 md:p-16 lg:p-20">
          <div className="relative w-[72px] h-[72px] md:w-[110px] md:h-[110px] flex-shrink-0">
            <Image
              src="/images/beewise/frame-607.svg"
              alt="BeeHome Benefits Icon"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-black text-[24px] sm:text-[32px] md:text-[42px] font-light leading-[1.3] uppercase tracking-wide">
            Deploying the Beevil Knievel<span className="text-[0.6em] align-top">™</span> platform results in{" "}
            <strong className="font-semibold">70% lower colony mortality </strong>
            and zero undetected queen losses
          </p>
        </div>
      </div>
    </section>
  );
}
