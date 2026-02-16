import PressableScale from "@/components/ui/pressable-scale";
import theme from "@/lib/theme";
import { StyleSheet, Text, View } from "react-native";

export default function QuizCompleted({
  score,
  total,
  onRestart,
  onGoHome,
}: {
  score: number;
  total: number;
  onRestart: () => void;
  onGoHome: () => void;
}) {
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return "Perfect Score!";
    if (percentage >= 80) return "Great Job!";
    if (percentage >= 60) return "Good Effort!";
    if (percentage >= 40) return "Keep Practicing!";
    return "Try Again!";
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>{getMessage()}</Text>
        <Text style={styles.resultScore}>
          You scored {score} out of {total}
        </Text>
        <Text style={styles.resultPercentage}>{percentage}%</Text>
        <View style={styles.buttonsContainer}>
          <PressableScale style={styles.primaryButton} onPress={onRestart}>
            <Text style={styles.primaryButtonText}>Try Again</Text>
          </PressableScale>
          <PressableScale style={styles.secondaryButton} onPress={onGoHome}>
            <Text style={styles.secondaryButtonText}>Go Home</Text>
          </PressableScale>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  nextButton: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonDisabled: {
    backgroundColor: theme.border,
  },
  nextButtonText: {
    color: theme.primaryForeground,
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.foreground,
  },
  resultScore: {
    fontSize: 24,
    marginBottom: 10,
    color: theme.foreground,
  },
  resultPercentage: {
    fontSize: 48,
    fontWeight: "bold",
    color: theme.primary,
    marginBottom: 40,
  },
  restartButton: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 8,
    paddingHorizontal: 40,
  },
  restartButtonText: {
    color: theme.primaryForeground,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonsContainer: {
    gap: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    padding: 16,
    backgroundColor: theme.primary,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: theme.primaryForeground,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    padding: 16,
    backgroundColor: theme.border,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: theme.foreground,
    fontSize: 16,
    fontWeight: "600",
  },
});
