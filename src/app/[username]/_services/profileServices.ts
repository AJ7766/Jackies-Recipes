import mongoose from "mongoose";
import { postNewFollowerAPI, updateUnfollowerAPI } from "./handleFollowersAPI";

export const handleFollow = async (user_id: mongoose.Types.ObjectId, username: string) => {
    if (!user_id)
        return alert('Please login to follow this user');
    const { success, message } = await postNewFollowerAPI(username);

    if (!success)
        throw new Error(message);
}

export const handleUnfollow = async (user_id: mongoose.Types.ObjectId, username: string) => {
    if (!user_id) return;
    const { success, message } = await updateUnfollowerAPI(username);

    if (!success)
        throw new Error(message);
}