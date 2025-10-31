"use client";
import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useGalaxyStore } from "../../state/galaxyStore";
import {
  GUIDED_TOUR_PATH,
  GUIDED_TOUR_DURATION,
  GUIDED_TOUR_STORAGE_KEY,
} from "./utils/constants";

/**
 * 🎬 Guided Cinematic Tour
 * 
 * On first page load:
 * 1. Disable all controls
 * 2. Smoothly animate camera along predefined Bézier path
 * 3. Show planet labels as camera passes by
 * 4. Fade in "Explore the Galaxy" button at end
 * 
 * Features:
 * - 15 second easeInOutCubic animation
 * - Stored in localStorage (one-time per session)
 * - Skippable via bottom-right button
 */
export default function GuidedTour() {
  const { camera } = useThree();
  const guidedTourActive = useGalaxyStore((s) => s.guidedTourActive);
  const completeGuidedTour = useGalaxyStore((s) => s.completeGuidedTour);
  const planetRefs = useGalaxyStore((s) => s.planetRefs);

  const startTimeRef = useRef<number | null>(null);
  const [nearbyPlanet, setNearbyPlanet] = useState<string | null>(null);
  const [labelVisible, setLabelVisible] = useState(false);
  const labelTimer = useRef<number | null>(null);

  // Planet messages (customize freely)
  const PLANET_MESSAGES: Record<string, string> = useMemo(() => ({
    Mercury: "IION — My first SaaS product",
    Venus: "HES — Healthcare Engagement Suite",
    Earth: "Sanatan GPT — Sanskritic AI",
    Mars: "Innovation Lab — 3D/A.I. experiments",
    Jupiter: "Enterprise Architect — Cloud-scale",
    Saturn: "Framework Maestro — Modular systems",
    Uranus: "Unconventional Edge — WASM explorations",
  }), []);

  // Ease-in-out cubic function
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Calculate position along Catmull-Rom spline
  const getPositionOnPath = (t: number): THREE.Vector3 => {
    const curve = new THREE.CatmullRomCurve3([...GUIDED_TOUR_PATH], false);
    return curve.getPoint(t);
  };

  // Calculate look-at target (slightly ahead on path)
  const getLookAtTarget = (t: number): THREE.Vector3 => {
    const lookAheadT = Math.min(t + 0.1, 1);
    return getPositionOnPath(lookAheadT);
  };

  // Detect nearby planets for label display using live refs
  const detectNearbyPlanet = (cameraPos: THREE.Vector3) => {
    let nearest: { name: string; dist: number; pos: THREE.Vector3 } | null = null;
    for (const [name, ref] of Object.entries(planetRefs)) {
      if (!ref) continue;
      const p = new THREE.Vector3();
      ref.getWorldPosition(p);
      const d = cameraPos.distanceTo(p);
      if (!nearest || d < nearest.dist) {
        nearest = { name, dist: d, pos: p.clone() };
      }
    }
    if (nearest && nearest.dist < 10) {
      return nearest.name;
    }
    return null;
  };

  useFrame(() => {
    if (!guidedTourActive) return;

    const now = Date.now();
    if (!startTimeRef.current) {
      startTimeRef.current = now;
    }

    const elapsed = now - startTimeRef.current;
    const rawProgress = Math.min(elapsed / GUIDED_TOUR_DURATION, 1);
    const easedProgress = easeInOutCubic(rawProgress);

    // Update camera position and rotation
    const position = getPositionOnPath(easedProgress);
    const lookAt = getLookAtTarget(easedProgress);

    camera.position.copy(position);
    camera.lookAt(lookAt);

    // Detect nearby planets
    const nearby = detectNearbyPlanet(position);
    if (nearby && nearby !== nearbyPlanet) {
      setNearbyPlanet(nearby);
      setLabelVisible(true);
      if (labelTimer.current) window.clearTimeout(labelTimer.current);
      labelTimer.current = window.setTimeout(() => {
        setLabelVisible(false);
      }, 2200);
    }

    // Complete tour when finished
    if (rawProgress >= 1) {
      localStorage.setItem(GUIDED_TOUR_STORAGE_KEY, "true");
      completeGuidedTour();
    }
  });

  if (!guidedTourActive) return null;

  return (
    <>
      {/* Floating planet label near the planet */}
      {nearbyPlanet && planetRefs[nearbyPlanet] && (
        <Html
          center
          position={(() => { const v = new THREE.Vector3(); planetRefs[nearbyPlanet]!.getWorldPosition(v); v.y += 1.4; return v; })()}
          style={{ pointerEvents: "none" }}
        >
          <div
            className="px-3 py-1.5 rounded-lg border text-sm font-medium whitespace-nowrap backdrop-blur-sm transition"
            style={{
              borderColor: "#f3c77b",
              color: "#f3c77b",
              background: `rgba(10,10,10,${labelVisible ? 0.75 : 0.35})`,
              boxShadow: `0 0 12px #f3c77b60`,
              opacity: labelVisible ? 1 : 0,
            }}
          >
            {PLANET_MESSAGES[nearbyPlanet] ?? nearbyPlanet}
          </div>
        </Html>
      )}
    </>
  );
}
