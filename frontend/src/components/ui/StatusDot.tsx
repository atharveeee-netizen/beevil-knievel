import React from "react";
import { TOKENS, StatusType } from "@/lib/design-tokens";

interface StatusDotProps {
  status: StatusType;
  showLabel?: boolean;
  pulse?: boolean;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function StatusDot({
  status,
  showLabel = true,
  pulse = false,
  className = "",
  size = "default",
}: StatusDotProps) {
  const config = TOKENS.colors.status[status] || TOKENS.colors.status.normal;

  const dotSizes = {
    sm: "w-2 h-2",
    default: "w-2.5 h-2.5",
    lg: "w-3 h-3",
  };

  const textSizes = {
    sm: "text-[11px]",
    default: "text-xs",
    lg: "text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono font-medium ${className}`}
      title={config.desc}
    >
      <span className="relative flex items-center justify-center">
        {pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping`}
            style={{ backgroundColor: config.hex }}
          />
        )}
        <span
          className={`relative inline-flex rounded-full ${dotSizes[size]}`}
          style={{ backgroundColor: config.hex }}
        />
      </span>
      {showLabel && (
        <span
          className={`font-semibold tracking-wide uppercase ${textSizes[size]}`}
          style={{ color: config.text }}
        >
          {config.label}
        </span>
      )}
    </span>
  );
}
