import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../_config/database"
import { loginServices } from "./services/loginServices";
import { comparePasswords } from "@/_utils/bcrypt";
import { assignToken } from "@/_utils/jwt";
import { setSession } from "@/_utils/session";

export async function POST(req: NextRequest) { //Login user
  try {
    const { username, password: typedPassword } = await req.json();
    await connectDB();
    const lowercase_username = username.toLowerCase();
    const user = await loginServices(lowercase_username);

    await comparePasswords(typedPassword, user.password);

    const token = await assignToken(user._id.toString(), username);
    await setSession(user._id, token);

    const { _id, password, ...processedUser } = user;

    return NextResponse.json({ message: "Successfully logged in", processedUser }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}