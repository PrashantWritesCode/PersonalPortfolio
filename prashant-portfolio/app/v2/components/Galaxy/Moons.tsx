"use client";
import React, { useMemo, useRef, useState } from "react";
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
  const techMoons = useMemo(() => TECH_MOONS[planetName] ?? [], [planetName]);

  // Stable PRNG seeded by planetName to keep moon selection consistent
  const rng = useMemo(() => seededRng(planetName), [planetName]);

  // Select 2-4 moons deterministically and apply random speed/radius multipliers
  const moons = useMemo(() => {
    if (!techMoons.length) return [] as AugMoon[];
    const count = clampInt(Math.floor(rng() * 3) + 2, 2, Math.min(4, techMoons.length)); // 2..4
    const copy = [...techMoons];
    // Deterministic shuffle using rng
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    const selected = copy.slice(0, count);
    // Apply randomization
    return selected.map((m, idx) => {
      const speedMul = lerp(0.4, 0.9, rng());
      const radiusJitter = lerp(0.3, 0.8, rng());
      return {
        ...m,
        speed: (m.speed ?? 1) * speedMul,
        radius: (m.radius ?? 1) + radiusJitter + idx * 0.12, // small spacing to avoid overlap
      } as AugMoon;
    });
  }, [techMoons, rng]);

  useFrame((_, delta) => {
    t.current += delta;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const tech = moons[i];
      if (!tech) return;
      const ang = t.current * tech.speed;
      const x = Math.cos(ang) * (planetSize + tech.radius);
      const z = Math.sin(ang) * (planetSize + tech.radius);
      child.position.set(x, 0, z);
      // Gentle self-rotation
      child.rotation.y += delta * 0.5;
    });
  });

  if (moons.length === 0) return null;

  return (
    <group ref={group}>
      {moons.map((tech) => (
        <TechMoon key={tech.name} tech={tech} />
      ))}
    </group>
  );
}

type AugMoon = { name: string; category: string; size: number; speed: number; radius: number };

function TechMoon({ tech }: { tech: AugMoon }) {
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
        emissiveIntensity={hovered ? 1.2 : 0.8}
        metalness={0.3}
        roughness={0.4}
      />

      {/* Glowing halo */}
      <mesh scale={1.4}>
        <sphereGeometry args={[tech.size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.28 : 0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Always-visible floating label */}
      <Html position={[0, tech.size + 0.25, 0]} center style={{ pointerEvents: "none" }}>
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
          {tech.name}
        </div>
      </Html>

      {/* Tooltip on hover (enhanced) */}
      {hovered && (
        <Html position={[0, tech.size + 0.65, 0]} center style={{ pointerEvents: "none" }}>
          <div
            className="px-2 py-1 rounded bg-black/90 border text-xs font-medium whitespace-nowrap shadow-lg"
            style={{ borderColor: color, color, boxShadow: `0 0 12px ${color}40` }}
          >
            {tech.name}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// --- utils ---
function seededRng(seed: string) {
  // xmur3 hash to 32-bit then mulberry32 PRNG
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  h ^= h >>> 16;
  let a = h >>> 0;
  return function () {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clampInt(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.floor(v)));
}
