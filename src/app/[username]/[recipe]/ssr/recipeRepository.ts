import { RecipeModel } from "@/_models/RecipeModel";
import mongoose from "mongoose";

export const getRecipeMeta = async (recipe_id: mongoose.Types.ObjectId) => {
    return await RecipeModel.findById(recipe_id)
        .populate({
            path: 'user',
            select: '-_id username'
        })
        .select('-_id title')
        .lean();
}