import { readFileSync } from "fs";
import { join } from "path";

interface Question {
  title: string;
  answers: {
    [key: string]: string;
  };
  correctAnswers: {
    text: string;
    number: number;
  };
}

export default async (token: string): Promise<string> => {
  try {
    const questionsPath = join(__dirname, "../../questions.json");

    const questionsData = readFileSync(questionsPath, "utf-8");
    const questions: Question[] = JSON.parse(questionsData);

    if (questions.length === 0) {
      throw new Error("Brak dostępnych pytań");
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    return JSON.stringify(randomQuestion);
  } catch (error) {
    console.error("Błąd podczas pobierania pytania:", error);
    throw new Error("Nie udało się pobrać pytania");
  }
};
