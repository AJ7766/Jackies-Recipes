import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary} from 'cloudinary';

export async function POST(req: NextRequest) {
    const { paramsToSign } = await req.json() as { paramsToSign: Record<string, string> };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);
    
    return NextResponse.json({ signature })
}