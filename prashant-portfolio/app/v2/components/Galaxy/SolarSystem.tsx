"use client";
import React, { useRef, useEffect } from "react";
import { Line, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Planet from "../Planet";
import Moons from "./Moons";
import AnimatedStarfield from "./AnimatedStarfield";
import { PLANETS } from "./utils/constants";
import { useGalaxyStore } from "../../state/galaxyStore";

function OrbitRing({ radius, color, tiltX = 0, tiltY = 0, tiltZ = 0 }: { radius: number; color: string; tiltX?: number; tiltY?: number; tiltZ?: number }) {
  const points = React.useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const steps = 256;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);
  const groupRef = useRef<THREE.Group>(null);
  React.useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = (tiltX * Math.PI) / 180;
    groupRef.current.rotation.y = (tiltY * Math.PI) / 180;
    groupRef.current.rotation.z = (tiltZ * Math.PI) / 180;
  }, [tiltX, tiltY, tiltZ]);
  return (
    <group ref={groupRef}>
      <Line points={points} color={color} lineWidth={2} transparent opacity={0.28} />
      <Line points={points.map((p) => p.clone().multiplyScalar(0.98))} color={color} lineWidth={1.5} transparent opacity={0.2} />
      <Line points={points.map((p) => p.clone().multiplyScalar(1.02))} color={color} lineWidth={1} transparent opacity={0.15} />
    </group>
  );
}

function OrbitingPlanet({
  cfg,
  isHovered,
  isSelected,
}: {
  cfg: typeof PLANETS[number];
  isHovered: boolean;
  isSelected: boolean;
}) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const planetGroupRef = useRef<THREE.Group>(null);
  const angleRef = useRef<number>(cfg.initialAngle);
  const selectPlanet = useGalaxyStore((s) => s.selectPlanet);
  const registerPlanetRef = useGalaxyStore((s) => s.registerPlanetRef);
  const setHovered = useGalaxyStore((s) => s.setHovered);
  const clearHovered = useGalaxyStore((s) => s.clearHovered);
  const setPointer = useGalaxyStore((s) => s.setPointer);

  useFrame((_, delta) => {
    angleRef.current += delta * cfg.speed;
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.x = (cfg.orbitTiltX * Math.PI) / 180;
      orbitGroupRef.current.rotation.y = (cfg.orbitTiltY * Math.PI) / 180;
      orbitGroupRef.current.rotation.z = (cfg.orbitTiltZ * Math.PI) / 180;
    }
    if (planetGroupRef.current) {
      const x = Math.cos(angleRef.current) * cfg.orbitRadius;
      const z = Math.sin(angleRef.current) * cfg.orbitRadius;
      planetGroupRef.current.position.set(x, 0, z);
    }
  });

  // Register this planet's group for camera tracking in the store
  useEffect(() => {
    registerPlanetRef(cfg.name, planetGroupRef.current);
    return () => registerPlanetRef(cfg.name, null);
  }, [cfg.name, registerPlanetRef]);

  const scaleTarget = isHovered ? 1.05 : 1;
  const glowBoost = isHovered ? 0.25 : 0;

  return (
    <group ref={orbitGroupRef}>
      <group
        ref={planetGroupRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(cfg.name, { x: e.clientX, y: e.clientY });
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          setPointer({ x: e.clientX, y: e.clientY });
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          clearHovered();
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectPlanet(cfg.name);
        }}
      >
        <Planet color={cfg.color} size={cfg.size} glowBoost={glowBoost} scaleTarget={scaleTarget}>
          {/* Planet label */}
          <Html position={[0, cfg.size + 0.45, 0]} center style={{ pointerEvents: "none" }}>
            <div className="text-xs md:text-sm px-2 py-1 rounded-md bg-black/60 border border-[#2a2a2a] text-[#f3c77b] shadow-[0_0_12px_rgba(212,154,67,0.25)]">
              {cfg.name}
            </div>
          </Html>
          {/* Render moons only when selected */}
          {isSelected && <Moons planetName={cfg.name} planetSize={cfg.size} />}
        </Planet>
      </group>
    </group>
  );
}

export default function SolarSystem() {
  const hoveredName = useGalaxyStore((s) => s.hoveredName);
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);

  return (
    <>
      {/* Central Sun at origin with warm emissive glow and soft pulse */}
      <Sun />

      {/* Animated starfield with useFrame rotation */}
      <AnimatedStarfield />

      {/* Lights and fog */}
      <ambientLight intensity={0.3} color="#f3c77b" />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#f3c77b" />
      <pointLight position={[15, 8, 10]} intensity={0.6} color="#d4af37" distance={25} decay={1.8} />
      <pointLight position={[-12, -8, -15]} intensity={0.4} color="#b8860b" distance={22} decay={2} />
      <directionalLight position={[-8, 6, -10]} intensity={0.3} color="#f3c77b" />
      <directionalLight position={[8, -6, -10]} intensity={0.2} color="#daa520" />
      <fog attach="fog" args={["#0a0a15", 18, 65]} />

      {/* Orbits + planets */}
      {PLANETS.map((p) => {
        const isHovered = hoveredName === p.name;
        const isSelected = selectedPlanet === p.name;
        return (
          <React.Fragment key={p.name}>
            <OrbitRing radius={p.orbitRadius} color={p.color} tiltX={p.orbitTiltX} tiltY={p.orbitTiltY} tiltZ={p.orbitTiltZ} />
            <OrbitingPlanet cfg={p} isHovered={isHovered} isSelected={isSelected} />
          </React.Fragment>
        );
      })}
    </>
  );
}

function Sun() {
  const coreRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const t = useRef(0);

  // Choose a size ~3x Earth to feel dominant but not occlude inner orbit
  const radius = 2.6;

  useFrame((_, delta) => {
    t.current += delta;
    const pulse = 0.85 + 0.15 * Math.sin(t.current * 1.2);
    if (matRef.current) matRef.current.emissiveIntensity = 1.2 * pulse;
    if (lightRef.current) lightRef.current.intensity = 2.2 * pulse; // warm light across system
    if (coronaRef.current) {
      const s = 1 + 0.02 * Math.sin(t.current * 0.9);
      coronaRef.current.scale.setScalar(s);
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.003; // slow orbital drift
      particlesRef.current.children.forEach((child: THREE.Object3D) => {
        const pts = child as THREE.Points;
        type UD = { baseOpacity: number; phase: number };
        const mat = pts.material as THREE.PointsMaterial & { userData: UD };
        if (mat && mat.userData) {
          const base = mat.userData.baseOpacity;
          const phase = mat.userData.phase;
          mat.opacity = THREE.MathUtils.clamp(base + 0.05 * Math.sin(t.current * 0.6 + phase), 0.04, 0.22);
        }
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>      
      {/* Emissive core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          ref={matRef}
          color="#1a1208"
          emissive="#f3c77b"
          emissiveIntensity={1.2}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Outer corona/halo for gradient look */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[radius * 1.18, 64, 64]} />
        <meshBasicMaterial
          color="#d49a43"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Particle corona using PointsMaterial - small golden points with slow orbit and subtle opacity breathing */}
      <group ref={particlesRef}>
        <CoronaPoints radius={radius} innerScale={1.15} outerScale={1.35} count={600} size={0.028} color="#f3c77b" baseOpacity={0.09} phase={0.8} />
        <CoronaPoints radius={radius} innerScale={1.25} outerScale={1.5} count={800} size={0.035} color="#d49a43" baseOpacity={0.12} phase={0.0} />
      </group>

      {/* Warm point light at core and soft ambient provided above */}
      <pointLight
        ref={lightRef}
        color="#f3c77b"
        position={[0, 0, 0]}
        intensity={2.2}
        distance={80}
        decay={1.8}
      />
    </group>
  );
}

function CoronaPoints({
  radius,
  innerScale,
  outerScale,
  count,
  size,
  color,
  baseOpacity,
  phase,
}: {
  radius: number;
  innerScale: number;
  outerScale: number;
  count: number;
  size: number;
  color: string;
  baseOpacity: number;
  phase: number;
}) {
  const geometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    // Deterministic PRNG to keep render pure
    let seed = 1234567;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = rnd() * Math.PI * 2;
      const r = radius * (innerScale + rnd() * (outerScale - innerScale));
      const y = (rnd() - 0.5) * (radius * 0.08); // slight vertical jitter
      positions[i * 3 + 0] = Math.cos(a) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [radius, innerScale, outerScale, count]);

  const material = React.useMemo(() => {
    const m = new THREE.PointsMaterial({
      color,
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity: baseOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    (m as unknown as THREE.PointsMaterial & { userData: { baseOpacity: number; phase: number } }).userData = { baseOpacity, phase };
    return m;
  }, [color, size, baseOpacity, phase]);

  return <points geometry={geometry} material={material} />;
}
