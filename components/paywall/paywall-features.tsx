import theme from "@/lib/theme";
import { Check } from "lucide-react-native";
import { Text, View } from "react-native";

const FEATURES = [
  ["Unlimited ", "Documents", " & ", "Flashcards"],
  ["Unlimited ", "AI Quizzes"],
  ["Priority ", "AI Processing"],
  ["No more ", "annoying paywalls"],
];

export default function PaywallFeatures() {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          paddingVertical: 8,
          paddingHorizontal: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 10,
        }}
      >
        {FEATURES.map((parts, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 13,
              borderBottomWidth: i < FEATURES.length - 1 ? 1 : 0,
              borderBottomColor: "#F0F0F0",
              gap: 14,
            }}
          >
            <Check color={theme.primary} size={18} strokeWidth={2.5} />
            <Text style={{ fontSize: 15, color: theme.foreground, flex: 1 }}>
              {parts.map((part, j) =>
                j % 2 === 1 ? (
                  <Text key={j} style={{ fontWeight: "700" }}>
                    {part}
                  </Text>
                ) : (
                  part
                ),
              )}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
