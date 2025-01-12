import { connectDB } from "@/_lib/database"
import { getIsFollowingService, getProfileMetaService, getProfileService } from "./profileService";

export const getProfileController = async (username: string, user_id: string) => {
    try {
        await connectDB();

        const [profile, isFollowing] = await Promise.all([
            getProfileService(username),
            getIsFollowingService(username, user_id)
        ]);

        return { serverProfile: JSON.parse(JSON.stringify(profile)), isFollowing };
    } catch (error) {
        console.error(error);
        return { serverProfile: null };
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