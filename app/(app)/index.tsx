import AddBottomSheet from "@/components/add-bottom-sheet";
import FloatingButton from "@/components/floating-button";
import DocumentCard from "@/components/home/document-card";
import NoDocument from "@/components/home/no-document";
import { TrackEvent } from "@/lib/analytics";
import { useDocuments } from "@/lib/store/documents";
import { useIsProUser } from "@/lib/store/revenue-cat";
import theme from "@/lib/theme";
import { useRouter } from "expo-router";
import { Crown, Settings } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const documents = useDocuments();
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const isPro = useIsProUser();

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
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: theme.foreground,
            }}
          >
            Notes
          </Text>
          <Settings size={28} onPress={() => router.push("/settings")} />
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

      {!isPro && (
        <Pressable
          onPress={() => {
            router.push("/paywall");
            TrackEvent("Upgrade to Pro Clicked");
          }}
          style={({ pressed }) => ({
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: theme.primary + "12",
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: theme.primary + "30",
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: theme.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Crown size={18} color="#fff" strokeWidth={2.5} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: theme.foreground,
              }}
            >
              Upgrade to Pro
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: theme.mutedForeground,
                marginTop: 1,
              }}
            >
              Unlock unlimited documents & AI features
            </Text>
          </View>
          <Text
            style={{ fontSize: 13, fontWeight: "700", color: theme.primary }}
          >
            →
          </Text>
        </Pressable>
      )}
      {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}

      {documents.length === 0 ? (
        <NoDocument bottomOffset={bottom + 200} />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: bottom + 100,
            gap: 12,
          }}
        >
          {documents.map((document, index) => (
            <DocumentCard key={index} document={document} index={index} />
          ))}
        </ScrollView>
      )}

      <FloatingButton />
    </View>
  );
}
