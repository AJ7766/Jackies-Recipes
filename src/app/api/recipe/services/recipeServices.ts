import { NextRequest } from "next/server";
import { createRecipe, deleteRecipe, getRecipe, updateRecipe } from "../repositories/recipeRepository";
import ValidateRecipeForm, { ingredientListValidation } from "../validations/recipeValidation";
import { RecipeProps } from "@/_types/RecipeModel";

export const getRecipeIdFromUrlService = async (req: NextRequest): Promise<string> => {
    const { searchParams } = new URL(req.url);
    const recipe_id = searchParams.get('recipeId');

    if (!recipe_id)
        throw new Error("Couldn't get recipe from URL");

    return recipe_id;
}

export const getPublicIdFromUrlService = async (req: NextRequest): Promise<string> => {
    const { searchParams } = new URL(req.url);
    const public_id = searchParams.get('public_id');

    if (!public_id)
        throw new Error("Couldn't get public ID from URL");

    return public_id;
}

export const validateRecipeService = async (recipe: RecipeProps) => {
    const validation_response = await ValidateRecipeForm(recipe);
    if (typeof validation_response === 'string')
        throw new Error(validation_response);
    return validation_response;
}

export const createRecipeService = async (recipe: RecipeProps, user_id: string) => {
    const filtered_recipe = await ingredientListValidation(recipe);

    if (!filtered_recipe)
        throw new Error('Error validating ingredients');

    const new_recipe = await createRecipe(filtered_recipe, user_id);

    if (!new_recipe)
        throw new Error('Creating recipe failed');

    return new_recipe
}

export const updateRecipeService = async (recipe: RecipeProps) => {
    const filtered_recipe = await ingredientListValidation(recipe);

    if (!filtered_recipe)
        throw new Error('Error validating ingredients');

    const updated_recipe = updateRecipe(filtered_recipe);

    if (!updated_recipe)
        throw new Error('Failed to update recipe');

    return updated_recipe;
}

export const deleteRecipeService = async (recipe_id: string) => {
    const recipe = await deleteRecipe(recipe_id);
    if (!recipe)
        throw new Error('Failed to delete recipe');

    return recipe;
}

export const getRecipeService = async (recipe_id: string) => {
    const recipe = getRecipe(recipe_id);

    if (!recipe)
        throw new Error(`Recipe not found`);

    return recipe;
}
