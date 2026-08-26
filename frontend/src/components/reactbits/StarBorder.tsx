"use client";

import React from "react";

interface StarBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function StarBorder({
  children,
  className = "",
  color = "#f59e0b",
  ...props
}: StarBorderProps) {
  return (
    <div className={`relative inline-block overflow-hidden rounded-xl p-[1.5px] ${className}`} {...props}>
      <div
        className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,#f59e0b_360deg)] animate-spin"
        style={{ filter: "blur(1px)", animationDuration: "6s" }}
      />
      <div className="relative rounded-xl bg-[#090d16] p-4 text-white z-10">
        {children}
      </div>
    </div>
  );
}
