'use server'

import { connectDB } from "../config/database";
import { UserModel } from "../models/UserModel";

export async function getPosts(){
    try {
        await connectDB();
        const data = JSON.parse(JSON.stringify(await UserModel.find()));
        return {data}
    } catch (error: any){
        return { errMsg: error.message}
    }
}