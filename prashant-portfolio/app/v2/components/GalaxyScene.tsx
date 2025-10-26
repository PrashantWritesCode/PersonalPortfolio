"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Line, Html, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Planet from "./Planet";
import { useGalaxyStore } from "../state/galaxyStore";



// Cinematic starfield with fade-in animation
function CinematicRotatingStars(props: React.ComponentProps<typeof Stars> & { speed?: number; fadeDelay?: number }) {
  const { speed = 0.0006, fadeDelay = 0, ...starsProps } = props;
  const group = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  
  useFrame((_, delta) => {
    timeRef.current += delta;
    
    if (group.current) {
      group.current.rotation.y += speed;
      
      // Cinematic fade-in (stars fade in between 1.2s - 4.8s of the 6s animation)
      const fadeStart = 1.2 + fadeDelay;
      const fadeEnd = 4.8 + fadeDelay;
      const fadeProgress = timeRef.current < fadeStart ? 0 : 
                          timeRef.current > fadeEnd ? 1 : 
                          (timeRef.current - fadeStart) / (fadeEnd - fadeStart);
      
      // Apply fade to all star materials
      group.current.traverse((child) => {
        if (child instanceof THREE.Points && child.material) {
          const material = child.material as THREE.PointsMaterial;
          material.transparent = true;
          material.opacity = fadeProgress;
        }
      });
    }
  });
  
  return (
    <group ref={group}>
      <Stars {...starsProps} />
    </group>
  );
}

// Orbit ring (trail) around origin in the XZ plane, positioned at given y
// Stable Orbit Plane with 3D tilt (no breathing/rotation on the ring)
function DynamicOrbitPlane({ 
  radius, 
  color = "#f3c77b", 
  segments = 256, 
  tiltX = 0, 
  tiltY = 0, 
  tiltZ = 0 
}: { 
  radius: number; 
  color?: string; 
  segments?: number; 
  tiltX?: number; 
  tiltY?: number; 
  tiltZ?: number; 
}) {
  const orbitGroupRef = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    // Create circular orbit points
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }
    return pts;
  }, [radius, segments]);

  // Apply static tilt to the orbit plane when props change
  React.useEffect(() => {
    if (!orbitGroupRef.current) return;
    orbitGroupRef.current.rotation.x = (tiltX * Math.PI) / 180;
    orbitGroupRef.current.rotation.y = (tiltY * Math.PI) / 180;
    orbitGroupRef.current.rotation.z = (tiltZ * Math.PI) / 180;
  }, [tiltX, tiltY, tiltZ]);
  
  return (
    <group ref={orbitGroupRef}>
      {/* Main orbit ring */}
      <Line
        points={points}
        color={color}
        lineWidth={2.5}
        transparent
        opacity={0.35}
      />
      {/* Inner subtle ring */}
      <Line
        points={points.map(p => p.clone().multiplyScalar(0.98))}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={0.2}
      />
      {/* Outer glow ring */}
      <Line
        points={points.map(p => p.clone().multiplyScalar(1.02))}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.15}
      />
    </group>
  );
}

// Animated Planet in Dynamic Orbit
function OrbitingPlanet({ 
  planetConfig, 
  size, 
  glowBoost,
  scaleTarget,
  onHover,
  onMove,
  onLeave,
  onClick,
  children
}: {
  planetConfig: {
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
  size: number;
  glowBoost: number;
  scaleTarget: number;
  onHover: (e: React.PointerEvent) => void;
  onMove: (e: React.PointerEvent) => void;
  onLeave: (e: React.PointerEvent) => void;
  onClick: (e: React.PointerEvent) => void;
  children?: React.ReactNode;
}) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const planetGroupRef = useRef<THREE.Group>(null);
  const angleRef = useRef<number>(planetConfig.initialAngle);
  
  useFrame((_, delta) => {
    // Update orbit angle
    angleRef.current += delta * planetConfig.speed;
    
    // Apply 3D tilt to orbit plane
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.x = (planetConfig.orbitTiltX * Math.PI) / 180;
      orbitGroupRef.current.rotation.y = (planetConfig.orbitTiltY * Math.PI) / 180;
      orbitGroupRef.current.rotation.z = (planetConfig.orbitTiltZ * Math.PI) / 180;
    }
    
    // Calculate position along the tilted orbit using sine/cosine
    if (planetGroupRef.current) {
      const x = Math.cos(angleRef.current) * planetConfig.orbitRadius;
      const z = Math.sin(angleRef.current) * planetConfig.orbitRadius;
      planetGroupRef.current.position.set(x, 0, z);
    }
  });
  
  return (
    <group ref={orbitGroupRef}>
      <group 
        ref={planetGroupRef}
        onPointerOver={onHover}
        onPointerMove={onMove}
        onPointerOut={onLeave}
        onClick={onClick}
      >
        <Planet
          color={planetConfig.color}
          size={size}
          glowBoost={glowBoost}
          scaleTarget={scaleTarget}
        >
          {children}
        </Planet>
      </group>
    </group>
  );
}

// Spectacular Central Sun - The heart of the solar system
function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const tRef = useRef<number>(0);

  useFrame((_state, delta) => {
    tRef.current += delta;
    
    // Dramatic pulsating glow with multiple harmonics
    if (materialRef.current) {
      const primaryPulse = Math.sin(tRef.current * 0.8) * 0.4;
      const secondaryPulse = Math.sin(tRef.current * 2.1) * 0.15;
      const tertiaryPulse = Math.sin(tRef.current * 0.3) * 0.1;
      const pulse = 1.8 + primaryPulse + secondaryPulse + tertiaryPulse;
      materialRef.current.emissiveIntensity = Math.max(0.8, pulse);
    }
    
    // Synchronize point light intensity with emissive pulsation
    if (lightRef.current && materialRef.current) {
      lightRef.current.intensity = 2.5 + (materialRef.current.emissiveIntensity - 1.0) * 1.5;
    }
    
    // Hypnotic rotation with variable speed
    if (sunRef.current) {
      const rotSpeed = 0.001 + Math.sin(tRef.current * 0.4) * 0.0005;
      sunRef.current.rotation.y += rotSpeed;
      sunRef.current.rotation.z += rotSpeed * 0.7;
    }
    
    // Multi-layered corona breathing with phase shifts
    if (coronaRef.current) {
      const coronaPulse = 0.25 + Math.sin(tRef.current * 1.4 + 0.5) * 0.12;
      (coronaRef.current.material as THREE.MeshBasicMaterial).opacity = coronaPulse;
      coronaRef.current.rotation.y -= 0.002;
      coronaRef.current.rotation.x += 0.0008;
    }
    
    // Outer atmospheric undulation
    if (outerGlowRef.current) {
      const outerPulse = 0.06 + Math.sin(tRef.current * 0.7 + 1.0) * 0.04;
      (outerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = outerPulse;
      outerGlowRef.current.rotation.y += 0.0008;
    }
    
    // Ethereal halo shimmer
    if (haloRef.current) {
      const haloPulse = 0.03 + Math.sin(tRef.current * 0.5 + 1.5) * 0.02;
      (haloRef.current.material as THREE.MeshBasicMaterial).opacity = haloPulse;
      haloRef.current.rotation.y -= 0.0003;
      haloRef.current.rotation.z += 0.0002;
    }
  });

  return (
    <group>
      {/* Balanced central point light for planet illumination */}
      <pointLight 
        ref={lightRef}
        position={[0, 0, 0]} 
        intensity={0.8} 
        color="#f3c77b" 
        distance={35} 
        decay={1.3}
        castShadow
      />
      
      {/* Additional warm light for inner planet reflection */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={1.2} 
        color="#f8d568" 
        distance={12} 
        decay={2.0}
      />
      
      {/* Balanced core Sun sphere */}
      <mesh ref={sunRef} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[2.0, 128, 128]} />
        <meshStandardMaterial 
          ref={materialRef}
          emissive="#f3c77b" 
          emissiveIntensity={1.5}
          color="#fff8e1"
          roughness={0.05}
          metalness={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Inner corona - proportionally scaled */}
      <mesh ref={coronaRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3.0, 64, 64]} />
        <meshBasicMaterial
          color="#f3c77b"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Middle atmospheric layer */}
      <mesh ref={outerGlowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial
          color="#d49a43"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Outer ethereal halo */}
      <mesh ref={haloRef} position={[0, 0, 0]}>
        <sphereGeometry args={[6.8, 24, 24]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Ultra-wide solar wind effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[9.5, 16, 16]} />
        <meshBasicMaterial
          color="#ffec8b"
          transparent
          opacity={0.015}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Enhanced soft halo for visual balance */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[12.0, 20, 20]} />
        <meshBasicMaterial
          color="#f3c77b"
          transparent
          opacity={0.008}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Golden Asteroid Belt with Cinematic Fade - Cosmic dust and debris between Mars and Jupiter
function AsteroidBelt() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const timeRef = useRef(0);
  
  // Generate asteroid positions and properties with stable random seed
  const asteroids = useMemo(() => {
    const count = 300; // Sweet spot for performance and visual density
    const data = [];
    
    // Use deterministic generation based on index
    const seededRandom = (index: number, offset: number = 0) => {
      const x = Math.sin((index + offset) * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < count; i++) {
      // Random position in ring between radius 12-18 (between Saturn and Uranus)
      const radius = 12 + seededRandom(i, 0) * 6;
      const angle = seededRandom(i, 1) * Math.PI * 2;
      const height = (seededRandom(i, 2) - 0.5) * 1.5; // Slight vertical spread
      
      data.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        scale: 0.05 + seededRandom(i, 3) * 0.1, // Size variation 0.05-0.15
        rotationSpeed: (seededRandom(i, 4) - 0.5) * 0.02,
        orbitSpeed: (0.005 + seededRandom(i, 5) * 0.01) * (radius < 15 ? 1.2 : 0.8), // Inner faster
        initialRotation: seededRandom(i, 6) * Math.PI * 2,
        angle: Math.atan2(Math.sin(angle) * radius, Math.cos(angle) * radius)
      });
    }
    return data;
  }, []);
  
  const tRef = useRef(0);
  
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    
    tRef.current += delta;
    timeRef.current += delta;
    
    // Cinematic fade-in for asteroids (fade in between 2.4s - 5.4s of the 6s animation)
    const fadeStart = 2.4;
    const fadeEnd = 5.4;
    const fadeProgress = timeRef.current < fadeStart ? 0 : 
                        timeRef.current > fadeEnd ? 1 : 
                        (timeRef.current - fadeStart) / (fadeEnd - fadeStart);
    
    // Apply fade to material
    if (materialRef.current) {
      materialRef.current.opacity = 0.8 * fadeProgress; // 0.8 is the target opacity
      materialRef.current.transparent = true;
    }
    
    // Update each asteroid's position and rotation
    asteroids.forEach((asteroid, i) => {
      // Update orbital position
      asteroid.angle += asteroid.orbitSpeed * delta;
      const radius = Math.sqrt(asteroid.position[0] ** 2 + asteroid.position[2] ** 2);
      
      const x = Math.cos(asteroid.angle) * radius;
      const z = Math.sin(asteroid.angle) * radius;
      const y = asteroid.position[1] + Math.sin(tRef.current + i * 0.1) * 0.05; // Gentle vertical drift
      
      // Set position and rotation
      tempObject.position.set(x, y, z);
      tempObject.rotation.set( 
        asteroid.initialRotation + tRef.current * asteroid.rotationSpeed,
        asteroid.initialRotation * 0.7 + tRef.current * asteroid.rotationSpeed * 0.8,
        asteroid.initialRotation * 1.3 + tRef.current * asteroid.rotationSpeed * 0.6
      );
      tempObject.scale.setScalar(asteroid.scale);
      
      // Apply matrix to instance
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, asteroids.length]}>
      <sphereGeometry args={[1, 8, 6]} /> {/* Low-poly for performance */}
      <meshStandardMaterial 
        ref={materialRef}
        color="#d4af37" 
        emissive="#b8860b"
        emissiveIntensity={0.4}
        transparent
        opacity={0}
        roughness={0.8}
        metalness={0.2}
      />
    </instancedMesh>
  );
}

// Fade Group for synchronized planet appearance
function PlanetFadeGroup({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  
  useFrame((_, delta) => {
    timeRef.current += delta;
    
    if (groupRef.current) {
      // Planets fade in late (3.6s - 6s of the 6s animation) with staggered delay
      const fadeStart = 3.6 + delay;
      const fadeEnd = 6.0 + delay;
      const fadeProgress = timeRef.current < fadeStart ? 0 : 
                          timeRef.current > fadeEnd ? 1 : 
                          (timeRef.current - fadeStart) / (fadeEnd - fadeStart);
      
      // Apply fade to all meshes in the group
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.Material & { transparent?: boolean; opacity?: number };
          material.transparent = true;
          material.opacity = fadeProgress;
        }
      });
    }
  });
  
  return <group ref={groupRef}>{children}</group>;
}

export default function GalaxyScene() {
  // Planetary skills in the golden solar system
  const planetDetails: Record<string, { description: string; years: string }> = {
    "Mercury": { description: "Swift prototyping and rapid iteration cycles. Closest to the source of innovation.", years: "Lightning fast" },
    "Venus": { description: "Beautiful interfaces and elegant design solutions. The morning star of creativity.", years: "Aesthetic mastery" },
    "Earth": { description: "Full-stack development sustaining digital ecosystems. Home base of expertise.", years: "5+ years foundation" },
    "Mars": { description: "Pioneering new technologies and bold exploration. The red planet of innovation.", years: "Frontier spirit" },
    "Jupiter": { description: "Massive system architecture and gravitational leadership. The giant of scalability.", years: "Enterprise dominion" },
    "Saturn": { description: "Structured frameworks with elegant dependency rings. The architect's crown jewel.", years: "System mastery" },
    "Uranus": { description: "Unconventional solutions rotating on a unique axis. The innovator's edge.", years: "Revolutionary thinking" },
  };
  // OrbitControls enablement after intro
  const [, setControlsEnabled] = React.useState(false);
  // Auto-framing cinematic camera with intelligent behavior
  function CameraDriftZoom() {
    const { camera, size } = useThree();
    const driftRadius = 2.5;  // Mouse interaction sensitivity
  // const lerpSpeed = 0.04;   // Smooth interpolation speed (not used; camera is locked when not focusing)
    const mouse = useRef({ x: 0, y: 0 });
    const time = useRef(0);
    const lastMouseMove = useRef(0);
  // const idleRotation = useRef(0); // idle drift disabled per requirements
    const entryTime = useRef(0);
  const hasSettled = useRef(false);
  const isReturning = useGalaxyStore((s) => s.isReturning);
  const completeReturn = useGalaxyStore((s) => s.completeReturn);
  const returnStart = useRef<THREE.Vector3 | null>(null);
  const returnTimer = useRef(0);
    
    // Calculate optimal camera distance for full system framing
    const systemBounds = useMemo(() => {
      // Find outermost planet orbit radius (Uranus at 15.8)
      const maxPlanetRadius = Math.max(...planets.map(p => p.orbitRadius));
      // Add asteroid belt outer radius (18)
      const asteroidBeltRadius = 18;
      // Add planet size buffer for visibility
      const sizeBuffer = 3;
      
      const boundingRadius = Math.max(maxPlanetRadius, asteroidBeltRadius) + sizeBuffer;
      
      // Calculate optimal camera distance using FOV (55 degrees)
      const fov = 55 * Math.PI / 180; // Convert to radians
      const optimalDistance = (boundingRadius * 2) / Math.tan(fov / 2);
      
      return {
        boundingRadius,
        optimalDistance: optimalDistance * 1.2, // Add 20% margin for aesthetic framing
        entryPosition: [8, 12, 30], // Start comfortably far
        finalPosition: [8, 12, 15] // Glide to a closer cinematic view
      };
    }, []);
    
    // Find selected planet's position
    const planetConfig = selectedPlanet ? planets.find((p) => p.name === selectedPlanet) : null;
    // Track mouse position and interaction state
    React.useEffect(() => {
      function handle(e: MouseEvent) {
        mouse.current.x = ((e.clientX / size.width) * 2 - 1) * driftRadius;
        mouse.current.y = (-(e.clientY / size.height) * 2 + 1) * driftRadius;
        lastMouseMove.current = Date.now();
      }
      window.addEventListener("mousemove", handle);
      return () => window.removeEventListener("mousemove", handle);
    }, [size.width, size.height]);
    const target = useRef(new THREE.Vector3(0, 0, 0));
    const desired = useRef(new THREE.Vector3());
    useFrame((_, delta) => {
      time.current += delta;
      entryTime.current += delta;
      
      // Check if user is idle (no mouse movement for 3 seconds)
  // Hover/mouse input should not affect camera; keep for future use if needed
  // const isIdle = Date.now() - lastMouseMove.current > 3000;
  // const isHoveringPlanet = hoveredName !== null;
      
  // Cinematic intro animation (~3.5s gentle glide)
  const entryDuration = 3.5;
      const isInEntry = entryTime.current < entryDuration;
      
      if (isInEntry && !planetConfig) {
        // Cinematic entry animation with easing
        const progress = Math.min(entryTime.current / entryDuration, 1);
        
        // Smooth easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
  // Interpolate from entry position to final framing position
        const startPos = systemBounds.entryPosition;
        const endPos = systemBounds.finalPosition;
        
  const currentX = THREE.MathUtils.lerp(startPos[0], endPos[0], easeOut);
  const currentY = THREE.MathUtils.lerp(startPos[1], endPos[1], easeOut);
  const currentZ = THREE.MathUtils.lerp(startPos[2], endPos[2], easeOut);
        
  desired.current.set(currentX, currentY, currentZ);
  camera.position.lerp(desired.current, 0.12); // Smooth glide
        
        // Look at system center during entry
        target.current.set(0, -2, 0);
        camera.lookAt(target.current);
        
        // Mark as settled when entry completes
        if (progress >= 1 && !hasSettled.current) {
          hasSettled.current = true;
          // Keep interactions disabled per requirements
          setControlsEnabled(false);
        }
        
        return; // Skip other camera behaviors during entry
      }

      // Handle smooth return to overview when user clicks Back
      if (isReturning && !planetConfig) {
        if (!returnStart.current) {
          returnStart.current = camera.position.clone();
          returnTimer.current = 0;
        }
        const returnDuration = 1.8;
        returnTimer.current += delta;
        const rProgress = Math.min(returnTimer.current / returnDuration, 1);
        const easeOut = 1 - Math.pow(1 - rProgress, 3);
        const start = returnStart.current;
        const end = new THREE.Vector3(
          systemBounds.finalPosition[0],
          systemBounds.finalPosition[1],
          systemBounds.finalPosition[2]
        );
        const current = start.clone().lerp(end, easeOut);
        camera.position.copy(current);
        target.current.set(0, -2, 0);
        camera.lookAt(target.current);
        if (rProgress >= 1) {
          hasSettled.current = true;
          returnStart.current = null;
          completeReturn();
        }
        return;
      }

      // After intro finishes and no planet is selected, lock position and let OrbitControls handle interaction
      if (hasSettled.current && !planetConfig) {
        target.current.set(0, -2, 0);
        camera.lookAt(target.current);
        return;
      }
      
      if (planetConfig) {
        // Disable OrbitControls while focusing to avoid conflict
        setControlsEnabled(false);

        // Focus: move camera toward the selected planet at a fixed offset distance
        // Compute the planet's world position in its tilted orbit plane (using its initialAngle as reference)
        const angle = planetConfig.initialAngle;

        const rotMatrix = new THREE.Matrix4()
          .makeRotationX((planetConfig.orbitTiltX * Math.PI) / 180)
          .multiply(new THREE.Matrix4().makeRotationY((planetConfig.orbitTiltY * Math.PI) / 180))
          .multiply(new THREE.Matrix4().makeRotationZ((planetConfig.orbitTiltZ * Math.PI) / 180));

        const planetPos = new THREE.Vector3(
          Math.cos(angle) * planetConfig.orbitRadius,
          0,
          Math.sin(angle) * planetConfig.orbitRadius
        ).applyMatrix4(rotMatrix);

        // Desired distance so planet fills ~70% of vertical FOV, clamped between 5 and 8 units
        // Guard for camera type: use PerspectiveCamera FOV when available, fallback to 55deg
        const fovRad = camera instanceof THREE.PerspectiveCamera
          ? THREE.MathUtils.degToRad(camera.fov)
          : THREE.MathUtils.degToRad(55);
        const desiredFill = 0.7; // 70%
        const idealDist = planetConfig.size / (desiredFill * Math.tan(fovRad / 2));
        const focusDist = THREE.MathUtils.clamp(idealDist, 5, 8);

        // Move the camera along the direction from camera to planet by the fixed focus distance
        const toPlanetDir = camera.position.clone().sub(planetPos).normalize();
        const yOffset = planetConfig.size * 0.6; // slight elevation for pleasing framing
        const targetCamPos = planetPos
          .clone()
          .add(toPlanetDir.multiplyScalar(focusDist));
        targetCamPos.y += yOffset;

        camera.position.lerp(targetCamPos, 0.12);
        camera.lookAt(planetPos);
      }
    });
    return null;
  }
  // Skill planets configuration with harmonious golden palette and size variations
  // Dynamic Solar System with varied orbit planes - distinct colors for visual balance
  const planets = [
    { 
      name: "Mercury", 
      color: "#f3c77b",  // Soft gold - swift and luminous
      orbitRadius: 3.2, 
      orbitTiltX: -12.5, 
      orbitTiltY: 8.3, 
      orbitTiltZ: 5.1,
      initialAngle: 0.0, 
      size: 0.35,  // Slightly smaller for diversity
      speed: 0.08 
    },
    { 
      name: "Venus", 
      color: "#f6b67e",  // Rose-gold - elegant and warm
      orbitRadius: 4.8, 
      orbitTiltX: 14.2, 
      orbitTiltY: -6.7, 
      orbitTiltZ: 11.8,
      initialAngle: 1.1, 
      size: 0.75,  // Refined proportions
      speed: 0.06 
    },
    { 
      name: "Earth", 
      color: "#a7c7e7",  // Pale blue - balanced complement to gold
      orbitRadius: 6.4, 
      orbitTiltX: 2.1, 
      orbitTiltY: 15.0, 
      orbitTiltZ: -7.3,
      initialAngle: 2.2, 
      size: 0.85,  // Slightly larger home base
      speed: 0.05 
    },
    { 
      name: "Mars", 
      color: "#d49a43",  // Amber - rich and deep
      orbitRadius: 8.1, 
      orbitTiltX: -9.4, 
      orbitTiltY: 12.6, 
      orbitTiltZ: 14.5,
      initialAngle: 3.3, 
      size: 0.58,  // Compact pioneer
      speed: 0.04 
    },
    { 
      name: "Jupiter", 
      color: "#b98239",  // Bronze - majestic and powerful
      orbitRadius: 10.5, 
      orbitTiltX: 7.8, 
      orbitTiltY: -13.2, 
      orbitTiltZ: 3.9,
      initialAngle: 4.4, 
      size: 1.5,  // Largest giant with presence
      speed: 0.03 
    },
    { 
      name: "Saturn", 
      color: "#f3c77b",  // Soft gold - elegant rings (visual harmony)
      orbitRadius: 13.2, 
      orbitTiltX: -15.0, 
      orbitTiltY: 9.1, 
      orbitTiltZ: -11.7,
      initialAngle: 5.5, 
      size: 1.25,  // Refined giant
      speed: 0.025 
    },
    { 
      name: "Uranus", 
      color: "#a7c7e7",  // Pale blue - unique rotational axis
      orbitRadius: 15.8, 
      orbitTiltX: 13.4, 
      orbitTiltY: 14.8, 
      orbitTiltZ: -8.2,
      initialAngle: 0.7, 
      size: 1.05,  // Distinguished outer world
      speed: 0.02 
    },
  ];
    const selectedPlanet = useGalaxyStore((s) => s.selectedPlanet);
    const selectPlanet = useGalaxyStore((s) => s.selectPlanet);
    const clearSelected = useGalaxyStore((s) => s.clearSelected);
    const setHovered = useGalaxyStore((s) => s.setHovered);
    const clearHovered = useGalaxyStore((s) => s.clearHovered);
    const setPointer = useGalaxyStore((s) => s.setPointer);
    const hoveredName = useGalaxyStore((s) => s.hoveredName);

  return (
    <Canvas camera={{ position: [8, 12, 30], fov: 55 }}>
      <color attach="background" args={["#000208"]} />
      
      {/* Cinematic depth gradient background */}
      <mesh position={[0, 0, -80]} scale={[120, 120, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#0a0a1a"
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Cinematic Solar System lighting - warm golden ambiance */}
      <ambientLight intensity={0.3} color="#f3c77b" />
      
      {/* Primary directional light for soft highlights and definition */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#f3c77b"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Note: Primary intense light comes from the Sun component itself */}
      
      {/* Secondary atmospheric fill lights for cinematic depth */}
      <pointLight position={[15, 8, 10]} intensity={0.6} color="#d4af37" distance={25} decay={1.8} />
      <pointLight position={[-12, -8, -15]} intensity={0.4} color="#b8860b" distance={22} decay={2} />
      
      {/* Rim lighting for enhanced planetary definition */}
      <directionalLight position={[-8, 6, -10]} intensity={0.3} color="#f3c77b" />
      <directionalLight position={[8, -6, -10]} intensity={0.2} color="#daa520" />
      
      {/* Enhanced atmospheric fog for cinematic depth */}
      <fog attach="fog" args={["#0a0a15", 18, 65]} />

      {/* Cinematic starfield with synchronized fade-in animation */}
      <CinematicRotatingStars radius={120} depth={60} count={4000} factor={4.0} fade speed={0.0003} fadeDelay={0} />
      <CinematicRotatingStars radius={80} depth={40} count={2000} factor={2.5} fade speed={-0.0002} fadeDelay={0.3} />
      <CinematicRotatingStars radius={150} depth={80} count={1500} factor={6.0} fade speed={0.0001} fadeDelay={0.6} />

      {/* Central Sun - "Prashant Rajendra Naikar" */}
      <Sun />
      
      {/* Golden Asteroid Belt - Cosmic dust and debris */}
      <AsteroidBelt />

      {/* Dynamic Orbit Planes + Planets with Cinematic Fade */}
      {planets.map((p, index) => {
  const isHovered = hoveredName === p.name;
  const isSelected = selectedPlanet === p.name;
  const size = p.size; // keep geometry size stable; use smooth scale for hover highlight
  const scaleTarget = isHovered ? 1.05 : 1;
  const glowBoost = isHovered ? 0.25 : 0; // soft emissive boost on hover only
        
        return (
          <PlanetFadeGroup key={p.name} delay={index * 0.15}>
            <group>
            {/* Dynamic orbit ring with 3D tilt */}
            <DynamicOrbitPlane 
              radius={p.orbitRadius} 
              color={p.color} 
              tiltX={p.orbitTiltX}
              tiltY={p.orbitTiltY}
              tiltZ={p.orbitTiltZ}
            />
            
            {/* Orbiting planet in tilted plane */}
            <OrbitingPlanet
              planetConfig={p}
              size={size}
              scaleTarget={scaleTarget}
              glowBoost={glowBoost}
              onHover={(e) => {
                e.stopPropagation();
                setHovered(p.name, { x: e.clientX, y: e.clientY });
              }}
              onMove={(e) => {
                e.stopPropagation();
                setPointer({ x: e.clientX, y: e.clientY });
              }}
              onLeave={(e) => {
                e.stopPropagation();
                clearHovered();
              }}
              onClick={(e) => {
                e.stopPropagation();
                selectPlanet(p.name);
              }}
            >
              {/* Planet label */}
              <Html
                position={[0, size + 0.45, 0]}
                center
                style={{ pointerEvents: "none" }}
              >
                <div className="text-xs md:text-sm px-2 py-1 rounded-md bg-black/60 border border-[#2a2a2a] text-[#f3c77b] shadow-[0_0_12px_rgba(212,154,67,0.25)]">
                  {p.name}
                </div>
              </Html>
              
              {/* Selected planet modal */}
              {isSelected && (
                <Html
                  position={[0, size + 1.2, 0]}
                  center
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                >
                  <div className="rounded-xl border border-[#d49a43] bg-[#0a0a0a]/95 backdrop-blur-md px-5 py-4 shadow-[0_0_32px_#d49a43aa] text-left min-w-[220px]">
                    <div className="text-lg font-bold text-[#f3c77b] mb-1">{p.name}</div>
                    <div className="text-sm text-gray-300 mb-2">{planetDetails[p.name]?.description ?? "Skill details coming soon."}</div>
                    <div className="text-xs text-[#d49a43] mb-3">{planetDetails[p.name]?.years ?? ""}</div>
                    <button
                      className="mt-2 px-4 py-1 rounded-full bg-[#d49a43] text-black font-semibold shadow hover:bg-[#f3c77b] transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSelected();
                      }}
                    >
                      Back to Solar System
                    </button>
                  </div>
                </Html>
              )}
            </OrbitingPlanet>
            </group>
          </PlanetFadeGroup>
        );
      })}
  {/* Camera intro controller; OrbitControls takes over after intro */}
  <CameraDriftZoom />
  <OrbitControls
    enabled={false}
    makeDefault
    enableDamping={false}
    enableZoom={false}
    enablePan={false}
    enableRotate={false}
    minDistance={10}
    maxDistance={60}
    target={[0, -2, 0]}
  />

      {/* Cinematic bloom effect for spectacular glowing visuals */}
      <EffectComposer>
        <Bloom
          intensity={1.2}           // Enhanced intensity for dramatic glow
          luminanceThreshold={0.2}  // Lower threshold to catch more emissive elements
          luminanceSmoothing={0.4}  // Smooth glow transitions
          radius={1.0}              // Wider glow radius for cinematic feel
          levels={8}                // More blur levels for quality
          mipmapBlur                // High-quality blur sampling
        />
      </EffectComposer>
    </Canvas>
  );
}
