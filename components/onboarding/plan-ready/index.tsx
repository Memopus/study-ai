import CTAButton from "@/components/onboarding/cta-button";
import theme from "@/lib/theme";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PLAN_ITEMS = [
  { emoji: "📝", text: "Generate study notes from any material", color: theme.primary },
  { emoji: "🃏", text: "Practice with AI-powered flashcards", color: theme.purple },
  { emoji: "🧠", text: "Test your knowledge with adaptive quizzes", color: theme.success },
  { emoji: "🎯", text: "Build a consistent study habit", color: theme.accent },
];

export default function PlanReady() {
  const { top, bottom } = useSafeAreaInsets();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = PLAN_ITEMS.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 500 + i * 500),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const allVisible = visibleCount >= PLAN_ITEMS.length;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top + 20,
        paddingBottom: bottom,
        paddingHorizontal: 24,
        backgroundColor: theme.background,
      }}
    >
      {/* Header */}
      <Animated.Text
        entering={FadeInDown.duration(500)}
        style={{
          fontSize: 30,
          fontWeight: "800",
          color: theme.foreground,
          marginTop: 20,
          marginBottom: 8,
          letterSpacing: -0.5,
        }}
      >
        {"Your plan is ready \u2728"}
      </Animated.Text>
      <Animated.Text
        entering={FadeInDown.duration(500).delay(100)}
        style={{
          fontSize: 16,
          color: theme.mutedForeground,
          lineHeight: 23,
          fontWeight: "500",
          marginBottom: 36,
        }}
      >
        {"Here's what Recap will help you achieve:"}
      </Animated.Text>

      {/* Plan items */}
      <View style={{ gap: 12 }}>
        {PLAN_ITEMS.map((item, index) =>
          visibleCount > index ? (
            <Animated.View
              key={item.text}
              entering={FadeInUp.duration(400).springify().damping(18)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                backgroundColor: `${item.color}10`,
                borderRadius: 18,
                padding: 16,
                borderWidth: 1.5,
                borderColor: `${item.color}25`,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: `${item.color}18`,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: "600",
                  color: theme.foreground,
                  lineHeight: 21,
                }}
              >
                {item.text}
              </Text>
            </Animated.View>
          ) : null,
        )}
      </View>

      {/* Completion badge */}
      {allVisible && (
        <Animated.View
          entering={FadeIn.duration(500).delay(200)}
          style={{
            marginTop: 24,
            backgroundColor: `${theme.success}12`,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1.5,
            borderColor: `${theme.success}25`,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 24 }}>🎉</Text>
          <Text style={{ flex: 1, fontSize: 14, fontWeight: "700", color: theme.success, lineHeight: 20 }}>
            {"You're all set! Let's start your learning journey."}
          </Text>
        </Animated.View>
      )}

      {allVisible && <CTAButton disabled={false} />}
    </View>
  );
}
