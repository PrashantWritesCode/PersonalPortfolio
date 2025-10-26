"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* --- Background image --- */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-80"></div>
        {/* Soft dark overlay for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.85)_90%)]" />
      </div>

      {/* --- Centered radial light source --- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,199,123,0.18)_0%,rgba(243,199,123,0.12)_12%,rgba(10,10,10,0)_55%)]" />
      </div>

      {/* --- Subtle golden galaxy swirl overlay --- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-[-20%] bg-[conic-gradient(from_30deg_at_50%_50%,rgba(243,199,123,0.08)_0deg,rgba(212,154,67,0.04)_120deg,transparent_300deg)] blur-2xl opacity-70 mask-[radial-gradient(circle_at_center,white_30%,transparent_65%)]" />
      </div>

      {/* --- Edge vignette for cinematic fade to black --- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* --- Optional noise/stars texture --- */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/><feColorMatrix type=\"saturate\" values=\"0\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.9\"/></svg>')",
          backgroundSize: "120px 120px",
        }}
      />

      {/* --- Content --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#f3c77b]">
          Prashant Naikar
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-gray-300">
          Full-Stack Developer • .NET Core & Angular • Azure Certified • Product Builder
        </p>

        <p className="mt-6 text-gray-400 italic">
          “I build meaningful products that connect technology with purpose.”
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-[#d49a43] text-black font-medium hover:bg-[#f3c77b] transition">
            View Projects
          </button>
          <button className="px-6 py-3 rounded-xl border border-[#d49a43] text-[#f3c77b] hover:bg-[#d49a43]/10 transition">
            See My Journey
          </button>
        </div>
      </motion.div>
    </section>
  );
}
