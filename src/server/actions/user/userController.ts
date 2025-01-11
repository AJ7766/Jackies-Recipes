import { connectDB } from "@/_lib/database";
import { getUserService } from "./userService";
import { verifyToken } from "@/_utils/jwt";
import { getSession } from "@/_utils/session";
import { getRedisCache } from "@/_utils/redis";

export const getUserController = async () => {
    try {
        const { token, username } = await getSession();

        const decoded = await verifyToken(token);

        const cachedUser = await getRedisCache(username);
        if (cachedUser) 
            return cachedUser;


        await connectDB();

        const user = await getUserService(decoded.payload.id);

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error(error);
        throw error;
    }
}