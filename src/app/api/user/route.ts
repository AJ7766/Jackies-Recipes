import { NextRequest, NextResponse } from "next/server";
import { handlePut } from "./handlers/handlePut";
import { handleGet } from "./handlers/handleGet";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer')) {
          return NextResponse.json({ message: 'No header, Unauthorized' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];

        return await handleGet(request, token);
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
