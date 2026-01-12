import * as DocumentPicker from "expo-document-picker";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getQuiz } from "../lib";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const handlePress = async () => {
    console.log(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (result.assets) {
      console.log("runned ai stuff");
      getQuiz(result.assets[0].uri);
    }
  };
  return <View style={{ paddingTop: top }}></View>;
}
