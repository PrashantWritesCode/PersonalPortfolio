"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * Nebula Glow - Breathing cosmic background layer
 */
function NebulaGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Gentle breathing opacity pulse (~10s cycle)
      materialRef.current.opacity = 0.15 + Math.sin(clock.elapsedTime * 0.2) * 0.05;
    }
  });

  // Create radial gradient texture for nebula
  const nebulaTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, "rgba(247, 215, 138, 0.3)"); // #f7d78a warm gold center
    gradient.addColorStop(0.4, "rgba(243, 185, 122, 0.2)"); // #f3b97a
    gradient.addColorStop(0.7, "rgba(248, 214, 126, 0.1)"); // #f8d67e
    gradient.addColorStop(1, "rgba(247, 215, 138, 0)"); // fade to transparent

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, -280]} scale={[300, 300, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        map={nebulaTexture}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Living Galaxy Background - Animated starfield with breathing nebula glow
 * Creates a cinematic space odyssey atmosphere with gentle motion and warmth
 */
export default function AnimatedStarfield() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      // Continuous slow drift (visible within 5s, never dizzying)
      groupRef.current.rotation.y += delta * 0.007;

      // Parallax shimmer for breathing effect
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.05;
      groupRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.07) * 0.05;
    }
  });

  return (
    <>
      {/* Nebula glow layer - behind everything */}
      <NebulaGlow />

      {/* Animated star layers with warm golden palette */}
      <group ref={groupRef}>
        {/* Outer layer - distant stars */}
        <Stars
          radius={200}
          depth={80}
          count={1200}
          factor={4.5}
          saturation={0.3}
          fade
          speed={0.0003}
        />
        
        {/* Mid layer - medium stars with golden tint */}
        <Stars
          radius={150}
          depth={60}
          count={800}
          factor={3.5}
          saturation={0.4}
          fade
          speed={-0.0002}
        />
        
        {/* Inner layer - close stars, brighter */}
        <Stars
          radius={100}
          depth={50}
          count={600}
          factor={2.5}
          saturation={0.5}
          fade
          speed={0.0001}
        />
      </group>
    </>
  );
}
