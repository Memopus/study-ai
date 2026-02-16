import theme from "@/lib/theme";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface ProgressBarProps {
  width: number;
}

export default function ProgressBar({ width }: ProgressBarProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${width}%`, { duration: 300 }),
  }));

  return (
    <View
      style={{
        height: 4,
        backgroundColor: theme.muted,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            backgroundColor: theme.primary,
            borderRadius: 2,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
