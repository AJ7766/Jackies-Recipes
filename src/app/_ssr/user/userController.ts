import { connectDB } from "@/app/_config/database";
import { getUserService } from "./userServices";
import mongoose from "mongoose";
import redisClient from "@/_utils/redis";

export const getUserController = async (user_id: mongoose.Types.ObjectId) => {
    await connectDB();
    const cached_user = await redisClient.get(user_id.toString());
    if (cached_user)
        return JSON.parse(JSON.stringify(cached_user));

    const user = await getUserService(user_id);

    await redisClient.set(user_id.toString(), JSON.stringify(user), { EX: 300 });

    return user && JSON.parse(JSON.stringify(user));
}