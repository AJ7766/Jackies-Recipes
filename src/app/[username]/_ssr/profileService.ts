import mongoose from "mongoose";
import { getIsFollowing, getProfileMeta, getUserPopulated, postNewFollower, postNewFollowing, updateUnfollowed, updateUnfollowing } from "./profileRepository";

export const getUserPopulatedService = async (username: string) => {
    const user = await getUserPopulated(username);

    if (!user)
        throw new Error("User not found");

    return user;
}

export const postNewFollowerService = async (username: string, user_id: mongoose.Types.ObjectId, session: mongoose.ClientSession) => {
    const updated_followed_user = await postNewFollower(username, user_id, session);
    if (!updated_followed_user)
        throw new Error("Failed to follow user");

    const updated_following_user = await postNewFollowing(user_id, updated_followed_user._id, session);
    if (!updated_following_user)
        throw new Error("Failed to add followed user to list of following users");

    return true;
}

export const updateUnfollowerService = async (username: string, user_id: mongoose.Types.ObjectId, session: mongoose.ClientSession) => {
    const updated_followed_user = await updateUnfollowed(username, user_id, session);
    if (!updated_followed_user)
        throw new Error("Failed to unfollow user");

    const updated_following_user = await updateUnfollowing(user_id, updated_followed_user._id, session);
    if (!updated_following_user)
        throw new Error("Failed to remove followed user to list of following users");

    return true;
}

export const getIsFollowingService = async (username: string, user_id: mongoose.Types.ObjectId) => {
    const isFollowing = await getIsFollowing(username, user_id);

    return !!isFollowing;
}

export const getProfileMetaService = async (username: string) => {
    const user = await getProfileMeta(username);

    if (!user)
        throw new Error("User not found");

    return user;
}