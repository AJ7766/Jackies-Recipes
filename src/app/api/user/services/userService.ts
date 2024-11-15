import mongoose from "mongoose";
import { getUser, getUserPassword, updateUser } from "../repositories/userRepository";
import { UserEditProps } from "@/models/UserModel";
import userValidation from "../validations/userValidation";
import { hashPassword } from "@/utils/bcrypt";

export const getUserService = async (user_id: mongoose.Types.ObjectId) => {
    const user = await getUser(user_id);

    if (!user) {
        throw new Error(`User not found`);
    }
    return user;
}

export const updateUserService = async (user_id: mongoose.Types.ObjectId, user: UserEditProps) => {
    const updated_user = await updateUser(user_id, user);

    if(!updated_user)
        throw new Error("Failed to update user");

    return updated_user;
}

export const validateUserService = async (user_id: mongoose.Types.ObjectId, user: UserEditProps) => {
    const attri_checked_user = await checkUserAttrService(user);
    const existing_user = await getUserPassword(user_id);
    if (!existing_user)
        throw new Error("Can't find user");

    await userValidation({ user: attri_checked_user, existing_password: existing_user.password });

    const hashedPassword = await hashPassword(attri_checked_user.newPassword);

    const updated_user = {
        ...attri_checked_user,
        newPassword: hashedPassword
    }
    return updated_user;
}

export const checkUserAttrService = async (user: UserEditProps) => {
    const updated_user = {
        email: user.email.toLowerCase(),
        username: user.username.toLowerCase(),
        fullName: user.fullName,
        password: user.password || "",
        newPassword: user.newPassword || "",
        confirmPassword: user.confirmPassword || "",
        userContent: {
            profilePicture: user.userContent?.profilePicture || "",
            bio: user.userContent?.bio || "",
            instagram: user.userContent?.instagram ? user.userContent.instagram.toLowerCase() : "",
            x: user.userContent?.x ? user.userContent.x.toLowerCase() : "",
            tiktok: user.userContent?.tiktok ? user.userContent.tiktok.toLowerCase() : "",
            youtube: user.userContent?.youtube ? user.userContent.youtube.toLowerCase() : "",
            facebook: user.userContent?.facebook ? user.userContent.facebook.toLowerCase() : ""
        }
    };
    return updated_user;
}