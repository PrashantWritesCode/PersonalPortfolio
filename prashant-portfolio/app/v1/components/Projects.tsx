"use client";
import { motion } from "framer-motion";
import { products, workProjects } from "../data";

export default function Projects() {
  return (
    <section className="min-h-screen py-20 bg-[#0a0a0a] text-white">
      {/* PRODUCTS I’M BUILDING */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold text-[#f3c77b] mb-10 text-center"
        >
          Products I’m Building
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#111] rounded-2xl p-6 shadow-md hover:shadow-[0_0_20px_#d49a43aa] transition"
            >
              <h3 className="text-2xl font-semibold text-[#f3c77b] mb-3">
                {product.name}
              </h3>
              <p className="text-gray-300 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-[#222] border border-[#d49a43]/50 px-3 py-1 rounded-full text-[#f3c77b]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {product.live && (
                  <a
                    href={product.live}
                    target="_blank"
                    className="text-sm font-medium text-black bg-[#d49a43] hover:bg-[#f3c77b] transition px-4 py-2 rounded-xl"
                  >
                    Live Demo
                  </a>
                )}
                {product.code && (
                  <a
                    href={product.code}
                    target="_blank"
                    className="text-sm font-medium text-[#f3c77b] border border-[#d49a43] hover:bg-[#d49a43]/10 transition px-4 py-2 rounded-xl"
                  >
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROJECTS I’VE WORKED ON */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold text-[#f3c77b] mb-10 text-center"
        >
          Projects I’ve Contributed To
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {workProjects.map((project) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#111] rounded-2xl p-6 shadow-md hover:shadow-[0_0_15px_#d49a43aa] transition"
            >
              <h3 className="text-2xl font-semibold text-[#f3c77b] mb-2">
                {project.name}
              </h3>
              <p className="text-gray-400 italic mb-4">{project.role}</p>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-[#222] border border-[#d49a43]/50 px-3 py-1 rounded-full text-[#f3c77b]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
