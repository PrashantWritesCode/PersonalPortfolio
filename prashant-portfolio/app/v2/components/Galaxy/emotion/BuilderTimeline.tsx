"use client";
import React, { useRef, useMemo, useState } from "react";
import { Line, Html, Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TIMELINE_MILESTONES } from "../../../data/timeline";
import { useGalaxyStore } from "../../../state/galaxyStore";

const ORBIT_RADIUS = 32;
const ROTATION_SPEED = (Math.PI * 2) / 90; // Full rotation in 90 seconds

export default function TimelineOrbit() {
  const groupRef = useRef<THREE.Group>(null);
  const guidedTourActive = useGalaxyStore((s) => s.guidedTourActive);

  // Create orbit ring points
  const orbitPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const steps = 256;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * ORBIT_RADIUS, 0, Math.sin(a) * ORBIT_RADIUS));
    }
    return pts;
  }, []);

  // Distribute milestones evenly around orbit
  const milestonePositions = useMemo(() => {
    return TIMELINE_MILESTONES.map((_, idx) => {
      const angle = (idx / TIMELINE_MILESTONES.length) * Math.PI * 2;
      return angle;
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * ROTATION_SPEED;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbit ring */}
      <Line
        points={orbitPoints}
        color="#f3c77b"
        lineWidth={1.5}
        transparent
        opacity={0.15}
      />

      {/* Milestone nodes */}
      {TIMELINE_MILESTONES.map((milestone, idx) => (
        <MilestoneNode
          key={milestone.id}
          milestone={milestone}
          angle={milestonePositions[idx]}
          guidedTourActive={guidedTourActive}
        />
      ))}
    </group>
  );
}

function MilestoneNode({
  milestone,
  angle,
  guidedTourActive,
}: {
  milestone: typeof TIMELINE_MILESTONES[number];
  angle: number;
  guidedTourActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  const position = useMemo(() => {
    return new THREE.Vector3(
      Math.cos(angle) * ORBIT_RADIUS,
      0,
      Math.sin(angle) * ORBIT_RADIUS
    );
  }, [angle]);

  const color = milestone.isActive ? "#f3c77b" : "#555";
  const size = milestone.isActive ? 0.3 : 0.2;

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: milestone.isActive ? 0.9 : 0.5,
        toneMapped: false,
      }),
    [color, milestone.isActive]
  );

  const content = (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (guidedTourActive) return;
        setIsHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <primitive object={material} attach="material" />

      {/* Hover tooltip */}
      {isHovered && (
        <Html position={[0, 0.8, 0]} center>
          <div className="pointer-events-none select-none rounded-lg border border-[#2a2a2a] bg-black/85 px-3 py-2 shadow-[0_0_18px_rgba(243,199,123,0.3)] backdrop-blur-md">
            <div className="text-xs font-semibold text-[#f3c77b]">{milestone.title}</div>
            <div className="mt-1 text-[11px] text-gray-300 max-w-[200px]">{milestone.description}</div>
            <div className="mt-1 text-[10px] text-gray-500">{new Date(milestone.date).toLocaleDateString()}</div>
          </div>
        </Html>
      )}
    </mesh>
  );

  // Wrap active milestones in Trail for particle effect
  if (milestone.isActive) {
    return (
      <Trail
        width={1.5}
        length={8}
        color={new THREE.Color("#f3c77b")}
        attenuation={(t) => t * t}
      >
        {content}
      </Trail>
    );
  }

  return content;
}
