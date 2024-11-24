import cache from "@/app/_config/cache";
import { connectDB } from "@/app/_config/database"
import { getUserPopulatedService } from "./profileService";

export const getProfileController = async (username: string) => {
    const cached_profile = cache.get(username);
    if (cached_profile) return { serverProfile: JSON.parse(JSON.stringify(cached_profile)) };
    try {
        await connectDB();

        const profile = await getUserPopulatedService(username);

        cache.set(username, profile);

        return { serverProfile: JSON.parse(JSON.stringify(profile)) };
    } catch (error) {
        console.error(error);
        return { serverProfile: null };
    }
}