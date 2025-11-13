"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section cosmic-bg" style={{ minHeight: "100vh" }}>
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
        {/* Headline with staggered fade-in */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 glow-text tracking-tight"
        >
          I BUILD.
          <br />
          I SHIP.
          <br />
          I SOLVE.
        </motion.h1>

        {/* Subtext with delayed fade-in */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted mb-12 font-light tracking-wide"
        >
          Fullstack Builder | .NET + Angular + Azure
        </motion.p>

        {/* CTA Buttons with fade and scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            onClick={() => scrollToSection("projects")}
            className="btn text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            View My Builds
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="btn text-lg px-8 py-4"
            style={{
              background: "transparent",
              border: "2px solid var(--accent)",
              color: "var(--accent)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Work With Me
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-accent"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
