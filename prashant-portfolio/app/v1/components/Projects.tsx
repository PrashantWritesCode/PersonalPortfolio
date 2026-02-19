"use client";
import { motion } from "framer-motion";
import { professionalWork } from "../data";

// Module card for Radixweb platform
function ModuleCard({ module, index }: { module: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="bg-[#0F1419] border border-[#1A2332] rounded-lg p-5 transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-lg hover:shadow-[#D4AF37]/5"
    >
      <h4 className="text-lg font-semibold text-neutral-100 mb-3">
        {module.name}
      </h4>

      {/* Key Features */}
      <ul className="space-y-1.5 mb-4">
        {module.keyFeatures.map((feature: string, i: number) => (
          <li key={i} className="text-[#9AA4B2] text-sm flex items-start">
            <span className="text-[#D4AF37] mr-2 mt-0.5">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {module.stack.map((tech: string, i: number) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.03, duration: 0.3 }}
            className="px-2.5 py-1 bg-[#0B0F1A] border border-[#D4AF37]/40 rounded-full text-xs text-[#D4AF37] font-medium"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// Radixweb unified platform section
function RadixwebPlatform() {
  const data = professionalWork.radixweb;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20"
    >
      {/* Company Header */}
      <div className="border-l-4 border-[#D4AF37] pl-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
          <h3 className="text-3xl font-bold text-neutral-100">{data.company}</h3>
          <span className="text-[#9AA4B2] text-sm mt-1 md:mt-0">{data.period}</span>
        </div>
        <p className="text-[#D4AF37] text-lg font-medium mb-2">{data.role}</p>
      </div>

      {/* Platform Container */}
      <div className="bg-gradient-to-br from-[#0F1419] to-[#0B0F1A] border-2 border-[#D4AF37]/20 rounded-2xl p-8 shadow-2xl shadow-[#D4AF37]/5">
        {/* Platform Title */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-neutral-100 mb-3">
            {data.platformTitle}
          </h4>
          <p className="text-[#9AA4B2] leading-relaxed">
            {data.platformDescription}
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.modules.map((module: any, index: number) => (
            <ModuleCard key={module.name} module={module} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Project card for Amnex
function AmnexProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="bg-[#0F1419] border border-[#1A2332] rounded-xl p-6 transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-xl hover:shadow-[#D4AF37]/10"
    >
      {/* Project Header */}
      <div className="mb-4">
        <h4 className="text-xl font-bold text-neutral-100 mb-2">
          {project.name}
        </h4>
        {project.scale && (
          <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-3">
            <span className="text-[#D4AF37] text-xs font-semibold">
              Scale: {project.scale}
            </span>
          </div>
        )}
        <p className="text-[#9AA4B2] text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Key Features */}
      <ul className="space-y-1.5 mb-4">
        {project.keyFeatures.map((feature: string, i: number) => (
          <li key={i} className="text-[#9AA4B2] text-sm flex items-start">
            <span className="text-[#D4AF37] mr-2 mt-0.5">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech: string, i: number) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.03, duration: 0.3 }}
            className="px-2.5 py-1 bg-[#0B0F1A] border border-[#D4AF37]/40 rounded-full text-xs text-[#D4AF37] font-medium"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// Amnex section
function AmnexProjects() {
  const data = professionalWork.amnex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Company Header */}
      <div className="border-l-4 border-[#D4AF37] pl-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
          <h3 className="text-3xl font-bold text-neutral-100">{data.company}</h3>
          <span className="text-[#9AA4B2] text-sm mt-1 md:mt-0">{data.period}</span>
        </div>
        <p className="text-[#D4AF37] text-lg font-medium mb-2">{data.role}</p>
        <p className="text-neutral-100 text-xl font-semibold">{data.sectionTitle}</p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project: any, index: number) => (
          <AmnexProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24 md:py-32 bg-[#0B0F1A] text-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Professional Engineering — Production Systems at Scale
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-3xl mx-auto">
            Enterprise-grade systems built for real-world scale and reliability.
          </p>
        </motion.div>

        {/* Company Sections */}
        <div>
          <RadixwebPlatform />
          <AmnexProjects />
        </div>
      </div>
    </section>
  );
}
