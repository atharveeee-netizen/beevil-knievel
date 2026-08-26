"use client";

import React from "react";

interface StarBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  color?: string;
}

export function StarBorder({
  children,
  className = "",
  innerClassName = "p-4",
  color = "#f59e0b",
  ...props
}: StarBorderProps) {
  return (
    <div className={`relative inline-block overflow-hidden rounded-2xl p-[1.5px] ${className}`} {...props}>
      <div
        className="absolute inset-0 animate-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${color} 360deg)`,
          filter: "blur(1px)",
          animationDuration: "6s",
        }}
      />
      <div className={`relative rounded-2xl bg-[#090d16] text-white z-10 ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
