import mongoose from "mongoose";
import { getUser } from "./userRespository";

export const getUserService = async (user_id: mongoose.Types.ObjectId) => {
    const user = await getUser(user_id);

    if (!user) {
        throw new Error(`User not found`);
    }
    return user;
}