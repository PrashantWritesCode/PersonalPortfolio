import { create } from "zustand";
import * as THREE from "three";

type Pointer = { x: number; y: number };

type GalaxyState = {
  hoveredName: string | null;
  pointer: Pointer | null;
  selectedPlanet: string | null;
  isReturning: boolean;
  planetRefs: Record<string, THREE.Object3D | null>;
  setHovered: (name: string, pointer?: Pointer) => void;
  clearHovered: () => void;
  setPointer: (pointer: Pointer) => void;
  selectPlanet: (name: string) => void;
  clearSelected: () => void;
  returnToOverview: () => void;
  completeReturn: () => void;
  registerPlanetRef: (name: string, ref: THREE.Object3D | null) => void;
};

export const useGalaxyStore = create<GalaxyState>((set) => ({
  hoveredName: null,
  pointer: null,
  selectedPlanet: null,
  isReturning: false,
  planetRefs: {},
  setHovered: (name, pointer) => set({ hoveredName: name, pointer: pointer ?? null }),
  clearHovered: () => set({ hoveredName: null }),
  setPointer: (pointer) => set({ pointer }),
  selectPlanet: (name) => set({ selectedPlanet: name }),
  clearSelected: () => set({ selectedPlanet: null }),
  returnToOverview: () => set({ selectedPlanet: null, isReturning: true }),
  completeReturn: () => set({ isReturning: false }),
  registerPlanetRef: (name, ref) => set((s) => ({ planetRefs: { ...s.planetRefs, [name]: ref } })),
}));
