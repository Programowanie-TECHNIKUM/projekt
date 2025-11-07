import JWT from "jsonwebtoken";
import connectRedis from "../databases/connectRedis";

const getUserIdFromToken = async (token: string): Promise<string | null> => {
   const redisClient = await connectRedis();

   const reply = await redisClient.get(token);
   return reply || null;

}
  

export default getUserIdFromToken;
