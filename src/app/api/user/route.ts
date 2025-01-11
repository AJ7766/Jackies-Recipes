import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/_lib/database";
import { getUserService, updateUserService, validateUserService } from "./services/userService";
import { delRedisCache } from "@/_utils/redis";

export async function GET(req: NextRequest) { // Get user
    try {
        await connectDB();

        const user_id = req.headers.get('user_id');
        if (!user_id)
            throw new Error('Unauthorized');

        const user = await getUserService(user_id);

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

        await delRedisCache(user_id);

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
