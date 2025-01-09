import { connectDB } from "@/_lib/database"
import { getIsFollowingService, getProfileMetaService, getUserPopulatedService } from "./profileService";

export const getProfileController = async (username: string) => {
    try {
        await connectDB();

        const profile = await getUserPopulatedService(username);

        return { serverProfile: JSON.parse(JSON.stringify(profile)) };
    } catch (error) {
        console.error(error);
        return { serverProfile: null };
    }
}

export const getIsFollowingController = async (username: string, user_id: string) => {
    try {
        await connectDB();
        const isFollowing = await getIsFollowingService(username, user_id);
        return isFollowing;
    } catch (error) {
        return false;
    }
}
export const getProfileMetaController = async (username: string) => {
    try {
        await connectDB();

        const profile = await getProfileMetaService(username);

        return { serverProfile: JSON.parse(JSON.stringify(profile)) };
    } catch (error) {
        return { serverProfile: null, message: error };
    }
}