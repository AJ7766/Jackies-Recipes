import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { getImageFile } from "./cloudinaryService";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const image_url = await getImageFile(req)

        return NextResponse.json({ url: image_url }, { status: 200 });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
}
