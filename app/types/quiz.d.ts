interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

//  title: z.string(),
//   questions: z.array(
//     z.object({
//       question: z.string(),
//       options: z.array(z.string()),
//       correctAnswer: z.string(),
//       explanation: z.string(),
//     })
//   ),
