"use client";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGalaxyStore } from "../../../state/galaxyStore";

type ActiveRipple = {
  id: number;
  position: THREE.Vector3;
  startTime: number;
};

export default function EnergyRipple() {
  const rippleTrigger = useGalaxyStore((s) => s.rippleTrigger);
  const [activeRipples, setActiveRipples] = useState<ActiveRipple[]>([]);

  useFrame(() => {
    // Add new ripple if trigger changed
    if (rippleTrigger && !activeRipples.find((r) => r.id === rippleTrigger.timestamp)) {
      const newRipple: ActiveRipple = {
        id: rippleTrigger.timestamp,
        position: rippleTrigger.position.clone(),
        startTime: rippleTrigger.timestamp,
      };
      setActiveRipples((prev) => [...prev, newRipple]);
    }

    // Remove expired ripples
    const now = Date.now();
    setActiveRipples((prev) => prev.filter((ripple) => now - ripple.startTime < 1000));
  });

  return (
    <>
      {activeRipples.map((ripple) => (
        <RippleRing key={ripple.id} ripple={ripple} />
      ))}
    </>
  );
}

function RippleRing({ ripple }: { ripple: ActiveRipple }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!meshRef.current || !matRef.current) return;

    const elapsed = Date.now() - ripple.startTime;
    const progress = Math.min(elapsed / 1000, 1); // 0 to 1 over 1s

    // Scale: 1 → 8
    const scale = 1 + progress * 7;
    meshRef.current.scale.setScalar(scale);

    // Opacity: 0.6 → 0
    const opacity = 0.6 * (1 - progress);
    matRef.current.opacity = opacity;

    // Position at planet's world position
    meshRef.current.position.copy(ripple.position);
  });

  const material = React.useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f3c77b",
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[0.8, 1, 32]} />
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}
