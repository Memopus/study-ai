import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import SurveyOption from "@/components/onboarding/survey-option";
import theme from "@/lib/theme";
import {
  IconBackpack,
  IconBriefcase,
  IconBuilding,
  IconSchool,
} from "@tabler/icons-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";

const PROFILES = [
  {
    id: "middle-school",
    title: "Middle School Student",
    icon: IconBackpack,
    color: theme["color-1"],
  },
  {
    id: "high-school",
    title: "High School Student",
    icon: IconSchool,
    color: theme["color-2"],
  },
  {
    id: "college",
    title: "College/University Student",
    icon: IconBuilding,
    color: theme["color-3"],
  },
  {
    id: "professional",
    title: "Working Professional",
    icon: IconBriefcase,
    color: theme["success"],
  },
  {
    id: "other",
    title: "Other",
    icon: IconBackpack,
    color: theme["color-4"],
  },
];

const title = "What describes you best?";
const subtitle = "This helps us tailor content to your level.";

export default function ProfileSurvey() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingTemplate
      title={title}
      isSurvey={true}
      subtitle={subtitle}
      data={selected}
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
        {PROFILES.map((profile, index) => (
          <SurveyOption
            key={profile.id}
            title={profile.title}
            icon={profile.icon}
            color={profile.color}
            delay={index * 50}
            selected={selected === profile.id}
            onSelect={() => setSelected(profile.id)}
          />
        ))}
      </ScrollView>
    </OnboardingTemplate>
  );
}
