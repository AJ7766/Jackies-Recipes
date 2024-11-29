import { NextRequest } from "next/server";
import { uploadCloudinary } from "./cloudinaryRepository";

export const getImageFile = async (req: NextRequest) => {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
        throw new Error('No valid file uploaded');
    }

    return await uploadCloudinary(file, await file.arrayBuffer())
}