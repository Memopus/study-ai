import Header from "@/components/document-page/header";
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
    if (!isAnswered) {
      return styles.optionButton;
    }

    if (index === correctAnswer) {
      return [styles.optionButton, styles.optionButtonCorrect];
    }

    if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
      return [styles.optionButton, styles.optionButtonIncorrect];
    }

    return styles.optionButton;
  };

  const getOptionTextStyle = (index: number) => {
    if (!isAnswered) {
      return styles.optionText;
    }

    if (index === correctAnswer) {
      return [styles.optionText, styles.optionTextCorrect];
    }

    if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
      return [styles.optionText, styles.optionTextIncorrect];
    }

    return styles.optionText;
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
      <Header title="Quiz" showOptions={false} />

      <QuizTitle currentQuestion={currentQuestion} />

      <View style={styles.quizContainer}>
        <View>
          <Text style={styles.questionText}>{question.question}</Text>
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <PressableScale
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswerSelect(index)}
              >
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
            {currentQuestion < quiz.questions.length - 1 ? "Next" : "Finish"}
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
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: theme.foreground,
  },

  questionCounter: {
    fontSize: 14,
    color: theme.mutedForeground,
    textAlign: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 30,
    color: theme.foreground,
    textAlign: "center",
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.border,
  },
  optionButtonSelected: {
    borderColor: theme.primary,
  },
  optionButtonCorrect: {
    backgroundColor: "#dcfce7",
    borderColor: "#22c55e",
    borderWidth: 2,
  },
  optionButtonIncorrect: {
    backgroundColor: "#fee2e2",
    borderColor: "#ef4444",
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: theme.foreground,
  },
  optionTextSelected: {
    color: theme.primary,
    fontWeight: "600",
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
});
