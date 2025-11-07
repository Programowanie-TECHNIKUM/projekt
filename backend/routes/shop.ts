import { Router } from "express";
import type { Request, Response } from "express";
import buyItem from "../modules/buyItem";
import getLeaderBoard from "../modules/getLeaderBoard";
import { requireAuth } from "../middleware/auth";

const shopRouter = Router();

shopRouter.put("/buyItem", requireAuth, (req: Request, res: Response) => {
  buyItem(req, res);
});


export default shopRouter;
