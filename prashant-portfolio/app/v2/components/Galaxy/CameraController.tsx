"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SYSTEM } from "./utils/constants";
import { useGalaxyStore } from "../../state/galaxyStore";
import { fovToDistance } from "./utils/helpers";

export default function CameraController() {
  const { camera } = useThree();
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);
  const isReturning = useGalaxyStore((s) => s.isReturning);
  const completeReturn = useGalaxyStore((s) => s.completeReturn);
  const planetRefs = useGalaxyStore((s) => s.planetRefs);
  const planetMetadata = useGalaxyStore((s) => s.planetMetadata);
  const guidedTourActive = useGalaxyStore((s) => s.guidedTourActive);
  const rippleTrigger = useGalaxyStore((s) => s.rippleTrigger);
  const isIdle = useGalaxyStore((s) => s.isIdle);

  const entryTime = useRef(0);
  const hasSettled = useRef(false);
  const returnStart = useRef<THREE.Vector3 | null>(null);
  const returnTimer = useRef(0);
  const cameraOrbitAngle = useRef(0); // slow orbit angle around focused planet
  const lastRippleTimestamp = useRef(0);
  const shakeOffset = useRef(new THREE.Vector3());
  const idleZoomTarget = useRef(new THREE.Vector3(10, 15, 35)); // Far overview for idle

  // Precomputed in constants; keeping logic here if later needed

  useFrame((_, delta) => {
    // 🎬 Skip all camera logic during guided tour
    if (guidedTourActive) return;

    entryTime.current += delta;

    // 🌠 Camera shake on ripple trigger
    if (rippleTrigger && rippleTrigger.timestamp !== lastRippleTimestamp.current) {
      lastRippleTimestamp.current = rippleTrigger.timestamp;
      // Generate random shake offset (amplitude 0.02)
      const amplitude = 0.02;
      shakeOffset.current.set(
        (Math.random() - 0.5) * amplitude,
        (Math.random() - 0.5) * amplitude,
        (Math.random() - 0.5) * amplitude
      );
    }

    // Decay shake offset quickly
    shakeOffset.current.multiplyScalar(0.85);

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
      camera.position.add(shakeOffset.current);
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
      camera.position.add(shakeOffset.current);
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
      // 🌟 Get planet metadata from dynamic store
      const planetMeta = planetMetadata[selectedPlanet];
      if (!planetMeta) return;

      const ref = planetRefs[selectedPlanet];
      const planetPos = new THREE.Vector3();

      if (ref) {
        // Use live world position from the planet's 3D object
        ref.getWorldPosition(planetPos);
      } else {
        // Fallback to computed position if ref missing
        const angle = planetMeta.initialAngle;
        planetPos.set(
          Math.cos(angle) * planetMeta.orbitRadius,
          0,
          Math.sin(angle) * planetMeta.orbitRadius
        );
        const rot = new THREE.Euler(
          (planetMeta.orbitTiltX * Math.PI) / 180,
          (planetMeta.orbitTiltY * Math.PI) / 180,
          (planetMeta.orbitTiltZ * Math.PI) / 180
        );
        planetPos.applyEuler(rot);
      }

      const fovDeg = camera instanceof THREE.PerspectiveCamera ? camera.fov : SYSTEM.optimalDistanceFovDeg;
      const ideal = fovToDistance(planetMeta.size, fovDeg, 0.7);
      const orbitRadius = THREE.MathUtils.clamp(ideal, 5, 8); // fixed radius (zoom distance)

      // advance orbit slowly for subtle cinematic effect (0.003 rad/sec)
      const speed = 0.003;
      cameraOrbitAngle.current += delta * speed;

      const targetCam = new THREE.Vector3(
        planetPos.x + Math.cos(cameraOrbitAngle.current) * orbitRadius,
        planetPos.y + 1.5,
        planetPos.z + Math.sin(cameraOrbitAngle.current) * orbitRadius
      );

      camera.position.lerp(targetCam, 0.05);
      camera.position.add(shakeOffset.current);
      camera.lookAt(planetPos);
      return;
    }

    // Static overview when idle (no hover-driven motion)
    if (hasSettled.current && !selectedPlanet && !isReturning) {
      // 🎶 Idle zoom-out: slowly move camera further away
      if (isIdle) {
        camera.position.lerp(idleZoomTarget.current, 0.008); // Very slow zoom
      }
      camera.lookAt(SYSTEM.centerTarget);
      return;
    }
  });

  return null;
}
