import { UserModel, UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import { RecipeModel, RecipeProps } from "@/_models/RecipeModel";
import mongoose from "mongoose";

export const getUserNoContent = async (user_id: mongoose.Types.ObjectId) => {
    return await UserModel.findById(user_id)
        .select('-password -email -createdAt -updatedAt -_id -userContent._id')
        .lean();
}

export const getUserPopulated = async (username: string) => {
    return await UserModel.findOne({ username })
        .select('-password -email -createdAt -updatedAt -_id -userContent._id')
        .populate({
            path: 'recipes',
            model: RecipeModel,
            select: '-__v'
        }).lean();
}

export const addRecipeToUser = async (user_id: mongoose.Types.ObjectId, new_recipe: RecipeProps) => {
    return await UserModel.findByIdAndUpdate(user_id,
        { $addToSet: { recipes: new_recipe._id } },
        { new: true }
    ).lean();
}

export const deleteUserRecipe = async (user_id: mongoose.Types.ObjectId, recipe_id: mongoose.Types.ObjectId) => {
    return UserModel.findByIdAndUpdate(user_id,
        { $pull: { recipes: recipe_id } },
        { new: true }
    ).lean();
}