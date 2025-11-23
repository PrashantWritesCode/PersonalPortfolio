"use client";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { GeneratedMoon } from "./utils/planetGenerator";

/**
 * Dynamic Tech Stack Moons (Generated from Project Data)
 * Each moon represents a technology with color-coded category:
 * - #74C0FC: Frontend (React, Angular, Next.js)
 * - #FFB347: Backend (Node.js, .NET, Express)
 * - #B58FFF: Cloud (Azure, Vercel, Docker)
 * - #9FFFB0: Database (PostgreSQL, MongoDB, Redis)
 * - #FFD9A6: Architecture (Zustand, etc.)
 */
export default function Moons({ 
  moons
}: { 
  moons: GeneratedMoon[];
}) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);

  // Animate moons orbiting around the planet
  useFrame((_, delta) => {
    t.current += delta;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const moon = moons[i];
      if (!moon) return;
      // Calculate orbital angle with moon's initial radius offset and speed
      const ang = moon.radius + t.current * moon.speed;
      const x = Math.cos(ang) * moon.orbitRadius;
      const z = Math.sin(ang) * moon.orbitRadius;
      child.position.set(x, 0, z);
      // Gentle self-rotation
      child.rotation.y += delta * 0.5;
    });
  });

  if (moons.length === 0) return null;

  return (
    <group ref={group}>
      {moons.map((moon) => (
        <TechMoon key={moon.name} moon={moon} />
      ))}
    </group>
  );
}

function TechMoon({ moon }: { moon: GeneratedMoon }) {
  const [hovered, setHovered] = useState(false);
  const color = moon.color;

  return (
    <mesh
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <sphereGeometry args={[moon.size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.8}
        metalness={0.3}
        roughness={0.4}
      />

      {/* Glowing halo */}
      <mesh scale={1.4}>
        <sphereGeometry args={[moon.size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.28 : 0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Always-visible floating label */}
      <Html position={[0, moon.size + 0.25, 0]} center style={{ pointerEvents: "none" }}>
        <div
          className="px-1.5 py-0.5 rounded-md text-[10px] font-medium"
          style={{
            color,
            background: "rgba(10,10,10,0.65)",
            border: `1px solid ${color}40`,
            boxShadow: `0 0 10px ${color}30`,
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 180ms ease-out",
          }}
        >
          {moon.name}
        </div>
      </Html>

      {/* Tooltip on hover (enhanced) */}
      {hovered && (
        <Html position={[0, moon.size + 0.65, 0]} center style={{ pointerEvents: "none" }}>
          <div
            className="px-2 py-1 rounded bg-black/90 border text-xs font-medium whitespace-nowrap shadow-lg"
            style={{ borderColor: color, color, boxShadow: `0 0 12px ${color}40` }}
          >
            {moon.name} • {moon.category}
          </div>
        </Html>
      )}
    </mesh>
  );
}
