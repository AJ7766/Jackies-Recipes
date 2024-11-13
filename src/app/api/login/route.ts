import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../config/database"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { UserModel } from "@/models/UserModel";


const SECRET_KEY = (process.env.JWT_SECRET_KEY as string);

export async function POST(request: NextRequest) {

  try {
    const { username, password: userPassword } = await request.json()
    const lowercaseUsername = username.toLowerCase();
    await connectDB();
    const user = await UserModel.findOne({ username: lowercaseUsername }).lean();

    if (!user) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(userPassword, user.password);

    if (!isMatch) {
      return NextResponse.json({  message: 'Invalid username or password' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '30d' });
    return NextResponse.json({ message: "Successfully logged in", token }, { status: 200 });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}