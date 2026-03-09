import { TrackError, TrackEvent } from "@/lib/analytics";
import theme from "@/lib/theme";
import { useState } from "react";
import { Alert, Pressable, Text } from "react-native";
import { PurchasesPackage } from "react-native-purchases";
import { purchasePackage } from "../../lib/purchases";

export default function PaywallButton({
  selectedPkg,
  onPurchaseCompleted,
  onPurchaseCancelled,
  id,
}: {
  id: string;
  selectedPkg: PurchasesPackage | null;
  onPurchaseCompleted: (data: { customerInfo: any }) => void;
  onPurchaseCancelled?: () => void;
}) {
  const [purchasing, setPurchasing] = useState(false);

  const ctaLabel = selectedPkg?.product.introPrice
    ? "Try For Free"
    : "Start Pro Now";

  const handleSubscribe = async () => {
    if (purchasing) return;

    if (!selectedPkg) {
      Alert.alert(
        "Plan Unavailable",
        "The selected plan is currently unavailable. Please contact support at birthley@craftz.co",
        [{ text: "OK" }],
      );

      TrackError(new Error("Plan Unavailable"), {
        context: id,
      });

      return;
    }

    setPurchasing(true);

    const customerInfoResult = await purchasePackage(selectedPkg);

    if (customerInfoResult.isErr()) {
      Alert.alert(
        "Purchase Cancelled",
        "Your purchase was cancelled. Please try again or contact support.",
        [
          {
            text: "OK",
            onPress: () => {
              onPurchaseCancelled?.();
            },
          },
        ],
      );

      TrackEvent("Paywall Purchase Failed", {
        error: customerInfoResult.error?.message,
        id,
      });

      TrackError(customerInfoResult.error, {
        context: "Paywall",
        id,
      });

      setPurchasing(false);

      return;
    }

    // if (selectedPlan === "annual") {
    //   scheduleTrialReminder();
    // }

    // onPurchaseCompleted({
    //     customerInfo: customerInfoResult.value,
    // });

    TrackEvent("Paywall Purchase Completed", {
      id,
      plan: selectedPkg.packageType,
    });

    onPurchaseCompleted({
      customerInfo: customerInfoResult.value,
    });

    setPurchasing(false);
  };
  return (
    <Pressable
      onPress={handleSubscribe}
      disabled={purchasing || !selectedPkg}
      style={({ pressed }) => ({
        backgroundColor: theme.primary,
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: "center",
        opacity: pressed || purchasing || !selectedPkg ? 0.8 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <Text style={{ fontSize: 17, fontWeight: "800", color: "#fff" }}>
        {purchasing ? "Processing ..." : ctaLabel}
      </Text>
    </Pressable>
  );
}
