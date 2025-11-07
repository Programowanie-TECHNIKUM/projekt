import type { Request, Response, NextFunction } from "express";
import getUserIdFromToken from "../misc/JWT/getUserFromToken";
import checkJWTinDB from "../misc/JWT/checkJWTinDB";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Brak tokenu autoryzacji",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token nie został podany",
      });
    }
    const isValidToken = await checkJWTinDB(token);

    if (!isValidToken) {
      return res.status(401).json({
        success: false,
        message: "Nieprawidłowy lub wygasły token",
      });
    }

    const userId = await getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Nie można zidentyfikować użytkownika",
      });
    }

    next();
  } catch (error) {
    console.error("Błąd autoryzacji:", error);
    return res.status(500).json({
      success: false,
      message: "Wewnętrzny błąd serwera",
    });
  }
};

export default { requireAuth };
