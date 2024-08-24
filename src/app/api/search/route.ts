import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

export async function POST(request: NextRequest) {
    const { username } = await request.json();

    const cacheKey = `userSearch_${username}`;
    const cachedResults = cache.get(cacheKey);
        
    if (cachedResults) {
        return NextResponse.json({ success: true, existingUsers: cachedResults }, { status: 200 });
    }

    const regex = new RegExp(username, 'i');
    await connectDB();
    const existingUsers = await UserModel.find({ username: { $regex: regex } }).limit(5).select('-_id username fullName userContent.profilePicture');;
    if (!existingUsers) {
        throw new Error(`No existing user with username ${username}`);
    }

    cache.set(cacheKey, existingUsers);
    return NextResponse.json({ success: true, existingUsers}, { status: 200 }); 
}