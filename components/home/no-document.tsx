import theme from "@/lib/theme";
import { Text, View } from "react-native";

export default function NoDocument({ bottomOffset = 0 }: { bottomOffset?: number }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
        paddingBottom: bottomOffset,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          backgroundColor: theme.aiBubble,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Text style={{ fontSize: 36 }}>📚</Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "800",
          color: theme.foreground,
          letterSpacing: -0.4,
        }}
      >
        No documents yet
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: theme.mutedForeground,
          fontWeight: "500",
          textAlign: "center",
          lineHeight: 20,
        }}
      >
        Import a PDF, image, or text file to generate your study notes
      </Text>
    </View>
  );
}
