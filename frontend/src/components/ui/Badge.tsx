import React from "react";
import { TOKENS, ClaimType } from "@/lib/design-tokens";

interface BadgeProps {
  claim: ClaimType;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "default";
}

export function Badge({ claim, children, className = "", size = "default" }: BadgeProps) {
  const config = TOKENS.colors.claim[claim] || TOKENS.colors.claim.PROPOSED;
  const padding = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold tracking-wider uppercase rounded-xs border transition-colors ${padding} ${className}`}
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
        color: config.text,
      }}
      title={`Evidence Class: ${config.label}`}
    >
      {children || config.label}
    </span>
  );
}
