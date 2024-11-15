import { RecipeModel } from "@/_models/RecipeModel";
import { UserModel } from "@/_models/UserModel";

export const getSearchedUsers = async (search: string) => {
    return await UserModel.find({ username: { $regex: new RegExp(search, 'i') } }).limit(5).select('-_id username fullName userContent.profilePicture').lean();
}

export const getSearchedRecipes = async (search: string) => {
    return await RecipeModel.find({ title: { $regex: new RegExp(search, 'i') } }).populate('user', 'username').limit(5).select('_id title image').lean();
}