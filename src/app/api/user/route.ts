import { NextRequest, NextResponse } from "next/server";
import { handlePut } from "./handlers/handlePut";
import { handleGet } from "./handlers/handleGet";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        return await handleGet(request);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
export async function PUT(request: NextRequest) {
    try {
        return await handlePut(request);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
