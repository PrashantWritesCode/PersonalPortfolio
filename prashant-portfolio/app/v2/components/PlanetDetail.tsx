"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useGalaxyStore } from "../state/galaxyStore";
import { projects } from "../data/projects";

// Project data structure - each planet represents a project
type ProjectData = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights?: string[];
  media?: { src: string; alt?: string }[];
  importance: number;
  featured?: boolean;
};

// Convert projects array to a map keyed by name for easy lookup
const PROJECTS: Record<string, ProjectData> = projects.reduce((acc, project) => {
  acc[project.name] = project;
  return acc;
}, {} as Record<string, ProjectData>);

function StackBadge({ tech }: { tech: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-xs text-[#f3c77b] font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-[#f3c77b] shadow-[0_0_6px_rgba(243,199,123,0.6)]" />
      {tech}
    </span>
  );
}

function MediaThumb({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#0f0f0f]" style={{ boxShadow: "0 0 28px rgba(243,199,123,0.12) inset" }}>
      {!errored ? (
        <div className="relative w-full h-40">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            onError={() => setErrored(true)}
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>
      ) : (
        <div
          className="w-full h-40 flex items-center justify-center text-sm text-gray-400"
          style={{
            background: "radial-gradient(closest-side, rgba(243,199,123,0.08), rgba(212,154,67,0.06), transparent)",
          }}
        >
          Preview coming soon
        </div>
      )}
    </div>
  );
}

export default function PlanetDetail() {
  const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);
  const returnToOverview = useGalaxyStore((s) => s.returnToOverview);

  const project = selectedPlanet ? PROJECTS[selectedPlanet] : null;

  return (
    <>
      <AnimatePresence>
        {selectedPlanet && project && (
          <motion.aside
            key={selectedPlanet}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="fixed top-0 right-0 h-full z-30 pointer-events-auto"
            style={{ 
              width: "min(92vw, 460px)", 
              background: "linear-gradient(to left, rgba(10,10,10,0.95), rgba(10,10,10,0.88))", 
              backdropFilter: "blur(16px)",
              borderLeft: "1px solid #2a2a2a",
              boxShadow: "0 0 60px rgba(243,199,123,0.14)"
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-[#2a2a2a]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-[#f3c77b] mb-1">{project.name}</h3>
                    <p className="text-sm text-[#d49a43] italic">{project.tagline}</p>
                  </div>
                  <button
                    onClick={() => returnToOverview?.()}
                    className="px-3 py-1.5 rounded-lg border border-[#2a2a2a] bg-black/50 text-[#f3c77b] hover:bg-black/70 hover:border-[#f3c77b] transition text-sm"
                    title="Return to overview"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Media Previews */}
                {project.media && project.media.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-[#d49a43] mb-3 font-semibold">Preview</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {project.media.slice(0, 2).map((m, idx) => (
                        <MediaThumb key={idx} src={m.src} alt={m.alt ?? project.name} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-[#d49a43] mb-2 font-semibold">Overview</h4>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-[#d49a43] mb-3 font-semibold">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <StackBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-[#d49a43] mb-3 font-semibold">Key Features</h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-200">
                          <span className="text-[#f3c77b] mt-0.5">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-3 rounded-lg bg-linear-to-r from-[#f3c77b] to-[#d49a43] text-black font-semibold text-center hover:shadow-[0_0_20px_rgba(243,199,123,0.4)] transition-all"
                    >
                      Visit Live Project →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-3 rounded-lg border border-[#2a2a2a] bg-black/30 text-[#f3c77b] text-center hover:bg-black/50 hover:border-[#f3c77b] transition-all"
                    >
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Back to Galaxy - Persistent bottom center button */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
          >
            <button
              onClick={() => returnToOverview?.()}
              className="px-6 py-3 rounded-full bg-linear-to-r from-[#0a0a0a] to-[#1a1a1a] border-2 border-[#f3c77b] text-[#f3c77b] font-semibold shadow-[0_0_24px_rgba(243,199,123,0.3)] hover:shadow-[0_0_32px_rgba(243,199,123,0.5)] transition-all backdrop-blur-sm"
            >
              ← Back to Galaxy
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
