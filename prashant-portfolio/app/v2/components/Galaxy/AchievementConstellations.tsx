"use client";
import { useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { useGalaxyStore } from "../../state/galaxyStore";
import { CONSTELLATION_PATTERNS } from "./utils/constants";

type ConstellationConfig = {
  name: string;
  title: string;
  requiredVisits: number;
  points: readonly THREE.Vector3[];
  color: string;
};

const CONSTELLATIONS: ConstellationConfig[] = [
  {
    name: "innovator",
    title: "Innovator",
    requiredVisits: 3,
    points: CONSTELLATION_PATTERNS.innovator,
    color: "#f7d78a",
  },
  {
    name: "architect",
    title: "Architect",
    requiredVisits: 5,
    points: CONSTELLATION_PATTERNS.architect,
    color: "#f7d78a",
  },
  {
    name: "visionary",
    title: "Visionary",
    requiredVisits: 7,
    points: CONSTELLATION_PATTERNS.visionary,
    color: "#f7d78a",
  },
];

/**
 * Individual Constellation Component
 * Renders stars as Points and connecting lines with fade-in animation
 */
function Constellation({
  config,
  opacity,
}: {
  config: ConstellationConfig;
  opacity: number;
}) {
  const [twinkle, setTwinkle] = useState(1);

  // Gentle twinkling effect using sine wave
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = 0.7 + 0.3 * Math.sin(t * 0.8 + config.requiredVisits);
    setTwinkle(pulse);
  });

  // Memoized star geometry (performance optimization)
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(config.points.length * 3);
    
    config.points.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [config.points]);

  // Memoized star material
  const starMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: config.color,
      size: 0.04,
      transparent: true,
      opacity: opacity * twinkle,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, [config.color, opacity, twinkle]);

  // Memoized line path (closed loop)
  const linePoints = useMemo(() => {
    const points = [...config.points];
    points.push(config.points[0]); // Close the constellation
    return points;
  }, [config.points]);

  const finalLineOpacity = Math.min(opacity * 0.3 * twinkle, 0.3);

  return (
    <group rotation={[0.2, 0.3, 0]}>
      {/* Star points */}
      <points geometry={starGeometry} material={starMaterial} />

      {/* Connecting lines */}
      <Line
        points={linePoints}
        color={config.color}
        lineWidth={1.5}
        transparent
        opacity={finalLineOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />

      {/* Achievement label (only when fully visible) */}
      {opacity > 0.8 && (
        <ConstellationLabel config={config} opacity={opacity * twinkle} />
      )}
    </group>
  );
}

/**
 * Constellation Label Component
 */
function ConstellationLabel({
  config,
  opacity,
}: {
  config: ConstellationConfig;
  opacity: number;
}) {
  // Calculate center point of constellation
  const center = useMemo(() => {
    const sum = config.points.reduce(
      (acc, point) => acc.add(point.clone()),
      new THREE.Vector3()
    );
    return sum.divideScalar(config.points.length);
  }, [config.points]);

  return (
    <Html position={center} center style={{ pointerEvents: "none" }}>
      <div
        className="px-3 py-1.5 rounded-lg border font-semibold text-xs whitespace-nowrap backdrop-blur-sm"
        style={{
          borderColor: config.color,
          color: config.color,
          background: `rgba(10, 10, 10, ${opacity * 0.7})`,
          boxShadow: `0 0 16px ${config.color}50`,
          opacity: opacity,
          textShadow: `0 0 6px ${config.color}`,
        }}
      >
        ✨ {config.title}
      </div>
    </Html>
  );
}

/**
 * Achievement Constellations System
 * 
 * Reveals golden constellation patterns as users explore planets:
 * - 3 planets → "Innovator" 
 * - 5 planets → "Architect"
 * - 7 planets → "Visionary"
 * 
 * Features:
 * - 5 second fade-in animation
 * - Gentle twinkling effect
 * - Additive blending for ethereal glow
 * - Positioned deep in background (z: -150)
 * - Memoized geometries for performance
 */
export default function AchievementConstellations() {
  const visitedPlanets = useGalaxyStore((s) => s.visitedPlanets);
  const [activeConstellations, setActiveConstellations] = useState<Set<string>>(new Set());
  const [opacities, setOpacities] = useState<Record<string, number>>({});

  const visitCount = visitedPlanets.size;

  // Check for newly unlocked constellations
  useEffect(() => {
    CONSTELLATIONS.forEach((constellation) => {
      if (
        visitCount >= constellation.requiredVisits &&
        !activeConstellations.has(constellation.name)
      ) {
        // Activate new constellation
        setActiveConstellations((prev) => new Set([...prev, constellation.name]));
        
        // Animate fade-in over 5 seconds
        const startTime = Date.now();
        const duration = 5000;
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease-out cubic for smooth fade-in
          const eased = 1 - Math.pow(1 - progress, 3);
          
          setOpacities((prev) => ({
            ...prev,
            [constellation.name]: eased,
          }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      }
    });
  }, [visitCount, activeConstellations]);

  // Only render active constellations (performance optimization)
  const activeList = useMemo(() => {
    return CONSTELLATIONS.filter((c) => activeConstellations.has(c.name));
  }, [activeConstellations]);

  if (activeList.length === 0) return null;

  return (
    <group>
      {activeList.map((constellation) => (
        <Constellation
          key={constellation.name}
          config={constellation}
          opacity={opacities[constellation.name] ?? 0}
        />
      ))}
    </group>
  );
}
