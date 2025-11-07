import { getDatabase, ref, get } from "firebase/database";
import firebaseApp from "../misc/databases/connectFirebase";

const getMoneyFromUser = async (userId: string): Promise<number> => {
    try {


    const database = getDatabase(firebaseApp);

    const userMoneyRef = ref(database, `users/${userId}/money`);
    const snapshot = await get(userMoneyRef);
    const money = snapshot.exists() ? snapshot.val() : 0;
    return money;
    } catch (error) {
        console.error("Error fetching user money:", error);
        return 0;
    }
}

export default getMoneyFromUser;