"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#00b3ff"
        emissive="#00b3ff"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.3} />
        
        {/* Point light for glow effect */}
        <pointLight position={[0, 0, 5]} intensity={1} color="#00b3ff" />
        <pointLight position={[-5, 5, 0]} intensity={0.5} color="#00b3ff" />
        <pointLight position={[5, -5, 0]} intensity={0.5} color="#00b3ff" />

        {/* Rotating glowing cube */}
        <RotatingCube />
      </Canvas>
    </div>
  );
}
