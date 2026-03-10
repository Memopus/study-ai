import theme from "@/lib/theme";
import { useOnboarding } from "@/providers/onboarding-provider";
import { IconCheck } from "@tabler/icons-react-native";
import { useRef, useState } from "react";
import { FlatList, Text, useWindowDimensions, View } from "react-native";
import OnboardingTemplate from "../onboarding-template";

const FEATURES = [
  {
    emoji: "📝",
    featureTitle: "AI Study Notes",
    description:
      "Turn any document into clean, structured notes you can actually learn from.",
    bullets: [
      "PDF, image, or plain text",
      "Organized with headers & sections",
      "Key concepts highlighted",
    ],
    color: theme.primary,
  },
  {
    emoji: "🃏",
    featureTitle: "Smart Flashcards",
    description: "Active recall cards generated directly from your material.",
    bullets: [
      "Auto-generated from your notes",
      "Flip to reveal the answer",
      "Track what you know",
    ],
    color: theme.primary,
  },
  {
    emoji: "🧠",
    featureTitle: "Adaptive Quizzes",
    description:
      "Multiple-choice quizzes tailored to exactly what you need to learn.",
    bullets: [
      "Questions from your material",
      "Instant right/wrong feedback",
      "See your score improve",
    ],
    color: theme.primary,
  },
];

export default function FeaturesShowcase() {
  const { getNext } = useOnboarding();
  const { width } = useWindowDimensions();
  const [step, setStep] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const isProgrammaticScroll = useRef(false);
  const label = step !== 2 ? "Next" : "Continue";

  const handleContinue = () => {
    if (step < FEATURES.length - 1) {
      const next = step + 1;
      setStep(next);
      isProgrammaticScroll.current = true;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
    } else {
      getNext();
    }
  };

  const handleScroll = (e: any) => {
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false;
      return;
    }
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newIndex !== step && newIndex >= 0 && newIndex < FEATURES.length) {
      setStep(newIndex);
    }
  };

  return (
    <OnboardingTemplate
      title="Built for the way your brain learns"
      subtitle="Three powerful tools built into one app."
      onContinue={handleContinue}
      label={label}
    >
      <View style={{ flex: 1, justifyContent: "center", paddingBottom: 100 }}>
        <FlatList
          ref={flatListRef}
          data={FEATURES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          style={{ flexGrow: 0 }}
          keyExtractor={(item) => item.featureTitle}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={{ width, paddingHorizontal: 24 }}>
              <View
                style={{
                  borderRadius: 28,
                  borderWidth: 1.5,
                  borderColor: `${item.color}25`,
                  overflow: "hidden",
                }}
              >
                {/* Hero */}
                <View
                  style={{
                    backgroundColor: `${item.color}15`,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 32,
                  }}
                >
                  <Text style={{ fontSize: 72 }}>{item.emoji}</Text>
                </View>

                {/* Content */}
                <View
                  style={{ backgroundColor: theme.card, padding: 24, gap: 16 }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "800",
                        color: item.color,
                        marginBottom: 6,
                        letterSpacing: -0.3,
                      }}
                    >
                      {item.featureTitle}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: theme.mutedForeground,
                        lineHeight: 21,
                        fontWeight: "500",
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>

                  <View style={{ height: 1, backgroundColor: theme.border }} />

                  <View style={{ gap: 12 }}>
                    {item.bullets.map((b) => (
                      <View
                        key={b}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            backgroundColor: `${item.color}18`,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconCheck
                            size={13}
                            color={item.color}
                            strokeWidth={3}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: theme.foreground,
                            flex: 1,
                          }}
                        >
                          {b}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}
        />

        {/* Dots */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            marginTop: 16,
          }}
        >
          {FEATURES.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === step ? 20 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === step ? theme.primary : theme.muted,
              }}
            />
          ))}
        </View>
      </View>
    </OnboardingTemplate>
  );
}
