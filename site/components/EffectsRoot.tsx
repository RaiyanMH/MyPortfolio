"use client";

import { useEffect } from "react";

export default function EffectsRoot() {
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      document.documentElement.style.setProperty("--pointer-x", x);
      document.documentElement.style.setProperty("--pointer-y", y);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler as any);
  }, []);
  return null;
}


