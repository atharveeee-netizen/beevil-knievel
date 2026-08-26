"use client";

import React, { useState, useEffect } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState<number>(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      setCount(from + (to - from) * easeProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [to, from, duration]);

  return (
    <span className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
