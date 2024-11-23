import { getUserPopulated } from "./profileRepository";

export const getUserPopulatedService = async (username: string) => {
    const user = await getUserPopulated(username);

    if (!user)
        return {message: "User not found"};

    return user;
}