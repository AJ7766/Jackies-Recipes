'use server'

import mongoose from "mongoose";
import { connectDB } from "../../config/database";
import { UserModel } from "../../models/UserModel";

export async function getPosts(){
    try {
        await connectDB();
        const data = JSON.parse(JSON.stringify(await UserModel.find()));
        await mongoose.connection.close();
        return {data}
    } catch (error: any){
        await mongoose.connection.close();
        return { errMsg: error.message}
    }
}