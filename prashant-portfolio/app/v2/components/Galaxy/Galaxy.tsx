"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SolarSystem from "./SolarSystem";
import CameraController from "./CameraController";
import GuidedTour from "./GuidedTour";
import PlanetDetail from "../PlanetDetail";
import GalaxyUI from "./GalaxyUI";
import { useGalaxyStore } from "../../state/galaxyStore";
import { audioManager } from "./utils/audioManager";
import { GUIDED_TOUR_STORAGE_KEY } from "./utils/constants";

// Debug flag to toggle postprocessing effects
const DEBUG_COMPOSER = false;

/**
 * Audio Integration Component
 * Manages ambience cross-fading based on camera position
 */
function AudioController() {
  const { camera } = useThree();
  const guidedTourCompleted = useGalaxyStore((s) => s.guidedTourCompleted);

  useEffect(() => {
    // Initialize audio on mount
    audioManager.initialize();
    
    return () => {
      audioManager.cleanup();
    };
  }, []);

  useEffect(() => {
    // Start audio after tour completes
    if (guidedTourCompleted) {
      audioManager.start();
    }
  }, [guidedTourCompleted]);

  // Update ambience based on camera distance from Sun (origin)
  useEffect(() => {
    const interval = setInterval(() => {
      const distanceToSun = camera.position.length();
      audioManager.updateAmbience(distanceToSun);
    }, 500); // Check every 500ms

    return () => clearInterval(interval);
  }, [camera]);

  return null;
}

/**
 * Tour Initialization Component
 * Checks localStorage and starts tour if first visit
 */
function TourInitializer() {
  const startGuidedTour = useGalaxyStore((s) => s.startGuidedTour);
  const skipGuidedTour = useGalaxyStore((s) => s.skipGuidedTour);

  useEffect(() => {
    const hasCompletedTour = localStorage.getItem(GUIDED_TOUR_STORAGE_KEY);
    
    if (!hasCompletedTour) {
      // First visit - start tour
      startGuidedTour();
    } else {
      // Returning visitor - skip tour
      skipGuidedTour();
    }
  }, [startGuidedTour, skipGuidedTour]);

  return null;
}

const Galaxy = () => {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <TourInitializer />
      
      <Canvas camera={{ position: [8, 12, 30], fov: 55 }}>
        {/* Deep space background - adjusted to complement Sun */}
        <color attach="background" args={["#02020a"]} />
        <fogExp2 attach="fog" args={["#0a0a15", 0.0015]} />

        {/* Background gradient plane - subtle depth */}
        <mesh position={[0, 0, -80]} scale={[120, 120, 1]} renderOrder={-3}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#0a0a1a" transparent opacity={0.3} depthWrite={false} />
        </mesh>

        {/* Animated elements wrapped in Suspense to avoid blocking */}
        <Suspense fallback={null}>
          <SolarSystem />
          <CameraController />
          <GuidedTour />
          <AudioController />
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
