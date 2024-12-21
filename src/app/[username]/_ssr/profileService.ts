import { getProfileMeta, getUserPopulated } from "./profileRepository";

export const getUserPopulatedService = async (username: string) => {
    const user = await getUserPopulated(username);

    if (!user)
        throw new Error("User not found");

    return user;
}

export const getProfileMetaService = async (username: string) => {
    const user = await getProfileMeta(username);

    if (!user)
        throw new Error("User not found");

    return user;
}