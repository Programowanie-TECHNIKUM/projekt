import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import checkPassword from '../misc/checkPassword';
import createJWT from '../misc/JWT/createJWT';
import addJWTintoDatabase from '../misc/JWT/addJWTintoDatabase';

export default async (req: Request, res: Response) => {
    const { nick, password } = req.body;

    if(!controlIfs(req, res)) return;

    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ message: 'Baza danych nie jest połączona' });
    }

    const db = mongoose.connection.db;
    if (!db) {
        return res.status(500).json({ message: 'Nie można uzyskać dostępu do bazy danych' });
    }

    db.collection('users').findOne({ nick }).then(async user => {
        if(await checkPassword(password, user?.password || '')) {
            const jwt = await createJWT(user?.nick.toString() || '', user?._id.toString() || '');
            addJWTintoDatabase(jwt, user?._id.toString() || '');
            return res.status(200).json({ message: 'Zalogowano pomyślnie', jwt: jwt, userId: user?._id.toString() || '' });
        } else {
            return res.status(400).json({ message: 'Nieprawidłowy nick lub hasło' });
        }
    });

}


const controlIfs = (req: Request, res: Response) => {
    const { nick, password } = req.body;

    if (!nick || !password) {
        return res.status(400).json({ message: 'Wszystkie dane musza byc wypelnione' });
    }

    return true;
}