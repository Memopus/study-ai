import { useBottomSheetStoreActions } from "@/lib/store/bottom-sheets";
import {
  useDocumentsActions,
  useSelectedDocument,
} from "@/lib/store/documents";
import theme from "@/lib/theme";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import BottomSheetModal from "./bottom-sheet-modal";

const EMOJI_DATA = [
  {
    category: "Smileys",
    icon: "😀",
    emojis: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😋",
      "😜",
      "🤪",
      "😎",
      "🤩",
      "🥳",
      "😏",
      "😒",
      "😔",
      "😢",
      "😭",
      "😤",
      "😠",
      "🤯",
      "😱",
      "🥺",
      "😴",
      "🤔",
      "🤫",
      "🤭",
      "🙄",
    ],
  },
  {
    category: "Objects",
    icon: "📚",
    emojis: [
      "📚",
      "📖",
      "📝",
      "✏️",
      "📎",
      "📌",
      "📍",
      "🔍",
      "💡",
      "🎯",
      "🏆",
      "🎓",
      "📊",
      "📈",
      "💻",
      "🖥️",
      "⌨️",
      "🖱️",
      "💾",
      "📁",
      "📂",
      "🗂️",
      "📋",
      "📑",
      "🔖",
      "📰",
      "🗞️",
      "📃",
      "📄",
      "📜",
      "📒",
      "📓",
      "📔",
      "📕",
      "📗",
      "📘",
    ],
  },
  {
    category: "Nature",
    icon: "🌸",
    emojis: [
      "🌸",
      "🌺",
      "🌻",
      "🌹",
      "🌷",
      "🌼",
      "🌱",
      "🌲",
      "🌳",
      "🌴",
      "🌵",
      "🍀",
      "🍁",
      "🍂",
      "🍃",
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
      "🦋",
      "🐝",
      "🐞",
      "🌈",
      "⭐",
      "🌙",
    ],
  },
  {
    category: "Food",
    icon: "🍎",
    emojis: [
      "🍎",
      "🍊",
      "🍋",
      "🍌",
      "🍉",
      "🍇",
      "🍓",
      "🫐",
      "🍒",
      "🍑",
      "🥭",
      "🍍",
      "🥥",
      "🥝",
      "🍅",
      "🥑",
      "🥦",
      "🥬",
      "🥒",
      "🌶️",
      "🌽",
      "🥕",
      "🧄",
      "🧅",
      "🥔",
      "🍠",
      "🥐",
      "🍞",
      "🥖",
      "🥨",
      "🧀",
      "🍕",
      "🍔",
      "🍟",
      "🌮",
      "🍜",
    ],
  },
  {
    category: "Activities",
    icon: "⚽",
    emojis: [
      "⚽",
      "🏀",
      "🏈",
      "⚾",
      "🥎",
      "🎾",
      "🏐",
      "🏉",
      "🥏",
      "🎱",
      "🏓",
      "🏸",
      "🏒",
      "🥅",
      "⛳",
      "🏹",
      "🎣",
      "🤿",
      "🥊",
      "🥋",
      "🎽",
      "🛹",
      "🛼",
      "🛷",
      "⛸️",
      "🥌",
      "🎿",
      "🎮",
      "🎲",
      "🧩",
      "🎭",
      "🎨",
      "🎬",
      "🎤",
      "🎧",
      "🎵",
    ],
  },
  {
    category: "Symbols",
    icon: "❤️",
    emojis: [
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💔",
      "❣️",
      "💕",
      "💞",
      "💓",
      "💗",
      "💖",
      "💘",
      "💝",
      "✨",
      "💫",
      "🌟",
      "⚡",
      "🔥",
      "💥",
      "❄️",
      "🌊",
      "💧",
      "💦",
      "🎉",
      "🎊",
      "✅",
      "❌",
      "⭕",
      "❗",
      "❓",
      "💯",
    ],
  },
];

// Pre-calculate grid dimensions
const SIZE = 46;
const WINDOW_WIDTH = Dimensions.get("window").width;
const GRID_COLUMNS = Math.floor((WINDOW_WIDTH - 40) / SIZE);
const ITEM_WIDTH = (WINDOW_WIDTH - 40) / GRID_COLUMNS;

export default function EmojiBottomSheet() {
  const { hide } = useBottomSheetStoreActions();
  const selectedDocument = useSelectedDocument();
  const { editDocument } = useDocumentsActions();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(EMOJI_DATA[0].category);

  // Get current emojis based on search or category
  const currentEmojis = useMemo(() => {
    if (searchQuery.trim()) {
      // Flatten all emojis for search
      return EMOJI_DATA.flatMap((cat) => cat.emojis);
    }
    return (
      EMOJI_DATA.find((cat) => cat.category === activeCategory)?.emojis || []
    );
  }, [searchQuery, activeCategory]);

  const renderEmojiItem = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => {
        editDocument({ emoji: item }, selectedDocument.file.uri);
        hide("emoji-selector");
      }}
      style={{
        width: ITEM_WIDTH,
        height: SIZE,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: theme.muted,
          borderRadius: 12,
          width: 42,
          height: 42,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 24 }}>{item}</Text>
      </View>
    </Pressable>
  );

  return (
    <BottomSheetModal id="emoji-selector" snapPoint={480}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: theme.foreground,
              marginBottom: 12,
            }}
          >
            Pick an Emoji
          </Text>

          {/* Search Input */}
          <TextInput
            placeholder="Search emojis..."
            placeholderTextColor={theme.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              backgroundColor: theme.muted,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              color: theme.foreground,
              marginBottom: 12,
            }}
          />
        </View>

        {/* Emoji Grid */}
        <View style={{ flex: 1, paddingHorizontal: 20, marginBottom: 10 }}>
          <BottomSheetFlashList
            data={currentEmojis}
            keyExtractor={(item, index) => `${item}-${index}`}
            numColumns={GRID_COLUMNS}
            renderItem={renderEmojiItem}
            estimatedItemSize={SIZE}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Category Selector */}
        {!searchQuery && (
          <View
            style={{
              paddingVertical: 12,
              borderTopWidth: 1,
              borderTopColor: theme.border,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
            >
              {EMOJI_DATA.map((category) => {
                const isActive = activeCategory === category.category;
                return (
                  <Pressable
                    key={category.category}
                    onPress={() => setActiveCategory(category.category)}
                    style={{
                      backgroundColor: isActive ? theme.primary : theme.muted,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{category.icon}</Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "600",
                        color: isActive ? "#FFFFFF" : theme.foreground,
                      }}
                    >
                      {category.category}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </BottomSheetModal>
  );
}
