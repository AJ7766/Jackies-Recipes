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

export const postNewFollower = async (
    username: string,
    new_follower: mongoose.Types.ObjectId,
    session: mongoose.ClientSession
) => {
    return await UserModel.findOneAndUpdate({ username }, {
        $addToSet: { followers: new_follower }
    }, { session });
}

export const postNewFollowing = async (
    new_followed: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    session: mongoose.ClientSession
) => {
    return await UserModel.findByIdAndUpdate(user_id,
        {
            $addToSet: { following: new_followed }
        }, { session });
}

export const updateUnfollowed = async (
    username: string,
    prev_follower: mongoose.Types.ObjectId,
    session: mongoose.ClientSession
) => {
    return await UserModel.findOneAndUpdate({ username }, {
        $pull: { followers: prev_follower }
    }, { session });
}

export const updateUnfollowing = async (
    prev_follower: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    session: mongoose.ClientSession
) => {
    return await UserModel.findByIdAndUpdate(user_id,
        {
            $pull: { following: prev_follower }
        }, { session });
}

export const getProfileMeta = async (username: string) => {
    return await UserModel.findOne({ username })
        .select('-_id username fullName')
        .lean();
}
