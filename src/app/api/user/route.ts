import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/_config/database";
import { getToken, verifyToken } from "@/_utils/jwt";
import { getUserService, updateUserService, validateUserService } from "./services/userService";
import redisClient, { deleteRedisCache } from "@/_utils/redis";
import mongoose from "mongoose";

export async function GET(req: NextRequest) { // Get user
    try {
        await connectDB();

        const token = await getToken(req);
        const decoded = await verifyToken(token);

        const cached_user = await redisClient.get(decoded.id);
        if (cached_user)
            return NextResponse.json({ message: 'Authorized Cached user', cached_user }, { status: 200 });

        const user = await getUserService(decoded.id);

        await redisClient.set(decoded.id, JSON.stringify(user), { EX: 300 });

        return NextResponse.json({ message: 'Authorized', user }, { status: 200 });
    } catch (error) {
        console.error('Error getting user:', error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}
export async function PUT(req: NextRequest) { // Update user
    try {
        await connectDB();
        const { user } = await req.json()
        const user_id_header = req.headers.get('user_id');
        if (!user_id_header) throw new Error('Unauthorized');
        const user_id = new mongoose.Types.ObjectId(user_id_header);

        const validated_user = await validateUserService(user_id, user);

        await updateUserService(user_id, validated_user);

        await deleteRedisCache(user_id_header);

        return NextResponse.json({ message: `Success!`, updated_user: validated_user }, { status: 201 })
    } catch (error: any) {
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                error.message = `Email '${error.keyValue.email}' is already registered.`;
            } else if (error.keyPattern.username) {
                error.message = `Username '${error.keyValue.username}' is already taken.`;
            }
        }
        console.error("Editing user error:", error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}
