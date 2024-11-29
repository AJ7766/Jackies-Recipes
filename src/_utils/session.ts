"use server"
import { defaultSession, SessionData, sessionOptions } from "@/_lib/iron-session";
import { getIronSession } from "iron-session"
import mongoose from "mongoose";
import { cookies } from "next/headers";

export const getSession = async () => {
    let cached_session: SessionData | null = null;

    if (cached_session) {
        console.log("Cached session")
        return cached_session;
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isAuth)
        session.isAuth = defaultSession.isAuth;

    cached_session = session;

    return session
}

export const setSession = async (user_id: mongoose.Types.ObjectId) => {
    const session = await getSession();
    session.user_id = user_id;
    session.isAuth = true;
    await session.save();
}

export const deleteSession = async () => {
    const session = await getSession();
    session.destroy();
    
    return session;
}