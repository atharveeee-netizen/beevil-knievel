import React from "react";

export interface FrameTemperature {
  frame: number;
  label: string;
  role: string;
  tempC: number;
  isCore: boolean;
}

interface ThermalGradientPlotProps {
  frames: FrameTemperature[];
  ambientTempC: number;
  optimalSetpointC?: number;
  className?: string;
}

export function ThermalGradientPlot({
  frames,
  ambientTempC,
  optimalSetpointC = 34.5,
  className = "",
}: ThermalGradientPlotProps) {
  const minTemp = Math.min(20, ambientTempC - 2, ...frames.map((f) => f.tempC));
  const maxTemp = Math.max(38, ...frames.map((f) => f.tempC));
  const tempRange = maxTemp - minTemp || 1;

  const width = 360;
  const height = 140;
  const paddingX = 35;
  const paddingTop = 20;
  const paddingBottom = 30;

  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) => paddingX + (index / (frames.length - 1)) * plotWidth;
  const getY = (temp: number) => paddingTop + plotHeight - ((temp - minTemp) / tempRange) * plotHeight;

  const points = frames.map((f, i) => `${getX(i).toFixed(1)},${getY(f.tempC).toFixed(1)}`).join(" ");

  return (
    <div className={`flex flex-col font-mono text-xs ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-[#283144] mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[#94a3b8] uppercase">Core Brood T(core):</span>
          <span className="text-[#10b981] font-bold text-sm">
            {frames.find((f) => f.isCore)?.tempC.toFixed(2)} °C
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
          <span>Ambient:</span>
          <span className="text-[#f1f5f9] font-tabular font-semibold">{ambientTempC.toFixed(1)} °C</span>
        </div>
      </div>

      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Optimal Biological Band: 33.7 to 35.3 °C */}
          <rect
            x={paddingX}
            y={getY(35.3)}
            width={plotWidth}
            height={Math.max(2, getY(33.7) - getY(35.3))}
            fill="rgba(16, 185, 129, 0.08)"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeDasharray="2 2"
          />
          <text
            x={width - 5}
            y={getY(optimalSetpointC) + 3}
            fill="#10b981"
            fontSize="8"
            textAnchor="end"
            opacity="0.8"
          >
            34.5°C SETPOINT
          </text>

          {/* Ambient Reference Line */}
          <line
            x1={paddingX}
            y1={getY(ambientTempC)}
            x2={width - paddingX}
            y2={getY(ambientTempC)}
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Cross-Frame Thermal Gradient Curve */}
          <polyline
            points={points}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Frame Data Nodes */}
          {frames.map((f, i) => {
            const cx = getX(i);
            const cy = getY(f.tempC);
            const isCore = f.isCore;

            return (
              <g key={f.frame}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isCore ? 5 : 3.5}
                  fill={isCore ? "#10b981" : "#f59e0b"}
                  stroke="#090b10"
                  strokeWidth="2"
                />
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  fill={isCore ? "#34d399" : "#f1f5f9"}
                  fontSize="9"
                  fontWeight={isCore ? "bold" : "normal"}
                >
                  {f.tempC.toFixed(1)}°
                </text>
                <text
                  x={cx}
                  y={height - 12}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9"
                  fontWeight="600"
                >
                  F{f.frame}
                </text>
                <text
                  x={cx}
                  y={height - 2}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="7.5"
                >
                  {f.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
