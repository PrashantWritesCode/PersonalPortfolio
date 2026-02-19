'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="fixed right-6 top-1/4 h-1/2 w-0.5 bg-deep-border origin-top z-40">
      <motion.div
        className="w-full bg-amber-muted origin-top"
        style={{ scaleY }}
      />
    </div>
  )
}
