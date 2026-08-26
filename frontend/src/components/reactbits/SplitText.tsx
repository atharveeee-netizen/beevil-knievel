"use client";

import React, { useEffect, useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
}

export function SplitText({
  text,
  className = "",
  delay = 40,
}: SplitTextProps) {
  const letters = text.split("");

  return (
    <span className={`inline-block ${className}`}>
      {letters.map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-500 ease-out"
          style={{
            transitionDelay: `${index * delay}ms`,
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
