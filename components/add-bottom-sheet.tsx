import theme from "@/lib/theme";
import { Camera, FileText, Image as ImageIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import BottomSheetModal from "./bottom-sheet-modal";

const OPTIONS = [
  {
    option: "pdf",
    title: "Import PDF",
    icon: FileText,
    description: "Upload PDF documents",
    color: theme.primary,
    gradient: [theme.primary, theme.secondary],
  },
  {
    option: "image",
    title: "Import Image",
    icon: ImageIcon,
    description: "Upload photos or screenshots",
    color: theme.accent,
    gradient: [theme.accent, theme.mint],
  },
  {
    option: "take-image",
    title: "Take Photo",
    icon: Camera,
    description: "Capture with your camera",
    color: theme.purple,
    gradient: [theme.purple, theme.coral],
  },
];

export default function AddBottomSheet() {
  return (
    <BottomSheetModal id="add-new" snapPoint={400}>
      <View>
        {/* Options */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 24,
            gap: 12,
          }}
        >
          {OPTIONS.map((option, index) => {
            return (
              <Element
                key={index}
                title={option.title}
                description={option.description}
                icon={option.icon}
                color={option.color}
                delay={index * 100}
              />
            );
          })}
        </View>
      </View>
    </BottomSheetModal>
  );
}

function Element({
  title,
  description,
  icon: Icon,
  color,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: any;
  color: string;
  delay?: number;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.set(withSpring(0.97));
  };

  const handlePressOut = () => {
    scale.set(withSpring(1));
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          backgroundColor: theme.card,
          padding: 10,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
          borderWidth: 2,
          borderColor: "transparent",
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color + "15",
          }}
        >
          <Icon color={color} size={28} strokeWidth={2.5} />
        </View>

        <View
          style={{
            flex: 1,
            gap: 4,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: theme.foreground,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.mutedForeground,
              fontWeight: "400",
            }}
          >
            {description}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
