import { Router } from "express";
import type { Request, Response } from "express";
import getRandomQuestion from "../modules/getRandomQuestion";
import checkAnswer from "../modules/checkAnswer";
import { requireAuth } from "../middleware/auth";

const quizRouter = Router();

quizRouter.get("/getRandomQuestion", requireAuth, (req: Request, res: Response) => {
  getRandomQuestion(req, res);
});

quizRouter.post("/checkAnswer", requireAuth, (req: Request, res: Response) => {
  checkAnswer(req, res);
});

export default quizRouter;
