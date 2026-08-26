"use client";

import React from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
}

export function BlurText({
  text,
  delay = 50,
  className = "",
  animateBy = "words",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <span className={`inline-block ${className}`}>
      {elements.map((el, i) => (
        <span
          key={i}
          className="inline-block animate-fade-in-blur transition-all duration-700"
          style={{ animationDelay: `${i * delay}ms` }}
        >
          {el}{animateBy === "words" && i < elements.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
