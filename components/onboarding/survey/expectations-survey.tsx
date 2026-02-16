import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import SurveyOption from "@/components/onboarding/survey-option";
import theme from "@/lib/theme";
import {
  IconChartBar,
  IconClock,
  IconRocket,
  IconStars,
  IconTrendingUp,
} from "@tabler/icons-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";

const question = {
  title: "What do you want to achieve with Recap?",
  subtitle: "We'll do our best to meet your expectations.",

  options: [
    {
      id: "quick-results",
      title: "See quick results",
      icon: IconRocket,
      color: theme["color-1"],
    },
    {
      id: "build-habits",
      title: "Build better study habits",
      icon: IconTrendingUp,
      color: theme["color-2"],
    },
    {
      id: "save-time",
      title: "Save time studying",
      icon: IconClock,
      color: theme["color-3"],
    },
    {
      id: "improve-grades",
      title: "Improve my grades",
      icon: IconChartBar,
      color: theme["success"],
    },
    {
      id: "master-topics",
      title: "Master difficult topics",
      icon: IconStars,
      color: theme["color-4"],
    },
  ],
};

export default function ExpectationsSurvey() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  return (
    <OnboardingTemplate
      title={question.title}
      subtitle={question.subtitle}
      isSurvey={true}
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
        {question.options.map((expectation, index) => (
          <SurveyOption
            key={expectation.id}
            title={expectation.title}
            icon={expectation.icon}
            color={expectation.color}
            delay={index * 50}
            selected={selected.includes(expectation.id)}
            onSelect={() => toggleSelection(expectation.id)}
            multiSelect
          />
        ))}
      </ScrollView>
    </OnboardingTemplate>
  );
}
