import { getProfileController, getProfileMetaController } from "./profileController";

export const handleGetProfile = async (username: string, user_id: string) => {
    const { serverProfile, isFollowing } = await getProfileController(username.toLocaleLowerCase(), user_id);

    return { serverProfile, isFollowing };
}

export const handleGetProfileMeta = async (username: string) => {
    const { serverProfile, message } = await getProfileMetaController(username.toLocaleLowerCase());

    return { serverProfile, message };
}