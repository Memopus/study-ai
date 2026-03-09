import PaywallButton from "@/components/paywall/paywall-button";
import PaywallFeatures from "@/components/paywall/paywall-features";
import PaywallFooter from "@/components/paywall/paywall-footer";
import PaywallHeader from "@/components/paywall/paywall-header";
import PaywallOffers from "@/components/paywall/paywall-offers";
import { useOfferings } from "@/lib/store/revenue-cat";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BG = "#F2F3F7";

export default function Paywall({
  onPurchaseComplete,
  onPurchaseCancelled,
  onRestoreCompleted,
}: {
  onPurchaseComplete: () => void;
  onPurchaseCancelled: () => void;
  onRestoreCompleted: () => void;
}) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const offerings = useOfferings();
  const packages = offerings?.current?.availablePackages ?? [];
  const defaultPkg =
    packages.find((p) => p.packageType === "ANNUAL") ?? packages[0] ?? null;
  const [selectedPkg, setSelectedPkg] = useState<PurchasesPackage | null>(
    defaultPkg,
  );

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Close */}

      {/* Scrollable top: logo + features */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Logo + Title */}
        <PaywallHeader />

        {/* Features card */}
        <PaywallFeatures />
      </ScrollView>

      {/* Fixed bottom: plans + CTA */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: bottom + 16,
          backgroundColor: BG,
          gap: 12,
        }}
      >
        {/* Plans */}
        <PaywallOffers
          selectedPkg={selectedPkg}
          setSelectedPkg={setSelectedPkg}
        />

        {/* CTA */}

        <PaywallButton
          id={"Paywall"}
          selectedPkg={selectedPkg}
          onPurchaseCompleted={onPurchaseComplete}
          onPurchaseCancelled={onPurchaseCancelled}
        />

        {/* Footer */}
        <PaywallFooter id="paywall" selectedPlan={selectedPkg.packageType} />
      </View>
    </View>
  );
}
