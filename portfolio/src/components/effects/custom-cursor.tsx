"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea");
      if (cursorRef.current) {
        cursorRef.current.style.transform = interactive
          ? "translate(-50%, -50%) scale(2)"
          : "translate(-50%, -50%) scale(1)";
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Background tracking spotlight highlight aura */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[600px] w-[600px] rounded-full bg-violet-core/5 blur-[120px] md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-8 w-8 rounded-full border border-violet-core/50 bg-violet-core/10 mix-blend-difference md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-cyan-pulse md:block"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
