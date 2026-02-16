import { create } from "zustand";

export type LoadingStep =
  | "upload"
  | "extract"
  | "generate"
  | "finalize"
  | "complete";

export type LoadingType = "document" | "quiz" | "flashcards";

interface LoadingProgressStore {
  currentStep: LoadingStep;
  isLoading: boolean;
  loadingType: LoadingType;
  actions: {
    setStep: (step: LoadingStep) => void;
    reset: () => void;
    setLoadingType: (type: LoadingType) => void;
  };
}

const useLoadingProgressStore = create<LoadingProgressStore>()((set) => ({
  currentStep: "upload",
  isLoading: false,
  loadingType: "document",
  actions: {
    setStep(step: LoadingStep) {
      set({ currentStep: step, isLoading: step !== "complete" });
    },
    reset() {
      set({ currentStep: "upload", isLoading: false });
    },
    setLoadingType(type: LoadingType) {
      set({ loadingType: type });
    },
  },
}));

export const useLoadingProgress = () =>
  useLoadingProgressStore((state) => state.currentStep);
export const useIsLoading = () =>
  useLoadingProgressStore((state) => state.isLoading);
export const useLoadingType = () =>
  useLoadingProgressStore((state) => state.loadingType);
export const useLoadingProgressActions = () =>
  useLoadingProgressStore((state) => state.actions);
