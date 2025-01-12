import { getIsFollowing, getProfileMeta, getProfile } from "./profileRepository";

export const getProfileService = async (username: string) => {
    const user = await getProfile(username);

    if (!user)
        throw new Error("User not found");

    return user;
}

export const getIsFollowingService = async (username: string, user_id: string) => {
    const isFollowing = await getIsFollowing(username, user_id);

    return !!isFollowing;
}

export const getProfileMetaService = async (username: string) => {
    const user = await getProfileMeta(username);

    if (!user)
        throw new Error("User not found");

    return user;
}