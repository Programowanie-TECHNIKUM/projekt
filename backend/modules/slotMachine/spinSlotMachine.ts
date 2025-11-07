import type { Request, Response } from "express";
import checkJWTinDB from "../../misc/JWT/checkJWTinDB";
import getMoneyFromUser from "../getMoneyFromUser";
import getUserIdFromToken from "../../misc/JWT/getUserFromToken";
import removeMoneyFromUser from "../removeMoneyFromUser";
import addMoneyToUser from "../addMoneyToUser";

export default async (req: Request, res: Response) => {
  if (!req.body || typeof req.body.betAmount !== "number") {
    return res.status(400).json({ message: "Brak wymaganych danych" });
  }

  const jwt = req.headers.authorization || "";
  const token = jwt.split(" ")[1];


  const { betAmount } = req.body;

  if (betAmount <= 0) {
    return res.status(400).json({ message: "Nieprawidłowa kwota zakładu" });
  }

  const userId = await getUserIdFromToken(token as string);
  const userMoney = await getMoneyFromUser(userId as unknown as string);

  if(userMoney < betAmount) {
    return res.status(400).json({ message: "Niewystarczające środki na koncie" });
  }


  const symbols = ["JAVASCRIPT", "PYTHON", "JAVA", "CPLUSPLUS", "PHP", "CSHARP", "TYPESCRIPT", "VBA", "SQL"];

  const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
  const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
  const reel3 = symbols[Math.floor(Math.random() * symbols.length)];

  let winnings = 0;

  if (reel1 === reel2 && reel2 === reel3) {
    winnings = betAmount * 10;
  } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
    winnings = betAmount * 3;
  }

  removeMoneyFromUser(userId as unknown as string, betAmount.toString());

  if(winnings > 0) {
    addMoneyToUser(userId as unknown as string, winnings.toString());
  }

  return res.status(200).json({
    message: "Spin zakończony",
    reels: [reel1, reel2, reel3],
    winnings: winnings,
  });
};
