import theme from "@/lib/theme";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function SurveyOption({
  title,
  icon: Icon,
  color,
  delay,
  selected,
  onSelect,
  multiSelect = false,
}: {
  title: string;
  icon: any;
  color: string;
  delay: number;
  selected: boolean;
  onSelect: () => void;
  multiSelect?: boolean;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.set(withSpring(0.97));
  };

  const handlePressOut = () => {
    scale.set(withSpring(1));
  };

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(delay)}>
      <Animated.View style={animatedStyle}>
        <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onSelect}
        style={{
          backgroundColor: selected ? theme.primary + "20" : theme.card,
          padding: 12,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
          borderWidth: 2,
          borderColor: selected ? theme.primary : "transparent",
        }}
      >
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color + "15",
          }}
        >
          <Icon color={color} size={26} strokeWidth={2.5} />
        </View>

        <Text
          style={{
            flex: 1,
            fontSize: 17,
            fontWeight: "600",
            color: theme.foreground,
          }}
        >
          {title}
        </Text>

        {/* Selection indicator */}
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: multiSelect ? 6 : 12,
            borderWidth: 2,
            borderColor: selected ? theme.primary : theme.border,
            backgroundColor: selected ? theme.primary : "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selected && (
            multiSelect ? (
              <View
                style={{
                  width: 12,
                  height: 6,
                  borderLeftWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: theme.primaryForeground,
                  transform: [{ rotate: "-45deg" }, { translateY: -1 }],
                }}
              />
            ) : (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme.primaryForeground,
                }}
              />
            )
          )}
        </View>
      </Pressable>
      </Animated.View>
    </Animated.View>
  );
}
