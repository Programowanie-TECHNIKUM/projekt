import type { Request, Response } from "express";
import mongoose from "mongoose";
import { getDatabase, ref, get } from "firebase/database";
import firebaseApp from "../misc/databases/connectFirebase";

const database = getDatabase(firebaseApp);

export default async (req: Request, res: Response) => {
  try {

    const db = mongoose.connection.db;
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Baza danych MongoDB nie jest dostępna",
      });
    }

    const allUsers = await db.collection("users").find().toArray();

    const leaderboardData = await Promise.all(
      allUsers.map(async (user) => {
        try {
          const userMoneyRef = ref(database, `users/${user._id}/money`);
          const snapshot = await get(userMoneyRef);
          const money = snapshot.exists() ? snapshot.val() : 0;

          return {
            nick: user.nick,
            money: money,
            userId: user._id.toString(),
          };
        } catch (error) {
          console.error(
            `Błąd podczas pobierania pieniędzy dla użytkownika ${user.nick}:`,
            error
          );
          return {
            nick: user.nick,
            money: 0,
            userId: user._id.toString(),
          };
        }
      })
    );

    const sortedLeaderboard = leaderboardData.sort((a, b) => b.money - a.money);
    const leaderboardWithRank = sortedLeaderboard.map((user, index) => ({
      rank: index + 1,
      nick: user.nick,
      money: user.money,
    }));

    res.status(200).json({
      success: true,
      leaderboard: leaderboardWithRank,
    });
  } catch (error) {
    console.error("Błąd podczas tworzenia leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Błąd serwera podczas pobierania leaderboard",
    });
  }
};
