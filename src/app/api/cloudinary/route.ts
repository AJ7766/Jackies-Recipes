import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { deleteOldImageFileService, getImageFileService } from "./cloudinaryService";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const public_id = formData.get("public_id");

        if (!file || !(file instanceof Blob)) {
            throw new Error('No valid file uploaded');
        }

        const [deleteResult, data] = await Promise.all([
            (public_id && typeof public_id === 'string') && deleteOldImageFileService(public_id),
            getImageFileService(file)
        ]);
        
        console.log("Delet result:", deleteResult);
        return NextResponse.json({ url: data.url }, { status: 200 });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
}
