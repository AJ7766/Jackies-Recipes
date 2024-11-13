import { NextRequest } from "next/server";
import { getProfile } from "../repositories/getProfile";
import mongoose from "mongoose";

export const getProfileService = async (username: string) => {
    const user = getProfile(username);

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

export const checkUserHasRecipeService = async (user_id: mongoose.Types.ObjectId, recipe_user_id: mongoose.Types.ObjectId | null) => {
    const userHasRecipe = user_id === recipe_user_id && recipe_user_id.toString();

    return userHasRecipe;
}