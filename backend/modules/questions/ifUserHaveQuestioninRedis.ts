import connectRedis from "../../misc/databases/connectRedis";

export default async (token: string): Promise<boolean> => {
  const redisClient = await connectRedis();
  redisClient.select(1);

  return Boolean(await redisClient.exists(token));
};
