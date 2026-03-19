"use client";

import { useEffect, useState } from "react";

interface GhostMascotProps {
  size?: number;
  color?: string;
  animate?: boolean;
  variant?: "idle" | "shuffle" | "success" | "fly";
}

export default function GhostMascot({
  size = 48,
  color = "#FF007F",
  animate = true,
  variant = "idle",
}: GhostMascotProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => setFrame((f) => (f + 1) % 2), 600);
    return () => clearInterval(interval);
  }, [animate]);

  // Pixel ghost as inline SVG — hand-crafted 16×16 grid
  const ghostPixels = [
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,0,0,1,1,1,1,0,0,1,1],
    [1,1,0,0,1,1,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,2,2,1,1,1,1,2,2,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    // wavy bottom
    ...(frame === 0
      ? [
          [1,1,1,0,1,1,1,1,0,1,1,1],
          [1,1,0,0,0,1,1,0,0,0,1,1],
        ]
      : [
          [1,1,0,1,1,1,1,1,1,0,1,1],
          [1,0,0,0,1,1,1,1,0,0,0,1],
        ]),
  ];

  const px = size / 12;
  const eyeColor = variant === "success" ? "#00FF88" : "#F8F8FF";

  const animClass =
    variant === "shuffle"
      ? "animate-bounce"
      : variant === "fly"
      ? "animate-[flyAcross_1.5s_ease-in-out_infinite]"
      : variant === "success"
      ? "animate-[popUp_0.4s_ease-out]"
      : animate
      ? "animate-[float_2s_ease-in-out_infinite]"
      : "";

  return (
    <div
      className={`inline-block ${animClass}`}
      style={{ width: size, height: size * 0.9, imageRendering: "pixelated" }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${12 * px} ${11 * px}`}
        width={size}
        height={size * 0.9}
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        {ghostPixels.map((row, y) =>
          row.map((cell, x) => {
            if (!cell) return null;
            const fill = cell === 2 ? eyeColor : color;
            return (
              <rect
                key={`${x}-${y}`}
                x={x * px}
                y={y * px}
                width={px}
                height={px}
                fill={fill}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}
