"use client";
import { motion } from "framer-motion";
import { useGalaxyStore } from "../state/galaxyStore";
import { isGpt5CodexPreviewEnabled, GPT5_CODEX_LABEL } from "@/lib/flags";

export default function UIOverlay() {
  const hoveredName = useGalaxyStore((s) => s.hoveredName);
  const pointer = useGalaxyStore((s) => s.pointer);
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);
  const returnToOverview = useGalaxyStore((s) => s.returnToOverview);
  const previewEnabled = isGpt5CodexPreviewEnabled();

  const isHovering = Boolean(hoveredName);

  return (
  <>
  <div className="absolute inset-0 pointer-events-none">
      {/* Center title with brightness animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="h-full w-full flex flex-col items-center justify-center text-center"
      >
        <motion.h1
          animate={{
            opacity: isHovering ? 1 : 0.85,
            filter: isHovering ? "drop-shadow(0 0 18px rgba(212,154,67,0.45))" : "drop-shadow(0 0 0 rgba(0,0,0,0))",
          }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
          className="text-5xl md:text-7xl font-semibold text-[#f3c77b]"
        >
          {/* Prashant Rajendra Naikar */}
        </motion.h1>
        {/* Floating glowing button */}
        <motion.button
          initial={{ y: 0, boxShadow: "0 0 0 #d49a43" }}
          animate={{
            y: [0, -12, 0],
            boxShadow: [
              "0 0 0 #d49a43",
              "0 0 32px #d49a43aa",
              "0 0 0 #d49a43"
            ],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 2.8,
              ease: "easeInOut",
            },
            boxShadow: {
              repeat: Infinity,
              duration: 2.8,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.08,
            filter: "drop-shadow(0 0 24px #f3c77b) brightness(1.2)",
            borderImage: "linear-gradient(90deg,#f3c77b,#d49a43) 1"
          }}
          onClick={() => {
            // TODO: trigger camera scroll or next section animation
            // For now, just log
            window.dispatchEvent(new CustomEvent("galaxy-float-btn-click"));
          }}
          className="mt-8 mx-auto px-8 py-3 rounded-full border-2 border-transparent bg-[#0a0a0a]/80 text-[#f3c77b] font-semibold text-lg shadow-[0_0_24px_rgba(212,154,67,0.18)] transition-all duration-300 cursor-pointer select-none"
          style={{
            borderImage: "linear-gradient(90deg,#f3c77b,#d49a43) 1",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "transparent",
          }}
        >
          Explore the Galaxy
        </motion.button>
        <p className="mt-4 text-lg md:text-2xl text-gray-300">
          Hover planets to reveal details
        </p>
        {hoveredName && (
          <motion.p
            key={hoveredName}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mt-4 text-[#d49a43] font-medium"
          >
            {hoveredName}
          </motion.p>
        )}
      </motion.div>

      {/* Tooltip near pointer */}
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

    {/* Clickable controls layer (does not block whole screen) */}
    <div className="pointer-events-none">
      {/* Back to Galaxy button - centered bottom */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 bottom-12 z-20"
        initial={{ opacity: 0, y: 8 }}
        animate={selectedPlanet ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ pointerEvents: selectedPlanet ? 'auto' : 'none' }}
      >
        <button
          onClick={() => returnToOverview?.()}
          className="pointer-events-auto px-5 py-2 rounded-full border border-[#2a2a2a] bg-black/70 text-[#f3c77b] backdrop-blur-md font-medium shadow-[0_0_24px_rgba(243,199,123,0.25)] hover:shadow-[0_0_36px_rgba(243,199,123,0.35)] transition"
        >
          ← Back to Galaxy
        </button>
      </motion.div>

      {/* Global preview badge (clickable) */}
      {previewEnabled && (
        <div className="fixed left-4 bottom-4 z-20 pointer-events-auto">
          <div className="flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-black/70 px-3 py-1.5 shadow-[0_0_18px_rgba(243,199,123,0.25)]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#f3c77b] animate-pulse" />
            <span className="text-xs font-medium text-[#f3c77b]">
              {GPT5_CODEX_LABEL}
            </span>
          </div>
        </div>
      )}
    </div>
  </>
  );
}
