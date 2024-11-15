import { getRecipes } from "../repositories/recipesRepistory";

export const getRecipesService = async () => {
    const recipes = await getRecipes();

    if (recipes.length === 0)
        throw new Error("No recipes found");

    return recipes;
}