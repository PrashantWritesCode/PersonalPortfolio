"use client";
import { philosophy } from "../data";
import { motion } from "framer-motion";
import { wordReveal, fadeInUp, staggerContainer } from "../lib/animations";

type PhilosophyItem = {
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  detail: string;
};

function PhilosophyCard({ item }: { item: PhilosophyItem }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-deep-surface border border-deep-border rounded-xl p-6 hover:border-amber-dim transition-colors duration-300"
    >
      <span className="text-amber-dim text-xs font-medium uppercase tracking-wider">
        {item.tag}
      </span>
      <h3 className="text-xl font-semibold text-neutral-100 mt-3 mb-2">
        {item.title}
      </h3>
      <h4 className="text-amber-muted font-medium text-sm mb-3">
        {item.subtitle}
      </h4>
      <p className="text-neutral-300 text-sm leading-relaxed">
        {item.excerpt}
      </p>
    </motion.div>
  );
}

export default function Philosophy() {
  const quote = "I believe in building systems that empower people, not just solve problems.";
  const words = quote.split(' ');

  return (
    <section className="relative py-32 bg-deep-bg text-neutral-100 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-neutral-100 mb-16 text-center"
        >
          Philosophy
        </motion.h2>

        {/* Large Quote */}
        <div className="mb-16 text-center">
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-medium italic text-neutral-100 leading-relaxed mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={wordReveal}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: words.length * 0.1 + 0.3, duration: 0.6 }}
            className="text-lg text-amber-muted"
          >
            — My approach to engineering
          </motion.p>
        </div>

        {/* Philosophy Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {philosophy.map((item) => (
            <PhilosophyCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}