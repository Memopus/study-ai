import { useDocuments } from "@/lib/store/documents";
import theme from "@/lib/theme";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Arrow from "../svg/Arrow";

export default function NoDoc({
  currentRoute,
}: {
  currentRoute?: number; // Optional prop to handle specific route logic
}) {
  const documents = useDocuments();

  const { bottom } = useSafeAreaInsets();

  if (documents.length) {
    return null;
  }

  return (
    <View
      style={{
        bottom: bottom + 66,
        position: "absolute",
        alignItems: "center",
        right: 0,
        left: 0,
        gap: 10,
        transform: [{ rotate: "9deg" }],
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 15,
          color: theme.mutedForeground,
        }}
      >
        Add your first document
      </Text>
      <Arrow size={50} color={theme.mutedForeground} />
    </View>
  );
}
