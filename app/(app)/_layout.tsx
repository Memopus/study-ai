import { useProfile, useProfileActions } from "@/lib/store/profile";
import theme from "@/lib/theme";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

export default function AppLayout() {
  const profile = useProfile();
  const { updateProfile } = useProfileActions();

  useEffect(() => {
    // registerForPushNotificationsAsync();
    updateProfile({ onboarded: false });
  }, []);

  if (!profile.onboarded) {
    return <Redirect href="/(onboarding)" />;
  }

  // else if (!session) {
  //     return <Redirect href="/authentication" />;
  // }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "",
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    />
  );
}
