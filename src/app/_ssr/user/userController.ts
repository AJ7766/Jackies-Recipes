import { connectDB } from "@/app/_config/database";
import { UserProps } from "@/_types/UserTypes";
import { getUserService } from "./userService";

export const getUserController = async (user_id: string): Promise<UserProps> => {
    try {
        await connectDB();

        const user = await getUserService(user_id);

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        throw error;
    }
}