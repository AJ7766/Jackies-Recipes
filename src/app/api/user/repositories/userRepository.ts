import { UserEditProps, UserModel } from "@/models/UserModel";
import mongoose from "mongoose";

export const getUser = async (user_id: mongoose.Types.ObjectId) => {
    return await UserModel.findById(user_id).select('-password -_id').lean();
}

export const getUserPassword = async (user_id: mongoose.Types.ObjectId) => {
    return await UserModel.findById(user_id).select('password').lean();
}

export const updateUser = async (user_id: mongoose.Types.ObjectId, user: UserEditProps) => {
    return await UserModel.findByIdAndUpdate(user_id,
        {
            $set: {
                email: user.email,
                username: user.username,
                fullName: user.fullName,
                password: user.newPassword,
                'userContent.bio': user.userContent?.bio,
                'userContent.instagram': user.userContent?.instagram,
                'userContent.x': user.userContent?.x,
                'userContent.tiktok': user.userContent?.tiktok,
                'userContent.youtube': user.userContent?.youtube,
                'userContent.facebook': user.userContent?.facebook,
                'userContent.profilePicture': user.userContent?.profilePicture,
            },
        }
    );
}