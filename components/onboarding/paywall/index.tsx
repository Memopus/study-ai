import Paywall from "@/components/paywall/paywall";
import { useOnboarding } from "@/providers/onboarding-provider";
import { X } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingPaywall() {
  const { top } = useSafeAreaInsets();
  const { completeOnboarding } = useOnboarding();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable
        onPress={completeOnboarding}
        style={({ pressed }) => ({
          position: "absolute",
          top: top + 12,
          right: 20,
          zIndex: 10,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#E0E2E8",
          justifyContent: "center",
          alignItems: "center",
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <X color="#888" size={18} strokeWidth={2.5} />
      </Pressable>
      <Paywall
        onPurchaseComplete={completeOnboarding}
        onPurchaseCancelled={() => {}}
        onRestoreCompleted={completeOnboarding}
      />
    </View>
  );
}
