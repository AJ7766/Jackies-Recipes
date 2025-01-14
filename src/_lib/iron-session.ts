import { SessionOptions } from "iron-session";

export interface SessionData {
    user_id: string;
    username: string;
    token: string;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET || 'fallbackKey',
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
}