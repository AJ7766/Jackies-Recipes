import { connectDB } from '@/config/database';
import { UserModel } from '@/models/UserModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return NextResponse.json({ message: 'No header, Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  const isValidToken = await verifyToken(token);
  if(!isValidToken){
    return NextResponse.json({ message: 'Token not valid'}, { status: 401 });
  }
  else{
    try{
      const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
      const { id } = decodedToken;
      const userData = await fetchProfileFromDatabase(id);
      return NextResponse.json({ message: 'Authorized', userData }, { status: 200 });
    }catch(error){
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }
}

async function verifyToken(token: string) {
  try {
    jwt.verify(token, SECRET_KEY) as JwtPayload;
    return true;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
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
