"use client";

import React, { useRef, useEffect } from "react";

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: string;
  hoverFillColor?: string;
  squareSize?: number;
  className?: string;
}

export function Squares({
  direction = "right",
  speed = 0.5,
  borderColor = "rgba(245, 158, 11, 0.08)",
  hoverFillColor = "rgba(245, 158, 11, 0.15)",
  squareSize = 40,
  className = "",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare.current &&
            Math.floor(hoveredSquare.current.x / squareSize) === Math.floor(squareX / squareSize) &&
            Math.floor(hoveredSquare.current.y / squareSize) === Math.floor(squareY / squareSize)
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const moveSpeed = speed;
      if (direction === "right") gridOffset.current.x += moveSpeed;
      if (direction === "left") gridOffset.current.x -= moveSpeed;
      if (direction === "down") gridOffset.current.y += moveSpeed;
      if (direction === "up") gridOffset.current.y -= moveSpeed;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoveredSquare.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className={`w-full h-full pointer-events-auto ${className}`} />;
}
