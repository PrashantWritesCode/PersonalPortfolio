"use client";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGalaxyStore } from "../../../state/galaxyStore";
import { REFLECTION_QUOTES } from "../../../data/quotes";

const IDLE_THRESHOLD = 15000; // 15 seconds

export default function IdleDetector() {
  const { camera } = useThree();
  const enterIdleMode = useGalaxyStore((s) => s.enterIdleMode);
  const exitIdleMode = useGalaxyStore((s) => s.exitIdleMode);
  const recordActivity = useGalaxyStore((s) => s.recordActivity);
  const lastActivityTime = useGalaxyStore((s) => s.lastActivityTime);
  const isIdle = useGalaxyStore((s) => s.isIdle);
  const guidedTourActive = useGalaxyStore((s) => s.guidedTourActive);
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);

  const lastCameraPosition = useRef(camera.position.clone());
  const checkInterval = useRef<NodeJS.Timeout | null>(null);

  // Activity listeners
  useEffect(() => {
    const onActivity = () => {
      recordActivity();
      if (isIdle) exitIdleMode();
    };

    // Listen for user interactions
    window.addEventListener("pointermove", onActivity);
    window.addEventListener("pointerdown", onActivity);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("wheel", onActivity);

    return () => {
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("wheel", onActivity);
    };
  }, [recordActivity, isIdle, exitIdleMode]);

  // Camera movement detection
  useEffect(() => {
    const detectCameraMovement = () => {
      const moved = !camera.position.equals(lastCameraPosition.current);
      if (moved) {
        lastCameraPosition.current.copy(camera.position);
        recordActivity();
        if (isIdle) exitIdleMode();
      }
    };

    const intervalId = setInterval(detectCameraMovement, 500);
    return () => clearInterval(intervalId);
  }, [camera, recordActivity, isIdle, exitIdleMode]);

  // Idle timer check
  useEffect(() => {
    checkInterval.current = setInterval(() => {
      // Don't enter idle during tour or when planet is selected
      if (guidedTourActive || selectedPlanet) return;

      const now = Date.now();
      const timeSinceActivity = now - lastActivityTime;

      if (!isIdle && timeSinceActivity >= IDLE_THRESHOLD) {
        // Pick random quote
        const randomQuote = REFLECTION_QUOTES[Math.floor(Math.random() * REFLECTION_QUOTES.length)];
        enterIdleMode(randomQuote);
      }
    }, 1000);

    return () => {
      if (checkInterval.current) clearInterval(checkInterval.current);
    };
  }, [lastActivityTime, isIdle, enterIdleMode, guidedTourActive, selectedPlanet]);

  return null;
}
