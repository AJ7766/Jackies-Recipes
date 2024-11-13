import { NextRequest } from "next/server";
import { getRecipe } from "../repositories/recipeRepository";

export const getRecipeIdFromUrlService = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const recipe_id = searchParams.get('recipeId');

    if (!recipe_id)
        throw new Error("Couldn't get recipe from URL");

    return recipe_id;
}

export const getRecipeService = async (recipe_id: string) => {
    const recipe = getRecipe(recipe_id);

    if (!recipe)
        throw new Error(`Recipe not found`);

    return recipe;
}
