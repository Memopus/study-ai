import theme from "@/lib/theme";
import { FileText } from "lucide-react-native";
import { Text, View } from "react-native";

export default function NoDocument() {
  return (
    <View
      style={{
        position: "absolute",
        top: "50%",
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        right: 0,
        height: 120,
        transform: [{ translateY: -120 / 2 }],
      }}
    >
      <FileText color={theme.mutedForeground} size={64} strokeWidth={1} />
      <Text
        style={{
          fontSize: 17,
          color: theme.foreground,
          marginVertical: 10,
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        No documents yet
      </Text>
      <Text
        style={{
          color: theme.mutedForeground,
        }}
      >
        Start building your knowledge library today
      </Text>
    </View>
  );
}
