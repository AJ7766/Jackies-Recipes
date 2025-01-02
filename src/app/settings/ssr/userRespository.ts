import { UserModel } from "@/_models/UserModel";

export const getUser = async (user_id: string) => {
    return await UserModel.findById(user_id).select(
        'userContent.profilePicture email username fullName userContent.bio userContent.instagram userContent.x userContent.tiktok userContent.youtube userContent.facebook')
        .lean();
}