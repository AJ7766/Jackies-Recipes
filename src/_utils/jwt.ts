import jwt, { JwtPayload } from "jsonwebtoken";
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
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        return decoded;
    } catch (error: any) {
        throw new Error('Token verification error:', error)
    }
}

export const assignToken = async (user_id: mongoose.Types.ObjectId, username: string) => {
    const token = jwt.sign({ id: user_id, username }, SECRET_KEY, { expiresIn: '30d' });
    if (!token)
        throw new Error('Assigning token failed.')

    return token;
}