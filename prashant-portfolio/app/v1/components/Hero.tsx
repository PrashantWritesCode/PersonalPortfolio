"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#1b1b1b] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -inset-[100px] bg-[radial-gradient(circle_at_center,#d49a43_0%,transparent_70%)] opacity-30 blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#f3c77b]">
          Prashant Rajendra Naikar
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
