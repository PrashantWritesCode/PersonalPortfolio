import * as THREE from "three";

export const degToRad = (deg: number) => (deg * Math.PI) / 180;

export function tiltedOrbitPosition(radius: number, angle: number, tiltX: number, tiltY: number, tiltZ: number) {
  const rot = new THREE.Matrix4()
    .makeRotationX(degToRad(tiltX))
    .multiply(new THREE.Matrix4().makeRotationY(degToRad(tiltY)))
    .multiply(new THREE.Matrix4().makeRotationZ(degToRad(tiltZ)));
  return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius).applyMatrix4(rot);
}

export function fovToDistance(objectSize: number, fovDeg: number, fill = 0.7) {
  const fovRad = (fovDeg * Math.PI) / 180;
  return objectSize / (fill * Math.tan(fovRad / 2));
}

/**
 * Calculate optimal far view distance to see entire solar system
 * @param maxOrbitRadius - Largest planet orbit radius
 * @param fovDeg - Camera field of view in degrees
 * @param margin - Extra margin factor (1.2 = 20% margin)
 */
export function getFarViewDistance(maxOrbitRadius: number, fovDeg: number, margin = 1.3) {
  const fovRad = (fovDeg * Math.PI) / 180;
  return (maxOrbitRadius * margin) / Math.tan(fovRad / 2);
}

/**
 * Get bounding sphere encompassing all planet orbits
 * @param planets - Array of planet configurations with orbitRadius
 */
export function getBoundingSphere(planets: Array<{ orbitRadius: number }>) {
  const maxRadius = Math.max(...planets.map(p => p.orbitRadius), 0);
  return { center: new THREE.Vector3(0, 0, 0), radius: maxRadius };
}
