import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { generate } from 'random-words';
import bcrypt from 'bcrypt';
import checkUserExists from '../misc/checkUserExists';
import checkUsernameSigns from '../misc/checkUsernameSigns';


export default async (req: Request, res: Response) => {
    const { nick, password, repeatPassword } = req.body;

    if(!controlIfs(req, res)) return;

    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ message: 'Baza danych nie jest połączona' });
    }

    const recoveryHash = generateRecoveryHash();

    const now = new Date();
    
    const db = mongoose.connection.db;
    if (!db) {
        return res.status(500).json({ message: 'Baza danych nie jest dostępna' });
    }

    if(await checkUserExists(nick)) return res.status(400).json({ message: 'Uzytkownik o takim nicku juz istnieje' });
    if(!(await checkUsernameSigns(nick))) return res.status(400).json({ message: 'Nick zawiera niedozwolone znaki' });
    
    await db.collection('users').insertOne({
        nick,
        password: await hashData(password),
        recoveryHash: await hashData(recoveryHash),
        createdAt: now,
        updatedAt: now,
    });

    return res.status(201).json({ message: 'Stworzono uzytkownika', recoveryHash: recoveryHash });
}

const controlIfs = (req: Request, res: Response) => {

    const { nick, password, repeatPassword } = req.body;

    if (!nick || !password || !repeatPassword) {
        return res.status(400).json({ message: 'Wszystkie pola musza byc zaznaczone' });
    }

    if (password !== repeatPassword) {
        return res.status(400).json({ message: 'Hasla musza byc takie same' });
    }

    return true;
}

const generateRecoveryHash = () => {
    const words = generate(12) as string[];
    return words.join(' ');
}

const hashData = async (data: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
}