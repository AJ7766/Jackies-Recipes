import { connectDB } from '@/config/database';
import { UserModel } from '@/models/UserModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const { id } = decodedToken;

    const userData = await fetchProfileFromDatabase(id);
    return NextResponse.json({message: 'Authorized', userData}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

async function fetchProfileFromDatabase(id: string) {
    try {
      await connectDB();
      const user = await UserModel.findOne({ _id: id }).lean();
      if (!user) {
        throw new Error(`User not found`);
      }
      return user;

    } catch (error:any) {
      throw error;
    }
  }