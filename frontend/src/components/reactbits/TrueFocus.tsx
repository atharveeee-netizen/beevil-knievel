"use client";

import React, { useState } from "react";

interface TrueFocusProps {
  items: string[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
  borderColor?: string;
}

export function TrueFocus({
  items,
  activeIndex = 0,
  onSelect,
  className = "",
  borderColor = "#f59e0b",
}: TrueFocusProps) {
  const [current, setCurrent] = useState(activeIndex);

  const handleItemClick = (idx: number) => {
    setCurrent(idx);
    if (onSelect) onSelect(idx);
  };

  return (
    <div className={`flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 ${className}`}>
      {items.map((item, idx) => {
        const isActive = current === idx;
        return (
          <button
            key={idx}
            onClick={() => handleItemClick(idx)}
            className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              isActive
                ? "text-slate-950 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
