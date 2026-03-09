import { useOfferings } from "@/lib/store/revenue-cat";
import theme from "@/lib/theme";
import { Check } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";

function packageLabel(pkg: PurchasesPackage): string {
  switch (pkg.packageType) {
    case "ANNUAL":
      return "Yearly";
    case "SIX_MONTH":
      return "6 Months";
    case "THREE_MONTH":
      return "3 Months";
    case "TWO_MONTH":
      return "2 Months";
    case "MONTHLY":
      return "Monthly";
    case "WEEKLY":
      return "Weekly";
    default:
      return pkg.product.title;
  }
}

function packageBadge(pkg: PurchasesPackage): string | null {
  if (pkg.product.introPrice) return "FREE TRIAL";
  if (pkg.packageType === "ANNUAL") return "BEST OFFER";
  return null;
}

function packageSubtitle(pkg: PurchasesPackage): string {
  switch (pkg.packageType) {
    case "ANNUAL":
      return `${pkg.product.priceString} per year`;
    case "MONTHLY":
      return `${pkg.product.priceString} per month`;
    case "WEEKLY":
      return `${pkg.product.priceString} per week`;
    default:
      return pkg.product.priceString;
  }
}

type PaywallOffersProps = {
  selectedPkg: PurchasesPackage | null;
  setSelectedPkg: (pkg: PurchasesPackage | null) => void;
};

export default function PaywallOffers({
  selectedPkg,
  setSelectedPkg,
}: PaywallOffersProps) {
  const offerings = useOfferings();
  return (
    <View
      style={{
        gap: 10,
      }}
    >
      {offerings?.current?.availablePackages.map((pkg) => {
        const selected = selectedPkg?.identifier === pkg.identifier;
        const badge = packageBadge(pkg);

        return (
          <Pressable
            key={pkg.identifier}
            onPress={() => setSelectedPkg(pkg)}
            style={({ pressed }) => ({
              backgroundColor: selected ? theme.primary + "12" : "#fff",
              borderRadius: 18,
              padding: 18,
              borderWidth: 2,
              borderColor: selected ? theme.primary : "#E0E2E8",
              flexDirection: "row",
              alignItems: "center",
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: theme.foreground,
                  marginBottom: 3,
                }}
              >
                {packageLabel(pkg)}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.mutedForeground,
                  fontWeight: "500",
                }}
              >
                {packageSubtitle(pkg)}
              </Text>
            </View>

            {badge && (
              <View
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: 20,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  marginRight: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "800",
                    color: "#fff",
                    letterSpacing: 0.5,
                  }}
                >
                  {badge}
                </Text>
              </View>
            )}

            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderWidth: 2,
                borderColor: selected ? theme.primary : "#C8CDD8",
                backgroundColor: selected ? theme.primary : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selected && <Check color="#fff" size={14} strokeWidth={3} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
