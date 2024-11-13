import { UserModel } from "@/models/UserModel";
import { RecipeModel } from "@/models/UserRecipe";

export const getProfile = async (username: string) => {
    return await UserModel.findOne({ username })
    .select('-password -email -createdAt -updatedAt -_id -userContent._id')
    .populate({
        path: 'recipes',
        model: RecipeModel,
        select: '-__v'
    }).lean();
}