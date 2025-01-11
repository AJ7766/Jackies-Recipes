"use server"
import { getUserController } from "../actions/user/userController";

export const fetchGetUserAPI = async () => {
    try {
        const user = await getUserController();

        return { message: "Fetch user successfully", fetchedUser: user };
    } catch (error) {
        return { message: `Failed to fetch user: ${error}`, fetchedUser: null };
    }
}