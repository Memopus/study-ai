import { useBottomSheetStoreActions } from "@/lib/store/bottom-sheets";
import theme from "@/lib/theme";
import { Plus } from "lucide-react-native";
import { Pressable } from "react-native";

export default function FloatingButton() {
  const { show } = useBottomSheetStoreActions();
  return (
    <Pressable
      onPress={() => show("add-new")}
      style={{ backgroundColor: theme.primary, borderRadius: 10 }}
    >
      <Plus size={40} color={theme.primaryForeground} />
    </Pressable>
  );
}
