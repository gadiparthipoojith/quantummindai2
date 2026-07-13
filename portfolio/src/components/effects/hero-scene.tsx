"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function WaveField() {
  const ref = useRef<THREE.Points>(null);
  
  const count = 10000;
  const SEPARATION = 0.4;
  const AMOUNTX = 100;
  const AMOUNTY = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        pos[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
        pos[i + 1] = 0; // y (will be animated)
        pos[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
        i += 3;
      }
    }
    return pos;
  }, [count, AMOUNTX, AMOUNTY, SEPARATION]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Add a beautiful sine wave motion to the Y axis
          positions[i + 1] = (Math.sin((ix + time * 2) * 0.3) * 1) +
                             (Math.sin((iy + time * 2) * 0.5) * 1);
          i += 3;
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.y = time * 0.05;
      ref.current.rotation.z = 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6" // violet-core
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 4, 12], fov: 60 }}>
        <Suspense fallback={null}>
          <WaveField />
        </Suspense>
      </Canvas>
    </div>
  );
}
