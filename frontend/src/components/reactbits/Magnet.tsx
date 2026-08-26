"use client";

import React, { useRef, useState, MouseEvent } from "react";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  className?: string;
}

export function Magnet({
  children,
  padding = 50,
  disabled = false,
  magnetStrength = 2,
  className = "",
}: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !magnetRef.current) return;

    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distX = Math.abs(centerX - e.clientX);
    const distY = Math.abs(centerY - e.clientY);

    if (distX < width / 2 + padding && distY < height / 2 + padding) {
      setPosition({
        x: (e.clientX - centerX) / magnetStrength,
        y: (e.clientY - centerY) / magnetStrength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.5s ease-out" : "transform 0.1s ease-out",
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}
