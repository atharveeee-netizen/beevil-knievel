import React from "react";
import Link from "next/link";

export default function PartnersSection() {
  return (
    <section id="partners" className="w-full bg-[#4E4540] text-white py-12 md:py-14 border-y border-[#3A3330]">
      <div className="beewise-container text-center">
        {/* Caption */}
        <p className="text-[#C1E5BF] text-[13px] sm:text-[14px] md:text-[15px] font-medium tracking-wider uppercase mb-8">
          Built in collaboration with leading academic institutions and recognized by IEEE
        </p>

        {/* Logos & Institutional Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-center gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* SASET Badge */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-5 flex flex-col items-center justify-center transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-[#7A9979] flex items-center justify-center text-white font-bold text-[18px] mb-2 shadow-inner group-hover:scale-105 transition-transform">
              SASET
            </div>
            <span className="text-[17px] font-semibold text-white">SASET</span>
            <span className="text-[12px] font-light text-[#DCDAD9] text-center mt-1">
              School of Advanced Sciences &amp; Engineering
            </span>
          </div>

          {/* RU Badge */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-5 flex flex-col items-center justify-center transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-[#FDBA12] flex items-center justify-center text-[#4E4540] font-bold text-[18px] mb-2 shadow-inner group-hover:scale-105 transition-transform">
              RU
            </div>
            <span className="text-[17px] font-semibold text-white">Ramaiah University</span>
            <span className="text-[12px] font-light text-[#DCDAD9] text-center mt-1">
              University of Applied Sciences
            </span>
          </div>

          {/* IEEE Hardware Competition Badge */}
          <Link
            href="https://ieee.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-5 flex flex-col items-center justify-center transition-all duration-300 group block"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#006699] font-bold text-[18px] mb-2 shadow-inner group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 fill-[#006699]" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.5 19.5 7 12 10.5zm0 2.5l-8-4v6l8 4 8-4v-6l-8 4z" />
              </svg>
            </div>
            <span className="text-[17px] font-semibold text-white">IEEE Hardware</span>
            <span className="text-[12px] font-light text-[#FDBA12] text-center mt-1 font-medium">
              Competition Submission 2026
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
