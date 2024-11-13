import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../config/database"
import { loginServices } from "./services/loginServices";
import { comparePasswords } from "@/utils/bcrypt";
import { assignToken } from "@/utils/jwt";

export async function POST(request: NextRequest) { //Login user
  try {
    await connectDB();

    const { username, password } = await request.json()
    const lowercase_username = username.toLowerCase();

    const user = await loginServices(lowercase_username);

    await comparePasswords(password, user.password);

    const token = await assignToken(user._id, username);

    return NextResponse.json({ message: "Successfully logged in", token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}