import AddBottomSheet from "@/components/add-bottom-sheet";
import FloatingButton from "@/components/floating-button";
import DocumentCard from "@/components/home/document-card";
import NoDocument from "@/components/home/no-document";
import { useDocuments } from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const documents = useDocuments();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: top + 20,
      }}
    >
      <AddBottomSheet />
      {/* Header Section */}
      <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: theme.foreground,
              marginBottom: 8,
            }}
          >
            Notes
          </Text>
          <Settings size={30} onPress={() => router.push("/settings")} />
        </View>
        <Text
          style={{
            fontSize: 16,
            color: theme.mutedForeground,
            fontWeight: "500",
          }}
        >
          Your study materials in one place
        </Text>
      </View>
      {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}

      {documents.length === 0 && <NoDocument />}

      {/* Documents Section */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ gap: 12 }}>
          {documents.map((document, index) => (
            <DocumentCard key={index} document={document} index={index} />
          ))}
        </View>
      </ScrollView>

      <FloatingButton />
    </View>
  );
}
