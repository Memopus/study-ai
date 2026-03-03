import PressableScale from "@/components/ui/pressable-scale";
import theme from "@/lib/theme";
import { RotateCcw } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { top, bottom } = useSafeAreaInsets();

  const getEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    if (percentage >= 40) return "💪";
    return "📚";
  };

  const getMessage = () => {
    if (percentage === 100) return "Perfect Score!";
    if (percentage >= 80) return "Great Job!";
    if (percentage >= 60) return "Good Effort!";
    if (percentage >= 40) return "Keep Practicing!";
    return "Keep Studying!";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "#22c55e";
    if (percentage >= 60) return theme.primary;
    if (percentage >= 40) return theme.accent;
    return "#ef4444";
  };

  return (
    <View style={[styles.container, { paddingTop: top + 20, paddingBottom: bottom + 20 }]}>
      <View style={styles.content}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{getEmoji()}</Text>
        </View>

        <Text style={styles.message}>{getMessage()}</Text>
        <Text style={styles.subtitle}>{"You've completed the quiz"}</Text>

        <View style={styles.scoreCard}>
          <Text style={[styles.percentage, { color: getScoreColor() }]}>{percentage}%</Text>
          <View style={styles.divider} />
          <View style={styles.scoreRow}>
            <View style={styles.scoreStat}>
              <Text style={styles.scoreStatValue}>{score}</Text>
              <Text style={styles.scoreStatLabel}>Correct</Text>
            </View>
            <View style={styles.scoreStatDivider} />
            <View style={styles.scoreStat}>
              <Text style={styles.scoreStatValue}>{total - score}</Text>
              <Text style={styles.scoreStatLabel}>Wrong</Text>
            </View>
            <View style={styles.scoreStatDivider} />
            <View style={styles.scoreStat}>
              <Text style={styles.scoreStatValue}>{total}</Text>
              <Text style={styles.scoreStatLabel}>Total</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <View style={{ flex: 1 }}>
          <PressableScale style={styles.secondaryButton} onPress={onGoHome}>
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </PressableScale>
        </View>
        <View style={{ flex: 1 }}>
          <PressableScale style={styles.primaryButton} onPress={onRestart}>
            <RotateCcw size={16} color={theme.primaryForeground} strokeWidth={2.5} />
            <Text style={styles.primaryButtonText}>Try Again</Text>
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
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: theme.aiBubble,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 40,
  },
  message: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.foreground,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: theme.mutedForeground,
    fontWeight: "500",
    marginBottom: 16,
  },
  scoreCard: {
    width: "100%",
    backgroundColor: theme.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  percentage: {
    fontSize: 56,
    fontWeight: "800",
    letterSpacing: -1,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: theme.border,
    marginVertical: 16,
  },
  scoreRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  scoreStat: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  scoreStatValue: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.foreground,
  },
  scoreStatLabel: {
    fontSize: 12,
    color: theme.mutedForeground,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scoreStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: theme.border,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: theme.primaryForeground,
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.border,
  },
  secondaryButtonText: {
    color: theme.foreground,
    fontSize: 16,
    fontWeight: "600",
  },
});
