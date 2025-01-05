import { UserModel } from "@/_models/UserModel";

export const getUser = async (user_id: string) => {
    return await UserModel.findById(user_id)
        .select('username userContent.profilePicture')
        .lean();
}