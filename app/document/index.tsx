import Header from "@/components/document-page/header";
import EditBottomSheet from "@/components/edit-bottom-sheet";
import EmojiBottomSheet from "@/components/emoji-bottom-sheet";
import PressableScale from "@/components/ui/pressable-scale";
import { getFlashcards, getQuiz } from "@/lib/lib";
import {
  useDocumentsActions,
  useSelectedDocument,
} from "@/lib/store/documents";
import { useLoadingProgressActions } from "@/lib/store/loading-progress";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import { Brain, FileQuestion, Sparkles } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MarkDown from "react-native-markdown-display";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ACTION_CARD_WIDTH = (SCREEN_WIDTH - 52) / 2; // 20px padding each side + 12px gap

/**
 * Enhanced Markdown Styles
 * Focuses on readability, spacing, and brand consistency
 */
const markdownStyles = StyleSheet.create({
  body: {
    backgroundColor: theme.background,
    color: theme.foreground,
    fontSize: 16,
  },

  // Typography - Hierarchical Spacing
  heading1: {
    color: theme.foreground,
    fontSize: 32,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 20,
    letterSpacing: -1,
  },
  heading2: {
    color: theme.foreground,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: -0.5,
    // Modern alternative to full-width border
    borderLeftWidth: 4,
    borderLeftColor: theme.primary,
    paddingLeft: 12,
  },
  heading3: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  paragraph: {
    color: theme.foreground,
    fontSize: 17, // Slightly larger for readability
    lineHeight: 28, // Increased leading for "breathability"
    marginBottom: 18,
    opacity: 0.9,
  },
  strong: {
    fontWeight: "700",
    color: theme.foreground,
  },

  // Specialized Components
  blockquote: {
    backgroundColor: theme.aiBubble,
    borderLeftColor: theme.primary,
    borderLeftWidth: 4,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginVertical: 20,
    borderRadius: 12,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  // Custom "Definition" style (can be applied to specific paragraphs)
  definitionText: {
    color: theme.primary,
    fontWeight: "600",
  },

  code_inline: {
    backgroundColor: theme.muted,
    color: theme.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },

  // Lists - Improved Alignment
  bullet_list: {
    marginVertical: 12,
    paddingLeft: 8,
  },
  list_item: {
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet_list_icon: {
    color: theme.primary,
    fontSize: 20,
    lineHeight: Platform.OS === "ios" ? 26 : 30,
    marginRight: 12,
    fontWeight: "bold",
  },
  ordered_list_icon: {
    color: theme.primary,
    fontWeight: "800",
    marginRight: 12,
    fontSize: 16,
    lineHeight: 26,
  },

  // Dividers
  hr: {
    backgroundColor: theme.border,
    height: 1,
    marginVertical: 32,
    width: "100%",
  },
});

const ACTIONS = [
  {
    id: "quiz" as const,
    title: "Quiz",
    icon: FileQuestion,
    description: "Generate interactive quiz questions",
    color: theme.primary,
    route: "/quiz",
  },
  {
    id: "flashcards" as const,
    title: "Flashcards",
    icon: Brain,
    description: "Build flashcards for quick review",
    color: theme.accent,
    route: "/flashcards",
  },
];

export default function Document() {
  const document = useSelectedDocument();
  const router = useRouter();
  const [showTitleInHeader, setShowTitleInHeader] = useState(false);

  useEffect(() => {
    if (!document) router.back();
  }, [document, router]);

  if (!document) return null;

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Show title in header when scrolled past the header section (around 90 pixels)
    setShowTitleInHeader(offsetY > 90);
  };

  return (
    <>
      <EditBottomSheet />
      <EmojiBottomSheet />
      <Header
        title={showTitleInHeader ? `${document.emoji} ${document.name}` : ""}
      />

      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Document Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.iconBox}>
            {/* <Sparkles color="white" size={24} /> */}
            <Text
              style={{
                fontSize: 25,
              }}
            >
              {document.emoji}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.docName}>{document.name}</Text>
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionLabel}>MEMORY PRACTICE</Text>
          {ACTIONS.map((action) => (
            <ActionButton key={action.id} action={action} />
          ))}
        </View>

        {/* Notes Section */}
        <View style={styles.sectionWrapper}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesTitle}>Notes</Text>
            <View style={styles.aiBadge}>
              <Sparkles size={12} color={theme.primary} />
              <Text style={styles.aiBadgeText}>AI Analysis</Text>
            </View>
          </View>

          <MarkDown style={markdownStyles}>{document.aiNotes}</MarkDown>
        </View>
      </ScrollView>
    </>
  );
}

function ActionButton({ action }: { action: (typeof ACTIONS)[0] }) {
  const Icon = action.icon;
  const router = useRouter();
  const document = useSelectedDocument();
  const { setStep, setLoadingType } = useLoadingProgressActions();
  const { editDocument } = useDocumentsActions();

  const handlePress = async () => {
    if (document[action.id]) {
      router.push(`/${action.id}`);
      return;
    }

    setLoadingType(action.id);

    router.push("/loading");

    setStep("upload");
    await new Promise((resolve) => setTimeout(resolve, 300));

    setStep("extract");
    await new Promise((resolve) => setTimeout(resolve, 300));

    setStep("generate");

    if (action.id === "quiz") {
      const quiz = await getQuiz(document.file, document.type);
      editDocument({ quiz }, document.file.uri);
    } else if (action.id === "flashcards") {
      const flashcards = await getFlashcards(document.file, document.type);
      editDocument({ ...flashcards }, document.file.uri);
    }

    setStep("finalize");
    router.replace(`/${action.id}`);
  };

  // const handlePress = async () => {
  //   router.push(`/${action.id}`);
  // };

  return (
    <PressableScale onPress={handlePress} style={styles.actionButton}>
      <View style={styles.actionButtonContent}>
        <View
          style={[
            styles.actionIconWrapper,
            { backgroundColor: action.color + "15" },
          ]}
        >
          <Icon color={action.color} size={24} strokeWidth={2.5} />
        </View>

        <View style={styles.actionTextWrapper}>
          <Text style={styles.actionTitle}>{action.title}</Text>
          <Text style={styles.actionDesc}>{action.description}</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 16,
  },
  iconBox: {
    height: 56,
    width: 56,
    backgroundColor: theme.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    // Subtle shadow for depth
    ...Platform.select({
      ios: {
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  docName: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.foreground,
    letterSpacing: -0.5,
  },
  docDate: {
    fontSize: 14,
    color: theme.mutedForeground,
    fontWeight: "500",
    marginTop: 2,
  },
  sectionWrapper: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.mutedForeground,
    marginBottom: 12,
    marginLeft: 4,
    letterSpacing: 1.2,
  },
  actionButton: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.border,
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  actionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTextWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.foreground,
  },
  actionDesc: {
    fontSize: 13,
    color: theme.mutedForeground,
    lineHeight: 18,
    marginTop: 2,
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    paddingBottom: 12,
  },
  notesTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.primary,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: theme.primary + "10",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  aiBadgeText: {
    color: theme.primary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
