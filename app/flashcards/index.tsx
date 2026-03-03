import FlashCard from "@/components/flashcards/flashcard";
import ProgressBar from "@/components/flashcards/progress-bar";
import PressableScale from "@/components/ui/pressable-scale";
import { useSelectedDocument } from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FlashCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedDocument = useSelectedDocument();
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const total = selectedDocument.flashcards.length;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: top + 8, paddingBottom: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <PressableScale
            onPress={() => router.back()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChevronLeft size={20} color={theme.foreground} strokeWidth={2.5} />
          </PressableScale>

          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: theme.aiBubble,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22 }}>{selectedDocument.emoji}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: theme.foreground,
                letterSpacing: -0.3,
              }}
              numberOfLines={1}
            >
              {selectedDocument.name}
            </Text>
            <Text style={{ fontSize: 13, color: theme.mutedForeground, fontWeight: "500", marginTop: 1 }}>
              Card {currentIndex + 1} of {total}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: theme.aiBubble,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "700", color: theme.primary }}>
              {Math.round(((currentIndex + 1) / total) * 100)}%
            </Text>
          </View>
        </View>

        <ProgressBar width={((currentIndex + 1) / total) * 100} />
      </View>

      {/* Flashcards */}
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
      >
        {selectedDocument.flashcards.map((card, index) => (
          <View
            key={index}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <FlashCard card={card} isActive={index === currentIndex} />
          </View>
        ))}
      </PagerView>

      {/* Hint */}
      <View style={{ paddingBottom: bottom + 16, alignItems: "center" }}>
        <Text style={{ fontSize: 13, fontWeight: "500", color: theme.mutedForeground }}>
          Tap to flip · Swipe to navigate
        </Text>
      </View>
    </View>
  );
}
