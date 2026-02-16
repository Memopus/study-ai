import ProgressBar from "@/components/onboarding/progress-bar";
import colors from "@/lib/theme";
import {
  OnboardingProvider,
  SCREENS,
  useOnboarding,
} from "@/providers/onboarding-provider";
import { View } from "react-native";

function OnboardingContent() {
  const { currentScreen } = useOnboarding();
  const Component = SCREENS[currentScreen].screen;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {SCREENS[currentScreen].name.includes("survey") && <ProgressBar />}
      <Component />
    </View>
  );
}

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
