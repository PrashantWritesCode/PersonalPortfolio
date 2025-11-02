"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGalaxyStore } from "../../../state/galaxyStore";
import { audioManager } from "../utils/audioManager";

const EXIT_STORAGE_KEY = "galaxySkipExitAnimation";

export default function ExitAnimation() {
  const isExiting = useGalaxyStore((s) => s.isExiting);
  const exitMessage = useGalaxyStore((s) => s.exitMessage);
  const triggerExit = useGalaxyStore((s) => s.triggerExit);
  const [textPhase, setTextPhase] = useState<"fadeIn" | "hold" | "fadeOut">("fadeIn");

  // Skip animation if user is just reloading/navigating
  useEffect(() => {
    const skipAnimation = sessionStorage.getItem(EXIT_STORAGE_KEY);
    if (skipAnimation === "true") {
      sessionStorage.removeItem(EXIT_STORAGE_KEY);
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Mark that we're showing exit animation
      sessionStorage.setItem(EXIT_STORAGE_KEY, "true");
      
      // Trigger exit state
      triggerExit("Thank you for exploring...");
      
      // Fade out audio
      audioManager.fadeOutOnExit();

      // Don't show browser confirmation dialog
      // Note: Modern browsers ignore custom messages
      e.preventDefault();
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [triggerExit]);

  // Text animation phases
  useEffect(() => {
    if (!isExiting) return;

    // Phase 1: Fade in (0-1s)
    const fadeInTimer = setTimeout(() => {
      setTextPhase("hold");
    }, 1000);

    // Phase 2: Hold (1-2s)
    const holdTimer = setTimeout(() => {
      setTextPhase("fadeOut");
    }, 2000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(holdTimer);
    };
  }, [isExiting]);

  return (
    <AnimatePresence>
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: textPhase === "fadeIn" ? 1 : textPhase === "hold" ? 1 : 0,
            }}
            transition={{
              duration: textPhase === "fadeIn" ? 1 : 2,
              ease: "easeInOut",
            }}
            className="text-center"
          >
            <p
              className="text-2xl md:text-3xl text-[#f3c77b] drop-shadow-[0_0_24px_rgba(243,199,123,0.5)]"
              style={{ fontFamily: "DM Serif Display, serif" }}
            >
              {exitMessage}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
