import { RecipeModel } from "@/models/UserRecipe";

export const getRecipe = async (recipe_id: string) => {
    return await RecipeModel.findOne({ _id: recipe_id })
        .populate({
            path: 'user',
            select: '_id'
        })
        .lean();
}