import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import theme from "@/lib/theme";
import {
  IconBolt,
  IconBook,
  IconBrain,
  IconTargetArrow,
} from "@tabler/icons-react-native";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeInDown, runOnJS } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const title = "Sign your commitment";
const subtitle = "From this day onwards I will:";

const COMMITMENTS = [
  {
    icon: IconBook,
    label: "Never fall behind on my studies ",
    color: theme.secondary,
  },
  {
    icon: IconBrain,
    label: "Master every topic I need to learn",
    color: theme.purple,
  },
  {
    icon: IconBolt,
    label: "Turn any material into knowledge",
    color: theme.success,
  },
  {
    icon: IconTargetArrow,
    label: "Stay on top of my learning goals",
    color: theme.accent,
  },
];

function CommitmentCard({
  icon: Icon,
  label,
  color,
  delay,
}: {
  icon: React.ComponentType<any>;
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(delay)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: `${color}12`,
        borderRadius: 16,
        padding: 12,
        gap: 10,
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: `${color}20`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={22} color={color} strokeWidth={2.5} />
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 15,
          fontWeight: "700",
          color: theme.foreground,
          lineHeight: 21,
        }}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

function SignaturePad() {
  const [strokes, setStrokes] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");

  const addPoint = useCallback((x: number, y: number, isFirst: boolean) => {
    if (isFirst) {
      setCurrentPath(`M ${x} ${y}`);
    } else {
      setCurrentPath((prev) => `${prev} L ${x} ${y}`);
    }
  }, []);

  const finishStroke = useCallback(() => {
    setStrokes((prev) => [...prev, currentPath]);
    setCurrentPath("");
  }, [currentPath]);

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onStart((e) => {
      runOnJS(addPoint)(e.x, e.y, true);
    })
    .onUpdate((e) => {
      runOnJS(addPoint)(e.x, e.y, false);
    })
    .onEnd(() => {
      runOnJS(finishStroke)();
    });

  const hasSignature = strokes.length > 0 || currentPath.length > 0;

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(500)}>
      <GestureDetector gesture={gesture}>
        <View
          style={{
            height: 180,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.card,
            overflow: "hidden",
            justifyContent: "flex-end",
          }}
        >
          <Svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {strokes.map((d, i) => (
              <Path
                key={i}
                d={d}
                stroke={theme.foreground}
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {currentPath ? (
              <Path
                d={currentPath}
                stroke={theme.foreground}
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}
          </Svg>
          {!hasSignature && (
            <Text
              style={{
                textAlign: "center",
                color: theme.mutedForeground,
                fontSize: 14,
                paddingBottom: 16,
              }}
            >
              Sign your name using your finger...
            </Text>
          )}
        </View>
      </GestureDetector>
    </Animated.View>
  );
}

export default function Commitment() {
  return (
    <OnboardingTemplate title={title} subtitle={subtitle}>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          marginTop: 20,
          gap: 12,
        }}
      >
        {COMMITMENTS.map((item, index) => (
          <CommitmentCard
            key={item.label}
            icon={item.icon}
            label={item.label}
            color={item.color}
            delay={150 + index * 100}
          />
        ))}

        <SignaturePad />

        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </OnboardingTemplate>
  );
}
