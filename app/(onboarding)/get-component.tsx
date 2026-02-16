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

export const SCREENS_ARR = [
  GetStartedScreen,
  SourceSurvey,
  GenderSurvey,
  ProfileSurvey,
  GoalSurvey,
  LimitationsSurvey,
  BeforeAfter,
  StudyRetention,

  // "study-methods-survey",
  ExpectationsSurvey,
  NoMoreExcuses,
  Commitment,

  // "flashcards-feature",
] as const;
