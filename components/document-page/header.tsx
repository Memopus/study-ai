import { useBottomSheetStoreActions } from "@/lib/store/bottom-sheets";
import {
  useDocumentsActions,
  useSelectedDocument,
} from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PressableScale from "../ui/pressable-scale";

export default function Header({
  title,
  showOptions = true,
}: {
  title?: string;
  showOptions?: boolean;
}) {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: top,
          paddingBottom: title ? 12 : 0,
          paddingHorizontal: 10,
          backgroundColor: theme.background,
        }}
      >
        <View style={{ width: 44 }}>
          <BackButton onPress={() => router.back()} />
        </View>

        {title && (
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: theme.foreground,
              flex: 1,
              textAlign: "center",
              paddingHorizontal: 12,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}

        {showOptions ? (
          <View style={{ width: 44 }}>
            <MenuButton />
          </View>
        ) : (
          <View style={{ width: 44 }} />
        )}
      </View>

      <View
        style={{
          height: title ? 1 : 0,
          backgroundColor: theme.border,
          shadowColor: theme.foreground,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        }}
      />
    </>
  );
}

function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <PressableScale
      onPress={onPress}
      style={{
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <ChevronLeft size={30} color={theme.foreground} strokeWidth={2.5} />
    </PressableScale>
  );
}

function MenuButton() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { deleteDocument } = useDocumentsActions();
  const selectedDocument = useSelectedDocument();
  const { show } = useBottomSheetStoreActions();
  const router = useRouter();

  const handleEdit = () => {
    setIsMenuVisible(false);
    // Add your edit logic here
    show("edit-document");
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    setIsMenuVisible(false);
    deleteDocument(selectedDocument.file.uri);
    router.back();
  };

  return (
    <View style={{ position: "relative", zIndex: 100 }}>
      <PressableScale
        onPress={() => setIsMenuVisible(!isMenuVisible)}
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <EllipsisVertical
          size={20}
          color={theme.foreground}
          strokeWidth={2.5}
        />
      </PressableScale>

      {isMenuVisible && (
        <>
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: 1000,
              height: 1000,
              marginLeft: -500,
              marginTop: -500,
              zIndex: 999,
            }}
            onPress={() => setIsMenuVisible(false)}
          />
          <View
            style={{
              position: "absolute",
              top: 52,
              right: 0,
              backgroundColor: theme.card,
              borderRadius: 10,
              minWidth: 140,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.border,
              zIndex: 1000,
            }}
          >
            <Pressable
              onPress={handleEdit}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 14,
                gap: 10,
                backgroundColor: pressed ? theme.background : "transparent",
              })}
            >
              <Pencil size={16} color={theme.foreground} strokeWidth={2} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: theme.foreground,
                }}
              >
                Edit
              </Text>
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: theme.border,
              }}
            />

            <Pressable
              onPress={handleDelete}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 14,
                gap: 10,
                backgroundColor: pressed ? theme.background : "transparent",
              })}
            >
              <Trash2 size={16} color="#ef4444" strokeWidth={2} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#ef4444",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
