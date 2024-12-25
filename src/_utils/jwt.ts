import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from 'jose';
import mongoose from "mongoose";
import { NextRequest } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export const getToken = async (req: NextRequest) => {
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer'))
        throw new Error('Unauthorized');

    return authHeader.split(' ')[1];
}

export const verifyToken = async (token: string) => {
    try {
        return await jwtVerify(token, new TextEncoder().encode(SECRET_KEY)) as JWTVerifyResult<JWTPayload & { id: string }>;
    } catch (error: any) {
        throw new Error('Token verification error:', error)
    }
}

export const assignToken = async (user_id: string, username: string) => {
    const token = await new SignJWT({ id: user_id, username })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30d')
        .sign(new TextEncoder().encode(SECRET_KEY));

    if (!token)
        throw new Error('Assigning token failed.')

    return token;
}