import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function PressableScale({
  onPress = () => {},
  style = {},
  children,
}: {
  onPress?: () => void;
  style?: any;
  children: React.ReactNode;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.set(
      withTiming(0.88, {
        duration: 300,
      }),
    );
  };

  const handlePressOut = () => {
    scale.set(
      withTiming(1, {
        duration: 300,
      }),
    );
  };
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </Pressable>
  );
}
