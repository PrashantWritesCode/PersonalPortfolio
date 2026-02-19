import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          bg: "#0F1115", // Darker graphite base
          surface: "#1A1D23", // Slightly lighter surface
          border: "#2A2D35", // More visible borders
        },
        amber: {
          muted: "#D4A24C",
          glow: "#E8B563",
          dim: "#8B7335",
        },
        neutral: {
          100: "#F9FAFB",
          200: "#E5E7EB",
          300: "#9CA3AF",
          400: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
