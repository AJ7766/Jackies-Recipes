import mongoose from "mongoose";
import { fetchDeleteRecipeAPI } from "./fetchDeleteRecipeAPI";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleDeleteRecipe = async (
    token: string,
    recipe_id: mongoose.Types.ObjectId,
    username: string,
    deleteCachedUser: () => void,
    router: AppRouterInstance
) => {
    const { message, success } = await fetchDeleteRecipeAPI(token, recipe_id);

    if (!success)
        throw new Error(message);

    deleteCachedUser();
    router.push(`/${username}`);
}