"use client";

import React, { useState, useEffect } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  characters?: string;
}

export function DecryptedText({
  text,
  speed = 35,
  maxIterations = 10,
  className = "",
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);

  useEffect(() => {
    let iteration = 0;
    const totalSteps = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " ") return " ";
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= totalSteps) {
        clearInterval(interval);
      }
      iteration += 1;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, characters]);

  return <span className={className}>{displayText}</span>;
}
