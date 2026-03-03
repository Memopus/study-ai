import { useSelectedDocument } from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PressableScale from "../ui/pressable-scale";
import ProgressBar from "./progress-bar";

export default function QuizTitle({ currentQuestion }: { currentQuestion: number }) {
  const selectedDocument = useSelectedDocument();
  const total = selectedDocument.quiz.questions.length;
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
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
            Question {currentQuestion + 1} of {total}
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
            {Math.round(((currentQuestion + 1) / total) * 100)}%
          </Text>
        </View>
      </View>
      <ProgressBar currentQuestion={currentQuestion} quiz={selectedDocument.quiz} />
    </View>
  );
}
