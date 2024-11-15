import { RecipeModel } from "@/models/RecipeModel";
import { UserModel } from "@/models/UserModel";

export const getRecipes = async () => {
    return await RecipeModel.find({})
        .populate({
            path: 'user',
            model: UserModel,
            select: '-_id username userContent.profilePicture'
        })
        .select('image title')
        .sort({ createdAt: -1 })
        .lean();
}