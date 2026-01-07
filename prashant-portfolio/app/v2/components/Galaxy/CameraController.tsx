"use client";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SYSTEM } from "./utils/constants";
import { useGalaxyStore } from "../../state/galaxyStore";

export default function CameraController() {
  const { camera } = useThree();
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);
  const isReturning = useGalaxyStore((s) => s.isReturning);
  const completeReturn = useGalaxyStore((s) => s.completeReturn);
  const returnToOverview = useGalaxyStore((s) => s.returnToOverview);
  const planetRefs = useGalaxyStore((s) => s.planetRefs);
  const planetMetadata = useGalaxyStore((s) => s.planetMetadata);
  const guidedTourActive = useGalaxyStore((s) => s.guidedTourActive);
  const rippleTrigger = useGalaxyStore((s) => s.rippleTrigger);
  const isIdle = useGalaxyStore((s) => s.isIdle);

  const entryTime = useRef(0);
  const hasSettled = useRef(false);
  // Camera state
  const focusTransitionTimer = useRef(0);
  const focusTransitionStart = useRef<THREE.Vector3 | null>(null);
  const returnTimer = useRef(0);
  const returnStart = useRef<THREE.Vector3 | null>(null);
  const cameraOrbitAngle = useRef(0);
  const lastRippleTimestamp = useRef(0);
  const shakeOffset = useRef(new THREE.Vector3());
  const isFocusing = useRef(false);
  const cameraOrbitEnabled = useRef(false);

  // Far view position: [0, 35, 120] for good overview
  const farViewPosition = useRef(new THREE.Vector3(0, 35, 120));
  const idleZoomTarget = useRef(new THREE.Vector3(0, 40, 130));

  // ESC key handler for accessibility
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPlanet) {
        returnToOverview();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedPlanet, returnToOverview]);

  useFrame((_, delta) => {
    // 🎬 Skip all camera logic during guided tour
    if (guidedTourActive) return;

    entryTime.current += delta;

    // 🌠 Camera shake on ripple trigger
    if (rippleTrigger && rippleTrigger.timestamp !== lastRippleTimestamp.current) {
      lastRippleTimestamp.current = rippleTrigger.timestamp;
      const amplitude = 0.5;
      shakeOffset.current.set(
        (Math.random() - 0.5) * amplitude,
        (Math.random() - 0.5) * amplitude,
        (Math.random() - 0.5) * amplitude
      );
    }

    // Decay shake offset quickly
    shakeOffset.current.multiplyScalar(0.85);

    // Intro glide from far to near-far view
    const entryDuration = 3.5;
    const isInEntry = entryTime.current < entryDuration && !selectedPlanet && !isReturning;
    if (isInEntry) {
      const progress = Math.min(entryTime.current / entryDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = new THREE.Vector3().set(
        THREE.MathUtils.lerp(SYSTEM.entryPosition.x, farViewPosition.current.x, easeOut),
        THREE.MathUtils.lerp(SYSTEM.entryPosition.y, farViewPosition.current.y, easeOut),
        THREE.MathUtils.lerp(SYSTEM.entryPosition.z, farViewPosition.current.z, easeOut)
      );
      camera.position.copy(current);
      camera.position.add(shakeOffset.current);
      camera.lookAt(SYSTEM.centerTarget);
      if (progress >= 1 && !hasSettled.current) hasSettled.current = true;
      return;
    }

    // Return to overview (Back to Galaxy button)
    if (isReturning && !selectedPlanet) {
      isFocusing.current = false;
      focusTransitionStart.current = null;
      focusTransitionTimer.current = 0;
      cameraOrbitAngle.current = 0;
      cameraOrbitEnabled.current = false;
      
      if (!returnStart.current) {
        returnStart.current = camera.position.clone();
        returnTimer.current = 0;
      }
      const duration = 0.8; // Smooth 0.8s return
      returnTimer.current += delta;
      const rProgress = Math.min(returnTimer.current / duration, 1);
      // easeOut for smooth deceleration
      const easeOut = 1 - Math.pow(1 - rProgress, 3);
      const end = farViewPosition.current.clone();
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

    // Focus selected planet with smooth 0.8s transition and optional slow orbit
    if (selectedPlanet) {
      const planetMeta = planetMetadata[selectedPlanet];
      if (!planetMeta) return;

      const ref = planetRefs[selectedPlanet];
      const planetPos = new THREE.Vector3();

      if (ref) {
        ref.getWorldPosition(planetPos);
      } else {
        // Fallback to computed position
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

      // Calculate ideal camera distance based on planet size
      const orbitRadius = Math.max(planetMeta.size * 4, 30);

      // Initial smooth transition (0.8s with easeOut)
      if (!isFocusing.current) {
        isFocusing.current = true;
        focusTransitionStart.current = camera.position.clone();
        focusTransitionTimer.current = 0;
        cameraOrbitAngle.current = Math.atan2(
          camera.position.z - planetPos.z,
          camera.position.x - planetPos.x
        );
        cameraOrbitEnabled.current = true; // Enable orbit after focus
      }

      const transitionDuration = 0.8;
      focusTransitionTimer.current += delta;
      const transProgress = Math.min(focusTransitionTimer.current / transitionDuration, 1);
      
      // easeOut for smooth deceleration
      const easeOut = 1 - Math.pow(1 - transProgress, 3);

      // Tiny slow orbit (0.005 rad/sec) after transition completes
      if (transProgress >= 1 && cameraOrbitEnabled.current) {
        cameraOrbitAngle.current += delta * 0.005; // Very slow, non-nauseating rotation
      }

      // Target position: orbit around planet
      const targetCam = new THREE.Vector3(
        planetPos.x + Math.cos(cameraOrbitAngle.current) * orbitRadius,
        planetPos.y + orbitRadius * 0.4,
        planetPos.z + Math.sin(cameraOrbitAngle.current) * orbitRadius
      );

      if (transProgress < 1 && focusTransitionStart.current) {
        // Smooth transition from start to orbital position
        camera.position.copy(focusTransitionStart.current.clone().lerp(targetCam, easeOut));
      } else {
        // Continuous follow with smooth lerp (planet keeps moving on orbit)
        camera.position.lerp(targetCam, 0.06);
      }

      camera.position.add(shakeOffset.current);
      camera.lookAt(planetPos);
      return;
    }

    // Reset focus state when no planet selected
    if (!selectedPlanet && isFocusing.current) {
      isFocusing.current = false;
      focusTransitionStart.current = null;
      focusTransitionTimer.current = 0;
      cameraOrbitEnabled.current = false;
    }

    // Static overview when idle (very slow zoom)
    if (hasSettled.current && !selectedPlanet && !isReturning) {
      if (isIdle) {
        camera.position.lerp(idleZoomTarget.current, 0.008);
      }
      camera.lookAt(SYSTEM.centerTarget);
      return;
    }
  });

  return null;
}
