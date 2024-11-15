import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/config/database";
import { getToken, verifyToken } from "@/utils/jwt";
import { getUserService, updateUserService, validateUserService } from "./services/userService";
import { deleteCache } from "@/app/config/cache";

export async function GET(req: NextRequest) {
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
export async function PUT(req: NextRequest) {
    const { user } = await req.json()
    try {
        console.log("User:", user)
        await connectDB();
    
        const token = await getToken(req);
        const decoded = await verifyToken(token);

        const validated_user = await validateUserService(decoded.id, user);

        await updateUserService(decoded.id, validated_user);

        await deleteCache(decoded.username);

        return NextResponse.json({ message: `Success!` }, { status: 201 })
    }  catch (error: any) {
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
