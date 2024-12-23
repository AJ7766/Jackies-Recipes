"use server";
import mongoose from "mongoose";
import { postNewFollowerController, updateUnfollowerController } from "../_ssr/profileController";

export const handleFollow = async (user_id: mongoose.Types.ObjectId, username: string) => {
    if (!user_id)
        return alert('Please login to follow this user');
    await postNewFollowerController(username, user_id);
}

export const handeUnfollow = async (user_id: mongoose.Types.ObjectId, username: string) => {
    if (!user_id) return;
    await updateUnfollowerController(username, user_id);
}