import { UserModel } from "@/_models/UserModel";
import mongoose from "mongoose";

export const getUser = async (user_id: mongoose.Types.ObjectId) => {
    return await UserModel.findById(user_id).select('-password -_id -createdAt -updatedAt').lean();
}