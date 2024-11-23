import cache from "@/app/_config/cache";
import { connectDB } from "@/app/_config/database"
import { getUserPopulatedService } from "./profileService";

export const getProfileController = async (username: string) => {
    await connectDB();

    const cached_profile = cache.get(username);

    if (cached_profile) {
        return JSON.parse(JSON.stringify(cached_profile));
    }

    const profile = await getUserPopulatedService(username);

    cache.set(username, profile);

    return JSON.parse(JSON.stringify(profile)); 
}