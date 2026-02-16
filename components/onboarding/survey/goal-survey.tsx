import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import SurveyOption from "@/components/onboarding/survey-option";
import theme from "@/lib/theme";
import {
  IconBrain,
  IconCertificate,
  IconSchool,
  IconSparkles,
  IconTrophy,
} from "@tabler/icons-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";

const GOALS = [
  {
    id: "ace-exams",
    title: "Ace my exams",
    icon: IconSchool,
    color: theme["color-1"],
  },
  {
    id: "certification",
    title: "Pass a certification",
    icon: IconCertificate,
    color: theme["color-2"],
  },
  {
    id: "learn-skill",
    title: "Learn a new skill",
    icon: IconBrain,
    color: theme["color-3"],
  },
  {
    id: "stay-ahead",
    title: "Stay ahead in class",
    icon: IconTrophy,
    color: theme["success"],
  },
  {
    id: "curious",
    title: "Just exploring",
    icon: IconSparkles,
    color: theme["color-4"],
  },
];

const title = "What's your goal?";
const subtitle = "This helps us personalize your learning experience.";

export default function GoalSurvey() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <OnboardingTemplate
      subtitle={subtitle}
      isSurvey={true}
      title={title}
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
        {GOALS.map((goal, index) => (
          <SurveyOption
            key={goal.id}
            title={goal.title}
            icon={goal.icon}
            color={goal.color}
            delay={index * 50}
            selected={selected.includes(goal.id)}
            onSelect={() => toggleSelection(goal.id)}
            multiSelect
          />
        ))}
      </ScrollView>
    </OnboardingTemplate>
  );
}
