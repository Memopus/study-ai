import theme from "@/lib/theme";
import { useOnboarding } from "@/providers/onboarding-provider";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import PressableScale from "../ui/pressable-scale";

export default function CTAButton({
  disabled = false,
  onPress,
  label,
}: {
  disabled: boolean;
  onPress?: () => void;
  label?: string;
}) {
  const { getNext } = useOnboarding();
  return (
    <LinearGradient
      colors={[theme["background"] + "00", theme["background"]]}
      locations={[0, 0.3]}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingBottom: 30,
        paddingTop: 20,
      }}
    >
      <PressableScale
        onPress={() => {
          if (onPress) {
            onPress();
          } else {
            getNext();
          }
        }}
      >
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
            {label ? label : "Continue"}
          </Text>
        </View>
      </PressableScale>
    </LinearGradient>
  );
}
