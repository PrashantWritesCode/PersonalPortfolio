"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#0a0a0a] to-[#1b1b1b] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -inset-[100px] bg-[radial-gradient(circle_at_center,#d49a43_0%,transparent_70%)] opacity-25 blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-semibold text-[#f3c77b] mb-4">
          Welcome to My Portfolio Realms
        </h1>
        <p className="text-gray-300 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
          Explore the different versions of my portfolio — each one tells a unique story about my
          growth, creativity, and engineering journey.
        </p>

        {/* Version Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* V1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-xl bg-[#d49a43] text-black font-medium hover:bg-[#f3c77b] transition shadow-[0_0_20px_#d49a43aa]"
          >
            <Link href="/v1">Builder’s Realm (v1)</Link>
          </motion.div>

          {/* V2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-xl border border-[#d49a43] text-[#f3c77b] hover:bg-[#d49a43]/10 transition"
          >
            <Link href="/v2">Code Temple (Coming Soon)</Link>
          </motion.div>

          {/* V3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-xl border border-[#f3c77b]/50 text-[#f3c77b]/70 hover:bg-[#f3c77b]/5 transition"
          >
            <Link href="/v3">Energy Flow (Coming Soon)</Link>
          </motion.div>
        </div>

        <p className="text-gray-500 mt-12 text-sm">
          Crafted with Dharma & Code ✨ | © 2025 Prashant Rajendra Naikar
        </p>
      </motion.div>
    </main>
  );
}
