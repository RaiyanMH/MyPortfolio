"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  color?: string; // particle color
  linkColor?: string; // optional link line color
};

export default function ParticlesBackground({ className, color = "#8b5cf6", linkColor = "#7e22ce" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let disposed = false;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const maxParticles = 120; // keep light
    const linkDistance = 120;

    function resize() {
      const { clientWidth, clientHeight } = canvas.parentElement || canvas;
      canvas.width = Math.floor(clientWidth * DPR);
      canvas.height = Math.floor(clientHeight * DPR);
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
    }

    function init() {
      particles.length = 0;
      const width = canvas.width;
      const height = canvas.height;
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3 * DPR,
          vy: (Math.random() - 0.5) * 0.3 * DPR,
          r: (Math.random() * 1.5 + 0.5) * DPR,
        });
      }
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw links first (thin, subtle)
      ctx.lineWidth = 0.8 * DPR;
      ctx.strokeStyle = hexToRgba(linkColor, 0.12);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance * DPR) {
            const alpha = 1 - dist / (linkDistance * DPR);
            ctx.globalAlpha = Math.max(0, Math.min(0.35, alpha));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // draw particles (soft glow)
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6 * p.r);
        grd.addColorStop(0, hexToRgba(color, 0.9));
        grd.addColorStop(1, hexToRgba(color, 0));
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!disposed) animationFrame = requestAnimationFrame(step);
    }

    function onResize() {
      resize();
      init();
    }

    resize();
    init();
    step();

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement || canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      ro.disconnect();
    };
  }, [color, linkColor]);

  return <canvas ref={canvasRef} className={className} />;
}

function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}


