import { connectDB } from "@/app/_config/database"
import { getUserPopulatedService } from "./profileService";

export const getProfileController = async (username: string) => {
    try {
        await connectDB();

        const profile = await getUserPopulatedService(username);

        return { serverProfile: JSON.parse(JSON.stringify(profile)) };
    } catch (error) {
        console.error(error);
        return { serverProfile: null };
    }
}