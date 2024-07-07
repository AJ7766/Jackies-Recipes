import { connectDB } from '@/config/database';
import { UserModel } from '@/models/UserModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const { id } = decodedToken;

    const profileData = await fetchProfileFromDatabase(id);
    return NextResponse.json(profileData, { status: 200 });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

async function fetchProfileFromDatabase(id: string) {
    try {
      await connectDB();
      const user = await UserModel.findOne({ _id: id });
  
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
  
      const profileData = {
        username: user.username,
        email: user.email,
      };
      
      console.log(user);
      return profileData;
    } catch (error:any) {
      console.error('Error fetching profile:', error.message);
      throw new Error('Failed to fetch profile data');
    } finally{
      mongoose.connection.close();
    }
  }