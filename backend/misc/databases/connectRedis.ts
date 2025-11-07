import { createClient } from 'redis';

export default async () => {
    const client = await createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    await client.connect();
    console.log('✅ Połączono z Redis');
    return client;
}