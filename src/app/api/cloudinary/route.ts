import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 });
        }

        const fileBuffer = await file.arrayBuffer();

        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    upload_preset: "next_cloudinary_app",
                    display_name: file.name || 'image'
                },
                (error, uploadResult) => error ? reject(error) : resolve(uploadResult as UploadApiResponse)
            );
            stream.write(Buffer.from(fileBuffer));
            stream.end();
        });
        
        return NextResponse.json({ url: result.url }, { status: 200 });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
}
