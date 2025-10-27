"use client";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
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

  const startTimeRef = useRef<number | null>(null);
  const [nearbyPlanet, setNearbyPlanet] = useState<string | null>(null);

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

  // Detect nearby planets for label display
  const detectNearbyPlanet = (cameraPos: THREE.Vector3) => {
    const planets = [
      { name: "Mercury", pos: new THREE.Vector3(5, 0, 0) },
      { name: "Venus", pos: new THREE.Vector3(8, 0, 0) },
      { name: "Earth", pos: new THREE.Vector3(12, 0, 0) },
      { name: "Mars", pos: new THREE.Vector3(16, 0, 0) },
      { name: "Jupiter", pos: new THREE.Vector3(24, 0, 0) },
      { name: "Saturn", pos: new THREE.Vector3(32, 0, 0) },
      { name: "Uranus", pos: new THREE.Vector3(40, 0, 0) },
    ];

    for (const planet of planets) {
      const distance = cameraPos.distanceTo(planet.pos);
      if (distance < 8) {
        return planet.name;
      }
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
    setNearbyPlanet(nearby);

    // Complete tour when finished
    if (rawProgress >= 1) {
      localStorage.setItem(GUIDED_TOUR_STORAGE_KEY, "true");
      completeGuidedTour();
    }
  });

  if (!guidedTourActive) return null;

  return (
    <>
      {/* Floating planet label */}
      {nearbyPlanet && (
        <group>
          <mesh position={[0, 5, 0]}>
            <planeGeometry args={[4, 1]} />
            <meshBasicMaterial
              color="#f7d78a"
              transparent
              opacity={0.8}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}
    </>
  );
}
