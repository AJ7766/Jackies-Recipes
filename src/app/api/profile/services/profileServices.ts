import { NextRequest } from "next/server";
import { getProfile } from "../repositories/getProfile";

export const getProfileService = async (username: string) => {
    const user = getProfile(username);

    if (!user)
        throw new Error(`User not found`);

    return user;
}

export const getUsernameFromUrlService = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username)
        throw new Error("Username is required");

    return username;
}
