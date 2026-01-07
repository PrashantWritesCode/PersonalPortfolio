"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SolarSystem from "./SolarSystem";
import CameraController from "./CameraController";
import GuidedTour from "./GuidedTour";
import PlanetDetail from "../PlanetDetail";
import SunIdentityModal from "./SunIdentityModal";
import BuilderJournalModal from "./BuilderJournalModal";
import GalaxyUI from "./GalaxyUI";
// Emotional & Identity Layer
import IdleReflection from "./emotion/IdleReflection";
import ExitAnimation from "./emotion/ExitAnimation";
import CosmicTextOverlay from "./emotion/CosmicTextOverlay";
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
  const isIdle = useGalaxyStore((s) => s.isIdle);

  useEffect(() => {
    // Initialize audio on mount
    audioManager.initialize();
    // Start on first user interaction to satisfy autoplay policies
    const onFirstInteract = () => {
      audioManager.start();
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
    };
    window.addEventListener("pointerdown", onFirstInteract);
    window.addEventListener("keydown", onFirstInteract);

    return () => {
      audioManager.cleanup();
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
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

  // Reduce/restore volume based on idle state
  useEffect(() => {
    if (isIdle) {
      audioManager.reduceVolume();
    } else {
      audioManager.restoreVolume();
    }
  }, [isIdle]);

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
      
      <Canvas 
        camera={{ position: [0, 35, 120], fov: 40, near: 0.1, far: 5000 }}
        dpr={[1, 2]} // Adaptive DPR for performance
        gl={{ antialias: true, alpha: false }}
      >
        {/* Deep space background - adjusted to complement Sun */}
        <color attach="background" args={["#02020a"]} />
        <fogExp2 attach="fog" args={["#0a0a15", 0.0005]} />

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
          <IdleReflection />
        </Suspense>

        {/* EffectComposer applied on top of animated scene */}
        {!DEBUG_COMPOSER && (
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.4} radius={1.0} levels={8} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>

      <PlanetDetail />
      <SunIdentityModal />
      <BuilderJournalModal />
      <GalaxyUI />
      
      {/* Emotional & Identity Layer Overlays */}
      <CosmicTextOverlay />
      <ExitAnimation />
    </main>
  );
};

export default dynamic(() => Promise.resolve(Galaxy), { ssr: false });
