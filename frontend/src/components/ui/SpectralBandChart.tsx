import React from "react";

export interface SpectralBand {
  id: string;
  name: string;
  freqRange: string;
  biologicalPhenomenon: string;
  energyNormalized: number; // 0.0 to 1.0
  powerDb: number; // -60 to 0 dB
  status: "BASELINE" | "ACTIVE" | "ELEVATED" | "SURGE";
}

interface SpectralBandChartProps {
  bands: SpectralBand[];
  dominantFrequencyHz: number;
  className?: string;
}

export function SpectralBandChart({
  bands,
  dominantFrequencyHz,
  className = "",
}: SpectralBandChartProps) {
  const getStatusColor = (status: SpectralBand["status"]) => {
    switch (status) {
      case "SURGE":
        return {
          bar: "bg-[#ef4444]",
          text: "text-[#f87171]",
          border: "border-[#ef4444]",
        };
      case "ELEVATED":
        return {
          bar: "bg-[#f59e0b]",
          text: "text-[#fbbf24]",
          border: "border-[#f59e0b]",
        };
      case "ACTIVE":
        return {
          bar: "bg-[#3b82f6]",
          text: "text-[#60a5fa]",
          border: "border-[#3b82f6]",
        };
      default:
        return {
          bar: "bg-[#10b981]",
          text: "text-[#34d399]",
          border: "border-[#10b981]",
        };
    }
  };

  return (
    <div className={`flex flex-col gap-3 font-mono ${className}`}>
      <div className="flex items-center justify-between text-xs pb-2 border-b border-[#283144]">
        <div className="flex items-center gap-2">
          <span className="text-[#94a3b8] uppercase">Dominant Spectral Peak:</span>
          <span className="text-[#f59e0b] font-bold text-sm">{dominantFrequencyHz.toFixed(1)} Hz</span>
        </div>
        <span className="text-[10px] text-[#64748b]">256-pt CMSIS-DSP FFT @ 16 kHz</span>
      </div>

      <div className="space-y-2.5">
        {bands.map((band) => {
          const style = getStatusColor(band.status);
          const pct = Math.min(100, Math.max(2, band.energyNormalized * 100));

          return (
            <div key={band.id} className="flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-[#f1f5f9] font-semibold">{band.name}</span>
                  <span className="text-[#64748b]">({band.freqRange})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#94a3b8] font-tabular">{band.powerDb.toFixed(1)} dBFS</span>
                  <span
                    className={`px-1 py-0.2 rounded-xs border text-[9px] font-bold uppercase ${style.text} ${style.border}`}
                  >
                    {band.status}
                  </span>
                </div>
              </div>

              {/* Energy bar track */}
              <div className="w-full h-2 bg-[#181d28] border border-[#283144] rounded-xs overflow-hidden">
                <div
                  className={`h-full ${style.bar} transition-all duration-300`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="text-[10px] text-[#64748b] truncate">
                {band.biologicalPhenomenon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
