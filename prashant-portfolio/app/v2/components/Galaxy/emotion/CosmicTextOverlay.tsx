"use client";
import { motion } from "framer-motion";
import { useGalaxyStore } from "../../../state/galaxyStore";

export default function CosmicTextOverlay() {
  const visitedPlanets = useGalaxyStore((s) => s.visitedPlanets);
  const guidedTourActive = useGalaxyStore((s) => s.guidedTourActive);

  // Show after user has explored 3+ planets and tour is complete
  const shouldShow = visitedPlanets.size >= 3 && !guidedTourActive;

  if (!shouldShow) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="fixed top-6 right-6 z-10 pointer-events-none max-w-xs text-right"
    >
      <p
        className="text-[#f7d78a] text-sm leading-relaxed"
        style={{
          fontFamily: "DM Serif Display, serif",
          textShadow: "0 0 20px rgba(247, 215, 138, 0.3)",
        }}
      >
        I build universes that connect purpose and technology.
      </p>
    </motion.div>
  );
}
