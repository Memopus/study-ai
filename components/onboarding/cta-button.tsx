import theme from "@/lib/theme";
import { useOnboarding } from "@/providers/onboarding-provider";
import { Text, View } from "react-native";
import PressableScale from "../ui/pressable-scale";
export default function CTAButton({ disabled = false }: { disabled: boolean }) {
  const { getNext } = useOnboarding();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 30,
        left: 0,
        paddingHorizontal: 24,

        right: 0,
      }}
    >
      <PressableScale onPress={getNext}>
        <View
          style={{
            backgroundColor: !disabled ? theme.primary : theme.muted,
            paddingVertical: 18,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            opacity: !disabled ? 1 : 0.7,
          }}
        >
          <Text
            style={{
              color: !disabled
                ? theme.primaryForeground
                : theme.mutedForeground,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Continue
          </Text>
        </View>
      </PressableScale>
    </View>
  );
}
