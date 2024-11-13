import { RecipeModel, RecipeProps } from "@/models/UserRecipe";
import mongoose from "mongoose";

export const getRecipe = async (recipe_id: string) => {
    return await RecipeModel.findOne({ _id: recipe_id })
        .populate({
            path: 'user',
            select: '_id'
        })
        .lean();
}

export const createRecipe = async (filteredRecipe: RecipeProps, user_id: mongoose.Types.ObjectId) => {
    return await RecipeModel.create({
        ...filteredRecipe,
        user: user_id,
    });
}

export const updateRecipe = async (filteredRecipe: RecipeProps) => {
    return await RecipeModel.findByIdAndUpdate(
        { _id: filteredRecipe._id },
        { $set: filteredRecipe },
        { new: true }
    ).lean();
}

export const deleteRecipe = async (recipe_id: mongoose.Types.ObjectId) => {
    return await RecipeModel.deleteOne({ _id: recipe_id }).lean();
}