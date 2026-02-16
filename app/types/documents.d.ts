import { DocumentPickerAsset } from "expo-document-picker";
import { ImagePickerAsset } from "expo-image-picker";

export type Document = {
  name: string;
  type: "document" | "text" | "image";
  file: DocumentPickerAsset | ImagePickerAsset;
  quiz: Quiz | null;
  date: string;
  aiNotes: string;
  emoji: string;
  flashcards: Flashcard[] | null;
};
