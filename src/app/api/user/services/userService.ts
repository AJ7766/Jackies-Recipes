import { UserEditProps } from "@/_types/UserTypes";
import { getUser, getUserPassword, updateUser } from "../repositories/userRepository";
import userValidation from "../validations/userValidation";
import { hashPassword } from "@/_utils/bcrypt";

export const getUserService = async (user_id: string) => {
    const user = await getUser(user_id);

    if (!user) {
        throw new Error(`User not found`);
    }
    return user;
}

export const updateUserService = async (user_id: string, user: UserEditProps) => {
    const updated_user = await updateUser(user_id, user);

    if (!updated_user)
        throw new Error("Failed to update user");

    return updated_user;
}

export const validateUserService = async (user_id: string, user: UserEditProps) => {
    const attri_checked_user = await checkUserAttrService(user);
    const existing_user = await getUserPassword(user_id);
    if (!existing_user)
        throw new Error("Can't find user");

    await userValidation({ user: attri_checked_user, existing_password: existing_user.password });

    if (!attri_checked_user.newPassword && !attri_checked_user.confirmPassword && !attri_checked_user.password) {
        return attri_checked_user;
    }

    return {
        ...attri_checked_user,
        newPassword: await hashPassword(attri_checked_user.newPassword)
    };
}

export const checkUserAttrService = async (user: UserEditProps) => {
    const updated_user: any = {
        email: user.email.toLowerCase(),
        username: user.username.toLowerCase(),
        fullName: user.fullName,
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
    if (user.password.length > 1) updated_user.password = user.password;
    if (user.newPassword && user.newPassword.length > 1) updated_user.newPassword = user.newPassword;
    if (user.confirmPassword && user.confirmPassword.length > 1) updated_user.confirmPassword = user.confirmPassword;

    return updated_user;
}