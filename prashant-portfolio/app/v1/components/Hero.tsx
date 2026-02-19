"use client";
import { motion } from "framer-motion";
import { letterReveal, subtleGlow } from "../lib/animations";

export default function Hero() {
  const line1 = "Prashant Naiker";
  const line2 = "Full-Stack Engineer";
  const line3 = "Scalable systems. Product platforms.";

  const line1Letters = line1.split('');
  const line2Letters = line2.split('');
  const line3Letters = line3.split('');
  
  const totalLine1 = line1Letters.length;
  const totalLine2 = line2Letters.length;

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-deep-bg text-neutral-100">
      {/* Ambient Glow - More Subtle */}
      <motion.div
        variants={subtleGlow}
        animate="animate"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[500px] h-[500px] bg-gradient-radial from-amber-muted/8 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="z-10 text-center px-6 max-w-6xl">
        {/* 3-Line Headline with Letter Reveal */}
        <div className="mb-8">
          {/* Line 1 */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight whitespace-nowrap">
            {line1Letters.map((letter, i) => (
              <motion.span
                key={`line1-${i}`}
                custom={i}
                initial="initial"
                animate="animate"
                variants={letterReveal}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
          
          {/* Line 2 */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight whitespace-nowrap text-neutral-200">
            {line2Letters.map((letter, i) => (
              <motion.span
                key={`line2-${i}`}
                custom={totalLine1 + i}
                initial="initial"
                animate="animate"
                variants={letterReveal}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h2>
          
          {/* Line 3 */}
          <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight whitespace-nowrap text-neutral-300">
            {line3Letters.map((letter, i) => (
              <motion.span
                key={`line3-${i}`}
                custom={totalLine1 + totalLine2 + i}
                initial="initial"
                animate="animate"
                variants={letterReveal}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </p>
        </div>

        {/* Subtext with Separator Dots */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <p className="text-lg md:text-xl text-neutral-300 flex items-center justify-center gap-3 flex-wrap">
            <span>Multi-tenant SaaS</span>
            <span className="text-amber-muted">•</span>
            <span>AI-powered automation</span>
            <span className="text-amber-muted">•</span>
            <span>Cloud-native architecture</span>
          </p>
        </motion.div>

        {/* Descriptive Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            I architect workflow engines, integrate enterprise platforms, and ship automation systems from idea to production.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 162, 76, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-8 py-3 rounded-lg bg-amber-muted text-deep-bg font-medium hover:bg-amber-glow transition-colors duration-300"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 162, 76, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-8 py-3 rounded-lg border border-amber-muted text-amber-muted hover:bg-amber-muted/10 font-medium transition-all duration-300"
          >
            View Products
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
