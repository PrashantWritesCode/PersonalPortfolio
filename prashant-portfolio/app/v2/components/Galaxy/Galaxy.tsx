"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SolarSystem from "./SolarSystem";
import CameraController from "./CameraController";
import PlanetDetail from "../PlanetDetail";
import GalaxyUI from "./GalaxyUI";

// Debug flag to toggle postprocessing effects
const DEBUG_COMPOSER = false;

const Galaxy = () => {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <Canvas camera={{ position: [8, 12, 30], fov: 55 }}>
        <color attach="background" args={["#000208"]} />

        {/* Background gradient plane */}
        <mesh position={[0, 0, -80]} scale={[120, 120, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#0a0a1a" transparent opacity={0.4} />
        </mesh>

        {/* Animated elements wrapped in Suspense to avoid blocking */}
        <Suspense fallback={null}>
          <SolarSystem />
          <CameraController />
        </Suspense>

        {/* EffectComposer applied on top of animated scene */}
        {!DEBUG_COMPOSER && (
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.4} radius={1.0} levels={8} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>

      <PlanetDetail />
      <GalaxyUI />
    </main>
  );
};

export default dynamic(() => Promise.resolve(Galaxy), { ssr: false });
