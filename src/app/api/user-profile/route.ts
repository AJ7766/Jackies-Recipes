import { connectDB } from '@/config/database';
import { UserModel } from '@/models/UserModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
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

    const profileData = await fetchProfileFromDatabase(id);
    return NextResponse.json({message: 'Authorized', profileData}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }finally{
      await mongoose.connection.close();
      console.log("MongoDB closed");
  }
}

async function fetchProfileFromDatabase(id: string) {
    try {
      await connectDB();
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        throw new Error(`User not found`);
      }

      const profileData = {
        username: user.username,
        fullName: user.fullName,
      };
      return profileData;

    } catch (error:any) {
      throw error;
    }
  }