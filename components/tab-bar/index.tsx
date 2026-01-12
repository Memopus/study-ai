import theme from "@/lib/theme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Home, Notebook } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddBottomSheet from "../add-bottom-sheet";
import FloatingButton from "../floating-button";

const ICONS = {
  index: Home,
  documents: Notebook,
} as const;

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();

  const onPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return (
    <>
      <AddBottomSheet />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          paddingBottom: bottom,
          paddingHorizontal: 30,
        }}
      >
        {state.routes.slice(0, 1).map((route, index) => {
          return (
            <TabButton
              key={route.key}
              route={route}
              index={index}
              state={state}
              onPress={onPress}
            />
          );
        })}

        <FloatingButton />

        {state.routes.slice(1).map((route, index) => {
          return (
            <TabButton
              key={route.key}
              route={route}
              index={index + 1}
              state={state}
              onPress={onPress}
            />
          );
        })}
      </View>
    </>
  );
}

function TabButton({ route, index, state, onPress }) {
  const LucideIcon = ICONS[route.name as keyof typeof ICONS];

  const isFocused = state.index === index;

  return (
    <Pressable
      key={route.key}
      style={{ padding: 16 }}
      onPress={() => onPress(route, isFocused)}
    >
      <LucideIcon
        color={isFocused ? theme.secondary : theme.mutedForeground}
        size={30}
        strokeWidth={isFocused ? 3 : 2}
      />
    </Pressable>
  );
}
