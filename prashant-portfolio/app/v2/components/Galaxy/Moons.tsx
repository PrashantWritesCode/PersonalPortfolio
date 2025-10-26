"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MOONS } from "./utils/constants";

export default function Moons({ planetName, planetSize = 1 }: { planetName: string; planetSize?: number }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  const moons = MOONS[planetName] ?? [];

  useFrame((_, delta) => {
    t.current += delta;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const cfg = moons[i];
      if (!cfg) return;
      const ang = t.current * cfg.speed;
      const x = Math.cos(ang) * (planetSize + cfg.radius);
      const z = Math.sin(ang) * (planetSize + cfg.radius);
      child.position.set(x, 0, z);
      child.rotation.y += 0.01;
    });
  });

  if (moons.length === 0) return null;

  return (
    <group ref={group}>
      {moons.map((m) => (
        <mesh key={m.name}>
          <sphereGeometry args={[m.size ?? 0.08, 16, 16]} />
          <meshStandardMaterial color={m.color ?? "#f3c77b"} emissive={m.color ?? "#f3c77b"} emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}
