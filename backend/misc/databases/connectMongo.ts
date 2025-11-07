import mongoose from 'mongoose';

export default async function connectDB() {
    try {
        const mongoUrl = process.env.MONGODB || 'mongodb://localhost:27017/projekt';
        await mongoose.connect(mongoUrl);
        console.log('✅ MongoDB połączone pomyślnie');
    } catch (error) {
        console.error('❌ Błąd połączenia z MongoDB:', error);
        process.exit(1);
    }
};