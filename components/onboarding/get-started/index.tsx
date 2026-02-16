import theme from "@/lib/theme";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CTAButton from "../cta-button";

export default function GetStartedScreen() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: bottom,
        backgroundColor: theme.background,
      }}
    >
      {/* Illustration Area */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 40,
        }}
      >
        <Image
          source={require("@/assets/images/splash-screen-icon.png")}
          style={{
            width: 200,
            height: 200,
            borderRadius: 32,
            marginBottom: 40,
          }}
        />

        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: theme.foreground,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Welcome to Recap
        </Text>

        <Text
          style={{
            fontSize: 17,
            color: theme.mutedForeground,
            textAlign: "center",
            lineHeight: 26,
          }}
        >
          Transform any document into flashcards and quizzes with the power of
          AI
        </Text>
      </View>

      {/* Bottom Section */}
      <CTAButton disabled={false} />
    </View>
  );
}
