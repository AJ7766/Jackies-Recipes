import { UserModel } from "@/_models/UserModel";
import mongoose from "mongoose";

export const postNewFollower = async (
    username: string,
    new_follower: string,
    session: mongoose.ClientSession
) => {
    return await UserModel.findOneAndUpdate({ username }, {
        $addToSet: { followers: new_follower }
    }, { session });
}

export const postNewFollowing = async (
    user_id: string,
    new_followed: string,
    session: mongoose.ClientSession
) => {
    return await UserModel.findByIdAndUpdate(user_id,
        {
            $addToSet: { following: new_followed }
        }, { session });
}

export const updateUnfollowed = async (
    username: string,
    prev_follower: string,
    session: mongoose.ClientSession
) => {
    return await UserModel.findOneAndUpdate({ username }, {
        $pull: { followers: prev_follower }
    }, { session });
}

export const updateUnfollowing = async (
    user_id: string,
    prev_follower: string,
    session: mongoose.ClientSession
) => {
    return await UserModel.findByIdAndUpdate(user_id,
        {
            $pull: { following: prev_follower }
        }, { session });
}

export const getIsFollowing = async (username: string, user_id: mongoose.Types.ObjectId) => {
    return await UserModel.findOne({ username, followers: user_id })
        .select('_id')
        .lean();
}