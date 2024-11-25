import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/_config/database";
import { getToken, verifyToken } from "@/_utils/jwt";
import { getUserService, updateUserService, validateUserService } from "./services/userService";

export async function GET(req: NextRequest) { // Get user
    try {
        await connectDB();

        const token = await getToken(req);
        const decoded = await verifyToken(token);

        const user = await getUserService(decoded.id);

        return NextResponse.json({ message: 'Authorized', user }, { status: 200 });
    } catch (error) {
        console.error('Error getting user:', error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}
export async function PUT(req: NextRequest) { // Update user
    const { user } = await req.json()
    try {
        await connectDB();

        const token = await getToken(req);
        const decoded = await verifyToken(token);

        const validated_user = await validateUserService(decoded.id, user);

        await updateUserService(decoded.id, validated_user);

        return NextResponse.json({ message: `Success!` }, { status: 201 })
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
