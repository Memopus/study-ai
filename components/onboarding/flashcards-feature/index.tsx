import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import theme from "@/lib/theme";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const title = "Flashcards that fit you";
const subtitle =
  "AI-generated flashcards that adapt to your learning style. Tap to flip!";

const demoCard = {
  question: "What is Recap?",
  answer: "A learning technique that reviews material at increasing intervals",
};

export default function FlashcardsFeature() {
  const rotation = useSharedValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Auto-flip demo after a short delay
    const timer = setTimeout(() => {
      flipCard();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const flipCard = () => {
    const newValue = isFlipped ? 0 : 180;
    rotation.set(withTiming(newValue, { duration: 400 }));
    setIsFlipped((prev) => !prev);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }] as const,
      backfaceVisibility: "hidden" as const,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }] as const,
      backfaceVisibility: "hidden" as const,
    };
  });

  return (
    <OnboardingTemplate title={title} subtitle={subtitle}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 16,
        }}
      >
        {/* Demo Flashcard */}
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Pressable onPress={flipCard}>
            <View
              style={{
                height: 400,
                marginBottom: 24,
              }}
            >
              {/* Front of card (Question) */}
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.card,
                    borderRadius: 20,
                    padding: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 6,
                    borderWidth: 2,
                    borderColor: theme.border,
                  },
                  frontAnimatedStyle,
                ]}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: theme.primary + "15",
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: theme.primary,
                      textTransform: "uppercase",
                    }}
                  >
                    Question
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: theme.foreground,
                    textAlign: "center",
                    lineHeight: 26,
                  }}
                >
                  {demoCard.question}
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    bottom: 14,
                    fontSize: 12,
                    color: theme.mutedForeground,
                    fontWeight: "500",
                  }}
                >
                  Tap to flip
                </Text>
              </Animated.View>

              {/* Back of card (Answer) */}
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.primary,
                    borderRadius: 20,
                    padding: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 6,
                  },
                  backAnimatedStyle,
                ]}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: theme.primaryForeground,
                      textTransform: "uppercase",
                    }}
                  >
                    Answer
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: theme.primaryForeground,
                    textAlign: "center",
                    lineHeight: 26,
                    paddingHorizontal: 10,
                  }}
                >
                  {demoCard.answer}
                </Text>
              </Animated.View>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </OnboardingTemplate>
  );
}
