import colors from "@/lib/theme";
import { SCREENS, useOnboarding } from "@/providers/onboarding-provider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProgressBar() {
  const { currentScreen, setCurrentScreen } = useOnboarding();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const progress = useSharedValue(currentScreen / SCREENS.length);

  useEffect(() => {
    progress.value = currentScreen / SCREENS.length;
  }, [currentScreen, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progress.value * 100}%`, { duration: 300 }),
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value === 0 ? 0 : 1, { duration: 200 }),
    pointerEvents: progress.value === 0 ? "none" : "auto",
  }));

  const handleBack = () => {
    if (currentScreen === 0) {
      router.back();
    } else {
      setCurrentScreen((prev) => prev - 1);
      router.back();
    }
  };

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          backgroundColor: colors.background,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity onPress={handleBack} hitSlop={8}>
        <Ionicons name="chevron-back" size={24} color={colors.foreground} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          maxWidth: 300,
          height: 3,
          backgroundColor: colors.border,
          borderRadius: 1.5,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              height: "100%",
              backgroundColor: colors.primary,
              borderRadius: 1.5,
            },
            animatedStyle,
          ]}
        />
      </View>
      <Text> </Text>
    </Animated.View>
  );
}
