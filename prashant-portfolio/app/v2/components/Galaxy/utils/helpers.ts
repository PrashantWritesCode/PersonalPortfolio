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
