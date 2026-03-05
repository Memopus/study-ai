import { DocumentPickerAsset } from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";
import OpenAi from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAi({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

type DocType = "image" | "document" | "text";

function getContent(
  file: DocumentPickerAsset | ImagePickerAsset,
  type: DocType,
) {
  if (type === "text") {
    // For text files, read the content directly as string
    const textContent = new FileSystem.File(file.uri).textSync();
    return {
      type: "input_text",
      text: textContent,
    } as const;
  }

  const base64Data = new FileSystem.File(file.uri).base64Sync();
  if (type === "document") {
    const filename = "name" in file ? file.name : "";
    return {
      type: "input_file",
      filename,
      file_data: `data:${file.mimeType};base64,${base64Data}`,
    } as const;
  }
  return {
    type: "input_image",
    image_url: `data:${file.mimeType};base64,${base64Data}`,
    detail: "auto",
  } as const;
}

const QuizSchema = z.object({
  title: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.number(),
      explanation: z.string(),
    }),
  ),
});

const FlashcardsSchema = z.object({
  flashcards: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
});

const NotesSchema = z.object({
  title: z.string(),
  markdown: z.string(),
  emoji: z.string(),
});

export async function getQuiz(
  file: DocumentPickerAsset | ImagePickerAsset,
  type: DocType,
) {
  const response = await client.responses.parse({
    model: "gpt-4.1-nano",
    input: [
      {
        role: "user",
        content: [
          getContent(file, type),
          {
            type: "input_text",
            text: "Generate a quiz with 4 choices questions from the PDF above. Return the result as a structured JSON object. the correct answer should be the index of the correct one ",
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(QuizSchema, "event"),
    },
  });

  return response.output_parsed;
}

export async function getFlashcards(
  file: DocumentPickerAsset | ImagePickerAsset,
  type: DocType,
) {
  const response = await client.responses.parse({
    model: "gpt-4.1-nano",
    input: [
      {
        role: "user",
        content: [
          getContent(file, type),

          {
            type: "input_text",
            text: "Generate flashcards from the PDF above. Return the result as a structured JSON object.",
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(FlashcardsSchema, "event"),
    },
  });

  return response.output_parsed;
}

export async function getNotes(
  file: DocumentPickerAsset | ImagePickerAsset,
  type: DocType,
) {
  const response = await client.responses.parse({
    model: "gpt-4.1-nano",
    input: [
      {
        role: "user",
        content: [
          getContent(file, type),
          {
            type: "input_text",
            text: `
You are an expert study coach creating premium notes for a mobile learning app. Your notes must be clear, well-structured, and genuinely useful for students reviewing and memorizing content.

You MUST return a JSON object that EXACTLY matches this schema — no code fences, no extra fields:
{ "title": string, "markdown": string, "emoji": string }

═══════════════════════════════
TITLE
═══════════════════════════════
- Short, specific, descriptive (4–8 words max)
- Title Case, plain text only
- Reflects the actual subject matter, not just the document type
  Good: "Mitosis & Cell Division Phases"
  Bad: "Biology Notes" or "Chapter 3"

═══════════════════════════════
EMOJI
═══════════════════════════════
- One emoji that best represents the subject (not the document format)

═══════════════════════════════
MARKDOWN STRUCTURE
═══════════════════════════════
Follow this exact layout:

1. Opening paragraph (NO heading) — 2–3 sentences answering: what is this topic, why does it matter?

2. ## Section for each major topic
   - Use ### for subtopics within a section
   - After each ### heading, open with a one-line definition or key idea
   - Then use bullet points for details, examples, nuance

3. > Blockquote for every formal definition, law, or rule worth memorizing

4. **Bold** every key term on first use

5. \`inline code\` for formulas, technical names, values, or precise terminology

6. Use numbered lists ONLY for sequential steps or ranked items

7. --- between major ## sections to visually separate them

8. ## Key Takeaways at the end — 4–6 punchy bullets summarizing the most important things to remember

═══════════════════════════════
CONTENT QUALITY
═══════════════════════════════
- Cover ALL meaningful content from the document — do not skip topics
- Be precise: use the actual names, numbers, and terminology from the source
- Add brief examples where they clarify abstract concepts
- If the source has diagrams or tables, describe the key information in bullet form
- Never pad with filler phrases like "It is important to note that..."
- Write for someone who needs to understand AND remember this material

═══════════════════════════════
MOBILE FORMATTING
═══════════════════════════════
- Keep paragraphs to 2 sentences max — short blocks are easier to scan on mobile
- Prefer bullets over prose for lists of facts
- Each bullet should be a complete thought, not a fragment
- Avoid nesting bullets more than one level deep

Now generate comprehensive study notes based on the provided document.
                `,
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(NotesSchema, "event"),
    },
  });

  return response.output_parsed;
}
