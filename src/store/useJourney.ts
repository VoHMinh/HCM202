import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SceneId, ValueId } from '@/content/types';

interface JourneyState {
  currentStationIndex: number;
  cameraProgress: number;
  completedStations: SceneId[];
  isStationLocked: boolean;
  unlockedValues: ValueId[];
  discoveredEdges: ('A' | 'B' | 'C')[];
  quizAnswers: Record<string, string[]>;
  openSourceId: string | null;
  isSourceLibraryOpen: boolean;
  reducedMotion: boolean;
  soundEnabled: boolean;

  // Actions
  setCurrentStationIndex: (idx: number) => void;
  setCameraProgress: (progress: number) => void;
  completeStation: (stationId: SceneId) => void;
  setStationLocked: (locked: boolean) => void;
  unlockValue: (val: ValueId) => void;
  discoverEdge: (edgeId: 'A' | 'B' | 'C') => void;
  setQuizAnswer: (quizId: string, answers: string[]) => void;
  setOpenSourceId: (id: string | null) => void;
  setSourceLibraryOpen: (open: boolean) => void;
  toggleReducedMotion: () => void;
  toggleSound: () => void;
  resetJourney: () => void;
}

const INITIAL_STATE = {
  currentStationIndex: 0,
  cameraProgress: 0,
  completedStations: [] as SceneId[],
  isStationLocked: false,
  unlockedValues: [] as ValueId[],
  discoveredEdges: [] as ('A' | 'B' | 'C')[],
  quizAnswers: {} as Record<string, string[]>,
  openSourceId: null as string | null,
  isSourceLibraryOpen: false,
  reducedMotion: false,
  soundEnabled: false,
};

export const useJourney = create<JourneyState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setCurrentStationIndex: (idx) => set({ currentStationIndex: idx }),

      setCameraProgress: (progress) => set({ cameraProgress: progress }),

      completeStation: (stationId) => {
        const current = get().completedStations;
        if (!current.includes(stationId)) {
          set({ completedStations: [...current, stationId] });
        }
      },

      setStationLocked: (locked) => set({ isStationLocked: locked }),

      unlockValue: (val) => {
        const current = get().unlockedValues;
        if (!current.includes(val)) {
          set({ unlockedValues: [...current, val] });
        }
      },

      discoverEdge: (edgeId) => {
        const current = get().discoveredEdges;
        if (!current.includes(edgeId)) {
          set({ discoveredEdges: [...current, edgeId] });
        }
      },

      setQuizAnswer: (quizId, answers) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [quizId]: answers },
        })),

      setOpenSourceId: (id) => set({ openSourceId: id }),

      setSourceLibraryOpen: (open) => set({ isSourceLibraryOpen: open }),

      toggleReducedMotion: () =>
        set((state) => ({ reducedMotion: !state.reducedMotion })),

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      resetJourney: () => set(INITIAL_STATE),
    }),
    {
      name: 'hcm202-lit-path-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedStations: state.completedStations,
        unlockedValues: state.unlockedValues,
        discoveredEdges: state.discoveredEdges,
        quizAnswers: state.quizAnswers,
        reducedMotion: state.reducedMotion,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
