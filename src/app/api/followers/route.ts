import { connectDB } from "@/_lib/database";
import { NextRequest, NextResponse } from "next/server";
import { postNewFollowerService, updateUnfollowerService } from "./followersService";
import mongoose from "mongoose";

export async function POST(req: NextRequest) { // Add new follower
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await connectDB();
        const username = await req.json();
        const user_id = req.headers.get('user_id');

        if (!user_id)
            throw new Error('Unauthorized');

        await postNewFollowerService(username, user_id, session);

        await session.commitTransaction();
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
        const user_id = req.headers.get('user_id');
        console.log("user_id",user_id, "username",username);
        if (!user_id)
            throw new Error('Unauthorized');

        await updateUnfollowerService(username, user_id, session);

        await session.commitTransaction();
        return NextResponse.json({ message: "Successfully removed follower" }, { status: 200 });
    } catch (error) {
        await session.abortTransaction();
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    } finally {
        session.endSession();
    }
}