import { NextRequest } from "next/server";
import { addRecipeToUser, getUserNoContent, getUserPopulated } from "../repositories/profileRepository";
import { RecipeProps } from "@/_types/RecipeTypes";

export const getUserPopulatedService = async (username: string) => {
    const user = await getUserPopulated(username);

    if (!user)
        throw new Error(`User not found`);

    return user;
}

export const getUserNoContentService = async (user_id: string) => {
    const user = await getUserNoContent(user_id);
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

export const addRecipeToUserService = async (new_recipe: RecipeProps, user_id: string) => {
    const updated_user = await addRecipeToUser(user_id, new_recipe);
    if (!updated_user)
        throw new Error('Failed to add recipe to user');

    return updated_user;
}

export const checkUserHasRecipeService = async (user_id: string, recipe_user_id: string | null): Promise<boolean> => {
    if (!recipe_user_id) 
        throw new Error('Invalid user');

    const user_has_recipe = (recipe_user_id === user_id);
    
    return user_has_recipe;
}