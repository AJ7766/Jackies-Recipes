import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { username } = await request.json()
    const regex = new RegExp(username, 'i');
    const existingUsers = await UserModel.find({ username: { $regex: regex } }).limit(5).select('-_id username fullName userContent.profilePicture');;
    if (!existingUsers) {
        throw new Error(`No existing user with username ${username}`);
    }
    console.log(existingUsers)
    return NextResponse.json({ success: true, existingUsers}, { status: 200 }); 
}