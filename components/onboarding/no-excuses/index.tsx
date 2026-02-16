import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import theme from "@/lib/theme";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

const title = "No more excuses";
const subtitle =
  "Recap's got your back. You'll never fall behind on your studies again.";

const CONFETTI = [
  { emoji: "📘", top: "8%", left: "8%", delay: 200, rotate: "-15deg" },
  { emoji: "✏️", top: "5%", right: "12%", delay: 350, rotate: "20deg" },
  { emoji: "💡", top: "18%", left: "18%", delay: 500, rotate: "10deg" },
  { emoji: "⚡", top: "12%", right: "22%", delay: 150, rotate: "-25deg" },
  { emoji: "🧠", top: "25%", left: "6%", delay: 400, rotate: "15deg" },
  { emoji: "📝", top: "22%", right: "8%", delay: 300, rotate: "-10deg" },
  { emoji: "🎯", top: "3%", left: "42%", delay: 600, rotate: "5deg" },
  { emoji: "✨", top: "15%", left: "35%", delay: 250, rotate: "-20deg" },
];

export default function NoMoreExcuses() {
  return (
    <OnboardingTemplate title={title} subtitle={subtitle}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        {/* Scattered confetti emojis */}
        {CONFETTI.map((item, index) => (
          <Animated.Text
            key={index}
            entering={FadeIn.duration(500).delay(item.delay)}
            style={{
              position: "absolute",
              top: item.top as any,
              left: item.left as any,
              right: item.right as any,
              fontSize: 28,
              opacity: 0.5,
              transform: [{ rotate: item.rotate }],
            }}
          >
            {item.emoji}
          </Animated.Text>
        ))}

        {/* Main icon */}
        <Animated.Text
          entering={FadeInUp.duration(600).delay(100)}
          style={{ fontSize: 80, marginBottom: 24 }}
        >
          🎯
        </Animated.Text>

        {/* Tagline card */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(300)}
          style={{
            backgroundColor: theme.card,
            borderRadius: 20,
            padding: 24,
            borderWidth: 1,
            borderColor: theme.border,
            width: "100%",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: theme.foreground,
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            Turn any material into flashcards & quizzes in seconds
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["Smart Flashcards", "Adaptive Quizzes", "Spaced Repetition"].map(
              (label, index) => (
                <Animated.View
                  key={label}
                  entering={FadeInDown.duration(400).delay(500 + index * 100)}
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: theme.primary,
                    }}
                  >
                    {label}
                  </Text>
                </Animated.View>
              ),
            )}
          </View>
        </Animated.View>
      </View>
    </OnboardingTemplate>
  );
}
