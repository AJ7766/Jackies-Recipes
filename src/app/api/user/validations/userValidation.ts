import { UserEditProps } from "@/models/UserModel";
import { compareEditUserPasswords } from "@/utils/bcrypt";

export interface UserEditPropsWithPassword {
    user: UserEditProps;
    existing_password: string;
}

export default async function userValidation({ user, existing_password }: UserEditPropsWithPassword) {
    const { email, username, fullName, password, newPassword, confirmPassword, userContent } = user;

    await isValidEmail(email);
    await isValidUsername(username);
    await isValidFullName(fullName);

    if (userContent?.profilePicture) {
        await isValidProfilePicture(userContent.profilePicture);
    }
    if (userContent?.instagram) {
        await isValidInstagram(userContent.instagram);
    }
    if (userContent?.x) {
        await isValidX(userContent.x);
    }
    if (userContent?.tiktok) {
        await isValidTikTok(userContent.tiktok);
    }
    if (userContent?.youtube) {
        await isValidYouTube(userContent.youtube);
    }
    if (userContent?.facebook) {
        await isValidFacebook(userContent.facebook);
    }

    await isValidPassword(password, newPassword, confirmPassword, existing_password);

    return;
}


const isValidProfilePicture = async (profilePicture: string) => {
    const MAX_SIZE = 20 * 1024 * 1024;

    if (!profilePicture)
        throw new Error('Invalid Base64 string.');

    const base64Data = profilePicture.split(';base64,').pop();
    if (!base64Data)
        throw new Error('Invalid Base64 data.');

    const buffer = Buffer.from(base64Data, 'base64');
    if (buffer.length > MAX_SIZE)
        throw new Error('Image size exceeds 20MB.');
};

const isValidEmail = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        throw new Error("Please enter a valid Email address");
};

const isValidUsername = async (username: string) => {
    const usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(username))
        throw new Error("Username can only contain letters");
    if (username.length < 4)
        throw new Error("Username must be at least 4 letters");
};

const isValidFullName = async (fullName: string) => {
    const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    if (!nameRegex.test(fullName))
        throw new Error("Name can only contain letters");
};

const isValidInstagram = async (instagram: string) => {
    if (instagram.length > 1 && !instagram.includes("instagram.com"))
        throw new Error("Link must be from Instagram");
};

const isValidX = async (x: string) => {
    if (x.length > 1 && !x.includes("x.com"))
        throw new Error("Link must be from X (Twitter)");
};

const isValidTikTok = async (tiktok: string) => {
    if (tiktok.length > 1 && !tiktok.includes("tiktok.com"))
        throw new Error("Link must be from TikTok");
};

const isValidYouTube = async (youtube: string) => {
    if (youtube.length > 1 && !youtube.includes("youtube.com"))
        throw new Error("Link must be from YouTube");
};

const isValidFacebook = async (facebook: string) => {
    if (facebook.length > 1 && !facebook.includes("facebook.com"))
        throw new Error("Link must be from Facebook");
};

const isValidPassword = async (
    password: string | undefined,
    newPassword: string | undefined,
    confirmPassword: string | undefined,
    existing_password: string
) => {
    let errorMessage: string[] = [];

    if (password && (!newPassword || !confirmPassword)) {
        if (!newPassword) errorMessage.push('New password');
        if (!confirmPassword) errorMessage.push('Confirm password');
    }

    if (newPassword && (!password || !confirmPassword)) {
        if (!password) errorMessage.push('Old password');
        if (!confirmPassword) errorMessage.push('Confirm password');
    }

    if (confirmPassword && (!password || !newPassword)) {
        if (!password) errorMessage.push('Old password');
        if (!newPassword) errorMessage.push('New password');
    }

    if (errorMessage.length > 0) {
        throw new Error(`The following fields are required: ${errorMessage.join(', ')}`);
    }
    
    if (newPassword && newPassword.length < 6)
        throw new Error('Password must be at least 6 characters');

    if (newPassword !== confirmPassword)
        throw new Error('Passwords do not match');

    if (password) {
        await compareEditUserPasswords(password, existing_password);
    }
};