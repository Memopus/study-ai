import BeforeAfter from "@/components/onboarding/before-after";
import Commitment from "@/components/onboarding/commitment";
import FeaturesShowcase from "@/components/onboarding/features";
import GetStartedScreen from "@/components/onboarding/get-started";
import NoMoreExcuses from "@/components/onboarding/no-excuses";
import OnboardingPaywall from "@/components/onboarding/paywall";
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
  // { name: "how-it-works", screen: HowItWorks },
  { name: "source-survey", screen: SourceSurvey },
  { name: "gender-survey", screen: GenderSurvey },
  { name: "level-survey", screen: ProfileSurvey },
  { name: "goal-survey", screen: GoalSurvey },
  { name: "limitations-survey", screen: LimitationsSurvey },
  { name: "before-after", screen: BeforeAfter },
  { name: "study-retention", screen: StudyRetention },
  { name: "expectations-survey", screen: ExpectationsSurvey },
  { name: "features-showcase", screen: FeaturesShowcase },
  // { name: "plan-ready", screen: PlanReady },
  { name: "no-more-excuses", screen: NoMoreExcuses },
  { name: "commitment", screen: Commitment },
  { name: "commitment", screen: OnboardingPaywall },
] as const;

interface OnboardingContextProps {
  isOnboardingCompleted: boolean;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  getNext: (data?: any) => (typeof SCREENS)[number] | undefined;
  goBack: () => void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<number>>;
  currentScreen: number;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(
  undefined,
);

// type ScreenName = (typeof SCREENS)[number]["name"];

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState<number>(0);

  const profile = useProfile();

  const { updateProfile } = useProfileActions();

  function getNext(data) {
    const screenName = SCREENS[currentScreen].name;

    if (data) {
      TrackEvent(`Onboarding ${screenName} Completed`, {
        data,
      });

      SetProperties({ [screenName]: data });
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

  const goBack = () => {
    const prevIndex = currentScreen - 1;
    if (prevIndex >= 0) {
      setCurrentScreen(prevIndex);

      return SCREENS[prevIndex];
    }
  };

  useEffect(() => {
    const screenName = SCREENS[currentScreen].name;
    TrackEvent(`Onboarding ${screenName} Viewed`);
  }, [currentScreen]);

  const completeOnboarding = async () => {
    updateProfile({ onboarded: true });
    router.replace("/(app)");
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
        currentScreen,
        goBack,
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
