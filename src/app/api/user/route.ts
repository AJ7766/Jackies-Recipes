import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/_config/database";
import { getUserService, updateUserService, validateUserService } from "./services/userService";
import redisClient, { deleteRedisCache } from "@/_utils/redis";

export async function GET(req: NextRequest) { // Get user
    try {
        await connectDB();

        const user_id = req.headers.get('user_id');
        if (!user_id)
            throw new Error('Unauthorized');
        

        const cached_user = await redisClient.get(user_id);
        if (cached_user)
            return NextResponse.json({ message: 'Authorized Cached user', cached_user }, { status: 200 });

        const user = await getUserService(user_id);

        await redisClient.set(user_id, JSON.stringify(user), { EX: 300 });

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
        const user_id = req.headers.get('user_id');
        if (!user_id) throw new Error('Unauthorized');

        const validated_user = await validateUserService(user_id, user);

        await updateUserService(user_id, validated_user);

        await deleteRedisCache(user_id);

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
