import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Profile = {
  onboarded: boolean;
};

type ProfileState = {
  profile: Profile;
  actions: {
    updateProfile: (newProfile: Partial<Profile>) => void;
  };
};

const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: {
        onboarded: false,
      },
      actions: {
        updateProfile: (newProfile: Partial<Profile>) => {
          const { profile } = get();
          set({ profile: { ...profile, ...newProfile } });
        },
      },
    }),
    {
      name: "profile",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
      }),
    }
  )
);

export const useProfile = () => useProfileStore((state) => state.profile);
export const useProfileActions = () =>
  useProfileStore((state) => state.actions);
