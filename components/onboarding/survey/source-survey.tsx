import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import SourceOption from "@/components/onboarding/survey-option";
import theme from "@/lib/theme";
import {
  IconBrandAppstore,
  IconBrandInstagram,
  IconBrandTiktok,
  IconUsersGroup,
} from "@tabler/icons-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";

const SOURCES = [
  {
    id: "tiktok",
    title: "TikTok",
    icon: IconBrandTiktok,
    color: theme["color-1"],
  },
  {
    id: "instagram",
    title: "Instagram",
    icon: IconBrandInstagram,
    color: theme["color-2"],
  },
  {
    id: "search",
    title: "App Store",
    icon: IconBrandAppstore,
    color: theme["color-3"],
  },
  {
    id: "friend",
    title: "Friend or Family",
    icon: IconUsersGroup,
    color: theme["success"],
  },
  {
    id: "other",
    title: "Other",
    icon: IconBrandAppstore,
    color: theme["color-4"],
  },
];

export default function SourceSurvey() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingTemplate
      title="How did you find us?"
      subtitle="This helps us understand how to reach more students like you."
      data={selected}
      isSurvey={true}
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
        {SOURCES.map((source, index) => (
          <SourceOption
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
