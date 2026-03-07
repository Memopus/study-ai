import StudyShapesBackground from "@/components/background-squiggles";
import CTAButton from "@/components/onboarding/cta-button";
import theme from "@/lib/theme";
import { View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function NoMoreExcuses() {
  return (
    <View style={{ flex: 1 }}>
      <StudyShapesBackground />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        <Animated.Text
          entering={FadeInUp.duration(600).delay(150)}
          style={{ fontSize: 90, marginBottom: 32 }}
        >
          🎯
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(500).delay(250)}
          style={{
            fontSize: 34,
            fontWeight: "800",
            color: theme.foreground,
            textAlign: "center",
            letterSpacing: -0.5,
            marginBottom: 14,
          }}
        >
          No more excuses
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(500).delay(350)}
          style={{
            fontSize: 17,
            color: theme.mutedForeground,
            textAlign: "center",
            lineHeight: 25,
            fontWeight: "500",
          }}
        >
          {
            "Recap's got your back. You'll never fall behind on your studies again."
          }
        </Animated.Text>
      </View>

      <CTAButton disabled={false} />
    </View>
  );
}
