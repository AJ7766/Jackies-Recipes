import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { addRecipeToUser, deleteUserRecipe, getUser, getUserPopulated } from "../repositories/profileRepository";
import { RecipeProps } from "@/models/UserRecipe";

export const getUserPopulatedService = async (username: string) => {
    const user = await getUserPopulated(username);

    if (!user)
        throw new Error(`User not found`);

    return user;
}

export const getUserService = async (user_id: mongoose.Types.ObjectId) => {
    const user = await getUser(user_id);
    if (!user)
        throw new Error(`User not found`);

    return user;
}

export const getUsernameFromUrlService = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username)
        throw new Error("Couldn't get username from URL");

    return username;
}

export const addRecipeToUserService = async (new_recipe: RecipeProps, user_id: mongoose.Types.ObjectId) => {
    const updated_user = await addRecipeToUser(user_id, new_recipe);
    if (!updated_user)
        throw new Error('Failed to add recipe to user');

    return updated_user;
}

export const deleteUserRecipeService = async (user_id: mongoose.Types.ObjectId, recipe_id: mongoose.Types.ObjectId) => {
    const updated_user = await deleteUserRecipe(user_id, recipe_id);
    if (!updated_user)
        throw new Error('Failed to update recipe');

    return updated_user;
}

export const checkUserHasRecipeService = async (user_id: mongoose.Types.ObjectId, recipe_user_id: mongoose.Types.ObjectId | null) => {
    const user_has_recipe = user_id === recipe_user_id && recipe_user_id.toString();

    return user_has_recipe;
}