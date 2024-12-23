import { connectDB } from "@/app/_config/database"
import { getProfileMetaService, getUserPopulatedService, postNewFollowerService, updateUnfollowerService } from "./profileService";
import mongoose from "mongoose";

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

export const postNewFollowerController = async (username: string, user_id: mongoose.Types.ObjectId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await connectDB();

        await postNewFollowerService(username, user_id, session);

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

export const updateUnfollowerController = async (username: string, user_id: mongoose.Types.ObjectId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await connectDB();

        await updateUnfollowerService(username, user_id, session);

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
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