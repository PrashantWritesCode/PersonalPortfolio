import { create } from "zustand";
import * as THREE from "three";

type Pointer = { x: number; y: number };

type GalaxyState = {
  hoveredName: string | null;
  pointer: Pointer | null;
  selectedPlanet: string | null;
  isReturning: boolean;
  planetRefs: Record<string, THREE.Object3D | null>;
  visitedPlanets: Set<string>;
  guidedTourActive: boolean;
  guidedTourCompleted: boolean;
  setHovered: (name: string, pointer?: Pointer) => void;
  clearHovered: () => void;
  setPointer: (pointer: Pointer) => void;
  selectPlanet: (name: string) => void;
  clearSelected: () => void;
  returnToOverview: () => void;
  completeReturn: () => void;
  registerPlanetRef: (name: string, ref: THREE.Object3D | null) => void;
  startGuidedTour: () => void;
  skipGuidedTour: () => void;
  completeGuidedTour: () => void;
};

export const useGalaxyStore = create<GalaxyState>((set) => ({
  hoveredName: null,
  pointer: null,
  selectedPlanet: null,
  isReturning: false,
  planetRefs: {},
  visitedPlanets: new Set<string>(),
  guidedTourActive: false,
  guidedTourCompleted: false,
  setHovered: (name, pointer) => set({ hoveredName: name, pointer: pointer ?? null }),
  clearHovered: () => set({ hoveredName: null }),
  setPointer: (pointer) => set({ pointer }),
  selectPlanet: (name) => set((state) => ({
    selectedPlanet: name,
    visitedPlanets: new Set([...state.visitedPlanets, name])
  })),
  clearSelected: () => set({ selectedPlanet: null }),
  returnToOverview: () => set({ selectedPlanet: null, isReturning: true }),
  completeReturn: () => set({ isReturning: false }),
  registerPlanetRef: (name, ref) => set((s) => ({ planetRefs: { ...s.planetRefs, [name]: ref } })),
  startGuidedTour: () => set({ guidedTourActive: true, guidedTourCompleted: false }),
  skipGuidedTour: () => set({ guidedTourActive: false, guidedTourCompleted: true }),
  completeGuidedTour: () => set({ guidedTourActive: false, guidedTourCompleted: true }),
}));
