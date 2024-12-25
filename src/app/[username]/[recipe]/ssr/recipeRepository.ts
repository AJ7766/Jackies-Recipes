import { RecipeModel } from "@/_models/RecipeModel";

export const getRecipeMeta = async (recipe_id: string) => {
    return await RecipeModel.findById(recipe_id)
        .populate({
            path: 'user',
            select: '-_id username'
        })
        .select('-_id title')
        .lean();
}