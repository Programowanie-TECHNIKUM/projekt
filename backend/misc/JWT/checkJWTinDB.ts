
import connectRedis from '../databases/connectRedis';

export default async (jwt: string) => {
    const redisClient = await connectRedis();
    redisClient.select(0);

    return !!(await redisClient.get(jwt));

}