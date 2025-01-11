import { delRedisCache } from "@/_utils/redis";
import { deleteSession } from "@/_utils/session";
import { NextResponse } from "next/server";

export async function GET() { // Log out user
    const session = await deleteSession();
    await delRedisCache(session.username);

    if(session.token)
        return NextResponse.json({ message: "Error logging out user" }, { status: 500 });    

    return NextResponse.json({ message: 'Successfully logging out' }, { status: 200 });
}