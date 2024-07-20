import mongoose from 'mongoose';

export async function connectDB(){
    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB already connected');
        return true;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log('MongoDB connected')
        return true
    } catch (error){
        console.error('Failed to connect to MongoDB:', error);
        return false;
    }
}