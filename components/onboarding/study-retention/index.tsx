import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import Chart from "@/components/onboarding/study-retention/chart";
import { View } from "react-native";

const subtitle = "Study smarter, not harder.";
const title = "Turn studying into long-term memory";

export default function StudyRetention() {
  return (
    <OnboardingTemplate title={title} subtitle={subtitle}>
      {/* <Chart /> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Chart />
      </View>
    </OnboardingTemplate>
  );
}
