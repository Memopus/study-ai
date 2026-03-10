import theme from "@/lib/theme";
import { SCREENS, useOnboarding } from "@/providers/onboarding-provider";
import React from "react";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CTAButton from "./cta-button";

interface Props {
  title: string;
  subtitle: string;
  data?: string | string[];
  children: React.ReactNode;
  isSurvey?: boolean;
  label?: string;
  onContinue?: () => void;
}

export default function OnboardingTemplate({
  title,
  subtitle,
  data,
  isSurvey = false,
  children,
  label,
  onContinue,
}: Props) {
  const { bottom, top } = useSafeAreaInsets();
  const { currentScreen } = useOnboarding();

  const hasSelection = Array.isArray(data)
    ? data.length > 0
    : typeof data === "string" && data;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SCREENS[currentScreen].name.includes("survey")
          ? top + 30
          : top,
        paddingBottom: bottom,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 10,
          paddingBottom: 8,
        }}
      >
        <Animated.Text
          entering={FadeInDown.duration(500)}
          style={{
            fontSize: 30,
            fontWeight: "800",
            color: theme.foreground,
            marginBottom: 12,
            marginTop: 20,
          }}
        >
          {title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.duration(500).delay(100)}
          style={{
            fontSize: 17,
            color: theme.mutedForeground,
            lineHeight: 24,
          }}
        >
          {subtitle}
        </Animated.Text>
      </View>

      {children}

      <CTAButton
        disabled={isSurvey ? Boolean(!hasSelection) : false}
        onPress={onContinue}
        label={label ? label : "Continue"}
      />
    </View>
  );
}
