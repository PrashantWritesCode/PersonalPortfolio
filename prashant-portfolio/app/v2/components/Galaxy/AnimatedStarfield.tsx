"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * Animated starfield that rotates slowly using useFrame
 * to ensure stars remain live when postprocessing is enabled
 */
export default function AnimatedStarfield() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Slow rotation to keep stars feeling alive
      groupRef.current.rotation.y += delta * 0.002;
      groupRef.current.rotation.x += delta * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={120} depth={60} count={4000} factor={4.0} fade speed={0.0003} />
      <Stars radius={80} depth={40} count={2000} factor={2.5} fade speed={-0.0002} />
      <Stars radius={150} depth={80} count={1500} factor={6.0} fade speed={0.0001} />
    </group>
  );
}
