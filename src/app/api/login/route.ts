import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../config/database"
import { loginServices } from "./services/loginServices";
import { comparePasswords } from "@/utils/bcrypt";
import { assignToken } from "@/utils/jwt";

export async function POST(request: NextRequest) { //Login user
  await connectDB();
  try {
    const { username, password } = await request.json()
    const lowercaseUsername = username.toLowerCase();

    const user = await loginServices(lowercaseUsername);

    await comparePasswords(password, user.password);

    const token = await assignToken(user._id, username);

    return NextResponse.json({ message: "Successfully logged in", token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}