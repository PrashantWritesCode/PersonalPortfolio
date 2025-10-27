"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SYSTEM, PLANETS } from "./utils/constants";
import { useGalaxyStore } from "../../state/galaxyStore";
import { fovToDistance } from "./utils/helpers";

export default function CameraController() {
  const { camera } = useThree();
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);
  const isReturning = useGalaxyStore((s) => s.isReturning);
  const completeReturn = useGalaxyStore((s) => s.completeReturn);
  const planetRefs = useGalaxyStore((s) => s.planetRefs);

  const entryTime = useRef(0);
  const hasSettled = useRef(false);
  const returnStart = useRef<THREE.Vector3 | null>(null);
  const returnTimer = useRef(0);
  const cameraOrbitAngle = useRef(0); // slow orbit angle around focused planet

  // Precomputed in constants; keeping logic here if later needed

  useFrame((_, delta) => {
    entryTime.current += delta;

    // Intro glide
    const entryDuration = 3.5;
    const isInEntry = entryTime.current < entryDuration && !selectedPlanet && !isReturning;
    if (isInEntry) {
      const progress = Math.min(entryTime.current / entryDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = new THREE.Vector3().set(
        THREE.MathUtils.lerp(SYSTEM.entryPosition.x, SYSTEM.finalPosition.x, easeOut),
        THREE.MathUtils.lerp(SYSTEM.entryPosition.y, SYSTEM.finalPosition.y, easeOut),
        THREE.MathUtils.lerp(SYSTEM.entryPosition.z, SYSTEM.finalPosition.z, easeOut)
      );
      camera.position.lerp(current, 0.12);
      camera.lookAt(SYSTEM.centerTarget);
      if (progress >= 1 && !hasSettled.current) hasSettled.current = true;
      return;
    }

    // Return to overview
    if (isReturning && !selectedPlanet) {
      if (!returnStart.current) {
        returnStart.current = camera.position.clone();
        returnTimer.current = 0;
      }
      const duration = 1.8;
      returnTimer.current += delta;
      const rProgress = Math.min(returnTimer.current / duration, 1);
      const easeOut = 1 - Math.pow(1 - rProgress, 3);
      const end = SYSTEM.finalPosition.clone();
      const current = returnStart.current.clone().lerp(end, easeOut);
      camera.position.copy(current);
      camera.lookAt(SYSTEM.centerTarget);
      if (rProgress >= 1) {
        hasSettled.current = true;
        returnStart.current = null;
        completeReturn();
      }
      return;
    }

    // Focus selected planet (live follow + slow circular orbit around planet)
    if (selectedPlanet) {
      const p = PLANETS.find((pp) => pp.name === selectedPlanet);
      if (!p) return;

      const ref = planetRefs[selectedPlanet];
  const planetPos = new THREE.Vector3();

      if (ref) {
        ref.getWorldPosition(planetPos);
      } else {
        // Fallback to computed position if ref missing
        const angle = p.initialAngle;
        planetPos.set(
          Math.cos(angle) * p.orbitRadius,
          0,
          Math.sin(angle) * p.orbitRadius
        );
        const rot = new THREE.Euler(
          (p.orbitTiltX * Math.PI) / 180,
          (p.orbitTiltY * Math.PI) / 180,
          (p.orbitTiltZ * Math.PI) / 180
        );
        planetPos.applyEuler(rot);
      }

      const fovDeg = camera instanceof THREE.PerspectiveCamera ? camera.fov : SYSTEM.optimalDistanceFovDeg;
      const ideal = fovToDistance(p.size, fovDeg, 0.7);
      const orbitRadius = THREE.MathUtils.clamp(ideal, 5, 8); // fixed radius (zoom distance)

      // advance orbit very slowly to avoid dizziness
      const speed = 0.007; // rad/sec (between 0.005–0.01)
      cameraOrbitAngle.current += delta * speed;

      const targetCam = new THREE.Vector3(
        planetPos.x + Math.cos(cameraOrbitAngle.current) * orbitRadius,
        planetPos.y + 1.5,
        planetPos.z + Math.sin(cameraOrbitAngle.current) * orbitRadius
      );

      camera.position.lerp(targetCam, 0.05);
      camera.lookAt(planetPos);
      return;
    }

    // Static overview when idle (no hover-driven motion)
    if (hasSettled.current && !selectedPlanet && !isReturning) {
      camera.lookAt(SYSTEM.centerTarget);
      return;
    }
  });

  return null;
}
