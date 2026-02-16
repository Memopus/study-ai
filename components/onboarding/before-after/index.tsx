import OnboardingTemplate from "@/components/onboarding/onboarding-template";
import Arrow from "@/components/svg/Arrow";
import theme from "@/lib/theme";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const title = "Your study life is about to change.";
const subtitle = "We'll help you make every session count.";

const BEFORE_TAGS = ["Cramming", "Stressed", "Overwhelmed", "Forgetting"];
const AFTER_TAGS = ["Confident", "Prepared", "Consistent", "Retained"];

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <View
      style={{
        backgroundColor: `${color}15`,
        borderColor: `${color}40`,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
      }}
    >
      <Text style={{ color, fontSize: 12, fontWeight: "600" }}>{label}</Text>
    </View>
  );
}

export default function BeforeAfter() {
  return (
    <OnboardingTemplate title={title} subtitle={subtitle}>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingVertical: 12,
          // justifyContent: "center",
        }}
      >
        {/* BEFORE Card (tilted) */}
        <Animated.View
          entering={FadeIn.delay(300)}
          style={{
            transform: [{ rotate: "-2.5deg" }],
            shadowColor: theme.secondary,
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            backgroundColor: theme.card,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "900",
              color: theme.secondary,
              letterSpacing: -0.3,
            }}
          >
            BEFORE: Stress & Frustration
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: theme.mutedForeground,
              marginTop: 6,
              marginBottom: 12,
              lineHeight: 21,
            }}
          >
            Cramming before exams, forgetting what you learned, and feeling
            overwhelmed by material.
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 4,
            }}
          >
            {BEFORE_TAGS.map((tag) => (
              <Tag key={tag} label={tag} color={theme.secondary} />
            ))}
          </View>
        </Animated.View>

        {/* Arrow */}
        <View style={{ alignItems: "center" }}>
          <Arrow size={60} color={theme.primary} />
        </View>

        {/* AFTER Card (tilted opposite) */}
        <Animated.View
          entering={FadeIn.delay(500)}
          style={{
            transform: [{ rotate: "2.5deg" }],
            shadowColor: theme.primary,
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            backgroundColor: theme.card,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "900",
              color: theme.primary,
              letterSpacing: -0.3,
            }}
          >
            With Recap: Confidence & Results
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: theme.mutedForeground,
              marginTop: 6,
              marginBottom: 12,
              lineHeight: 21,
            }}
          >
            Always prepared, always retaining. Never forgetting what matters
            again.
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 4,
            }}
          >
            {AFTER_TAGS.map((tag) => (
              <Tag key={tag} label={tag} color={theme.primary} />
            ))}
          </View>
        </Animated.View>
        <View
          style={{
            marginBottom: 20,
          }}
        />
      </ScrollView>
    </OnboardingTemplate>
  );
}
