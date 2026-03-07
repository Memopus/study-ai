import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import theme from "@/lib/theme";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const title = "How Recap works";
const subtitle = "Turn any material into mastery in 3 simple steps.";

const STEPS = [
  {
    emoji: "📄",
    title: "Import your material",
    description:
      "Upload a PDF, image, or paste any text you need to study.",
    color: theme.primary,
    delay: 100,
  },
  {
    emoji: "✨",
    title: "AI does the work",
    description:
      "Recap instantly generates notes, flashcards, and quizzes from your content.",
    color: theme.purple,
    delay: 250,
  },
  {
    emoji: "🎯",
    title: "Study smarter",
    description:
      "Learn with personalized tools that make retention effortless.",
    color: theme.success,
    delay: 400,
  },
];

export default function HowItWorks() {
  return (
    <OnboardingTemplate title={title} subtitle={subtitle}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
        {STEPS.map((step, index) => (
          <Animated.View
            key={step.title}
            entering={FadeInDown.duration(400).delay(step.delay)}
            style={{ flexDirection: "row", gap: 16 }}
          >
            {/* Left: icon + connector line */}
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: `${step.color}18`,
                  borderWidth: 2,
                  borderColor: `${step.color}35`,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 22 }}>{step.emoji}</Text>
              </View>
              {index < STEPS.length - 1 && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    marginVertical: 6,
                    backgroundColor: theme.border,
                  }}
                />
              )}
            </View>

            {/* Right: text */}
            <View
              style={{
                flex: 1,
                paddingBottom: index < STEPS.length - 1 ? 28 : 0,
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: theme.foreground,
                  marginBottom: 5,
                }}
              >
                {step.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.mutedForeground,
                  lineHeight: 20,
                  fontWeight: "500",
                }}
              >
                {step.description}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </OnboardingTemplate>
  );
}
