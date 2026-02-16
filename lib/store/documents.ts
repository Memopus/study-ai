import { Document } from "@/app/types/documents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DocumentsStore {
  documents: Document[];
  selectedDocument: Document | null;
  actions: {
    addDocument: (document: Document) => void;
    deleteDocument: (uri: string) => void;
    editDocument: (change: Partial<Document>, uri: string) => void;
    setSelectedDocument: (document: Document | null) => void;
  };
}

const useDocumentsStore = create<DocumentsStore>()(
  persist(
    (set, get) => ({
      documents: [],
      selectedDocument: null,
      actions: {
        addDocument(document: Document) {
          const { documents: oldDocuments } = get();
          set({ documents: [...oldDocuments, document] });
        },
        deleteDocument(uri: string) {
          const { documents: oldDocuments } = get();
          set({
            documents: oldDocuments.filter(
              (doc: Document) => doc.file.uri !== uri,
            ),
          });
        },
        editDocument(change: Partial<Document>, uri: string) {
          const { documents: oldDocuments, selectedDocument } = get();
          console.log(oldDocuments);
          const newDocuments = oldDocuments.map((document) =>
            document.file.uri === uri ? { ...document, ...change } : document,
          );
          if (selectedDocument.file.uri === uri) {
            const newSelectedDoc = newDocuments.find(
              (doc) => doc.file.uri === uri,
            );
            set({ selectedDocument: newSelectedDoc, documents: newDocuments });
          } else {
            set({
              documents: newDocuments,
            });
          }
        },
        setSelectedDocument(document: Document | null) {
          set({ selectedDocument: document });
        },
      },
    }),
    {
      name: "documents-v3",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        documents: state.documents,
      }),
    },
  ),
);

export const useDocuments = () => useDocumentsStore((state) => state.documents);
export const useSelectedDocument = () =>
  useDocumentsStore((state) => state.selectedDocument);
export const useDocumentsActions = () =>
  useDocumentsStore((state) => state.actions);
