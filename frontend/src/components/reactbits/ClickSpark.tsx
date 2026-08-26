"use client";

import React, { useRef, MouseEvent } from "react";

interface ClickSparkProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

export function ClickSpark({
  children,
  sparkColor = "#f59e0b",
  sparkSize = 6,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 400,
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement("div");
      const angle = (i / sparkCount) * Math.PI * 2;
      const destX = Math.cos(angle) * sparkRadius;
      const destY = Math.sin(angle) * sparkRadius;

      spark.style.position = "absolute";
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${sparkSize}px`;
      spark.style.height = `${sparkSize}px`;
      spark.style.borderRadius = "50%";
      spark.style.backgroundColor = sparkColor;
      spark.style.pointerEvents = "none";
      spark.style.transition = `all ${duration}ms cubic-bezier(0.1, 0.8, 0.2, 1)`;
      spark.style.transform = "translate(-50%, -50%) scale(1)";
      spark.style.opacity = "1";
      spark.style.zIndex = "999";

      container.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
        spark.style.opacity = "0";
      });

      setTimeout(() => {
        spark.remove();
      }, duration);
    }
  };

  return (
    <div ref={containerRef} onClick={handleClick} className="relative inline-block w-full">
      {children}
    </div>
  );
}
