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

    return NextResponse.json({ message: 'Authorized', valid: true}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized', valid: false }, { status: 401 });
  }finally{
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("MongoDB closed");
    }
  }
}