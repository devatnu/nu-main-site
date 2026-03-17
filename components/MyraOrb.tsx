"use client";

import { useEffect, useRef } from "react";

type OrbState = "idle" | "listening" | "thinking" | "speaking";

interface MyraOrbProps {
  state?: OrbState;
  size?: number;
  onClick?: () => void;
}

const COLORS: Record<OrbState, string[]> = {
  idle:      ["#A78BFA", "#4755E3", "#1E2029", "#C4B5FD"],
  listening: ["#C4B5FD", "#A78BFA", "#6D52F4", "#E0D9FF"],
  thinking:  ["#4755E3", "#1E2029", "#A78BFA", "#080B14"],
  speaking:  ["#A78BFA", "#C4B5FD", "#7C6FF7", "#EDE9FE"],
};

const SPEEDS: Record<OrbState, number> = {
  idle: 0.003, listening: 0.008, thinking: 0.012, speaking: 0.006,
};

const MORPH: Record<OrbState, number> = {
  idle: 0.04, listening: 0.08, thinking: 0.06, speaking: 0.10,
};

export default function MyraOrb({ state = "idle", size = 120, onClick }: MyraOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const stateRef = useRef(state);

  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;

    function blobRadius(angle: number, t: number, s: OrbState): number {
      const m = MORPH[s];
      const morphScale = Math.sin(t * 0.5) * 0.5 + 0.5;
      return r * (
        1 +
        m * Math.sin(3 * angle + t * 1.3) +
        m * 0.7 * Math.sin(5 * angle - t * 0.9) +
        m * 0.4 * Math.sin(7 * angle + t * 0.7) +
        morphScale * 0.02 * Math.sin(2 * angle + t)
      );
    }

    function drawBlob(t: number) {
      const s = stateRef.current;
      const c = COLORS[s];
      const morphScale = Math.sin(t * 0.5) * 0.5 + 0.5;

      ctx.clearRect(0, 0, size, size);

      // Outer glow
      for (let g = 3; g >= 1; g--) {
        const glowR = r * (1.4 + g * 0.25) + morphScale * 6;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        grd.addColorStop(0, `${c[0]}18`);
        grd.addColorStop(0.5, `${c[1]}10`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Blob shape
      const pts = 128;
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const angle = (i / pts) * Math.PI * 2;
        const rad = blobRadius(angle, t, s);
        const x = cx + rad * Math.cos(angle);
        const y = cy + rad * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Animated gradient fill
      const gx = cx + Math.cos(t * 0.4) * r * 0.3;
      const gy = cy + Math.sin(t * 0.3) * r * 0.3;
      const grad = ctx.createRadialGradient(gx, gy, 0, cx, cy, r * 1.1);
      grad.addColorStop(0, c[3]);
      grad.addColorStop(0.35, c[0]);
      grad.addColorStop(0.7, c[1]);
      grad.addColorStop(1, c[2]);
      ctx.fillStyle = grad;
      ctx.fill();

      // Shimmer
      const sx = cx + Math.cos(t * 0.6) * r * 0.2;
      const sy = cy + Math.sin(t * 0.5) * r * 0.2 - r * 0.1;
      const shimmer = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 0.5);
      shimmer.addColorStop(0, "rgba(255,255,255,0.18)");
      shimmer.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shimmer;
      ctx.fill();

      // Thinking dots
      if (s === "thinking") {
        for (let d = 0; d < 3; d++) {
          const pulse = Math.sin(t * 4 + d * 1.2) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(cx + (d - 1) * 14, cy, 3 + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.5 + pulse * 0.5})`;
          ctx.fill();
        }
      }

      // Speaking rings
      if (s === "speaking") {
        for (let w = 0; w < 3; w++) {
          const wR = r * (1.1 + w * 0.2 + Math.sin((t * 2 + w * 0.8) % (Math.PI * 2)) * 0.1);
          ctx.beginPath();
          ctx.arc(cx, cy, wR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(196,181,253,${0.15 - w * 0.04})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Listening pulse
      if (s === "listening") {
        ctx.beginPath();
        ctx.arc(cx, cy, r * (1.15 + Math.sin(t * 3) * 0.08), 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(196,181,253,0.3)";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
    }

    function animate() {
      timeRef.current += SPEEDS[stateRef.current];
      drawBlob(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        cursor: onClick ? "pointer" : "default",
        filter: `drop-shadow(0 0 ${size * 0.15}px rgba(167,139,250,0.45))`,
      }}
    />
  );
}
