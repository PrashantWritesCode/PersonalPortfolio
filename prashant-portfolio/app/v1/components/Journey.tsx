"use client";
import { journey } from "../data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

type Milestone = {
  year: string;
  title: string;
  description: string;
};

function MilestoneCard({ milestone, isLeft }: { milestone: Milestone; isLeft: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`mb-12 flex ${isLeft ? "justify-start" : "justify-end"} relative`}
    >
      {/* Glowing Orb */}
  <div className="w-8 h-8 bg-linear-to-b from-[#d49a43] via-[#f3c77b] to-[#d49a43] rounded-full border-4 border-[#f3c77b] shadow-[0_0_32px_#d49a43] animate-pulse absolute left-1/2 transform -translate-x-1/2 -top-4"></div>
      <div
        className={`bg-[#111] p-6 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 border border-[#222] hover:shadow-[0_0_32px_#d49a43aa] hover:border-[#d49a43] ${isLeft ? "mr-auto" : "ml-auto"} max-w-xs`}
      >
        <div className="flex items-center mb-2">
          <span className="text-[#f3c77b] font-semibold text-lg mr-3 drop-shadow-[0_0_8px_#d49a43]">{milestone.year}</span>
          <span className="text-[#d49a43] font-bold text-xl drop-shadow-[0_0_8px_#d49a43]">{milestone.title}</span>
        </div>
        <p className="text-gray-200 text-base md:text-lg leading-relaxed">{milestone.description}</p>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section className="relative py-20 bg-[#0a0a0a] text-white overflow-x-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#d49a43] drop-shadow-[0_0_16px_#d49a43aa]">
        My Journey So Far
      </h2>
      <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Vertical Glowing Line */}
  <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-2 bg-linear-to-b from-[#d49a43] via-[#f3c77b] to-transparent shadow-[0_0_32px_#d49a43] animate-pulse pointer-events-none z-0" />
        <div className="relative z-10 w-full">
          {journey.map((milestone, idx) => (
            <MilestoneCard key={milestone.year} milestone={milestone} isLeft={idx % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

