import { useMemo } from "react";
import { projects } from "../../../data/projects";
import { skills, CATEGORY_COLORS } from "../../../data/skills";
import { PlanetConfig } from "./constants";

// PRNG for consistent randomization based on seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export interface GeneratedPlanet extends PlanetConfig {
  id: string;
  tagline: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface GeneratedMoon {
  name: string;
  radius: number;
  orbitRadius: number;
  speed: number;
  color: string;
  size: number;
  category: string;
}

const BASE_RADIUS = 80;
const SPACING = 40;
const BASE_SPEED = 0.05;
const MIN_SIZE = 3.0;
const MAX_SIZE = 8.0;

/**
 * Generate planet configurations from project data
 */
export function generatePlanets(): GeneratedPlanet[] {
  return projects.map((project, index) => {
    const seed = index * 1000;
    
    // Calculate orbit radius with even spacing
    const orbitRadius = BASE_RADIUS + index * SPACING;
    
    // Calculate speed inversely proportional to radius (outer planets slower)
    const speed = BASE_SPEED * (BASE_RADIUS / orbitRadius);
    
    // Calculate size based on importance (1-10 scale)
    const importanceRatio = project.importance / 10;
    const size = MIN_SIZE + (MAX_SIZE - MIN_SIZE) * importanceRatio;
    
    // Randomize tilt within ±25 degrees for visual depth
    const orbitTiltX = (seededRandom(seed + 1) - 0.5) * 50; // -25 to +25
    const orbitTiltY = (seededRandom(seed + 2) - 0.5) * 50;
    const orbitTiltZ = (seededRandom(seed + 3) - 0.5) * 50;
    
    // Random initial angle for varied starting positions
    const initialAngle = seededRandom(seed + 4) * Math.PI * 2;
    
    // Generate color with golden/amber theme
    const colorOptions = ["#f3c77b", "#f6b67e", "#d49a43", "#b98239", "#ffd700", "#ffb84d"];
    const color = colorOptions[index % colorOptions.length];
    
    return {
      id: project.id,
      name: project.name,
      tagline: project.tagline,
      description: project.description,
      techStack: project.techStack,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      color,
      orbitRadius,
      orbitTiltX,
      orbitTiltY,
      orbitTiltZ,
      initialAngle,
      size,
      speed,
    };
  });
}

/**
 * Generate moons for a specific planet based on its tech stack
 */
export function generateMoonsForPlanet(
  planet: GeneratedPlanet,
  planetIndex: number
): GeneratedMoon[] {
  const skillMap = new Map(skills.map((skill) => [skill.name, skill]));
  
  return planet.techStack.map((techName, moonIndex) => {
    const skill = skillMap.get(techName);
    const seed = planetIndex * 1000 + moonIndex * 100;
    
    // Determine color based on skill category
    const category = skill?.category || "architecture";
    const color = CATEGORY_COLORS[category];
    
    // Moon size between 0.8-1.2
    const size = 0.8 + seededRandom(seed + 1) * 0.4;
    
    // Orbit radius: 8.0 base + random scaling
    const orbitRadius = 8.0 + moonIndex * 2.0 + seededRandom(seed + 2) * 1.5;
    
    // Moon orbital speed (1.2x planet speed)
    const speed = 1.2;
    
    // Initial angle for moon
    const radius = seededRandom(seed + 4) * Math.PI * 2;
    
    return {
      name: techName,
      radius,
      orbitRadius,
      speed,
      color,
      size,
      category,
    };
  });
}

/**
 * Hook to generate and memoize all planets
 */
export function useGeneratedPlanets() {
  return useMemo(() => generatePlanets(), []);
}

/**
 * Hook to generate and memoize all moons for all planets
 */
export function useGeneratedMoons(planets: GeneratedPlanet[]) {
  return useMemo(() => {
    const moonsMap = new Map<string, GeneratedMoon[]>();
    
    planets.forEach((planet, index) => {
      moonsMap.set(planet.name, generateMoonsForPlanet(planet, index));
    });
    
    return moonsMap;
  }, [planets]);
}
