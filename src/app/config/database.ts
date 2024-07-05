import mongoose from 'mongoose';

export async function connectDB(){
    if(mongoose.connections[0].readyState){
        return true;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log('MongoDB connected')
        return true
    } catch (error){
        console.log(error)
    }
}