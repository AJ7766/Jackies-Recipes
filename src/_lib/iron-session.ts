import { SessionOptions } from "iron-session";
import mongoose from "mongoose";

export interface SessionData {
    user_id?: mongoose.Types.ObjectId;
    isAuth: boolean;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET || 'fallbackKey',
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
}

export const defaultSession: SessionData = {
    isAuth: false
}