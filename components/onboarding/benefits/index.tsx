import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import theme from "@/lib/theme";
import {
  IconBolt,
  IconBrain,
  IconCards,
  IconSparkles,
} from "@tabler/icons-react-native";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const BENEFITS = [
  {
    id: "ai-flashcards",
    title: "AI-Powered Flashcards",
    description: "Transform any document into smart flashcards instantly",
    icon: IconCards,
    color: theme.primary,
  },
  {
    id: "smart-quizzes",
    title: "Adaptive Quizzes",
    description: "Test your knowledge with personalized quiz questions",
    icon: IconBrain,
    color: theme.secondary,
  },
  {
    id: "instant-processing",
    title: "Instant Processing",
    description: "Upload PDFs, notes, or images and start learning in seconds",
    icon: IconBolt,
    color: theme.accent,
  },
  {
    id: "better-retention",
    title: "Better Retention",
    description: "Learn smarter with spaced repetition and active recall",
    icon: IconSparkles,
    color: theme.purple,
  },
];

const title = "Learn smarter with Recap";
const subtitle = "Your AI study companion that turns any material into an interactive learning experience.";

export default function Benefits() {
  return (
    <OnboardingTemplate title={title} subtitle={subtitle}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 20,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {BENEFITS.map((benefit, index) => (
          <Animated.View
            key={benefit.id}
            entering={FadeInDown.duration(400).delay(index * 100)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.card,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: theme.border,
                gap: 14,
              }}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: `${benefit.color}18`,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <benefit.icon size={26} color={benefit.color} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: theme.foreground,
                    marginBottom: 4,
                  }}
                >
                  {benefit.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.mutedForeground,
                    lineHeight: 20,
                  }}
                >
                  {benefit.description}
                </Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </OnboardingTemplate>
  );
}
