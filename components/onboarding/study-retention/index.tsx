import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import Chart from "@/components/onboarding/study-retention/chart";
import { View } from "react-native";

const title = "Turn studying into long-term memory";
const subtitle = "Study smarter, not harder.";

export default function StudyRetention() {
  return (
    <OnboardingTemplate title={title} subtitle={subtitle}>
      {/* <Chart /> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingBottom: 30,
        }}
      >
        <Chart />
      </View>
    </OnboardingTemplate>
  );
}
