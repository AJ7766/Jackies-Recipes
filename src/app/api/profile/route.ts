import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { username } = await request.json()
        await connectDB();
        const user = await UserModel.findOne({ username }).select('username fullName -_id');
        console.log("Found user:", user);

        if (!user) {
            return notFound();
        }

        return NextResponse.json({user}, { status:200 });
    }catch (error:any) {
        return NextResponse.json({ message: "Couldn't find user", error: error.message }, { status: 400 });
    }finally{
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log("Database closed.")
          }
    }
    }