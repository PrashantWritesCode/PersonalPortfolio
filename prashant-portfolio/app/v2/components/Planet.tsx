"use client";
import { useRef, PropsWithChildren } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PlanetProps = {
  color: string;
  position?: [number, number, number]; // fallback if no orbitRadius provided
  orbitRadius?: number; // if provided, planet orbits origin in XZ plane
  orbitTilt?: number; // degrees, tilt of orbit plane
  orbitSpeed?: number; // radians per second (default: 0.15)
  initialAngle?: number; // starting phase in radians
  size?: number; // sphere radius (default: 0.6)
  halo?: boolean; // render subtle atmospheric halo
  glowBoost?: number; // multiplies emissive intensity subtly when hovered
};

export default function Planet({
  color,
  position = [0, 0, 0],
  orbitRadius,
  orbitTilt = 0,
  orbitSpeed = 0.15,
  initialAngle = 0,
  size = 0.6,
  halo = true,
  glowBoost = 0,
  children,
}: PropsWithChildren<PlanetProps>) {
  const groupRef = useRef<THREE.Group | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const matRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const angleRef = useRef<number>(initialAngle);
  const tRef = useRef<number>(0);

  useFrame((_state, delta) => {
    // Self rotation for realism
    if (meshRef.current) meshRef.current.rotation.y += 0.003;

    // Enhanced emissive pulsing with golden glow (0.6 .. 1.0)
    if (matRef.current) {
      tRef.current += delta;
      const pulse = 0.8 + 0.2 * Math.sin(tRef.current * 1.2);
      // Apply enhanced intensity range with glowBoost
      matRef.current.emissiveIntensity = pulse * (1 + glowBoost * 0.3);
    }

    // Orbiting around origin (XZ plane) with tilt
    if (groupRef.current && typeof orbitRadius === "number") {
      angleRef.current += orbitSpeed * delta;
      const angle = angleRef.current;
      const tiltRad = (orbitTilt * Math.PI) / 180;
      const rotMatrix = new THREE.Matrix4().makeRotationX(tiltRad);
      const vec = new THREE.Vector3(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius);
      vec.applyMatrix4(rotMatrix);
      groupRef.current.position.set(vec.x, vec.y, vec.z);
    }
  });

  // Initial placement when not orbiting, with tilt
  const groupPosition: [number, number, number] = (() => {
    if (typeof orbitRadius === "number") {
      const tiltRad = (orbitTilt * Math.PI) / 180;
      const rotMatrix = new THREE.Matrix4().makeRotationX(tiltRad);
      const vec = new THREE.Vector3(Math.cos(initialAngle) * orbitRadius, 0, Math.sin(initialAngle) * orbitRadius);
      vec.applyMatrix4(rotMatrix);
      return [vec.x, vec.y, vec.z];
    }
    return position;
  })();

  return (
    <group ref={groupRef} position={groupPosition}>
      {/* Planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          ref={matRef} 
          emissive={color} 
          emissiveIntensity={0.8} 
          color={"#1a1a1a"} 
          roughness={0.4} 
          metalness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Optional halo / atmosphere */}
      {halo && (
        <mesh>
          <sphereGeometry args={[size * 1.12, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.08}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
          />
        </mesh>
      )}
      {children}
    </group>
  );
}
