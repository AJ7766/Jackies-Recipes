import { deleteRedisCache } from "@/_utils/redis";
import { connectDB } from "@/app/_config/database";
import { NextRequest, NextResponse } from "next/server";
import { postNewFollowerService, updateUnfollowerService } from "./followersService";
import { getToken, verifyToken } from "@/_utils/jwt";
import mongoose from "mongoose";

export async function POST(req: NextRequest) { // Add new follower
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await connectDB();
        const username = await req.json();
        const token = await getToken(req);
        const decoded = await verifyToken(token);

        await postNewFollowerService(username, decoded.id, session);

        await session.commitTransaction();
        await deleteRedisCache(decoded.id.toString());
        return NextResponse.json({ message: "Successfully followed" }, { status: 200 });
    } catch (error) {
        await session.abortTransaction();
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    } finally {
        session.endSession();
    }
}

export async function PUT(req: NextRequest) { // Remove follower
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await connectDB();
        const username = await req.json();
        const token = await getToken(req);
        const decoded = await verifyToken(token);

        await updateUnfollowerService(username, decoded.id, session);

        await session.commitTransaction();
        await deleteRedisCache(decoded.id.toString());
        return NextResponse.json({ message: "Successfully removed follower" }, { status: 200 });
    } catch (error) {
        await session.abortTransaction();
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    } finally {
        session.endSession();
    }
}