"use client";

import React, { useState, useEffect, useRef } from "react";

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
  const currentCountRef = useRef<number>(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startVal = currentCountRef.current;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      const currentVal = startVal + (to - startVal) * easeProgress;
      setCount(currentVal);
      currentCountRef.current = currentVal;

      if (progress < 1) {
        animId = window.requestAnimationFrame(step);
      }
    };
    animId = window.requestAnimationFrame(step);

    return () => {
      if (animId) window.cancelAnimationFrame(animId);
    };
  }, [to, duration]);

  return (
    <span className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
