import { RecipeModel } from "@/_models/RecipeModel";

export const getRecipe = async (recipe_id: string) => {
    return await RecipeModel.findById(recipe_id)
        .populate({
            path: 'user',
            select: '-_id username userContent.profilePicture'
        })
        .select('-_id -createdAt -updatedAt')
        .lean();
}