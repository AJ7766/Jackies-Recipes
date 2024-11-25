import { connectDB } from "@/app/_config/database";
import { getUserService } from "./userServices";
import cache from "@/app/_config/cache";
import mongoose from "mongoose";

export const getUserController = async (user_id: mongoose.Types.ObjectId) => {
    await connectDB();
    const cachedUser = cache.get(user_id.toString());
    if (cachedUser)
        return JSON.parse(JSON.stringify(cachedUser));

    const user = await getUserService(user_id);
    cache.set(user_id.toString(), user);

    return user && JSON.parse(JSON.stringify(user));
}