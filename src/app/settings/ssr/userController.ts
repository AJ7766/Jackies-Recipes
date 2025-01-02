import { connectDB } from "@/app/_config/database";
import { getUserService } from "./userServices";

export const getUserController = async (user_id: string) => {
    try {
        await connectDB();

        const user = await getUserService(user_id);

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        throw error;
    }
}