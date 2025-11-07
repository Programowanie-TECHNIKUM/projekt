import getUserIdFromToken from "../../misc/JWT/getUserFromToken";
import { getDatabase, ref, runTransaction } from "firebase/database";
import firebaseApp from "../../misc/databases/connectFirebase";

const database = getDatabase(firebaseApp);

const giveMoneyToUser = async (token: string, amount: number) => {
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    console.error("Nie można znaleźć użytkownika dla podanego tokenu");
    return false;
  }

  try {
    const userMoneyRef = ref(database, `users/${userId}/money`);

    const { committed, snapshot } = await runTransaction(userMoneyRef, (currentMoney) => {
      const current = currentMoney || 0;
      return current + amount;
    });

    if (committed) {
      return true;
    } else {
      return false;
    }

  } catch (error) {
    console.error("Błąd podczas dodawania pieniędzy:", error);
    return false;
  }
};

export default giveMoneyToUser;