import { create } from "zustand";

type Pointer = { x: number; y: number };

type GalaxyState = {
  hoveredName: string | null;
  pointer: Pointer | null;
  selectedPlanet: string | null;
  setHovered: (name: string, pointer?: Pointer) => void;
  clearHovered: () => void;
  setPointer: (pointer: Pointer) => void;
  selectPlanet: (name: string) => void;
  clearSelected: () => void;
};

export const useGalaxyStore = create<GalaxyState>((set) => ({
  hoveredName: null,
  pointer: null,
  selectedPlanet: null,
  setHovered: (name, pointer) => set({ hoveredName: name, pointer: pointer ?? null }),
  clearHovered: () => set({ hoveredName: null }),
  setPointer: (pointer) => set({ pointer }),
  selectPlanet: (name) => set({ selectedPlanet: name }),
  clearSelected: () => set({ selectedPlanet: null }),
}));
