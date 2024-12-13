import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

export const uploadCloudinary = async (file: File, fileBuffer: ArrayBuffer) => {
    return await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                upload_preset: "next_cloudinary_app",
                display_name: file.name || 'image',
                transformation: [
                    { crop: 'fill', aspect_ratio: "1.0", quality: 'auto', width: 1280, height: 1280, gravity: 'center' },
                ]
            },
            (error, uploadResult) => error ? reject(error) : resolve(uploadResult as UploadApiResponse)
        );
        stream.write(Buffer.from(fileBuffer));
        stream.end();
    });
}

export const deleteCloudinary = async (public_id: string) => {
    return await cloudinary.uploader.destroy(public_id);
}