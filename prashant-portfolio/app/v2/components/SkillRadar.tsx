"use client";
import React from "react";
import { useGalaxyStore } from "../state/galaxyStore";

const planets = [
  { name: "TypeScript", color: "#f3c77b", orbitRadius: 3, initialAngle: 0.0 },
  { name: ".NET Core", color: "#d49a43", orbitRadius: 4.2, initialAngle: 1.3 },
  { name: "Angular", color: "#f3c77b", orbitRadius: 5.4, initialAngle: 2.2 },
  { name: "Azure", color: "#d49a43", orbitRadius: 6.6, initialAngle: 3.6 },
];

const RADAR_SIZE = 120;
const CORE_RADIUS = 18;
const DOT_RADIUS = 7;
const ORBIT_RADII = [32, 44, 56, 68];

export default function SkillRadar() {
  const hoveredName = useGalaxyStore((s) => s.hoveredName);
  const setHovered = useGalaxyStore((s) => s.setHovered);
  const clearHovered = useGalaxyStore((s) => s.clearHovered);

  // Animate all angles in a single state array
  const [angles, setAngles] = React.useState(planets.map((p) => p.initialAngle));
  React.useEffect(() => {
    let frame = 0;
    let running = true;
    function animate() {
      frame++;
      setAngles(planets.map((p, i) => p.initialAngle + frame * 0.012 * (1 + i * 0.2)));
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  return (
    <div
      className="fixed top-6 right-6 z-40"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="relative"
        style={{
          width: RADAR_SIZE,
          height: RADAR_SIZE,
          borderRadius: RADAR_SIZE / 2,
          border: "2px solid #d49a43",
          background: "rgba(10,10,10,0.7)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 24px rgba(212,154,67,0.12)",
          opacity: 0.95,
        }}
      >
        {/* Core */}
        <div
          style={{
            position: "absolute",
            left: RADAR_SIZE / 2 - CORE_RADIUS,
            top: RADAR_SIZE / 2 - CORE_RADIUS,
            width: CORE_RADIUS * 2,
            height: CORE_RADIUS * 2,
            borderRadius: "50%",
            background: "radial-gradient(circle,#d49a43 0%,#f3c77b 80%,transparent 100%)",
            boxShadow: "0 0 24px #d49a43aa",
            opacity: 0.7,
          }}
        />
        {/* Orbiting dots */}
        {planets.map((p, i) => {
          const angle = angles[i];
          const orbit = ORBIT_RADII[i];
          const x = RADAR_SIZE / 2 + Math.cos(angle) * orbit - DOT_RADIUS;
          const y = RADAR_SIZE / 2 + Math.sin(angle) * orbit - DOT_RADIUS;
          const isHovered = hoveredName === p.name;
          return (
            <div
              key={p.name}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={clearHovered}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: DOT_RADIUS * 2,
                height: DOT_RADIUS * 2,
                borderRadius: "50%",
                background: p.color,
                boxShadow: isHovered
                  ? "0 0 24px #d49a43,0 0 8px #f3c77b"
                  : "0 0 12px #d49a43aa",
                border: isHovered ? "2px solid #f3c77b" : "1px solid #d49a43",
                opacity: isHovered ? 1 : 0.85,
                transition: "all 0.18s cubic-bezier(.4,.8,.4,1)",
                cursor: "pointer",
                zIndex: isHovered ? 2 : 1,
              }}
              title={p.name}
            />
          );
        })}
      </div>
    </div>
  );
}