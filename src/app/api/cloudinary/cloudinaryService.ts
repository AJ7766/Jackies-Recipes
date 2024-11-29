import { deleteCloudinary, uploadCloudinary } from "./cloudinaryRepository";

export const getImageFileService = async (file: File) => {
    return await uploadCloudinary(file, await file.arrayBuffer())
}

export const deleteOldImageFileService = async (public_id: string) => {
    const result = await deleteCloudinary(public_id);

    if(!result)
        console.error(result)

    return result
}