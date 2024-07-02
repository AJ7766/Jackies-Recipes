'use server'

import { connectDB } from "../config/database";
import AccountModel from "../models/AccountModel";

export async function getPosts(){
    try {
        await connectDB();
        const data = await AccountModel.find();
        return {msg: 'GET'}
    } catch (error: any){
        return { errMsg: error.message}
    }
}