import theme from "@/lib/theme";
import { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;
const CARD_MARGIN = 20;

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashCard({
  card,
  isActive,
}: {
  card: Flashcard;
  isActive: boolean;
}) {
  const rotation = useSharedValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!isActive && isFlipped) {
      rotation.set(withTiming(0, { duration: 300 }));
      setIsFlipped(false);
    }
  }, [isActive, isFlipped, rotation]);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const flipCard = () => {
    const newValue = isFlipped ? 0 : 180;
    rotation.set(withTiming(newValue, { duration: 400 }));
    toggleFlip();
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
    <Pressable onPress={flipCard}>
      <View
        style={{
          width: CARD_WIDTH,
          height: 400,
          marginHorizontal: CARD_MARGIN,
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
              borderRadius: 24,
              padding: 24,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 8,
              borderWidth: 2,
              borderColor: theme.border,
            },
            frontAnimatedStyle,
          ]}
        >
          <View
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: theme.primary + "15",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
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
              fontSize: 22,
              fontWeight: "700",
              color: theme.foreground,
              textAlign: "center",
              lineHeight: 32,
            }}
          >
            {card.question}
          </Text>
          <Text
            style={{
              position: "absolute",
              bottom: 20,
              fontSize: 13,
              color: theme.mutedForeground,
              fontWeight: "500",
            }}
          >
            Tap to reveal answer
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
              borderRadius: 24,
              padding: 24,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 8,
            },
            backAnimatedStyle,
          ]}
        >
          <View
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
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
              fontSize: 26,
              fontWeight: "700",
              color: theme.primaryForeground,
              textAlign: "center",
              lineHeight: 36,
            }}
          >
            {card.answer}
          </Text>
          <Text
            style={{
              position: "absolute",
              bottom: 20,
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              fontWeight: "500",
            }}
          >
            Tap to see question
          </Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}
