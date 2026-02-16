import BeforeAfter from "@/components/onboarding/before-after";
import Commitment from "@/components/onboarding/commitment";
import GetStartedScreen from "@/components/onboarding/get-started";
import NoMoreExcuses from "@/components/onboarding/no-excuses";
import StudyRetention from "@/components/onboarding/study-retention";
import ExpectationsSurvey from "@/components/onboarding/survey/expectations-survey";
import GenderSurvey from "@/components/onboarding/survey/gender-survey";
import GoalSurvey from "@/components/onboarding/survey/goal-survey";
import ProfileSurvey from "@/components/onboarding/survey/level-survey";
import LimitationsSurvey from "@/components/onboarding/survey/limitations-survey";
import SourceSurvey from "@/components/onboarding/survey/source-survey";
import { SetProperties, TrackEvent } from "@/lib/analytics";
import { useProfile, useProfileActions } from "@/lib/store/profile";
import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const SCREENS = [
  { name: "get-started", screen: GetStartedScreen },
  { name: "source-survey", screen: SourceSurvey },
  { name: "gender-survey", screen: GenderSurvey },
  { name: "level-survey", screen: ProfileSurvey },
  { name: "goal-survey", screen: GoalSurvey },
  { name: "limitations-survey", screen: LimitationsSurvey },
  { name: "before-after", screen: BeforeAfter },
  { name: "study-retention", screen: StudyRetention },
  // "study-methods-survey",
  { name: "expectations-survey", screen: ExpectationsSurvey },
  { name: "no-more-excuses", screen: NoMoreExcuses },
  { name: "commitment", screen: Commitment },
  // "flashcards-feature",
] as const;

interface OnboardingContextProps {
  isOnboardingCompleted: boolean;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  getNext: () => (typeof SCREENS)[number] | undefined;
  setCurrentScreen: React.Dispatch<React.SetStateAction<number>>;
  handleOnboardingData: (v: any) => void;
  currentScreen: number;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(
  undefined,
);

type ScreenName = (typeof SCREENS)[number]["name"];

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState<number>(0);

  const profile = useProfile();

  const [onboardingData, setOnboardingData] = useState<
    Partial<
      Record<
        ScreenName,
        Record<string, { saveInProfile: boolean; value: string }>
      >
    >
  >({});

  const { updateProfile } = useProfileActions();

  function getNext() {
    const screenName = SCREENS[currentScreen].name;
    const { data, saveInProfile } = onboardingData[screenName]
      ? onboardingData[screenName]
      : { data: null, saveInProfile: false };

    if (data) {
      TrackEvent(`Onboarding ${screenName} Completed`, {
        data,
      });
      if (saveInProfile) {
        SetProperties({ [screenName]: data });
      }
    } else {
      TrackEvent(`Onboarding ${screenName} Completed`);
    }

    const nextScreenIndex = currentScreen + 1;

    if (nextScreenIndex < SCREENS.length) {
      setCurrentScreen(nextScreenIndex);

      return SCREENS[nextScreenIndex];
    } else {
      // If it's the last screen, complete the onboarding
      completeOnboarding();
    }
  }

  const handleOnboardingData = (value) => {
    const screenName = SCREENS[currentScreen].name;
    setOnboardingData({ ...onboardingData, [screenName]: value });
  };

  useEffect(() => {
    const screenName = SCREENS[currentScreen].name;
    TrackEvent(`Onboarding ${screenName} Viewed`);
  }, [currentScreen]);

  const completeOnboarding = async () => {
    updateProfile({
      onboarded: true,
    });
    router.replace("/");
  };

  const resetOnboarding = async () => {
    updateProfile({
      onboarded: false,
    });
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingCompleted: profile?.onboarded || false,
        completeOnboarding,
        resetOnboarding,
        getNext,
        setCurrentScreen,
        handleOnboardingData,
        currentScreen,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextProps => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

export default OnboardingContext;
