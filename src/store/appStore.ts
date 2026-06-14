import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TutorialStep } from "@/data/tutorials";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface HelperInfo {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface CustomTutorialStep {
  id: string;
  title: string;
  description: string;
  image?: string;
  whatIfStuck?: string;
  whatIfWrong?: string;
  howToConfirm?: string;
}

export interface CustomTutorial {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  steps: CustomTutorialStep[];
  images?: string[];
  createdAt: string;
  isCustom: boolean;
}

interface UserProgress {
  completedTutorials: string[];
  currentTutorial: string | null;
  currentStep: number;
  scamScores: Record<string, number>;
  completedScamLevels: string[];
  completedRedWords: string[];
  totalStudyMinutes: number;
  lastStudyDate: string | null;
  streakDays: number;
}

export type VoiceSpeed = "slow" | "normal" | "fast";

interface AppState {
  fontSize: "normal" | "large" | "xlarge";
  voiceEnabled: boolean;
  voiceSpeed: VoiceSpeed;
  voiceRepeat: boolean;
  voiceReadStepOnly: boolean;
  onboardingSeen: boolean;
  emergencyContacts: EmergencyContact[];
  helpers: HelperInfo[];
  customTutorials: CustomTutorial[];
  progress: UserProgress;

  setFontSize: (size: "normal" | "large" | "xlarge") => void;
  toggleVoice: () => void;
  setVoiceSpeed: (speed: VoiceSpeed) => void;
  setVoiceRepeat: (repeat: boolean) => void;
  setVoiceReadStepOnly: (only: boolean) => void;
  setOnboardingSeen: (seen: boolean) => void;

  addEmergencyContact: (contact: Omit<EmergencyContact, "id">) => void;
  removeEmergencyContact: (id: string) => void;

  addHelper: (helper: Omit<HelperInfo, "id">) => void;
  removeHelper: (id: string) => void;

  addCustomTutorial: (tutorial: Omit<CustomTutorial, "id" | "createdAt" | "isCustom">) => void;
  removeCustomTutorial: (id: string) => void;

  setCurrentTutorial: (tutorialId: string | null, step?: number) => void;
  completeTutorial: (tutorialId: string) => void;
  addStudyMinutes: (minutes: number) => void;

  completeScamLevel: (scamId: string, score: number) => void;
  completeRedWord: (redWordId: string) => void;
}

const initialProgress: UserProgress = {
  completedTutorials: [],
  currentTutorial: null,
  currentStep: 0,
  scamScores: {},
  completedScamLevels: [],
  completedRedWords: [],
  totalStudyMinutes: 0,
  lastStudyDate: null,
  streakDays: 0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      fontSize: "large",
      voiceEnabled: true,
      voiceSpeed: "normal",
      voiceRepeat: false,
      voiceReadStepOnly: false,
      onboardingSeen: false,
      emergencyContacts: [],
      helpers: [],
      customTutorials: [],
      progress: initialProgress,

      setFontSize: (size) => set({ fontSize: size }),
      toggleVoice: () => set({ voiceEnabled: !get().voiceEnabled }),
      setVoiceSpeed: (speed) => set({ voiceSpeed: speed }),
      setVoiceRepeat: (repeat) => set({ voiceRepeat: repeat }),
      setVoiceReadStepOnly: (only) => set({ voiceReadStepOnly: only }),
      setOnboardingSeen: (seen) => set({ onboardingSeen: seen }),

      addEmergencyContact: (contact) =>
        set((state) => ({
          emergencyContacts: [
            ...state.emergencyContacts,
            { ...contact, id: Date.now().toString() },
          ],
        })),
      removeEmergencyContact: (id) =>
        set((state) => ({
          emergencyContacts: state.emergencyContacts.filter((c) => c.id !== id),
        })),

      addHelper: (helper) =>
        set((state) => ({
          helpers: [...state.helpers, { ...helper, id: Date.now().toString() }],
        })),
      removeHelper: (id) =>
        set((state) => ({
          helpers: state.helpers.filter((h) => h.id !== id),
        })),

      addCustomTutorial: (tutorial) =>
        set((state) => ({
          customTutorials: [
            ...state.customTutorials,
            {
              ...tutorial,
              id: `custom-${Date.now()}`,
              createdAt: new Date().toISOString(),
              isCustom: true,
            },
          ],
        })),
      removeCustomTutorial: (id) =>
        set((state) => ({
          customTutorials: state.customTutorials.filter((t) => t.id !== id),
        })),

      setCurrentTutorial: (tutorialId, step = 0) =>
        set((state) => ({
          progress: {
            ...state.progress,
            currentTutorial: tutorialId,
            currentStep: step,
          },
        })),

      completeTutorial: (tutorialId) =>
        set((state) => {
          if (state.progress.completedTutorials.includes(tutorialId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              completedTutorials: [...state.progress.completedTutorials, tutorialId],
              currentTutorial: null,
              currentStep: 0,
            },
          };
        }),

      addStudyMinutes: (minutes) =>
        set((state) => {
          const today = new Date().toDateString();
          const lastDate = state.progress.lastStudyDate;
          let newStreak = state.progress.streakDays;

          if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastDate === yesterday.toDateString()) {
              newStreak += 1;
            } else if (lastDate !== today) {
              newStreak = 1;
            }
          }

          return {
            progress: {
              ...state.progress,
              totalStudyMinutes: state.progress.totalStudyMinutes + minutes,
              lastStudyDate: today,
              streakDays: newStreak,
            },
          };
        }),

      completeScamLevel: (scamId, score) =>
        set((state) => ({
          progress: {
            ...state.progress,
            scamScores: {
              ...state.progress.scamScores,
              [scamId]: Math.max(state.progress.scamScores[scamId] || 0, score),
            },
            completedScamLevels: state.progress.completedScamLevels.includes(scamId)
              ? state.progress.completedScamLevels
              : [...state.progress.completedScamLevels, scamId],
          },
        })),

      completeRedWord: (redWordId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            completedRedWords: state.progress.completedRedWords.includes(redWordId)
              ? state.progress.completedRedWords
              : [...state.progress.completedRedWords, redWordId],
          },
        })),
    }),
    {
      name: "elderly-learning-app",
    }
  )
);
