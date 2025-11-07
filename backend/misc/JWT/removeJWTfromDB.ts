import { redis } from 'bun';
import connectRedis from '../databases/connectRedis';

export default async (jwt: string) => {
    const redisClient = await connectRedis();

    redisClient.del(jwt);

}