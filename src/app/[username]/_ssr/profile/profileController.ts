import { connectDB } from "@/app/_config/database"
import { getUserPopulatedService } from "./profileService";
import redisClient from "@/_utils/redis";

export const getProfileController = async (username: string) => {
    try {
        await connectDB();
          
        const profile = await getUserPopulatedService(username);

        await redisClient.set(username, JSON.stringify(profile), { EX: 180 });

        return { serverProfile: JSON.parse(JSON.stringify(profile)) };
    } catch (error) {
        console.error(error);
        return { serverProfile: null };
    }
}