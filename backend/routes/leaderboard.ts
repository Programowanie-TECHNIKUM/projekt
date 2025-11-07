import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import getLeaderBoard from "../modules/getLeaderBoard";
import type { Request, Response } from "express";

const leaderBoardRouter = Router();

leaderBoardRouter.get("/getLeaderboard", requireAuth, (req: Request, res: Response) => {
  getLeaderBoard(req, res);
});

export default leaderBoardRouter;