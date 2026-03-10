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

const DEFAULT_DOCUMENT: Document = {
  name: "Welcome to Recap 👋",
  type: "text",
  emoji: "🎓",
  date: new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  aiNotes: `
Recap turns any document, PDF, or image into structured study notes — instantly.

## How it works

1. **Import a file** — tap the + button and pick a PDF, image, or text file
2. **AI generates your notes** — Recap extracts the key ideas and formats them for studying
3. **Study smarter** — use Flashcards and Quizzes to reinforce what you've learned

## What you can import

- 📄 **PDFs & Word docs** — lecture slides, textbooks, articles
- 🖼️ **Images** — photos of handwritten notes or whiteboards
- 📋 **Text & CSV** — plain text, spreadsheets, or copied content

## Flashcards

Recap auto-generates flashcards from your notes. Tap **Flashcards** on any document to review key concepts with spaced repetition.

## Quizzes

Test your knowledge with AI-generated quizzes. Multiple choice questions built directly from your material.

## Tips

- The more detailed your source material, the better the notes
- Rename documents by tapping the edit icon
- Delete documents by swiping left on the home screen

Happy studying! 🚀`,
  quiz: {
    title: "Welcome to Recap — Quick Check",
    questions: [
      {
        question:
          "What does Recap use to generate study notes from your files?",
        options: ["Manual editors", "AI", "Templates", "OCR only"],
        correctAnswer: 1,
        explanation:
          "Recap uses AI to extract key ideas and format them into structured study notes automatically.",
      },
      {
        question: "Which file types can you import into Recap?",
        options: [
          "Only PDFs",
          "Only images",
          "PDFs, Word docs, images, and text files",
          "Only plain text files",
        ],
        correctAnswer: 2,
        explanation:
          "Recap supports PDFs, Word docs, PowerPoint, images (photos/screenshots), and plain text or CSV files.",
      },
      {
        question: "What are Recap's two main study tools?",
        options: [
          "Summaries and Timers",
          "Flashcards and Quizzes",
          "Mind Maps and Notes",
          "Highlights and Bookmarks",
        ],
        correctAnswer: 1,
        explanation:
          "Recap auto-generates Flashcards for spaced repetition and Quizzes with multiple choice questions from your material.",
      },
      {
        question: "How do you add a new document in Recap?",
        options: [
          "Swipe right on the home screen",
          "Tap the + button",
          "Long press a document",
          "Shake the device",
        ],
        correctAnswer: 1,
        explanation:
          "Tap the + floating button on the home screen to import a new document.",
      },
    ],
  },
  flashcards: [
    {
      question: "What is Recap?",
      answer:
        "An AI-powered study app that turns documents, PDFs, and images into structured study notes, flashcards, and quizzes.",
    },
    {
      question: "What file types does Recap support?",
      answer:
        "PDFs, Word docs, PowerPoint files, images (photos/screenshots), plain text, and CSV files.",
    },
    {
      question: "How are flashcards generated in Recap?",
      answer:
        "Recap automatically generates flashcards from your imported documents using AI.",
    },
    {
      question: "What kind of questions does the Quiz feature use?",
      answer:
        "Multiple choice questions built directly from your study material.",
    },
    {
      question: "How do you rename a document in Recap?",
      answer: "Tap the edit icon on the document.",
    },
    {
      question: "How do you delete a document in Recap?",
      answer: "Swipe left on the document on the home screen.",
    },
  ],
  file: {
    uri: "recap-welcome",
    name: "welcome.txt",
    size: 0,
    mimeType: "text/plain",
    lastModified: 0,
  },
};

const useDocumentsStore = create<DocumentsStore>()(
  persist(
    (set, get) => ({
      documents: [DEFAULT_DOCUMENT],
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
      name: "documents-v4",
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
