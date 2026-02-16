import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import SurveyOption from "@/components/onboarding/survey-option";
import theme from "@/lib/theme";
import {
  IconCards,
  IconClipboardCheck,
  IconPencil,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const question = {
  title: "How do you study now?",
  subtitle: "This helps us recommend the best features for you.",

  options: [
    {
      id: "handwritten-notes",
      title: "Handwritten notes",
      icon: IconPencil,
      color: theme["color-1"],
    },

    {
      id: "flashcards",
      title: "Flashcards",
      icon: IconCards,
      color: theme["color-3"],
    },
    {
      id: "practice-quizzes",
      title: "Practice quizzes",
      icon: IconClipboardCheck,
      color: theme["color-4"],
    },

    {
      id: "videos-lectures",
      title: "Watching videos/lectures",
      icon: IconVideo,
      color: theme["color-1"],
    },
    {
      id: "study-groups",
      title: "Study groups",
      icon: IconUsers,
      color: theme["color-2"],
    },
  ],
};

export default function StudyMethods() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  return (
    <OnboardingTemplate
      title={question.title}
      isSurvey={true}
      subtitle={question.subtitle}
    >
      {/* <Chart /> */}
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
        {question.options.map((a, index) => (
          <SurveyOption
            key={a.id}
            title={a.title}
            icon={a.icon}
            color={a.color}
            delay={index * 50}
            selected={selected.includes(a.id)}
            onSelect={() => toggleSelection(a.id)}
            multiSelect
          />
        ))}
      </ScrollView>
    </OnboardingTemplate>
  );
}
