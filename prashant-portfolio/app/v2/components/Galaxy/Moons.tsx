"use client";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { TECH_MOONS, getTechColor } from "./utils/constants";

/**
 * Dynamic Tech Stack Moons
 * Each moon represents a technology with color-coded category:
 * - Blue: Frontend (React, Angular)
 * - Orange: Backend (.NET, Node)
 * - Purple: Cloud (Azure, AWS)
 * - Green: Database (SQL, Mongo)
 * - Yellow: Tools (Docker, Vite)
 */
export default function Moons({ planetName, planetSize = 1 }: { planetName: string; planetSize?: number }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  const techMoons = TECH_MOONS[planetName] ?? [];

  useFrame((_, delta) => {
    t.current += delta;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const tech = techMoons[i];
      if (!tech) return;
      const ang = t.current * tech.speed;
      const x = Math.cos(ang) * (planetSize + tech.radius);
      const z = Math.sin(ang) * (planetSize + tech.radius);
      child.position.set(x, 0, z);
      // Gentle self-rotation
      child.rotation.y += delta * 0.5;
    });
  });

  if (techMoons.length === 0) return null;

  return (
    <group ref={group}>
      {techMoons.map((tech) => (
        <TechMoon key={tech.name} tech={tech} />
      ))}
    </group>
  );
}

function TechMoon({ tech }: { tech: { name: string; category: string; size: number } }) {
  const [hovered, setHovered] = useState(false);
  type TechCat = "frontend" | "backend" | "cloud" | "database" | "tool";
  const color = getTechColor(tech.category as TechCat);

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
      <sphereGeometry args={[tech.size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.7}
        metalness={0.3}
        roughness={0.4}
      />

      {/* Glowing halo */}
      <mesh scale={1.4}>
        <sphereGeometry args={[tech.size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.25 : 0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Tooltip on hover */}
      {hovered && (
        <Html
          position={[0, tech.size + 0.3, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div
            className="px-2 py-1 rounded bg-black/90 border text-xs font-medium whitespace-nowrap shadow-lg"
            style={{
              borderColor: color,
              color: color,
              boxShadow: `0 0 12px ${color}40`,
            }}
          >
            {tech.name}
          </div>
        </Html>
      )}
    </mesh>
  );
}
