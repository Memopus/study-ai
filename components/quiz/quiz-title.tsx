import { useSelectedDocument } from "@/lib/store/documents";
import theme from "@/lib/theme";
import { Text, View } from "react-native";
import ProgressBar from "./progress-bar";

export default function QuizTitle({ currentQuestion }) {
  const selectedDocument = useSelectedDocument();
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 15 }}>
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
            {selectedDocument.name} Quiz
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: theme.primary,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Question {currentQuestion + 1} of{" "}
          {selectedDocument.quiz.questions.length}
        </Text>
        <Text
          style={{
            color: theme.accentForeground,
            fontWeight: "700",
          }}
        >
          100%
        </Text>
      </View>
      <ProgressBar
        currentQuestion={currentQuestion}
        quiz={selectedDocument.quiz}
      />
    </View>
  );
}
