import { Document } from "@/app/types/documents";
import { useDocumentsActions } from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function DocumentCard({
  document,
  index,
}: {
  document: Document;
  index: number;
}) {
  const router = useRouter();
  const { setSelectedDocument } = useDocumentsActions();

  const handlePress = () => {
    setSelectedDocument(document);
    router.push("/document");
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).springify()}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => ({
          backgroundColor: theme.card,
          padding: 14,
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          borderWidth: 1,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        {/* Emoji */}
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            backgroundColor: theme.aiBubble,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24 }}>{document.emoji}</Text>
        </View>

        {/* Content */}
        <View style={{ flex: 1, gap: 5 }}>
          <Text
            style={{ fontSize: 15, fontWeight: "700", color: theme.foreground }}
            numberOfLines={1}
          >
            {document.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text
              style={{
                fontSize: 12,
                color: theme.mutedForeground,
                fontWeight: "500",
              }}
            >
              {document.date}
            </Text>
          </View>
        </View>

        <ChevronRight size={16} color={theme.mutedForeground} strokeWidth={2} />
      </Pressable>
    </Animated.View>
  );
}
