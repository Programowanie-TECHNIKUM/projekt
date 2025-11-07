import checkJWTinDB from "../misc/JWT/checkJWTinDB"
import type { Request, Response } from 'express';
import removeJWTfromDB from "../misc/JWT/removeJWTfromDB";

export default async (req: Request, res: Response) => {
    const auth = req.headers.authorization;
    const jwt = auth?.split(" ")[1];


    await removeJWTfromDB(jwt as string);
    return res.status(200).json({ message: 'Wylogowano pomyślnie' });
}