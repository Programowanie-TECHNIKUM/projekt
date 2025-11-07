import connectRedis from '../databases/connectRedis';

export default async (jwt: string, user: string) => {

    const redisClient = await connectRedis();

    try {
        await redisClient.set(jwt, user);
        console.log(`jwt dodany do redisa: ${user}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}