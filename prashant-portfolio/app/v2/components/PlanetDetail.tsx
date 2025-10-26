"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGalaxyStore } from "../state/galaxyStore";

// Simple shared data: description, years, and moons per planet
// Keep local for now to avoid wider refactors
const DETAILS: Record<string, {
  description: string;
  years?: string;
  moons: Array<{ name: string; radius: number; speed: number; color?: string; size?: number }>
}> = {
  Mercury: {
    description: "Swift prototyping and rapid iteration cycles. Closest to the source of innovation.",
    years: "Lightning fast",
    moons: [] // Mercury has no moons
  },
  Venus: {
    description: "Beautiful interfaces and elegant design solutions. The morning star of creativity.",
    years: "Aesthetic mastery",
    moons: [] // Venus has no moons
  },
  Earth: {
    description: "Full-stack development sustaining digital ecosystems. Home base of expertise.",
    years: "5+ years foundation",
    moons: [
      { name: "Moon", radius: 34, speed: 12, color: "#f3c77b", size: 6 },
    ]
  },
  Mars: {
    description: "Pioneering new technologies and bold exploration. The red planet of innovation.",
    years: "Frontier spirit",
    moons: [
      { name: "Phobos", radius: 28, speed: 10, color: "#d49a43", size: 4 },
      { name: "Deimos", radius: 42, speed: 16, color: "#f6b67e", size: 3 },
    ]
  },
  Jupiter: {
    description: "Massive system architecture and gravitational leadership. The giant of scalability.",
    years: "Enterprise dominion",
    moons: [
      { name: "Io", radius: 36, speed: 10, color: "#f3c77b", size: 4 },
      { name: "Europa", radius: 48, speed: 14, color: "#a7c7e7", size: 4 },
      { name: "Ganymede", radius: 60, speed: 18, color: "#b98239", size: 5 },
      { name: "Callisto", radius: 74, speed: 22, color: "#f6b67e", size: 4 },
    ]
  },
  Saturn: {
    description: "Structured frameworks with elegant dependency rings. The architect's crown jewel.",
    years: "System mastery",
    moons: [
      { name: "Titan", radius: 46, speed: 12, color: "#f3c77b", size: 5 },
      { name: "Enceladus", radius: 62, speed: 18, color: "#a7c7e7", size: 4 },
      { name: "Rhea", radius: 78, speed: 22, color: "#d49a43", size: 4 },
    ]
  },
  Uranus: {
    description: "Unconventional solutions rotating on a unique axis. The innovator's edge.",
    years: "Revolutionary thinking",
    moons: [
      { name: "Miranda", radius: 36, speed: 12, color: "#a7c7e7", size: 4 },
      { name: "Titania", radius: 54, speed: 16, color: "#f3c77b", size: 4 },
      { name: "Oberon", radius: 72, speed: 20, color: "#d49a43", size: 4 },
    ]
  },
};

function MiniOrbit({
  planetColor = "#f3c77b",
  moons,
}: {
  planetColor?: string;
  moons: Array<{ name: string; radius: number; speed: number; color?: string; size?: number }>;
}) {
  return (
    <div className="relative mx-auto my-4" style={{ width: 220, height: 220 }}>
      {/* Central planet */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_28px_rgba(243,199,123,0.45)]"
        style={{ width: 28, height: 28, background: planetColor }}
      />

      {/* Orbits + moons */}
  {moons.map((m) => (
        <div key={m.name} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Orbit ring */}
          <div
            className="rounded-full border border-[#2a2a2a]"
            style={{ width: m.radius * 2, height: m.radius * 2 }}
          />
          {/* Rotator wrapper for this moon */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: m.speed }}
            style={{ width: 0, height: 0 }}
          >
            {/* Moon dot positioned at orbit radius */}
            <div
              className="rounded-full shadow-[0_0_16px_rgba(243,199,123,0.5)]"
              style={{
                width: (m.size ?? 4),
                height: (m.size ?? 4),
                background: m.color ?? "#f3c77b",
                transform: `translateX(${m.radius}px)`,
              }}
              title={m.name}
            />
          </motion.div>
        </div>
      ))}

      {moons.length === 0 && (
        <div className="absolute inset-0 grid place-items-center text-xs text-gray-400">
          No moons
        </div>
      )}
    </div>
  );
}

export default function PlanetDetail() {
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);
  const returnToOverview = useGalaxyStore((s) => s.returnToOverview);

  const details = selectedPlanet ? DETAILS[selectedPlanet] : null;

  return (
    <AnimatePresence>
      {selectedPlanet && details && (
        <motion.aside
          key={selectedPlanet}
          initial={{ x: 360, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 360, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="fixed top-0 right-0 h-full z-30 pointer-events-auto"
          style={{ width: "min(92vw, 380px)", background: "#0a0a0a80", backdropFilter: "blur(10px)" }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
              <div>
                <h3 className="text-xl font-semibold text-[#f3c77b]">{selectedPlanet}</h3>
                {details.years && (
                  <p className="text-xs text-[#d49a43] mt-0.5">{details.years}</p>
                )}
              </div>
              <button
                onClick={() => returnToOverview?.()}
                className="px-3 py-1 rounded-full border border-[#2a2a2a] bg-black/70 text-[#f3c77b] hover:bg-black/60 transition"
              >
                ← Back to Galaxy
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-sm text-gray-200 leading-relaxed">
                {details.description}
              </p>

              {/* Mini orbit visual */}
              <MiniOrbit moons={details.moons} />

              {/* Moons list */}
              {details.moons.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs uppercase tracking-wide text-[#f3c77b] mb-2">Moons</div>
                  <ul className="space-y-1 text-sm text-gray-200">
                    {details.moons.map((m) => (
                      <li key={m.name} className="flex items-center gap-2">
                        <span
                          className="inline-block rounded-full"
                          style={{ width: 8, height: 8, background: m.color ?? "#f3c77b", boxShadow: "0 0 8px rgba(243,199,123,0.6)" }}
                        />
                        <span className="flex-1">{m.name}</span>
                        <span className="text-xs text-gray-400">r={m.radius}px · speed={m.speed}s</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
