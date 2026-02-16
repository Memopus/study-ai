import Header from "@/components/document-page/header";
import FlashCard from "@/components/flashcards/flashcard";
import { useSelectedDocument } from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useState } from "react";
import { Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressBar from "../../components/flashcards/progress-bar";

export default function FlashCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedDocument = useSelectedDocument();
  const { bottom } = useSafeAreaInsets();
  console.log("FLASHCARDS", selectedDocument.flashcards);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header title="Flashcards" showOptions={false} />

      <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              height: 56,
              width: 56,
              backgroundColor: theme.primary,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Sparkles color="white" size={24} /> */}
            <Text
              style={{
                fontSize: 25,
              }}
            >
              {selectedDocument.emoji}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: theme.foreground,
                letterSpacing: -0.5,
              }}
            >
              {selectedDocument.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              width={
                ((currentIndex + 1) / selectedDocument.flashcards.length) * 100
              }
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: theme.mutedForeground,
            }}
          >
            {currentIndex + 1}/{selectedDocument.flashcards.length}
          </Text>
        </View>
      </View>

      {/* Flashcards */}
      <View style={{ flex: 1 }}>
        <PagerView
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentIndex(e.nativeEvent.position);
          }}
        >
          {selectedDocument.flashcards.map((card, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <FlashCard card={card} isActive={index === currentIndex} />
            </View>
          ))}
        </PagerView>
      </View>

      {/* Bottom section */}
      <View
        style={{
          paddingBottom: bottom + 16,
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Pagination dots */}
        {/* <View
          style={{
            flexDirection: "row",
            gap: 6,
          }}
        >
          {MOCK_FLASHCARDS.map((_, index) => (
            <AnimatedDot key={index} isActive={index === currentIndex} />
          ))}
        </View> */}

        {/* Hint text */}
        <Text
          style={{
            fontSize: 13,
            fontWeight: "500",
            color: theme.mutedForeground,
          }}
        >
          Tap card to flip · Swipe to navigate
        </Text>
      </View>
    </View>
  );
}
