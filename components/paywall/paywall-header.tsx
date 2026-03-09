import theme from "@/lib/theme";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PaywallHeader() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: top + 28,
        paddingBottom: 28,
      }}
    >
      <Image
        source={require("@/assets/images/app-icon-paywall.png")}
        style={{
          width: 140,
          height: 140,
          borderRadius: 22,
          marginBottom: 20,
        }}
      />
      <Text
        style={{
          fontSize: 32,
          fontWeight: "900",
          color: theme.foreground,
          textAlign: "center",
        }}
      >
        Unlock Premium
      </Text>
    </View>
  );
}
