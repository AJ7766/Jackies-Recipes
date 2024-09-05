import mongoose from "mongoose";

export const getUri = async() => {
  const MONGODB_URI_EXISTS = process.env.MONGODB_URI;
  if(!MONGODB_URI_EXISTS){
    throw new Error('no mongoDB uri found');
  }
  return MONGODB_URI_EXISTS
}

let cachedClient: mongoose.Mongoose | null = null;

export async function connectDB() {

  if (cachedClient || mongoose.connection.readyState === 1) {
    return cachedClient;
  }

  try {
    const MONGODB_URI = await getUri();
    const client = await mongoose.connect(MONGODB_URI);
    cachedClient = client;
    return client;
  } catch (error:any) {
    throw new Error(error.message);
  }
}
