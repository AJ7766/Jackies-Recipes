import { notFound } from "next/navigation";
import { connectDB } from "../../../config/database";
import { UserModel } from "../../../models/UserModel";
import mongoose from "mongoose";


export default async function ProfilePage({params: {username}}:{params: {username:string}}){
    let user;

    try {
    await connectDB();
    user = await UserModel.findOne({ username }).lean();
    if (!user) return notFound();
    
    return(
        <div>
            <p>username: {user.username}</p>
            <p>full name: {user.fullName}</p>
            <p>email: {user.email}</p>
        </div>
    )} catch(error:any){
        return notFound();
    }finally{
        mongoose.connection.close();
    }
    
}
