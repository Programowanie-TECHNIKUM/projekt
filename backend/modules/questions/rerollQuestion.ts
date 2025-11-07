import getRandomQuestion from "./randomQuestionFromJson";
import connectRedis from "../../misc/databases/connectRedis";

const rerollQuestion = async (token: string) => {
    const connectRedisClient = await connectRedis();
    connectRedisClient.select(1);
    await connectRedisClient.del(token);

    const newQuestion = await getRandomQuestion(token);
    await connectRedisClient.set(token, JSON.stringify(newQuestion));


}

export default rerollQuestion;