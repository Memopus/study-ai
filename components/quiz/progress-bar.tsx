import theme from "@/lib/theme";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function ProgressBar({ currentQuestion, quiz }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(
      ((currentQuestion + 1) / quiz.questions.length) * 100,
    );
  }, [currentQuestion, quiz.questions.length, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={[styles.progressBarFill, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 6,
    backgroundColor: theme.muted,
    borderRadius: 3,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: theme.primary,
    borderRadius: 3,
  },
});
