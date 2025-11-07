import bcrypt from 'bcrypt';

export default async (data: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(data, hashedPassword);
    return isMatch;
}