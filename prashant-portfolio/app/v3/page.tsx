"use client";
import { Suspense } from "react";
import { motion, Variants } from "framer-motion";
import Hero from "./components/Hero";
import HeroScene from "./components/HeroScene";
import ProjectsGrid from "./components/ProjectsGrid";
import BuilderProcess from "./components/BuilderProcess";
import SocialSignals from "./components/SocialSignals";
import Contact from "./components/Contact";
import "./style.css";

// Animation variants for section transitions with parallax
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function V3Page() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Prashant Kumar",
            jobTitle: "Fullstack Developer",
            description:
              "Fullstack Builder specializing in .NET, Angular, and Azure",
            url: "https://prashant-portfolio.vercel.app/v3",
            sameAs: [
              "https://github.com/PrashantWritesCode",
              "https://linkedin.com/in/prashant",
              "https://twitter.com/PrashantBuilds",
            ],
            knowsAbout: [
              ".NET",
              "Angular",
              "Azure",
              "React",
              "TypeScript",
              "Node.js",
              "Cloud Computing",
            ],
          }),
        }}
      />

      <main className="page">
        {/* Hero Section with 3D Background */}
        <div className="relative">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
          <Hero />
        </div>

      {/* Projects Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={sectionVariants}
      >
        <ProjectsGrid />
      </motion.div>

      {/* Builder Process Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={sectionVariants}
      >
        <BuilderProcess />
      </motion.div>

      {/* Social Signals Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={sectionVariants}
      >
        <SocialSignals />
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={sectionVariants}
      >
        <Contact />
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-muted text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2025 Prashant. Built with Next.js, React Three Fiber, and passion.</p>
          <p className="mt-2">
            <a
              href="/v2"
              className="text-accent hover:text-white transition-colors"
            >
              Explore the 3D Galaxy Version →
            </a>
          </p>
        </div>
      </footer>
    </main>
    </>
  );
}
