import { connectDB } from "@/_lib/database";
import { UserProps } from "@/_types/UserTypes";
import { getUserService } from "./userService";
import { verifyToken } from "@/_utils/jwt";

export const getUserController = async (token: string): Promise<UserProps> => {
    try {
        await connectDB();
        const decoded = await verifyToken(token);

        const user = await getUserService(decoded.payload.id);

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        throw error;
    }
}