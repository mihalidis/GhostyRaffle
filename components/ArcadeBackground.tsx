"use client";

import React from "react";
import styles from "./ArcadeBackground.module.css";

/**
 * Arcade background — floating ghosts, twinkling stars, falling dots.
 * Styles live in CSS Module (no inline style=) for strict CSP (style-src nonce
 * does not apply to element style attributes).
 */

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

  const w = size;
  const h = size * 0.9;

  return (
    <svg
      className={styles.miniGhostSvg}
      width={w}
      height={h}
      viewBox={`0 0 ${12 * px} ${11 * px}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {rects}
    </svg>
  );
}

export default function ArcadeBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.starT8} />
      <div className={styles.starT20} />
      <div className={styles.starT45} />
      <div className={styles.starT65} />
      <div className={styles.starT85} />
      <div className={styles.starTR12} />
      <div className={styles.starTR35} />
      <div className={styles.starTR55} />
      <div className={styles.starTR75} />
      <div className={styles.starTR92} />

      <div className={styles.cyan30} />
      <div className={styles.cyan70} />
      <div className={styles.cyanTR25} />
      <div className={styles.cyanTR60} />

      <div className={styles.ghostL1}>
        <MiniGhost size={22} color="#FF007F" />
      </div>
      <div className={styles.ghostL2}>
        <MiniGhost size={18} color="#00E5FF" />
      </div>
      <div className={styles.ghostL3}>
        <MiniGhost size={20} color="#7B00FF" />
      </div>

      <div className={styles.ghostR1}>
        <MiniGhost size={20} color="#FFD700" />
      </div>
      <div className={styles.ghostR2}>
        <MiniGhost size={22} color="#FF007F" />
      </div>
      <div className={styles.ghostR3}>
        <MiniGhost size={18} color="#00E5FF" />
      </div>

      <div className={styles.dotPink3} />
      <div className={styles.dotGold9} />
      <div className={styles.dotCyan16} />
      <div className={styles.dotPink22} />
      <div className={styles.dotGoldR4} />
      <div className={styles.dotPurpR11} />
      <div className={styles.dotCyanR18} />
      <div className={styles.dotGoldR24} />
      <div className={styles.dotPink30} />
      <div className={styles.dotPurpR30} />
    </div>
  );
}
