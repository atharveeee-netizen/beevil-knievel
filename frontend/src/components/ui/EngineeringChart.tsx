"use client";

import React, { useState } from "react";

export interface DataPoint {
  time: string;
  value: number;
  secondaryValue?: number;
}

interface EngineeringChartProps {
  data: DataPoint[];
  title?: string;
  unit: string;
  secondaryUnit?: string;
  min?: number;
  max?: number;
  targetRange?: { min: number; max: number; label: string };
  strokeColor?: string;
  secondaryStrokeColor?: string;
  height?: number;
  className?: string;
}

export function EngineeringChart({
  data,
  title,
  unit,
  secondaryUnit,
  min: customMin,
  max: customMax,
  targetRange,
  strokeColor = "#10b981",
  secondaryStrokeColor = "#3b82f6",
  height = 160,
  className = "",
}: EngineeringChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center border border-dashed border-[#283144] rounded text-xs font-mono text-[#64748b]"
      >
        NO TELEMETRY STREAM
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const secondaryValues = data
    .map((d) => d.secondaryValue)
    .filter((v): v is number => v !== undefined);

  const allValues = [...values, ...secondaryValues];
  if (targetRange) {
    allValues.push(targetRange.min, targetRange.max);
  }

  const dataMin = customMin !== undefined ? customMin : Math.min(...allValues);
  const dataMax = customMax !== undefined ? customMax : Math.max(...allValues);
  const range = dataMax - dataMin === 0 ? 1 : dataMax - dataMin;

  const width = 500;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - ((val - dataMin) / range) * chartHeight;
  };

  const mainPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i).toFixed(1)} ${getY(d.value).toFixed(1)}`)
    .join(" ");

  const hasSecondary = secondaryValues.length === data.length;
  const secondaryPath = hasSecondary
    ? data
        .map(
          (d, i) =>
            `${i === 0 ? "M" : "L"} ${getX(i).toFixed(1)} ${getY(d.secondaryValue!).toFixed(1)}`
        )
        .join(" ")
    : null;

  return (
    <div className={`flex flex-col select-none ${className}`}>
      {title && (
        <div className="flex items-center justify-between text-xs font-mono text-[#94a3b8] mb-1.5 px-1">
          <span className="font-semibold uppercase tracking-wider">{title}</span>
          <span className="text-[#f1f5f9] font-bold font-tabular">
            {hoveredIdx !== null ? `${data[hoveredIdx].value.toFixed(1)} ${unit}` : `${data[data.length - 1].value.toFixed(1)} ${unit}`}
          </span>
        </div>
      )}

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Target Setpoint Band */}
          {targetRange && (
            <rect
              x={paddingLeft}
              y={getY(targetRange.max)}
              width={chartWidth}
              height={Math.max(2, getY(targetRange.min) - getY(targetRange.max))}
              fill="rgba(16, 185, 129, 0.08)"
              stroke="rgba(16, 185, 129, 0.25)"
              strokeDasharray="2 2"
            />
          )}

          {/* Grid lines (horizontal) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const yVal = dataMin + ratio * range;
            const yPos = getY(yVal);
            return (
              <g key={ratio}>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={width - paddingRight}
                  y2={yPos}
                  stroke="#1d2332"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 6}
                  y={yPos + 3}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {yVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Secondary Series Path */}
          {secondaryPath && (
            <path
              d={secondaryPath}
              fill="none"
              stroke={secondaryStrokeColor}
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
          )}

          {/* Main Series Path */}
          <path
            d={mainPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover Crosshair & Points */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.value);
            const isHovered = hoveredIdx === i;

            return (
              <g key={i}>
                {/* Hit target area */}
                <rect
                  x={cx - chartWidth / (data.length * 2)}
                  y={paddingTop}
                  width={chartWidth / data.length}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredIdx(i)}
                />

                {isHovered && (
                  <>
                    <line
                      x1={cx}
                      y1={paddingTop}
                      x2={cx}
                      y2={height - paddingBottom}
                      stroke="#475569"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <circle cx={cx} cy={cy} r="3.5" fill={strokeColor} stroke="#090b10" strokeWidth="2" />
                  </>
                )}
              </g>
            );
          })}

          {/* Time axis labels */}
          <text
            x={paddingLeft}
            y={height - 6}
            fill="#64748b"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
          >
            {data[0]?.time}
          </text>
          <text
            x={width - paddingRight}
            y={height - 6}
            textAnchor="end"
            fill="#64748b"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
          >
            {data[data.length - 1]?.time}
          </text>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-2 pointer-events-none bg-[#090b10]/95 border border-[#3d4964] px-2 py-1 rounded text-[10px] font-mono text-[#f1f5f9] shadow-lg"
            style={{
              left: `${Math.min(80, Math.max(10, (hoveredIdx / (data.length - 1)) * 100))}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-[#94a3b8]">{data[hoveredIdx].time}</div>
            <div className="font-bold text-[#10b981]">
              {data[hoveredIdx].value.toFixed(2)} {unit}
            </div>
            {hasSecondary && data[hoveredIdx].secondaryValue !== undefined && (
              <div className="text-[#3b82f6]">
                {data[hoveredIdx].secondaryValue!.toFixed(2)} {secondaryUnit || unit}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
