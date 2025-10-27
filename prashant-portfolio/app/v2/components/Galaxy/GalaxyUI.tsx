"use client";
import { motion } from "framer-motion";
import { useGalaxyStore } from "../../state/galaxyStore";
import { isGpt5CodexPreviewEnabled, GPT5_CODEX_LABEL } from "@/lib/flags";

export default function GalaxyUI() {
  const hoveredName = useGalaxyStore((s) => s.hoveredName);
  const pointer = useGalaxyStore((s) => s.pointer);
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);
  const returnToOverview = useGalaxyStore((s) => s.returnToOverview);
  const guidedTourActive = useGalaxyStore((s) => s.guidedTourActive);
  const guidedTourCompleted = useGalaxyStore((s) => s.guidedTourCompleted);
  const skipGuidedTour = useGalaxyStore((s) => s.skipGuidedTour);
  const previewEnabled = isGpt5CodexPreviewEnabled();

  return (
    <>
      {/* 🎬 Skip Tour Button (bottom-right, during tour) */}
      {guidedTourActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-30 pointer-events-auto"
        >
          <button
            onClick={skipGuidedTour}
            className="px-4 py-2 rounded-full border border-[#2a2a2a] bg-black/70 text-gray-300 backdrop-blur-md font-medium shadow-[0_0_18px_rgba(243,199,123,0.15)] hover:text-[#f3c77b] hover:shadow-[0_0_24px_rgba(243,199,123,0.25)] transition"
          >
            Skip Tour →
          </button>
        </motion.div>
      )}

      {/* 🌟 Explore Galaxy Button (center, post-tour) */}
      {!guidedTourActive && guidedTourCompleted && !selectedPlanet && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <motion.button
            animate={{
              y: [0, -12, 0],
              boxShadow: [
                "0 0 0 #d49a43",
                "0 0 32px #d49a43aa",
                "0 0 0 #d49a43"
              ]
            }}
            transition={{
              y: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
              boxShadow: { repeat: Infinity, duration: 2.8, ease: "easeInOut" }
            }}
            whileHover={{
              scale: 1.08,
              filter: "drop-shadow(0 0 24px #f3c77b) brightness(1.2)"
            }}
            className="pointer-events-auto px-8 py-3 rounded-full border-2 bg-[#0a0a0a]/80 text-[#f3c77b] font-semibold text-lg shadow-[0_0_24px_rgba(212,154,67,0.18)] transition-all duration-300 cursor-pointer select-none"
            style={{
              borderImage: "linear-gradient(90deg,#f3c77b,#d49a43) 1",
              borderWidth: 2,
              borderStyle: "solid"
            }}
          >
            ✨ Explore the Galaxy
          </motion.button>
        </motion.div>
      )}

      {/* Main UI (hover tooltips, planet info) */}
      {!guidedTourActive && guidedTourCompleted && (
        <div className="absolute inset-0 pointer-events-none">
          {hoveredName && pointer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="pointer-events-none fixed z-20"
              style={{ left: pointer.x + 12, top: pointer.y + 12 }}
            >
              <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a]/85 backdrop-blur-md px-3 py-2 shadow-[0_0_24px_rgba(212,154,67,0.25)]">
                <div className="text-xs uppercase tracking-wide text-[#f3c77b]">Planet</div>
                <div className="text-sm text-gray-200">{hoveredName}</div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Controls layer */}
      {!guidedTourActive && guidedTourCompleted && (
        <div className="pointer-events-none">
          <motion.div
            className="fixed left-1/2 -translate-x-1/2 bottom-12 z-20"
            initial={{ opacity: 0, y: 8 }}
            animate={selectedPlanet ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ pointerEvents: selectedPlanet ? "auto" : "none" }}
          >
            <button
              onClick={() => returnToOverview?.()}
              className="pointer-events-auto px-5 py-2 rounded-full border border-[#2a2a2a] bg-black/70 text-[#f3c77b] backdrop-blur-md font-medium shadow-[0_0_24px_rgba(243,199,123,0.25)] hover:shadow-[0_0_36px_rgba(243,199,123,0.35)] transition"
            >
              ← Back to Galaxy
            </button>
          </motion.div>

          {previewEnabled && (
            <div className="fixed left-4 bottom-4 z-20 pointer-events-auto">
              <div className="flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-black/70 px-3 py-1.5 shadow-[0_0_18px_rgba(243,199,123,0.25)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#f3c77b] animate-pulse" />
                <span className="text-xs font-medium text-[#f3c77b]">{GPT5_CODEX_LABEL}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
