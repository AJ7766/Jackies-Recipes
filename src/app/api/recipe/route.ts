import { NextRequest, NextResponse } from "next/server";
import { handleGet } from "./handlers/handleGet";
import { handlePost } from "./handlers/handlePost";
import { handlePut } from "./handlers/handlePut";
import { handleDelete } from "./handlers/handleDelete";

export async function GET(request: NextRequest) {
    try {
        return await handleGet(request);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        return await handlePost(request);
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

export async function DELETE(request: NextRequest) {
    try {
        return await handleDelete(request);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}