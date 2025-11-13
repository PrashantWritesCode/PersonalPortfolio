"use client";
import { motion } from "framer-motion";

const socialSignals = [
  {
    id: "twitter",
    type: "Twitter",
    title: "Latest Thoughts",
    content: "Just shipped a new feature using React Server Components! The DX improvements are incredible. 🚀",
    author: "@PrashantBuilds",
    engagement: "127 likes • 23 retweets",
    icon: "🐦",
  },
  {
    id: "hackathon",
    type: "Achievement",
    title: "Hackathon Winner",
    content: "🏆 Won 1st place at Azure Cloud Hackathon 2024 with an AI-powered deployment automation tool",
    stats: "48 hours • 3-person team",
    icon: "🏆",
  },
  {
    id: "now-building",
    type: "Current Project",
    title: "Now Building",
    content: "🔨 Working on a real-time collaboration platform with WebRTC and distributed state management",
    status: "In Progress • Week 4",
    icon: "⚡",
  },
  {
    id: "certification",
    type: "Learning",
    title: "Azure Certified",
    content: "✅ Microsoft Azure Solutions Architect Expert • Active contributor to open-source cloud tools",
    badge: "AZ-305 Certified",
    icon: "☁️",
  },
];

export default function SocialSignals() {
  return (
    <section className="section" style={{ minHeight: "80vh" }}>
      <div className="max-w-6xl mx-auto w-full px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 glow-text">
            Social Proof
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Building in public and staying active in the dev community
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialSignals.map((signal, index) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card relative overflow-hidden group"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{signal.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold">{signal.title}</h3>
                    <span className="text-xs text-accent font-medium">
                      {signal.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <p className="text-muted leading-relaxed mb-4">
                {signal.content}
              </p>

              {/* Card Footer Metadata */}
              <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border">
                {signal.id === "twitter" && (
                  <>
                    <span>{signal.author}</span>
                    <span>{signal.engagement}</span>
                  </>
                )}
                {signal.id === "hackathon" && (
                  <span className="font-medium">{signal.stats}</span>
                )}
                {signal.id === "now-building" && (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "var(--accent)" }}
                    />
                    {signal.status}
                  </span>
                )}
                {signal.id === "certification" && (
                  <span
                    className="px-3 py-1 rounded-full font-medium"
                    style={{
                      background: "rgba(0, 179, 255, 0.2)",
                      color: "var(--accent)",
                    }}
                  >
                    {signal.badge}
                  </span>
                )}
              </div>

              {/* Hover Glow Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0, 179, 255, 0.1) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Twitter CTA */}
        <div className="text-center mt-12">
          <a
            href="https://twitter.com/PrashantBuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors"
          >
            Follow my journey on Twitter
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
