"use client";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="section">
      <div className="max-w-7xl mx-auto w-full px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 glow-text">
            My Builds
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Real-world solutions built with modern tech stacks
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card group cursor-pointer"
            >
              {/* Project Header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-accent font-medium mb-3">
                  {project.tagline}
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background: "rgba(0, 179, 255, 0.1)",
                      border: "1px solid rgba(0, 179, 255, 0.3)",
                      color: "var(--accent)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn text-center text-sm py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm py-2 px-4 rounded-lg font-semibold"
                    style={{
                      background: "transparent",
                      border: "2px solid var(--accent)",
                      color: "var(--accent)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
