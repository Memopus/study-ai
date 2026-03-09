import PaywallButton from "@/components/paywall/paywall-button";
import PaywallFeatures from "@/components/paywall/paywall-features";
import PaywallFooter from "@/components/paywall/paywall-footer";
import PaywallHeader from "@/components/paywall/paywall-header";
import PaywallOffers from "@/components/paywall/paywall-offers";
import { useOfferings } from "@/lib/store/revenue-cat";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BG = "#F2F3F7";

export default function PaywallScreen() {
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
      <Pressable
        onPress={() => router.back()}
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
          onPurchaseCompleted={() => {
            router.back();
          }}
          onPurchaseCancelled={() => router.back()}
        />

        {/* Footer */}
        <PaywallFooter id="paywall" selectedPlan={selectedPkg.packageType} />
      </View>
    </View>
  );
}
