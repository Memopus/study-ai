import { TrackError, TrackEvent } from "@/lib/analytics";
import { useRevenueCatActions } from "@/lib/store/revenue-cat";
import theme from "@/lib/theme";
import { useState } from "react";
import { Alert, Linking, Pressable, Text, View } from "react-native";
import { restorePurchases } from "../../lib/purchases";

export default function PaywallFooter({
  id,
  selectedPlan,
}: {
  id: string;
  selectedPlan: string;
}) {
  const [restoring, setRestoring] = useState(false);
  const { onCustomerInfo } = useRevenueCatActions();

  const handleRestore = async () => {
    if (restoring) return;
    setRestoring(true);
    const customerInfo = await restorePurchases();
    console.log("RESTOORING");
    if (customerInfo.isErr()) {
      Alert.alert(
        "Restore Failed",
        "There was an error restoring your purchases. Please try again later or contact support.",
        [{ text: "OK" }],
      );
      setRestoring(false);
      TrackError(customerInfo.error, {
        context: "Paywall Restore Purchases",
        id,
        plan: selectedPlan,
      });
      return;
    }

    console.log(customerInfo.value);

    onCustomerInfo(customerInfo.value);

    TrackEvent("Paywall Restore Purchases", {
      id,
      plan: selectedPlan,
    });

    setRestoring(false);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Pressable onPress={handleRestore}>
        <Text style={{ fontSize: 13, color: theme.mutedForeground }}>
          {restoring ? "Restoring..." : "Restore Purchases"}
        </Text>
      </Pressable>
      <Text style={{ color: theme.mutedForeground }}>·</Text>
      <Pressable onPress={() => Linking.openURL("https://gaith.co/terms")}>
        <Text style={{ fontSize: 13, color: theme.mutedForeground }}>
          Terms
        </Text>
      </Pressable>
      <Text style={{ color: theme.mutedForeground }}>·</Text>
      <Pressable onPress={() => Linking.openURL("https://gaith.co/privacy")}>
        <Text style={{ fontSize: 13, color: theme.mutedForeground }}>
          Privacy
        </Text>
      </Pressable>
    </View>
  );
}
