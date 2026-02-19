"use client";
import { journey } from "../data";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/animations";

type Milestone = {
  year: string;
  title: string;
  description: string;
};

function TimelineItem({ milestone, index }: { milestone: Milestone; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative pl-12 pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-amber-muted ring-4 ring-amber-muted/20" />
      
      {/* Timeline line */}
      {index < journey.length - 1 && (
        <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-deep-border" />
      )}
      
      {/* Content */}
      <div className="bg-deep-surface border border-deep-border rounded-xl p-6 hover:border-amber-dim transition-colors duration-300">
        <span className="text-amber-muted text-sm font-medium">
          {milestone.year}
        </span>
        <h3 className="text-2xl font-semibold text-neutral-100 mt-2 mb-3">
          {milestone.title}
        </h3>
        <p className="text-neutral-300 leading-relaxed">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section className="relative py-32 bg-deep-bg text-neutral-100">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-neutral-100 mb-16 text-center"
        >
          My Journey
        </motion.h2>
        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative"
        >
          {journey.map((milestone, idx) => (
            <TimelineItem key={milestone.year} milestone={milestone} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
