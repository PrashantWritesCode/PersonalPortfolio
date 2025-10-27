"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * Nebula Glow - Breathing cosmic background layer
 * Positioned far behind to avoid Sun interference
 */
function NebulaGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Gentle breathing opacity pulse (~10s cycle)
      materialRef.current.opacity = 0.12 + Math.sin(clock.elapsedTime * 0.2) * 0.04;
    }
  });

  // Create radial gradient texture for nebula with cooler tones
  const nebulaTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, "rgba(80, 100, 150, 0.15)"); // soft blue-gold center
    gradient.addColorStop(0.5, "rgba(120, 120, 180, 0.08)"); 
    gradient.addColorStop(0.8, "rgba(60, 80, 120, 0.03)");
    gradient.addColorStop(1, "rgba(30, 40, 60, 0)"); // fade to transparent

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, -350]} scale={[400, 400, 1]} renderOrder={-2}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        map={nebulaTexture}
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Self-illuminated star layers unaffected by scene lighting
 * Positioned behind solar system with proper render order
 */
function StarLayers() {
  const groupRef = useRef<THREE.Group>(null);
  const starsRefs = useRef<THREE.Points[]>([]);

  // Override star materials to ensure they're always visible
  useEffect(() => {
    starsRefs.current.forEach((stars) => {
      if (stars && stars.material) {
        const mat = stars.material as THREE.PointsMaterial;
        mat.blending = THREE.AdditiveBlending;
        mat.transparent = true;
        mat.opacity = 0.8;
        mat.toneMapped = false; // prevent Sun from washing out stars
        mat.depthWrite = false;
        mat.depthTest = true;
      }
    });
  }, []);

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      // Continuous slow drift (visible within 5s)
      groupRef.current.rotation.y += delta * 0.007;

      // Parallax shimmer for breathing effect
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.05;
      groupRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.07) * 0.05;
    }

    // Update star materials each frame to maintain visibility
    starsRefs.current.forEach((stars, idx) => {
      if (stars && stars.material) {
        const mat = stars.material as THREE.PointsMaterial;
        // Subtle twinkle effect
        const baseOpacity = 0.7 + idx * 0.1;
        mat.opacity = baseOpacity + Math.sin(clock.elapsedTime * 0.5 + idx) * 0.15;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -100]} renderOrder={-1}>
      {/* Far distant stars - deep space background */}
      <Stars
        ref={(el) => { if (el) starsRefs.current[0] = el as unknown as THREE.Points; }}
        radius={400}
        depth={100}
        count={400}
        factor={6}
        saturation={0}
        fade
        speed={0.25}
      />
      
      {/* Main star layer - primary starfield */}
      <Stars
        ref={(el) => { if (el) starsRefs.current[1] = el as unknown as THREE.Points; }}
        radius={200}
        depth={80}
        count={1500}
        factor={4}
        saturation={0}
        fade
        speed={0.25}
      />
      
      {/* Close stars - foreground depth */}
      <Stars
        ref={(el) => { if (el) starsRefs.current[2] = el as unknown as THREE.Points; }}
        radius={120}
        depth={50}
        count={600}
        factor={3}
        saturation={0}
        fade
        speed={0.25}
      />
    </group>
  );
}

/**
 * Living Galaxy Background - Properly layered behind solar system
 * Self-illuminated and unaffected by Sun's lighting
 */
export default function AnimatedStarfield() {
  return (
    <>
      {/* Nebula glow - furthest back */}
      <NebulaGlow />
      
      {/* Star layers - behind solar system but in front of nebula */}
      <StarLayers />
    </>
  );
}
