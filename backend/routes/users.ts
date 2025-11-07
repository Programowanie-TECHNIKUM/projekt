import { Router } from "express";
import type { Request, Response } from "express";
import createUser from "../modules/createUser";
import loginUser from "../modules/loginUser";
import logoutUser from "../modules/logoutUser";
import checkJWTinDB from "../modules/checkJWTinDB";
import { requireAuth } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/createUser", (req: Request, res: Response) => {
  createUser(req, res);
});

userRouter.post("/loginUser", (req: Request, res: Response) => {
  loginUser(req, res);
});

userRouter.delete("/logoutUser", requireAuth, (req: Request, res: Response) => {
  logoutUser(req, res);
});

userRouter.get("/checkJWT", (req: Request, res: Response) => {
  checkJWTinDB(req, res);
});

export default userRouter;
