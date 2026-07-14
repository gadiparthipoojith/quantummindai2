"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      className={cn(
        "h-10 w-10 select-none transition-all duration-700 hover:scale-125 hover:rotate-6 filter drop-shadow-[0_0_12px_rgba(14,165,233,0.3)] hover:drop-shadow-[0_0_20px_rgba(0,245,212,0.6)]",
        className
      )}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dynamic Glow Defs */}
      <defs>
        {/* Main radial background glow */}
        <radialGradient id="highres-bg-glow" cx="50" cy="50" r="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" stopOpacity="0.25" />
          <stop offset="0.6" stopColor="#6366f1" stopOpacity="0.1" />
          <stop offset="1" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Outer Orbit track gradient */}
        <linearGradient id="highres-orbit-1" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#00f5d4" />
        </linearGradient>

        {/* Inner stylized Q loop gradient (Ultra HD color blend) */}
        <linearGradient id="highres-q-grad" x1="14" y1="14" x2="86" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="0.4" stopColor="#0ea5e9" />
          <stop offset="0.75" stopColor="#6366f1" />
          <stop offset="1" stopColor="#00f5d4" />
        </linearGradient>

        {/* Inner neural connection line gradient */}
        <linearGradient id="highres-line-grad" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="1" stopColor="#00f5d4" stopOpacity="0.8" />
        </linearGradient>

        {/* Core glow radial */}
        <radialGradient id="highres-core-glow" cx="50" cy="50" r="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00f5d4" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="1" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Large High-Res Background Aura */}
      <circle cx="50" cy="50" r="48" fill="url(#highres-bg-glow)" />

      {/* 2. Outer Scientific Calibration Tick Marks */}
      <g opacity="0.3" stroke="#38bdf8" strokeWidth="0.75">
        <line x1="50" y1="2" x2="50" y2="6" />
        <line x1="50" y1="94" x2="50" y2="98" />
        <line x1="2" y1="50" x2="6" y2="50" />
        <line x1="94" y1="50" x2="98" y2="50" />
      </g>

      {/* 3. Outer Concentric Dashed Quantum Ring */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#highres-orbit-1)"
        strokeWidth="1.25"
        strokeDasharray="3 6"
        opacity="0.45"
      />

      {/* 4. Second Dashed Intersecting Orbit Ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="url(#highres-orbit-1)"
        strokeWidth="1"
        strokeDasharray="12 4 4 4"
        opacity="0.6"
      />

      {/* 5. Precise HD "Q" Vector Loop Path */}
      <path
        d="M50 14 C 30.12 14, 14 30.12, 14 50 C 14 69.88, 30.12 86, 50 86 C 62.45 86, 73.34 79.67, 79.62 70.08 L 91.5 82 M 72 62 L 85.5 75.5"
        stroke="url(#highres-q-grad)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {/* 6. Glowing Inner Glass Core Grid lines */}
      <g opacity="0.75">
        <line x1="50" y1="50" x2="32" y2="32" stroke="url(#highres-line-grad)" strokeWidth="1.25" />
        <line x1="50" y1="50" x2="68" y2="32" stroke="url(#highres-line-grad)" strokeWidth="1.25" />
        <line x1="50" y1="50" x2="50" y2="72" stroke="url(#highres-line-grad)" strokeWidth="1.25" />
      </g>

      {/* 7. Neural Node Terminals */}
      <circle cx="32" cy="32" r="3.5" fill="#0ea5e9" filter="drop-shadow(0 0 4px #0ea5e9)" />
      <circle cx="68" cy="32" r="3.5" fill="#6366f1" filter="drop-shadow(0 0 4px #6366f1)" />
      <circle cx="50" cy="72" r="3.5" fill="#38bdf8" filter="drop-shadow(0 0 4px #38bdf8)" />

      {/* 8. Glowing Central Intelligence Nucleus (Core) */}
      <circle cx="50" cy="50" r="14" fill="url(#highres-core-glow)" />
      <circle cx="50" cy="50" r="5" fill="#00f5d4" filter="drop-shadow(0 0 6px #00f5d4)" />
    </svg>
  );
}
