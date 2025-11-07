import JWT from 'jsonwebtoken';

export default async (username: string, userId: string) => {
    const token = JWT.sign({ username, userId }, process.env.JWT_SECRET || "", { expiresIn: '7d' });
    return token;
}