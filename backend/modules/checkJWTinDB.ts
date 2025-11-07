import type { Request, Response } from 'express';
import checkJWTinDB from '../misc/JWT/checkJWTinDB';

export default async (req: Request, res: Response) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'Brak tokenu autoryzacyjnego' });
    }

    const token = req.headers.authorization.split(' ')[1];

    await checkJWTinDB(token as string).then(isValid => {
        return res.status(isValid ? 200 : 401).json({ valid: isValid });
    })
}