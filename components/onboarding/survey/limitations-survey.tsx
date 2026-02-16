import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import SurveyOption from "@/components/onboarding/survey-option";
import theme from "@/lib/theme";
import {
  IconAlarm,
  IconBrain,
  IconMoodSad,
  IconNotebook,
  IconZzz,
} from "@tabler/icons-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";

const LIMITATIONS = [
  {
    id: "time",
    title: "Not enough time",
    icon: IconAlarm,
    color: theme["color-1"],
  },
  {
    id: "focus",
    title: "Hard to stay focused",
    icon: IconBrain,
    color: theme["color-2"],
  },
  {
    id: "motivation",
    title: "Lack of motivation",
    icon: IconMoodSad,
    color: theme["color-3"],
  },
  {
    id: "organization",
    title: "Trouble staying organized",
    icon: IconNotebook,
    color: theme["success"],
  },
  {
    id: "tired",
    title: "Too tired to study",
    icon: IconZzz,
    color: theme["color-4"],
  },
];

export default function LimitationsSurvey() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  return (
    <OnboardingTemplate
      title="What's slowing you down?"
      subtitle="We'll help you overcome your biggest challenge."
      selected={selected}
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
        {LIMITATIONS.map((limitation, index) => (
          <SurveyOption
            key={limitation.id}
            title={limitation.title}
            icon={limitation.icon}
            color={limitation.color}
            delay={index * 50}
            selected={selected.includes(limitation.id)}
            onSelect={() => toggleSelection(limitation.id)}
            multiSelect
          />
        ))}
      </ScrollView>
    </OnboardingTemplate>
  );
}
