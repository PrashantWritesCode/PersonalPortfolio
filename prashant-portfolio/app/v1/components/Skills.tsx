"use client";
import { motion } from "framer-motion";
import { skills } from "../data";

const categoryConfig = {
  frontend: { title: "Frontend", color: "border-blue-500/30" },
  backend: { title: "Backend", color: "border-green-500/30" },
  cloudDevOps: { title: "Cloud & DevOps", color: "border-purple-500/30" },
  databases: { title: "Databases", color: "border-orange-500/30" },
  aiAutomation: { title: "AI & Automation", color: "border-pink-500/30" },
  architecture: { title: "Architecture", color: "border-amber-500/30" },
};

function SkillLayer({ category, techs, index }: { category: string; techs: string[]; index: number }) {
  const config = categoryConfig[category as keyof typeof categoryConfig];
  const isArchitecture = category === "architecture";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative bg-deep-surface border ${config.color} rounded-xl p-6 ${
        isArchitecture ? "border-2 bg-gradient-to-br from-amber-muted/5 to-transparent" : ""
      }`}
    >
      {/* Category Title */}
      <h3 className={`text-lg font-semibold mb-4 ${
        isArchitecture ? "text-amber-muted" : "text-neutral-200"
      }`}>
        {config.title}
      </h3>

      {/* Tech Chips */}
      <div className="flex flex-wrap gap-2">
        {techs.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.04, duration: 0.4 }}
            className={`px-3 py-1.5 rounded-full text-sm ${
              isArchitecture
                ? "bg-amber-muted/10 text-amber-muted border border-amber-dim"
                : "bg-deep-bg text-neutral-300 border border-deep-border"
            }`}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-deep-bg text-neutral-100">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Technical Stack
          </h2>
          <p className="text-neutral-400 text-lg">
            Organized by architectural layer
          </p>
        </motion.div>

        {/* Skill Layers */}
        <div className="space-y-6">
          {Object.entries(skills).map(([category, techs], index) => (
            <SkillLayer
              key={category}
              category={category}
              techs={techs}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
