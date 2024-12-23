import mongoose from "mongoose";
import { getIsFollowing, getProfileMeta, getUserPopulated } from "./profileRepository";

export const getUserPopulatedService = async (username: string) => {
    const user = await getUserPopulated(username);

    if (!user)
        throw new Error("User not found");

    return user;
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