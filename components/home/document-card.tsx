import { Document } from "@/app/types/documents";
import { useDocumentsActions } from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import { ChevronRight, Clock } from "lucide-react-native";
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
  const isDocument = document.type === "document";
  const isImage = document.type === "image";

  const getDocColor = () => {
    if (isDocument) return theme.primary;
    if (isImage) return theme.accent;
    return theme.purple;
  };

  const iconColor = getDocColor();

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
          padding: 16,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
          borderWidth: 2,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        {/* Icon */}
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            backgroundColor: iconColor + "15",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
            }}
          >
            {document.emoji}
          </Text>
        </View>

        {/* Content */}
        <View style={{ flex: 1, gap: 6 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: theme.foreground,
              lineHeight: 22,
            }}
            numberOfLines={1}
          >
            {document.name}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Clock color={theme.mutedForeground} size={14} strokeWidth={2} />
              <Text
                style={{
                  fontSize: 13,
                  color: theme.mutedForeground,
                  fontWeight: "500",
                }}
              >
                {document.date}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <ChevronRight size={25} />
        </View>
      </Pressable>
    </Animated.View>
  );
}
