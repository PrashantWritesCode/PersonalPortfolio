"use client";
import React, { useMemo, useRef } from "react";
import { Html, Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { audioManager } from "./utils/audioManager";
import { useGalaxyStore } from "../../state/galaxyStore";

export default function Comet() {
  const groupRef = useRef<THREE.Group>(null);
  const cometRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.PI * 0.25);
  const guidedTourActive = useGalaxyStore((s) => s.guidedTourActive);
  const openJournal = useGalaxyStore((s) => s.openJournalModal);

  // Far orbit parameters
  const radius = 24;
  const height = 6; // slight elevation for parallax
  const speed = 0.015;

  const cometMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#d49a43",
    emissive: "#f3c77b",
    emissiveIntensity: 1.6,
    roughness: 0.3,
    metalness: 0.1,
    toneMapped: false,
  }), []);

  useFrame((_, delta) => {
    angleRef.current += delta * speed;
    const x = Math.cos(angleRef.current) * radius;
    const z = Math.sin(angleRef.current) * radius;
    if (groupRef.current) groupRef.current.position.set(x, height, z);
    if (groupRef.current) groupRef.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <Trail
        width={2}
        length={12}
        color={new THREE.Color("#f3c77b")}
        attenuation={(t) => Math.pow(1 - t, 2)}
      >
        <mesh
          ref={cometRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            if (guidedTourActive) return;
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "auto";
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (guidedTourActive) return;
            audioManager.playClick();
            openJournal();
          }}
        >
          <sphereGeometry args={[0.22, 24, 24]} />
          <primitive object={cometMat} attach="material" />
        </mesh>
      </Trail>

      {/* Label */}
      <Html position={[0, 0.6, 0]} center>
        <div className="pointer-events-none select-none rounded-md border border-[#2a2a2a] bg-black/50 px-2 py-1 text-[11px] text-[#f3c77b] shadow-[0_0_12px_rgba(212,154,67,0.25)]">
          Builder&apos;s Journal
        </div>
      </Html>
    </group>
  );
}
