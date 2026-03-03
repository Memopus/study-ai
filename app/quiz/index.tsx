import QuizCompleted from "@/components/quiz/quiz-completed";
import QuizTitle from "@/components/quiz/quiz-title";
import PressableScale from "@/components/ui/pressable-scale";
import { useSelectedDocument } from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const selectedDocument = useSelectedDocument();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const quiz = selectedDocument.quiz;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const question = quiz.questions[currentQuestion];
  const correctAnswer = question.correctAnswer;
  const isAnswered = selectedAnswer !== null;

  const getOptionStyle = (index: number) => {
    if (!isAnswered) return styles.optionButton;
    if (index === correctAnswer) return [styles.optionButton, styles.optionButtonCorrect];
    if (index === selectedAnswer) return [styles.optionButton, styles.optionButtonIncorrect];
    return styles.optionButton;
  };

  const getOptionTextStyle = (index: number) => {
    if (!isAnswered) return styles.optionText;
    if (index === correctAnswer) return [styles.optionText, styles.optionTextCorrect];
    if (index === selectedAnswer) return [styles.optionText, styles.optionTextIncorrect];
    return styles.optionText;
  };

  const getLabelStyle = (index: number) => {
    if (!isAnswered) return styles.optionLabel;
    if (index === correctAnswer) return [styles.optionLabel, styles.optionLabelCorrect];
    if (index === selectedAnswer) return [styles.optionLabel, styles.optionLabelIncorrect];
    return styles.optionLabel;
  };

  const getLabelTextStyle = (index: number) => {
    if (!isAnswered) return styles.optionLabelText;
    if (index === correctAnswer) return [styles.optionLabelText, styles.optionLabelTextActive];
    if (index === selectedAnswer) return [styles.optionLabelText, styles.optionLabelTextActive];
    return styles.optionLabelText;
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleGoHome = () => {
    router.back();
  };

  if (quizCompleted)
    return (
      <QuizCompleted
        score={score}
        total={quiz.questions.length}
        onRestart={handleRestart}
        onGoHome={handleGoHome}
      />
    );

  return (
    <View style={styles.container}>
      <QuizTitle currentQuestion={currentQuestion} />

      <View style={styles.quizContainer}>
        <View style={styles.questionSection}>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <PressableScale
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswerSelect(index)}
              >
                <View style={getLabelStyle(index)}>
                  <Text style={getLabelTextStyle(index)}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={getOptionTextStyle(index)}>{option}</Text>
              </PressableScale>
            ))}
          </View>
        </View>

        <PressableScale
          style={[
            styles.nextButton,
            selectedAnswer === null && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Text>
        </PressableScale>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  quizContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  questionSection: {
    flex: 1,
  },
  questionCard: {
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.foreground,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: theme.card,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionButtonCorrect: {
    backgroundColor: "#f0fdf4",
    borderColor: "#22c55e",
  },
  optionButtonIncorrect: {
    backgroundColor: "#fef2f2",
    borderColor: "#ef4444",
  },
  optionLabel: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: theme.muted,
    justifyContent: "center",
    alignItems: "center",
  },
  optionLabelCorrect: {
    backgroundColor: "#22c55e",
  },
  optionLabelIncorrect: {
    backgroundColor: "#ef4444",
  },
  optionLabelText: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.mutedForeground,
  },
  optionLabelTextActive: {
    color: "#ffffff",
  },
  optionText: {
    fontSize: 15,
    color: theme.foreground,
    flex: 1,
    fontWeight: "500",
  },
  optionTextCorrect: {
    color: "#16a34a",
    fontWeight: "600",
  },
  optionTextIncorrect: {
    color: "#dc2626",
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  nextButtonDisabled: {
    backgroundColor: theme.muted,
  },
  nextButtonText: {
    color: theme.primaryForeground,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
