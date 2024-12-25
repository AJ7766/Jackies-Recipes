import { connectDB } from "@/app/_config/database";
import { getUserService } from "./userServices";
import redisClient from "@/_utils/redis";

export const getUserController = async (user_id: string) => {
    try {
        const cached_user = await redisClient.get(typeof user_id === 'string' ? user_id : JSON.stringify(user_id));
        if (cached_user) {
            console.log('Cached User')
            return cached_user;
        }

        await connectDB();

        const user = await getUserService(user_id);

        await redisClient.set(user_id.toString(), JSON.stringify(user), { EX: 300 });

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        throw error;
    }
}