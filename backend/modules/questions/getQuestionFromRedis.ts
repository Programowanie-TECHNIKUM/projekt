import connectRedis from "../../misc/databases/connectRedis";

interface Question {
    title: string;
    answers: {
        [key: string]: string;
    };
    correctAnswers: {
        text: string;
        number: number;
    };
}

export default async (token: string): Promise<Question | null> => {
    try {
        const redisClient = await connectRedis();
        redisClient.select(1);

        const questionString = await redisClient.get(token);
        
        if (!questionString) {
            return null;
        }

        const question: Question = JSON.parse(questionString);
        return question;
        
    } catch (error) {
        console.error('Błąd podczas pobierania pytania z Redis:', error);
        return null;
    }
}