import { connectDB } from '@/app/config/database';
import { verifyToken } from '@/utils/jwt';
import { UserModel } from '@/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';

export async function handleGet(request: NextRequest) {
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return NextResponse.json({ message: 'No header, Unauthorized' }, { status: 401 });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);
    const userId = decoded.id;

    const userData = await fetchProfile(userId);

    return NextResponse.json({ message: 'Authorized', userData }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

async function fetchProfile(id: string) {
  try {
    await connectDB();
    const user = await UserModel.findOne({ _id: id }).select('-password -_id').lean();
    if (!user) {
      throw new Error(`User not found`);
    }
    return user;

  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(`Fetching Profile Error`);
  }
}
