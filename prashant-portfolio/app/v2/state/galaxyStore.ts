import { create } from "zustand";
import * as THREE from "three";

type Pointer = { x: number; y: number };

type RippleTrigger = {
  position: THREE.Vector3;
  timestamp: number;
} | null;

export type PlanetMetadata = {
  name: string;
  size: number;
  orbitRadius: number;
  orbitTiltX: number;
  orbitTiltY: number;
  orbitTiltZ: number;
  initialAngle: number;
};

type GalaxyState = {
  hoveredName: string | null;
  pointer: Pointer | null;
  selectedPlanet: string | null;
  isReturning: boolean;
  planetRefs: Record<string, THREE.Object3D | null>;
  planetMetadata: Record<string, PlanetMetadata>;
  visitedPlanets: Set<string>;
  guidedTourActive: boolean;
  guidedTourCompleted: boolean;
  sunModalOpen: boolean;
  journalModalOpen: boolean;
  rippleTrigger: RippleTrigger;
  isIdle: boolean;
  activeQuote: string | null;
  lastActivityTime: number;
  isExiting: boolean;
  exitMessage: string;
  setHovered: (name: string, pointer?: Pointer) => void;
  clearHovered: () => void;
  setPointer: (pointer: Pointer) => void;
  selectPlanet: (name: string) => void;
  clearSelected: () => void;
  returnToOverview: () => void;
  completeReturn: () => void;
  registerPlanetRef: (name: string, ref: THREE.Object3D | null) => void;
  registerPlanetMetadata: (name: string, metadata: PlanetMetadata) => void;
  startGuidedTour: () => void;
  skipGuidedTour: () => void;
  completeGuidedTour: () => void;
  openSunModal: () => void;
  closeSunModal: () => void;
  openJournalModal: () => void;
  closeJournalModal: () => void;
  triggerRipple: (position: THREE.Vector3) => void;
  enterIdleMode: (quote: string) => void;
  exitIdleMode: () => void;
  recordActivity: () => void;
  triggerExit: (message: string) => void;
};

export const useGalaxyStore = create<GalaxyState>((set) => ({
  hoveredName: null,
  pointer: null,
  selectedPlanet: null,
  isReturning: false,
  planetRefs: {},
  planetMetadata: {},
  visitedPlanets: new Set<string>(),
  guidedTourActive: false,
  guidedTourCompleted: false,
  sunModalOpen: false,
  journalModalOpen: false,
  rippleTrigger: null,
  isIdle: false,
  activeQuote: null,
  lastActivityTime: Date.now(),
  isExiting: false,
  exitMessage: "Thank you for exploring...",
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
  registerPlanetMetadata: (name, metadata) => set((s) => ({ planetMetadata: { ...s.planetMetadata, [name]: metadata } })),
  startGuidedTour: () => set({ guidedTourActive: true, guidedTourCompleted: false }),
  skipGuidedTour: () => set({ guidedTourActive: false, guidedTourCompleted: true }),
  completeGuidedTour: () => set({ guidedTourActive: false, guidedTourCompleted: true }),
  openSunModal: () => set({ sunModalOpen: true }),
  closeSunModal: () => set({ sunModalOpen: false }),
  openJournalModal: () => set({ journalModalOpen: true }),
  closeJournalModal: () => set({ journalModalOpen: false }),
  triggerRipple: (position) => set({ rippleTrigger: { position: position.clone(), timestamp: Date.now() } }),
  enterIdleMode: (quote) => set({ isIdle: true, activeQuote: quote }),
  exitIdleMode: () => set({ isIdle: false, activeQuote: null }),
  recordActivity: () => set({ lastActivityTime: Date.now(), isIdle: false, activeQuote: null }),
  triggerExit: (message) => set({ isExiting: true, exitMessage: message }),
}));
