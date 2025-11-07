import mongoose from 'mongoose';

export default async (nick: string) => {
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Baza danych nie jest dostępna');
    }

    const user = await db.collection('users').findOne({ nick });

    return !!user;
    
}