import type { Request, Response } from "express";
import checkJWTinDB from "../misc/JWT/checkJWTinDB";
import getUserIdFromToken from "../misc/JWT/getUserFromToken";
import getMoneyFromUser from "./getMoneyFromUser";

import changeNick from "./items/changeNick";
import removeMoneyFromUser from "./removeMoneyFromUser";
import { remove } from "firebase/database";
import checkUserExists from "../misc/checkUserExists";
import checkUsernameSigns from "../misc/checkUsernameSigns";

export default async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) return;
  const token = auth.split(" ")[1];

  if (!req.body || !req.body.itemId) {
    return res
      .status(400)
      .json({ success: false, message: "Brak wymaganych danych (itemId)" });
  }

  const userId = await getUserIdFromToken(token as string);
  const userMoney = await getMoneyFromUser(userId as unknown as string);

  switch (req.body.itemId) {
    case "changeNick":
      if (!req.body.newNick) {
        return res.status(400).json({
          success: false,
          message: "Brak wymaganych danych (newNick)",
        });
      }
      if (await checkUserExists(req.body.newNick)) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Nazwa użytkownika jest już zajęta",
          });
      }

      if (!(await checkUsernameSigns(req.body.newNick))) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Nazwa użytkownika zawiera niedozwolone znaki",
          });
      }

      if (userMoney >= 200) {
        changeNick(userId as string, req.body.newNick);
        removeMoneyFromUser(userId as string, "200");
        return res
          .status(200)
          .json({ success: true, message: "Przedmiot zakupiony pomyślnie" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Niewystarczające środki" });
      }
    default:
      return res.status(400).json({
        success: false,
        message: "Nieprawidłowy identyfikator przedmiotu",
      });
  }
};
