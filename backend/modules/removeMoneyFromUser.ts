import { getDatabase, ref, get, set } from "firebase/database";
import firebaseApp from "../misc/databases/connectFirebase";

export default async (userId: string, howMuch: string): Promise<boolean>  =>{
    const db = getDatabase(firebaseApp);
    const userMoneyRef = ref(db, `users/${userId}/money`);

    try {
        const snapshot = await get(userMoneyRef);
        const currentMoney = snapshot.exists() ? snapshot.val() : 0;

        const newMoney = currentMoney - parseInt(howMuch, 10);
        if (newMoney < 0) {
            return false;
        }

        await set(userMoneyRef, newMoney);
        return true;
    } catch (error) {
        return false;
    }
}