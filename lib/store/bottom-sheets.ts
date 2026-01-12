import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createRef, RefObject } from "react";
import { create } from "zustand";

const BOTTOMSHEET_KEYS = ["add-new"] as const;
export type BottomSheetKeys = (typeof BOTTOMSHEET_KEYS)[number];

export type BottomSheetState = {
  ref: RefObject<BottomSheetModal | null>;
};
const getDefaultBottomSheetState = () => {
  return {
    ref: createRef<BottomSheetModal>(),
  };
};
type BottomSheetsState = {
  [K in BottomSheetKeys]: BottomSheetState;
};
const useBottomSheetStore = create<
  BottomSheetsState & {
    actions: {
      show: (key: BottomSheetKeys, config?: Partial<BottomSheetState>) => void;
      hide: (key: BottomSheetKeys) => void;
    };
  }
>((set, get) => ({
  "add-new": getDefaultBottomSheetState(),
  actions: {
    show(key, config) {
      const state = get();
      const currentSheet = state[key];

      if (!currentSheet || !currentSheet.ref?.current) {
        console.warn(
          `Bottom sheet with key "${key}" does not exist or has no ref.`
        );
        return;
      }

      set((state) => ({
        [key]: {
          ref: currentSheet.ref,
        },
      }));

      currentSheet.ref.current.present();
    },
    hide(key) {
      const state = get();
      const currentSheet = state[key];

      if (!currentSheet || !currentSheet.ref?.current) {
        console.warn(
          `Bottom sheet with key "${key}" does not exist or has no ref.`
        );
        return;
      }
      currentSheet.ref.current.dismiss();

      return {
        [key]: {
          ref: state[key].ref,
          source: null,
          data: null,
        },
      };
    },
  },
}));

export const useBottomSheetStoreActions = () => {
  return useBottomSheetStore((state) => state.actions);
};

export const useBottomSheet = (key: BottomSheetKeys) => {
  const data = useBottomSheetStore((state) => state[key].ref);

  return data;
};
