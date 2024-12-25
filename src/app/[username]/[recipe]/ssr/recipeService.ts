import { getRecipeMeta } from "./recipeRepository";

export const getRecipeMetaService = async (recipe_id: string) => {
    const recipe = getRecipeMeta(recipe_id);

    if (!recipe)
        throw new Error(`Recipe not found`);

    return recipe;
}
