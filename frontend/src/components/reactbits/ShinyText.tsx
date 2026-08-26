"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-[linear-gradient(110deg,#94a3b8,45%,#ffffff,55%,#94a3b8)] bg-[length:250%_100%] bg-clip-text text-transparent ${
        !disabled ? "animate-shiny" : ""
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
