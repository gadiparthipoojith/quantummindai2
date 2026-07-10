"use client";

import { useEffect, useRef } from "react";

export function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle system for upward floating lights
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      alpha: number;
      isBright: boolean;
    }
    const particles: Particle[] = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      speedY: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.1,
      isBright: Math.random() > 0.8,
    }));

    // Grid properties
    let time = 0;
    const gridSpacing = 70;
    const horizonY = height * 0.45;
    const fov = 400;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      time += 1.2;

      // Draw Perspective Grid (Circuit Landscape)
      ctx.lineWidth = 1.2;

      // Horizontal lines moving forward
      for (let z = 10; z < 1200; z += gridSpacing) {
        let currentZ = z - (time % gridSpacing);
        if (currentZ < 10) continue;

        const scale = fov / currentZ;
        const y = horizonY + 180 * scale;

        if (y > horizonY && y < height) {
          const alpha = Math.min(1, (1200 - currentZ) / 900) * 0.4;
          ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`; // Sky Blue
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Vertical lines spreading from center
      const numVerticalLines = 40;
      for (let i = -numVerticalLines; i <= numVerticalLines; i++) {
        const xOffset = i * 60;
        ctx.beginPath();
        
        // Far point (horizon)
        const zFar = 1200;
        const scaleFar = fov / zFar;
        const xFar = width / 2 + xOffset * scaleFar;
        const yFar = horizonY + 180 * scaleFar;
        
        // Near point
        const zNear = 10;
        const scaleNear = fov / zNear;
        const xNear = width / 2 + xOffset * scaleNear;
        const yNear = horizonY + 180 * scaleNear;

        // Gradient for fading vertical lines
        const grad = ctx.createLinearGradient(xFar, yFar, xNear, yNear);
        grad.addColorStop(0, "rgba(14, 165, 233, 0)");
        grad.addColorStop(0.3, "rgba(14, 165, 233, 0.15)");
        grad.addColorStop(1, "rgba(14, 165, 233, 0.6)");

        ctx.strokeStyle = grad;
        ctx.moveTo(xFar, yFar);
        ctx.lineTo(xNear, yNear);
        ctx.stroke();
        
        // Draw glowing nodes at intersections for a few lines
        if (Math.abs(i) % 3 === 0) {
          for (let z = 50; z < 800; z += gridSpacing * 2) {
             let nodeZ = z - (time % (gridSpacing * 2));
             if (nodeZ < 15) continue;
             
             const nodeScale = fov / nodeZ;
             const nodeX = width / 2 + xOffset * nodeScale;
             const nodeY = horizonY + 180 * nodeScale;
             
             const nodeAlpha = Math.min(1, (800 - nodeZ) / 600) * 0.8;
             ctx.beginPath();
             ctx.arc(nodeX, nodeY, 2.5 * nodeScale, 0, Math.PI * 2);
             ctx.fillStyle = `rgba(14, 165, 233, ${nodeAlpha})`;
             ctx.fill();
          }
        }
      }

      // Draw floating particles (Seafoam Green & Sky Blue Mix)
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (p.isBright) {
           ctx.fillStyle = `rgba(0, 245, 212, ${p.alpha})`; // Seafoam green
           ctx.shadowBlur = 12;
           ctx.shadowColor = "rgba(0, 245, 212, 0.9)";
        } else {
           ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`; // Sky blue
           ctx.shadowBlur = 8;
           ctx.shadowColor = "rgba(14, 165, 233, 0.6)";
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80 mix-blend-screen" />
      
      {/* Central Pulsating Light from Horizon */}
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-core/15 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      
      {/* Vertical Light Beam */}
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-[80%] w-[120px] h-[700px] bg-cyan-pulse/10 blur-[60px] rounded-full pointer-events-none" />
    </div>
  );
}
