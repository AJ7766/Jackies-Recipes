import mongoose from "mongoose";
import { fetchDeleteRecipeAPI } from "./fetchDeleteRecipeAPI";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleDeleteRecipe = async (
    token: string,
    recipe_id: mongoose.Types.ObjectId,
    username: string,
    public_id: string,
    router: AppRouterInstance
) => {
    const { message, success } = await fetchDeleteRecipeAPI(token, recipe_id, public_id);

    if (!success)
        throw new Error(message);
    router.push(`/${username}`);
}

export const getPublicId = (image: string) => {
        const extractedUrl = image.split('/').pop()
        if (extractedUrl) {
            const public_id = extractedUrl.split('.')[0];
            console.log("extracted", public_id)
            return public_id;
        }
}