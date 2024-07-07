import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../config/database"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { UserModel } from "@/models/UserModel";


const SECRET_KEY = (process.env.JWT_SECRET_KEY as string) || "your-secret-key";

export async function POST(request: NextRequest) {

  try {
    const { username, password: userPassword } = await request.json()
    await connectDB();
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(userPassword, user.password);

    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return NextResponse.json({ message: "Successfully logged in", token}, { status:200 });

  } catch (error:any) {
    let errorMessage = "Invalid username or password.";

    console.error('Error checking login details:', error.message);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  } finally {
    mongoose.connection.close();
  }
}