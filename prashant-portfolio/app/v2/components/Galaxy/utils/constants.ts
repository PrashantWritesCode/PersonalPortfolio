import * as THREE from "three";

export type PlanetConfig = {
  name: string;
  color: string;
  orbitRadius: number;
  orbitTiltX: number;
  orbitTiltY: number;
  orbitTiltZ: number;
  initialAngle: number;
  size: number;
  speed: number;
};

export const PLANETS: PlanetConfig[] = [
  { name: "Mercury", color: "#f3c77b", orbitRadius: 3.2, orbitTiltX: -12.5, orbitTiltY: 8.3, orbitTiltZ: 5.1, initialAngle: 0.0, size: 0.35, speed: 0.08 },
  { name: "Venus", color: "#f6b67e", orbitRadius: 4.8, orbitTiltX: 14.2, orbitTiltY: -6.7, orbitTiltZ: 11.8, initialAngle: 1.1, size: 0.75, speed: 0.06 },
  { name: "Earth", color: "#a7c7e7", orbitRadius: 6.4, orbitTiltX: 2.1, orbitTiltY: 15.0, orbitTiltZ: -7.3, initialAngle: 2.2, size: 0.85, speed: 0.05 },
  { name: "Mars", color: "#d49a43", orbitRadius: 8.1, orbitTiltX: -9.4, orbitTiltY: 12.6, orbitTiltZ: 14.5, initialAngle: 3.3, size: 0.58, speed: 0.04 },
  { name: "Jupiter", color: "#b98239", orbitRadius: 10.5, orbitTiltX: 7.8, orbitTiltY: -13.2, orbitTiltZ: 3.9, initialAngle: 4.4, size: 1.5, speed: 0.03 },
  { name: "Saturn", color: "#f3c77b", orbitRadius: 13.2, orbitTiltX: -15.0, orbitTiltY: 9.1, orbitTiltZ: -11.7, initialAngle: 5.5, size: 1.25, speed: 0.025 },
  { name: "Uranus", color: "#a7c7e7", orbitRadius: 15.8, orbitTiltX: 13.4, orbitTiltY: 14.8, orbitTiltZ: -8.2, initialAngle: 0.7, size: 1.05, speed: 0.02 },
];

export const SYSTEM = {
  entryPosition: new THREE.Vector3(0, 50, 150), // Start slightly further out
  finalPosition: new THREE.Vector3(0, 35, 120), // Far view showing whole system
  centerTarget: new THREE.Vector3(0, 0, 0),
  optimalDistanceFovDeg: 40,
};

export type MoonConfig = { name: string; radius: number; speed: number; color?: string; size?: number };
export const MOONS: Record<string, MoonConfig[]> = {
  Earth: [{ name: "Moon", radius: 1.2, speed: 1.4, color: "#f3f3f3", size: 0.12 }],
  Mars: [
    { name: "Phobos", radius: 0.9, speed: 1.2, color: "#d49a43", size: 0.08 },
    { name: "Deimos", radius: 1.3, speed: 1.8, color: "#f6b67e", size: 0.06 },
  ],
  Jupiter: [
    { name: "Io", radius: 1.5, speed: 1.2, color: "#f3c77b", size: 0.1 },
    { name: "Europa", radius: 1.9, speed: 1.6, color: "#a7c7e7", size: 0.1 },
    { name: "Ganymede", radius: 2.3, speed: 2.0, color: "#b98239", size: 0.12 },
    { name: "Callisto", radius: 2.7, speed: 2.4, color: "#f6b67e", size: 0.1 },
  ],
  Saturn: [
    { name: "Titan", radius: 1.8, speed: 1.5, color: "#f3c77b", size: 0.12 },
    { name: "Enceladus", radius: 2.2, speed: 1.9, color: "#a7c7e7", size: 0.1 },
  ],
  Uranus: [
    { name: "Miranda", radius: 1.6, speed: 1.5, color: "#a7c7e7", size: 0.1 },
  ],
};

// Tech Stack Moons - Color-coded by category
type TechCategory = "frontend" | "backend" | "cloud" | "database" | "tool";
type TechMoon = { 
  name: string; 
  category: TechCategory; 
  radius: number; 
  speed: number; 
  size: number;
};

const TECH_COLORS: Record<TechCategory, string> = {
  frontend: "#61dafb",  // Blue (React-inspired)
  backend: "#ff6b35",   // Orange
  cloud: "#a78bfa",     // Purple
  database: "#4ade80",  // Green
  tool: "#fbbf24",      // Yellow/Amber
};

export const TECH_MOONS: Record<string, TechMoon[]> = {
  Mercury: [
    { name: "React", category: "frontend", radius: 1.0, speed: 1.8, size: 0.15 },
    { name: "TypeScript", category: "frontend", radius: 1.3, speed: 1.2, size: 0.18 },
    { name: "Vite", category: "tool", radius: 1.6, speed: 1.5, size: 0.15 },
    { name: "Tailwind", category: "frontend", radius: 1.9, speed: 1.0, size: 0.16 },
  ],
  Venus: [
    { name: "React", category: "frontend", radius: 1.2, speed: 1.6, size: 0.18 },
    { name: "Storybook", category: "tool", radius: 1.5, speed: 1.3, size: 0.16 },
    { name: "Figma", category: "tool", radius: 1.8, speed: 1.0, size: 0.17 },
  ],
  Earth: [
    { name: "React", category: "frontend", radius: 1.4, speed: 1.8, size: 0.2 },
    { name: "Node.js", category: "backend", radius: 1.8, speed: 1.4, size: 0.19 },
    { name: ".NET", category: "backend", radius: 2.2, speed: 1.1, size: 0.2 },
    { name: "PostgreSQL", category: "database", radius: 2.6, speed: 0.9, size: 0.18 },
    { name: "Redis", category: "database", radius: 3.0, speed: 0.7, size: 0.16 },
    { name: "Docker", category: "tool", radius: 3.4, speed: 0.6, size: 0.17 },
  ],
  Mars: [
    { name: "Three.js", category: "frontend", radius: 1.3, speed: 1.7, size: 0.18 },
    { name: "WebGL", category: "frontend", radius: 1.7, speed: 1.3, size: 0.17 },
    { name: "TensorFlow", category: "tool", radius: 2.1, speed: 1.0, size: 0.19 },
    { name: "Next.js", category: "frontend", radius: 2.5, speed: 0.8, size: 0.2 },
  ],
  Jupiter: [
    { name: "Kubernetes", category: "cloud", radius: 2.2, speed: 1.5, size: 0.22 },
    { name: "Azure", category: "cloud", radius: 2.7, speed: 1.2, size: 0.23 },
    { name: "gRPC", category: "backend", radius: 3.2, speed: 1.0, size: 0.2 },
    { name: ".NET Core", category: "backend", radius: 3.7, speed: 0.8, size: 0.21 },
    { name: "RabbitMQ", category: "tool", radius: 4.2, speed: 0.7, size: 0.19 },
  ],
  Saturn: [
    { name: "TypeScript", category: "frontend", radius: 1.8, speed: 1.6, size: 0.2 },
    { name: "DI Container", category: "tool", radius: 2.2, speed: 1.3, size: 0.18 },
    { name: "Monorepo", category: "tool", radius: 2.6, speed: 1.0, size: 0.19 },
    { name: "Turborepo", category: "tool", radius: 3.0, speed: 0.8, size: 0.2 },
  ],
  Uranus: [
    { name: "Svelte", category: "frontend", radius: 1.5, speed: 1.7, size: 0.2 },
    { name: "WebAssembly", category: "tool", radius: 1.9, speed: 1.3, size: 0.19 },
    { name: "Rust", category: "backend", radius: 2.3, speed: 1.0, size: 0.21 },
    { name: "GraphQL", category: "backend", radius: 2.7, speed: 0.8, size: 0.18 },
  ],
};

export function getTechColor(category: TechCategory): string {
  return TECH_COLORS[category];
}

// Achievement Constellations - Coordinates for star patterns
export const CONSTELLATION_PATTERNS = {
  innovator: [
    new THREE.Vector3(-25, 15, -150),
    new THREE.Vector3(-18, 22, -150),
    new THREE.Vector3(-12, 18, -150),
    new THREE.Vector3(-20, 10, -150),
  ],
  architect: [
    new THREE.Vector3(20, 20, -150),
    new THREE.Vector3(28, 25, -150),
    new THREE.Vector3(25, 15, -150),
    new THREE.Vector3(32, 18, -150),
    new THREE.Vector3(22, 12, -150),
  ],
  visionary: [
    new THREE.Vector3(-5, 30, -150),
    new THREE.Vector3(0, 35, -150),
    new THREE.Vector3(5, 32, -150),
    new THREE.Vector3(2, 28, -150),
    new THREE.Vector3(-3, 25, -150),
  ],
} as const;

// 🎬 Guided Tour Camera Path
// Smooth Bézier-like path through solar system
// Duration: ~15 seconds with easeInOutCubic
export const GUIDED_TOUR_PATH = [
  new THREE.Vector3(0, 50, 80),    // Far overview - entry point
  new THREE.Vector3(-30, 35, 60),  // Sweep left
  new THREE.Vector3(-40, 25, 40),  // Descend
  new THREE.Vector3(-20, 15, 20),  // Move inward
  new THREE.Vector3(0, 12, 15),    // Approach center
  new THREE.Vector3(20, 10, 10),   // Pass by inner planets
  new THREE.Vector3(30, 8, 5),     // Near Sun approach
  new THREE.Vector3(15, 6, 8),     // Final position - near Sun, slight angle
] as const;

export const GUIDED_TOUR_DURATION = 15000; // 15 seconds
export const GUIDED_TOUR_STORAGE_KEY = "portfolioGuidedTourDone";
