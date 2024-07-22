import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri';

if (!MONGODB_URI) {
  throw new Error('no mongoDB uri found');
}

let cachedClient: mongoose.Mongoose | null = null;

export async function connectDB() {
  if (cachedClient) {
    console.log("MongoDB already connected")
    return cachedClient;
  }

  try {
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB already connected")
        cachedClient = mongoose;
        return cachedClient;
      }

    const client = await mongoose.connect(MONGODB_URI);
    cachedClient = client;
    console.log("MongoDB connected")
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}