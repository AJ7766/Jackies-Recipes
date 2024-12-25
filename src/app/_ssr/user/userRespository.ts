import { UserModel } from "@/_models/UserModel";

export const getUser = async (user_id: string) => {
    return await UserModel.findById(user_id).select('-password -_id -createdAt -updatedAt').lean();
}