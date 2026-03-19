"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Arcade background — floating ghosts, twinkling stars, falling dots.
 * Renders via createPortal(document.body) so layout (e.g. body flex) never
 * collapses the layer; keyframes are injected once into document.head so they
 * are independent of Tailwind / import order in globals.css.
 */

const STYLE_ID = "ghosty-arcade-bg-keyframes";

const KEYFRAMES_CSS = `
@keyframes ghosty_arcade_twinkle {
  0%, 100% { opacity: 0.08; transform: translateY(0) scale(1); }
  30%      { opacity: 0.45; transform: translateY(-2px) scale(1.3); }
  50%      { opacity: 0.55; transform: translateY(-3px) scale(1.5); }
  70%      { opacity: 0.35; transform: translateY(-1px) scale(1.2); }
}

@keyframes ghosty_arcade_ghost_drift {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(3px, -8px); }
  50%  { transform: translate(6px, -18px); }
  70%  { transform: translate(-2px, -10px); }
  100% { transform: translate(0, 0); }
}

@keyframes ghosty_arcade_dot_fall {
  0%   { transform: translateY(-10px); opacity: 0; }
  10%  { opacity: 0.4; }
  50%  { opacity: 0.25; }
  90%  { opacity: 0.35; }
  100% { transform: translateY(calc(100vh + 10px)); opacity: 0; }
}
`;

function MiniGhost({ size, color }: { size: number; color: string }) {
  const px = size / 12;
  const rows = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  ];

  const rects: React.JSX.Element[] = [];
  rows.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (!cell) return;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x * px}
          y={y * px}
          width={px}
          height={px}
          fill={cell === 2 ? "#F8F8FF" : color}
        />
      );
    })
  );

  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox={`0 0 ${12 * px} ${11 * px}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", display: "block" }}
    >
      {rects}
    </svg>
  );
}

export default function ArcadeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const node = document.createElement("style");
      node.id = STYLE_ID;
      node.textContent = KEYFRAMES_CSS;
      document.head.appendChild(node);
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const layer = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <div style={{ position: "absolute", top: "8%", left: "5%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 3s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 4s ease-in-out infinite 1.2s" }} />
      <div style={{ position: "absolute", top: "45%", left: "8%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 3.5s ease-in-out infinite 2s" }} />
      <div style={{ position: "absolute", top: "65%", left: "12%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 2.8s ease-in-out infinite 0.5s" }} />
      <div style={{ position: "absolute", top: "85%", left: "4%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 3.2s ease-in-out infinite 3s" }} />
      <div style={{ position: "absolute", top: "12%", right: "6%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 3.8s ease-in-out infinite 0.3s" }} />
      <div style={{ position: "absolute", top: "35%", right: "10%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 2.5s ease-in-out infinite 1.5s" }} />
      <div style={{ position: "absolute", top: "55%", right: "4%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 4.2s ease-in-out infinite 0.7s" }} />
      <div style={{ position: "absolute", top: "75%", right: "8%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 3s ease-in-out infinite 2.2s" }} />
      <div style={{ position: "absolute", top: "92%", right: "14%", width: 3, height: 3, background: "#FF007F", animation: "ghosty_arcade_twinkle 3.5s ease-in-out infinite 1s" }} />

      <div style={{ position: "absolute", top: "30%", left: "20%", width: 2, height: 2, background: "#00E5FF", animation: "ghosty_arcade_twinkle 5s ease-in-out infinite 0.8s" }} />
      <div style={{ position: "absolute", top: "70%", left: "18%", width: 2, height: 2, background: "#00E5FF", animation: "ghosty_arcade_twinkle 4.5s ease-in-out infinite 2.5s" }} />
      <div style={{ position: "absolute", top: "25%", right: "18%", width: 2, height: 2, background: "#00E5FF", animation: "ghosty_arcade_twinkle 4s ease-in-out infinite 1.8s" }} />
      <div style={{ position: "absolute", top: "60%", right: "20%", width: 2, height: 2, background: "#00E5FF", animation: "ghosty_arcade_twinkle 5.5s ease-in-out infinite 3s" }} />

      <div style={{ position: "absolute", top: "15%", left: "2%", opacity: 0.15, animation: "ghosty_arcade_ghost_drift 7s ease-in-out infinite" }}>
        <MiniGhost size={22} color="#FF007F" />
      </div>
      <div style={{ position: "absolute", top: "50%", left: "4%", opacity: 0.15, animation: "ghosty_arcade_ghost_drift 8s ease-in-out infinite 2.5s" }}>
        <MiniGhost size={18} color="#00E5FF" />
      </div>
      <div style={{ position: "absolute", top: "80%", left: "1%", opacity: 0.15, animation: "ghosty_arcade_ghost_drift 6s ease-in-out infinite 1s" }}>
        <MiniGhost size={20} color="#7B00FF" />
      </div>

      <div style={{ position: "absolute", top: "22%", right: "2%", opacity: 0.15, animation: "ghosty_arcade_ghost_drift 8.5s ease-in-out infinite 1.5s" }}>
        <MiniGhost size={20} color="#FFD700" />
      </div>
      <div style={{ position: "absolute", top: "58%", right: "3%", opacity: 0.15, animation: "ghosty_arcade_ghost_drift 7s ease-in-out infinite 3s" }}>
        <MiniGhost size={22} color="#FF007F" />
      </div>
      <div style={{ position: "absolute", top: "85%", right: "1%", opacity: 0.15, animation: "ghosty_arcade_ghost_drift 6.5s ease-in-out infinite 0.5s" }}>
        <MiniGhost size={18} color="#00E5FF" />
      </div>

      <div style={{ position: "absolute", top: "0%", left: "3%", width: 3, height: 3, borderRadius: "50%", background: "#FF007F", animation: "ghosty_arcade_dot_fall 8s linear infinite" }} />
      <div style={{ position: "absolute", top: "0%", left: "9%", width: 2, height: 2, borderRadius: "50%", background: "#FFD700", animation: "ghosty_arcade_dot_fall 11s linear infinite 2s" }} />
      <div style={{ position: "absolute", top: "0%", left: "16%", width: 3, height: 3, borderRadius: "50%", background: "#00E5FF", animation: "ghosty_arcade_dot_fall 9s linear infinite 4.5s" }} />
      <div style={{ position: "absolute", top: "0%", left: "22%", width: 2, height: 2, borderRadius: "50%", background: "#FF007F", animation: "ghosty_arcade_dot_fall 13s linear infinite 1s" }} />
      <div style={{ position: "absolute", top: "0%", right: "4%", width: 3, height: 3, borderRadius: "50%", background: "#FFD700", animation: "ghosty_arcade_dot_fall 10s linear infinite 3s" }} />
      <div style={{ position: "absolute", top: "0%", right: "11%", width: 2, height: 2, borderRadius: "50%", background: "#7B00FF", animation: "ghosty_arcade_dot_fall 12s linear infinite 5.5s" }} />
      <div style={{ position: "absolute", top: "0%", right: "18%", width: 3, height: 3, borderRadius: "50%", background: "#00E5FF", animation: "ghosty_arcade_dot_fall 9.5s linear infinite 7s" }} />
      <div style={{ position: "absolute", top: "0%", right: "24%", width: 2, height: 2, borderRadius: "50%", background: "#FFD700", animation: "ghosty_arcade_dot_fall 14s linear infinite 0.5s" }} />
      <div style={{ position: "absolute", top: "0%", left: "30%", width: 2, height: 2, borderRadius: "50%", background: "#FF007F", animation: "ghosty_arcade_dot_fall 11.5s linear infinite 6s" }} />
      <div style={{ position: "absolute", top: "0%", right: "30%", width: 2, height: 2, borderRadius: "50%", background: "#7B00FF", animation: "ghosty_arcade_dot_fall 10.5s linear infinite 8s" }} />
    </div>
  );

  return createPortal(layer, document.body);
}
