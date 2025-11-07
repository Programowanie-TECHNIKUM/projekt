import type { Request, Response } from "express";
import checkJWTinDB from "../misc/JWT/checkJWTinDB";
import getQuestionFromRedis from "./questions/getQuestionFromRedis";
import giveMoneyToUser from "./questions/giveMoneyToUser";
import getRandomQuestion from "./getRandomQuestion";
import rerollQuestion from "./questions/rerollQuestion";

export default async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if(!token) return;

  if (!req.body || !req.body.answer) {
    return res
      .status(400)
      .json({ message: "Brak odpowiedzi w ciele zapytania" });
  }

  const answer = req.body.answer;
  console.log(answer);

  const question = await getQuestionFromRedis(token);
  if (!question) {
    return res
      .status(404)
      .json({ message: "Nie znaleziono pytania dla podanego tokenu" });
  }

  const redisQuestion = JSON.parse(question as any);
  const correctAnswers = redisQuestion.correctAnswers;

    

  if (
    answer === correctAnswers.text ||
    Number(answer) === correctAnswers.number
  ) {
    const money = Math.floor(Math.random() * 10 + 5);
    giveMoneyToUser(token, money);
    rerollQuestion(token);
    return res.status(200).json({ correct: true, money: money  });
  } else {
    return res.status(200).json({ correct: false });
  }
};
