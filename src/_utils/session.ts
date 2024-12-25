"use server"
import { SessionData, sessionOptions } from "@/_lib/iron-session";
import { getIronSession } from "iron-session"
import { cookies } from "next/headers";

export const getSession = async () => {
    return await getIronSession<SessionData>(await cookies(), sessionOptions);
}

export const setSession = async (user_id: string, token: string) => {
    const session = await getSession();
    session.user_id = user_id;
    session.token = token;
    await session.save();
}

export const deleteSession = async () => {
    const session = await getSession();
    session.destroy();
    
    return session;
}