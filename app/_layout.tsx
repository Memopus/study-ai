import { useColorScheme } from "@/hooks/use-color-scheme";
import { useProfile } from "@/lib/store/profile";
import theme from "@/lib/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useQuickActions } from "./hooks/useQuickActions";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const profile = useProfile();
  useQuickActions();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: theme.background,
              },
              headerShown: false,
            }}
          >
            <Stack.Protected guard={!profile.onboarded}>
              <Stack.Screen
                name="(onboarding)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>

            <Stack.Protected guard={profile.onboarded}>
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen
                name="document/index"
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="loading/index"
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="quiz/index"
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="flashcards/index"
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="settings"
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                }}
              />
            </Stack.Protected>
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
