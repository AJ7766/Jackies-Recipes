import mongoose from "mongoose";
import { fetchDeleteRecipeAPI } from "./fetchDeleteRecipeAPI";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleDeleteRecipe = async (
    recipe_id: mongoose.Types.ObjectId,
    username: string,
    public_id: string,
    router: AppRouterInstance
) => {
    const { message, success } = await fetchDeleteRecipeAPI(recipe_id, public_id);

    if (!success)
        throw new Error(message);
    router.push(`/${username}`);
}