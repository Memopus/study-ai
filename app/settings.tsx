import theme from "@/lib/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  Info,
  Mail,
  Share2,
  Star,
  Trash2,
} from "lucide-react-native";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SettingsItemProps = {
  icon: any;
  title: string;
  subtitle?: string;
  iconColor: string;
  iconBg: string;
  onPress?: () => void;
  showChevron?: boolean;
  index: number;
};

function SettingsItem({
  icon: Icon,
  title,
  subtitle,
  iconColor,
  iconBg,
  onPress,
  showChevron = true,
  index,
}: SettingsItemProps) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          backgroundColor: theme.card,
          padding: 16,
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
          borderWidth: 1.5,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        {/* Icon */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: iconBg,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon color={iconColor} size={22} strokeWidth={2.5} />
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.foreground,
              marginBottom: subtitle ? 4 : 0,
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontSize: 13,
                color: theme.mutedForeground,
                fontWeight: "500",
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Chevron */}
        {showChevron && (
          <ChevronRight color={theme.mutedForeground} size={20} />
        )}
      </Pressable>
    </View>
  );
}

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View style={{ marginBottom: 28 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: theme.mutedForeground,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 12,
          paddingHorizontal: 4,
        }}
      >
        {title}
      </Text>
      <View style={{ gap: 10 }}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  const handleBack = () => {
    router.back();
  };

  const showComingSoon = (feature: string) => {
    Alert.alert(
      "Coming Soon",
      `${feature} will be available in a future update.`,
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingTop: top + 20,
          paddingHorizontal: 20,
          paddingBottom: 5,
          //   backgroundColor: theme.card,
          //   borderBottomWidth: 1.5,
          borderBottomColor: theme.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: 12,
              // backgroundColor: theme.muted,
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <ArrowLeft color={theme.foreground} size={24} strokeWidth={2.5} />
          </Pressable>
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "800",
                color: theme.foreground,
              }}
            >
              Settings
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 24,
        }}
        contentContainerStyle={{
          paddingBottom: bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="Support & About">
          <SettingsItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help using the app"
            iconColor={theme.primary}
            iconBg={theme.primary + "15"}
            onPress={() => showComingSoon("Help & Support")}
            index={10}
          />
          <SettingsItem
            icon={Mail}
            title="Send Feedback"
            subtitle="Share your thoughts"
            iconColor={theme.secondary}
            iconBg={theme.secondary + "15"}
            onPress={() => showComingSoon("Send Feedback")}
            index={11}
          />
          <SettingsItem
            icon={Star}
            title="Rate Us"
            subtitle="Enjoying the app? Leave a review!"
            iconColor="#FBBF24"
            iconBg="#FBBF2415"
            onPress={() => showComingSoon("Rate Us")}
            index={12}
          />
          <SettingsItem
            icon={Share2}
            title="Share App"
            subtitle="Tell your friends about us"
            iconColor={theme.accent}
            iconBg={theme.accent + "15"}
            onPress={() => showComingSoon("Share App")}
            index={13}
          />
          <SettingsItem
            icon={Info}
            title="About"
            subtitle="Version 1.0.0"
            iconColor={theme.mutedForeground}
            iconBg={theme.muted}
            onPress={() => showComingSoon("About")}
            showChevron={false}
            index={14}
          />
        </SettingsSection>

        {/* Developer Section */}
        <SettingsSection title="Developer">
          <SettingsItem
            icon={Trash2}
            title="Clear All Data"
            subtitle="Delete all app data and reset"
            iconColor="#EF4444"
            iconBg="#EF444415"
            onPress={() =>
              Alert.alert(
                "Clear All Data",
                "This will delete all your documents, flashcards, and settings. This action cannot be undone.",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                      await AsyncStorage.clear();
                      Alert.alert("Success", "All data has been cleared.");
                    },
                  },
                ],
              )
            }
            index={9}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
}
