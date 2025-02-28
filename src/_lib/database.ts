"use server"
import mongoose from "mongoose";

export const getUri = async () => {
   const MONGODB_URI_EXISTS = process.env.MONGODB_URI;
   if (!MONGODB_URI_EXISTS)
      throw new Error('No MongoDB Uri found');

   return MONGODB_URI_EXISTS
}

let cachedClient: mongoose.Mongoose | null = null;

export async function connectDB() {

   if (cachedClient || mongoose.connection.readyState === 1)
      return cachedClient;

   const MONGODB_URI = await getUri();
   const client = await mongoose.connect(MONGODB_URI,{
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
   });
   cachedClient = client;
   return client;
}