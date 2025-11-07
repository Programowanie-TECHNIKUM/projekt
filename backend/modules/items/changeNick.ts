import mongoose from "mongoose"

export default async (userId: string, newNick: string) => {
    const Users = mongoose.connection.collection('users');

    await Users.updateOne(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $set: { nick: newNick } }
    );
}