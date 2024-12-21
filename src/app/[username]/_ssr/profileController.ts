import { connectDB } from "@/app/_config/database"
import { getProfileMetaService, getUserPopulatedService } from "./profileService";

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

export const getProfileMetaController = async (username: string) => {
    try {
        await connectDB();

        const profile = await getProfileMetaService(username);

        return { serverProfile: JSON.parse(JSON.stringify(profile)) };
    } catch (error) {
        return { serverProfile: null, message: error };
    }
}