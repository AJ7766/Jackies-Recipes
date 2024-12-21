import mongoose from "mongoose";
import { getRecipeMeta } from "./recipeRepository";

export const getRecipeMetaService = async (recipe_id: mongoose.Types.ObjectId) => {
    const recipe = getRecipeMeta(recipe_id);

    if (!recipe)
        throw new Error(`Recipe not found`);

    return recipe;
}
