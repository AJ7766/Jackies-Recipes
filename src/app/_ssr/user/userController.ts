import { getSession } from "@/_utils/session";
import { connectDB } from "@/app/_config/database";
import { getUserService } from "./userServices";
import cache from "@/app/_config/cache";

export const getUserController = async () => {
    await connectDB();
    const session = await getSession();

    let user;
    if (session.user_id) {
        const cachedUser = cache.get(session.user_id.toString());

        if (cachedUser)
            return JSON.parse(JSON.stringify(cachedUser));

        user = await getUserService(session.user_id);
        if (!user) return;

        cache.set(session.user_id.toString(), user);
    }
    return user ? JSON.parse(JSON.stringify(user)): null;
}