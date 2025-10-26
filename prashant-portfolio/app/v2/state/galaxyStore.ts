import { create } from "zustand";

type Pointer = { x: number; y: number };

type GalaxyState = {
  hoveredName: string | null;
  pointer: Pointer | null;
  selectedPlanet: string | null;
  isReturning: boolean;
  setHovered: (name: string, pointer?: Pointer) => void;
  clearHovered: () => void;
  setPointer: (pointer: Pointer) => void;
  selectPlanet: (name: string) => void;
  clearSelected: () => void;
  returnToOverview: () => void;
  completeReturn: () => void;
};

export const useGalaxyStore = create<GalaxyState>((set) => ({
  hoveredName: null,
  pointer: null,
  selectedPlanet: null,
  isReturning: false,
  setHovered: (name, pointer) => set({ hoveredName: name, pointer: pointer ?? null }),
  clearHovered: () => set({ hoveredName: null }),
  setPointer: (pointer) => set({ pointer }),
  selectPlanet: (name) => set({ selectedPlanet: name }),
  clearSelected: () => set({ selectedPlanet: null }),
  returnToOverview: () => set({ selectedPlanet: null, isReturning: true }),
  completeReturn: () => set({ isReturning: false }),
}));
