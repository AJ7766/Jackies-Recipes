import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { username } = await request.json();

        const regex = new RegExp(username, 'i');
        await connectDB();
        const existingUsers = await UserModel.find({ username: { $regex: regex } }).limit(5).select('-_id username fullName userContent.profilePicture').lean();

        if (existingUsers.length === 0) {
            return NextResponse.json({ success: false, message: `No existing user with username ${username}` }, { status: 404 });
        }
        return NextResponse.json({ success: true, existingUsers}, { status: 200 }); 
    }catch{
        return NextResponse.json({ success: false, message: 'Internal Server Error'}, { status: 500 });
    }
}