"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-deep-bg text-neutral-100">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-muted/5 via-transparent to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Upper line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl text-neutral-400 tracking-wide mb-3"
        >
          Open to
        </motion.p>

        {/* Main heading with gold accent on key words */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold mb-10"
        >
          <span className="text-neutral-100">Impactful </span>
          <span className="bg-gradient-to-r from-amber-muted to-amber-glow bg-clip-text text-transparent">Engineering roles</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-neutral-300 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Focused on scalable architecture, enterprise integrations, and AI-enabled automation.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <a
            href="mailto:prashantnaikar29@gmail.com"
            className="inline-block px-10 py-4 bg-amber-muted text-deep-bg font-semibold rounded-lg hover:bg-amber-glow transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-muted/20"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <a
            href="mailto:prashantnaiker9@gmail.com"
            className="text-neutral-300 hover:text-amber-muted transition-colors text-lg"
          >
            prashantnaiker9@gmail.com
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://github.com/PrashantWritesCode"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-neutral-300 hover:text-amber-muted transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.4-3.9-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.7.08-.7 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.57-.29-5.28-1.28-5.28-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.75.81 1.2 1.84 1.2 3.1 0 4.43-2.72 5.41-5.31 5.7.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
            </svg>
            <span className="group-hover:underline">GitHub</span>
          </a>
          
          <span className="text-neutral-400">•</span>
          
          <a
            href="https://www.linkedin.com/in/prashant-naiker-64655b239"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-neutral-300 hover:text-amber-muted transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.35c0-1.28-.02-2.94-1.8-2.94-1.8 0-2.07 1.4-2.07 2.85V21H9z" />
            </svg>
            <span className="group-hover:underline">LinkedIn</span>
          </a>
          
          <span className="text-neutral-400">•</span>
          
          <a
            href="https://x.com/heyPrashantt"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-neutral-300 hover:text-amber-muted transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M18.244 2H21l-6.53 7.46L22 22h-6.91l-4.36-5.7L5.6 22H3l7.06-8.06L2 2h7l3.9 5.2L18.244 2zm-2.42 18h1.67L8.26 4H6.51l9.31 16z"/>
            </svg>
            <span className="group-hover:underline">X</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}