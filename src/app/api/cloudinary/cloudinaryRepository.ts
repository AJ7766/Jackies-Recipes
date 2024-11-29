import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

export const uploadCloudinary = async (file: File, fileBuffer: ArrayBuffer) => {
    return await new Promise<UploadApiResponse>((resolve, reject) => {
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
}