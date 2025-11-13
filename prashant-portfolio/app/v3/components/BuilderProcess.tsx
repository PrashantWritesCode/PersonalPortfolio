"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    id: 1,
    icon: "🧠",
    label: "Understand & Architect",
    description: "Deep dive into requirements and design scalable systems",
  },
  {
    id: 2,
    icon: "⚡",
    label: "Build Fast",
    description: "Ship MVPs with clean code and modern frameworks",
  },
  {
    id: 3,
    icon: "🚀",
    label: "Deploy & Scale",
    description: "Cloud-native deployment with CI/CD and monitoring",
  },
  {
    id: 4,
    icon: "✨",
    label: "Refine",
    description: "Iterate based on feedback and optimize performance",
  },
];

export default function BuilderProcess() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: "80vh" }}>
      <div className="max-w-6xl mx-auto w-full px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 glow-text">
            How I Build
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            A proven process for delivering quality solutions
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines (hidden on mobile) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent opacity-30" />

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${index * 0.15}s`,
              }}
            >
              {/* Icon Circle */}
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center text-5xl mb-6 relative z-10"
                style={{
                  background: "var(--glass-bg)",
                  border: "2px solid var(--accent)",
                  boxShadow: "0 0 30px var(--accent-glow)",
                }}
              >
                {step.icon}
              </div>

              {/* Step Number */}
              <div
                className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                {step.id}
              </div>

              {/* Label & Description */}
              <h3 className="text-xl font-bold mb-2 glow-text">
                {step.label}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
