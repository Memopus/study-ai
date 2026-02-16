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
You are generating premium study notes for a mobile learning app with beautiful markdown rendering.

You MUST return a JSON object that EXACTLY matches this schema:

{
  "title": string,
  "markdown": string
  "emoji" : string
}

──────────────────
GENERAL RULES
──────────────────
- The response MUST be valid JSON
- Do NOT wrap the JSON in code fences
- Do NOT include any extra fields
- Do NOT include explanations outside the JSON
- For the emoji field only use ONE emoji 

──────────────────
TITLE RULES
──────────────────
- "title" must be a short, clear study title
- Use Title Case
- Plain text only (no markdown)

Example: "Introduction to Machine Learning"

──────────────────
MARKDOWN RULES
──────────────────
- Use proper markdown formatting
- The "markdown" field contains the full notes in markdown
- Use standard markdown syntax (headings, lists, code, etc.)

EMOJI RULES
──────────────────
- the emoji should match the file content


──────────────────
STRUCTURE GUIDELINES
──────────────────
- Start with a brief introductory paragraph (NO heading, just plain text)
- Use ## for major sections (do NOT create an "Introduction" section)
- Use ### for subtopics
- End with ## Key Takeaways section

──────────────────
FORMATTING BEST PRACTICES
──────────────────
- Keep paragraphs short (2-3 sentences max)
- Prefer bullet lists (- item) over long paragraphs
- Use **bold** for key terms and important concepts
- Use \`code\` for technical terms, formulas, or code snippets
- Use > blockquotes for definitions or important notes
- Use numbered lists (1. 2. 3.) for sequential steps or rankings
- Add --- horizontal rules to separate major sections if needed

──────────────────
CONTENT RULES
──────────────────
- Be comprehensive but concise
- Include examples when helpful (use code blocks with \`\`\` for multi-line examples)
- Highlight relationships between concepts
- Make it scan-friendly for mobile
- No filler text
- Do NOT add any heading for the introduction - start directly with text

──────────────────
EXAMPLE STRUCTURE
──────────────────

Brief introduction paragraph explaining what this is about. NO heading here.

## First Major Section

### First Concept
**Definition**: Brief explanation of the concept.

Key points:
- Point one with **important term**
- Point two
- Point three

### Second Concept
Description here.

> Important note: Use blockquotes for definitions or key insights.

## Examples

\`\`\`
Code example or formula here
\`\`\`

## Key Takeaways

- Main point one
- Main point two
- Main point three

Now generate comprehensive study notes in markdown format based on the provided document.
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
