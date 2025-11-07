import type { Request, Response } from "express";
import checkJWTinDB from "../misc/JWT/checkJWTinDB";
import ifUserHaveQuestioninRedis from "./questions/ifUserHaveQuestioninRedis";
import getQuestionFromRedis from "./questions/getQuestionFromRedis";
import randomQuestionFromJson from "../modules/questions/randomQuestionFromJson";
import connectRedis from "../misc/databases/connectRedis";

export default async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if(!token) return;

  if (await ifUserHaveQuestioninRedis(token)) {
    const questionFromRedis = await getQuestionFromRedis(token);
    return res.status(200).json({ question: JSON.stringify(questionFromRedis) });
  }

  const randomQuestion = await randomQuestionFromJson(token);

  const redisClient = await connectRedis();
  redisClient.select(1);

  await redisClient.set(token, JSON.stringify(randomQuestion));

  return res.status(200).json({ question: JSON.stringify(randomQuestion) });
};
