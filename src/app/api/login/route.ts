import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../config/database"
import bcrypt from "bcrypt";
import { UserModel } from "@/models/UserModel";

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

    const { password, ...userWithoutPassword } = user.toObject();
    console.log(userWithoutPassword);
    return NextResponse.json({ message: "Successfully logged in" });

  } catch (error:any) {
    let errorMessage = "Failed to login.";

    console.error('Error checking login details:', error.message);
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  } finally {
    mongoose.connection.close();
  }
}