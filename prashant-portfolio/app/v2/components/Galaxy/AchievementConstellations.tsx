"use client";
import { useMemo, useEffect, useState, useRef } from "react";
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
  const animatedGeom = useRef<THREE.BufferGeometry>(null);
  const drawStartedAt = useRef<number | null>(null);

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

  // Animated draw line (THREE.Line) using drawRange
  const animatedLine = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(linePoints.length * 3);
    linePoints.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setDrawRange(0, 2); // start minimal
    const mat = new THREE.LineBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const line = new THREE.Line(geom, mat);
    return { geom, line, mat };
  }, [linePoints, config.color]);

  const animatedMatRef = useRef<THREE.LineBasicMaterial | null>(null);

  // Kick off draw animation once constellation becomes visible
  useEffect(() => {
    // link the geometry ref for drawRange updates
    animatedGeom.current = animatedLine.geom;
    animatedMatRef.current = animatedLine.mat;
  }, [animatedLine]);

  useFrame(({ clock }) => {
    if (!animatedGeom.current) return;
    const geom = animatedGeom.current;
    if (opacity <= 0.01) {
      // reset if hidden
      drawStartedAt.current = null;
      geom.setDrawRange(0, 2);
      return;
    }
    if (drawStartedAt.current == null) {
      drawStartedAt.current = clock.elapsedTime;
    }
    const elapsed = clock.elapsedTime - drawStartedAt.current;
    const duration = 4.0; // 4 seconds
    const progress = Math.min(elapsed / duration, 1);
    // EaseOutCubic for drawing
    const eased = 1 - Math.pow(1 - progress, 3);
    const totalVertices = geom.getAttribute("position").count;
    const drawVertices = Math.max(2, Math.floor(totalVertices * eased));
    geom.setDrawRange(0, drawVertices);
    // update material opacity softly
    if (animatedMatRef.current) {
      animatedMatRef.current.opacity = Math.min(opacity * 0.85, 0.9) * (0.6 + 0.4 * twinkle);
    }
  });

  return (
    <group rotation={[0.2, 0.3, 0]}>
      {/* Star points */}
      <points geometry={starGeometry} material={starMaterial} />

      {/* Faint static glow line (fat line via drei) */}
      <Line
        points={linePoints}
        color={config.color}
        lineWidth={1.5}
        transparent
        opacity={finalLineOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />

      {/* Animated draw overlay using THREE.Line with drawRange */}
      <primitive object={animatedLine.line} />

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
