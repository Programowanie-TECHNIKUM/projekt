import { Router } from "express";
import type { Request, Response } from "express";
import spinSlotMachine from "../modules/slotMachine/spinSlotMachine";
import { requireAuth } from "../middleware/auth";

const gameRouter = Router();

gameRouter.post("/slot/spin", requireAuth, (req: Request, res: Response) => {
  spinSlotMachine(req, res);
});

export default gameRouter;
