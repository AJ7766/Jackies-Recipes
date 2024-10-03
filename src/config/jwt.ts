import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
export async function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        return decoded;
    } catch(error:any) {
        throw new Error('Token verification error:', error)
    }
}