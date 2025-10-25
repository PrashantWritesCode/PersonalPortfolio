"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function FadeInUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-[#1f1f1f] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.4)] hover:shadow-[0_0_32px_#d49a43aa] hover:border-[#d49a43] transition-all duration-300">
    {/* subtle top highlight */}
    <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-[#f3c77b]/40 to-transparent" />
    {children}
  </div>
);

const Dot = ({ className = "" }: { className?: string }) => (
  <span className={`inline-block h-2 w-2 rounded-full bg-[#f3c77b] shadow-[0_0_12px_#f3c77b] ${className}`} />
);

const IconButton = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#121212] border border-[#232323] hover:border-[#d49a43] text-[#f3c77b] hover:text-black hover:bg-[#f3c77b] transition-all duration-300 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_#d49a43aa]"
  >
    {children}
  </a>
);

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-5xl px-6">
        <FadeInUp>
          <h2 className="text-center text-4xl md:text-5xl font-bold text-[#f3c77b] drop-shadow-[0_0_14px_#d49a43aa]">
            Let’s Build Together
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <p className="mt-3 text-center text-gray-300 max-w-2xl mx-auto">
            I collaborate on premium products, micro‑SaaS, and engineering builds. No fluff—just shipping.
          </p>
        </FadeInUp>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct Contact Card */}
          <FadeInUp>
            <Card>
              <h3 className="text-xl font-semibold text-[#d49a43] mb-4">Direct Contact</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">Email</span>
                  <a
                    href="mailto:your@email"
                    className="text-[#f3c77b] hover:text-black hover:bg-[#f3c77b] px-2 py-1 rounded-md transition-colors"
                  >
                    your@email
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">Location</span>
                  <span className="text-gray-200">India • Remote</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">Availability</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#121212] px-3 py-1 text-xs text-gray-200">
                    <Dot />
                    Open to Collaborate
                  </span>
                </div>
              </div>
            </Card>
          </FadeInUp>

          {/* Social Links Card */}
          <FadeInUp delay={0.05}>
            <Card>
              <h3 className="text-xl font-semibold text-[#d49a43] mb-4">Social</h3>
              <div className="flex items-center gap-4">
                <IconButton href="https://github.com/prashantnaikar" label="GitHub">
                  {/* GitHub Icon */}
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.4-3.9-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.7.08-.7 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.57-.29-5.28-1.28-5.28-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.75.81 1.2 1.84 1.2 3.1 0 4.43-2.72 5.41-5.31 5.7.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
                  </svg>
                </IconButton>
                <IconButton href="https://linkedin.com/in/" label="LinkedIn">
                  {/* LinkedIn Icon */}
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.35c0-1.28-.02-2.94-1.8-2.94-1.8 0-2.07 1.4-2.07 2.85V21H9z" />
                  </svg>
                </IconButton>
                <IconButton href="https://x.com/" label="X">
                  {/* X Icon */}
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2H21l-6.53 7.46L22 22h-6.91l-4.36-5.7L5.6 22H3l7.06-8.06L2 2h7l3.9 5.2L18.244 2zm-2.42 18h1.67L8.26 4H6.51l9.31 16z"/>
                  </svg>
                </IconButton>
              </div>
            </Card>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}