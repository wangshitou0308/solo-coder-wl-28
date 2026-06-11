import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface HelperInfo {
  name: string;
  phone: string;
  relationship: string;
}

interface UserProgress {
  completedTutorials: string[];
  currentTutorial: string | null;
  currentStep: number;
  scamScores: Record<string, number>;
  completedScamLevels: string[];
  totalStudyMinutes: number;
  lastStudyDate: string | null;
  streakDays: number;
}

interface AppState {
  fontSize: "normal" | "large" | "xlarge";
  voiceEnabled: boolean;
  emergencyContacts: EmergencyContact[];
  helpers: HelperInfo[];
  customTutorials: Array<{
    id: string;
    title: string;
    description: string;
    content: string;
    createdAt: string;
  }>;
  progress: UserProgress;
  setFontSize: (size: "normal" | "large" | "xlarge") => void;
  toggleVoice: () => void;
  addEmergencyContact: (contact: EmergencyContact) => void;
  removeEmergencyContact: (phone: string) => void;
  addHelper: (helper: HelperInfo) => void;
  removeHelper: (phone: string) => void;
  completeTutorial: (tutorialId: string) => void;
  setCurrentTutorial: (tutorialId: string | null, step?: number) => void;
  addStudyMinutes: (minutes: number) => void;
  completeScamLevel: (scamId: string, score: number) => void;
  addCustomTutorial: (tutorial: { title: string; description: string; content: string }) => void;
}

const initialProgress: UserProgress = {
  completedTutorials: [],
  currentTutorial: null,
  currentStep: 0,
  scamScores: {},
  completedScamLevels: [],
  totalStudyMinutes: 0,
  lastStudyDate: null,
  streakDays: 0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      fontSize: "large",
      voiceEnabled: true,
      emergencyContacts: [
        { name: "儿子", phone: "13800138000", relationship: "儿子" },
        { name: "女儿", phone: "13900139000", relationship: "女儿" },
      ],
      helpers: [],
      customTutorials: [],
      progress: initialProgress,

      setFontSize: (size) => set({ fontSize: size }),

      toggleVoice: () =>
        set((state) => ({ voiceEnabled: !state.voiceEnabled })),

      addEmergencyContact: (contact) =>
        set((state) => ({
          emergencyContacts: [...state.emergencyContacts, contact],
        })),

      removeEmergencyContact: (phone) =>
        set((state) => ({
          emergencyContacts: state.emergencyContacts.filter((c) => c.phone !== phone),
        })),

      addHelper: (helper) =>
        set((state) => ({
          helpers: [...state.helpers, helper],
        })),

      removeHelper: (phone) =>
        set((state) => ({
          helpers: state.helpers.filter((h) => h.phone !== phone),
        })),

      completeTutorial: (tutorialId) =>
        set((state) => {
          if (state.progress.completedTutorials.includes(tutorialId)) {
            return state;
          }
          const today = new Date().toISOString().split("T")[0];
          const isNewDay = state.progress.lastStudyDate !== today;
          const newStreak = isNewDay ? state.progress.streakDays + 1 : state.progress.streakDays;
          
          return {
            progress: {
              ...state.progress,
              completedTutorials: [...state.progress.completedTutorials, tutorialId],
              currentTutorial: null,
              currentStep: 0,
              lastStudyDate: today,
              streakDays: newStreak,
            },
          };
        }),

      setCurrentTutorial: (tutorialId, step = 0) =>
        set((state) => ({
          progress: {
            ...state.progress,
            currentTutorial: tutorialId,
            currentStep: step,
          },
        })),

      addStudyMinutes: (minutes) =>
        set((state) => ({
          progress: {
            ...state.progress,
            totalStudyMinutes: state.progress.totalStudyMinutes + minutes,
          },
        })),

      completeScamLevel: (scamId, score) =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          const isNewDay = state.progress.lastStudyDate !== today;
          const newStreak = isNewDay ? state.progress.streakDays + 1 : state.progress.streakDays;

          return {
            progress: {
              ...state.progress,
              scamScores: {
                ...state.progress.scamScores,
                [scamId]: Math.max(state.progress.scamScores[scamId] || 0, score),
              },
              completedScamLevels: state.progress.completedScamLevels.includes(scamId)
                ? state.progress.completedScamLevels
                : [...state.progress.completedScamLevels, scamId],
              lastStudyDate: today,
              streakDays: newStreak,
            },
          };
        }),

      addCustomTutorial: (tutorial) =>
        set((state) => ({
          customTutorials: [
            ...state.customTutorials,
            {
              id: `custom-${Date.now()}`,
              ...tutorial,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
    }),
    {
      name: "elderly-learning-app",
    }
  )
);

export const getFontSizeClass = (size: "normal" | "large" | "xlarge") => {
  switch (size) {
    case "normal":
      return "text-base";
    case "large":
      return "text-lg";
    case "xlarge":
      return "text-xl";
  }
};
