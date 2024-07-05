import jwt from 'jsonwebtoken';

const SECRET_KEY = (process.env.JWT_SECRET as string);


if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};
  
export const verifyToken = (token: string): any => {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return null;
    }
  };