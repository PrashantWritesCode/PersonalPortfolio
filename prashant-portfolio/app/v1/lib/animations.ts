// Centralized animation variants for consistent motion design
// Based on "Controlled Anti-Gravity" design philosophy

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // Custom cubic-bezier for smooth deceleration
  },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
    },
  },
};

export const letterReveal = {
  initial: { opacity: 0, y: 40 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.025, // 25ms stagger between letters
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export const glowPulse = {
  animate: {
    opacity: [0.4, 0.6, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // easeInOut cubic-bezier
    },
  },
};

export const subtleGlow = {
  animate: {
    opacity: [0.2, 0.35, 0.2],
    scale: [1, 1.03, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

export const wordReveal = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // 100ms stagger between words
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};
