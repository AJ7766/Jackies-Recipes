"use server"
import { getSession } from "@/_utils/session";
import { getUserController } from "../actions/user/userController";

export const fetchGetUserAPI = async () => {
    try {
        const { token } = await getSession();
        const user = await getUserController(token);

        return { message: "Fetch user successfully", fetchedUser: user };
    } catch (error) {
        return { message: `Failed to fetch user: ${error}`, fetchedUser: null };
    }
}