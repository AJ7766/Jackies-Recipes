import { UserEditProps, UserModel } from "@/_models/UserModel";

export const getUser = async (user_id: string) => {
    return await UserModel.findById(user_id).select('-password -_id -createdAt -updatedAt').lean();
}

export const getUserPassword = async (user_id: string) => {
    return await UserModel.findById(user_id).select('password').lean();
}

export const updateUser = async (user_id: string, user: UserEditProps) => {
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