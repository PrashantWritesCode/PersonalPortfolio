"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

export default function Home() {
  // Cinematic intro state
  const [sceneReady, setSceneReady] = React.useState(false);
  const [starGlow, setStarGlow] = React.useState(0);
  // planetGlow is reserved for future use (e.g., if you add planet visuals)
  // Remove unused setPlanetGlow

  React.useEffect(() => {
    // Fade in scene from black
    setTimeout(() => setSceneReady(true), 100);
    // Animate star and planet glow
    let frame = 0;
    function animate() {
      frame++;
  setStarGlow(Math.min(1, frame / 60));
      if (frame < 90) requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
  <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-black via-[#0a0a0a] to-[#1b1b1b] text-white relative overflow-hidden">
      {/* Cinematic fade-in overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: sceneReady ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-black z-30 pointer-events-none"
      />

      {/* Background Glow, star/planet brightness animated */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 + starGlow * 0.35 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -inset-[100px] bg-[radial-gradient(circle_at_center,#d49a43_0%,transparent_70%)] blur-3xl animate-pulse"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: sceneReady ? 1 : 0, y: sceneReady ? 0 : 60 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="z-10 text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: sceneReady ? 1 : 0, scale: sceneReady ? 1 : 0.95 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="text-5xl md:text-6xl font-semibold text-[#f3c77b] mb-4"
        >
          Welcome to My Portfolio Realms
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sceneReady ? 1 : 0.2, y: sceneReady ? 0 : 20 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 }}
          className="text-gray-300 mb-10 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Explore the different versions of my portfolio — each one tells a unique story about my
          growth, creativity, and engineering journey.
        </motion.p>

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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sceneReady ? 1 : 0, y: sceneReady ? 0 : 20 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.4 }}
          className="text-gray-500 mt-12 text-sm"
        >
          Crafted with Dharma & Code ✨ | © 2025 Prashant Rajendra Naikar
        </motion.p>
      </motion.div>
    </main>
  );
}
