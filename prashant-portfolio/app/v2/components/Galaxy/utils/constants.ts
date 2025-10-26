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
  entryPosition: new THREE.Vector3(8, 12, 30),
  finalPosition: new THREE.Vector3(8, 12, 15),
  centerTarget: new THREE.Vector3(0, -2, 0),
  optimalDistanceFovDeg: 55,
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
