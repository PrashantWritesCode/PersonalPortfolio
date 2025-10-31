"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGalaxyStore } from "../../state/galaxyStore";

function Icon({ kind, href }: { kind: "github" | "linkedin" | "twitter"; href: string }) {
  const common = "h-5 w-5 md:h-6 md:w-6 drop-shadow-[0_0_10px_rgba(243,199,123,0.45)]";
  const props: React.SVGProps<SVGSVGElement> = { className: common };
  if (kind === "github") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-black/40 border border-[#2a2a2a] hover:bg-black/60 transition shadow-[0_0_16px_rgba(243,199,123,0.2)]">
        <svg viewBox="0 0 24 24" fill="#f3c77b" {...props}><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.76.09-.75.09-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.67-.31-5.48-1.34-5.48-5.95 0-1.32.47-2.39 1.24-3.23-.13-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.69.25 2.94.12 3.25.77.84 1.24 1.91 1.24 3.23 0 4.62-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>
      </a>
    );
  }
  if (kind === "linkedin") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-black/40 border border-[#2a2a2a] hover:bg-black/60 transition shadow-[0_0_16px_rgba(243,199,123,0.2)]">
        <svg viewBox="0 0 24 24" fill="#f3c77b" {...props}><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8 8.5h3.83v1.98h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.09V23h-4v-6.43c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.39V23H8z"/></svg>
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-black/40 border border-[#2a2a2a] hover:bg-black/60 transition shadow-[0_0_16px_rgba(243,199,123,0.2)]">
      <svg viewBox="0 0 24 24" fill="#f3c77b" {...props}><path d="M23.4 4.9c-.8.4-1.7.7-2.6.8a4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.9 1.1 4.5 4.5 0 0 0-7.8 4.1A12.7 12.7 0 0 1 1.5 3.2a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.6 4.6 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9.1 9.1 0 0 1 0 20.5a12.8 12.8 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.4 2.2-2.2Z"/></svg>
    </a>
  );
}

export default function SunIdentityModal() {
  const sunModalOpen = useGalaxyStore((s) => s.sunModalOpen);
  const closeSunModal = useGalaxyStore((s) => s.closeSunModal);

  // Close on ESC
  useEffect(() => {
    if (!sunModalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSunModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sunModalOpen, closeSunModal]);

  return (
    <AnimatePresence>
      {sunModalOpen && (
        <motion.div
          key="sun-modal-backdrop"
          className="fixed inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={closeSunModal}
          />

          {/* Rotating halo behind modal */}
          <motion.div
            aria-hidden
            className="absolute w-[520px] h-[520px] rounded-full"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            style={{
              background:
                "radial-gradient(closest-side, rgba(243,199,123,0.28), rgba(212,154,67,0.12), transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Modal card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-[90%] max-w-xl rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a]/70 backdrop-blur-xl p-6 md:p-8 shadow-[0_0_40px_rgba(243,199,123,0.25)]"
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Glow border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: "0 0 80px rgba(243,199,123,0.18) inset" }} />

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#f3c77b]">Prashant Naikar</h2>
                <p className="text-sm md:text-base text-gray-300 mt-1">Full‑Stack Engineer • Creative Systems Builder</p>
              </div>
              <button
                onClick={closeSunModal}
                aria-label="Close"
                className="px-3 py-1.5 rounded-md border border-[#2a2a2a] bg-black/50 text-gray-300 hover:text-white hover:bg-black/70 transition"
              >
                ✕
              </button>
            </div>

            {/* Quote */}
            <p className="mt-4 italic text-gray-300">“Design with empathy. Engineer with rigor. Deliver with delight.”</p>

            {/* Mission */}
            <p className="mt-3 text-gray-200 leading-relaxed">
              I craft immersive, performant web experiences that blend motion, 3D, and systems thinking. My work focuses on
              clarity, polish, and measurable impact.
            </p>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              <Icon kind="linkedin" href="https://www.linkedin.com/in/prashantnaikar" />
              <Icon kind="github" href="https://github.com/PrashantWritesCode" />
              <Icon kind="twitter" href="https://twitter.com/PrashantWrites" />
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-transparent text-[#0b0b0b] font-semibold bg-linear-to-r from-[#f3c77b] to-[#d49a43] shadow-[0_0_24px_rgba(212,154,67,0.35)] hover:shadow-[0_0_36px_rgba(212,154,67,0.5)] transition"
                style={{ borderImage: "linear-gradient(90deg,#f3c77b,#d49a43) 1" }}
              >
                {/* Flare */}
                <span className="pointer-events-none absolute -inset-0.5 rounded-full opacity-30 blur-lg bg-linear-to-r from-[#f3c77b] to-transparent" />
                <span className="relative">Resume</span>
              </a>

              <button
                onClick={closeSunModal}
                className="px-4 py-2 rounded-full border border-[#2a2a2a] bg-black/60 text-gray-200 hover:text-white hover:bg-black/70 transition"
              >
                Back to Galaxy
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
