import { getRecipe } from "./recipeRepository";

export const getRecipeService = async (recipe_id: string) => {
    const recipe = getRecipe(recipe_id);

    if (!recipe)
        throw new Error(`Recipe not found`);

    return recipe;
}
