"use client";
import { philosophy } from "../data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

type PhilosophyCardProps = {
  title: string;
  subtitle: string;
  excerpt: string;
  detail: string;
  tag: string;
};

function PhilosophyCard({ title, subtitle, excerpt, detail, tag }: PhilosophyCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, ease: "easeOut" }}
  className="bg-[#111]/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-transparent hover:border-[#d49a43] hover:shadow-[0_0_32px_#d49a43aa] transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      title={detail}
    >
      <h3 className="text-[#f3c77b] font-semibold text-lg mb-1">{title}</h3>
      <h4 className="text-[#d49a43] font-bold text-md mb-2">{subtitle}</h4>
      <p className="text-gray-200 text-sm mb-4">{excerpt}</p>
    </motion.div>
  );
}
export default function Philosophy() {
  return (
    <section className="relative py-20 bg-[#070707] text-white px-6 overflow-hidden">
      {/* Sanskrit Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[12rem] md:text-[20rem] font-serif text-[#d49a43]/10 drop-shadow-[0_0_32px_#d49a43]" style={{fontFamily: 'serif', letterSpacing: '0.1em', userSelect: 'none'}}>धर्म</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#d49a43] drop-shadow-[0_0_16px_#d49a43aa]">
        Philosophy & Principles
      </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {philosophy.map((item) => (
          <PhilosophyCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            excerpt={item.excerpt}
            detail={item.detail}
            tag={item.tag}
          />
        ))}
      </div>
    </section>
  );
}       