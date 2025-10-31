"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JOURNAL_ENTRIES } from "../../data/journal";
import { useGalaxyStore } from "../../state/galaxyStore";

export default function BuilderJournalModal() {
  const isOpen = useGalaxyStore((s) => s.journalModalOpen);
  const close = useGalaxyStore((s) => s.closeJournalModal);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden
            onClick={close}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-[92vw] max-w-3xl max-h-[82vh] overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0b0b0f]/85 shadow-[0_0_60px_rgba(212,154,67,0.25)]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {/* Halo */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-linear-to-b from-[#d49a43]/15 via-transparent to-transparent blur-xl" />

            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#232323] bg-[#0b0b0f]/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-linear-to-b from-[#d49a43] via-[#f3c77b] to-[#d49a43] shadow-[0_0_24px_#d49a43]" />
                <h3 className="text-lg font-semibold text-[#f3c77b] drop-shadow-[0_0_10px_rgba(243,199,123,0.25)]">Builder&apos;s Journal</h3>
              </div>
              <button onClick={close} className="rounded-md border border-[#2a2a2a] bg-black/40 px-3 py-1.5 text-sm text-gray-200 hover:border-[#d49a43] hover:text-white hover:shadow-[0_0_18px_rgba(212,154,67,0.35)]">
                Close
              </button>
            </div>

            {/* Content */}
            <div className="relative max-h-[70vh] overflow-y-auto px-5 py-4">
              <ul className="space-y-6">
                {JOURNAL_ENTRIES.map((e) => (
                  <li key={e.id} className="rounded-xl border border-[#1f1f1f] bg-black/30 p-4 hover:border-[#2e2e2e]">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-base font-semibold text-[#f3c77b]">{e.title}</h4>
                      <span className="text-xs text-gray-400">{new Date(e.date).toLocaleDateString()}</span>
                    </div>
                    {e.summary && <p className="mb-2 text-sm text-gray-200/90">{e.summary}</p>}
                    {e.tags && (
                      <div className="mb-2 flex flex-wrap gap-2">
                        {e.tags.map((t) => (
                          <span key={t} className="rounded-md border border-[#2a2a2a] bg-black/40 px-2 py-0.5 text-[11px] text-gray-300">#{t}</span>
                        ))}
                      </div>
                    )}
                    <article className="prose prose-invert prose-sm max-w-none">
                      {e.content.map((c, idx) => {
                        if (c.type === "p") return <p key={idx} className="text-gray-200/90">{c.text}</p>;
                        if (c.type === "h3") return <h5 key={idx} className="mt-3 text-[#f3c77b]">{c.text}</h5>;
                        if (c.type === "li") return (
                          <ul key={idx} className="list-disc pl-5 text-gray-200/90">
                            <li>{c.text}</li>
                          </ul>
                        );
                        return null;
                      })}
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
