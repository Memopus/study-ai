import { getNotes } from "@/lib/lib";
import { useBottomSheetStoreActions } from "@/lib/store/bottom-sheets";
import { useDocumentsActions } from "@/lib/store/documents";
import { useLoadingProgressActions } from "@/lib/store/loading-progress";
import theme from "@/lib/theme";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  ClipboardType,
  FileText,
  Image as ImageIcon,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import BottomSheetModal from "./bottom-sheet-modal";

const OPTIONS = [
  {
    option: "document" as const,
    title: "PDF or Document",
    icon: FileText,
    description: "PDF, Word, PowerPoint",
    color: theme.primary,
  },
  {
    option: "text" as const,
    title: "Text or CSV",
    icon: ClipboardType,
    description: "Plain text or spreadsheet",
    color: theme.purple,
  },
  {
    option: "image" as const,
    title: "Image",
    icon: ImageIcon,
    description: "Photo or screenshot",
    color: theme.secondary,
  },
];

export default function AddBottomSheet() {
  return (
    <BottomSheetModal id="add-new" snapPoint={380}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: theme.foreground,
            letterSpacing: -0.4,
            marginBottom: 4,
          }}
        >
          Import Document
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: theme.mutedForeground,
            fontWeight: "500",
            marginBottom: 20,
          }}
        >
          Choose a file type to get started
        </Text>
        <View style={{ gap: 10 }}>
          {OPTIONS.map((option, index) => (
            <Element
              key={index}
              title={option.title}
              option={option.option}
              description={option.description}
              icon={option.icon}
              color={option.color}
              delay={index * 100}
            />
          ))}
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
  option,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: any;
  color: string;
  option: "document" | "image" | "text";

  delay?: number;
}) {
  const scale = useSharedValue(1);
  const { addDocument } = useDocumentsActions();
  const { hide } = useBottomSheetStoreActions();
  const { setStep, reset, setLoadingType } = useLoadingProgressActions();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    return result;
  };
  const handlePressIn = () => {
    scale.set(withSpring(0.97));
  };

  const getFile = async () => {
    const docMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    ];

    const textMimeType = ["text/plain", "text/csv"];

    const mimeType = option === "document" ? docMimeTypes : textMimeType;

    if (option === "document" || option === "text") {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true,
          type: mimeType,
        });

        if (result.canceled) {
          return null;
        }

        return result;
      } catch (err) {
        console.log(err);
      }
    }

    if (option === "image") {
      const result = await pickImage();

      return result;
    }
  };
  const handlePressOut = () => {
    scale.set(withSpring(1));
  };

  console.log(isLoading);

  const handlePress = async () => {
    setIsLoading(true);

    hide("add-new");

    // Reset progress and navigate to loading screen
    reset();

    try {
      // Step 1: Upload file
      setLoadingType("document");

      const result = await getFile();
      console.log(result);
      setStep("upload");

      if (!result) {
        setIsLoading(false);
        return;
      }

      if (!result.assets) {
        setIsLoading(false);
        return;
      }

      router.push("/loading");

      await new Promise((resolve) => setTimeout(resolve, 200));

      setStep("extract");
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStep("generate");
      const note = await getNotes(result.assets[0], option);
      console.log(note);
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      setStep("finalize");
      await new Promise((resolve) => setTimeout(resolve, 500));

      router.back();
      setIsLoading(false);

      Alert.prompt(
        "Name Your File",
        "Enter a name for this document",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Add",
            onPress: (customName) => {
              const finalName = customName?.trim() || note.title;
              addDocument({
                name: finalName,
                type: option,
                file: result.assets[0],
                quiz: null,
                aiNotes: note.markdown,
                emoji: note.emoji,
                date: new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
                flashcards: null,
              });
            },
          },
        ],
        "plain-text",
        note.title,
      );
    } catch (error) {
      console.error("Error processing document:", error);
      router.back();
      setIsLoading(false);
      Alert.alert(
        "Error",
        "Failed to process document. Please try again or change file.",
      );
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={{
          backgroundColor: theme.card,
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 14,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color + "15",
          }}
        >
          <Icon color={color} size={22} strokeWidth={2.5} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 15, fontWeight: "700", color: theme.foreground }}
          >
            {title}
          </Text>
          <Text
            style={{ fontSize: 12, color: theme.mutedForeground, marginTop: 1 }}
          >
            {description}
          </Text>
        </View>

        <ChevronRight size={16} color={theme.mutedForeground} strokeWidth={2} />
      </Pressable>
    </Animated.View>
  );
}
