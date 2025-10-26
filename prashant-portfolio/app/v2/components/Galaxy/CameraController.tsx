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

  const entryTime = useRef(0);
  const hasSettled = useRef(false);
  const returnStart = useRef<THREE.Vector3 | null>(null);
  const returnTimer = useRef(0);

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

    // Focus selected planet
    if (selectedPlanet) {
      const p = PLANETS.find((pp) => pp.name === selectedPlanet);
      if (!p) return;
      const angle = p.initialAngle;
      const planetPos = new THREE.Vector3(
        Math.cos(angle) * p.orbitRadius,
        0,
        Math.sin(angle) * p.orbitRadius
      );
      // tilt
      const rot = new THREE.Euler(
        (p.orbitTiltX * Math.PI) / 180,
        (p.orbitTiltY * Math.PI) / 180,
        (p.orbitTiltZ * Math.PI) / 180
      );
      planetPos.applyEuler(rot);

      const fovDeg = camera instanceof THREE.PerspectiveCamera ? camera.fov : SYSTEM.optimalDistanceFovDeg;
      const ideal = fovToDistance(p.size, fovDeg, 0.7);
      const focusDist = THREE.MathUtils.clamp(ideal, 5, 8);

      const dir = camera.position.clone().sub(planetPos).normalize();
      const yOffset = p.size * 0.6;
      const targetCam = planetPos.clone().add(dir.multiplyScalar(focusDist));
      targetCam.y += yOffset;
      camera.position.lerp(targetCam, 0.12);
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
