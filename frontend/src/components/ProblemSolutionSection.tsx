import React from "react";

export default function ProblemSolutionSection() {
  return (
    <section id="problem-solution" className="w-full bg-[#EDECEC] py-16 md:py-24">
      <div className="beewise-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[#7A9979] text-[13px] sm:text-[14px] font-semibold tracking-wider uppercase mb-2 block">
            System Benchmark &amp; Clinical Audit
          </span>
          <h2 className="text-[30px] sm:text-[38px] md:text-[46px] font-normal text-black leading-[1.2]">
            Apiary Realities vs. The BEEVIL Autonomous Platform
          </h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* 5.1 The Problem (Left Column - Danger / Charcoal Alert) */}
          <div className="bg-[#4E4540] text-white rounded-2xl md:rounded-[28px] p-8 sm:p-10 md:p-12 flex flex-col justify-between shadow-sm relative overflow-hidden border border-[#3E3632]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[13px] font-medium">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                The Status Quo Failure
              </div>
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium leading-[1.25] text-white">
                Bees are dying. 40% annual colony collapse rates are the new commercial reality.
              </h3>
              <p className="text-[#DCDAD9] text-[16px] sm:text-[18px] font-light leading-relaxed">
                Traditional management relies on manual frame inspections every 14 days in sweltering heat, or cloud-dependent audio apps that fail in remote out-yards (43% field accuracy).
              </p>
            </div>

            {/* Problem Metric Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-8 mt-6 border-t border-white/15">
              <div>
                <span className="text-[28px] sm:text-[34px] font-bold text-red-400 block">40%</span>
                <span className="text-[13px] text-[#DCDAD9] font-light">Annual Colony Loss</span>
              </div>
              <div>
                <span className="text-[28px] sm:text-[34px] font-bold text-red-400 block">43%</span>
                <span className="text-[13px] text-[#DCDAD9] font-light">Audio-Only Accuracy</span>
              </div>
            </div>
          </div>

          {/* 5.2 Our Solution (Right Column - Success / Mint & Green Card) */}
          <div className="bg-white text-black rounded-2xl md:rounded-[28px] p-8 sm:p-10 md:p-12 flex flex-col justify-between shadow-sm relative overflow-hidden border border-[#E5E5E0]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7A9979]/15 text-[#4E4540] border border-[#7A9979]/30 text-[13px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#65bd60]" />
                BEEVIL KNIEVEL Autonomous Edge
              </div>
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium leading-[1.25] text-black">
                Multimodal Fusion. Edge Deployed. Verified.
              </h3>
              <p className="text-[#363636] text-[16px] sm:text-[18px] font-light leading-relaxed">
                We process 47.89 GB of real field data across 576 hives. Our sensor fusion model achieves 96.84% honest accuracy and misses ZERO queenless collapses. All running locally on your farm.
              </p>
            </div>

            {/* Solution Metric Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-8 mt-6 border-t border-[#E5E5E0]">
              <div>
                <span className="text-[28px] sm:text-[34px] font-bold text-[#7A9979] block">96.84%</span>
                <span className="text-[13px] text-[#363636] font-medium">Honest Out-of-Sample Acc</span>
              </div>
              <div>
                <span className="text-[28px] sm:text-[34px] font-bold text-[#65bd60] block">100%</span>
                <span className="text-[13px] text-[#363636] font-medium">Queenless Recall (0 False Neg)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
