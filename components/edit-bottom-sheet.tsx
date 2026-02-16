import { useBottomSheetStoreActions } from "@/lib/store/bottom-sheets";
import {
  useDocumentsActions,
  useSelectedDocument,
} from "@/lib/store/documents";
import theme from "@/lib/theme";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import BottomSheetModal from "./bottom-sheet-modal";
import PressableScale from "./ui/pressable-scale";

export default function EditBottomSheet() {
  const selectedDocument = useSelectedDocument();
  const { editDocument } = useDocumentsActions();
  const [title, setTitle] = useState(selectedDocument.name);
  const { hide, show } = useBottomSheetStoreActions();

  const handleSave = () => {
    editDocument({ name: title }, selectedDocument.file.uri);
    hide("edit-document");
  };

  return (
    <BottomSheetModal id="edit-document" snapPoint={350}>
      <View style={styles.container}>
        <PressableScale
          onPress={() => show("emoji-selector")}
          style={{
            backgroundColor: theme.primary,
            height: 90,
            width: 90,
            borderRadius: 45,
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Text
            style={{
              fontSize: 45,
            }}
          >
            {selectedDocument.emoji}
          </Text>
        </PressableScale>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter document title"
            defaultValue={selectedDocument.name}
            onChangeText={setTitle}
          />
        </View>

        <PressableScale style={styles.button} onPress={handleSave}>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>
            Save
          </Text>
        </PressableScale>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: theme.primary,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  primaryButtonText: {
    color: "#fff",
  },
});
