import { RecipeModel } from "@/_models/RecipeModel";
import { UserModel } from "@/_models/UserModel";
import mongoose from "mongoose";

export const getUserPopulated = async (username: string) => {
    return await UserModel.findOne({ username })
        .select('-password -email -createdAt -updatedAt -_id -userContent._id')
        .populate({
            path: 'recipes',
            model: RecipeModel,
            select: '-__v -updatedAt'
        }).lean();
}

export const getIsFollowing = async (username: string, user_id: mongoose.Types.ObjectId) => {
    return await UserModel.findOne({ username, followers: user_id })
        .select('_id')
        .lean();
}

export const getProfileMeta = async (username: string) => {
    return await UserModel.findOne({ username })
        .select('-_id username fullName')
        .lean();
}
