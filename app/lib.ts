import * as FileSystem from "expo-file-system";
import OpenAi from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAi({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const QuizSchema = z.object({
  title: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.string(),
      explanation: z.string(),
    })
  ),
});

export async function getQuiz(fileUri: string) {
  const base64Data = new FileSystem.File(fileUri).base64Sync();

  const response = await client.responses.create({
    model: "gpt-4.1-nano",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_file",
            filename: "document.pdf",
            file_data: `data:application/pdf;base64,${base64Data}`,
          },
          {
            type: "input_text",
            text: "Generate a quiz with multiple choice questions from the PDF above. Return the result as a structured JSON object.",
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(QuizSchema, "event"),
    },
  });

  console.log(response);
}
