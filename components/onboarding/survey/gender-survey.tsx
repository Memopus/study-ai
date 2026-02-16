import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import SurveyOption from "@/components/onboarding/survey-option";
import theme from "@/lib/theme";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";

const title = "How do you identify yourself?";

const subtitle =
  "This helps us understand how to reach more students like you.";

const GENDERS = [
  {
    id: "Male",
    title: "Male",
    icon: IconGenderMale,
    color: theme["color-1"],
  },
  {
    id: "Female",
    title: "Female",
    icon: IconGenderFemale,
    color: theme["color-2"],
  },
  {
    id: "Other",
    title: "Other",
    icon: IconGenderFemale,
    color: theme["color-3"],
  },
];

export default function GenderSurvey() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingTemplate
      subtitle={subtitle}
      isSurvey={true}
      title={title}
      selected={selected}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 20,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {GENDERS.map((source, index) => (
          <SurveyOption
            key={source.id}
            title={source.title}
            icon={source.icon}
            color={source.color}
            delay={index * 50}
            selected={selected === source.id}
            onSelect={() => setSelected(source.id)}
          />
        ))}
      </ScrollView>
    </OnboardingTemplate>
  );
}
