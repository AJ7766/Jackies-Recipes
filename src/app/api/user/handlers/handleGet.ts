import { connectDB } from '@/config/database';
import { verifyToken } from '@/config/jwt';
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
    const userData = await fetchProfileFromDatabase(userId);
    return NextResponse.json({ message: 'Authorized', userData }, { status: 200 });
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

  } catch (error: any) {
    throw error;
  }
}
