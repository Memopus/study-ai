import { useBottomSheetStoreActions } from "@/lib/store/bottom-sheets";
import theme from "@/lib/theme";
import { Plus } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NoDoc from "./home/no-doc";
import PressableScale from "./ui/pressable-scale";

export default function FloatingButton() {
  const { show } = useBottomSheetStoreActions();
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      <NoDoc />
      <PressableScale
        onPress={() => show("add-new")}
        style={{
          backgroundColor: theme.primary,
          borderRadius: 40,
          position: "absolute",
          bottom: bottom,
          alignSelf: "center",
          padding: 10,
        }}
      >
        <Plus size={40} color={theme.primaryForeground} />
      </PressableScale>
    </>
  );
}
