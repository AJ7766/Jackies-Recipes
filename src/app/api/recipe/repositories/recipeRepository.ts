import { RecipeModel } from "@/_models/RecipeModel";
import { RecipeProps } from "@/_types/RecipeModel";

export const getRecipe = async (recipe_id: string) => {
    return await RecipeModel.findById(recipe_id)
        .populate({
            path: 'user',
            select: '_id'
        })
        .lean();
}

export const createRecipe = async (filteredRecipe: RecipeProps, user_id: string) => {
    return await RecipeModel.create({
        ...filteredRecipe,
        user: user_id,
    });
}

export const updateRecipe = async (filteredRecipe: RecipeProps) => {
    return await RecipeModel.findByIdAndUpdate(filteredRecipe._id,
        { $set: filteredRecipe },
        { new: true }
    ).lean();
}

export const deleteRecipe = async (recipe_id: string) => {
    return await RecipeModel.findByIdAndDelete(recipe_id).lean();
}